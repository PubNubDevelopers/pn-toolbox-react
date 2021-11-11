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

const UserForm = () => {
  const keySetContext = useKeySetData();
  const objectAdminContext = useObjectAdminData();

  console.log("UserForm keySetContext: ", keySetContext);
  console.log("UserForm objectAdminContext: ", objectAdminContext);

  const [userId, setUserId] = useState(objectAdminContext.userId);
  const [sweetAlert, setSweetAlert] = useState(null);

  async function getUserObject() {
    // console.log("getUserObject", userId);
    try {
      const result = await keySetContext.pubnub.objects.getUUIDMetadata({
        uuid : userId,
      });

      objectAdminContext.setUserId(result.data.id);
      objectAdminContext.setUserName(result.data.name);
      objectAdminContext.setUserExternalId(result.data.userExternalId);
      objectAdminContext.setUserProfileUrl(result.data.profileUrl);
      objectAdminContext.setUserEmail(result.data.email);
      objectAdminContext.setUserCustom(JSON.stringify(result.data.custom, null, 2));
      objectAdminContext.setUserUpdated(result.data.updated);
      objectAdminContext.setUserEtag(result.data.eTag);

      (result != null && result.data != null) 
        ? timerAlert("Save Success!", "Metadata saved.", 2)
        : timerAlert("No Records Found!", "Your filter found 0 records.", 3);
    }
    catch (status) {
      confirmAlert("Get Metadata Failed", 
        `Error: ${status.message}`,
        "Done", ()=>hideAlert()
      );
    }
  }

  async function saveUserObject() {
    // console.log("channelId", channelId);
    try {
      const result = await keySetContext.pubnub.objects.setUUIDMetadata({
        uuid : userId,
        data: {
          name: objectAdminContext.userName,
          externalId: objectAdminContext.userExternalId,
          profileUrl: objectAdminContext.userProfileUrl,
          email: objectAdminContext.userEmail,
          custom: JSON.parse(objectAdminContext.userCustom)
        },
        include: {
          customFields: true
        }
      });

      timerAlert("Save Success!", "Metadata saved.", 2);
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
                    <h3 className="mb-0">Enter User ID</h3>
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
                            htmlFor="input-user-id"
                          >
                            User ID
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-user-id"
                            placeholder="Enter User ID"
                            type="text"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                      <Col sm="2">
                        <Row>&nbsp;</Row>
                        <Row>
                          
                          <Button
                            color="danger"
                            onClick={getUserObject}
                            disabled = {keySetContext.pubnub == null || userId === ""}
                          >
                            Get User
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
                    <h3 className="mb-0">User Metadata Results</h3>
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
                                htmlFor="input-user-id"
                              >
                                User ID
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="input-user-id"
                                type="text"
                                value={objectAdminContext.userId}
                                onChange={(e) => objectAdminContext.setUserId(e.target.value)}
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
                                htmlFor="input-user-name"
                              >
                                User Name
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="input-user-name"
                                type="text"
                                value={objectAdminContext.userName}
                                onChange={(e) => objectAdminContext.setUserName(e.target.value)}
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
                                htmlFor="input-external-id"
                              >
                                External ID
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="input-external-id"
                                type="text"
                                value={objectAdminContext.userExternalId}
                                onChange={(e) => objectAdminContext.setUserExternalId(e.target.value)}
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
                                htmlFor="input-profile-url"
                              >
                                Profile URL
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="input-profile-url"
                                type="text"
                                value={objectAdminContext.userProfileUrl}

                                onChange={(e) => objectAdminContext.setUserProfileUrl(e.target.value)}
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
                                htmlFor="input-email"
                              >
                                Email
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="input-email"
                                type="text"
                                value={objectAdminContext.userEmail}
                                onChange={(e) => objectAdminContext.setUserEmail(e.target.value)}
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
                                htmlFor="input-user-custom"
                              >
                                Custom Fields 
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="input-user-custom"
                                type="textarea"
                                rows="14"
                                value={objectAdminContext.userCustom}
                                onChange={(e) => objectAdminContext.setUserCustom(e.target.value)}
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
                                  htmlFor="input-user-updated"
                                >
                                  Last Updated
                                </label>
                                <Input
                                  className="form-control-alternative"
                                  id="input-user-updated"
                                  type="text"
                                  disabled={true}
                                  value={objectAdminContext.userUpdated}
                                  onChange={(e) => objectAdminContext.setUserUpdated(e.target.value)}
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
                                  htmlFor="input-user-etag"
                                >
                                  ETag
                                </label>
                                <Input
                                  className="form-control-alternative"
                                  id="input-user-etag"
                                  type="text"
                                  disabled={true}
                                  value={objectAdminContext.userEtag}
                                  onChange={(e) => objectAdminContext.setUserEtag(e.target.value)}
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
                      onClick={saveUserObject}
                      disabled = {keySetContext.pubnub == null || userId === ""}
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

export default UserForm;
