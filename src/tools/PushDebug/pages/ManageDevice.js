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
import { useKeySetData } from "../../../tools/KeySetProvider";
import { usePushDebugData } from "../PushDebugProvider";

const ManageDevice = () => {
  const keySetContext = useKeySetData();
  const pushDebugContext = usePushDebugData();

  console.log("ManageDevice keySetContext: ", keySetContext);
  console.log("ManageDevice pushDebugContext: ", pushDebugContext);

  const [token, setToken] = useState(pushDebugContext.token);
  const [pushType, setPushType] = useState(pushDebugContext.pushType); // apns, gcm
  const [environment, setEnvironment] = useState(pushDebugContext.environment);
  const [topic, setTopic] = useState(pushDebugContext.topic);

  const [pushRadios, setPushRadios] = useState(pushDebugContext.pushRadios);
  const [environmentRadios, setEnvironmentRadios] = useState(pushDebugContext.environmentRadios);
  const [enableEnvironment, setEnableEnvironment] = useState(pushDebugContext.enableEnvironment);
  const [enableTopic, setEnableTopic] = useState(pushDebugContext.enableTopic);
  
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const newChannels = useRef("");

  const getPushParams = (params) => {
    const newParams = params || {};
    newParams.device = token; 
    newParams.pushGateway = pushType;

    if (pushType === "apns2") {
      newParams.environment = environment;
      newParams.topic = topic;
    }
    
    return newParams;
  }

  const listChannels = () => {
    keySetContext.pubnub.push.listChannels(
      getPushParams(),
      (status, response) => {
        if (!status.error) {
          updateContextState();

          if (response.channels !== null && response.channels.length === 0) {
            toastNotify("info", "No registered channels.");
            pushDebugContext.setRegisteredChannels([]);
          }
          else {
            const sortedChannels = response.channels.sort()
            pushDebugContext.setRegisteredChannels(sortedChannels);
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
    pushDebugContext.setToken(token);
    pushDebugContext.setPushType(pushType);
    pushDebugContext.setEnvironment(environment);
    pushDebugContext.setTopic(topic);

    pushDebugContext.setPushRadios(pushRadios);
    pushDebugContext.setEnvironmentRadios(environmentRadios);
    pushDebugContext.setEnableEnvironment(enableEnvironment);
    pushDebugContext.setEnableTopic(enableTopic);
  }

  const addChannels = (isConfirmed) => {
    console.log("addChannels: isConfirmed = ", isConfirmed);
    
    toggle(); // dismiss the modal
    if (!isConfirmed) return;
    
    const channels = newChannels.current.split("\n");

    if (channels == null || channels.length === 0) {
      toastNotify("info", "No new channels provided.")
      return;
    }

    console.log("new channels", channels);

    keySetContext.pubnub.push.addChannels(
      getPushParams({"channels": channels}),
      (status) => {
        console.log("status", status);

        if (!status.error) {
          toastNotify("success", "Channels added.");
          listChannels();
        }
        else {
          toastNotify("error", status.errorData.error);
        }
    });
  }

  const handleRemoveChannel = (e, channel) => {
    e.preventDefault();
    // TODO: confirm remove modal
    removeChannel(channel);
  }

  const removeChannel = (channel) => {
    console.log("removeChannel", channel);

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
      <AddChannelsModal
        // toggle={toggle}
        modal={modal}
        newChannels={newChannels}
        addChannels={addChannels}
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
                    <h3 className="mb-0">Device Push Details</h3>
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
                            Device Token
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-token"
                            placeholder="Input device push token"
                            type="text"
                            value={token}
                            onChange={(e) => setToken(e.target.value)}
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
                        onClick={listChannels}
                        disabled = {keySetContext.pubnub == null || token === "" || (pushType === "apns2" && topic === "")}
                        // size="sm"
                      >
                        List Channels
                      </Button>
                      <Button
                        color="secondary"
                        onClick={toggle}
                        disabled = {keySetContext.pubnub == null || token === "" || (pushType === "apns2" && topic === "")}
                        // size="sm"
                      >
                        Add Channels
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
                      &nbsp;&nbsp;&nbsp;&nbsp;Device Token:
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
                      Registered Channels: {pushDebugContext.registeredChannels.length}
                    </h3>
                  </div>
                </Row>
                </CardHeader>
                <CardBody>
                  <div className="pl-lg-4">
                    <Table className="align-items-center table-flush" >
                      <ChannelRows channels={pushDebugContext.registeredChannels} handleRemoveChannel={handleRemoveChannel}/>
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

export default ManageDevice;


function ChannelRows(props) {
  const channels = props.channels;

  const rows = channels.map((ch, index) =>
    <tr key={index}>
      <td width="100%">{ch}</td>
      <td>
        <Button
          color="warning"
          onClick={(e) => props.handleRemoveChannel(e, ch)}
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

const AddChannelsModal = (props) => {

  const handleClick = (e, isConfirmed) => {
    e.preventDefault();
    props.addChannels(isConfirmed);
  }

  return (
    <div>
      <Modal 
        isOpen={props.modal} 
        className="modal-dialog-centered"
      >
        <ModalHeader>
          <h2>Add New Channels</h2>
        </ModalHeader>
        <ModalBody>
          {/* TODO: allow comma separated values */}
          <div>
            <label
              className="form-control-label"
              htmlFor="input-new-channels"
            >
              New Channels (one per line)
            </label>
          </div>
          <Input
            className="form-control-alternative"
            id="input-new-channels"
            placeholder="Add one channel name per line"
            type="textarea"
            defaultValue={props.newChannels.current}
            onChange={(e) => props.newChannels.current = e.target.value}
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

