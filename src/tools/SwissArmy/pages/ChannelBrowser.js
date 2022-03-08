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
import EditIcon from '@mui/icons-material/Edit';
import GroupIcon from '@mui/icons-material/Group';
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
debugger;
      swissArmyContext.setChannelMessageResults(results);
  }

  const handleEdit = (e, record, index) => {
    e.preventDefault();
    alert("Not Implemented");
    // swissArmyContext.setChannelId(record.id);
    // swissArmyContext.setChannelName(record.name);
    // swissArmyContext.setChannelDesc(record.description);
    // swissArmyContext.setChannelCustom(JSON.stringify(record.custom, null, 2));
    // swissArmyContext.setChannelUpdated(record.updated);
    // swissArmyContext.setChannelEtag(record.eTag);

    // history.push("/admin/objects/channel-form");
  }


  const handleRemove = (e, channel, index) => {
    e.preventDefault();
    alert("Not Implemented");

    // confirmAlert("Confirm Remove Channel?", 
    //   `${index} - ${channel}`,
    //   "Confirm", ()=>removeChannel(channel, index), "Cancel", ()=>hideAlert()
    // );
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
                    <h3 className="mb-0">Channels Search</h3>
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
                            Search Channels
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
                    <h3 className="mb-0">Channel Search Results</h3>
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
                  handleEdit={handleEdit}
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


const MetadataTable = ({metadata, rowsPerPage, page, emptyRows, handleChangePage, handleChangeRowsPerPage, isTruncate, setIsTruncate, handleRemove, handleEdit}) => {
  // console.log("MetadataTable", metadata);

  if (metadata == null || metadata.length ===0) return <><h2>No Results</h2></>;
debugger;
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
              <TableCell/>
              <TableCell align="right">#</TableCell>
              <TableCell>Channel</TableCell>
              <TableCell>Message</TableCell>
              <TableCell>Publish UUID</TableCell>
              <TableCell>Publish TimeToken</TableCell>
              <TableCell>Publish DateTime</TableCell>
              <TableCell align="right">milli</TableCell>
              <TableCell align="right">micro.nano</TableCell>
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
                handleEdit={handleEdit}
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
                colSpan={8}
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


const MetadataRow = ({index, row, isTruncate, handleRemove, handleEdit}) => {
  // console.log("MetadataRow", row);

  // const {row} = props;
  const [open, setOpen] = React.useState(false);

  const pubtt = row.timetoken;
  const datetime = format(fromUnixTime(pubtt.substr(0,10)), 'yyyy/dd/MM hh:mm:ss');
  const milli = pubtt.substr(10,3);
  const micronano = pubtt.substr(13,3) + "." + pubtt.substr(16);


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

        <TableCell align="right">{index}</TableCell>
        {isTruncate && (
          <>
            <TableCell>{truncate(row.channel, 40)}</TableCell>
            <TableCell>{truncate(JSON.stringify(row.message), 40)}</TableCell>
          </>
        )}
        {!isTruncate && (
          <>
            <TableCell>{row.channel}</TableCell>
            <TableCell>{JSON.stringify(row.message, null, 2)}</TableCell>
          </>
        )}

        <TableCell>{row.uuid}</TableCell>
        <TableCell>{pubtt}</TableCell>
        <TableCell>{datetime}</TableCell>
        <TableCell align="right">{milli}</TableCell>
        <TableCell align="right">{micronano}</TableCell>

        <TableCell align="center">
          <IconButton aria-label="edit" size="small" onClick={(e) => handleEdit(e, row, index)}>
            <EditIcon/>
          </IconButton>
          <IconButton aria-label="members" size="small" 
            // onClick={(e) => handleMembership(e, row.id, index)}
            >
            <GroupIcon/>
          </IconButton>
          <IconButton aria-label="delete" size="small" onClick={(e) => handleRemove(e, row.id, index)}>
            <DeleteForever/>
          </IconButton>
        </TableCell>
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
                    <TableCell><strong>Channel</strong></TableCell>
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


// const TruncateSwitch = ({isTruncate, setIsTruncate}) => {
  //   return(
  //     <>
  //     <label
  //       className="form-control-label"
  //       htmlFor="input-truncate"
  //     >
  //       Truncate Large Values?
  //     </label>
  //     <br/>
  //     <ButtonGroup 
  //       className="btn-group-toggle" 
  //       data-toggle="buttons"
  //     >
  //       <Button 
  //         className={classnames({ active: isTruncate })} 
  //         color="danger" 
  //         onClick={() => setIsTruncate(!isTruncate)}
  //       >
  //         <input
  //           autoComplete="off"
  //           name="options"
  //           type="radio"
  //           value={!isTruncate}
  //           size="small"
  //         />
  //         No
  //       </Button>
  //       <Button 
  //         className={classnames({ active: isTruncate })} 
  //         color="danger" 
  //         onClick={() => setIsTruncate(true)}
  //       >
  //         <input
  //           autoComplete="off"
  //           name="options"
  //           type="radio"
  //           value={isTruncate}
  //           size="small"
  //         />
  //         Yes
  //       </Button>
  //     </ButtonGroup>
  //     </>
  //   );
  // }