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

import React, { useState } from "react";
import { useHistory } from "react-router-dom";

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
  CardFooter,
} from "reactstrap";

import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import PropTypes from 'prop-types';

// // core components
import { useKeySetData } from "../../KeySetProvider";
import { useSwissArmyData } from "../SwissArmyProvider"
import { DeleteForever, FirstPage, KeyboardArrowDown, KeyboardArrowRight, KeyboardArrowLeft, LastPage } from "@mui/icons-material";
import { Switch, FormControlLabel } from "@mui/material";
import ReactBSAlert from "react-bootstrap-sweetalert";
import { format, subMilliseconds, fromUnixTime } from 'date-fns'

const ChannelBrowser = () => {
  const keySetContext = useKeySetData();
  const swissArmyContext = useSwissArmyData();

  console.log("ChannelBrowser keySetContext: ", keySetContext);
  console.log("ChannelBrowser swissArmyContext: ", swissArmyContext);

  // table nav controls
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - swissArmyContext.channelMessageResults.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // page state
  const [channel, setChannel] = useState(swissArmyContext.channel);
  const [isTruncate, setIsTruncate] = useState(true);
  const [sweetAlert, setSweetAlert] = useState(null);
  const history = useHistory();

  async function retrieveMessages() {
    // console.log("channelFilter", channelFilter);

    let more = true;
    let results = [];
    let next = null;
    let totalRecords = 0;
    let startTT = null;

    const limit = swissArmyContext.maxRows < 1000 ? swissArmyContext.maxRows : 1000;

    confirmAlert("Retrieving Messages", "Retrieving messages, please wait...");

    do {
      try {
        const result = await keySetContext.pubnub.fetchMessages({
          channels: [channel],
          start: startTT,
          // count: limit,
          // start: ,
          // end: ,
          // incluldeMeta: true,
          // includeMessageActions: true
        });

        const resultCount = result.channels[channel].length;
        totalRecords += resultCount;
        
        if (result != null && totalRecords > 0) {
          results = result.channels[channel].concat(results);
          more = totalRecords < limit && resultCount == 100;
          next = totalRecords == 100;
          startTT = result.channels[channel][0].timetoken;
        }
        else more = false;
      } 
      catch (status) {
        hideAlert(); // hide the please wait dialog
        confirmAlert(status.message, 
          status.stack,
          "Dismiss", ()=>hideAlert()
        );

        // exit loop on error
        more = false;
      }
    } while (more);

    hideAlert(); // hide the "searching please wait" dialog
    
    totalRecords === 0 
      ? timerAlert("No Messages Found!", "Your filter found none messages.", 3)
      : timerAlert("Messages Found!", `${totalRecords} Messages Found.`, 2);
      swissArmyContext.setChannelMessageResults(results);
  }


  const handleRemove = (e, row, index) => {
    e.preventDefault();

    confirmAlert("Confirm Delete Message?", 
      `${index} - ${JSON.stringify(row.message, null, 2)}`,
      "Confirm", ()=> deleteMessage(row.timetoken, index), "Cancel", ()=>hideAlert()
    );
  }

  async function deleteMessage(tt, index) {
    try {
      const result = await keySetContext.pubnub.deleteMessages({
        channel: channel,
        start: ttMinus1(tt),
        end: tt,
      });

      console.log(result);
      timerAlert("Message Deleted!", `Row ${index} Deleted.`, 3);

      let temp = Array.from(swissArmyContext.channelMessageResults);
      temp.splice(index, 1);

      swissArmyContext.setChannelMessageResults(temp);
    }
    catch (status) {
      console.error(`Message Delete Failed: ${status}`);
      confirmAlert("Message Delete Failed!", status, "Dismiss", ()=>hideAlert());
    }
  }

  // code as per PN engineer
  const ttMinus1 = (tt, tail = '') => {
    if (!tt) {
      throw new Error('No timetoken provided');
    }
    if (Object.prototype.toString.call(tt) !== '[object String]') {
      throw new Error('Invalid timetoken');
    }
    if (tt.length === 0) {
      throw new Error('Timetoken was either 0 or empty');
    }
  
    tail = tt[tt.length - 1] + tail;
    tt = tt.substring(0, tt.length - 1);
  
    if (Number(tail) === 0) {
      return ttMinus1(tt, tail);
    } else {
      return tt + (Number(tail) - 1);
    }
  }

  const ttIncrement = (tt) => {
    const tt16 = parseInt(tt.substring(0,16));
    const ttnano = parseInt(tt.substring(16));

    if (ttnano == 9) {
      return (tt16 + 1) + "0"
    }
    else 
      return tt16 + "" + (ttnano + 1)
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
          showConfirm={confirmButton != null}
          confirmBtnBsStyle="danger"
          confirmBtnText={confirmButton}
          onCancel={cancelFn}
          showCancel={cancelButton != null}
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
                    <h3 className="mb-0">Channel Message Browser</h3>
                  </div>
                  <div className="col text-right">
                  </div>
                </Row>
              </CardHeader>             
              <CardBody>
                <Form onSubmit={(e) => e.preventDefault()}>
                    <Row>
                      <Col sm="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-channel"
                          >
                            Channel
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-channel"
                            placeholder="Enter a channel name"
                            type="textarea"
                            rows="4"
                            value={channel}
                            onChange={(e) => setChannel(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                      <Col sm="2">
                        <Row>
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-max-rows"
                            >
                              Max Rows
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-max-rows"
                              type="text"
                              value={swissArmyContext.maxRows}
                              max="5000"
                              min="5"
                              maxLength="5"
                              onChange={(e) => swissArmyContext.setMaxRows(e.target.value)}
                            />
                          </FormGroup>
                        </Row>
                        <Row>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <Button 
                            className="form-control-alternative text-align-right"
                            color="danger"
                            onClick={retrieveMessages}
                            disabled = {keySetContext.pubnub == null}
                          >
                            Retrieve Messages
                          </Button>
                        </Row>
                      </Col>
                    </Row>
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
                    <h3 className="mb-0">Message Results</h3>
                  </div>
                  <div className="col text-right">
                  </div>
                </Row>
              </CardHeader>      

              <CardBody>
                <MetadataTable 
                  metadata={swissArmyContext.channelMessageResults}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  emptyRows={emptyRows}
                  handleChangePage={handleChangePage}
                  handleChangeRowsPerPage={handleChangeRowsPerPage}
                  isTruncate={isTruncate}
                  setIsTruncate={setIsTruncate}
                  handleRemove={handleRemove}
                />
              </CardBody>

              <CardFooter>
                <Row>
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

export default ChannelBrowser;


const MetadataTable = ({metadata, rowsPerPage, page, emptyRows, handleChangePage, handleChangeRowsPerPage, isTruncate, setIsTruncate, handleRemove}) => {
  // console.log("MetadataTable", metadata);

  if (metadata == null || metadata.length ===0) return <><h2>No Results</h2></>;
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer >
        <Table stickyHeader>

          <TableHead>
            <TableRow>
              <TableCell colSpan="4">
                <FormControlLabel control={
                  <Switch defaultChecked 
                    value={isTruncate}
                    onChange={(e) => {setIsTruncate(e.target.checked)}}
                  />} 
                  label="Truncate Large Values?" 
                />
              </TableCell>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, 50, 100, { label: 'All', value: -1 }]}
                colSpan={6}
                count={metadata.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {'aria-label': 'rows per page',},
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
            <TableRow>
              {/* disable expand icon column: <TableCell/> */}
              <TableCell align="right">#</TableCell>
              <TableCell>Message</TableCell>
              <TableCell>UUID</TableCell>
              <TableCell>Publish TimeToken</TableCell>
              {/* <TableCell>DateTime</TableCell> */}
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              {/* <TableCell align="right">milli</TableCell>
              <TableCell align="right">micro.nano</TableCell> */}
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {(rowsPerPage > 0
              ? metadata.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : metadata
            ).map((row, index) => (
              <MetadataRow index={(index + (page * rowsPerPage))} row={row} isTruncate={isTruncate} 
                handleRemove={handleRemove} 
              />
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, 50, 100, { label: 'All', value: -1 }]}
                colSpan={7}
                count={metadata.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {'aria-label': 'rows per page',},
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Paper>
  );
}

const truncate = (data, size, noDots) => {
  let result = "";

  if (data == null || data === "" || data.length <= size) result = data
  else {
    result = data.substring(0, size) + (noDots ? "" : "...");
  }

  return result;
}


const MetadataRow = ({index, row, isTruncate, handleRemove}) => {
  console.log("MetadataRow", row);
  
  const [open, setOpen] = React.useState(false);

  const pubtt = row.timetoken;
  const datetime = format(fromUnixTime(pubtt.substring(0,10)), 'yyyy/dd/MM hh:mm:ss');
  const dateVal = datetime.substring(0, 10);
  const timeVal = datetime.substring(11) + "." + pubtt.substring(10, 13) + "." + pubtt.substring(13, 16) + "." + pubtt.substring(16);
  // const milli = pubtt.substring(10, 13);
  // const micronano = pubtt.substring(13, 16) + "." + pubtt.substring(16);

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        {/* disable expand until map/array error is fixed
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowDown /> : <KeyboardArrowRight />}
          </IconButton>
        </TableCell> */}

        <TableCell align="right">{index}</TableCell>
        {isTruncate && (
          <>
            <TableCell>{truncate(JSON.stringify(row.message), 40)}</TableCell>
          </>
        )}
        {!isTruncate && (
          <>
            <TableCell>{JSON.stringify(row.message, null, 2)}</TableCell>
          </>
        )}

        <TableCell>{row.uuid}</TableCell>
        <TableCell>{pubtt}</TableCell>
        {/* <TableCell>{datetime}</TableCell> */}
        <TableCell>{dateVal}</TableCell>
        <TableCell>{timeVal}</TableCell>
        {/* <TableCell align="right">{milli}</TableCell>
        <TableCell align="right">{micronano}</TableCell> */}

        <TableCell align="center">
          <IconButton aria-label="delete" size="small" onClick={(e) => handleRemove(e, row, index)}>
            <DeleteForever/>
          </IconButton>
        </TableCell>
      </TableRow>

      {/* Expandable Detail Data */}
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small">
                <TableBody>
                  {Object.keys(row.message).map((key) => (
                    <TableRow>
                      <TableCell> </TableCell>
                      <TableCell> </TableCell>
                      <TableCell width="5%"></TableCell>
                      <TableCell>{key}</TableCell>
                      <TableCell width="95%" colSpan="2">{row.message[key]}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPage /> : <FirstPage />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPage /> : <LastPage />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};
