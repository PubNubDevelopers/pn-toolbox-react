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
import classnames from "classnames";

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
  ButtonGroup,
  CardFooter,
} from "reactstrap";

// // core components
import { useKeySetData } from "../../KeySetProvider";
import { useObjectAdminData } from "../ObjectAdminProvider";

const ChannelMetadata = () => {
  const keySetContext = useKeySetData();
  const objectAdminContext = useObjectAdminData();

  console.log("Page1 keySetContext: ", keySetContext);
  console.log("Page1 objectAdminContext: ", objectAdminContext);

  const [channelId, setChannelId] = useState(objectAdminContext.channelId);
  const [customFieldRadios, setCustomFieldRadios] = useState(objectAdminContext.customFieldRadios);

  const handleCustomFieldClick = (value) => {
    setCustomFieldRadios(value);
  }

  const getChannelObject = () => {
    console.log("channelId", channelId);

    keySetContext.pubnub.objects.getChannelMetadata(
      {
        channel : channelId,
      },
      function (status, result) {
        console.log(status, result);

        if (!status.error) {
          objectAdminContext.setChannelId(result.data.id);
          objectAdminContext.setChannelName(result.data.name);
          objectAdminContext.setChannelDesc(result.data.description);
          objectAdminContext.setChannelUpdated(result.data.updated);
          objectAdminContext.setChannelCustom(JSON.stringify(result.data.custom, null, 4));
          objectAdminContext.setChannelEtag(result.data.eTag);
        }
        else {
          console.log("Error: ", status);
          alert(JSON.stringify(status, null, 4));
        }
      }
    );
  }

  const saveChannelObject = () => {
    console.log("channelId", channelId);

    keySetContext.pubnub.objects.setChannelMetadata(
      {
        channel : objectAdminContext.channelId,
        data: {
            name: objectAdminContext.channelName,
            description: objectAdminContext.channelDesc,
            custom: JSON.parse(objectAdminContext.channelCustom)
        },
        include: {
            customFields: true
        }
      },
      function (status) {
        console.log(status);

        if (!status.error) {
          console.log("Success: ", status);
          
        }
        else {
          console.log("Error: ", status);
          alert(JSON.stringify(status, null, 4));
        }

        alert(JSON.stringify(status, null, 4));
      }
    );
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
                    <h3 className="mb-0">Enter Channel ID</h3>
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
                            htmlFor="input-channel-id"
                          >
                            Channel ID
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-channel-id"
                            placeholder="Input channel object name"
                            type="text"
                            value={channelId}
                            onChange={(e) => setChannelId(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="3" className="text-center">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-custom-fields"
                          >
                            Include Custom Fields?
                          </label>
                          <div >
                            <ButtonGroup 
                              className="btn-group-toggle" 
                              data-toggle="buttons"
                            >
                              <Button 
                                className={classnames({ active: customFieldRadios === 0})} 
                                color="danger" 
                                onClick={() => handleCustomFieldClick(0)}
                              >
                                <input
                                  autoComplete="off"
                                  name="options"
                                  type="radio"
                                  value={customFieldRadios === 0}
                                />
                                No
                              </Button>
                              <Button 
                                className={classnames({ active: customFieldRadios === 1 })} 
                                color="danger" 
                                onClick={() => handleCustomFieldClick(1)}
                              >
                                <input
                                  autoComplete="off"
                                  name="options"
                                  type="radio"
                                  value={customFieldRadios === 1}
                                />
                                Yes
                              </Button>
                            </ButtonGroup>
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                </Form>
              </CardBody>
              <CardFooter>
                <Row>
                  <Col className="text-right">
                    <Button
                      color="danger"
                      onClick={getChannelObject}
                      disabled = {keySetContext.pubnub == null || channelId === ""}
                      // size="sm"
                    >
                      Get Metadata
                    </Button>
                    {/* <Button
                      color="secondary"
                      // onClick={toggle}
                      // disabled = {keySetContext.pubnub == null || token === "" || (pushType === "apns2" && topic === "")}
                      // size="sm"
                    >
                      Add Channel Objects
                    </Button> */}
                  </Col>
                </Row> 
              </CardFooter>
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
              {/* <Row> */}
                <Form>
                  {/* <div className="pl-lg-14"> */}
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
                  {/* </div> */}
                </Form>
              {/* </Row> */}
              <Row>
                <Col>
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
                <Form>
                  <div className="pl-lg-4">
                    <Row>
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
                            rows="18"
                            value={objectAdminContext.channelCustom}
                            onChange={(e) => objectAdminContext.setChannelCustom(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                </Form>
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
                </Row> 
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </Container> 
    </>
  );
};

export default ChannelMetadata;
