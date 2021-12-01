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

import { useState, useRef, useEffect } from "react";

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
  UncontrolledTooltip,
  CardFooter,
  AccordionBody,
} from "reactstrap";

// // core components
import { useKeySetData } from "../../KeySetProvider";
import { useSwissArmyData } from "../SwissArmyProvider";
import { useStopwatch } from "react-timer-hook";
import { Accordion, AccordionSummary, IconButton, InputLabel, MenuItem, Select } from "@material-ui/core";
import { Pause } from "@mui/icons-material";
import ReactBSAlert from "react-bootstrap-sweetalert";

const MessageGenerator = () => {
  const keySetContext = useKeySetData();
  const swissArmyContext = useSwissArmyData();

  console.log("MessageGenerator keySetContext: ", keySetContext);
  console.log("MessageGenerator swissArmyContext: ", swissArmyContext);

  const [successCount, setSuccessCount] = useState(0);
  const [failCount, setFailCount] = useState(0);
  const [progress, setProgress] = useState(0);
  const [estimatedTime, setEstimatedTime] = useState("");
  const isPause = useRef(false);

  const [sweetAlert, setSweetAlert] = useState(null);

  // const [isExpanded, setIsExpanded] = useState(true);

  const FILE = 10;
  const [messageStrategy, setMessageStrategy] = useState(0);
  const [sourceData, setSourceData] = useState([]);
  const [messagePayload, setMessagePayload] = useState(JSON.stringify(messageSamples[0], null, 2));

  const [isInjectCounter, setIsInjectCounter] = useState(true);
  const [isInjectTimestamp, setIsInjectTimestamp] = useState(true);

  const [recordCount, setRecordCount] = useState(50);
  const [requestDelay, setRequestDelay] = useState(10);

  const [channelStrategy, setChannelStrategy] = useState(10);
  const [targetChannels, setTargetChannels] = useState("");
  const channelList = useRef([]);

  const RANDOM = 10;
  const RROBIN = 11;
  const EXTRACT = 20;
  const [uuidStrategy, setUuidStrategy] = useState(10);
  const [senderUuids, setSenderUuids] = useState("");
  const [senderUuidKey, setSenderUuidKey] = useState();
  const uuidList = useRef([]);

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

  const handleStart = (e) => {
    e.preventDefault();
    isPause.current = false;
    start();
  }

  const handlePause = (e) => {
    e.preventDefault();
    isPause.current = true;
    pause();
  }

  useEffect(() => {
    var estMilli = recordCount * 150 + requestDelay * recordCount;
    setEstimatedTime(new Date(estMilli).toISOString().slice(11, 19));
  });

  const openFile = (theFile) => {
    if (theFile == null) return;

    const propFileReader = new FileReader();

    propFileReader.onload = function (e) {
      const data = JSON.parse(e.target.result);
      setSourceData(data);
      setRecordCount(data.length);
    };

    propFileReader.readAsText(theFile);
  }

  const handleMessageStrategySelect = (e) => {
    e.preventDefault();
    setMessageStrategy(e.target.value);
    setMessagePayload(JSON.stringify(messageSamples[e.target.value], null, 2));
  }

  const pickTargetChannel = (i) => {
    if (channelStrategy === RANDOM) {
      return channelList.current[(Math.floor(Math.random() * (channelList.current.length)))];
    }
    else { // RROBIN
      const rem = (i + 1) % channelList.current.length;
      return channelList.current[rem];
    }
  }

  const createChannelList = () => {
    console.log("createChannelList");
    let tmp = targetChannels.replaceAll("\n", ",").replaceAll(" ", "");
    setTargetChannels(tmp);
    channelList.current = tmp.split(",").filter(Boolean);;
    console.log("    channelList:", channelList.current);
  }

  const pickSenderUuid = (i) => {
    if (uuidStrategy === RANDOM) {
      return uuidList.current[(Math.floor(Math.random() * (uuidList.current.length)))];
    }
    else if (uuidStrategy === RROBIN) {
      const rem = (i + 1) % uuidList.current.length;
      return uuidList.current[rem];
    }
    else // EXTRACT from message
      return sourceData[i][senderUuidKey];
  }

  const createUuidList = () => {
    console.log("createUuidList");
    let tmp = senderUuids.replaceAll("\n", ",").replaceAll(" ", "");
    setSenderUuids(tmp);
    uuidList.current = tmp.split(",").filter(Boolean);;
    console.log("    uuidList:", uuidList.current);
  }

  const generateMessages = async () => {
    console.log("generateMessages - setTimeout");

    // setIsExpanded(false);

    setSuccessCount(0);
    setFailCount(0);
    setProgress(0);
    let i = 0

    createChannelList(targetChannels);
    createUuidList(senderUuids);

    reset();
    start();
    isPause.current = false;

    sendMessageUri(i);
  }

  const processMessage = (i) => {
    let result = {};

    if (messageStrategy === FILE) {
      result = sourceData[i];
    }
    else { // raw sample message
      result = JSON.parse(messagePayload);
    }

    if (isInjectCounter) {
      result.counter = i;
    }

    if (isInjectTimestamp) {
      result.timestamp = new Date().toISOString();
    }

    setMessagePayload(() => setMessagePayload(JSON.stringify(result, null, 2)));
    return result;
  }

  const sendMessageUri = async (i) => {
    console.log("sendMessageeUri, index=", i);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const message = encodeURI(JSON.stringify(processMessage(i)));
    const channel = pickTargetChannel(i);
    const uuid = pickSenderUuid(i);
    console.log("    target channel: ", channel);
    console.log("    sender uuid: ", uuid);

    const publishUrl = `https://ps.pndsn.com/publish/${keySetContext.pubKey}/${keySetContext.subKey}/0/${channel}/0/${message}?uuid=${uuid}&pnsdk=the-toolbox-v0.2.0`;
    console.log("    pub url: ", publishUrl);

    if (i < recordCount) {
      setTimeout(async function () {
        try {
          const response = await fetch(publishUrl, { signal: controller.signal });
          console.log("response", response);

          if (!response.ok) {
            const status = `${response.status}`;
            throw new Error(status);
          }

          const result = await response.json();

          setProgress((prevProgress) => (prevProgress + 1));
          setSuccessCount((prevSuccessCount) => (prevSuccessCount + 1));
        }
        catch (status) {
          setProgress((prevProgress) => (prevProgress + 1));
          setFailCount((prevFailCount) => (prevFailCount + 1));
        }
        finally {
          console.log("    index", i);
          console.log("    isRunning", isRunning);
          console.log("    isPause", isPause.current);

          if (isPause.current) {
            // temporary hack to halt a long running process
            if (window.confirm("Process paused: \nOK to continue process \nCancel to abort process")) {
              isPause.current = false;
            }
            else {
              i = recordCount;
              // this will exit the processing loop
            }

            // hoping for a more elegant prompt using SweetAlert
            //   but it doesn't halt processing
            // console.log("    PAUSED");
            // // alert("paused");
            // confirmAlert("Process Paused", "Resume or Abort?", 
            //   "Resume", (() => start()), 
            //   "Abort", (() => i=recordCount));
            // const pauseId = setInterval(() => {
            //   if (!isPause) clearInterval(pauseId);
            //   console.log("    STILL PAUSED?");
            // }, 250);
            // console.log("    NO LONGER PAUSED?");
            // hideAlert();
          }

          sendMessageUri(++i);
        }
      }, requestDelay);
    }
    else {
      console.log("    the end");
      pause();
    }
  }

  const hideAlert = () => {
    setSweetAlert(null);
  };

  const confirmAlert = (title, message, confirmButton, confirmFn, cancelButton, cancelFn) => {
    setSweetAlert(
        <ReactBSAlert
          question
          style={{ display: "block", marginTop: "100px" }}
          title={title}
          onConfirm={confirmFn}
          showConfirm={confirmButton != null}
          confirmBtnBsStyle="danger"
          confirmBtnText={confirmButton}
          onCancel={cancelFn}
          showCancel={cancelButton != null}
          cancelBtnBsStyle="secondary"
          cancelBtnText={cancelButton}
          reverseButtons={true}
          btnSize=""
        >
          {message}
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
              <Accordion
                accordionId="accordion-message-generator"
                expanded
              >
                <AccordionSummary
                  // expandIcon={<KeyboardArrowUp />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <h3 className="mb-0">Message Generator</h3>
                  <Col className="text-right">
                    <Button
                      color="danger"
                      onClick={generateMessages}
                      disabled={keySetContext.pubnub == null || targetChannels == null || targetChannels === ""}
                    >
                      Generate Messages
                    </Button>
                  </Col>
                </AccordionSummary>
                <AccordionBody style={{ background: "#f1f5f8" }}>
                  <CardBody>
                    <Form>
                      <Row>
                        <Col>
                          <FormGroup>
                            <InputLabel id="label-select-message-strategy"><u>Messages Source Strategy</u></InputLabel>
                            <UncontrolledTooltip
                              delay={500}
                              placement="top"
                              target="label-select-message-strategy"
                            >
                              Provide a source for the messages you want to generate: from a source file or sample JSON.
                            </UncontrolledTooltip>
                            <Select
                              labelId="label-select-message-strategy"
                              id="label-select-message-strategy"
                              value={messageStrategy}
                              label="Message Payload"
                              onChange={(e) => handleMessageStrategySelect(e)}
                            >
                              <MenuItem value={FILE}>Messages File</MenuItem>
                              <MenuItem value={0}>Sample - Simple</MenuItem>
                              <MenuItem value={1}>Sample - Major Tom</MenuItem>
                              <MenuItem value={2}>Sample - MatJ Text</MenuItem>
                              <MenuItem value={3}>Sample - MatJ L10N</MenuItem>
                              <MenuItem value={4}>Sample - MatJ Image</MenuItem>
                              <MenuItem value={5}>Sample - MatJ Typing</MenuItem>
                              <MenuItem value={6}>Sample - MatJ Invite</MenuItem>
                              <MenuItem value={7}>Sample - MatJ Poll</MenuItem>
                              <MenuItem value={8}>Sample - Push</MenuItem>
                            </Select>
                          </FormGroup>
                          <FormGroup>
                            {messageStrategy === FILE &&
                              <>
                                <InputLabel
                                  id="label-message-file"
                                  className="form-control-label"
                                  htmlFor="button-open-file"
                                >
                                  <u>Messages File</u>
                                </InputLabel>
                                <UncontrolledTooltip
                                  delay={500}
                                  placement="top"
                                  target="label-message-file"
                                >
                                  Upload a file that contains an array of JSON message payloads.
                                </UncontrolledTooltip>
                                <Input
                                  id="button-open-file"
                                  type="file"
                                  onChange={(e) => openFile(e.target.files[0])}
                                />
                                <Input
                                  className="form-control-alternative"
                                  id="input-message-file-content"
                                  type="textarea"
                                  rows="17"
                                  disabled
                                  value={JSON.stringify(sourceData, null, 2)}
                                  onChange={(e) => setMessagePayload(e.target.value)}
                                />
                              </>
                            }
                          </FormGroup>
                          <FormGroup>
                            {messageStrategy >= 0 && messageStrategy < 10 &&
                              <>
                                <InputLabel
                                  id="label-message-entry"
                                  className="form-control-label"
                                  htmlFor="input-message-entry"
                                >
                                  <u>Messages Payload</u>
                                </InputLabel>
                                <UncontrolledTooltip
                                  delay={500}
                                  placement="top"
                                  target="label-message-entry"
                                >
                                  Provide a single JSON payload to be used for every published message.
                                </UncontrolledTooltip>
                                <Input
                                  className="form-control-alternative"
                                  id="input-message-entry"
                                  type="textarea"
                                  rows="19"
                                  value={messagePayload}
                                  // {JSON.stringify(messageSamples[messageStrategy], null, 2)}
                                  onChange={(e) => setMessagePayload(e.target.value)}
                                // messageSamples[messageStrategy]
                                />
                              </>

                            }
                          </FormGroup>
                        </Col>
                        <Col>
                          <Row>
                            <Col sm="3">
                              <FormGroup>
                                <InputLabel
                                  id="label-number-messages"
                                  className="form-control-label"
                                  htmlFor="input-record-count"
                                >
                                  <u># Messages</u>
                                </InputLabel>
                                <UncontrolledTooltip
                                  delay={500}
                                  placement="top"
                                  target="label-number-messages"
                                >
                                  Total number of message to generate.
                                </UncontrolledTooltip>
                                <Input
                                  className="form-control-alternative"
                                  id="input-record-count"
                                  type="text"
                                  value={recordCount}
                                  onChange={(e) => setRecordCount(e.target.value)}
                                />
                              </FormGroup>
                            </Col>
                            <Col sm="3">
                              <FormGroup>
                                <InputLabel
                                  id="label-request-delay"
                                  className="form-control-label"
                                  htmlFor="input-request-delay"
                                >
                                  <u>Interval Delay</u>
                                </InputLabel>
                                <UncontrolledTooltip
                                  delay={500}
                                  placement="top"
                                  target="label-request-delay"
                                >
                                  Amount of delay between publishes (ms).
                                </UncontrolledTooltip>
                                <Input
                                  className="form-control-alternative"
                                  id="input-request-delay"
                                  type="text"
                                  value={requestDelay}
                                  onChange={(e) => setRequestDelay(e.target.value)}
                                />
                              </FormGroup>
                            </Col>
                            <Col></Col>
                            <Col sm="4">
                              <FormGroup>
                                <Row>
                                  <InputLabel id="label-data-injection" className="form-control-label">
                                    <u>Data Injection</u>
                                  </InputLabel>
                                  <UncontrolledTooltip
                                    delay={500}
                                    placement="top"
                                    target="label-data-injection"
                                  >
                                    Inject key/value into message: message counter or timestamp.
                                  </UncontrolledTooltip>
                                </Row>
                                <Row>
                                  <Col sm="1"></Col>
                                  <Col>
                                    <Input
                                      className="form-control-alternative"
                                      id="input-inject-counter"
                                      type="checkbox"
                                      checked={isInjectCounter}
                                      onChange={(e) => setIsInjectCounter(e.target.checked)}
                                    />
                                    <InputLabel
                                      className="form-control-label"
                                      htmlFor="input-inject-counter"
                                    >
                                      Counter
                                    </InputLabel>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col sm="1"></Col>
                                  <Col>
                                    <Input
                                      className="form-control-alternative"
                                      id="input-record-count"
                                      type="checkbox"
                                      checked={isInjectTimestamp}
                                      onChange={(e) => setIsInjectTimestamp(e.target.checked)}
                                    />
                                    <InputLabel
                                      className="form-control-label"
                                      htmlFor="input-record-count"
                                    >
                                      Timestamp
                                    </InputLabel>
                                  </Col>
                                </Row>
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <FormGroup>
                                <InputLabel id="label-select-channel-strategy"><u>Target Channel Strategy</u></InputLabel>
                                <Select
                                  labelId="label-select-channel-strategy"
                                  id="label-select-channel-strategy"
                                  value={channelStrategy}
                                  label="Target Channel Strategy"
                                  onChange={(e) => setChannelStrategy(e.target.value)}
                                >
                                  <MenuItem value={RANDOM}>List - Random</MenuItem>
                                  <MenuItem value={RROBIN}>List - Round Robin</MenuItem>
                                  {/* <MenuItem value={20}>Extract from Message</MenuItem> */}
                                </Select>
                                <UncontrolledTooltip
                                  delay={500}
                                  placement="top"
                                  target="label-select-channel-strategy"
                                >
                                  Choose the way target channel will be provided: random or round-robin.<br />
                                </UncontrolledTooltip>
                              </FormGroup>
                              <FormGroup>
                                {(channelStrategy === RANDOM || channelStrategy === RROBIN) &&
                                  <>
                                    <InputLabel
                                      id="label-target-channels-list"
                                      className="form-control-label"
                                      htmlFor="input-target-channels"
                                    >
                                      <u>Target Channels</u>
                                    </InputLabel>
                                    <UncontrolledTooltip
                                      delay={0}
                                      placement="top"
                                      target="label-target-channels-list"
                                    >
                                      Enter the target channels (comma-separated or 1 per line).
                                    </UncontrolledTooltip>
                                    <Input
                                      className="form-control-alternative"
                                      id="input-target-channels"
                                      type="textarea"
                                      rows="4"
                                      value={targetChannels}
                                      onChange={(e) => setTargetChannels(e.target.value)}
                                    />
                                  </>
                                }
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <FormGroup>
                                <InputLabel id="label-select-uuid-strategy"><u>Sender UUID Strategy</u></InputLabel>
                                <Select
                                  labelId="label-select-uuid-strategy"
                                  id="label-select-uuid-strategy"
                                  value={uuidStrategy}
                                  label="Sender UUID Strategy"
                                  onChange={(e) => setUuidStrategy(e.target.value)}
                                >
                                  <MenuItem value={RANDOM}>List - Random</MenuItem>
                                  <MenuItem value={RROBIN}>List - Round Robin</MenuItem>
                                  <MenuItem value={EXTRACT}>Extract from Message</MenuItem>
                                </Select>
                                <UncontrolledTooltip
                                  delay={500}
                                  placement="top"
                                  target="label-select-uuid-strategy"
                                >
                                  Choose the way sender UUID will be provided: random, round-robin or extract from provided message payload.<br />
                                </UncontrolledTooltip>
                              </FormGroup>
                              <FormGroup>
                                {(uuidStrategy === RANDOM || uuidStrategy === RROBIN) &&
                                  <>
                                    <InputLabel id="label-sender-uuids-list" className="form-control-label" htmlFor="input-sender-uuids">
                                      <u>Sender UUIDs List</u>
                                    </InputLabel>
                                    <UncontrolledTooltip
                                      delay={500}
                                      placement="top"
                                      target="label-sender-uuids-list"
                                    >
                                      Enter the UUIDs (comma-separated or 1 per line) for the publisher's PN UUID.
                                    </UncontrolledTooltip>
                                    <Input
                                      className="form-control-alternative"
                                      id="input-sender-uuids"
                                      type="textarea"
                                      rows="4"
                                      value={senderUuids}
                                      onChange={(e) => setSenderUuids(e.target.value)}
                                    />
                                  </>
                                }
                              </FormGroup>
                              <FormGroup>
                                {uuidStrategy === EXTRACT &&
                                  <>
                                    <InputLabel id="label-sender-uuid-key" className="form-control-label" htmlFor="input-sender-uuid-key">
                                      <u>Enter Sender UUID JSON Key</u>
                                    </InputLabel>
                                    <UncontrolledTooltip
                                      delay={500}
                                      placement="top"
                                      target="label-sender-uuid-key"
                                    >
                                      Enter the JSON key in the provided messages JSON file (first level only).
                                    </UncontrolledTooltip>
                                    <Input
                                      className="form-control-alternative"
                                      id="input-sender-uuid-key"
                                      type="text"
                                      placeholder=""
                                      value={senderUuidKey}
                                      onChange={(e) => setSenderUuidKey(e.target.value)}
                                    />
                                  </>
                                }
                              </FormGroup>
                            </Col>
                          </Row>

                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </AccordionBody>
              </Accordion>
              <p />
              <CardHeader>
                <Row>
                  <div className="col">
                    <h3 className="mb-0">Progress Report</h3>
                  </div>
                  <IconButton aria-label="pause" onClick={(e) => handlePause(e)}>
                    <Pause/>
                  </IconButton>
                </Row>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col>
                    <div className="pl-lg-4">
                      <Row>
                        <InputLabel className="form-control-label" htmlFor="total-records">
                          Total
                        </InputLabel>
                      </Row>
                      <Row>
                        {progress}
                      </Row>
                    </div>
                  </Col>
                  <Col>
                    <div className="pl-lg-4">
                      <Row>
                        <InputLabel className="form-control-label" htmlFor="success-records">
                          Successes
                        </InputLabel>
                      </Row>
                      <Row>
                        {successCount}
                      </Row>
                    </div>
                  </Col>
                  <Col>
                    <div className="pl-lg-4">
                      <Row>
                        <InputLabel className="form-control-label" htmlFor="fail-records">
                          Fails
                        </InputLabel>
                      </Row>
                      <Row>
                        {failCount}
                      </Row>
                    </div>
                  </Col>
                  <Col>
                    <div className="pl-lg-4">
                      <Row>
                        <InputLabel className="form-control-label" htmlFor="elapsed-time">
                          Elapsed Time
                        </InputLabel>
                      </Row>
                      <Row>
                        {hours}h {minutes}m {seconds}s
                      </Row>
                    </div>
                  </Col>
                  <Col>
                    <div className="pl-lg-4">
                      <Row>
                        <InputLabel id="label-estimated-time" className="form-control-label" htmlFor="estimated-time">
                          <u>Estimated Time</u>
                        </InputLabel>
                        <UncontrolledTooltip
                          delay={500}
                          placement="top"
                          target="label-estimated-time"
                        >
                          Assumes an average execution time of (150ms * # of records) + (request delay * # of records).
                        </UncontrolledTooltip>
                      </Row>
                      <Row>
                        {estimatedTime}
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


const messageSamples =
  [
    {
      "text": "hello"
    },
    {
      "title": "Ground control to Major Tom",
      "body": "This is ground control to Major Tom.",
      "tasks": [
        { "task": "Take your protein pills.", "priority": 1 },
        { "task": "Put your helmet on.", "priority": 2 }
      ]
    },
    {
      "content": {
        "type": "text",
        "message": "This is a message"
      },
      "sender": "Mathew.Jenkinson"
    },
    {
      "content": {
        "type": "text",
        "message": {
          "en": "This is a message",
          "es": "Este es un mensaje",
          "de": "Dies ist eine Nachricht",
          "nl": "Dit is een bericht"
        }
      },
      "sender": "Mathew.Jenkinson"
    },
    {
      "content": {
        "type": "image",
        "full": "https://my/full/image.png",
        "thumbnail": "https://my/thumbnail/image.png"
      },
      "sender": "Mathew.Jenkinson"
    },
    {
      "content": {
        "type": "action",
        "event": "typing"
      },
      "sender": "Mathew.Jenkinson"
    },
    {
      "content": {
        "type": "chatInvite",
        "channel": "this is the channel you are being invited too",
        "message": "Hi Craig, welcome to the team!"
      },
      "sender": "Mathew.Jenkinson"
    },
    {
      "content": {
        "type": "poll",
        "question": "What do people want for lunch?",
        "answers": {
          "pizza": 0,
          "tacos": 0,
          "sushi": 0
        }
      },
      "sender": "Mathew.Jenkinson"
    },
    {
      "pn_debug": true,
      "text": "This is a test push message from PubNub",
      "pn_apns": {
        "aps": {
          "alert": {
            "title": "PN Test Push Message",
            "body": "This is test message from PubNub"
          },
        },
        "pn_push": [
          {
            "push_type": "alert",
            "auth_method": "token",
            "targets": [
              {
                "environment": "production",
                "topic": "com.pubnub.sampleapp"
              }
            ],
            "version": "v2"
          }
        ]
      },
      "pn_gcm": {
        "notification": {
          "title": "PN Test Push Message",
          "body": "This is a test message from PubNub"
        }
      }
    },
  ];