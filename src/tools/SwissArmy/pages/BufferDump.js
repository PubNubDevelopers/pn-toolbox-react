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

import { subMilliseconds, fromUnixTime } from 'date-fns'

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
    const oldtt = subMilliseconds(new Date(), 1200000).getTime() + "0000";

    fetch(subscribeUrl + oldtt ).then(res => res.json()).then((result) => {
        console.log(result);
        let payload = [];

        result.m.forEach(element => {
          let item = {};
          item.message = JSON.stringify(element.d, null, 2);
          item.pubid = element.i;
          item.pubtt = element.p.t;
          item.pubdatetime = fromUnixTime(element.p.t.substr(0,10)).toString();
          payload.push(item);
        });
        setBufferMessages(payload);
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
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
              <TableCell>Message</TableCell>
              <TableCell>Publish UUID</TableCell>
              <TableCell>Publish TT</TableCell>
              <TableCell>Publish Datetime</TableCell>
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
  return (
    <>
      <TableRow key={index} sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell align="right">{index}</TableCell>
        <TableCell component="th" scope="row">{payload.message}</TableCell>
        <TableCell>{payload.pubid}</TableCell>
        <TableCell>{payload.pubtt}</TableCell>
        <TableCell>{payload.pubdatetime}</TableCell>
      </TableRow>
    </>
  );
}