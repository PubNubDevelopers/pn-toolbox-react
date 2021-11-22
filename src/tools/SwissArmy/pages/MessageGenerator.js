/*!

=========================================================
* Argon Dashboard React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import { useState, useRef } from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Container,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  // ButtonGroup,
  CardFooter,
} from "reactstrap";

// // core components
import { useKeySetData } from "../../KeySetProvider";
import { useSwissArmyData } from "../SwissArmyProvider";
import { useStopwatch } from "react-timer-hook";


const MessageGenerator = () => {
  const keySetContext = useKeySetData();
  const swissArmyContext = useSwissArmyData();


  console.log("MessageGenerator keySetContext: ", keySetContext);
  console.log("MessageGenerator swissArmyContext: ", swissArmyContext);

  const messageDefault = JSON.stringify({
    "count": "#counter#",
    "title": "Ground control to Major Tom - #counter#",
    "body": "This is ground control to Major Tom.",
    "tasks": [
      { "task": "Take your protein pills.", "priority": 1 },
      { "task": "Put your helmet on.", "priority": 2 }
    ]
  }, null, 2);

  const [recordCount, setRecordCount] = useState(0);
  const [successCount, setSuccessCount] = useState(0);
  const [failCount, setFailCount] = useState(0);
  const [progress, setProgress] = useState(0);
  const [targetChannels, setTargetChannels] = useState("");
  const [senderUuids, setSenderUuids] = useState("");
  const [message, setMessage] = useState(messageDefault);
  const [sourceData, setSourceData] = useState([]);
  const [requestDelay, setRequestDelay] = useState(10);

  const channelList = useRef([]);
  const uuidList = useRef([]);
  const counter = useRef(0);

  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    reset,
  } = useStopwatch({ autoStart: false });


  const openFile = (theFile) => {
    const propFileReader = new FileReader();

    propFileReader.onload = function (e) {
      const data = JSON.parse(e.target.result);
      setSourceData(data);
      setRecordCount(data.length);
    };

    propFileReader.readAsText(theFile);
  }

  const createChannelList = () => {
    console.log("createChannelList");
    let tmp = targetChannels.replaceAll("\n", ",").replaceAll(" ", "");
    setTargetChannels(tmp);
    channelList.current = tmp.split(",").filter(Boolean);;
    console.log("    channelList:", channelList.current);
  }

  const pickSenderUuid = () => {
    return uuidList.current[Math.floor(Math.random() * uuidList.current.length)];
  }

  const createUuidList = () => {
    console.log("createUuidList");
    let tmp = senderUuids.replaceAll("\n", ",").replaceAll(" ", "");
    setSenderUuids(tmp);
    uuidList.current = tmp.split(",").filter(Boolean);;
    console.log("    uuidList:", uuidList.current);
  }

  const pickTargetChannel = () => {
    return channelList.current[Math.floor(Math.random() * channelList.current.length)];
  }

  const generateMessages = async () => {
    console.log("generateMessages - setTimeout");

    setSuccessCount(0);
    setFailCount(0);
    setProgress(0);
    let i = 0

    createChannelList(targetChannels);

    console.log("    start timer");
    reset();
    start();

    console.log("    processMessage (first)");
    sendMessage(i);
  }

  async function sendMessage(i) {
    console.log("sendMessage ", i);

    const msg = sourceData[i];

    if (i < recordCount) {
      setTimeout(async function () {
        try {
          const result = await keySetContext.pubnub.publish({
            channel: pickTargetChannel(),
            message: msg,
          });

          console.log("  success");
          setProgress((prevProgress) => (prevProgress + 1));
          setSuccessCount((prevSuccessCount) => (prevSuccessCount + 1));
        }
        catch (status) {
          console.log("  fail", JSON.stringify(status));
          setProgress((prevProgress) => (prevProgress + 1));
          setFailCount((prevFailCount) => (prevFailCount + 1));
        }
        finally {
          sendMessage(++i);
        }
      }, requestDelay);
    }
    else {
      console.log("    pause timer");
      pause();
    }
  }

  return (
    <>
      <Container className="mt--7" fluid>
        <Row className="mt-0">
          <Col className="order-xl-2">
            <Card className="bg-secondary shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Message Generator</h3>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col>
                      <label
                        className="form-control-label"
                        htmlFor="button-open-file"
                      >
                        Source Messages File
                      </label><br />
                      <input
                        id="button-open-file"
                        type="file"
                        onChange={(e) => openFile(e.target.files[0])}
                      />
                    </Col>
                    <Col>
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-target-channels"
                        >
                          Target Channels
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="input-target-channels"
                          type="textarea"
                          rows="4"
                          value={targetChannels}
                          onChange={(e) => setTargetChannels(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-sender-uuids"
                        >
                          Sender UUIDs
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="input-sender-uuids"
                          type="textarea"
                          rows="4"
                          value={senderUuids}
                          onChange={(e) => setSenderUuids(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-record-count"
                        >
                          # Messages to Generate
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="input-record-count"
                          type="text"
                          value={recordCount}
                          onChange={(e) => setRecordCount(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-request-delay"
                        >
                          Request Interval Delay (ms)
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="input-request-delay"
                          type="text"
                          value={requestDelay}
                          onChange={(e) => setRequestDelay(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
              <CardFooter>
                <Row>
                  <Col className="text-right">
                    <Button
                      color="danger"
                      onClick={generateMessages}
                    // disabled = {keySetContext.pubnub == null || metadataRecords == null || metadataRecords.length === 0}
                    >
                      Generate Messages
                    </Button>
                  </Col>
                  <Col lg="3" className="text-center">
                  </Col>
                </Row>
              </CardFooter>
              <p/>
              <CardHeader>
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Process Report</h3>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col>
                    <div className="pl-lg-4">
                      <Row>
                        <label className="form-control-label" htmlFor="total-records">
                          Total
                        </label>
                      </Row>
                      <Row>
                        {progress}
                      </Row>
                    </div>
                  </Col>
                  <Col>
                    <div className="pl-lg-4">
                      <Row>
                        <label className="form-control-label" htmlFor="success-records">
                          Successes
                        </label>
                      </Row>
                      <Row>
                        {successCount}
                      </Row>
                    </div>
                  </Col>
                  <Col>
                    <div className="pl-lg-4">
                      <Row>
                        <label className="form-control-label" htmlFor="fail-records">
                          Fails
                        </label>
                      </Row>
                      <Row>
                        {failCount}
                      </Row>
                    </div>
                  </Col>
                  <Col>
                    <div className="pl-lg-4">
                      <Row>
                        <label className="form-control-label" htmlFor="elapsed-time">
                          Elapsed Time
                        </label>
                      </Row>
                      <Row>
                        {minutes}m {seconds}s
                      </Row>
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default MessageGenerator;