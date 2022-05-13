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

const PnDashboard = () => {
    const keySetContext = useKeySetData();

    console.log("PnConfig keySetContext: ", keySetContext);

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

    const login = () => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        timerAlert("PN Dashboard Login", "Please wait while we authenticate...", 5000);

        let uri = `http://localhost:3000/login?username=${keySetContext.portalUsername}&password=${keySetContext.portalPassword}`;
        console.log(`uri: ${uri}`);

        fetch(uri, { signal: controller.signal }).then(res => res.json()).then(
            (result) => {
                console.log("result", result);

                keySetContext.setPortalToken(result.session.token);
                keySetContext.setPortalUserId(result.session.userid);
                keySetContext.setPortalAccountId(result.session.accountid);
                keySetContext.setPortalAccounts(result.accounts);

                clearTimeout(timeoutId);
                hideAlert();
            },
            (error) => {
                hideAlert();
                console.log("PN Dashboard Login error:", error);
                timerAlert("PN Dashboard Login error", error + " (VPN enabled?)", 5000);
            }
        ).catch = (error) => {
            hideAlert();
            console.log("login error:", error);
            timerAlert("fetch /login", error, 5000);
        };
    }

    const retrieveApps = async (e, record, index) => {
        console.log("retrieveApps");

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        timerAlert("Retrieving Apps", "Please wait while we retrieve the apps...", 5000);

        let uri = `/apps?ownerid=${record.id}&token=${keySetContext.portalToken}`;

        console.log(`fetch apps uri: ${uri}`);
        fetch(uri, { signal: controller.signal }).then(res => res.json()).then(
            (result) => {
                console.log("fetch apps result", result);

                keySetContext.setPortalApps(result);

                clearTimeout(timeoutId);
                hideAlert();
            },
            (error) => {
                hideAlert();
                console.log("retrieveApps error:", error);
                timerAlert("Error: retrieveApps", error, 5000);
            }
        ).catch = (error) => {
            hideAlert();
            console.log("fetch apps error:", error);
            timerAlert("fetch /apps", error, 5000);
        };
    }

    const retrieveKeys = async (e, record, index) => {
        console.log("retrieveKeys");

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        timerAlert("Retrieving Keys", "Please wait while we retrieve the keys...", 5000);

        let uri = `/keys?app_id=${record.id}&token=${keySetContext.portalToken}`;

        console.log(`fetch apps uri: ${uri}`);
        fetch(uri, { signal: controller.signal }).then(res => res.json()).then(
            (result) => {
                console.log("fetch keys result", result);

                keySetContext.setPortalKeys(result);

                clearTimeout(timeoutId);
                hideAlert();
            },
            (error) => {
                hideAlert();
                console.log("retrieveKeys error:", error);
                timerAlert("Error: retrieveKeys", error, 5000);
            }
        ).catch = (error) => {
            hideAlert();
            console.log("fetch /keys error:", error);
            timerAlert("fetch /keys", error, 5000);
        };
    }

    const initKeySet = (e, record, index) => {
        keySetContext.setKeySetName(record.properties.name);
        keySetContext.setPubKey(record.publish_key);
        keySetContext.setSubKey(record.subscribe_key);
        history.push("/admin/key-set");
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
                                        <h3 className="mb-0">PubNub Dashboard Login</h3>
                                    </div>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <Form>
                                    <Row>
                                        <Col sm="4">
                                            <FormGroup>
                                                <Row>
                                                    <Col>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-username"
                                                        >
                                                            Username (email)
                                                        </label>
                                                    </Col>
                                                </Row>
                                                <Input
                                                    className="form-control-alternative"
                                                    id="input-username"
                                                    placeholder="Enter PubNub Dashboard account email"
                                                    type="text"
                                                    value={keySetContext.portalUsername}
                                                    onChange={(e) => keySetContext.setPortalUsername(e.target.value)}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col sm="4">
                                            <FormGroup>
                                                <Row>
                                                    <Col>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-password"
                                                        >
                                                            Password
                                                        </label>
                                                    </Col>
                                                </Row>
                                                <Input
                                                    className="form-control-alternative"
                                                    id="input-password"
                                                    type="password"
                                                    value={keySetContext.portalPassword}
                                                    onChange={(e) => keySetContext.setPortalPassword(e.target.value)}
                                                />
                                            </FormGroup>
                                            <Row>
                                                <Col className="col text-right">
                                                    <Button
                                                        color="danger"
                                                        onClick={login}
                                                        size="sm"
                                                        disabled={keySetContext.portalUsername == null || keySetContext.portalUsername === "" 
                                                            || keySetContext.portalPassword == null || keySetContext.portalPassword === ""}
                                                    >
                                                        Login
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Form>
                            </CardBody>
                        </Card>

                        <Card className="shadow">
                            <CardHeader className="border-0">
                                <Row className="align-items-center">
                                    <div className="col">
                                        <h3 className="mb-0">Account Data</h3>
                                    </div>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <Table className="align-items-center table-flush" responsive>
                                    <thead className="thead-light">
                                        <tr>
                                            <th scope="col">Account ID</th>
                                            <th scope="col">User ID</th>
                                            <th scope="col">Shared Accounts</th>
                                        </tr>
                                        <tr>
                                            <td scope="col">{keySetContext.portalAccountId}</td>
                                            <td scope="col">{keySetContext.portalUserId}</td>
                                            {keySetContext.portalAccounts != null && keySetContext.portalAccounts != [] && (
                                                <td scope="col">{keySetContext.portalAccounts.length}</td>
                                            )}
                                        </tr>
                                    </thead>
                                </Table>
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
                                    data={keySetContext.portalAccounts}
                                    rowsPerPage={rowsPerPage0}
                                    page={page0}
                                    emptyRows={emptyRows0}
                                    handleChangePage={handleChangePage0}
                                    handleChangeRowsPerPage={handleChangeRowsPerPage0}
                                    retrieveApps={retrieveApps}
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

                <Row className="mt-0">
                    <Col className="order-xl-2">
                        <Card className="bg-secondary shadow">
                            <CardHeader className="border-0">
                                <Row className="align-items-center">
                                    <div className="col">
                                        <h3 className="mb-0">Apps</h3>
                                    </div>
                                    <div className="col text-right">
                                    </div>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <AppsTable
                                    data={keySetContext.portalApps}
                                    rowsPerPage={rowsPerPage1}
                                    page={page1}
                                    emptyRows={emptyRows1}
                                    handleChangePage={handleChangePage1}
                                    handleChangeRowsPerPage={handleChangeRowsPerPage1}
                                    retrieveKeys={retrieveKeys}
                                />
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
                                        <h3 className="mb-0">Key Sets</h3>
                                    </div>
                                    <div className="col text-right">
                                    </div>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <KeySetsTable
                                    data={keySetContext.portalKeys}
                                    rowsPerPage={rowsPerPage2}
                                    page={page2}
                                    emptyRows={emptyRows2}
                                    handleChangePage={handleChangePage2}
                                    handleChangeRowsPerPage={handleChangeRowsPerPage2}
                                    isTruncate={isTruncate}
                                    setIsTruncate={setIsTruncate}
                                    initKeySet={initKeySet}
                                />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default PnDashboard;

const AccountsTable = ({ data, rowsPerPage, page, emptyRows, handleChangePage, handleChangeRowsPerPage, retrieveApps }) => {
    // console.log("AccountsTable", data);

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
                            <TableCell>Account Email</TableCell>
                            <TableCell>Account ID</TableCell>
                            <TableCell>Company Name</TableCell>
                            <TableCell>Created</TableCell>
                            <TableCell>Modified</TableCell>
                            <TableCell align="center">Apps</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {(rowsPerPage > 0
                            ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : data
                        ).map((row, index) => (
                            <AccountRow index={(index + (page * rowsPerPage))} row={row} retrieveApps={retrieveApps} />
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

const AccountRow = ({ index, row, retrieveApps }) => {
    // console.log("AccountRow", row);

    return (
        <>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell align="right">{index}</TableCell>
                <>
                    <TableCell component="th" scope="row">{row.email}</TableCell>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.properties.company}</TableCell>
                    <TableCell>{row.created}</TableCell>
                    <TableCell>{row.modified}</TableCell>
                </>
                {/* )} */}

                <TableCell align="center">
                    <IconButton aria-label="edit" size="small" onClick={(e) => retrieveApps(e, row, index)}>
                        <GetApp />
                    </IconButton>
                </TableCell>
            </TableRow>
        </>
    );
}

const AppsTable = ({ data, rowsPerPage, page, emptyRows, handleChangePage, handleChangeRowsPerPage, retrieveKeys }) => {
    // console.log("AppsTable", data);

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
                            <TableCell>App Name</TableCell>
                            <TableCell>App ID</TableCell>
                            <TableCell>Active</TableCell>
                            <TableCell>Created</TableCell>
                            <TableCell>Modified</TableCell>
                            <TableCell align="center">Keys</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {(rowsPerPage > 0
                            ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : data
                        ).map((row, index) => (
                            <AppRow index={(index + (page * rowsPerPage))} row={row} retrieveKeys={retrieveKeys} />
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

const AppRow = ({ index, row, retrieveKeys }) => {
    // console.log("AccountRow", row);

    return (
        <>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell align="right">{index}</TableCell>
                <>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.status}</TableCell>
                    <TableCell>{row.created}</TableCell>
                    <TableCell>{row.modified}</TableCell>
                </>
                {/* )} */}

                <TableCell align="center">
                    <IconButton aria-label="edit" size="small" onClick={(e) => retrieveKeys(e, row, index)}>
                        <GetApp />
                    </IconButton>
                </TableCell>
            </TableRow>
        </>
    );
}


const KeySetsTable = ({ data, rowsPerPage, page, emptyRows, handleChangePage, handleChangeRowsPerPage, isTruncate, setIsTruncate, initKeySet }) => {
    // console.log("AppsTable", data);

    if (data == null || data.length === 0) return <><h2>No Results</h2></>;

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer >
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            {/* <TableCell colSpan="4">
                                <FormControlLabel control={
                                    <Switch defaultChecked
                                        value={isTruncate}
                                        onChange={(e) => { setIsTruncate(e.target.checked) }}
                                    />}
                                    label="Truncate Large Values?"
                                />
                            </TableCell> */}
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
                            <TableCell />
                            <TableCell align="right">#</TableCell>
                            <TableCell>Key Set Name</TableCell>
                            <TableCell>Key Set ID</TableCell>
                            <TableCell>Publish Key</TableCell>
                            <TableCell>Subscribe Key</TableCell>
                            <TableCell>Active</TableCell>
                            <TableCell>Created</TableCell>
                            <TableCell>Modified</TableCell>
                            <TableCell align="center">Initialize</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {(rowsPerPage > 0
                            ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : data
                        ).map((row, index) => (
                            <KeySetRow index={(index + (page * rowsPerPage))} row={row} 
                                isTruncate={isTruncate} initKeySet={initKeySet}
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

const KeySetRow = ({ index, row, isTruncate, initKeySet }) => {
    // console.log("AccountRow", row);
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
                {/* {isTruncate && (
                    <>
                        <TableCell>{truncate(row.id, 40)}</TableCell>
                        <TableCell>{truncate(row.name, 40)}</TableCell>
                        <TableCell>{truncate(row.description, 40)}</TableCell>
                        <TableCell>{truncate(JSON.stringify(row.custom), 40)}</TableCell>
                    </>
                )}
                {!isTruncate && ( */}
                <>
                    <TableCell>{row.properties.name}</TableCell>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.publish_key}</TableCell>
                    <TableCell>{row.subscribe_key}</TableCell>
                    <TableCell>{row.status}</TableCell>
                    <TableCell>{row.created}</TableCell>
                    <TableCell>{row.modified}</TableCell>
                </>
                {/* )} */}

                <TableCell align="center">
                    <IconButton aria-label="edit" size="small" onClick={(e) => initKeySet(e, row, index)}>
                        <Bolt />
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
                                    {Object.keys(row.properties).map((key) => (
                                        <TableRow>
                                            <TableCell width="5%"></TableCell>
                                            <TableCell>{key}</TableCell>
                                            <TableCell width="95%" colSpan="2">{row.properties[key]}</TableCell>
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

const truncate = (data, size, noDots) => {
    let result = "";

    if (data == null || data === "" || data.length <= size) result = data
    else {
        result = data.substring(0, size) + (noDots ? "" : "...");
    }

    return result;
}