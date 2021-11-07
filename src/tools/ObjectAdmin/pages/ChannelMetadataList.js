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
// import classnames from "classnames";

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
  // Table,
  CardFooter,
} from "reactstrap";

// import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
// import Typography from '@mui/material/Typography';
// import Paper from '@mui/material/Paper';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';


// // core components
import { useKeySetData } from "../../KeySetProvider";
import { useObjectAdminData } from "../ObjectAdminProvider";

const ChannelMetadataList = () => {
  const keySetContext = useKeySetData();
  const objectAdminContext = useObjectAdminData();

  console.log("ChannelMetadataList keySetContext: ", keySetContext);
  console.log("ChannelMetadataList objectAdminContext: ", objectAdminContext);

  const [channelFilter, setChannelFilter] = useState(objectAdminContext.channelFilter);
  // const [metadataResults, setMetadataResults] = useState(objectAdminContext.metadataResults || {});

  const retrieveMetadata = () => {
    console.log("channelFilter", channelFilter);

    keySetContext.pubnub.objects.getAllChannelMetadata(
      {
        filter : channelFilter,
        include: {
          totalCount: true,
          customFields: true
        },

      },
      function (status, result) {
        console.log(status, result);
        objectAdminContext.setChannelFilter(channelFilter);

        if (!status.error) {
          objectAdminContext.setChannelMetadataResults(result.data);
        }
        else {
          console.log("Error: ", status);
          alert(JSON.stringify(status, null, 4));
        }
      }
    );
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
                  <div className="pl-lg-4">
                    <Row>
                      <Col>
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
                            type="text"
                            value={channelFilter}
                            defaultValue='name LIKE "team.*"'
                            onChange={(e) => setChannelFilter(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="3" className="text-center">
              
                      </Col>
                    </Row>
                  </div>
                </Form>
              </CardBody>
              <CardFooter>
                <Row>
                  <Col className="text-right">
                    <Button
                      color="danger"
                      onClick={retrieveMetadata}
                      disabled = {keySetContext.pubnub == null || channelFilter === ""}
                    >
                      Get Metadata
                    </Button>
                  </Col>
                  <Col lg="3" className="text-center">
                    
                  </Col>
                </Row> 
              </CardFooter>
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
                  />
              </CardBody>
              <CardFooter>
                <Row>
                  <Col className="text-right">
                    {/* <Button
                      color="danger"
                      onClick={saveChannelObject}
                      disabled = {keySetContext.pubnub == null || channelFilter === ""}
                    >
                      Save Metadata
                    </Button> */}
                  </Col>
                  <Col lg="3" className="text-center">
                    
                  </Col>
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


const MetadataTable = ({metadata}) => {
  console.log("MetadataTable", metadata);

  if (metadata == null || metadata.length ===0) return <><h2>No Results</h2></>;

  return (
    // <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
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
          {metadata.map((row) => (
            <MetadataRow key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
    // </TableContainer>
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

const MetadataRow = ({row}) => {
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
        <TableCell component="th" scope="row">{row.id.substring(0, 100)}</TableCell>
        <TableCell>{truncate(row.name, 100)}</TableCell>
        <TableCell>{truncate(row.description, 60)}</TableCell>
        <TableCell>{truncate(JSON.stringify(row.custom), 60)}</TableCell>
        <TableCell>{row.updated}</TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small">
                <TableBody>
                  {Object.keys(row.custom).map((key) => (
                    <CustomFieldRow name={key} value={row.custom[key]} />
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

const CustomFieldRow = (props) => {
  console.log('CustomFieldRows', props);

  // assumption: flat custom field json data
  //   can compensate for nested json in future, if needed

  return (
    <TableRow>
      <TableCell width="5%"></TableCell>
      <TableCell>{props.name}</TableCell>
      <TableCell width="95%">{props.value}</TableCell>
    </TableRow>
  );
}
