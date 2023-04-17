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

import React, { useState, useRef, useEffect } from "react";

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
  UncontrolledTooltip,
  AccordionBody,
} from "reactstrap";

// // core components
import { useKeySetData } from "../../KeySetProvider";
import { useAuthAdminData } from "../AuthAdminProvider";
import { useStopwatch } from "react-timer-hook";
import { FirstPage, KeyboardArrowDown, KeyboardArrowRight, KeyboardArrowLeft, LastPage } from "@mui/icons-material";
import { Accordion, AccordionSummary, IconButton, InputLabel, MenuItem, Select } from "@material-ui/core";
import { Switch, FormControlLabel } from "@mui/material";
import { Pause } from "@mui/icons-material";
import ReactBSAlert from "react-bootstrap-sweetalert";

import Box from '@mui/material/Box';
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

import Papa from "papaparse";
import { format } from 'date-fns';

const UnauthDebug = () => {
  const keySetContext = useKeySetData();
  const authAdminContext = useAuthAdminData();

  console.log("UnauthDebug keySetContext: ", keySetContext);
  console.log("UnauthDebug authAdminContext: ", authAdminContext);

  const [successCount, setSuccessCount] = useState(0);
  const [failCount, setFailCount] = useState(0);
  const [progress, setProgress] = useState(0);
  const [estimatedTime, setEstimatedTime] = useState("");
  const isPause = useRef(false);

  const [sweetAlert, setSweetAlert] = useState(null);

  const FILE = 10;
  const [dataSource, setDataSource] = useState(FILE);
  const [sourceData, setSourceData] = useState([]);
  const [url, setUrl] = useState(decodeURIComponent(sampleSubUrl));

  const [recordCount, setRecordCount] = useState(50);
  const [requestDelay, setRequestDelay] = useState(10);
  const [reportData, setReportData] = useState();

  const errorData = useRef([]);
  
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    reset,
  } = useStopwatch({ autoStart: false });

  const handleStart = (e) => {
    e.preventDefault();
    isPause.current = false;
    start();
  }

  const handlePause = (e) => {
    e.preventDefault();
    isPause.current = true;
    pause();
  }

  useEffect(() => {
    var estMilli = recordCount * 150 + requestDelay * recordCount;
    setEstimatedTime(new Date(estMilli).toISOString().slice(11, 19));
  });

  const openFile = (file) => {
    // open CSV file and convert to JSON
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        console.log("Parsed JSON:", results.data);
        setSourceData(results.data);
        setRecordCount(results.data.length);
      },
      error: (error) => {
        console.error("Error while parsing CSV:", error);
      },
    });
  }

  const handleDataSourceSelect = (e) => {
    e.preventDefault();
    setDataSource(e.target.value);
    setUrl(sampleSubUrl);
  }

  const processLogs = async () => {
    console.log("processLogs");

    setSuccessCount(0);
    setFailCount(0);
    setProgress(0);
    let i = 0

    reset();
    start();
    isPause.current = false;

    processLogLine(i);
    console.log("before setReportData");
    console.log("    reportData", errorData.current);
    setReportData(errorData.current);
    console.log("after setReportData");
  }

  const processLogLine = async (i) => {
    console.log("processLogLine, index=", i);

    if (i < recordCount) {
      try {
        let data = {};
        const logLine = sourceData[i];
        console.log("logLine", logLine);

        // if subscribe logs - default
        const qp = JSON.parse(logLine.query_params);
        const auth = decodeURIComponent(qp.auth);
        data.userId = qp.uuid;

        const authToken = keySetContext.pubnub.parseToken(auth);
        
        data.reqTS = qp.tt.slice(0, -4);
        data.authTS = `${authToken.timestamp}000`;
        data.diffTime = data.reqTS - data.authTS;
        data.ttl = authToken.ttl;
        data.authUserId = authToken.authorized_uuid;

        data.expiredTTL = (data.diffTime > data.ttl);          
        data.badUserId = (data.userId !== data.authUserId);
        
        errorData.current.push(data);
        // setProgress((prevProgress) => (prevProgress + 1));
        // setSuccessCount((prevSuccessCount) => (prevSuccessCount + 1));
      }
      catch (status) {
        // setProgress((prevProgress) => (prevProgress + 1));
        // setFailCount((prevFailCount) => (prevFailCount + 1));
      }
      finally {
        console.log("    index", i);
        console.log("    isRunning", isRunning);
        console.log("    isPause", isPause.current);

        if (isPause.current) {
          // temporary hack to halt a long running process
          if (window.confirm("Process paused: \nOK to continue process \nCancel to abort process")) {
            isPause.current = false;
          }
          else {
            i = recordCount;
          // this will exit the processing loop
          }
        }

        processLogLine(++i);
      }
    }
    else {
      console.log("    the end");
      pause();
    }
  }


  const hideAlert = () => {
    setSweetAlert(null);
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
              <Accordion
                accordionId="accordion-debug-403"
                expanded
              >
                <AccordionSummary
                  // expandIcon={<KeyboardArrowUp />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <h3 className="mb-0">403 Debugger</h3>
                  <Col className="text-right">
                    <Button
                      color="danger"
                      onClick={processLogs}
                      disabled={keySetContext.pubnub == null || sourceData == null || sourceData == []}
                    >
                      Analyze Data
                    </Button>
                  </Col>
                </AccordionSummary>
                <AccordionBody style={{ background: "#f1f5f8" }}>
                  <CardBody>
                    <Form>
                      <Row>
                        <Col>
                          <FormGroup>
                            <InputLabel id="label-select-data-source"><u>Data Source</u></InputLabel>
                            <UncontrolledTooltip
                              delay={500}
                              placement="top"
                              target="label-select-data-source"
                            >
                              Provide a source for the data you want to process: from a log file or paste a URL.
                            </UncontrolledTooltip>
                            <Select
                              labelId="label-select-data-source"
                              id="label-select-data-source"
                              value={dataSource}
                              label="Data Source"
                              onChange={(e) => handleDataSourceSelect(e)}
                            >
                              <MenuItem value={0}>Sample Subscribe URL</MenuItem>
                              <MenuItem value={FILE}>Subscribe Log File</MenuItem>
                            </Select>
                          </FormGroup>
                          <FormGroup>
                            {dataSource === FILE &&
                              <>
                                <InputLabel
                                  id="label-message-file"
                                  className="form-control-label"
                                  htmlFor="button-open-file"
                                >
                                </InputLabel>
                                <UncontrolledTooltip
                                  delay={500}
                                  placement="top"
                                  target="label-message-file"
                                >
                                  Upload a file that contains an array of JSON message payloads.
                                </UncontrolledTooltip>
                                <Input
                                  id="button-open-file"
                                  type="file"
                                  onChange={(e) => openFile(e.target.files[0])}
                                />
                                <Input
                                  className="form-control-alternative"
                                  id="input-message-file-content"
                                  type="textarea"
                                  rows="10"
                                  disabled
                                  value={JSON.stringify(sourceData, null, 2)}
                                  onChange={(e) => setSourceData(e.target.value)}
                                />
                              </>
                            }
                          </FormGroup>
                          <FormGroup>
                            {dataSource >= 0 && dataSource < 10 &&
                              <>
                                <InputLabel
                                  id="label-message-entry"
                                  className="form-control-label"
                                  htmlFor="input-message-entry"
                                >
                                </InputLabel>
                                <UncontrolledTooltip
                                  delay={500}
                                  placement="top"
                                  target="label-message-entry"
                                >
                                  Provide a single JSON payload to debug.
                                </UncontrolledTooltip>
                                <Input
                                  className="form-control-alternative"
                                  id="input-message-entry"
                                  type="textarea"
                                  rows="10"
                                  value={url}
                                  // {JSON.stringify(messageSamples[messageStrategy], null, 2)}
                                  onChange={(e) => setUrl(e.target.value)}
                                // messageSamples[dataSource]
                                />
                              </>

                            }
                          </FormGroup>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </AccordionBody>
              </Accordion>
              <p />
              <CardHeader>
                <Row>
                  <div className="col">
                    <h3 className="mb-0">Error Report</h3>
                  </div>
                  <IconButton aria-label="pause" onClick={(e) => handlePause(e)}>
                    <Pause/>
                  </IconButton>
                </Row>
              </CardHeader>
              <CardBody>
                <ReportTable reportData={reportData}/>
              </CardBody>
              
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default UnauthDebug;

const dateDiffFormatter = (date2, date1) => {
  // Calculate the difference in milliseconds
  const diffMilliseconds = Math.abs(date2 - date1);

  // Convert milliseconds to days
  const diffDays = Math.floor(diffMilliseconds / (1000 * 60 * 60 * 24));
  const remainingMillisecondsAfterDays = diffMilliseconds % (1000 * 60 * 60 * 24);

  // Convert remaining milliseconds to hours
  const diffHours = Math.floor(remainingMillisecondsAfterDays / (1000 * 60 * 60));
  const remainingMillisecondsAfterHours = remainingMillisecondsAfterDays % (1000 * 60 * 60);

  // Convert remaining milliseconds to minutes
  const diffMinutes = Math.floor(remainingMillisecondsAfterHours / (1000 * 60));
  const remainingMillisecondsAfterMinutes = remainingMillisecondsAfterHours % (1000 * 60);

  // Convert remaining milliseconds to seconds
  const diffSeconds = Math.floor(remainingMillisecondsAfterMinutes / 1000);
  const remainingMillisecondsAfterSeconds = remainingMillisecondsAfterMinutes % 1000;

  console.log(`Difference: ${diffDays} days, ${diffHours} hours, ${diffMinutes} minutes, ${diffSeconds} seconds, and ${remainingMillisecondsAfterSeconds} milliseconds`);
  // Output: Difference: 2 days, 2 hours, 3 minutes, 45 seconds, and 123 milliseconds
  return (`${diffDays}d ${diffHours}h ${diffMinutes}m ${diffSeconds}s ${remainingMillisecondsAfterSeconds}ms`);
}


const sampleSubUrl = "tbd";

const ReportTable = ({reportData, rowsPerPage, page, emptyRows, handleChangePage, handleChangeRowsPerPage, isTruncate, setIsTruncate}) => {
  console.log("ReportTable", reportData);

  if (reportData == null || reportData.length === 0) return <><h2>No Results</h2></>;

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
                count={reportData.length}
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
              <TableCell/>
              {/* <TableCell align="right">#</TableCell> */}
              <TableCell>Request UserId</TableCell>
              <TableCell>Authorized UserId</TableCell>
              <TableCell>Request Timestamp</TableCell>
              <TableCell>Authorize Timestamp</TableCell>
              <TableCell>Diff Time</TableCell>
              <TableCell>TTL</TableCell>
              <TableCell>Wrong UserId?</TableCell>
              <TableCell>Expired TTL?</TableCell>
              {/* <TableCell align="center">Actions</TableCell> */}
            </TableRow>
          </TableHead>

          <TableBody>
            {(rowsPerPage > 0
              ? reportData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : reportData
            ).map((row, index) => (
              <ReportRow index={(index + (page * rowsPerPage))} row={row} isTruncate={isTruncate}/>
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
                colSpan={8}
                count={reportData.length}
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

const ReportRow = ({index, row, isTruncate}) => {
  console.log("ReportRow", index, row);
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowDown /> : <KeyboardArrowRight />}
          </IconButton>
        </TableCell>

        {/* <TableCell align="right">{index}</TableCell> */}

        {isTruncate && (
          <>
            <TableCell>{truncate(row.userId, 40)}</TableCell>
            <TableCell>{truncate(row.authUserId, 40)}</TableCell>
          </>
        )}
        {!isTruncate && (
          <>
            <TableCell>{row.userId}</TableCell>
            <TableCell>{row.authUserId}</TableCell>
          </>
        )}

        <TableCell>{format(new Date(Number(row.reqTS)), 'yyyy-MM-dd HH:mm:ss')}</TableCell>
        <TableCell>{format(new Date(Number(row.authTS)), 'yyyy-MM-dd HH:mm:ss')}</TableCell>
        <TableCell>{dateDiffFormatter(new Date(Number(row.reqTS)), new Date(Number(row.authTS)))}</TableCell>
        <TableCell>{row.ttl}</TableCell>
        <TableCell>{(row.badUserId).toString()}</TableCell>
        <TableCell>{(row.expiredTTL).toString()}</TableCell>
      </TableRow>

      {/* Expandable Detail Data */}
      {/* <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small">
                <TableBody>
                <TableRow>
                    <TableCell width="5%"></TableCell>
                    <TableCell><strong>Channel ID</strong></TableCell>
                    <TableCell width="95%">{row.id}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell width="5%"></TableCell>
                    <TableCell><strong>Channel Name</strong></TableCell>
                    <TableCell width="95%">{row.name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell width="5%"></TableCell>
                    <TableCell><strong>Description</strong></TableCell>
                    <TableCell width="95%">{row.description}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell width="5%"></TableCell>
                    <TableCell colSpan="2" component="th" width="5%"><strong>Custom Fields</strong></TableCell>
                  </TableRow>
                  {Object.keys(row.custom).map((key) => (
                    <TableRow>
                      <TableCell width="5%"></TableCell>
                      <TableCell>{key}</TableCell>
                      <TableCell width="95%" colSpan="2">{row.custom[key]}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow> */}
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
