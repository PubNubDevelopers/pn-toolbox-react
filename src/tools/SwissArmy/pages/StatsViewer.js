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
import { useEffect } from "react";

const StatsViewer = () => {
  const keySetContext = useKeySetData();
  const swissArmyContext = useSwissArmyData();

  console.log("StatsViewer keySetContext: ", keySetContext);
  console.log("StatsViewer swissArmyContext: ", swissArmyContext);

  const [sweetAlert, setSweetAlert] = useState(null);

  const [channel, setChannel] = useState("");
  const [bufferMessages, setBufferMessages] = useState([]);
  const [bufferMessages2, setBufferMessages2] = useState([]);

  const [channels, setChannels] = useState([]);
  // const [message, setMessage] = useState('');

  const handleMessage = event => {
    try {
      // const message = JSON.parse(event.message);
      const message = event.message;
      console.log("Message: " + message);
      
      if (event.channel.indexOf(".promo") !== -1) {
        timerAlert("BURRITO!!!", "Be one of the first 10 to click to win a FREE Burrito!", 5000);
      }
      else {
        if (message.stat_type === "score") {
          setBufferMessages(prevData => [...prevData, message]);
        }
        if (message.stat_type === "penalty") {
          setBufferMessages2(prevData => [...prevData, message]);
        }
      }
    }
    catch(e) {
      console.error(JSON.stringify(e.message));
    }
  };

  useEffect(() => {
    if (keySetContext.pubnub !== null) {
      console.log("addListener");
      const listenerParams = { message: handleMessage }
      keySetContext.pubnub.addListener(listenerParams);
      keySetContext.pubnub.subscribe({ channels });       

      return () => {
        keySetContext.pubnub.unsubscribeAll();
        keySetContext.pubnub.removeListener(listenerParams)
      }
    }
  }, [keySetContext.pubnub, channels]);

  const watchGame = () => {
    console.log("Channel", channel);
    setChannels([channel, channel + ".promo"]);
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
          onConfirm={() => showQRCode()}
          showConfirm={true}
        >
          {message}
        </ReactBSAlert>
    );
    setTimeout(function() {hideAlert()}, delay);
  };

  const confirmAlert = (title, alertMessage) => {
    setSweetAlert(
        <ReactBSAlert
          question
          style={{ display: "block", marginTop: "100px" }}
          title={title}
          onConfirm={() => hideAlert()}
          onCancel={() => hideAlert()}
          showCancel
          confirmBtnBsStyle="danger"
          confirmBtnText="Confirm"
          cancelBtnBsStyle="secondary"
          cancelBtnText="Cancel"
          reverseButtons={true}
          btnSize=""
        >
          {alertMessage}
        </ReactBSAlert>
    );
  };

  const showQRCode = () => {
    hideAlert();
    confirmAlert("FREE BURRITO", "Show this QR Code at the concession stand.");

  }

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
                    <h3 className="mb-0">Game Stats Viewer</h3>
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
                            Game Channel
                          </label>
                        </Col>
                        <Col className="col text-right">
                          <Button
                            color="danger"
                            onClick={watchGame}
                            size="sm"
                            disabled = {channel === ""}
                          >
                            Watch Game
                          </Button>
                        </Col>
                      </Row>
                      <Input
                        className="form-control-alternative"
                        id="input-channel"
                        placeholder="enter the game channel"
                        type="text"
                        value={channel}
                        onChange={(e) => setChannel(e.target.value)}
                      />
                    </FormGroup>
                  </CardHeader>
                  <div className="nav-wrapper">
                    <Card>
                      <Row>
                        <Col sm="6">
                          <CardHeader>
                            <Row>
                              <Col>
                                <label
                                  className="form-control-label"
                                  htmlFor="output-received-messages"
                                >
                                  Goals
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
                        <Col sm="6">
                          <CardHeader>
                            <Row>
                              <Col>
                                <label
                                  className="form-control-label"
                                  htmlFor="output-received-messages"
                                >
                                  Penalties
                                </label>
                                
                              </Col>
                              <Col className="col text-right">
                                <Button
                                  color="danger"
                                  size="sm"
                                  onClick={() => setBufferMessages2([])}
                                >
                                  Clear
                                </Button>
                              </Col>
                            </Row>
                          </CardHeader>
                          <Card body>
                            <div className="pl-lg-12">
                              <MetadataTable metadata={bufferMessages2}/>
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

export default StatsViewer;

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
              <TableCell>Team</TableCell>
              <TableCell>Player #</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {metadata.map((payload, index) => (
              <MetadataRow index={index} payload={payload}/>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

const MetadataRow = ({index, payload}) => {
  console.log("stat row", payload);
  console.log("team id", payload.team_id);
  return (
    <>
      <TableRow key={index} sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell align="right">{index}</TableCell>
        <TableCell component="th" scope="row">{payload.team_id}</TableCell>
        <TableCell component="th" scope="row">{payload.player_num}</TableCell>
      </TableRow>
    </>
  );
}