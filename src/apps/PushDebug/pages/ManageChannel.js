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

import { useState } from "react";
// import classnames from "classnames";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  // Table,
  Row,
  Col,
  // ButtonGroup,
  // Modal, 
  // ModalHeader, 
  // ModalBody, 
  // ModalFooter,
} from "reactstrap";

// core components
import { useKeySetData } from "../../../KeySetProvider";


const InspectDevice = (props) => {
  const keySetContext = useKeySetData();
  console.log("MANAGE CHANNEL keySetContext: ", keySetContext);

  // const [pushType, setPushType] = useState("apns2"); // apns, gcm
  // const [environment, setEnvironment] = useState(true);

  // const [resultsChannel, setResultsChannel] = useState();
  // const [resultsPushType, setResultsPushType] = useState(""); // apns, gcm
  // const [resultsEnvironment, setResultsEnvironment] = useState(true);
  // const [resultsTopic, setResultsTopic] = useState(true);

  // const [registeredDevices, setRegisteredDevices] = useState([]);
  
  // const [pushRadios, setPushRadios] = useState(0);
  // const [environmentRadios, setEnvironmentRadios] = useState(0);
  // const [enableEnvironment, setEnableEnvironment] = useState(true);
  // const [enableTopic, setEnableTopic] = useState(true);
  
  // const [isInitialized, setIsInitialized] = useState(keySetContext.pubnub != null);

  // const [modal, setModal] = useState(false);
  // const toggle = () => setModal(!modal);
  // const newDevices = useRef("");

  // const getPushParams = (params) => {
  //   const newParams = params || {};
  //   newParams.channels = [channel]; 
  //   newParams.pushGateway = pushType;

  //   if (pushType === "apns2") {
  //     newParams.environment = environment;
  //     newParams.topic = topic;
  //   }
    
  //   return newParams;
  // }

  // const updateResultsFields = () => {
  //   setResultsChannel((resultsToken) => channel);

  //   setResultsPushType(function(resultsPushType) {
  //     if (pushType === 'gcm') return 'FCM';
  //     if (pushType === 'apns') return 'APNs';
  //     if (pushType === 'apns2') return 'APNs 2';
  //   });

  //   setResultsEnvironment((resultsEnvironment) => environment);
  //   setResultsTopic((resultsTopic) => topic);
  // }

  // const listDevices = () => {
  //   keySetContext.pubnub.push.listChannels(
  //     getPushParams(),
  //     (status, response) => {
  //       if (!status.error) {
  //         updateResultsFields();

  //         if (response.channels !== null && response.channels.length === 0) {
  //           toastNotify("info", "No registered device tokens.");
  //           setRegisteredDevices([]);
  //         }
  //         else {
  //           setRegisteredDevices(response.devices.sort());
  //         }
  //       }
  //       else {
  //         // show error message to user
  //         toastNotify("error", status.message);
  //       }
  //     }
  //   );
  // }

  // const addDevices = (isConfirmed) => {
  //   console.log("addDevices: isConfirmed = ", isConfirmed);
    
  //   toggle(); // dismiss the modal
  //   if (!isConfirmed) return;
    
  //   const devices = newDevices.current.split("\n");

  //   if (devices == null || devices.length === 0) {
  //     toastNotify("info", "No new devices provided.")
  //     return;
  //   }

  //   console.log("new devices", devices);

  //   // this is "addDevice" but we have to call "addChannels"
  //   // with one channel because there is no addDevice API 
  //   // will need to loop on devices passing 1 device at time
  //   for (let i in devices) {
  //     keySetContext.pubnub.push.addChannels(
  //       getPushParams({"device": devices[i]}),
  //       (status) => {
  //         console.log("status", status);

  //         if (!status.error) {
  //           // toastNotify("success", "Devices added.");
  //           // add list of success device adds
  //         }
  //         else {
  //           // toastNotify("error", status.errorData.error);
  //           // add list of error device adds
  //         }
  //     });
  //   }

  //   // toastNotify - list of success and error devices
  //   listDevices();
  // }

  // const handleRemoveDevice = (e, device) => {
  //   e.preventDefault();
  //   // TODO: confirm remove modal
  //   removeDevice(device);
  // }

  // const removeDevice = (device) => {
  //   console.log("removeDevice", device);

  //   // this is "removeDevice" but we have to call "removeChannels"
  //   // with one channel because there is no removeDevices API
  //   keySetContext.pubnub.push.removeChannels(
  //     getPushParams({"device": device}),
  //     (status) => {
  //       console.log("status", status);

  //       if (!status.error) {
  //         toastNotify("success", "Device removed.");
  //         listDevices();
  //       }
  //       else {
  //         toastNotify("error", status.message);
  //       }
  //   });
  // }

  // const handlePushTypeClick = (value) => {
  //   setPushRadios(value);

  //   if (value === 0) {
  //     setPushType("apns2");
  //     setEnableTopic(true);
  //     setEnableEnvironment(true);
  //   }
  //   else if (value === 1) {
  //     setPushType("apns");
  //     setEnableTopic(false);
  //     setEnableEnvironment(false);
  //   }
  //   else {
  //     setPushType("gcm");
  //     setEnableTopic(false);
  //     setEnableEnvironment(false);
  //   }
  // }

  // const handleEnvironmentClick = (value) => {
  //   setEnvironmentRadios(value);
  //   setEnvironment(value === 0 ? "development" : "production");
  // }


  const [channel, setChannel] = useState("CHANNEL_NAME");
  const [topic, setTopic] = useState("com.example.app.topic");

  const defaultApnsUri = `curl -s -v storageweb-red1.aws-sjc-1.ps.pn:9000/v1/push/sub-key/SUB_KEY}/audit-devices/CHANNEL_NAME`;
  const defaultApns2DevUri = `curl -s -v "storageweb-red1.aws-sjc-1.ps.pn:9000/v2/admin-push/sub-key/SUB_KEY/channel/CHANNEL_NAME?type=apns2&environment=development&topic=TOPIC`;
  const defaultApns2PrdUri = `curl -s -v "storageweb-red1.aws-sjc-1.ps.pn:9000/v2/admin-push/sub-key/SUB_KEY/channel/CHANNEL_NAME?type=apns2&environment=production&topic=TOPIC`;
  const defaultFcmUri = `curl -s -v "storageweb-red1.aws-sjc-1.ps.pn:9000/v2/admin-push/sub-key/SUB_KEY/channel/CHANNEL_NAME?type=gcm`;


  const [apns2DevUri, setApns2DevUri] = useState();
  const [apns2PrdUri, setApns2PrdUri] = useState();
  const [apnsUri, setApnsUri] = useState();
  const [fcmUri, setFcmUri] = useState();

  const generateURIs = () => {
    setApnsUri(() => defaultApnsUri.replace("SUB_KEY", keySetContext.subKey).replace("CHANNEL_NAME", channel));
    setApns2DevUri(() => defaultApns2DevUri.replace("SUB_KEY", keySetContext.subKey).replace("CHANNEL_NAME", channel).replace("TOPIC", topic));
    setApns2PrdUri(() => defaultApns2PrdUri.replace("SUB_KEY", keySetContext.subKey).replace("CHANNEL_NAME", channel).replace("TOPIC", topic));
    setFcmUri(() => defaultFcmUri.replace("SUB_KEY", keySetContext.subKey).replace("CHANNEL_NAME", channel));
  }

  const toastNotify = (type, title) => {
    const params = {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    };

    if (type === "success") toast.success(title, params);
    else if (type === "error") toast.error(title, params);
    else toast.info(title, params);
  }

  return (
    <>
      {/* <AddDevicesModal
        // toggle={toggle}
        modal={modal}
        newDevices={newDevices}
        addDevices={addDevices}
      /> */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Container className="mt--7" fluid>
        <Row className="mt-0">
          <Col className="order-xl-2">
            <Card className="bg-secondary shadow"> 
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Channel Push Details</h3>
                  </div>
                  <div className="col text-right">
                  </div>
                </Row>
              </CardHeader>             
              <CardBody>
                <Form>
                  <div className="pl-lg-4">
                    <Row>
                      <Col>
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-channel"
                          >
                            Channel
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-channel"
                            placeholder="Input channel name"
                            type="text"
                            defaultValue={channel}
                            onChange={(e) => setChannel(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      {/* original  pushType input field - implement when SDK has these APIs*/}
                      <div>
                      {/* <Col lg="3">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-push-type"
                          >
                            Push Type
                          </label>
                          <div>
                            <ButtonGroup 
                              className="btn-group-toggle" 
                              data-toggle="buttons"
                            >
                              <Button 
                                className={classnames({ active: pushRadios === 0})} 
                                color="primary" 
                                onClick={() => handlePushTypeClick(0)}
                                // size="sm"
                              >
                                <input
                                  autoComplete="off"
                                  name="options"
                                  type="radio"
                                  value={pushRadios === 0}
                                />
                                APNs 2
                              </Button>
                              <Button 
                                className={classnames({ active: pushRadios === 1 })} 
                                color="primary" 
                                onClick={() => handlePushTypeClick(1)}
                                // size="sm"
                              >
                                <input
                                  autoComplete="off"
                                  name="options"
                                  type="radio"
                                  value={pushRadios === 1}
                                />
                                APNs
                              </Button>
                              <Button 
                                className={classnames({ active: pushRadios === 2 })} 
                                color="primary" 
                                onClick={() => handlePushTypeClick(2)}
                                // size="sm"
                              >
                                <input
                                  autoComplete="off"
                                  name="options"
                                  type="radio"
                                  value={pushRadios === 2}
                                />
                                FCM
                              </Button>
                            </ButtonGroup>
                          </div>
                        </FormGroup>
                      </Col>
                      <Col lg="3">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-environment"
                          >
                            Environment
                          </label>
                          <div >
                            <ButtonGroup 
                              className="btn-group-toggle" 
                              data-toggle="buttons"
                            >
                              <Button 
                                className={classnames({ active: environmentRadios === 0})} 
                                color="primary" 
                                onClick={() => handleEnvironmentClick(0)}
                                // size="sm"
                                // disabled={!enableEnvironment}
                              >
                                <input
                                  autoComplete="off"
                                  name="options"
                                  type="radio"
                                  value={environmentRadios === 0}
                                />
                                Development
                              </Button>
                              <Button 
                                className={classnames({ active: environmentRadios === 1 })} 
                                color="primary" 
                                onClick={() => handleEnvironmentClick(1)}
                                // size="sm"
                                // disabled={!enableEnvironment}
                              >
                                <input
                                  autoComplete="off"
                                  name="options"
                                  type="radio"
                                  value={environmentRadios === 1}
                                />
                                Production
                              </Button>
                            </ButtonGroup>
                          </div>
                        </FormGroup>
                      </Col> */}
                      </div>
                      <Col>
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-topic"
                          >
                            Topic (Bundle ID)
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-topic"
                            // placeholder="com.example.app.topic"
                            type="text"
                            // value={topic}
                            defaultValue="com.pubnub.appname.id"
                            // disabled={!enableTopic}
                            onChange={(e) => setTopic(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="text-right">
                        <Button
                          color="primary"
                          onClick={generateURIs}
                          disabled = {channel === ""}
                          // size="sm"
                        >
                          Generate URIs
                        </Button>
                      </Col>
                    </Row> 
                  </div>

                  {/* original results params - implement when the SDK has these APIs */}
                  <div>
                  {/* <Row>
                    <Col className="text-right">
                      <Button
                        color="primary"
                        onClick={listDevices}
                        disabled = {!isInitialized || channel === "" || (pushType === "apns2" && topic === "")}
                        // size="sm"
                      >
                        List Devices
                      </Button>
                      <Button
                        color="secondary"
                        onClick={toggle}
                        disabled = {!isInitialized || channel === "" || (pushType === "apns2" && topic === "")}
                        // size="sm"
                      >
                        Add Devices
                      </Button>
                    </Col>
                  </Row>  */}
                  </div>
                </Form>
              </CardBody>
            </Card>
            <p />

            <Card className="bg-secondary shadow">              
              <CardBody>
                <div className="pl-lg-4">
                <Row>
                  <Col>  
                    <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-apns2-dev"
                    >
                      APNs 2 - Development
                    </label>
                    <Input
                      className="form-control-alternative"
                      id="input-apns2-dev"
                      type="textarea"
                      rows="2"
                      value={apns2DevUri}
                      defaultValue={defaultApns2DevUri}
                      onChange={(e) => setApns2DevUri(e.target.value)}
                    />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>  
                    <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-apns2-prd"
                    >
                      APNs 2 - Production
                    </label>
                    <Input
                      className="form-control-alternative"
                      id="input-apns2-prd"
                      type="textarea"
                      rows="2"
                      value={apns2PrdUri}
                      defaultValue={defaultApns2PrdUri}
                      onChange={(e) => setApns2PrdUri(e.target.value)}
                    />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>  
                    <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-apns"
                    >
                      APNs
                    </label>
                    <Input
                      className="form-control-alternative"
                      id="input-apns"
                      type="textarea"
                      rows="2"
                      value={apnsUri}
                      defaultValue={defaultApnsUri}
                      onChange={(e) => setApnsUri(e.target.value)}
                    />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>  
                    <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-fcm"
                    >
                      FCM
                    </label>
                    <Input
                      className="form-control-alternative"
                      id="input-fcm"
                      type="textarea"
                      rows="2"
                      value={fcmUri}
                      defaultValue={defaultFcmUri}
                      onChange={(e) => setFcmUri(e.target.value)}
                    />
                    </FormGroup>
                  </Col>
                </Row>
                </div>
              </CardBody>
            </Card>

            {/* original results UI - implement when SDK has these APIs */}
            <div>
            {/* <Card className="bg-secondary shadow">              
              <CardHeader>
                <Row>
                  <div className="col">
                    <h3 className="mb-0">
                      Results for:
                    </h3>
                  </div>
                </Row>
                <Row>
                  <Col lg="2">
                  <div className="col">
                    <h4 className="mb-0">
                      &nbsp;&nbsp;&nbsp;&nbsp;Channel Name:
                    </h4>
                  </div>
                  </Col>
                  <Col>{resultsChannel}</Col>
                </Row>
                <Row>
                  <Col lg="2">
                  <div className="col">
                    <h4 className="mb-0">
                      &nbsp;&nbsp;&nbsp;&nbsp;Push Type:
                    </h4>
                  </div>
                  </Col>
                  <Col>{resultsPushType}</Col>
                </Row>
                <Row hidden={resultsPushType !== "APNs 2"}>
                  <Col lg="2">
                  <div className="col">
                    <h4 className="mb-0">
                      &nbsp;&nbsp;&nbsp;&nbsp;Environment:
                    </h4>
                  </div>
                  </Col>
                  <Col>{resultsEnvironment}</Col>
                </Row>
                <Row hidden={resultsPushType !== "APNs 2"}>
                  <Col lg="2">
                  <div className="col">
                    <h4 className="mb-0">
                      &nbsp;&nbsp;&nbsp;&nbsp;Topic:
                    </h4>
                  </div>
                  </Col>
                  <Col>{resultsTopic}</Col>
                </Row>
                <p></p>
                <Row>
                  <div className="col">
                    <h3 className="mb-0">
                      Registered Devices: {registeredDevices.length}
                    </h3>
                  </div>
                </Row>
                </CardHeader>
                <CardBody>
                  <div className="pl-lg-4">
                    <Table className="align-items-center table-flush" responsive >
                      <ChannelRows channels={registeredDevices} handleRemoveChannel={handleRemoveDevice}/>
                    </Table>
                  </div>
              </CardBody>
            </Card> */}
            </div> 
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default InspectDevice;

// function ChannelRows(props) {
//   const channels = props.channels;

//   const rows = channels.map((dev, index) =>
//     <tr id={index}>
//       <td width="100%">{dev}</td>
//       {/* <td>
//         <UncontrolledTooltip
//           delay={0}
//           placement="top"
//           target={index}
//         >
//           Future Feature<br/>(will nav to Inspect Device)
//         </UncontrolledTooltip>
//         <Button
//           id={hashIt(dev)}
//           color="primary"
//           // onClick={listChannels(`${dev}`)}
//           // disabled
//           size="sm"
//         >
//           List Channels
//         </Button>
//       </td> */}
//       <td>
//         <Button
//           color="warning"
//           onClick={(e) => props.handleRemoveDevice(e, dev)}
//           size="sm"
//         >
//           Remove
//         </Button>
//       </td>
//     </tr>
//   );
//   return (
//     <tbody>
//       {rows}
//     </tbody>
//   );
// }

// const AddDevicesModal = (props) => {

//   const handleClick = (e, isConfirmed) => {
//     e.preventDefault();
//     props.addChannels(isConfirmed);
//   }

//   return (
//     <div>
//       <Modal 
//         isOpen={props.modal} 
//         className="modal-dialog-centered"
//       >
//         <ModalHeader>
//           <h2>Add New Devices</h2>
//         </ModalHeader>
//         <ModalBody>
//           {/* TODO: allow comma separated values */}
//           <div>
//             <label
//               className="form-control-label"
//               htmlFor="input-new-devices"
//             >
//               New Devices (one per line)
//             </label>
//           </div>
//           <Input
//             className="form-control-alternative"
//             id="input-new-devices"
//             placeholder="Add one device per line"
//             type="textarea"
//             defaultValue={props.newDevices.current}
//             onChange={(e) => props.newDevices.current = e.target.value}
//             rows="10"
//           />
//         </ModalBody>
//         <ModalFooter>
//           <Button color="primary" onClick={(e) => handleClick(e, true)}>Submit</Button>{' '}
//           <Button color="secondary" onClick={(e) => handleClick(e, false)}>Cancel</Button>
//         </ModalFooter>
//       </Modal>
//     </div>
//   );
// }

