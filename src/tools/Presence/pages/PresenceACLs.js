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

import { Chip, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@material-ui/core";
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

  const [aclsConfigData, setAclsConfigData] = useState([]);

  const [channelPattern, setChannelPattern] = useState("*");
  const [isChannelGroup, setIsChannelGroup] = useState(false);

  const [tracking, setTracking] = useState(true);
  const [trackSubscribes, setTrackSubscribes] = useState(true);
  const [trackHeartbeats, setTrackHeartbeats] = useState(true);

  const [clientEvents, setClientEvents] = useState(true);
  const [clientEventJoin, setClientEventJoin] = useState(true);
  const [clientEventLeave, setClientEventLeave] = useState(true);
  const [clientEventTimeout, setClientEventTimeout] = useState(true);
  const [clientEventStateChange, setClientEventStateChange] = useState(true);
  const [clientEventInterval, setClientEventInterval] = useState(true);

  const [webhooks, setWebhooks] = useState(true);
  const [webhookJoin, setWebhookJoin] = useState(true);
  const [webhookLeave, setWebhookLeave] = useState(true);
  const [webhookTimeout, setWebhookTimeout] = useState(true);
  const [webhookStateChange, setWebhookStateChange] = useState(true);
  const [webhookInterval, setWebhookInterval] = useState(true);
  const [webhookActive, setWebhookActive] = useState(true);
  const [webhookInactive, setWebhookInactive] = useState(true);

  const [aclsConfig, setAclsConfig] = useState([]);

  const addAcl = () => {
    let temp = aclsConfigData;
    temp.push(aclsConfig);
    setAclsConfig(temp);
  }

  const generateACLs = () => {
    let config = isChannelGroup ? { "cg_pattern": channelPattern } : { "pattern": channelPattern };

    config.t = tracking;

    if (tracking) {
      if (!trackSubscribes) config.ts = false;
      if (!trackHeartbeats) config.th = false;

      if (clientEvents) {
        config.p = {};

        if (!clientEventJoin) config.p.join = false;
        if (!clientEventLeave) config.p.leave = false;
        if (!clientEventTimeout) config.p.timeout = false;
        if (!clientEventStateChange) config.p["state-change"] = false;
        if (!clientEventInterval) config.p.interval = false;

        if (Object.keys(config.p).length === 0) config.p = true;
      }
      else config.p = false;

      if (webhooks) {
        config.w = {};

        if (!webhookJoin) config.w.join = false;
        if (!webhookLeave) config.w.leave = false;
        if (!webhookTimeout) config.w.timeout = false;
        if (!webhookStateChange) config.w["state-change"] = false;
        if (!webhookInterval) config.w.interval = false;
        if (!webhookActive) config.w.active = false;
        if (!webhookInactive) config.w.inactive = false;

        if (Object.keys(config.w).length === 0) config.w = true;
      }
      else config.w = false;
    }

    setAclsConfig(config);
  }

  return (
    <>
      <Container className="mt--7" fluid>
        <Card id="table-acls" className="bg-secondary shadow">

          <CardHeader className="border-0">
            <Row className="align-items-center">
              <div className="col">
                <h3 className="mb-0">Presence ACLs</h3>
              </div>
            </Row>
          </CardHeader>

          <CardBody id="cardbody-acls-table">
            <div className="pl-lg-12">
              <AclTable acls={aclsConfigData} />
            </div>
          </CardBody>

        </Card>

        <Form onSubmit={(e) => e.preventDefault()}>
          <Card id="input-acls-config" className="bg-secondary shadow">
            <CardHeader className="border-0">
              <Row className="align-items-center">
                <div className="col">
                  <h3 className="mb-0">ACL Configuration</h3>
                </div>
                <Col className="text-right">
                  <Button
                    color="danger"
                    onClick={() => addAcl()}
                  >
                    Add ACL
                  </Button>
                </Col>
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
                      <Typography><small><strong>Channel Pattern</strong></small></Typography>
                    </label>
                    <Input
                      className="form-control-alternative"
                      id="input-channel-pattern"
                      placeholder="Enter the channel name or pattern (using * as wildcard)"
                      type="text"
                      value={channelPattern}
                      onChange={(e) => setChannelPattern(e.target.value)}
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row id="is-channel-group">
                <Col sm="2">
                  <label
                    className="form-control-label"
                    htmlFor="input-is-channel-group"
                  >
                    <Typography><small><strong>&nbsp;&nbsp;&nbsp;&nbsp;Is Channel Group?</strong></small></Typography>
                  </label>
                </Col>
                <Col sm="3">
                  <FormGroup>
                    <ButtonGroup
                      id="input-is-channel-group"
                      className="btn-group-toggle"
                      data-toggle="buttons"
                    >
                      <Button
                        className={classnames({ active: !isChannelGroup })}
                        color="danger"
                        onClick={() => setIsChannelGroup(false)}
                        size="sm"
                        disabled={!tracking}
                      >
                        <input
                          autoComplete="off"
                          name="options"
                          type="radio"
                          value={isChannelGroup}
                        />
                        No
                      </Button>
                      <Button
                        className={classnames({ active: isChannelGroup })}
                        color="danger"
                        onClick={() => setIsChannelGroup(true)}
                        size="sm"
                        disabled={!tracking}
                      >
                        <input
                          autoComplete="off"
                          name="options"
                          type="radio"
                          value={isChannelGroup}
                        />
                        Yes
                      </Button>
                    </ButtonGroup>
                  </FormGroup>
                </Col>
              </Row>
            </CardBody>

            <Row>
              <Col id="col-left">
                <CardBody id="cardbody-left-inputs">
                  <Row id="tracking">
                    <Col sm="6">
                      <Row>
                        <Col sm="5">
                          <label
                            className="form-control-label"
                            htmlFor="input-tracking"
                          >
                            <Typography><small><strong>Tracking</strong></small></Typography>
                          </label>
                        </Col>
                        <Col>
                          <FormGroup>
                            <ButtonGroup
                              id="input-tracking"
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
                    </Col>
                  </Row>

                  <Row id="track-subscribes">
                    <Col sm="6">
                      <Row>
                        <Col sm="5">
                          <label
                            className="form-control-label"
                            htmlFor="input-track-subscribes"
                          >
                            <Typography><small><strong>&nbsp;&nbsp;&nbsp;&nbsp;Subscribes</strong></small></Typography>
                          </label>
                        </Col>
                        <Col>
                          <FormGroup>
                            <ButtonGroup
                              id="input-track-subscribes"
                              className="btn-group-toggle"
                              data-toggle="buttons"
                            >
                              <Button
                                className={classnames({ active: !trackSubscribes })}
                                color="danger"
                                onClick={() => setTrackSubscribes(false)}
                                size="sm"
                                disabled={!tracking}
                              >
                                <input
                                  autoComplete="off"
                                  name="options"
                                  type="radio"
                                  value={trackSubscribes}
                                />
                                Off
                              </Button>
                              <Button
                                className={classnames({ active: trackSubscribes })}
                                color="danger"
                                onClick={() => setTrackSubscribes(true)}
                                size="sm"
                                disabled={!tracking}
                              >
                                <input
                                  autoComplete="off"
                                  name="options"
                                  type="radio"
                                  value={trackSubscribes}
                                />
                                On
                              </Button>
                            </ButtonGroup>
                          </FormGroup>
                        </Col>
                      </Row>
                    </Col>
                  </Row>

                  <Row id="track-heartbeats">
                    <Col sm="6">
                      <Row>
                        <Col sm="5">
                          <label
                            className="form-control-label"
                            htmlFor="input-track-heartbeats"
                          >
                            <Typography><small><strong>&nbsp;&nbsp;&nbsp;&nbsp;Heartbeats</strong></small></Typography>
                          </label>
                        </Col>
                        <Col>
                          <FormGroup>
                            <ButtonGroup
                              id="input-track-heartbeats"
                              className="btn-group-toggle"
                              data-toggle="buttons"
                            >
                              <Button
                                className={classnames({ active: !trackHeartbeats })}
                                color="danger"
                                onClick={() => setTrackHeartbeats(false)}
                                size="sm"
                                disabled={!tracking}
                              >
                                <input
                                  autoComplete="off"
                                  name="options"
                                  type="radio"
                                  value={trackHeartbeats}
                                />
                                Off
                              </Button>
                              <Button
                                className={classnames({ active: trackHeartbeats })}
                                color="danger"
                                onClick={() => setTrackHeartbeats(true)}
                                size="sm"
                                disabled={!tracking}
                              >
                                <input
                                  autoComplete="off"
                                  name="options"
                                  type="radio"
                                  value={trackHeartbeats}
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

                  <Row id="client-events">
                    <Col sm="6">
                      <Row>
                        <Col sm="5">
                          <label
                            className="form-control-label"
                            htmlFor="input-publish-client-events"
                          >
                            <Typography><small><strong>Client Events</strong></small></Typography>
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
                                disabled={!tracking}
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
                                disabled={!tracking}
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
                                disabled={!tracking || !clientEvents}
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
                                disabled={!tracking || !clientEvents}
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
                                disabled={!tracking || !clientEvents}
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
                                disabled={!tracking || !clientEvents}
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
                                disabled={!tracking || !clientEvents}
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
                                disabled={!tracking || !clientEvents}
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
                                disabled={!tracking || !clientEvents}
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
                                disabled={!tracking || !clientEvents}
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
                                disabled={!tracking || !clientEvents}
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
                                disabled={!tracking || !clientEvents}
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
                  <Row id="webhooks">
                    <Col sm="6">
                      <Row>
                        <Col sm="5">
                          <label
                            className="form-control-label"
                            htmlFor="input-webhooks"
                          >
                            <Typography><small><strong>Webhooks</strong></small></Typography>
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
                                disabled={!tracking}
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
                                disabled={!tracking}
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
                                disabled={!tracking || !webhooks}
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
                                disabled={!tracking || !webhooks}
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
                                disabled={!tracking || !webhooks}
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
                                disabled={!tracking || !webhooks}
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
                                disabled={!tracking || !webhooks}
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
                                disabled={!tracking || !webhooks}
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
                                disabled={!tracking || !webhooks}
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
                                disabled={!tracking || !webhooks}
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
                                disabled={!tracking || !webhooks}
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
                                disabled={!tracking || !webhooks}
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
                                disabled={!tracking || !webhooks}
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
                                disabled={!tracking || !webhooks}
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
                                disabled={!tracking || !webhooks}
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
                                disabled={!tracking || !webhooks}
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

          <Card id="output-acls-config" className="bg-secondary shadow">
            <CardHeader>
              <Row>
                <Col>
                  <div className="col">
                    <h3 className="mb-0">ACL Config</h3>
                  </div>
                </Col>
                <Col className="text-right">
                  <Button
                    color="danger"
                    onClick={() => generateACLs()}
                  >
                    Generate ACLs
                  </Button>
                </Col>
              </Row>
            </CardHeader>
            <Row>
              <CardBody id="acls-config">
                <Input
                  className="form-control-alternative"
                  id="output-acls-config"
                  type="textarea"
                  rows="20"
                  value={JSON.stringify(aclsConfig, null, 2)}
                  onChange={(e) => setAclsConfig(e.target.value)}
                />
              </CardBody>
            </Row>
          </Card>
        </Form>
      </Container>
    </>
  );
};

