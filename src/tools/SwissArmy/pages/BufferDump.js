import { useState } from "react";
import ReactBSAlert from "react-bootstrap-sweetalert";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { format, subMilliseconds, fromUnixTime } from 'date-fns'

// core components
import { useKeySetData } from "../../KeySetProvider";
import { useSwissArmyData } from "../SwissArmyProvider";
const BufferDump = () => {
  const keySetContext = useKeySetData();
  const swissArmyContext = useSwissArmyData();

  console.log("BufferDump keySetContext: ", keySetContext);
  console.log("BufferDump swissArmyContext: ", swissArmyContext);

  const [channel, setChannel] = useState("");
  const [bufferMessages, setBufferMessages] = useState([]);

  const [sweetAlert, setSweetAlert] = useState(null);

  let subscribeUrl = `https://ps.pndsn.com/v2/subscribe/${keySetContext.subKey}/${channel}/0?uuid=${keySetContext.uuid}&pnsdk=the-toolbox-v0.2.0&tt=`;

  const retrieveMessages = () => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);
    const oldtt = subMilliseconds(new Date(), 1200000).getTime() + "0000";

    timerAlert("Checking Buffer", "Please wait while we dump the buffer...", 3000);

    fetch(subscribeUrl+oldtt, {signal: controller.signal}).then(res => res.json()).then(
      (result) => {
        console.log(result);
        let payload = [];

        result.m.forEach(element => {
          let item = {};
          item.channel = element.c;
          item.message = JSON.stringify(element.d, null, 2);
          item.pubid = element.i;
          item.pubtt = element.p.t;
          
          item.datetime = format(fromUnixTime(element.p.t.substr(0,10)), 'yyyy/dd/MM hh:mm:ss');
          item.milli = element.p.t.substr(10,3);
          item.micronano = element.p.t.substr(13,3) + "." + element.p.t.substr(16);

          payload.push(item);
        });

        setBufferMessages(payload);
        clearTimeout(timeoutId);
        hideAlert();
      },
      (error) => {
        console.log("subscribe error:", error);
        setBufferMessages([]);
        timerAlert("Buffer Empty", "The message buffer was empty.", 2000);
        // clearTimeout(timeoutId);
      }
    ); 
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
          showConfirm={false}
        >
          {message}
        </ReactBSAlert>
    );
    setTimeout(function() {hideAlert()}, delay);
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
                    <h3 className="mb-0">Message Buffer Dump</h3>
                  </div>
                </Row>
              </CardHeader>             
              <CardBody>
                <Form>
                  <CardHeader>
                    <FormGroup>
                      <Row>
                        <Col>
                          <label
                            className="form-control-label"
                            htmlFor="input-channel"
                          >
                            Target Channel
                          </label>
                        </Col>
                        <Col className="col text-right">
                          <Button
                            color="danger"
                            onClick={retrieveMessages}
                            size="sm"
                            disabled = {channel === ""}
                          >
                            Dump Buffer
                          </Button>
                        </Col>
                      </Row>
                      <Input
                        className="form-control-alternative"
                        id="input-channel"
                        placeholder="Enter primary message channel"
                        type="text"
                        value={channel}
                        onChange={(e) => setChannel(e.target.value)}
                      />
                    </FormGroup>
                  </CardHeader>
                  <div className="nav-wrapper">
                    <Card>
                      <Row>
                        <Col sm="12">
                          <CardHeader>
                            <Row>
                              <Col>
                                <label
                                  className="form-control-label"
                                  htmlFor="output-received-messages"
                                >
                                  Buffer Messages
                                </label>
                                
                              </Col>
                              <Col className="col text-right">
                                <Button
                                  color="danger"
                                  size="sm"
                                  onClick={() => setBufferMessages([])}
                                >
                                  Clear
                                </Button>
                              </Col>
                            </Row>
                          </CardHeader>
                          <Card body>
                            <div className="pl-lg-12">
                              <MetadataTable metadata={bufferMessages}/>
                            </div>
                          </Card>
                        </Col>
                      </Row>
                    </Card>
                  </div>
                </Form>
              </CardBody>
            </Card>
            <p />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default BufferDump;

const MetadataTable = ({metadata}) => {
  console.log("messages", metadata);

  if (metadata == null || metadata.length ===0) return <>No Results</>;

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell align="right">#</TableCell>
              <TableCell>Channel</TableCell>
              <TableCell>Message</TableCell>
              <TableCell>Publish UUID</TableCell>
              <TableCell>Publish TimeToken</TableCell>
              <TableCell>Publish DateTime</TableCell>
              <TableCell align="right">milli</TableCell>
              <TableCell align="right">micro.nano</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {metadata.map((payload, index) => (
              <MetadataRow index={index} payload={payload}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

const MetadataRow = ({index, payload}) => {
  // const ttcolor = 
  //   <>
  //     <Typography color="Primary"><small>{payload.pubtt.substr(0, 10)}</small></Typography>
  //     <Typography color="Warning"><small>{payload.pubtt.substr(10, 3)}</small></Typography>
  //     <Typography color="Success"><small>{payload.pubtt.substr(13, 4)}</small></Typography>
  //   </>;

  return (
    <>
      <TableRow key={index} sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell align="right">{index}</TableCell>
        <TableCell component="th" scope="row">{payload.channel}</TableCell>
        <TableCell component="th" scope="row">{payload.message}</TableCell>
        <TableCell>{payload.pubid}</TableCell>
        <TableCell>{payload.pubtt}</TableCell>
        <TableCell>{payload.datetime}</TableCell>
        <TableCell align="right">{payload.milli}</TableCell>
        <TableCell align="right">{payload.micronano}</TableCell>
      </TableRow>
    </>
  );
}