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

import { Typography } from "@material-ui/core";
import { classnames } from "@material-ui/data-grid";
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
  ButtonGroup,
} from "reactstrap";

// // core components
import { useKeySetData } from "../../KeySetProvider";
import { usePresenceData } from "../PresenceProvider";

const PresenceACLs = () => {
  const keySetContext = useKeySetData();
  const usePresenceContext = usePresenceData();

  console.log("PresenceACLs keySetContext: ", keySetContext);
  console.log("PresenceACLs presConfigContext: ", usePresenceContext);

  const [channelPattern, setChannelPattern] = useState();
  const [tracking, setTracking] = useState(false);

  const [clientEvents, setClientEvents] = useState(false);
  const [clientEventJoin, setClientEventJoin] = useState(false);
  const [clientEventLeave, setClientEventLeave] = useState(false);
  const [clientEventTimeout, setClientEventTimeout] = useState(false);
  const [clientEventStateChange, setClientEventStateChange] = useState(false);
  const [clientEventInterval, setClientEventInterval] = useState(false);

  const [webhooks, setWebhooks] = useState(false);
  const [webhookJoin, setWebhookJoin] = useState(false);
  const [webhookLeave, setWebhookLeave] = useState(false);
  const [webhookTimeout, setWebhookTimeout] = useState(false);
  const [webhookStateChange, setWebhookStateChange] = useState(false);
  const [webhookInterval, setWebhookInterval] = useState(false);
  const [webhookActive, setWebhookActive] = useState(false);
  const [webhookInactive, setWebhookInactive] = useState(false);

  return (
    <>
      <Container className="mt--7" fluid>
        <Form onSubmit={(e) => e.preventDefault()}>
          <Card className="bg-secondary shadow">
            {/* <Row> */}
            <CardHeader className="border-0">
              <Row className="align-items-center">
                <div className="col">
                  <h3 className="mb-0">Presence ACLs</h3>
                </div>
              </Row>
            </CardHeader>

            <CardBody id="cardbody-top-inputs">
              <Row>
                <Col sm="8">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-channel-pattern"
                    >
                      <Typography><strong>Channel Pattern</strong></Typography>
                    </label>
                    <Input
                      className="form-control-alternative"
                      id="input-channel-pattern"
                      placeholder="Enter the channel name or pattern (regex)"
                      type="text"
                      value={channelPattern}
                      onChange={(e) => setChannelPattern(e.target.value)}
                    />
                  </FormGroup>
                </Col>
              </Row>
            </CardBody>
            {/* </Row> */}

            <Row>
              <Col id="col-left">
                <CardBody id="cardbody-left-inputs">
                <Row>
                    <Col sm="6">
                      <Row>
                        <Col sm="7">
                          <label
                            className="form-control-label"
                            htmlFor="input-publish-client-events"
                          >
                            <Typography><strong>Tracking</strong></Typography>
                          </label>
                        </Col>
                        <Col>
                          <FormGroup>
                            <ButtonGroup
                              className="btn-group-toggle"
                              data-toggle="buttons"
                            >
                              <Button
                                className={classnames({ active: !clientEvents })}
                                color="danger"
                                onClick={() => setClientEvents(false)}
                                size="sm"
                              >
                                <input
                                  autoComplete="off"
                                  name="options"
                                  type="radio"
                                  value={clientEvents}
                                />
                                Off
                              </Button>
                              <Button
                                className={classnames({ active: clientEvents })}
                                color="danger"
                                onClick={() => setClientEvents(true)}
                                size="sm"
                              >
                                <input
                                  autoComplete="off"
                                  name="options"
                                  type="radio"
                                  value={clientEvents}
                                />
                                On
                              </Button>
                            </ButtonGroup>
                          </FormGroup>
                        </Col>
                      </Row>
                    </Col>
                  </Row>

                  <Row>&nbsp;</Row>
                  <Row>&nbsp;</Row>

                  <Row>
                    <Col sm="6">
                      <Row>
                        <Col sm="7">
                          <label
                            className="form-control-label"
                            htmlFor="input-publish-client-events"
                          >
                            <Typography><strong>Client Events</strong></Typography>
                          </label>
                        </Col>
                        <Col>
                          <FormGroup>
                            <ButtonGroup
                              className="btn-group-toggle"
                              data-toggle="buttons"
                            >
                              <Button
                                className={classnames({ active: !clientEvents })}
                                color="danger"
                                onClick={() => setClientEvents(false)}
                                size="sm"
                              >
                                <input
                                  autoComplete="off"
                                  name="options"
                                  type="radio"
                                  value={clientEvents}
                                />
                                Off
                              </Button>
                              <Button
                                className={classnames({ active: clientEvents })}
                                color="danger"
                                onClick={() => setClientEvents(true)}
                                size="sm"
                              >
                                <input
                                  autoComplete="off"
                                  name="options"
                                  type="radio"
                                  value={clientEvents}
                                />
                                On
                              </Button>
                            </ButtonGroup>
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col sm="5" className="text-right">
                          <label
                            className="form-control-label"
                            htmlFor="rbg-client-event-join"
                          >
                            join
                          </label>
                        </Col>
                        <Col sm="2">
                          <FormGroup>
                            <ButtonGroup
                              id="rbg-client-event-join"
                              className="btn-group-toggle"
                              data-toggle="buttons"
                            >
                              <Button
                                className={classnames({ active: !clientEventJoin })}
                                color="danger"
                                onClick={() => setClientEventJoin(false)}
                                size="sm"
                              >
                                <input
                                  autoComplete="off"
                                  name="options"
                                  type="radio"
                                  value={clientEventJoin}
                                />
                                Off
                              </Button>
                              <Button
                                className={classnames({ active: clientEventJoin })}
                                color="danger"
                                onClick={() => setClientEventJoin(true)}
                                size="sm"
                              >
                                <input
                                  autoComplete="off"
                                  name="options"
                                  type="radio"
                                  value={clientEventJoin}
                                />
                                On
                              </Button>
                            </ButtonGroup>
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col sm="5" className="text-right">
                          <label
                            className="form-control-label"
                            htmlFor="rbg-client-event-leave"
                          >
                            leave
                          </label>
                        </Col>
                        <Col sm="2">
                          <FormGroup>
                            <ButtonGroup
                              id="rbg-client-event-leave"
                              className="btn-group-toggle"
                              data-toggle="buttons"
                            >
                              <Button
                                className={classnames({ active: !clientEventLeave })}
                                color="danger"
                                onClick={() => setClientEventLeave(false)}
                                size="sm"
                              >
                                <input
                                  autoComplete="off"
                                  name="options"
                                  type="radio"
                                  value={clientEventLeave}
                                />
                                Off
                              </Button>
                              <Button
                                className={classnames({ active: clientEventLeave })}
                                color="danger"
                                onClick={() => setClientEventLeave(true)}
                                size="sm"
                              >
                                <input
                                  autoComplete="off"
                                  name="options"
                                  type="radio"
                                  value={clientEventLeave}
                                />
                                On
                              </Button>
                            </ButtonGroup>
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col sm="5" className="text-right">
                          <label
                            className="form-control-label"
                            htmlFor="rbg-client-event-timeout"
                          >
                            timeout
                          </label>
                        </Col>
                        <Col sm="2">
                          <FormGroup>
                            <ButtonGroup
                              id="rbg-client-event-timeout"
                              className="btn-group-toggle"
                              data-toggle="buttons"
                            >
                              <Button
                                className={classnames({ active: !clientEventTimeout })}
                                color="danger"
                                onClick={() => setClientEventTimeout(false)}
                                size="sm"
                              >
                                <input
                                  autoComplete="off"
                                  name="options"
                                  type="radio"
                                  value={clientEventTimeout}
                                />
                                Off
                              </Button>
                              <Button
                                className={classnames({ active: clientEventTimeout })}
                                color="danger"
                                onClick={() => setClientEventTimeout(true)}
                                size="sm"
                              >
                                <input
                                  autoComplete="off"
                                  name="options"
                                  type="radio"
                                  value={clientEventTimeout}
                                />
                                On
                              </Button>
                            </ButtonGroup>
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col sm="5" className="text-right">
                          <label
                            className="form-control-label"
                            htmlFor="rbg-client-event-state-change"
                          >
                            state-change
                          </label>
                        </Col>
                        <Col sm="2">
                          <FormGroup>
                            <ButtonGroup
                              id="rbg-client-event-state-change"
                              className="btn-group-toggle"
                              data-toggle="buttons"
                            >
                              <Button
                                className={classnames({ active: !clientEventStateChange })}
                                color="danger"
                                onClick={() => setClientEventStateChange(false)}
                                size="sm"
                              >
                                <input
                                  autoComplete="off"
                                  name="options"
                                  type="radio"
                                  value={clientEventStateChange}
                                />
                                Off
                              </Button>
                              <Button
                                className={classnames({ active: clientEventStateChange })}
                                color="danger"
                                onClick={() => setClientEventStateChange(true)}
                                size="sm"
                              >
                                <input
                                  autoComplete="off"
                                  name="options"
                                  type="radio"
                                  value={clientEventStateChange}
                                />
                                On
                              </Button>
                            </ButtonGroup>
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col sm="5" className="text-right">
                          <label
                            className="form-control-label"
                            htmlFor="rbg-client-event-interval"
                          >
                            interval
                          </label>
                        </Col>
                        <Col sm="2">
                          <FormGroup>
                            <ButtonGroup
                              id="rbg-client-event-interval"
                              className="btn-group-toggle"
                              data-toggle="buttons"
                            >
                              <Button
                                className={classnames({ active: !clientEventInterval })}
                                color="danger"
                                onClick={() => setClientEventInterval(false)}
                                size="sm"
                              >
                                <input
                                  autoComplete="off"
                                  name="options"
                                  type="radio"
                                  value={clientEventInterval}
                                />
                                Off
                              </Button>
                              <Button
                                className={classnames({ active: clientEventInterval })}
                                color="danger"
                                onClick={() => setClientEventInterval(true)}
                                size="sm"
                              >
                                <input
                                  autoComplete="off"
                                  name="options"
                                  type="radio"
                                  value={clientEventInterval}
                                />
                                On
                              </Button>
                            </ButtonGroup>
                          </FormGroup>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </CardBody>
              </Col>

              <Col id="col-right">
                <CardBody id="cardbody-right-inputs">
                  <Row>
                    <Col sm="6">
                      <Row>
                        <Col sm="7">
                          <label
                            className="form-control-label"
                            htmlFor="input-webhooks"
                          >
                            <Typography><strong>Webhooks</strong></Typography>
                          </label>
                        </Col>
                        <Col>
                          <FormGroup>
                            <ButtonGroup
                              id="input-webhooks"
                              className="btn-group-toggle"
                              data-toggle="buttons"
                            >
                              <Button
                                className={classnames({ active: !webhooks })}
                                color="danger"
                                onClick={() => setWebhooks(false)}
                                size="sm"
                              >
                                <input
                                  autoComplete="off"
                                  name="options"
                                  type="radio"
                                  value={webhooks}
                                />
                                Off
                              </Button>
                              <Button
                                className={classnames({ active: webhooks })}
                                color="danger"
                                onClick={() => setWebhooks(true)}
                                size="sm"
                              >
                                <input
                                  autoComplete="off"
                                  name="options"
                                  type="radio"
                                  value={webhooks}
                                />
                                On
                              </Button>
                            </ButtonGroup>
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col sm="5" className="text-right">
                          <label
                            className="form-control-label"
                            htmlFor="rbg-webhook-join"
                          >
                            join
                          </label>
                        </Col>
                        <Col sm="2">
                          <FormGroup>
                            <ButtonGroup
                              id="rbg-webhook-join"
                              className="btn-group-toggle"
                              data-toggle="buttons"
                            >
                              <Button
                                className={classnames({ active: !webhookJoin })}
                                color="danger"
                                onClick={() => setWebhookJoin(false)}
                                size="sm"
                              >
                                <input
                                  autoComplete="off"
                                  name="options"
                                  type="radio"
                                  value={webhookJoin}
                                />
                                Off
                              </Button>
                              <Button
                                className={classnames({ active: webhookJoin })}
                                color="danger"
                                onClick={() => setWebhookJoin(true)}
                                size="sm"
                              >
                                <input
                                  autoComplete="off"
                                  name="options"
                                  type="radio"
                                  value={webhookJoin}
                                />
                                On
                              </Button>
                            </ButtonGroup>
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col sm="5" className="text-right">
                          <label
                            className="form-control-label"
                            htmlFor="rbg-webhook-leave"
                          >
                            leave
                          </label>
                        </Col>
                        <Col sm="2">
                          <FormGroup>
                            <ButtonGroup
                              id="rbg-webhook-leave"
                              className="btn-group-toggle"
                              data-toggle="buttons"
                            >
                              <Button
                                className={classnames({ active: !webhookLeave })}
                                color="danger"
                                onClick={() => setWebhookLeave(false)}
                                size="sm"
                              >
                                <input
                                  autoComplete="off"
                                  name="options"
                                  type="radio"
                                  value={webhookLeave}
                                />
                                Off
                              </Button>
                              <Button
                                className={classnames({ active: webhookLeave })}
                                color="danger"
                                onClick={() => setWebhookLeave(true)}
                                size="sm"
                              >
                                <input
                                  autoComplete="off"
                                  name="options"
                                  type="radio"
                                  value={webhookLeave}
                                />
                                On
                              </Button>
                            </ButtonGroup>
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col sm="5" className="text-right">
                          <label
                            className="form-control-label"
                            htmlFor="rbg-webhook-timeout"
                          >
                            timeout
                          </label>
                        </Col>
                        <Col sm="2">
                          <FormGroup>
                            <ButtonGroup
                              id="rbg-webhook-timeout"
                              className="btn-group-toggle"
                              data-toggle="buttons"
                            >
                              <Button
                                className={classnames({ active: !webhookTimeout })}
                                color="danger"
                                onClick={() => setWebhookTimeout(false)}
                                size="sm"
                              >
                                <input
                                  autoComplete="off"
                                  name="options"
                                  type="radio"
                                  value={webhookTimeout}
                                />
                                Off
                              </Button>
                              <Button
                                className={classnames({ active: webhookTimeout })}
                                color="danger"
                                onClick={() => setWebhookTimeout(true)}
                                size="sm"
                              >
                                <input
                                  autoComplete="off"
                                  name="options"
                                  type="radio"
                                  value={webhookTimeout}
                                />
                                On
                              </Button>
                            </ButtonGroup>
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col sm="5" className="text-right">
                          <label
                            className="form-control-label"
                            htmlFor="rbg-webhook-state-change"
                          >
                            state-change
                          </label>
                        </Col>
                        <Col sm="2">
                          <FormGroup>
                            <ButtonGroup
                              id="rbg-webhook-state-change"
                              className="btn-group-toggle"
                              data-toggle="buttons"
                            >
                              <Button
                                className={classnames({ active: !webhookStateChange })}
                                color="danger"
                                onClick={() => setWebhookStateChange(false)}
                                size="sm"
                              >
                                <input
                                  autoComplete="off"
                                  name="options"
                                  type="radio"
                                  value={webhookStateChange}
                                />
                                Off
                              </Button>
                              <Button
                                className={classnames({ active: webhookStateChange })}
                                color="danger"
                                onClick={() => setWebhookStateChange(true)}
                                size="sm"
                              >
                                <input
                                  autoComplete="off"
                                  name="options"
                                  type="radio"
                                  value={webhookStateChange}
                                />
                                On
                              </Button>
                            </ButtonGroup>
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col sm="5" className="text-right">
                          <label
                            className="form-control-label"
                            htmlFor="rbg-webhook-interval"
                          >
                            interval
                          </label>
                        </Col>
                        <Col sm="2">
                          <FormGroup>
                            <ButtonGroup
                              id="rbg-webhook-interval"
                              className="btn-group-toggle"
                              data-toggle="buttons"
                            >
                              <Button
                                className={classnames({ active: !webhookInterval })}
                                color="danger"
                                onClick={() => setWebhookInterval(false)}
                                size="sm"
                              >
                                <input
                                  autoComplete="off"
                                  name="options"
                                  type="radio"
                                  value={webhookInterval}
                                />
                                Off
                              </Button>
                              <Button
                                className={classnames({ active: webhookInterval })}
                                color="danger"
                                onClick={() => setWebhookInterval(true)}
                                size="sm"
                              >
                                <input
                                  autoComplete="off"
                                  name="options"
                                  type="radio"
                                  value={webhookInterval}
                                />
                                On
                              </Button>
                            </ButtonGroup>
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col sm="5" className="text-right">
                          <label
                            className="form-control-label"
                            htmlFor="rbg-webhook-active"
                          >
                            active
                          </label>
                        </Col>
                        <Col sm="2">
                          <FormGroup>
                            <ButtonGroup
                              id="rbg-webhook-active"
                              className="btn-group-toggle"
                              data-toggle="buttons"
                            >
                              <Button
                                className={classnames({ active: !webhookActive })}
                                color="danger"
                                onClick={() => setWebhookActive(false)}
                                size="sm"
                              >
                                <input
                                  autoComplete="off"
                                  name="options"
                                  type="radio"
                                  value={webhookActive}
                                />
                                Off
                              </Button>
                              <Button
                                className={classnames({ active: webhookActive })}
                                color="danger"
                                onClick={() => setWebhookActive(true)}
                                size="sm"
                              >
                                <input
                                  autoComplete="off"
                                  name="options"
                                  type="radio"
                                  value={webhookActive}
                                />
                                On
                              </Button>
                            </ButtonGroup>
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col sm="5" className="text-right">
                          <label
                            className="form-control-label"
                            htmlFor="rbg-webhook-inactive"
                          >
                            inactive
                          </label>
                        </Col>
                        <Col sm="2">
                          <FormGroup>
                            <ButtonGroup
                              id="rbg-webhook-inactive"
                              className="btn-group-toggle"
                              data-toggle="buttons"
                            >
                              <Button
                                className={classnames({ active: !webhookInactive })}
                                color="danger"
                                onClick={() => setWebhookInactive(false)}
                                size="sm"
                              >
                                <input
                                  autoComplete="off"
                                  name="options"
                                  type="radio"
                                  value={webhookInactive}
                                />
                                Off
                              </Button>
                              <Button
                                className={classnames({ active: webhookInactive })}
                                color="danger"
                                onClick={() => setWebhookInactive(true)}
                                size="sm"
                              >
                                <input
                                  autoComplete="off"
                                  name="options"
                                  type="radio"
                                  value={webhookInactive}
                                />
                                On
                              </Button>
                            </ButtonGroup>
                          </FormGroup>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </CardBody>
              </Col>
            </Row>

          </Card>
        </Form>
      </Container>
    </>
  );
};

export default PresenceACLs;
