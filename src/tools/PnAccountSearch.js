import React, { useState } from "react";
import { useHistory } from "react-router-dom";

// reactstrap components
import {
    Container,
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Form,
    FormGroup,
    Input,
    Row,
    Col,
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

import { FirstPage, KeyboardArrowDown, KeyboardArrowRight, KeyboardArrowLeft, LastPage, Bolt, GetApp } from "@mui/icons-material";
import ReactBSAlert from "react-bootstrap-sweetalert";


// core components
import { useKeySetData } from "./KeySetProvider";

const PnAccountSearch = () => {
    const keySetContext = useKeySetData();

    console.log("PnAccountSearch keySetContext: ", keySetContext);

    const [sweetAlert, setSweetAlert] = useState(null);

    // table nav controls
    const [page0, setPage0] = React.useState(0);
    const [page1, setPage1] = React.useState(0);
    const [page2, setPage2] = React.useState(0);
    const [rowsPerPage0, setRowsPerPage0] = React.useState(5);
    const [rowsPerPage1, setRowsPerPage1] = React.useState(5);
    const [rowsPerPage2, setRowsPerPage2] = React.useState(5);

    const [isTruncate, setIsTruncate] = useState(true);
    const history = useHistory();

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows0 = page0 > 0 ? Math.max(0, (1 + page0) * rowsPerPage0 - keySetContext.portalAccounts.length) : 0;
    const emptyRows1 = page1 > 0 ? Math.max(0, (1 + page1) * rowsPerPage1 - keySetContext.portalApps.length) : 0;
    const emptyRows2 = page2 > 0 ? Math.max(0, (1 + page2) * rowsPerPage2 - keySetContext.portalKeys.length) : 0;

    const handleChangePage0 = (event, newPage) => {
        setPage0(newPage);
    };

    const handleChangePage1 = (event, newPage) => {
        setPage1(newPage);
    };

    const handleChangePage2 = (event, newPage) => {
        setPage2(newPage);
    };

    const handleChangeRowsPerPage0 = (event) => {
        setRowsPerPage0(parseInt(event.target.value, 10));
        setPage0(0);
    };

    const handleChangeRowsPerPage1 = (event) => {
        setRowsPerPage1(parseInt(event.target.value, 10));
        setPage1(0);
    };

    const handleChangeRowsPerPage2 = (event) => {
        setRowsPerPage2(parseInt(event.target.value, 10));
        setPage2(0);
    };

    const search = () => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        timerAlert("Internal Admin Search", "Please wait while we search...", 5000);

        let uri = `/search?search=${keySetContext.searchBy}&token=${keySetContext.portalToken}`;
        console.log(`uri: ${uri}`);

        fetch(uri, { signal: controller.signal, 
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
                }
        }).then(res => res.json()).then(
            (result) => {
                console.log("search results", result);
                processResults(result);

                clearTimeout(timeoutId);
                hideAlert();
            },
            (error) => {
                hideAlert();
                console.log("Internal Admin Search error:", error);
                timerAlert("Internal Admin Search error", error + " (VPN enabled?)", 5000);
            }
        ).catch = (error) => {
            hideAlert();
            console.log("search error:", error);
            timerAlert("fetch /search", error, 5000);
        };
    }

    const processResults = (results) => {
        console.log("processResults", results);
        let data = [];

        if (results.keys != null && results.keys.length == 1) {
            let row = {};
            data.isKeys = true;
            row.email = results.users[0].email;
            row.userid = results.users[0].id;
            row.accountid = results.accounts[0].id;
            row.subkey = results.keys[0].subscribe_key;
            row.pubkey = results.keys[0].publish_key;
            row.seckey = results.keys[0].secret_key;
            row.paid = results.users[0].properties.is_paying_user ? "$" : null;
            row.name = results.users[0].properties.first + " " + results.users[0].properties.last;
            row.company = results.accounts[0].properties.company;
            row.created = results.keys[0].created;
            row.modified = results.keys[0].modified;
            data.push(row);
        }
        else {
            data.isKeys = false;
            for (let i=0; i < results.accounts.length; i++) {
                let row = {};
                row.email = results.users[i].email;
                row.userid = results.users[i].id;
                row.accountid = results.accounts[i].id;
                row.paid = results.users[i].properties.is_paying_user ? "$" : null;
                row.name = results.users[i].properties.first + " " + results.users[i].properties.last;
                row.company = results.accounts[i].properties.company;
                row.created = results.accounts[i].created;
                row.modified = results.accounts[i].modified;
                data.push(row);
            }

            keySetContext.setPortalAccounts(data.accounts);
        }

        keySetContext.setSearchResults(data);
    }

    const doAction = async (e, record, index, action) => {
        console.log(`in doAction: ${action}`, record);

        if (action == "init") {
            keySetContext.setPubKey(record.pubkey);
            keySetContext.setSubKey(record.subkey);
            keySetContext.setSecKey(record.seckey);
            history.push("/admin/key-set");
        }
        else { // load accounts
            const result = await retrieveAccounts(record.userid);
            history.push("/admin/pndashboard");
        }
    }

    const retrieveAccounts = async (userId) => {
        console.log("retrieveApps");

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        timerAlert("Retrieving Accounts", "Please wait while we retrieve the accounts...", 5000);

        let uri = `/accounts?user_id=${userId}&token=${keySetContext.portalToken}`;

        console.log(`fetch accounts uri: ${uri}`);
        fetch(uri, { signal: controller.signal }).then(res => res.json()).then(
            (result) => {
                console.log("fetch accounts result", result);
                keySetContext.setPortalUserId(userId);
                keySetContext.setPortalAccounts(result.accounts);
                keySetContext.setPortalApps([]);
                keySetContext.setPortalKeys([]);

                clearTimeout(timeoutId);
                hideAlert();
            },
            (error) => {
                hideAlert();
                console.log("retrieveAccounts error:", error);
                timerAlert("Error: retrieveAccounts", error, 5000);
            }
        ).catch = (error) => {
            hideAlert();
            console.log("fetch accounts error:", error);
            timerAlert("fetch /accounts", error, 5000);
        };
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
        setTimeout(function () { hideAlert() }, delay);
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
                                        <h3 className="mb-0">Internal Admin Search</h3>
                                    </div>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <Form>
                                    <Row>
                                        <Col sm="4">
                                            <FormGroup>
                                                <Input
                                                    className="form-control-alternative"
                                                    id="input-search"
                                                    placeholder="Sub-key, Company Name, Domain, Account Id, User Id, First/Last Name,"
                                                    type="text"
                                                    value={keySetContext.searchBy}
                                                    onChange={(e) => keySetContext.setSearchBy(e.target.value)}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col sm="4">
                                            <Row>
                                                <Col className="col text-right">
                                                    <Button
                                                        color="danger"
                                                        onClick={search}
                                                        size="sm"
                                                        disabled={keySetContext.searchBy == null || keySetContext.searchBy === ""}
                                                    >
                                                        Search
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Form>
                            </CardBody>
                        </Card>
                        <p />
                    </Col>
                </Row>

                <Row className="mt-0">
                    <Col className="order-xl-2">
                        <Card className="bg-secondary shadow">
                            <CardHeader className="border-0">
                                <Row className="align-items-center">
                                    <div className="col">
                                        <h3 className="mb-0">Accounts</h3>
                                    </div>
                                    <div className="col text-right">
                                    </div>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <AccountsTable
                                    data={keySetContext.searchResults}
                                    rowsPerPage={rowsPerPage0}
                                    page={page0}
                                    emptyRows={emptyRows0}
                                    handleChangePage={handleChangePage0}
                                    handleChangeRowsPerPage={handleChangeRowsPerPage0}
                                    doAction={doAction}
                                />
                            </CardBody>
                            {/* <CardFooter>
                                <Row>
                                    <Col lg="3" className="text-center"></Col>
                                </Row>
                            </CardFooter> */}
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default PnAccountSearch;

const AccountsTable = ({ data, rowsPerPage, page, emptyRows, handleChangePage, handleChangeRowsPerPage, doAction }) => {
    console.log("AccountsTable", data);

    if (data == null || data.length === 0) return <><h2>No Results</h2></>;

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer >
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, 50, 100, { label: 'All', value: -1 }]}
                                colSpan={6}
                                count={data.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                    inputProps: { 'aria-label': 'rows per page', },
                                    native: true,
                                }}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                        <TableRow>
                            <TableCell align="right">#</TableCell>
                            <TableCell>Email</TableCell>
                            {data.isKeys && (
                                <TableCell>Subscribe Key</TableCell>
                            )}
                            <TableCell align="center">Paid?</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Company</TableCell>
                            <TableCell>Created</TableCell>
                            <TableCell>Modified</TableCell>
                            {data.isKeys ? (
                                <TableCell>Init Key</TableCell>
                            ) : (
                                <TableCell>Get Keys</TableCell> 
                            )}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {(rowsPerPage > 0
                            ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : data
                        ).map((row, index) => (
                            <AccountRow key={index} index={(index + (page * rowsPerPage))} row={row} isKeys={data.isKeys} doAction={doAction} />
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
                                count={data.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                    inputProps: { 'aria-label': 'rows per page', },
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

const AccountRow = ({ key, index, row, isKeys, doAction }) => {
    console.log("AccountRow", isKeys, row);

    return (
        <>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell align="right">{index}</TableCell>
                <>
                    <TableCell component="th" scope="row">{row.email}</TableCell>
                    {isKeys && (
                        <TableCell>{row.subkey}</TableCell>
                    )}
                    <TableCell align="center">{row.paid}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.company}</TableCell>
                    <TableCell>{row.created}</TableCell>
                    <TableCell>{row.modified}</TableCell>
                </>
                <TableCell align="center">
                    <IconButton aria-label="edit" size="small" onClick={(e) => doAction(e, row, index, (isKeys ? "init" : "accounts"))}>
                        {isKeys ? (
                            <Bolt />
                        ) : (
                            <GetApp /> 
                        )}
                        
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

const truncate = (data, size, noDots) => {
    let result = "";

    if (data == null || data === "" || data.length <= size) result = data
    else {
        result = data.substring(0, size) + (noDots ? "" : "...");
    }

    return result;
}