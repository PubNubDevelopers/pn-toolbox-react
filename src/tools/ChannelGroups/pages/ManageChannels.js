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

import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
import { useChannelGroupData } from "../ChannelGroupProvider";
import { DeleteForever, FirstPage, KeyboardArrowRight, KeyboardArrowLeft, LastPage } from "@mui/icons-material";
// import GroupIcon from '@mui/icons-material/Group';
import ReactBSAlert from "react-bootstrap-sweetalert";
import AddItemsDialog from "../../utils/AddItemsDialog";

const ManageChannels = () => {
  const keySetContext = useKeySetData();
  const channelGroupContext = useChannelGroupData();

  console.log("ManageChannels keySetContext: ", keySetContext);
  console.log("ManageChannels channelGroupContext: ", channelGroupContext);

  // table nav controls
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - channelGroupContext.channelGroupResults.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // page state
  const [channelGroup, setChannelGroup] = useState(channelGroupContext.channelGroup);
  
  const [sweetAlert, setSweetAlert] = useState(null);
  const history = useHistory();

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const newChannels = useRef([]);

  const addChannels = async (isConfirmed) => {
    console.log("addChannels: isConfirmed = ", isConfirmed);
    
    toggle(); // dismiss the modal
    if (!isConfirmed) return;
    
    if (newChannels.current == null || newChannels.current.length === 0) {
      toastNotify("info", "No New Channels provided.")
      return;
    }

    console.log("    new channels", newChannels);

    try {
      const result = await keySetContext.pubnub.channelGroups.addChannels({
        channels: newChannels.current,
        channelGroup: channelGroup
      });

      // console.log("    result", result);
      retrieveChannels();
      // channelGroupsProvider.setChannelGroupResults(result.data);
    } 
    catch (status) {
      console.log("operation failed w/ error:", status);
    }
  }

  const toastNotify = (type, title) => {
    const params = {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    };

    if (type === "success") toast.success(title, params);
    else if (type === "error") toast.error(title, params);
    else toast.info(title, params);
  }

  const retrieveChannels = async (e) => {
    console.log("retrieveChannels", channelGroup);
    e.preventDefault();

    let results = [];
    confirmAlert("Retrieving Channels", "Retrieving Channels for ChannelGroup, please wait...");

    try {
      const result = await keySetContext.pubnub.channelGroups.listChannels({
        channelGroup: channelGroup
      });

      const totalRecords = (result == null || result.channels == null) ? 0 : result.channels.length;
      hideAlert(); // hide the "searching please wait" dialog
    
      totalRecords === 0 
        ? timerAlert("No Channels Found!", "Channel Group had none Channels.", 3)
        : timerAlert("Channels Found!", `${totalRecords} Channels Found.`, 2);
  
      console.log("    channels found", result.channels);
      channelGroupContext.setChannelGroupResults(result.channels);  
    } 
    catch (status) {
      hideAlert(); // hide the please wait dialog
      confirmAlert("List Channels Error", 
      JSON.stringify(status),
        "Dismiss", ()=>hideAlert()
      );
    }
  }

  const handleRemove = (e, channel, index) => {
    e.preventDefault();

    confirmAlert("Confirm Remove Channel?", 
      `${index} - ${channel}`,
      "Confirm", ()=>removeChannel(channel, index), "Cancel", ()=>hideAlert()
    );
  }

  const removeChannel = async (channel, index) => {
    console.log("removeUser", channel);
    hideAlert();

    try {
      const result = await keySetContext.pubnub.channelGroups.removeChannels({
        channels: [channel],
        channelGroup : channelGroup
      });
      timerAlert("Remove Success!", "Channel removed.", 2);
      
      let temp = Array.from(channelGroupContext.channelGroupResults);
      temp.splice(index, 1);

      channelGroupContext.setChannelGroupResults(temp);
    } 
    catch (status) {
      confirmAlert("Error Removing Channel", 
        JSON.stringify(status),
        "Dismiss", ()=>hideAlert()
      );
    }
  }

  const handleDelete = (e) => {
    e.preventDefault();

    confirmAlert("Confirm Delete Channel Group?", 
      `This action cannot be undone: ${channelGroup}`,
      "Confirm", ()=>deleteChannelGroup(), "Cancel", ()=>hideAlert()
    );
  }

  const deleteChannelGroup = async () => {
    console.log("removeUser", channelGroup);

    hideAlert();
    
    try {
      const result = await keySetContext.pubnub.channelGroups.deleteGroup({
        channelGroup : channelGroup
      });
      timerAlert("Delete Success!", "Channel Group deleted.", 2);
      channelGroupContext.setChannelGroupResults([]);
    } 
    catch (status) {
      confirmAlert("Error Deleting Channel Group", 
        JSON.stringify(status),
        "Dismiss", ()=>hideAlert()
      );
    }
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
      <AddItemsDialog
        // toggle={toggle}
        modal={modal}
        newItems={newChannels}
        addItems={addChannels}
      />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Container className="mt--7" fluid>
        <Row className="mt-0">
          <Col className="order-xl-2">
            <Card className="bg-secondary shadow"> 
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Channel Group Admin</h3>
                  </div>
                  <div className="col text-right">
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                <Form onSubmit={(e) => retrieveChannels(e)}>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Row>
                          <label
                            className="form-control-label"
                            htmlFor="input-channel-id"
                          >
                            Channel Group *
                          </label>
                        </Row>
                        <Row>
                          <Input
                            className="form-control-alternative"
                            id="input-channel-id"
                            placeholder="Enter a channel group"
                            type="text"
                            value={channelGroup}
                            onChange={(e) => setChannelGroup(e.target.value)}
                          />
                        </Row>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="8" className="text-right">
                      <Button 
                        className="form-control-alternative"
                        color="danger"
                        onClick={(e) => retrieveChannels(e)}
                        disabled = {keySetContext.pubnub == null || channelGroup == null}
                      >
                        Retrieve Channels
                      </Button>
                    </Col>
                    <Col className="text-right">
                      <Button 
                        className="form-control-alternative"
                        color="warning"
                        onClick={(e) => handleDelete(e)}
                        disabled = {keySetContext.pubnub == null || channelGroup == null}
                      >
                        Delete Channel Group
                      </Button>
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
                  <Col>
                    <h3 className="mb-0">Channel Group Results</h3>
                  </Col>
                  <Col lg="2" className="text-center">
                    <Button
                      color="danger"
                      onClick={toggle}
                      disabled = {keySetContext.pubnub == null || channelGroup === ""}
                    >
                      Add Channels
                    </Button>
                  </Col>
                </Row>
                
              </CardHeader>      

              <CardBody>
                <MetadataTable 
                  metadata={channelGroupContext.channelGroupResults}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  emptyRows={emptyRows}
                  handleChangePage={handleChangePage}
                  handleChangeRowsPerPage={handleChangeRowsPerPage}
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

export default ManageChannels;


const MetadataTable = ({metadata, rowsPerPage, page, emptyRows, handleChangePage, handleChangeRowsPerPage, isTruncate, handleRemove}) => {
  console.log("Channels", metadata);

  if (metadata == null || metadata.length ===0) return <>No Results</>;

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
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
              <TableCell align="right">#</TableCell>
              <TableCell width="100%">Channel Name</TableCell>
              <TableCell align="right">Remove</TableCell>
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
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
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
          </TableFooter>
        </Table>
      </TableContainer>
    </Paper>
  );
}

const MetadataRow = ({index, row, handleRemove}) => {
  return (
    <>
      <TableRow key={index} sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell align="right">{index}</TableCell>
        <TableCell component="th" scope="row">{row}</TableCell>
        <TableCell align="right">
          <IconButton aria-label="delete" size="small" onClick={(e) => handleRemove(e, row, index)}>
            <DeleteForever/>
          </IconButton>
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
