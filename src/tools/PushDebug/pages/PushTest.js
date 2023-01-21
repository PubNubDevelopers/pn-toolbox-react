import { useState, useRef } from "react";
import ReactBSAlert from "react-bootstrap-sweetalert";

// reactstrap components
import {
  Button,
  Card,
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

        if (msg.channel === pushChannel) {
          outputMessage.current[0] = timestamp + "\n" + message;
        }
        else if (msg.channel === pushChannel + "-pndebug") {
          outputFeedback.current.push(parseFeedback(message));
        }
      }
    });
  }

  const parseFeedback = (message) => {
    let feedback = "";
    const type = message.substring(1, 7);

    console.log("    feedback: ", message.substring(0,20), "; type: ", type);

    if (type === "Regist") {
      let heading = message.substring(1, message.indexOf("[") - 1);
      heading = heading.replace(" count", ":");

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
      feedback += "\n  APNs  : " + devices[1];
      feedback += "\n  APNs 2: " + devices[3];
      feedback += "\n  FCM   : " + devices[5];
    }
    else feedback = message;

    return feedback;
  }

  const manageSubscription = () => {
    console.log("PushTest:manageSubscription: channel: ", pushDebugContext.pushChannel);
    
    if (pushDebugContext.subscribeButtonLabel === "Unsubscribe") {
      keySetContext.pubnub.unsubscribeAll();
    }

    else {
      let delay = 0;

      if (!keySetContext.pubnub.listener) {
        console.log("need to createListener");
        createListener();
        delay = 500;
      }

      console.log("before setTimeout: delay=", delay);
      setTimeout(function(){
        console.log("before subscribe");
        keySetContext.pubnub.subscribe({channels: [pushChannel, pushChannel + "-pndebug"]});
      }, delay);
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
          timerAlert(`Publish Success`, "Processing results, please wait just a couple seconds.", 2000);
          // timerAlert(`Publish Success [${response.timetoken}]`, "Processing results, please wait just a couple seconds.", 2000);

          setTimeout(function(){ 
            handleOutputResults();
            hideAlert();
          }, 2000);
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
                    <h3 className="mb-0">Push Message Test</h3>
                  </div>
                </Row>
              </CardHeader>             
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
                              <ResultsTable results={allResults}/>
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

function ResultsTable(props) {
  console.log("ResultsTable: props=", props);

  if (props.results.length === 0) return <></>;

  const outputRows = props.results.map((item, index) =>
    <>
      <tr
        index={index}
        width='100%' 
        style={{
          'border': '2px solid black',
          'verticalAlign': 'top',
          'whiteSpace': 'pre-wrap',
          'fontFamily': "'Consolas', 'monaco', 'monospace'",
        }}
      >
        <td width='40%'
          rowSpan={item.feedback.length +1}
          style={{'padding': '5px'}}
        >
          {item.message}
        </td>
      </tr>
      <FeedbackRows feedback={item.feedback}/>
    </>
  );

  return (
    <table className="table-light" 
      style={{'border': '2px solid black',}}
    >
      <thead >
        <tr>
          <th >Message Payload</th>
          <th >Push Feedback</th>
        </tr>
      </thead>
      <tbody>
        {outputRows}
      </tbody>
    </table>
  );
}


function FeedbackRows(props) {
  console.log("FeedbackRows: props=", props);

  if (props.feedback.length === 0) return <></>;

  const rows = props.feedback.map((item) =>
    <tr 
      width='100%' 
      style={{
        'verticalAlign': 'top',
        'whiteSpace': 'pre-wrap',
        'fontFamily': "'Consolas', 'monaco', 'monospace'",
      }}
    >
      <td
        width='60%'
        style={{'padding': '10px'}}
      >
        {item}
      </td>
    </tr>
  );
  return (
    rows
  );
}
