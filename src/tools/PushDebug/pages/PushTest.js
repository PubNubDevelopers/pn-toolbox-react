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

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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
  const [fcmCompletedDevicesData, setFcmCompletedDevicesData] = useState([]);

  const [unregisteredDevices, setUnregisteredDevices] = useState([]);
  const [registeredDevices, setRegisteredDevices] = useState([]);

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
      let temp = [];

      for (let i in devices) {
        let data = {};
        const index = parseInt(i) + 1;
        
        let spaces = "  ";
        if (index > 99) spaces = " "
        else if (index < 10) spaces = "   "

        dlist += "\n" + spaces + index + ") " + devices[i];
        data.type = "FCM";
        data.device = devices[i].replace("u", "");
        temp.push(data);
      }
      
      setRegisteredDevices(temp);
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

      const temp = message.split(" ");
      let data = [];
      data.expected = temp[7];
      data.sent = temp[9];
      data.removed = temp[11];
      data.errored = temp[13].replace('"', "");
      setFcmCompletedDevicesData(data);

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
      const temp = message.split(" ");
      let data = [];
      data.type = temp[0].slice(1);
      data.device = temp[4];
      let urd = unregisteredDevices;
      urd.push(data);
      // debugger;
      setUnregisteredDevices(urd);

      // let temp = fcmUnregisteredDevices;
      // temp.push(message);
      // setFcmUnregisteredDevices(temp);

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
                  <CompletedFcmDevicesCard data={fcmCompletedDevicesData}/>
                </CardBody>
              </Row>

              <CardBody>
                <label
                  className="form-control-label"
                  htmlFor="output-received-messages"
                >
                  Registered Devices (before)
                </label>
                <DevicesTable data={registeredDevices}/>
              </CardBody>

              <CardBody>
                <label
                  className="form-control-label"
                  htmlFor="output-received-messages"
                >
                  Unregistered Devices (after)
                </label>
                <DevicesTable data={unregisteredDevices}/>
              </CardBody>
              
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

  if (data == null || data.length ===0) return <><p>No Results</p></>;

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell align="right">#</TableCell>
              <TableCell>Push Type</TableCell>
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
        <TableCell align="right">{index+1}</TableCell>
        <TableCell component="th" scope="row">{row.type || ""}</TableCell>
        <TableCell component="th" scope="row">{row.device}</TableCell>
      </TableRow>
    </>
  );
}

const CompletedFcmDevicesCard = ({data}) => {
  if (data === undefined) return;

  return (
    <>
      <div style={{ width: "16rem" }}>
        <Card className="card-stats mb-4 mb-lg-0">
          <CardBody>
            <Row>
              <div className="col">
                <CardTitle className="text-uppercase text-muted mb-0">
                  Device Results 
                </CardTitle>
                <Col>
                  <Row className= "h2 font-weight-bold mb-0">
                    <Col>Expected</Col><Col align="right">{data.expected}</Col>
                  </Row>
                  <Row className= "h2 font-weight-bold mb-0">
                    <Col>Sent</Col><Col align="right">{data.sent}</Col>
                  </Row>
                  <Row className= "h2 font-weight-bold mb-0">
                    <Col>Removed</Col><Col align="right">{data.removed}</Col>
                  </Row>
                  <Row className= "h2 font-weight-bold mb-0">
                    <Col>Errored</Col><Col align="right">{data.errored}</Col>
                  </Row>
                </Col>
              </div>
              <Col className="col-auto">
                {/* <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                  <i className="fas fa-chart-bar" />
                </div> */}
              </Col>
            </Row>
            <p className="mt-3 mb-0 text-muted text-sm">
              <span className="text-success mr-2">
                <i className="fa fa-arrow-up" />
                3.48%
              </span>
              <span className="text-nowrap">Since last month</span>
            </p>
          </CardBody>
        </Card>
      </div>
    </>
  );
}

const RegisteredDevicesCard = ({data}) => {
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
                    <Col>FCM</Col><Col align="right">{data.fcmDevices}</Col>
                  </Row>
                  <Row className= "h2 font-weight-bold mb-0">
                    <Col>APNs2</Col><Col align="right">{data.apns2Devices}</Col>
                  </Row>
                  <Row className= "h2 font-weight-bold mb-0">
                    <Col>APNs</Col><Col align="right">{data.apnsDevices}</Col>
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