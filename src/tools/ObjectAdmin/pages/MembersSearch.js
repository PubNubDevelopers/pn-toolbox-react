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
import { useObjectAdminData } from "../ObjectAdminProvider";
import { DeleteForever, FirstPage, KeyboardArrowDown, KeyboardArrowRight, KeyboardArrowLeft, LastPage } from "@mui/icons-material";
import { Switch, FormControlLabel } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
// import GroupIcon from '@mui/icons-material/Group';
import ReactBSAlert from "react-bootstrap-sweetalert";
import AddItemsDialog from "../../utils/AddItemsDialog";

const MembersSearch = () => {
  const keySetContext = useKeySetData();
  const objectAdminContext = useObjectAdminData();

  console.log("MembersSearch keySetContext: ", keySetContext);
  console.log("MembersSearch objectAdminContext: ", objectAdminContext);

  // table nav controls
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - objectAdminContext.channelMembersResults.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // page state
  const [channelId, setChannelId] = useState(objectAdminContext.channelId);
  const [memberFilter, setMemberFilter] = useState(objectAdminContext.memberFilter);
  
  const [isTruncate, setIsTruncate] = useState(true);
  const [sweetAlert, setSweetAlert] = useState(null);
  const history = useHistory();

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const newMembers = useRef([]);

  const addMembers = async (isConfirmed) => {
    console.log("addMembers: isConfirmed = ", isConfirmed);
    
    toggle(); // dismiss the modal
    if (!isConfirmed) return;
    
    if (newMembers.current == null || newMembers.current.length === 0) {
      toastNotify("info", "No New Channel Members provided.")
      return;
    }

    console.log("    new members", newMembers);

    try {
      const result = await keySetContext.pubnub.objects.setChannelMembers({
        channel: channelId,
        uuids: newMembers.current
      });

      // console.log("    result", result);
      retrieveMembers();
      // objectAdminContext.setChannelMembersResults(result.data);
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

  const retrieveMembers = async () => {
    console.log("retrieveMetadata", channelId, memberFilter);

    let more = true;
    let results = [];
    let next = null;
    let recordCount = 0;

    const limit = objectAdminContext.maxRows < 100 ? objectAdminContext.maxRows : 100;

    confirmAlert("Searching Channel Members", "Searching for Channel Members, please wait...");

    do {
      try {
        const result = await keySetContext.pubnub.objects.getChannelMembers({
          channel: channelId,
          filter : memberFilter, 
          include: {
            totalCount: true,
            customFields: true,            
            UUIDFields: true,
            customUUIDFields: true
          },
          page: {next: next}
        });

        if (result != null && result.data.length > 0) {
          recordCount += result.data.length;
          confirmAlert("Searching Members", `${recordCount} Members retrieved of ${objectAdminContext.maxRows}.`);
          more = result.data.length == limit && recordCount < objectAdminContext.maxRows;
          next = result.next;
        }
        else more = false;

        if (!more) objectAdminContext.setTotalMembers(result.totalCount);
      } 
      catch (status) {
        hideAlert(); // hide the please wait dialog
        confirmAlert(status.status.errorData.error.message, 
          status.status.errorData.error.details[0].message,
          "Dismiss", ()=>hideAlert()
        );

        // exit loop on error
        more = false;
      }
    } while (more);

    hideAlert(); // hide the "searching please wait" dialog
    
    recordCount === 0 
      ? timerAlert("No Members Found!", "Your filter found none Members.", 3)
      : timerAlert("Channel Members Found!", `${recordCount} Members Found.`, 2);

    console.log("    members found", results);
    objectAdminContext.setChannelMembersResults(results);
  }

  const handleEdit = (e, record, index) => {
    // objectAdminContext.setUserId(record.id);
    // objectAdminContext.setUserName(record.name);
    // objectAdminContext.setUserExternalId(record.externalId);
    // objectAdminContext.setUserProfileUrl(record.profileUrl);
    // objectAdminContext.setUserEmail(record.email);
    // objectAdminContext.setUserCustom(JSON.stringify(record.custom, null, 2));
    // objectAdminContext.setUserUpdated(record.updated);
    // objectAdminContext.setUserEtag(record.eTag);

    // history.push("/admin/objects/user-form");
  }


  const handleRemove = (e, userId, index) => {
    e.preventDefault();

    confirmAlert("Confirm Remove Member?", 
      `${index} - ${userId}`,
      "Confirm", ()=>removeUser(userId, index), "Cancel", ()=>hideAlert()
    );
  }

  const removeUser = async (userId, index) => {
    console.log("removeUser", userId);

    hideAlert();
    try {
      const result = await keySetContext.pubnub.objects.removeUUIDMetadata({
        channel: channelId,
        uuid : userId
      });
      timerAlert("Remove Success!", "User removed.", 2);
      
      let temp = Array.from(objectAdminContext.channelMembersResults);
      temp.splice(index, 1);

      objectAdminContext.setChannelMembersResults(temp);
    } 
    catch (status) {
      confirmAlert(status.status.errorData.error.message, 
        status.status.errorData.error.details[0].message,
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
        newItems={newMembers}
        addItems={addMembers}
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
                    <h3 className="mb-0">Enter Search Filter</h3>
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
                            htmlFor="input-channel-id"
                          >
                            Channel ID *
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-channel-id"
                            placeholder="Enter a channel ID"
                            type="text"
                            value={channelId}
                            onChange={(e) => setChannelId(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-member-filter"
                          >
                            Member Filter Expression
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-member-filter"
                            placeholder="Enter a filter expression"
                            type="textarea"
                            rows="4"
                            value={memberFilter}
                            onChange={(e) => setMemberFilter(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                      <Col sm="2">
                        <Row>
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-channel-filter"
                          >
                            Max Rows
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-max-rows"
                            type="text"
                            value={objectAdminContext.maxRows}
                            max="5000"
                            min="5"
                            maxLength="5"
                            onChange={(e) => objectAdminContext.setMaxRows(e.target.value)}
                          />
                        </FormGroup>
                        </Row>
                        <Row>
                          <Button 
                            className="form-control-alternative text-align-right"
                            color="danger"
                            onClick={retrieveMembers}
                            disabled = {keySetContext.pubnub == null || channelId == null}
                          >
                            Search Members
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
                  <Col>
                    <h3 className="mb-0">Channel Members Results</h3>
                    {(objectAdminContext.channelMetadataResults.length > 0) ? <h4>[{objectAdminContext.totalMembers} total members]</h4> : ""}
                  </Col>
                  <Col lg="2" className="text-center">
                    <Button
                      color="info"
                      onClick={toggle}
                      disabled = {keySetContext.pubnub == null || channelId === ""}
                    >
                      Add Members
                    </Button>
                  </Col>
                </Row>
                
              </CardHeader>      

              <CardBody>
                <MetadataTable 
                  metadata={objectAdminContext.channelMembersResults}
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

export default MembersSearch;


const MetadataTable = ({metadata, rowsPerPage, page, emptyRows, handleChangePage, handleChangeRowsPerPage, isTruncate, setIsTruncate, handleRemove, handleEdit}) => {
  console.log("MetadataTable", metadata);

  if (metadata == null || metadata.length ===0) return <>No Results</>;

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
              <TableCell>User ID</TableCell>
              <TableCell>User Name</TableCell>
              {/* <TableCell>Email</TableCell> */}
              <TableCell>Custom Membership Data</TableCell>
              <TableCell>Last Updated</TableCell>
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

        <TableCell align="right">{index}</TableCell>
        {isTruncate && (
          <>
            <TableCell>{truncate(row.uuid.id, 40)}</TableCell>
            <TableCell>{truncate(row.uuid.name, 40)}</TableCell>
            {/* <TableCell>{truncate(row.email, 40)}</TableCell> */}
            <TableCell>{truncate(JSON.stringify(row.custom), 40)}</TableCell>
          </>
        )}
        {!isTruncate && (
          <>
            <TableCell component="th" scope="row">{row.uuid.id}</TableCell>
            <TableCell>{row.uuid.name}</TableCell>
            {/* <TableCell>{row.email}</TableCell> */}
            <TableCell>{JSON.stringify(row.custom, null, 2)}</TableCell>
          </>
        )}

        <TableCell>{row.updated}</TableCell>

        <TableCell align="center">
          <IconButton aria-label="edit" size="small" onClick={(e) => handleEdit(e, row, index)}>
            <EditIcon/>
          </IconButton>
          {/* <IconButton aria-label="members" size="small" 
            // onClick={(e) => handleMembership(e, row.id, index)}
            >
            <GroupIcon/>
          </IconButton> */}
          <IconButton aria-label="delete" size="small" onClick={(e) => handleRemove(e, row.id, index)}>
            <DeleteForever/>
          </IconButton>
        </TableCell>
      </TableRow>

      {/* Expandable Detail Data */}
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small">
                <TableBody>
                <TableRow>
                    <TableCell width="5%"></TableCell>
                    <TableCell width="5%"></TableCell>
                    <TableCell width="5%"></TableCell>
                    <TableCell><strong>User ID</strong></TableCell>
                    <TableCell width="95%">{row.uuid.id}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell width="5%"></TableCell>
                    <TableCell width="5%"></TableCell>
                    <TableCell width="5%"></TableCell>
                    <TableCell><strong>User Name</strong></TableCell>
                    <TableCell width="95%">{row.uuid.name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell width="5%"></TableCell>
                    <TableCell width="5%"></TableCell>
                    <TableCell width="5%"></TableCell>
                    <TableCell><strong>Email</strong></TableCell>
                    <TableCell width="95%">{row.uuid.email}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell width="5%"></TableCell>
                    <TableCell width="5%"></TableCell>
                    <TableCell width="5%"></TableCell>
                    <TableCell><strong>External ID</strong></TableCell>
                    <TableCell width="95%">{row.uuid.externalId}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell width="5%"></TableCell>
                    <TableCell width="5%"></TableCell>
                    <TableCell width="5%"></TableCell>
                    <TableCell><strong>Profile URL</strong></TableCell>
                    <TableCell width="95%">{row.uuid.profileUrl}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell width="5%"></TableCell>
                    <TableCell width="5%"></TableCell>
                    <TableCell width="5%"></TableCell>
                    <TableCell colSpan="2" component="th" width="5%"><strong>Custom User Fields</strong></TableCell>
                  </TableRow>

                  {Object.keys(row.uuid.custom).map((key) => (
                    <TableRow>
                      <TableCell width="5%"></TableCell>
                      <TableCell width="5%"></TableCell>
                      <TableCell width="5%"></TableCell>
                      <TableCell>{key}</TableCell>
                      <TableCell width="95%" colSpan="2">{row.uuid.custom[key]}</TableCell>
                    </TableRow>
                  ))}

                  <TableRow>
                    <TableCell width="5%"></TableCell>
                    <TableCell width="5%"></TableCell>
                    <TableCell width="5%"></TableCell>
                    <TableCell colSpan="2" component="th" width="5%"><strong>Custom Membership Fields</strong></TableCell>
                  </TableRow>

                  {row.custom &&
                  Object.keys(row.custom).map((key) => (
                    <TableRow>
                      <TableCell width="5%"></TableCell>
                      <TableCell width="5%"></TableCell>
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
