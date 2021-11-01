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
import { useKeySetData } from "../../../KeySetProvider";

const PushTest = (props) => {
  const keySetContext = useKeySetData();
  console.log("KEYSET keySetContext: ", keySetContext);

  const messageDefault = JSON.stringify({
    "pn_debug": true,
    "text": "This is test message from PubNub - #counter#",
    "pn_apns": {
      "aps": {
        "alert": {
          "title": "PN Test Message - #counter#",
          "body": "This is test message from PubNub - ask Mike Comer if you are concerned",
          "content-available": "1"
        },
      },
      "pn_push":[
        {
          "push_type": "alert",
          "auth_method": "token",
          "targets":[
            {
              "environment":"production",
              "topic":"com.everbridge.mobile.iv.Recipient"
            }
          ],
          "version":"v2"
        }
      ]
    },
    "pn_gcm": {
      "notification": {
          "title": "PN Test Message - #counter#",
          "body": "This is test message from PubNub - ask Mike Comer if you are concerned"
      }
    }
  }, null, 2);

  const [channel, setChannel] = useState("19e4598ef7278c4aa5c70fbd533d2788da9145a8512ba11ea9b303d4ec3bafab-push");
  const [subscribeMessageChannel, setSubscribeMessageChannel] = useState();
  const [subscribeFeedbackChannel, setSubscribeFeedbackChannel] = useState();
  const [subscribeButtonLabel, setSubscribeButtonLabel] = useState("Subscribe");

  const [message, setMessage] = useState(messageDefault);
  const [inputRows, setInputRows] = useState(28);

  const [alert, setAlert] = useState(null);
  // probably should be useRef
  const isWarnUnsubscribed = useRef(true);
  const [isInitialized, setIsInitialized] = useState(keySetContext.pubnub != null);

  const outputMessage = useRef();
  const outputFeedback = useRef([]);
  const [allResults, setAllResults] = useState(() => []);

  // const [counter, setCounter] = useState(0);
  const counter = useRef(0);

  const createListener = () => {
    console.log("PushTest:createListener: ");

    keySetContext.pubnub.addListener({
      status: function(status) {
        console.log("status callback: ", status);

        if (status.category === "PNConnectedCategory" && status.operation === "PNSubscribeOperation") {
          setSubscribeMessageChannel(() => status.subscribedChannels[0]);
          setSubscribeFeedbackChannel(() => status.subscribedChannels[1]);
          setSubscribeButtonLabel((subscribeStatusLabel) => "Unsubscribe");
          timerAlert("Subscribe Success", 'You have successfully subscribed', 3000);
        }
        else if (status.operation === "PNUnsubscribeOperation") {
          setSubscribeButtonLabel((subscribeStatusLabel) => "Subscribe");
          isWarnUnsubscribed.current = true;
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
        console.log("message callback: channel", msg.channel, "; message", msg.message);
        const timestamp = getDateTime(msg.timetoken) + "UTC\n[" + msg.timetoken + "]";
        const message = JSON.stringify(msg.message, null, 2);

        if (msg.channel === channel) {
          // setOutputMessage((outputMessage) => timestamp + "\n" + message);
          outputMessage.current = timestamp + "\n" + message;
        }
        else { // -pndebug
          // setOutputFeedback((outputFeedback) => [parseFeedback(message), ...outputFeedback]);
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
    console.log("PushTest:manageSubscription: channel: ", channel);
    
    if (subscribeButtonLabel === "Unsubscribe") {
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
        keySetContext.pubnub.subscribe({channels: [channel, channel + "-pndebug"]});
      }, delay);
    }
  }

  const handlePublishClick = () => {
    if (subscribeFeedbackChannel === "" && isWarnUnsubscribed) {
      // display warning: publish will work but receiving messages will not work
      confirmAlert("Send without subscribing?", "Are you sure you want to send this message?");
    }
    else {
      publishMessage();
    }
  }

  const publishMessage = () => {
    // console.log("publishMessage: channel:", channel, "; message:", message);

    outputFeedback.current = [];
    isWarnUnsubscribed.current = false;
    hideAlert();
    setInputRows(4);

    const payload = tokenizePayload(message);

    keySetContext.pubnub.publish(
      {
        channel : channel,
        message : JSON.parse(payload),
      },
      (status, response) => {
        // console.log("status:", JSON.stringify(status));
        // console.log("response", JSON.stringify(response));

        // setCounter((counter) => ++counter);
        counter.current++;
        timerAlert("Processing Results", "Please wait just a couple seconds.", 2000);

        setTimeout(function(){ 
          handleOutputResults();
          hideAlert();
        }, 2000);
      }
    );
  }

  const tokenizePayload = (message) => {
    let payload = message.replaceAll("#counter#", counter.current);
    // TODO: do the same for other things: APNs 2 Token, environment, 
    return payload;
  }

  const handleOutputResults = () => {
    // console.log("PushTest:handleOutputResults");

    let data = {"message" : outputMessage.current};
    data.feedback = outputFeedback.current;
    setAllResults((allResults) => [data, ...allResults]);
  }

  const getDateTime = (pntt) => {
    return new Date(parseInt((pntt+'').substring(0, 13)))
    .toISOString().replace('T', ' ').replace('Z', ' ');
  }

  const hideAlert = () => {
    console.log("hideAlert");
    setAlert(null);
  };

  const timerAlert = (title, message, delay) => {
    setAlert(
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
    setAlert(
        <ReactBSAlert
          question
          style={{ display: "block", marginTop: "100px" }}
          title={title}
          onConfirm={() => publishMessage()}
          onCancel={() => hideAlert()}
          showCancel
          confirmBtnBsStyle="primary"
          confirmBtnText="Confirm"
          cancelBtnBsStyle="info"
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
      {alert}
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
                            color="primary"
                            href="#pablo"
                            onClick={manageSubscription}
                            size="sm"
                            disabled = {!isInitialized || channel === ""}
                          >
                            {subscribeButtonLabel}
                          </Button>
                        </Col>
                      </Row>
                      <Input
                        className="form-control-alternative"
                        id="input-channel"
                        placeholder="Enter primary message channel"
                        type="text"
                        onChange={(e) => setChannel(e.target.value)}
                        defaultValue="19e4598ef7278c4aa5c70fbd533d2788da9145a8512ba11ea9b303d4ec3bafab-push"
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
                                  color="primary"
                                  size="sm"
                                  onClick={handlePublishClick}
                                  disabled={!isInitialized || message === ""}
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
                              defaultValue={messageDefault}
                              onChange={(e) => setMessage(e.target.value)}
                              rows={inputRows}
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
                                  color="primary"
                                  href="#pablo"
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
    <table className="table-light" responsive
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
