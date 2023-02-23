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
import { useObjectAdminData } from "../ObjectAdminProvider";
import { DeleteForever, FirstPage, KeyboardArrowDown, KeyboardArrowRight, KeyboardArrowLeft, LastPage } from "@mui/icons-material";
import { Switch, FormControlLabel } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import GroupIcon from '@mui/icons-material/Group';
import ReactBSAlert from "react-bootstrap-sweetalert";

const UsersSearch = () => {
  const keySetContext = useKeySetData();
  const objectAdminContext = useObjectAdminData();

  console.log("UsersList keySetContext: ", keySetContext);
  console.log("UsersList objectAdminContext: ", objectAdminContext);

  // table nav controls
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - objectAdminContext.userMetadataResults.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // page state
  const [userFilter, setUserFilter] = useState(objectAdminContext.userFilter);
  const [isTruncate, setIsTruncate] = useState(true);
  const [sweetAlert, setSweetAlert] = useState(null);
  const history = useHistory();

  const retrieveUser = async () => {
    console.log("userFilter", userFilter);

    let more = true;
    let results = [];
    let next = null;
    let recordCount = 0;

    const limit = objectAdminContext.maxRows < 100 ? objectAdminContext.maxRows : 100;

    confirmAlert("Searching Users", "Searching for Users, please wait...");

    do {
      try {
        const result = await keySetContext.pubnub.objects.getAllUUIDMetadata({
          filter : userFilter, 
          limit: limit,
          include: {
            totalCount: true,
            customFields: true
          },
          page: {next: next}
        });
        
        if (result != null && result.data.length > 0) {
          confirmAlert("Searching Users", `${recordCount} Users retrieved of ${objectAdminContext.maxRows}.`);
          recordCount += result.data.length;
          results = results.concat(result.data);
          more = result.data.length == limit && recordCount < objectAdminContext.maxRows;
          next = result.next;
        }
        else more = false;

        if (!more) objectAdminContext.setTotalUsers(result.totalCount);
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
      ? timerAlert("No Users Found!", "Your filter found none Users.", 3)
      : timerAlert("Users Found!", `${recordCount} Users Found.`, 2);

    objectAdminContext.setUserMetadataResults(results);
  }

  const handleEdit = (e, record, index) => {
    objectAdminContext.setUserId(record.id);
    objectAdminContext.setUserName(record.name);
    objectAdminContext.setUserExternalId(record.externalId);
    objectAdminContext.setUserProfileUrl(record.profileUrl);
    objectAdminContext.setUserEmail(record.email);
    objectAdminContext.setUserCustom(JSON.stringify(record.custom, null, 2));
    objectAdminContext.setUserUpdated(record.updated);
    objectAdminContext.setUserEtag(record.eTag);

    history.push("/admin/objects/user-form");
  }


  const handleRemove = (e, userId, index) => {
    e.preventDefault();

    confirmAlert("Confirm Remove User?", 
      `${index} - ${userId}`,
      "Confirm", ()=>removeUser(userId, index), "Cancel", ()=>hideAlert()
    );
  }

  async function removeUser(userId, index) {
    // console.log("removeUser", userId);
    hideAlert();
    try {
      const result = await keySetContext.pubnub.objects.removeUUIDMetadata({uuid : userId});
      timerAlert("Remove Success!", "User removed.", 2);
      
      let temp = Array.from(objectAdminContext.userMetadataResults);
      temp.splice(index, 1);

      objectAdminContext.setUserMetadataResults(temp);
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
      <Container className="mt--7" fluid>
        <Row className="mt-0">
          <Col className="order-xl-2">
            <Card className="bg-secondary shadow"> 
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Users Search</h3>
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
                            htmlFor="input-user-filter"
                          >
                            User Filter Expression
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-user-filter"
                            placeholder="Enter a filter expression"
                            type="textarea"
                            rows="4"
                            value={userFilter}
                            onChange={(e) => setUserFilter(e.target.value)}
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
                              value={objectAdminContext.maxRows}
                              max="5000"
                              min="5"
                              maxLength="5"
                              onChange={(e) => objectAdminContext.setMaxRows(e.target.value)}
                            />
                          </FormGroup>
                        </Row>
                        <Row>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <Button 
                            className="form-control-alternative text-align-right"
                            color="danger"
                            onClick={retrieveUser}
                            disabled = {keySetContext.pubnub == null}
                          >
                            Search Users
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
                    <h3 className="mb-0">User Search Results</h3>
                    {(objectAdminContext.channelMetadataResults.length > 0) ? <h4>[{objectAdminContext.totalUsers} total users]</h4> : ""}
                  </div>
                  <div className="col text-right">
                  </div>
                </Row>
              </CardHeader>      

              <CardBody>
                <MetadataTable 
                  metadata={objectAdminContext.userMetadataResults}
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

export default UsersSearch;


const MetadataTable = ({metadata, rowsPerPage, page, emptyRows, handleChangePage, handleChangeRowsPerPage, isTruncate, setIsTruncate, handleRemove, handleEdit}) => {
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
              <TableCell/>
              <TableCell align="right">#</TableCell>
              <TableCell>User ID</TableCell>
              <TableCell>User Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Custom Field Data</TableCell>
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
            <TableCell>{truncate(row.id, 40)}</TableCell>
            <TableCell>{truncate(row.name, 40)}</TableCell>
            <TableCell>{truncate(row.email, 40)}</TableCell>
            <TableCell>{truncate(JSON.stringify(row.custom), 40)}</TableCell>
          </>
        )}
        {!isTruncate && (
          <>
            <TableCell component="th" scope="row">{row.id}</TableCell>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.email}</TableCell>
            <TableCell>{JSON.stringify(row.custom, null, 2)}</TableCell>
          </>
        )}

        <TableCell>{row.updated}</TableCell>

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
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small">
                <TableBody>
                <TableRow>
                    <TableCell width="5%"></TableCell>
                    <TableCell><strong>User ID</strong></TableCell>
                    <TableCell width="95%">{row.id}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell width="5%"></TableCell>
                    <TableCell><strong>User Name</strong></TableCell>
                    <TableCell width="95%">{row.name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell width="5%"></TableCell>
                    <TableCell><strong>Email</strong></TableCell>
                    <TableCell width="95%">{row.email}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell width="5%"></TableCell>
                    <TableCell><strong>External ID</strong></TableCell>
                    <TableCell width="95%">{row.externalId}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell width="5%"></TableCell>
                    <TableCell><strong>Profile URL</strong></TableCell>
                    <TableCell width="95%">{row.profileUrl}</TableCell>
                  </TableRow>
                  {/* <TableRow>
                    <TableCell width="5%"></TableCell>
                    <TableCell colSpan="2" component="th" width="5%"><strong>Custom Fields</strong></TableCell>
                  </TableRow>
                  {Object.keys(row.custom).map((key) => (
                    <TableRow>
                      <TableCell width="5%"></TableCell>
                      <TableCell>{key}</TableCell>
                      <TableCell width="95%" colSpan="2">{row.custom[key]}</TableCell>
                    </TableRow>
                  ))} */}
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
