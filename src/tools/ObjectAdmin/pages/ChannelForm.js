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
  Row,
  Col,
  CardFooter,
} from "reactstrap";

import ReactBSAlert from "react-bootstrap-sweetalert";

// // core components
import { useKeySetData } from "../../KeySetProvider";
import { useObjectAdminData } from "../ObjectAdminProvider";

import AddMembersDialog from "./dialogs/AddMembersDialog.js";


const ChannelForm = () => {
  const keySetContext = useKeySetData();
  const objectAdminContext = useObjectAdminData();

  console.log("ChannelForm keySetContext: ", keySetContext);
  console.log("ChannelForm objectAdminContext: ", objectAdminContext);

  const [channelId, setChannelId] = useState(objectAdminContext.channelId);
  const [sweetAlert, setSweetAlert] = useState(null);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const newMembers = useRef([]);

  async function addMembers(isConfirmed) {
    console.log("addMembers: isConfirmed = ", isConfirmed);
    
    toggle(); // dismiss the modal
    if (!isConfirmed) return;
    
    if (newMembers.current == null || newMembers.current.length === 0) {
      toastNotify("info", "No New Channel Members provided.")
      return;
    }

    console.log("    new members", newMembers);

    try {
      const result = await keySetContext.pubnub.objects.setChannelMembers({
        channel: channelId,
        uuids: newMembers.current,
      });

      console.log("    setChannelMembers result", result)
    } 
    catch (status) {
      console.log("operation failed w/ error:", status);
    }
  

    // const result = await keySetContext.pubnub.objects.setMemberships({
    //   "channels": channels}),
    //   (status) => {
    //     console.log("status", status);

    //     if (!status.error) {
    //       toastNotify("success", "Channels added.");
    //       listChannels();
    //     }
    //     else {
    //       toastNotify("error", status.errorData.error);
    //     }
    // });
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


  async function getChannelObject() {
    // console.log("channelId", channelId);
    try {
      const result = await keySetContext.pubnub.objects.getChannelMetadata({
        channel : channelId,
      });
        
      updateRecord(result);

      (result != null && result.data != null) 
        ? timerAlert("Record Found!", `Channel ${channelId} retrieved.`, 2)
        // this shouldn't happen because 0 records is a 404 (see catch below)
        : timerAlert("No Records Found!", "Your filter found 0 records.", 3);
    }
    catch (status) {

      confirmAlert("Get Channel Failed", 
        // for some reason, the status.errorData.error is null
        // even though the console shows it has a value????
        // `${status.errorData.error.message}`,
        JSON.stringify(status, null, 2),
        "Done", ()=>hideAlert()
      );
    }
  }

  async function saveChannelObject() {
    // console.log("channelId", channelId);
    try {
      const result = await keySetContext.pubnub.objects.setChannelMetadata({
        channel : channelId,
        data: {
          name: objectAdminContext.channelName,
          description: objectAdminContext.channelDesc,
          custom: JSON.parse(objectAdminContext.channelCustom)
        },
        include: {
          customFields: true
        }
      });

      updateRecord(result);

      timerAlert("Save Success!", "ChannelMetadata saved.", 2);
    } 
    catch (status) {
      confirmAlert("Save Failed", 
        `Error: ${status.message}`,
        "Done", ()=>hideAlert()
      );
    }

  }

  const updateRecord = (record) => {
    objectAdminContext.setChannelId(record.data.id);
    objectAdminContext.setChannelName(record.data.name);
    objectAdminContext.setChannelDesc(record.data.description);
    objectAdminContext.setChannelUpdated(record.data.updated);
    objectAdminContext.setChannelCustom(JSON.stringify(record.data.custom, null, 4));
    objectAdminContext.setChannelEtag(record.data.eTag);
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
        showConfirm={true}
      >
        {message}
      </ReactBSAlert>
    );
    setTimeout(function() {hideAlert()}, delay*1000);
  };

  const confirmAlert = (title, message, confirmButton, confirmFn, cancelButton, cancelFn) => {
    setSweetAlert(
      <ReactBSAlert
        question
        style={{ display: "block", marginTop: "100px" }}
        title={title}
        onConfirm={confirmFn}
        onCancel={cancelFn}
        showCancel={cancelButton != null && cancelButton !== ""}
        confirmBtnBsStyle="danger"
        confirmBtnText={confirmButton}
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
      <AddMembersDialog
        // toggle={toggle}
        modal={modal}
        newItems={newMembers}
        addItems={addMembers}
        newMembers={newMembers}
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

      <Container className="mt--7" fluid>
        <Row className="mt-0">
          <Col className="order-xl-2">
            <Card className="bg-secondary shadow"> 
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Enter Channel ID</h3>
                  </div>
                  <div className="col text-right">
                  </div>
                </Row>
              </CardHeader>             
              <CardBody>
                <Form onSubmit={(e) => e.preventDefault()}>
                  <div className="pl-lg-4">
                    <Row>
                      <Col sm="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-channel-id"
                          >
                            Channel ID
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-channel-id"
                            placeholder="Enter channel ID"
                            type="text"
                            value={channelId}
                            onChange={(e) => setChannelId(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                      <Col sm="2">
                        <Row>&nbsp;</Row>
                        <Row>
                          
                          <Button
                            color="danger"
                            onClick={getChannelObject}
                            disabled = {keySetContext.pubnub == null || channelId === ""}
                          >
                            Get Channel
                          </Button>
                        </Row>
                      </Col>
                    </Row>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row className="mt-0">
          <Col className="order-xl-2">
            <Card className="bg-secondary shadow"> 
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Channel Metadata Results</h3>
                  </div>
                  <div className="col text-right">
                  </div>
                </Row>
              </CardHeader>             
              <CardBody>
                <Row>
                  <Col>
                    <Form>
                      <div className="pl-lg-4">
                        <Row>
                          <Col>
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-channel-id"
                              >
                                Channel ID
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="input-channel-id"
                                type="text"
                                value={objectAdminContext.channelId}
                                onChange={(e) => objectAdminContext.setChannelId(e.target.value)}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                      </div>
                    </Form>
                    <Form>
                      <div className="pl-lg-4">
                        <Row>
                          <Col>
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-channel-name"
                              >
                                Channel Name
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="input-channel-name"
                                type="text"
                                value={objectAdminContext.channelName}
                                onChange={(e) => objectAdminContext.setChannelName(e.target.value)}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                      </div>
                    </Form>
                    <Form>
                      <div className="pl-lg-4">
                        <Row>
                          <Col>
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-channel-desc"
                              >
                                Channel Description
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="input-channel-desc"
                                type="textarea"
                                rows="4"
                                value={objectAdminContext.channelDesc}
                                onChange={(e) => objectAdminContext.setChannelDesc(e.target.value)}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                      </div>
                    </Form>
                  </Col>
                  <Col>
                    <Form>
                      <div className="pl-lg-4">
                        <Row>
                          <Col>
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-channel-custom"
                              >
                                Custom Fields 
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="input-channel-custom"
                                type="textarea"
                                rows="8"
                                value={objectAdminContext.channelCustom}
                                onChange={(e) => objectAdminContext.setChannelCustom(e.target.value)}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                      </div>
                    </Form>
                    <Row>
                      <Form>
                        <div className="pl-lg-4">
                            <Col>
                              <FormGroup>
                                <label
                                  className="form-control-label"
                                  htmlFor="input-channel-updated"
                                >
                                  Last Updated
                                </label>
                                <Input
                                  className="form-control-alternative"
                                  id="input-channel-updated"
                                  type="text"
                                  disabled={true}
                                  value={objectAdminContext.channelUpdated}
                                  onChange={(e) => objectAdminContext.setChannelUpdated(e.target.value)}
                                />
                              </FormGroup>
                            </Col>
                        </div>
                      </Form>
                      <Form>
                        <div className="pl-lg-4">
                            <Col>
                              <FormGroup>
                                <label
                                  className="form-control-label"
                                  htmlFor="input-channel-etag"
                                >
                                  ETag
                                </label>
                                <Input
                                  className="form-control-alternative"
                                  id="input-channel-etag"
                                  type="text"
                                  disabled={true}
                                  value={objectAdminContext.channelEtag}
                                  onChange={(e) => objectAdminContext.setChannelEtag(e.target.value)}
                                />
                              </FormGroup>
                            </Col>
                        </div>
                      </Form>
                    </Row>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <Row>
                  <Col className="text-right">
                    <Button
                      color="danger"
                      onClick={saveChannelObject}
                      disabled = {keySetContext.pubnub == null || channelId === ""}
                    >
                      Save Metadata
                    </Button>
                  </Col>
                  <Col lg="3" className="text-center">
                    <Button
                      color="info"
                      onClick={toggle}
                      disabled = {keySetContext.pubnub == null || channelId === ""}
                    >
                      Add Members
                    </Button>
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

export default ChannelForm;