export default PresenceACLs;

const AclTable = ({ acls }) => {
  console.log("ACLs", acls);

  if (acls == null || acls.length === 0) return <>No ACLs</>;

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell align="right">#</TableCell>
              <TableCell>Pattern</TableCell>
              <TableCell>Tracking</TableCell>
              <TableCell>Publish Events</TableCell>
              <TableCell>Webhooks</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {acls.map((acl, index) => (
              <AclRow index={index} acl={acl}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

const acl = {
  "pattern": "*",
  "t": true,
  "ts": false,
  "th": false,
  "p": {
    "join": false
  },
  "w": {
    "join": false
  }
}

const AclRow = ({ index, acl }) => {
  return (
    <>
      <TableRow key={index} sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell align="right">{index}</TableCell>
        <TableCell component="th" scope="row"><strong>{acl.pattern}</strong></TableCell>
        <TableCell component="th" scope="row">
          <Chip color={acl.t ? "primary" : ""} size="small" label="T"/>
          <Chip color={acl.ts ? "primary" : ""} size="small" label="TS"/>
          <Chip color={acl.th ? "primary" : ""} size="small" label="TH"/>
        </TableCell>
        <TableCell>
          <Chip color={acl.p && !acl.p.join && acl.p.join != null  ? "" : "primary"} size="small" label="J"/>
          <Chip color={acl.p && !acl.p.leave && acl.p.leave != null  ? "" : "primary"} size="small" label="L"/>
          <Chip color={acl.p && !acl.p.timeout && acl.p.timeout != null  ? "" : "primary"} size="small" label="T"/>
          <Chip color={acl.p && !acl.p["state-change"] && acl.p["state-change"] != null  ? "" : "primary"} size="small" label="SC"/>
          <Chip color={acl.p && !acl.p.interval && acl.p.interval != null  ? "" : "primary"} size="small" label="I"/>
        </TableCell>
        <TableCell>
          <Chip color={acl.w && !acl.w.join && acl.w.join != null  ? "" : "primary"} size="small" label="J"/>
          <Chip color={acl.w && !acl.w.leave && acl.w.leave != null  ? "" : "primary"} size="small" label="L"/>
          <Chip color={acl.w && !acl.w.timeout && acl.w.timeout != null  ? "" : "primary"} size="small" label="T"/>
          <Chip color={acl.w && !acl.w["state-change"] && acl.w["state-change"] != null  ? "" : "primary"} size="small" label="SC"/>
          <Chip color={acl.w && !acl.w.interval && acl.w.interval != null  ? "" : "primary"} size="small" label="I"/>
          <Chip color={acl.w && !acl.w.active && acl.w.active != null  ? "" : "primary"} size="small" label="A"/>
          <Chip color={acl.w && !acl.w.inactive && acl.w.inactive != null  ? "" : "primary"} size="small" label="IA"/>
        </TableCell>
        <TableCell>ACTIONS</TableCell>
        <TableCell align="right">{acl.milli}</TableCell>
        <TableCell align="right">{acl.micronano}</TableCell>
      </TableRow>
    </>
  );
}

{/* <TableRow key={index} sx={{ '& > *': { borderBottom: 'unset' } }}>
<TableCell align="right">{index}</TableCell>
<TableCell component="th" scope="row">{acl.pattern}</TableCell>
<TableCell component="th" scope="row">{acl.t} | {acl.ts} | {acl.th}</TableCell>
<TableCell>{acl.p} | {acl.p.join} | {acl.p.leave} | {acl.p.timeout} | {acl.p["state-change"]} | {acl.p.interval}</TableCell>
<TableCell>{acl.w} | {acl.w.join} | {acl.w.leave} | {acl.w.timeout} | {acl.w["state-change"]} | {acl.w.interval} | {acl.w.active} | {acl.w.inactive}</TableCell>
<TableCell>ACTIONS</TableCell>
<TableCell align="right">{acl.milli}</TableCell>
<TableCell align="right">{acl.micronano}</TableCell>
</TableRow> */}