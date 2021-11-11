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
import { useObjectAdminData } from "../ObjectAdminProvider";
import ReactBSAlert from "react-bootstrap-sweetalert";

const ChannelForm = () => {
  const keySetContext = useKeySetData();
  const objectAdminContext = useObjectAdminData();

  console.log("ChannelForm keySetContext: ", keySetContext);
  console.log("ChannelForm objectAdminContext: ", objectAdminContext);

  const [channelId, setChannelId] = useState(objectAdminContext.channelId);
  const [sweetAlert, setSweetAlert] = useState(null);

  async function getChannelObject() {
    // console.log("channelId", channelId);
    try {
      const result = await keySetContext.pubnub.objects.getChannelMetadata({
        channel : channelId,
      });
        
      objectAdminContext.setChannelId(result.data.id);
      objectAdminContext.setChannelName(result.data.name);
      objectAdminContext.setChannelDesc(result.data.description);
      objectAdminContext.setChannelUpdated(result.data.updated);
      objectAdminContext.setChannelCustom(JSON.stringify(result.data.custom, null, 4));
      objectAdminContext.setChannelEtag(result.data.eTag);

      (result != null && result.data > 0) 
        ? timerAlert("Save Success!", "ChannelMetadata saved.", 2)
        : timerAlert("No Records Found!", "Your filter found 0 records.", 3);
    }
    catch (status) {
      confirmAlert("Get Metadata Failed", 
        `Error: ${status.message}`,
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

      timerAlert("Save Success!", "ChannelMetadata saved.", 2);
    } 
    catch (status) {
      confirmAlert("Save Failed", 
        `Error: ${status.message}`,
        "Done", ()=>hideAlert()
      );
    }

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
        showCancel
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
                  <Col lg="3" className="text-center"></Col>
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
