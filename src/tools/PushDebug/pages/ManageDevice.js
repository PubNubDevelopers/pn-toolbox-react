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

const ManageDevice = () => {
  const keySetContext = useKeySetData();
  console.log("INSPECT DEVICE keySetContext: ", keySetContext);

  const [token, setToken] = useState();
  const [pushType, setPushType] = useState("apns2"); // apns, gcm
  const [environment, setEnvironment] = useState(true);
  const [topic, setTopic] = useState();

  const [resultsToken, setResultsToken] = useState();
  const [resultsPushType, setResultsPushType] = useState(); // apns, gcm
  const [resultsEnvironment, setResultsEnvironment] = useState(true);
  const [resultsTopic, setResultsTopic] = useState(true);

  const [registeredChannels, setRegisteredChannels] = useState([]);
  
  const [pushRadios, setPushRadios] = useState(0);
  const [environmentRadios, setEnvironmentRadios] = useState(0);
  const [enableEnvironment, setEnableEnvironment] = useState(true);
  const [enableTopic, setEnableTopic] = useState(true);
  
  const [isInitialized, setIsInitialized] = useState(keySetContext.pubnub != null);

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

  const updateResultsFields = () => {
    setResultsToken((resultsToken) => token);

    setResultsPushType(function(resultsPushType) {
      if (pushType === 'gcm') return 'FCM';
      if (pushType === 'apns') return 'APNs';
      if (pushType === 'apns2') return 'APNs 2';
    });

    setResultsEnvironment((resultsEnvironment) => environment);
    setResultsTopic((resultsTopic) => topic);
  }

  const listChannels = () => {
    keySetContext.pubnub.push.listChannels(
      getPushParams(),
      (status, response) => {
        if (!status.error) {
          updateResultsFields();

          if (response.channels !== null && response.channels.length === 0) {
            toastNotify("info", "No registered channels.");
            setRegisteredChannels([]);
          }
          else {
            setRegisteredChannels(response.channels.sort());
          }
        }
        else {
          // show error message to user
          toastNotify("error", status.message);
        }
      }
    );
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
                        disabled = {!isInitialized || token === "" || (pushType === "apns2" && topic === "")}
                        // size="sm"
                      >
                        List Channels
                      </Button>
                      <Button
                        color="secondary"
                        onClick={toggle}
                        disabled = {!isInitialized || token === "" || (pushType === "apns2" && topic === "")}
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
                  <Col>{resultsToken}</Col>
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
                      Registered Channels: {registeredChannels.length}
                    </h3>
                  </div>
                </Row>
                </CardHeader>
                <CardBody>
                  <div className="pl-lg-4">
                    <Table className="align-items-center table-flush" responsive >
                      <ChannelRows channels={registeredChannels} handleRemoveChannel={handleRemoveChannel}/>
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
    <tr id={index}>
      <td width="100%">{ch}</td>
      {/* <td>
        <UncontrolledTooltip
          delay={0}
          placement="top"
          target={index}
        >
          Future Feature<br/>(will nav to Inspect Channel)
        </UncontrolledTooltip>
        <Button
          id={hashIt(ch)}
          color="primary"
          // onClick={listDevices(`${channel}`)}
          // disabled
          size="sm"
        >
          List Devices
        </Button>
      </td> */}
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

