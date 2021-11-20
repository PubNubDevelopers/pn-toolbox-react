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

  const [recordCount, setRecordCount] = useState(0);
  const [successCount, setSuccessCount] = useState(0);
  const [failCount, setFailCount] = useState(0);
  const [progress, setProgress] = useState(0);
  const [targetChannels, setTargetChannels] = useState("");
  const [message, setMessage] = useState(messageDefault);
  const [sourceData, setSourceData] = useState([]);

  const counter = useRef(0);

  const openFile = (theFile) => {
    const propFileReader = new FileReader();

    propFileReader.onload = function(e) {
      const data = JSON.parse(e.target.result);
      setSourceData(data);
      setRecordCount(data.length);
    };
    
    propFileReader.readAsText(theFile);
  }
  

  const generateMessages = () => {
    console.log("generateMessages");

    setSuccessCount(0);
    setFailCount(0);
    setProgress(0);

    let record = {};
    const channelList = createChannelList(pickTargetChannel(targetChannels));

    for (let i = 0; i < recordCount; ++i) {
      // get sourceData might be upload file or just fixed message
      const msg = sourceData[i];
      
      // 1) inject counter, datetime, timetoken, uuid

      sendMessage(pickTargetChannel(channelList), msg);
    } // for
  }

  const createChannelList = () => {
    let tmp = targetChannels.replaceAll("\n", ",").replaceAll(" ", "");
    return tmp.split(",").filter(Boolean);
  }

  const pickTargetChannel = (channels) => {
    return channels[Math.floor(Math.random() * channels.length)];
  }

  async function sendMessage(theChannel, theMessage) {
    console.log("sendMessage:", theChannel, theMessage);

    try {
      const result = await keySetContext.pubnub.publish({
        channel: theChannel,
        message: theMessage,
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
                    <h3 className="mb-0">Import Metadata</h3>
                  </div>
                  <div className="col text-right">
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
              <Row>
                <Col>
                  <div className="pl-lg-4">
                    <Row>
                      <Col>
                        <label
                          className="form-control-label"
                          htmlFor="button-open-file"
                        >
                          Source Messages File
                        </label><br/>
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
                            onChange={(e) => setTargetChannels(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <Form>
                    <div className="pl-lg-4">
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
                      </Row>
                    </div>
                  </Form>
                  <div className="pl-lg-4">
                    <Row>
                      <Col>
                        <label
                          className="form-control-label"
                          htmlFor="success-count"
                        >
                          Success Count
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="success-count"
                          type="text"
                          value={successCount}
                          disabled
                        />
                      </Col>
                    </Row>
                  </div>
                  <div className="pl-lg-4">
                    <Row>
                      <Col>
                        <label
                          className="form-control-label"
                          htmlFor="failed-count"
                        >
                          Fail Count
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="failed-count"
                          type="text"
                          value={failCount}
                          disabled
                        />
                      </Col>
                    </Row>
                  </div>
                  <div className="pl-lg-4">
                    <Row>
                      <Col>
                        <label
                          className="form-control-label"
                          htmlFor="processed-count"
                        >
                          Total Records Processed
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="processed-count"
                          type="text"
                          value={progress}
                          disabled
                        />
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
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
            </Card>
          </Col>
        </Row>
      </Container> 
    </>
  );
};

export default MessageGenerator;