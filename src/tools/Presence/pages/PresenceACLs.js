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

  return (
    <>
      <Container className="mt--7" fluid>
        <Card className="bg-secondary shadow">
          <CardHeader className="border-0">
            <Row className="align-items-center">
              <div className="col">
                <h3 className="mb-0">Presence ACLs</h3>
              </div>
            </Row>
          </CardHeader>
          <CardBody>
            <Form onSubmit={(e) => e.preventDefault()}>
              <div className="pl-lg-4">
                <Row>
                  <Col sm="6">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-channel-pattern"
                      >
                        Channel Pattern
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

                <Row>
                  <Col sm="12">
                    <Row>
                      <Col sm="2">
                        <label
                          className="form-control-label"
                          htmlFor="input-tracking"
                        >
                          Presence Tracking
                        </label>
                      </Col>
                      <Col sm="1">
                        <FormGroup>
                          <ButtonGroup
                            className="btn-group-toggle"
                            data-toggle="buttons"
                          >
                            <Button
                              className={classnames({ active: !tracking })}
                              color="danger"
                              onClick={() => setTracking(false)}
                              size="sm"
                            >
                              <input
                                autoComplete="off"
                                name="options"
                                type="radio"
                                value={tracking}
                              />
                              Off
                            </Button>
                            <Button
                              className={classnames({ active: tracking })}
                              color="danger"
                              onClick={() => setTracking(true)}
                              size="sm"
                            >
                              <input
                                autoComplete="off"
                                name="options"
                                type="radio"
                                value={tracking}
                              />
                              On
                            </Button>
                          </ButtonGroup>
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col sm="2">
                        <label
                          className="form-control-label"
                          htmlFor="input-publish-client-events"
                        >
                          Publish Client Events
                        </label>
                      </Col>
                      <Col sm="1">
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
                      {/* <Col sm="1"></Col> */}
                      <Col sm="2" className="text-right">
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
                      {/* <Col sm="1"></Col> */}
                      <Col sm="2" className="text-right">
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
                      {/* <Col sm="1"></Col> */}
                      <Col sm="2" className="text-right">
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
                      {/* <Col sm="1"></Col> */}
                      <Col sm="2" className="text-right">
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
                      {/* <Col sm="1"></Col> */}
                      <Col sm="2" className="text-right">
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

                  <Col sm="12">
                    <Row>
                      <Col sm="2">
                        <label
                          className="form-control-label"
                          htmlFor="input-tracking"
                        >
                          Presence Tracking
                        </label>
                      </Col>
                      <Col sm="1">
                        <FormGroup>
                          <ButtonGroup
                            className="btn-group-toggle"
                            data-toggle="buttons"
                          >
                            <Button
                              className={classnames({ active: !tracking })}
                              color="danger"
                              onClick={() => setTracking(false)}
                              size="sm"
                            >
                              <input
                                autoComplete="off"
                                name="options"
                                type="radio"
                                value={tracking}
                              />
                              Off
                            </Button>
                            <Button
                              className={classnames({ active: tracking })}
                              color="danger"
                              onClick={() => setTracking(true)}
                              size="sm"
                            >
                              <input
                                autoComplete="off"
                                name="options"
                                type="radio"
                                value={tracking}
                              />
                              On
                            </Button>
                          </ButtonGroup>
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col sm="2">
                        <label
                          className="form-control-label"
                          htmlFor="input-publish-client-events"
                        >
                          Publish Client Events
                        </label>
                      </Col>
                      <Col sm="1">
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
                      {/* <Col sm="1"></Col> */}
                      <Col sm="2" className="text-right">
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
                      {/* <Col sm="1"></Col> */}
                      <Col sm="2" className="text-right">
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
                      {/* <Col sm="1"></Col> */}
                      <Col sm="2" className="text-right">
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
                      {/* <Col sm="1"></Col> */}
                      <Col sm="2" className="text-right">
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
                      {/* <Col sm="1"></Col> */}
                      <Col sm="2" className="text-right">
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
              </div>
            </Form>
          </CardBody>
        </Card>
      </Container>
    </>
  );
};

export default PresenceACLs;
