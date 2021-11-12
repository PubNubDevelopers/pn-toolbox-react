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

import { useState, useEffect } from "react";
// import classnames from "classnames";

import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

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
  // ButtonGroup,
  CardFooter,
} from "reactstrap";

// // core components
import { useKeySetData } from "../../KeySetProvider";
import { useObjectAdminData } from "../ObjectAdminProvider";

const ImportUsers = () => {
  const keySetContext = useKeySetData();
  const objectAdminContext = useObjectAdminData();

  console.log("ImportUsers keySetContext: ", keySetContext);
  console.log("ImportUsers objectAdminContext: ", objectAdminContext);

  const [recordCount, setRecordCount] = useState(0);
  const [metadataRecords, setMetadataRecords] = useState([]);
  const [importedCount, setImportedCount] = useState(0);
  const [failedCount, setFailedCount] = useState(0);

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 10 : prevProgress + 10));
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const openFile = (theFile) => {
    const propFileReader = new FileReader();

    propFileReader.onload = function(e) {
      const records = JSON.parse(e.target.result);
      setMetadataRecords(records);
      setRecordCount(records.length);
    };
    
    propFileReader.readAsText(theFile);
  }
  

  // const importMetadata = () => {
  async function importMetadata() {
    console.log("importMetadata");

    let percent = 0;

    for (let i = 0; i < recordCount; ++i) {
      const record = metadataRecords[i];
      
      let data = {};
      data.name = record.name;
      data.externalId = record.externalId;
      data.profileUrl = record.profileUrl;
      data.email = record.email;

      data.custom = {};

      for (const name in record) {
        if (name.substr(0, 2) === "c_") 
        {
          data.custom[name] = record[name.substr(2)];
        }
      } // for-in

      try {
        const result = await keySetContext.pubnub.objects.setUUIDMetadata({
          uuid: record.id,
          data: data
          // include : {customFields: true}
        });

        console.log(percent + "%");
        setProgress(() => (percent));
      } 
      catch (status) {
        console.log("  fail", JSON.stringify(status));
      }
    }
  }

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <LinearProgressWithLabel value={progress} />
      </Box>
      <Container className="mt--7" fluid>
        <Row className="mt-0">
          <Col className="order-xl-2">
            <Card className="bg-secondary shadow"> 
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Import Metadata</h3>
                  </div>
                  <div className="col text-right">
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
              <Row>
                <Col>
                  <div className="pl-lg-4">
                    <Row>
                      <Col>
                        <label
                          className="form-control-label"
                          htmlFor="button-open-file"
                        >
                          Metadata Records File
                        </label><br/>
                        <input 
                          id="button-open-file" 
                          type="file" 
                          onChange={(e) => openFile(e.target.files[0])}
                        />
                      </Col>
                    </Row>
                  </div>
                  <Form>
                    <div className="pl-lg-4">
                      <Row>
                        <Col>
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-record-count"
                            >
                              Target Record Count
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-record-count"
                              type="text"
                              value={recordCount}
                              onChange={(e) => setRecordCount(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                  </Form>
                  <div className="pl-lg-4">
                    <Row>
                      <Col>
                        <label
                          className="form-control-label"
                          htmlFor="input-imported-count"
                        >
                          Records Imported
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="input-imported-count"
                          type="text"
                          value={importedCount}
                          disabled
                        />
                      </Col>
                    </Row>
                  </div>
                  <div className="pl-lg-4">
                    <Row>
                      <Col>
                        <label
                          className="form-control-label"
                          htmlFor="input-failed-count"
                        >
                          Records Failed
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="input-failed-count"
                          type="text"
                          value={failedCount}
                          disabled
                        />
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
              </CardBody>
              <CardFooter>
                <Row>
                  <Col className="text-right">
                    <Button
                      color="danger"
                      onClick={importMetadata}
                      // disabled = {keySetContext.pubnub == null || metadataRecords == null || metadataRecords.length === 0}
                    >
                      Import Metadata
                    </Button>
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

export default ImportUsers;


LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}