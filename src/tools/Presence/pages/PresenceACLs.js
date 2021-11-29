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

import { Chip, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, Typography } from "@material-ui/core";
import { classnames } from "@material-ui/data-grid";
import { Edit, CheckCircle, AddCircle, DeleteForever, KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material";
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

  const [aclsConfig, setAclsConfig] = useState({});

  const addAcl = () => {
    // this is a safe deep copy of the array of objects
    let temp = JSON.parse(JSON.stringify(aclsConfigData));
    temp.push(aclsConfig);
    setAclsConfigData(temp);
  }

  const generateACLs = () => {
    let config = isChannelGroup ? { "cg_pattern": channelPattern } : { "pattern": channelPattern };

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

        if (Object.keys(config.p).length === 0) delete config.p;
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

        if (Object.keys(config.w).length === 0) delete config.w;
      }
      else config.w = false;
    }
    else config.t = false;

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
              <AclsTable aclsConfigData={aclsConfigData} setAclsConfigData={setAclsConfigData} />
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

const AclsTable = ({ aclsConfigData, setAclsConfigData }) => {
  console.log("ACLs", aclsConfigData);

  const [index, setIndex] = useState(-1);
  const [editAcl, setEditAcl] = useState({"pattern":"*"});

  const clickCGChip = (e) => {
    e.preventDefault();
    let tmp = JSON.parse(JSON.stringify(editAcl));

    if (tmp.pattern != null) {
      tmp.cg_pattern = tmp.pattern;
      delete tmp.pattern;
    }
    else {
      tmp.pattern = tmp.cg_pattern;
      delete tmp.cg_pattern;
    }
    
    setEditAcl(tmp);
  }

  const clickChip = (e, prop, prop2) => {
    e.preventDefault();
    let tmp = JSON.parse(JSON.stringify(editAcl));
    
    if (prop2 == null) {
      tmp[prop] = !editAcl[prop];
    }
    else {
      if (tmp[prop] == null) tmp[prop] = {};
      tmp[prop][prop2] = editAcl[prop] == null ? false : !editAcl[prop][prop2];
    }
    
    setEditAcl(tmp);
  }

  const saveAcl = (e) => {
    e.preventDefault();
  }

  const addAcl = (e) => {
    e.preventDefault();

    let tmp = JSON.parse(JSON.stringify(aclsConfigData));
    tmp.push(editAcl);
    setAclsConfigData(tmp);
  }

  const updateAcl = (e, selRow) => {
    e.preventDefault();
    setIndex(selRow);
    setEditAcl(aclsConfigData[selRow]);
  }

  const deleteAcl = (e, selRow) => {
    e.preventDefault();
  }


  if (aclsConfigData == null || aclsConfigData.length === 0) return <>No ACLs</>;

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell align="center">Order</TableCell>
              <TableCell align="right">#</TableCell>
              <TableCell>Pattern</TableCell>
              <TableCell align="center">CG?</TableCell>
              <TableCell align="center">Tracking</TableCell>
              <TableCell align="center">Publish Events</TableCell>
              <TableCell align="center">Webhooks</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="right"></TableCell>
              <TableCell align="right" style={{ verticalAlign: 'top'}}>{index}</TableCell>
              <TableCell style={{verticalAlign: 'top'}}>
                <Input
                  className="form-control-alternative"
                  id="input-channel-pattern"
                  placeholder="Enter a name or pattern (using * as wildcard)"
                  type="text"
                  value={editAcl.pattern}
                  disabled
                />
              </TableCell>
              <TableCell align="center" style={{ verticalAlign: 'top'}}>
                <Chip onClick={(e) => clickCGChip(e)} color={editAcl.cg_pattern != null ? "primary" : "secondary"} size="small" label="CG"/>&nbsp;
              </TableCell>
              <TableCell align="center" style={{ verticalAlign: 'top'}}>
                <Chip onClick={(e) => clickChip(e, "t")} color={editAcl.t == null || editAcl.t ? "primary" : "secondary"} size="small" label="T"/>&nbsp;
                <Chip onClick={(e) => clickChip(e, "ts")} color={(editAcl.t == null || editAcl.t) && (editAcl.ts == null || editAcl.ts) ? "primary" : "secondary"} size="small" label="TS"/>&nbsp;
                <Chip onClick={(e) => clickChip(e, "th")} color={(editAcl.t == null || editAcl.t) && (editAcl.th == null || editAcl.th) ? "primary" : "secondary"} size="small" label="TH"/>
              </TableCell>
              <TableCell align="center" style={{ verticalAlign: 'top'}}>
                <Chip onClick={(e) => clickChip(e, "p", "join")} color={(editAcl.t == null || editAcl.t) && (editAcl.p == null || editAcl.p) && (editAcl.p == null || editAcl.p.join == null || editAcl.p.join) ? "primary" : "secondary"} size="small" label="J"/>&nbsp;
                <Chip onClick={(e) => clickChip(e, "p", "leave")} color={(editAcl.t == null || editAcl.t) && (editAcl.p == null || editAcl.p) && (editAcl.p == null || editAcl.p.leave == null || editAcl.p.leave) ? "primary" : "secondary"} size="small" label="L"/>&nbsp;
                <Chip onClick={(e) => clickChip(e, "p", "timeout")} color={(editAcl.t == null || editAcl.t) && (editAcl.p == null || editAcl.p) && (editAcl.p == null || editAcl.p.timeout == null ||editAcl.p.timeout) ? "primary" : "secondary"} size="small" label="T"/>&nbsp;
                <Chip onClick={(e) => clickChip(e, "p", "state-change")} color={(editAcl.t == null || editAcl.t) && (editAcl.p == null || editAcl.p) && (editAcl.p == null || editAcl.p["state-change"] == null || editAcl.p["state-change"]) ? "primary" : "secondary"} size="small" label="S"/>&nbsp;
                <Chip onClick={(e) => clickChip(e, "p", "interval")} color={(editAcl.t == null || editAcl.t) && (editAcl.p == null || editAcl.p) && (editAcl.p == null || editAcl.p.interval == null || editAcl.p.interval) ? "primary" : "secondary"} size="small" label="I"/>
              </TableCell>
              <TableCell align="center" style={{ verticalAlign: 'top'}}>
                <Chip onClick={(e) => clickChip(e, "w", "join")} color={(editAcl.t == null || editAcl.t) && (editAcl.w == null || editAcl.w) && (editAcl.w == null || editAcl.w.join == null || editAcl.w.join) ? "primary" : "secondary"} size="small" label="J"/>&nbsp;
                <Chip onClick={(e) => clickChip(e, "w", "leave")} color={(editAcl.t == null || editAcl.t) && (editAcl.w == null || editAcl.w) && (editAcl.w == null || editAcl.w.leave == null || editAcl.w.leave) ? "primary" : "secondary"} size="small" label="L"/>&nbsp;
                <Chip onClick={(e) => clickChip(e, "w", "timeout")} color={(editAcl.t == null || editAcl.t) && (editAcl.w == null || editAcl.w) && (editAcl.w == null || editAcl.w.timeout == null ||editAcl.w.timeout) ? "primary" : "secondary"} size="small" label="T"/>&nbsp;
                <Chip onClick={(e) => clickChip(e, "w", "state-change")} color={(editAcl.t == null || editAcl.t) && (editAcl.w == null || editAcl.w) && (editAcl.w == null || editAcl.w["state-change"] == null || editAcl.w["state-change"]) ? "primary" : "secondary"} size="small" label="S"/>&nbsp;
                <Chip onClick={(e) => clickChip(e, "w", "interval")} color={(editAcl.t == null || editAcl.t) && (editAcl.w == null || editAcl.w) && (editAcl.w == null || editAcl.w.interval == null || editAcl.w.interval) ? "primary" : "secondary"} size="small" label="I"/>&nbsp;
                <Chip onClick={(e) => clickChip(e, "w", "active")} color={(editAcl.t == null || editAcl.t) && (editAcl.w == null || editAcl.w) && (editAcl.w == null || editAcl.w.active == null || editAcl.w.active) ? "primary" : "secondary"} size="small" label="A"/>&nbsp;
                <Chip onClick={(e) => clickChip(e, "w", "inactive")} color={(editAcl.t == null || editAcl.t) && (editAcl.w == null || editAcl.w) && (editAcl.w == null || editAcl.w.inactive == null || editAcl.w.inactive) ? "primary" : "secondary"} size="small" label="IA"/>
              </TableCell>
              <TableCell align="center" style={{ verticalAlign: 'top'}}>
                <CheckCircle onClick={(e) => saveAcl(e)}/>
                &nbsp;
                <AddCircle onClick={(e) => addAcl(e)}/>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {aclsConfigData.map((acl, index) => (
              <AclRow acl={acl} index={index} updateAcl={updateAcl} deleteAcl={deleteAcl} />
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan="3">
                <Input
                  id="output-edit-acl"
                  type="textarea"
                  rows="10"
                  value={JSON.stringify(editAcl, null, 2)}
                  disabled
                />
              </TableCell>
              <TableCell colSpan="3">
                
                <Input
                  id="output-acls-config"
                  type="textarea"
                  rows="10"
                  value={JSON.stringify(aclsConfigData, null, 2)}
                  disabled
                />
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Paper>
  );
}

const AclRow = ({ acl, index, updateAcl, deleteAcl}) => {
  return (
    <>
      <TableRow id={index} sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell align="center"><KeyboardArrowUp/><br/><KeyboardArrowDown/></TableCell>
        <TableCell align="right">{index}</TableCell>
        <TableCell component="th" scope="row">
          <strong>{acl.pattern || acl.cg_pattern}</strong>
        </TableCell>
        <TableCell align="center">
          <Chip color={acl.cg_pattern != null ? "primary" : "secondary"} size="small" label="CG"/>&nbsp;
        </TableCell>
        <TableCell component="th" scope="row" align="center">
          <Chip color={acl.t == null || acl.t ? "primary" : "secondary"} size="small" label="T"/>&nbsp;
          <Chip color={(acl.t == null || acl.t) && (acl.ts == null || acl.ts) ? "primary" : "secondary"} size="small" label="TS"/>&nbsp;
          <Chip color={(acl.t == null || acl.t) && (acl.th == null || acl.th) ? "primary" : "secondary"} size="small" label="TH"/>&nbsp;
        </TableCell>
        <TableCell align="center">
          <Chip color={(acl.t == null || acl.t) && (acl.p == null || acl.p) && (acl.p == null || acl.p.join == null || acl.p.join) ? "primary" : "secondary"} size="small" label="J"/>&nbsp;
          <Chip color={(acl.t == null || acl.t) && (acl.p == null || acl.p) && (acl.p == null || acl.p.leave == null || acl.p.leave) ? "primary" : "secondary"} size="small" label="L"/>&nbsp;
          <Chip color={(acl.t == null || acl.t) && (acl.p == null || acl.p) && (acl.p == null || acl.p.timeout == null ||acl.p.timeout) ? "primary" : "secondary"} size="small" label="T"/>&nbsp;
          <Chip color={(acl.t == null || acl.t) && (acl.p == null || acl.p) && (acl.p == null || acl.p["state-change"] == null || acl.p["state-change"]) ? "primary" : "secondary"} size="small" label="S"/>&nbsp;
          <Chip color={(acl.t == null || acl.t) && (acl.p == null || acl.p) && (acl.p == null || acl.p.interval == null || acl.p.interval) ? "primary" : "secondary"} size="small" label="I"/>&nbsp;
        </TableCell>
        <TableCell align="center">
          <Chip color={(acl.t == null || acl.t) && (acl.w == null || acl.w) && (acl.w == null || acl.w.join == null || acl.w.join) ? "primary" : "secondary"} size="small" label="J"/>&nbsp;
          <Chip color={(acl.t == null || acl.t) && (acl.w == null || acl.w) && (acl.w == null || acl.w.leave == null || acl.w.leave) ? "primary" : "secondary"} size="small" label="L"/>&nbsp;
          <Chip color={(acl.t == null || acl.t) && (acl.w == null || acl.w) && (acl.w == null || acl.w.timeout == null || acl.w.timeout) ? "primary" : "secondary"} size="small" label="T"/>&nbsp;
          <Chip color={(acl.t == null || acl.t) && (acl.w == null || acl.w) && (acl.w == null || acl.w["state-change"] == null || acl.w["state-change"]) ? "primary" : "secondary"} size="small" label="S"/>&nbsp;
          <Chip color={(acl.t == null || acl.t) && (acl.w == null || acl.w) && (acl.w == null || acl.w.interval == null || acl.w.interval) ? "primary" : "secondary"} size="small" label="I"/>&nbsp;
          <Chip color={(acl.t == null || acl.t) && (acl.w == null || acl.w) && (acl.w == null || acl.w.active == null || acl.w.active) ? "primary" : "secondary"} size="small" label="A"/>&nbsp;
          <Chip color={(acl.t == null || acl.t) && (acl.w == null || acl.w) && (acl.w == null || acl.w.inactive == null || acl.w.inactive) ? "primary" : "secondary"} size="small" label="IA"/>&nbsp;
        </TableCell>
        <TableCell align="center" onClick={(e) => updateAcl(e, index)}>
          <Edit/>
          &nbsp;
          <DeleteForever onClick={(e) => deleteAcl(e, index)}/>
        </TableCell>
      </TableRow>
    </>
  );
}
