import { useState, useRef } from "react";
import ReactBSAlert from "react-bootstrap-sweetalert";

// reactstrap components
import {
  Button,
  Card,
  CardTitle,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";


// core components
import { useKeySetData } from "../../../tools/KeySetProvider";
import { usePushDebugData } from "../PushDebugProvider";

const PushTest = () => {
  const keySetContext = useKeySetData();
  const pushDebugContext = usePushDebugData();

  console.log("PushTest keySetContext: ", keySetContext);
  console.log("PushTest pushDebugContext: ", pushDebugContext);

  const [pushChannel, setPushChannel] = useState(pushDebugContext.pushChannel);
  const [message, setMessage] = useState(pushDebugContext.message);
  const [inputRows, setInputRows] = useState(28);
  const [sweetAlert, setSweetAlert] = useState(null);

  const outputMessage = useRef([]);
  const outputFeedback = useRef([]);
  const [allResults, setAllResults] = useState(() => pushDebugContext.testResults || []);

  const [registeredDevicesData, setRegisteredDevicesData] = useState({});
  const [fcmUnregisteredDevices, setFcmUnregisteredDevices] = useState([]);

  // should this go in the KeySetContext (where it is now) or
  //  PushDebugContext for tool specific listeners???
  const createListener = () => {
    console.log("PushTest:createListener: ");

    keySetContext.pubnub.addListener({
      status: function(status) {
        console.log("status callback: ", status);

        if (status.category === "PNConnectedCategory" && status.operation === "PNSubscribeOperation") {
          pushDebugContext.setPushChannel(pushChannel);
          pushDebugContext.setSubscribeButtonLabel(() => "Unsubscribe");
          timerAlert("Subscribe Success", 'You have successfully subscribed', 3000);
        }
        else if (status.operation === "PNUnsubscribeOperation") {
          pushDebugContext.setSubscribeButtonLabel(() => "Subscribe");
          pushDebugContext.isWarnUnsubscribed.current = true;
          timerAlert("Unsubscribe Success", "You have successfully UNsubscribed.", 3000);
        }
        else if (status.category === "PNNetworkDownCategory" || status.category === "PNNetworkIssuesCategory") {
          confirmAlert("Connection Issues", "There was an issue with the network.");
        }
        else if (status.category === "PNNetworkUpCategory" || status.category === "PNNReconnectCategory") {
          confirmAlert("Connection Success", "The network connection is back.");
        }
        else {
          confirmAlert("Error Detected", JSON.stringify(status));
        }
      },

      message: function(msg) {
        console.log("MESSAGE CALLBACK: channel", msg.channel, "; message", msg.message);
        const timestamp = getDateTime(msg.timetoken) + "UTC\n[" + msg.timetoken + "]";
        const message = JSON.stringify(msg.message, null, 2);

        // allResults.push(parseFeedback(message));
        setAllResults((...allResults) => [...allResults,  parseFeedback(message)]);
        pushDebugContext.setTestResults((...testResults) => [allResults, ...testResults]);

        // if (msg.channel === pushChannel) {
        //   outputMessage.current[0] = timestamp + "\n" + message;
        // }
        // else if (msg.channel === pushChannel + "-pndebug") {
        //   outputFeedback.current.push(parseFeedback(message));
        // }
      }
    });
  }

  const parseFeedback = (message) => {
    let feedback = "";
    const type = message.substring(1, 7);

    console.log("    feedback: ", message.substring(0,20), "; type: ", type);

    if (type === "Regist") {
      let heading = message.substring(1, message.indexOf("[") - 1);
      heading = heading.replace(" timetoken", " \n  timetoken")
        .replace(" count", " \n  count") + 
        "\n  -----";

      let devices = message.substring(message.indexOf("[")+1, message.length-2);
      devices = devices.replaceAll(" ", "").replaceAll("'", "").split(",");

      let dlist = "";
      for (let i in devices) {
        const index = parseInt(i) + 1;
        
        let spaces = "  ";
        if (index > 99) spaces = " "
        else if (index < 10) spaces = "   "

        dlist += "\n" + spaces + index + ") " + devices[i];
      }

      feedback = heading + dlist;
    }
    else if (type === "Device") {
      // parse the gateway type counts - apns: 0 apns2: 16 gcm: 0
      let devices = message.substring(37, message.length-2).split(" ");
      feedback = "Registered Devices:";
      feedback += "\n  APNs  : " + devices[3];
      feedback += "\n  APNs 2: " + devices[5];
      feedback += "\n  FCM   : " + devices[7];

      let data = {};
      data.fcmDevices = devices[7];
      data.apns2Devices = devices[5];
      data.apnsDevices = devices[3];
      setRegisteredDevicesData(data);
    }
    else if (type === "Comple") {
      // "Completed GCM push job timetoken: 17126153206875623 expected: 1 sent: 0 removed: 1 errored 1"
      feedback = message.replaceAll('"', '')
        .replace(" timetoken", "\n  timetoken")
        .replace(" expected", "\n  expected")
        .replace(" sent", "\n  sent")
        .replace(" removed", "\n  removed")
        .replace(" errored", "\n  errored");
    }
    else if (type === "Parse:") {
      // "Parse: job with timetoken: 17126149800833163 channel: personal.2_1414 priority: 5 body:..."
      feedback = message.replaceAll('"', '')
        .replace(":", "")
        .replace(" with timetoken", "\n  timetoken")
        .replace(" channel", "\n  channel")
        .replace(" priority", "\n  priority")
        .replace(" body", "\n  body");
    }
    else if (type === "FCM un" || type === "APNs u" || type === "APNs2 ") {
      // "APNs2 (or APNs or FCM) unregistered token: device: cjP-... timetoken: 17126165318808721"
      fcmUnregisteredDevices.push(feedback);
      let temp = fcmUnregisteredDevices;
      temp.push()

      feedback = message.replaceAll('"', '')
        .replace(" device", "\n  device token")
        .replace(" timetoken", "\n  timetoken");
    }
    else if (type === "No mob") {
      // single line of text - nothing to format
      feedback += "\n" + message.replaceAll('"', '');
    }
    else {
      // the published real-time message payload
      feedback = "\n\n=====\n\nComplete Real-time Message received:\n" + message;
    }

    return feedback + "\n\n";
  }

  const manageSubscription = () => {
    console.log("PushTest:manageSubscription: channel: ", pushDebugContext.pushChannel);
    if (pushDebugContext.subscribeButtonLabel === "Unsubscribe") {
      keySetContext.pubnub.unsubscribeAll();
    }

    else {
      if (!keySetContext.pubnub.listener) {
        console.log("need to createListener");
        createListener();
      }

      console.log("before subscribe");
      keySetContext.pubnub.subscribe({channels: [pushChannel, pushChannel + "-pndebug"]});
    }
  }

  const handlePublishClick = () => {
    if ((pushDebugContext.pushChannel === "" || pushDebugContext.pushChannel === "") && pushDebugContext.isWarnUnsubscribed) {
      // display warning: publish will work but receiving messages will not work
      confirmAlert("Send without subscribing?", "Are you sure you want to send this message?");
    }
    else {
      publishMessage();
    }
  }

  const publishMessage = () => {
    outputFeedback.current = [];
    pushDebugContext.isWarnUnsubscribed.current = false;
    pushDebugContext.setMessage(message);
    const payload = tokenizePayload(message);

    hideAlert();
    setInputRows(4);

    keySetContext.pubnub.publish(
      {
        channel : pushDebugContext.pushChannel,
        message : JSON.parse(payload),
      },
      (status, response) => {
        console.log("publish callback", status, response);
        if (!status.error) {
          pushDebugContext.counter.current++;
          // timerAlert(`Publish Success`, "Processing results, please wait just a couple seconds.", 2000);
          // // timerAlert(`Publish Success [${response.timetoken}]`, "Processing results, please wait just a couple seconds.", 2000);

          // setTimeout(function(){ 
          //   // handleOutputResults();
          //   hideAlert();
          // }, 2000);
        }
        else { // publish error
          confirmAlert("Error Publishing Message", JSON.stringify(status));
        }
      }
    );
  }

  const tokenizePayload = (message) => {
    let payload = message.replaceAll("#counter#", pushDebugContext.counter.current);
    // TODO: do the same for other things: APNs 2 Token, environment, 
    return payload;
  }

  const handleOutputResults = () => {
    let data = {"message" : outputMessage.current[0]};
    data.feedback = outputFeedback.current;

    setAllResults((allResults) => [data, ...allResults]);
    pushDebugContext.setTestResults((testResults) => [data, ...testResults]);
  }

  const getDateTime = (pntt) => {
    return new Date(parseInt((pntt+'').substring(0, 13)))
    .toISOString().replace('T', ' ').replace('Z', ' ');
  }

  const hideAlert = () => {
    console.log("hideAlert");
    setSweetAlert(null);
  };

  const timerAlert = (title, message, delay) => {
    setSweetAlert(
        <ReactBSAlert
          style={{ display: "block", marginTop: "100px" }}
          title={title}
          onConfirm={() => hideAlert()}
          showConfirm={false}
        >
          {message}
        </ReactBSAlert>
    );
    setTimeout(function() {hideAlert()}, delay);
  };

  const confirmAlert = (title, alertMessage) => {
    setSweetAlert(
        <ReactBSAlert
          question
          style={{ display: "block", marginTop: "100px" }}
          title={title}
          onConfirm={() => publishMessage()}
          onCancel={() => hideAlert()}
          showCancel
          confirmBtnBsStyle="danger"
          confirmBtnText="Confirm"
          cancelBtnBsStyle="secondary"
          cancelBtnText="Cancel"
          reverseButtons={true}
          btnSize=""
        >
          {alertMessage}
        </ReactBSAlert>
    );
  };

  return (
    <>
      {sweetAlert}
      <Container className="mt--7" fluid>
        <Row className="mt-0">
          <Col className="order-xl-2">
            <Card className="bg-secondary shadow"> 
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Mobile Push Test</h3>
                  </div>
                </Row>
              </CardHeader>   
                
              <Row>
                <CardBody>
                  <RegisteredDevicesCard data={registeredDevicesData}/>
                </CardBody>
                
                <CardBody>
                  <RegisteredDevicesCard data={registeredDevicesData}/>
                </CardBody>

                <CardBody>
                  <RegisteredDevicesCard data={registeredDevicesData}/>
                </CardBody>
              </Row>

              <Row>
                <CardBody>
                  <DevicesTable data={fcmUnregisteredDevices}/>
                </CardBody>
              </Row>
              
              <CardBody>
                <Form>
                  <CardHeader>
                    <FormGroup>
                      <Row>
                        <Col>
                          <label
                            className="form-control-label"
                            htmlFor="input-channel"
                          >
                            Target Channel
                          </label>
                        </Col>
                        <Col className="col text-right">
                          <Button
                            color="danger"
                            onClick={manageSubscription}
                            size="sm"
                            disabled = {keySetContext.pubnub == null || pushChannel === ""}
                          >
                            {pushDebugContext.subscribeButtonLabel}
                          </Button>
                        </Col>
                      </Row>
                      <Input
                        className="form-control-alternative"
                        id="input-channel"
                        placeholder="Enter primary message channel"
                        type="text"
                        value={pushChannel}
                        onChange={(e) => setPushChannel(e.target.value)}
                      />
                    </FormGroup>
                  </CardHeader>
                  <div className="nav-wrapper">
                    <Row>
                      <Col sm="12">
                        <Card body>
                          <FormGroup>
                            <Row>
                              <Col>
                                <label
                                  className="form-control-label"
                                  htmlFor="input-channel"
                                >
                                  Message Payload
                                </label>
                              </Col>
                              <Col className="col text-right">
                                <Button
                                  color="danger"
                                  size="sm"
                                  onClick={handlePublishClick}
                                  disabled={keySetContext.pubnub == null || message === ""}
                                >
                                  Publish
                                </Button>
                              </Col>
                            </Row>
                            <Input
                              className="form-control-alternative"
                              id="input-message"
                              placeholder="Enter message with push payload"
                              type="textarea"
                              rows={inputRows}
                              value={message}
                              onChange={(e) => setMessage(e.target.value)}
                            />
                          </FormGroup>
                        </Card>
                      </Col>
                    </Row>

                    <Card>
                      <Row>
                        <Col sm="12">
                          <CardHeader>
                            <Row>
                              <Col>
                                <label
                                  className="form-control-label"
                                  htmlFor="output-received-messages"
                                >
                                  Test Results
                                </label>
                                
                              </Col>
                              <Col className="col text-right">
                                <Button
                                  color="danger"
                                  size="sm"
                                  onClick={() => setAllResults([])}
                                >
                                  Clear
                                </Button>
                              </Col>
                            </Row>
                          </CardHeader>
                          <Card body>
                            <div className="pl-lg-12">
                              <table className="table-light" 
                                style={{'border': '2px solid black',}}
                              >
                                <thead >
                                  <tr width="100%">
                                    <th width="100%">Feedback Results</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <MessageRows messages={allResults}/>
                                </tbody>
                              </table>
                            </div>
                          </Card>
                        </Col>
                      </Row>
                    </Card>
                  </div>
                </Form>
              </CardBody>
            </Card>
            <p />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default PushTest;

const DevicesTable = ({data}) => {
  console.log("messages", data);

  if (data == null || data.length ===0) return <>No Results</>;

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell align="right">#</TableCell>
              <TableCell>Device</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((row, index) => (
              <DeviceRow index={index} row={row}/>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

const DeviceRow = ({index, row}) => {
  console.log("device row", row);

  return (
    <>
      <TableRow key={index} sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell align="right">{index}</TableCell>
        <TableCell component="th" scope="row">{row}</TableCell>
      </TableRow>
    </>
  );
}

const RegisteredDevicesCard = (data) => {
  if (data === undefined) return;

  return (
    <>
      <div style={{ width: "16rem" }}>
        <Card className="card-stats mb-4 mb-lg-0">
          <CardBody>
            <Row>
              <div className="col">
                <CardTitle className="text-uppercase text-muted mb-0">
                  Registered Devices
                </CardTitle>
                <Col>
                  <Row className= "h2 font-weight-bold mb-0">
                    <Col>FCM</Col><Col>{data.data.fcmDevices}</Col>
                  </Row>
                  <Row className= "h2 font-weight-bold mb-0">
                    <Col>APNs2</Col><Col>{data.data.apns2Devices}</Col>
                  </Row>
                  <Row className= "h2 font-weight-bold mb-0">
                    <Col>APNs</Col><Col>{data.data.apnsDevices}</Col>
                  </Row>
                </Col>
              </div>
              {/* <Col className="col-auto">
                <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                  <i className="fas fa-chart-bar" />
                </div>
              </Col> */}
            </Row>
            {/* <p className="mt-3 mb-0 text-muted text-sm">
              <span className="text-success mr-2">
                <i className="fa fa-arrow-up" />
                3.48%
              </span>
              <span className="text-nowrap">Since last month</span>
            </p> */}
          </CardBody>
        </Card>
      </div>
    </>
  );
}

const UnregisteredDevices = (data) => {
  if (data === undefined) return;

  return (
    <>
      <Table className="align-items-center" responsive>
        <thead className="thead-light">
          <tr>
            <th scope="col">Project</th>
            <th scope="col">Budget</th>
            <th scope="col">Status</th>
            <th scope="col">Users</th>
            <th scope="col">Completion</th>
            <th scope="col" />
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">
              <Media className="align-items-center">
                <a
                  className="avatar rounded-circle mr-3"
                  href="#pablo"
                  onClick={e => e.preventDefault()}
                >
                  <img
                    alt="..."
                    src={require("assets/img/theme/bootstrap.jpg").default}
                  />
                </a>
                <Media>
                  <span className="mb-0 text-sm">
                    Argon Design System
                  </span>
                </Media>
              </Media>
            </th>
            <td>$2,500 USD</td>
            <td>
              <Badge color="" className="badge-dot mr-4">
                <i className="bg-warning" />
                pending
              </Badge>
            </td>
            <td>
              <div className="avatar-group">
                <a
                  className="avatar avatar-sm"
                  href="#pablo"
                  id="tooltip742438047"
                  onClick={e => e.preventDefault()}
                >
                  <img
                    alt="..."
                    className="rounded-circle"
                    src={require("assets/img/theme/team-1-800x800.jpg").default}
                  />
                </a>
                <UncontrolledTooltip
                  delay={0}
                  target="tooltip742438047"
                >
                  Ryan Tompson
                </UncontrolledTooltip>
                <a
                  className="avatar avatar-sm"
                  href="#pablo"
                  id="tooltip941738690"
                  onClick={e => e.preventDefault()}
                >
                  <img
                    alt="..."
                    className="rounded-circle"
                    src={require("assets/img/theme/team-2-800x800.jpg").default}
                  />
                </a>
                <UncontrolledTooltip
                  delay={0}
                  target="tooltip941738690"
                >
                  Romina Hadid
                </UncontrolledTooltip>
                <a
                  className="avatar avatar-sm"
                  href="#pablo"
                  id="tooltip804044742"
                  onClick={e => e.preventDefault()}
                >
                  <img
                    alt="..."
                    className="rounded-circle"
                    src={require("assets/img/theme/team-3-800x800.jpg").default}
                  />
                </a>
                <UncontrolledTooltip
                  delay={0}
                  target="tooltip804044742"
                >
                  Alexander Smith
                </UncontrolledTooltip>
                <a
                  className="avatar avatar-sm"
                  href="#pablo"
                  id="tooltip996637554"
                  onClick={e => e.preventDefault()}
                >
                  <img
                    alt="..."
                    className="rounded-circle"
                    src={require("assets/img/theme/team-4-800x800.jpg").default}
                  />
                </a>
                <UncontrolledTooltip
                  delay={0}
                  target="tooltip996637554"
                >
                  Jessica Doe
                </UncontrolledTooltip>
              </div>
            </td>
            <td>
              <div className="d-flex align-items-center">
                <span className="mr-2">60%</span>
                <div>
                  <Progress
                    max="100"
                    value="60"
                    barClassName="bg-danger"
                  />
                </div>
              </div>
            </td>
            <td className="text-right">
              <UncontrolledDropdown>
                <DropdownToggle
                  className="btn-icon-only text-light"
                  href="#pablo"
                  role="button"
                  size="sm"
                  color=""
                  onClick={e => e.preventDefault()}
                >
                  <i className="fas fa-ellipsis-v" />
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-arrow" right>
                  <DropdownItem
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                  >
                    Action
                  </DropdownItem>
                  <DropdownItem
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                  >
                    Another action
                  </DropdownItem>
                  <DropdownItem
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                  >
                    Something else here
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </td>
          </tr>
          <tr>
            <th scope="row">
              <Media className="align-items-center">
                <a
                  className="avatar rounded-circle mr-3"
                  href="#pablo"
                  onClick={e => e.preventDefault()}
                >
                  <img
                    alt="..."
                    src={require("assets/img/theme/angular.jpg").default}
                  />
                </a>
                <Media>
                  <span className="mb-0 text-sm">
                    Angular Now UI Kit PRO
                  </span>
                </Media>
              </Media>
            </th>
            <td>$1,800 USD</td>
            <td>
              <Badge color="" className="badge-dot">
                <i className="bg-success" />
                completed
              </Badge>
            </td>
            <td>
              <div className="avatar-group">
                <a
                  className="avatar avatar-sm"
                  href="#pablo"
                  id="tooltip746418347"
                  onClick={e => e.preventDefault()}
                >
                  <img
                    alt="..."
                    className="rounded-circle"
                    src={require("assets/img/theme/team-1-800x800.jpg").default}
                  />
                </a>
                <UncontrolledTooltip
                  delay={0}
                  target="tooltip746418347"
                >
                  Ryan Tompson
                </UncontrolledTooltip>
                <a
                  className="avatar avatar-sm"
                  href="#pablo"
                  id="tooltip102182364"
                  onClick={e => e.preventDefault()}
                >
                  <img
                    alt="..."
                    className="rounded-circle"
                    src={require("assets/img/theme/team-2-800x800.jpg").default}
                  />
                </a>
                <UncontrolledTooltip
                  delay={0}
                  target="tooltip102182364"
                >
                  Romina Hadid
                </UncontrolledTooltip>
                <a
                  className="avatar avatar-sm"
                  href="#pablo"
                  id="tooltip406489510"
                  onClick={e => e.preventDefault()}
                >
                  <img
                    alt="..."
                    className="rounded-circle"
                    src={require("assets/img/theme/team-3-800x800.jpg").default}
                  />
                </a>
                <UncontrolledTooltip
                  delay={0}
                  target="tooltip406489510"
                >
                  Alexander Smith
                </UncontrolledTooltip>
                <a
                  className="avatar avatar-sm"
                  href="#pablo"
                  id="tooltip476840018"
                  onClick={e => e.preventDefault()}
                >
                  <img
                    alt="..."
                    className="rounded-circle"
                    src={require("assets/img/theme/team-4-800x800.jpg").default}
                  />
                </a>
                <UncontrolledTooltip
                  delay={0}
                  target="tooltip476840018"
                >
                  Jessica Doe
                </UncontrolledTooltip>
              </div>
            </td>
            <td>
              <div className="d-flex align-items-center">
                <span className="mr-2">100%</span>
                <div>
                  <Progress
                    max="100"
                    value="100"
                    barClassName="bg-success"
                  />
                </div>
              </div>
            </td>
            <td className="text-right">
              <UncontrolledDropdown>
                <DropdownToggle
                  className="btn-icon-only text-light"
                  href="#pablo"
                  role="button"
                  size="sm"
                  color=""
                  onClick={e => e.preventDefault()}
                >
                  <i className="fas fa-ellipsis-v" />
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-arrow" right>
                  <DropdownItem
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                  >
                    Action
                  </DropdownItem>
                  <DropdownItem
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                  >
                    Another action
                  </DropdownItem>
                  <DropdownItem
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                  >
                    Something else here
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </td>
          </tr>
          <tr>
            <th scope="row">
              <Media className="align-items-center">
                <a
                  className="avatar rounded-circle mr-3"
                  href="#pablo"
                  onClick={e => e.preventDefault()}
                >
                  <img
                    alt="..."
                    src={require("assets/img/theme/sketch.jpg").default}
                  />
                </a>
                <Media>
                  <span className="mb-0 text-sm">
                    Black Dashboard
                  </span>
                </Media>
              </Media>
            </th>
            <td>$3,150 USD</td>
            <td>
              <Badge color="" className="badge-dot mr-4">
                <i className="bg-danger" />
                delayed
              </Badge>
            </td>
            <td>
              <div className="avatar-group">
                <a
                  className="avatar avatar-sm"
                  href="#pablo"
                  id="tooltip753056318"
                  onClick={e => e.preventDefault()}
                >
                  <img
                    alt="..."
                    className="rounded-circle"
                    src={require("assets/img/theme/team-1-800x800.jpg").default}
                  />
                </a>
                <UncontrolledTooltip
                  delay={0}
                  target="tooltip753056318"
                >
                  Ryan Tompson
                </UncontrolledTooltip>
                <a
                  className="avatar avatar-sm"
                  href="#pablo"
                  id="tooltip441753266"
                  onClick={e => e.preventDefault()}
                >
                  <img
                    alt="..."
                    className="rounded-circle"
                    src={require("assets/img/theme/team-2-800x800.jpg").default}
                  />
                </a>
                <UncontrolledTooltip
                  delay={0}
                  target="tooltip441753266"
                >
                  Romina Hadid
                </UncontrolledTooltip>
                <a
                  className="avatar avatar-sm"
                  href="#pablo"
                  id="tooltip188462246"
                  onClick={e => e.preventDefault()}
                >
                  <img
                    alt="..."
                    className="rounded-circle"
                    src={require("assets/img/theme/team-3-800x800.jpg").default}
                  />
                </a>
                <UncontrolledTooltip
                  delay={0}
                  target="tooltip188462246"
                >
                  Alexander Smith
                </UncontrolledTooltip>
                <a
                  className="avatar avatar-sm"
                  href="#pablo"
                  id="tooltip621168444"
                  onClick={e => e.preventDefault()}
                >
                  <img
                    alt="..."
                    className="rounded-circle"
                    src={require("assets/img/theme/team-4-800x800.jpg").default}
                  />
                </a>
                <UncontrolledTooltip
                  delay={0}
                  target="tooltip621168444"
                >
                  Jessica Doe
                </UncontrolledTooltip>
              </div>
            </td>
            <td>
              <div className="d-flex align-items-center">
                <span className="mr-2">72%</span>
                <div>
                  <Progress
                    max="100"
                    value="72"
                    barClassName="bg-danger"
                  />
                </div>
              </div>
            </td>
            <td className="text-right">
              <UncontrolledDropdown>
                <DropdownToggle
                  className="btn-icon-only text-light"
                  href="#pablo"
                  role="button"
                  size="sm"
                  color=""
                  onClick={e => e.preventDefault()}
                >
                  <i className="fas fa-ellipsis-v" />
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-arrow" right>
                  <DropdownItem
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                  >
                    Action
                  </DropdownItem>
                  <DropdownItem
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                  >
                    Another action
                  </DropdownItem>
                  <DropdownItem
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                  >
                    Something else here
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </td>
          </tr>
          <tr>
            <th scope="row">
              <Media className="align-items-center">
                <a
                  className="avatar rounded-circle mr-3"
                  href="#pablo"
                  onClick={e => e.preventDefault()}
                >
                  <img
                    alt="..."
                    src={require("assets/img/theme/react.jpg").default}
                  />
                </a>
                <Media>
                  <span className="mb-0 text-sm">
                    React Material Dashboard
                  </span>
                </Media>
              </Media>
            </th>
            <td>$4,400 USD</td>
            <td>
              <Badge color="" className="badge-dot">
                <i className="bg-info" />
                on schedule
              </Badge>
            </td>
            <td>
              <div className="avatar-group">
                <a
                  className="avatar avatar-sm"
                  href="#pablo"
                  id="tooltip875258217"
                  onClick={e => e.preventDefault()}
                >
                  <img
                    alt="..."
                    className="rounded-circle"
                    src={require("assets/img/theme/team-1-800x800.jpg").default}
                  />
                </a>
                <UncontrolledTooltip
                  delay={0}
                  target="tooltip875258217"
                >
                  Ryan Tompson
                </UncontrolledTooltip>
                <a
                  className="avatar avatar-sm"
                  href="#pablo"
                  id="tooltip834416663"
                  onClick={e => e.preventDefault()}
                >
                  <img
                    alt="..."
                    className="rounded-circle"
                    src={require("assets/img/theme/team-2-800x800.jpg").default}
                  />
                </a>
                <UncontrolledTooltip
                  delay={0}
                  target="tooltip834416663"
                >
                  Romina Hadid
                </UncontrolledTooltip>
                <a
                  className="avatar avatar-sm"
                  href="#pablo"
                  id="tooltip372449339"
                  onClick={e => e.preventDefault()}
                >
                  <img
                    alt="..."
                    className="rounded-circle"
                    src={require("assets/img/theme/team-3-800x800.jpg").default}
                  />
                </a>
                <UncontrolledTooltip
                  delay={0}
                  target="tooltip372449339"
                >
                  Alexander Smith
                </UncontrolledTooltip>
                <a
                  className="avatar avatar-sm"
                  href="#pablo"
                  id="tooltip108714769"
                  onClick={e => e.preventDefault()}
                >
                  <img
                    alt="..."
                    className="rounded-circle"
                    src={require("assets/img/theme/team-4-800x800.jpg").default}
                  />
                </a>
                <UncontrolledTooltip
                  delay={0}
                  target="tooltip108714769"
                >
                  Jessica Doe
                </UncontrolledTooltip>
              </div>
            </td>
            <td>
              <div className="d-flex align-items-center">
                <span className="mr-2">90%</span>
                <div>
                  <Progress
                    max="100"
                    value="90"
                    barClassName="bg-info"
                  />
                </div>
              </div>
            </td>
            <td className="text-right">
              <UncontrolledDropdown>
                <DropdownToggle
                  className="btn-icon-only text-light"
                  href="#pablo"
                  role="button"
                  size="sm"
                  color=""
                  onClick={e => e.preventDefault()}
                >
                  <i className="fas fa-ellipsis-v" />
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-arrow" right>
                  <DropdownItem
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                  >
                    Action
                  </DropdownItem>
                  <DropdownItem
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                  >
                    Another action
                  </DropdownItem>
                  <DropdownItem
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                  >
                    Something else here
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </td>
          </tr>
          <tr>
            <th scope="row">
              <Media className="align-items-center">
                <a
                  className="avatar rounded-circle mr-3"
                  href="#pablo"
                  onClick={e => e.preventDefault()}
                >
                  <img
                    alt="..."
                    src={require("assets/img/theme/vue.jpg").default}
                  />
                </a>
                <Media>
                  <span className="mb-0 text-sm">
                    Vue Paper UI Kit PRO
                  </span>
                </Media>
              </Media>
            </th>
            <td>$2,200 USD</td>
            <td>
              <Badge color="" className="badge-dot mr-4">
                <i className="bg-success" />
                completed
              </Badge>
            </td>
            <td>
              <div className="avatar-group">
                <a
                  className="avatar avatar-sm"
                  href="#pablo"
                  id="tooltip664029969"
                  onClick={e => e.preventDefault()}
                >
                  <img
                    alt="..."
                    className="rounded-circle"
                    src={require("assets/img/theme/team-1-800x800.jpg").default}
                  />
                </a>
                <UncontrolledTooltip
                  delay={0}
                  target="tooltip664029969"
                >
                  Ryan Tompson
                </UncontrolledTooltip>
                <a
                  className="avatar avatar-sm"
                  href="#pablo"
                  id="tooltip806693074"
                  onClick={e => e.preventDefault()}
                >
                  <img
                    alt="..."
                    className="rounded-circle"
                    src={require("assets/img/theme/team-2-800x800.jpg").default}
                  />
                </a>
                <UncontrolledTooltip
                  delay={0}
                  target="tooltip806693074"
                >
                  Romina Hadid
                </UncontrolledTooltip>
                <a
                  className="avatar avatar-sm"
                  href="#pablo"
                  id="tooltip844096937"
                  onClick={e => e.preventDefault()}
                >
                  <img
                    alt="..."
                    className="rounded-circle"
                    src={require("assets/img/theme/team-3-800x800.jpg").default}
                  />
                </a>
                <UncontrolledTooltip
                  delay={0}
                  target="tooltip844096937"
                >
                  Alexander Smith
                </UncontrolledTooltip>
                <a
                  className="avatar avatar-sm"
                  href="#pablo"
                  id="tooltip757459971"
                  onClick={e => e.preventDefault()}
                >
                  <img
                    alt="..."
                    className="rounded-circle"
                    src={require("assets/img/theme/team-4-800x800.jpg").default}
                  />
                </a>
                <UncontrolledTooltip
                  delay={0}
                  target="tooltip757459971"
                >
                  Jessica Doe
                </UncontrolledTooltip>
              </div>
            </td>
            <td>
              <div className="d-flex align-items-center">
                <span className="mr-2">100%</span>
                <div>
                  <Progress
                    max="100"
                    value="100"
                    barClassName="bg-success"
                  />
                </div>
              </div>
            </td>
            <td className="text-right">
              <UncontrolledDropdown>
                <DropdownToggle
                  className="btn-icon-only text-light"
                  href="#pablo"
                  role="button"
                  size="sm"
                  color=""
                  onClick={e => e.preventDefault()}
                >
                  <i className="fas fa-ellipsis-v" />
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-arrow" right>
                  <DropdownItem
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                  >
                    Action
                  </DropdownItem>
                  <DropdownItem
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                  >
                    Another action
                  </DropdownItem>
                  <DropdownItem
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                  >
                    Something else here
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}


// function MessageTable() {
//   console.log("MessageTable");

//   return (
//     <table className="table-light" 
//       style={{'border': '2px solid black',}}
//     >
//       <thead >
//         <tr>
//           <th >Message Payload</th>
//         </tr>
//       </thead>
//       <tbody>
//         <MessageRows/>
//       </tbody>
//     </table>
//   );
// }

function MessageRows(props) {
  console.log("MessageRows: props=", props);
  if (props.messages === undefined || props.messages.length === 0) return <></>;

  const rows = props.messages.map((msg, index) =>
    <tr 
      index={index}
      width='100%' 
      style={{
        'verticalAlign': 'top',
        'whiteSpace': 'pre-wrap',
        'fontFamily': "'Consolas', 'monaco', 'monospace'",
      }}
    >
      <td
        width='100%'
        style={{'padding': '10px'}}
      >
        {msg}
      </td>
    </tr>
  );
  return (
    rows
  );
}