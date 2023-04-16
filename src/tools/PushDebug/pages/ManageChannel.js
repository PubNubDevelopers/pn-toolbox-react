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
import classnames from "classnames";
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
  Table,
  Row,
  Col,
  ButtonGroup,
  Modal, 
  ModalHeader, 
  ModalBody, 
  ModalFooter,
} from "reactstrap";

// core components
import { useKeySetData } from "../../KeySetProvider";
import { usePushDebugData } from "../PushDebugProvider";

const ManageChannel = () => {
  const keySetContext = useKeySetData();
  const pushDebugContext = usePushDebugData();

  console.log("ManageDevice keySetContext: ", keySetContext);
  console.log("ManageDevice pushDebugContext: ", pushDebugContext);

  // TODO: add these as APIs in the server component
  // const defaultApnsUri = `curl -s -v "/v1/push/sub-key/SUB_KEY}/audit-devices/CHANNEL_NAME`;
  // const defaultApns2DevUri = `curl -s -v "/v2/admin-push/sub-key/SUB_KEY/channel/CHANNEL_NAME?type=apns2&environment=development&topic=TOPIC`;
  // const defaultApns2PrdUri = `curl -s -v "/v2/admin-push/sub-key/SUB_KEY/channel/CHANNEL_NAME?type=apns2&environment=production&topic=TOPIC`;
  // const defaultFcmUri = `curl -s -v "/v2/admin-push/sub-key/SUB_KEY/channel/CHANNEL_NAME?type=gcm`;

  const [manageChannel, setManageChannel] = useState(pushDebugContext.manageChannel);

  const [pushType, setPushType] = useState(pushDebugContext.pushType); // apns, gcm
  const [environment, setEnvironment] = useState(pushDebugContext.environment);
  const [topic, setTopic] = useState(pushDebugContext.topic);
  const [pushRadios, setPushRadios] = useState(pushDebugContext.pushRadios);
  const [environmentRadios, setEnvironmentRadios] = useState(pushDebugContext.environmentRadios);
  const [enableEnvironment, setEnableEnvironment] = useState(pushDebugContext.enableEnvironment);
  const [enableTopic, setEnableTopic] = useState(pushDebugContext.enableTopic);
  
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const newDevices = useRef([]);

  const getPushParams = (params) => {
    const newParams = params || {};
    newParams.channels = [manageChannel]; 
    newParams.pushGateway = pushType;

    if (pushType === "apns2") {
      newParams.environment = environment;
      newParams.topic = topic;
    }
    
    return newParams;
  }

  const listDevices = () => {
    keySetContext.pubnub.push.listDevices(
      getPushParams(),
      (status, response) => {
        if (!status.error) {
          updateContextState();

          if (response.channels !== null && response.channels.length === 0) {
            toastNotify("info", "No registered device tokens.");
            pushDebugContext.setRegisteredDevices([]);
          }
          else {
            const sortedDevices = response.channels.sort()
            pushDebugContext.setRegisteredDevices(sortedDevices);
          }
        }
        else {
          // show error message to user
          toastNotify("error", status.message);
        }
      }
    );
  }

  const updateContextState = () => {
    pushDebugContext.setManageChannel(channel);
    pushDebugContext.setPushType(pushType);
    pushDebugContext.setEnvironment(environment);
    pushDebugContext.setTopic(topic);
    pushDebugContext.setPushRadios(pushRadios);
    pushDebugContext.setEnvironmentRadios(environmentRadios);
    pushDebugContext.setEnableEnvironment(enableEnvironment);
    pushDebugContext.setEnableTopic(enableTopic);
  }

  const addDevices = (isConfirmed) => {
    console.log("addDevices: isConfirmed = ", isConfirmed);
    
    toggle(); // dismiss the modal
    if (!isConfirmed) return;
    
    const devices = newDevices.current.split("\n");

    if (devices == null || devices.length === 0) {
      toastNotify("info", "No new devices provided.")
      return;
    }

    console.log("new devices", devices);

    // TODO: need to loop on newDevices and add channel to each one
    // for (device in newDevices) {
    // keySetContext.pubnub.push.addChannels(
    //   // TODO: change to device token
    //   getPushParams({"channels": channels}),
    //   (status) => {
    //     console.log("status", status);

    //     if (!status.error) {
    //       toastNotify("success", "Device Tokens added.");
    //       listDevices();
    //     }
    //     else {
    //       toastNotify("error", status.errorData.error);
    //     }
    // });
    // }
    return [];
  }

  const handleRemoveDevice = (e, device) => {
    e.preventDefault();
    // TODO: confirm remove modal
    removeDevice(device);
  }

  const removeDevice = (device) => {
    console.log("removeDevice", device);

    // TODO - refactor for preset channel and changing device token
    keySetContext.pubnub.push.removeChannels(
      getPushParams({"channels": [channel]}),
      (status) => {
        console.log("status", status);

        if (!status.error) {
          toastNotify("success", "Channel removed.");
          listChannels();
        }
        else {
          toastNotify("error", status.message);
        }
    });
  }

  const handlePushTypeClick = (value) => {
    setPushRadios(value);

    if (value === 0) {
      setPushType("apns2");
      setEnableTopic(true);
      setEnableEnvironment(true);
    }
    else if (value === 1) {
      setPushType("apns");
      setEnableTopic(false);
      setEnableEnvironment(false);
    }
    else {
      setPushType("gcm");
      setEnableTopic(false);
      setEnableEnvironment(false);
    }
  }

  const handleEnvironmentClick = (value) => {
    setEnvironmentRadios(value);
    setEnvironment(value === 0 ? "development" : "production");
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
      <AddDevicesModal
        // toggle={toggle}
        modal={modal}
        newDevices={newDevices}
        addDevices={addDevices}
      />
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
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row className="mt-0">
          <Col className="order-xl-2">
            <Card className="bg-secondary shadow"> 
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Manage Channel (Registered Device Tokens)</h3>
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
                            htmlFor="input-token"
                          >
                            Channel
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-channel"
                            placeholder="Enter channel"
                            type="text"
                            value={manageChannel}
                            onChange={(e) => setManageChannel(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="3">
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
                                color="danger" 
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
                                color="danger" 
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
                                color="danger" 
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
                                color="danger" 
                                onClick={() => handleEnvironmentClick(0)}
                                // size="sm"
                                disabled={!enableEnvironment}
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
                                color="danger" 
                                onClick={() => handleEnvironmentClick(1)}
                                // size="sm"
                                disabled={!enableEnvironment}
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
                      </Col>
                      <Col lg="6">
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
                            placeholder="com.example.app.topic"
                            type="text"
                            disabled={!enableTopic}
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <Row>
                    <Col className="text-right">
                      <Button
                        color="danger"
                        onClick={listDevices}
                        disabled = {keySetContext.pubnub == null || token === "" || (pushType === "apns2" && topic === "")}
                        // size="sm"
                      >
                        List Device Tokens
                      </Button>
                      <Button
                        color="secondary"
                        onClick={toggle}
                        disabled = {keySetContext.pubnub == null || token === "" || (pushType === "apns2" && topic === "")}
                        // size="sm"
                      >
                        Add Device Tokens
                      </Button>
                    </Col>
                  </Row> 
                </Form>
              </CardBody>
            </Card>
            <p />
            <Card className="bg-secondary shadow">              
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
                      &nbsp;&nbsp;&nbsp;&nbsp;Channel:
                    </h4>
                  </div>
                  </Col>
                  <Col>{pushDebugContext.token}</Col>
                </Row>
                <Row>
                  <Col lg="2">
                  <div className="col">
                    <h4 className="mb-0">
                      &nbsp;&nbsp;&nbsp;&nbsp;Push Type:
                    </h4>
                  </div>
                  </Col>
                  <Col>{pushDebugContext.pushType}</Col>
                </Row>
                <Row hidden={pushDebugContext.pushType !== "apns2"}>
                  <Col lg="2">
                  <div className="col">
                    <h4 className="mb-0">
                      &nbsp;&nbsp;&nbsp;&nbsp;Environment:
                    </h4>
                  </div>
                  </Col>
                  <Col>{pushDebugContext.environment}</Col>
                </Row>
                <Row hidden={pushDebugContext.pushType !== "apns2"}>
                  <Col lg="2">
                  <div className="col">
                    <h4 className="mb-0">
                      &nbsp;&nbsp;&nbsp;&nbsp;Topic:
                    </h4>
                  </div>
                  </Col>
                  <Col>{pushDebugContext.topic}</Col>
                </Row>
                <p></p>
                <Row>
                  <div className="col">
                    <h3 className="mb-0">
                      Registered Device Tokens: {pushDebugContext.registeredDevices.length}
                    </h3>
                  </div>
                </Row>
                </CardHeader>
                <CardBody>
                  <div className="pl-lg-4">
                    <Table className="align-items-center table-flush" >
                      <DeviceRows devices={pushDebugContext.registeredDevices} handleRemoveDevice={handleRemoveDevice}/>
                    </Table>
                  </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ManageChannel;


function DeviceRows(props) {
  const devices = props.devices;

  const rows = devices.map((ch, index) =>
    <tr key={index}>
      <td width="100%">{ch}</td>
      <td>
        <Button
          color="warning"
          onClick={(e) => props.handleRemoveDevice(e, ch)}
          size="sm"
        >
          Remove
        </Button>
      </td>
    </tr>
  );
  return (
    <tbody>
      {rows}
    </tbody>
  );
}

const AddDevicesModal = (props) => {
  const handleClick = (e, isConfirmed) => {
    e.preventDefault();
    props.addDevices(isConfirmed);
  }

  return (
    <div>
      <Modal 
        isOpen={props.modal} 
        className="modal-dialog-centered"
      >
        <ModalHeader>
          <h2>Add New Device Tokens</h2>
        </ModalHeader>
        <ModalBody>
          {/* TODO: allow comma separated values */}
          <div>
            <label
              className="form-control-label"
              htmlFor="input-new-devices"
            >
              New Devices (one per line)
            </label>
          </div>
          <Input
            className="form-control-alternative"
            id="input-new-devices"
            placeholder="Add one device token name per line"
            type="textarea"
            defaultValue={props.newDevices.current}
            onChange={(e) => props.newDevices.current = e.target.value}
            rows="10"
          />
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={(e) => handleClick(e, true)}>Submit</Button>{' '}
          <Button color="secondary" onClick={(e) => handleClick(e, false)}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

