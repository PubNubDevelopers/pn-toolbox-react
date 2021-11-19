import { useState } from "react";
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

// import { subMilliseconds, fromUnixTime } from 'date-fns'

// core components
import { useKeySetData } from "../../KeySetProvider";
import { useSwissArmyData } from "../SwissArmyProvider";

const MessageGenerator = () => {
  const keySetContext = useKeySetData();
  const swissArmyContext = useSwissArmyData();

  console.log("BufferDump keySetContext: ", keySetContext);
  console.log("BufferDump swissArmyContext: ", swissArmyContext);

  const messageDefault = JSON.stringify({
    "count" : "#counter#",
    "title": "Ground control to Major Tom - #counter#",
    "body": "This is ground control to Major Tom.",
    "tasks" : [
      {"task": "Take your protein pills.", "priority": 1},
      {"task": "Put your helmet on.", "priority": 2}
    ]
  }, null, 2);

  const [channel, setChannel] = useState("");
  const [message, setMessaege] = useState(messageDefault);

  const [sweetAlert, setSweetAlert] = useState(null);

  const generateMessages = async (channel, total, start, delay) => {
    var delay = delay || 250;
    var i = start || 1;
    var total = total || 100;
    total = total + i;

    // we have to delay the publishes so that we can be sure
    // that the messages are stored in the order we publish
    var looper = setInterval(
        function() {
            keySetContext.pubnub.publish({
            channel: channel,
            message: "message #" + i++
        });

        if (i >= total) {
            clearInterval(looper);
        }
    },
    delay);
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
                    <h3 className="mb-0">Message Buffer Dump</h3>
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
                            onClick={(e) => generateMessages(e)}
                            size="sm"
                            disabled = {keySetContext.pubnub == null || channel === "" || message === ""}
                          >
                            Generate Messages
                          </Button>
                        </Col>
                      </Row>
                      <Input
                        className="form-control-alternative"
                        id="input-channel"
                        placeholder="Enter target channel"
                        type="text"
                        value={channel}
                        onChange={(e) => setChannel(e.target.value)}
                      />
                    </FormGroup>
                  </CardHeader>
                  <div className="nav-wrapper">
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
                                  Buffer Messages
                                </label>
                                
                              </Col>
                            </Row>
                          </CardHeader>
                          <Card body>
                            <div className="pl-lg-12">

                             
                            
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

export default MessageGenerator;

