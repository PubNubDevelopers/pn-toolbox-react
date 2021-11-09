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

// import PropTypes from 'prop-types';
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

// import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import PropTypes from 'prop-types';

// // core components
import { useKeySetData } from "../../KeySetProvider";
import { useObjectAdminData } from "../ObjectAdminProvider";
import { FirstPage, KeyboardArrowDown, KeyboardArrowRight, KeyboardArrowLeft, LastPage } from "@mui/icons-material";
import { Switch, FormControlLabel } from "@mui/material";

const ChannelMetadataList = () => {
  const keySetContext = useKeySetData();
  const objectAdminContext = useObjectAdminData();

  console.log("ChannelMetadataList keySetContext: ", keySetContext);
  console.log("ChannelMetadataList objectAdminContext: ", objectAdminContext);

  // table nav controls
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - objectAdminContext.channelMetadataResults.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // page state
  const [channelFilter, setChannelFilter] = useState(objectAdminContext.channelFilter);
  const [isTruncate, setIsTruncate] = useState(true);

  async function retrieveMetadata() {
    console.log("channelFilter", channelFilter);

    let more = true;
    let results = [];
    let next = null;

    do {
      try {
        const result = await keySetContext.pubnub.objects.getAllChannelMetadata({
          filter : channelFilter,
          include: {
            totalCount: true,
            customFields: true
          },
          page: {next: next}
        });

        if (result != null && result.data.length > 0) {
          results = results.concat(result.data);
          next = result.next;
          more = next != null & results.length < objectAdminContext.maxRows;
        }
        else {
          more = false;
        }
      } 
      catch (status) {
        console.log("  fail", JSON.stringify(status));
      }
    } while (more);

    objectAdminContext.setChannelMetadataResults(results);
  }

  return (
    <>
      <Container className="mt--7" fluid>
        <Row className="mt-0">
          <Col className="order-xl-2">
            <Card className="bg-secondary shadow"> 
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Enter Channel Filter</h3>
                  </div>
                  <div className="col text-right">
                  </div>
                </Row>
              </CardHeader>             
              <CardBody>
                <Form>
                    <Row>
                      <Col sm="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-channel-filter"
                          >
                            Channel Filter Expression
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-channel-filter"
                            placeholder="Input a filter expression"
                            type="textarea"
                            rows="4"
                            value={channelFilter}
                            onChange={(e) => setChannelFilter(e.target.value)}
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
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <Button 
                            className="form-control-alternative text-align-right"
                            color="danger"
                            onClick={retrieveMetadata}
                            disabled = {keySetContext.pubnub == null}
                          >
                            Get Metadata
                          </Button>
                        </Row>
                      </Col>
                    </Row>
                </Form>
              </CardBody>
              {/* <CardFooter>
                <Row>
                  <Col  sm="6" className="text-right">
                    <Button
                      color="danger"
                      onClick={retrieveMetadata}
                      disabled = {keySetContext.pubnub == null || channelFilter === ""}
                    >
                      Get Metadata
                    </Button>
                  </Col>
                </Row> 
              </CardFooter> */}
            </Card>
          </Col>
        </Row>
        <Row className="mt-0">
          <Col className="order-xl-2">
            <Card className="bg-secondary shadow"> 
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Channel Metadata Results</h3>
                  </div>
                  <div className="col text-right">
                  </div>
                </Row>
              </CardHeader>      

              <CardBody>
                <MetadataTable 
                  metadata={objectAdminContext.channelMetadataResults}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  emptyRows={emptyRows}
                  handleChangePage={handleChangePage}
                  handleChangeRowsPerPage={handleChangeRowsPerPage}
                  isTruncate={isTruncate}
                  setIsTruncate={setIsTruncate}
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

export default ChannelMetadataList;


const MetadataTable = ({metadata, rowsPerPage, page, emptyRows, handleChangePage, handleChangeRowsPerPage, isTruncate, setIsTruncate}) => {
  console.log("MetadataTable", metadata);

  if (metadata == null || metadata.length ===0) return <><h2>No Results</h2></>;

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer >
        <Table stickyHeader>

          <TableHead>
            <TableRow>
              <TableCell colSpan="4">
                {/* <TruncateSwitch isTruncate={isTruncate} setIsTruncate={setIsTruncate}/> */}
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
              <TableCell>Channel ID</TableCell>
              <TableCell>Channel Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Custom Field Data</TableCell>
              <TableCell>Last Updated</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {(rowsPerPage > 0
              ? metadata.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : metadata
            ).map((row) => (
              <MetadataRow key={row.id} row={row} isTruncate={isTruncate} />
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

const MetadataRow = ({row, isTruncate}) => {
  console.log("MetadataRow", row);

  // const {row} = props;
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

        {isTruncate && (
          <>
            <TableCell component="th" scope="row">{truncate(row.id.substring, 100)}</TableCell>
            <TableCell>{truncate(row.name, 100)}</TableCell>
            <TableCell>{truncate(row.description, 60)}</TableCell>
            <TableCell>{truncate(JSON.stringify(row.custom), 60)}</TableCell>
          </>
        )}
        {!isTruncate && (
          <>
            <TableCell component="th" scope="row">{row.id}</TableCell>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.description}</TableCell>
            <TableCell>{JSON.stringify(row.custom, null, 2)}</TableCell>
          </>
        )}
        <TableCell>{row.updated}</TableCell>
      </TableRow>

      <TableRow>
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