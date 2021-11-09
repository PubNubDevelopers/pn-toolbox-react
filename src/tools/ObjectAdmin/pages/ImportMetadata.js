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

import { useState } from "react";
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
  // ButtonGroup,
  CardFooter,
} from "reactstrap";

// // core components
import { useKeySetData } from "../../KeySetProvider";
import { useObjectAdminData } from "../ObjectAdminProvider";

const ImportMetadata = () => {
  const keySetContext = useKeySetData();
  const objectAdminContext = useObjectAdminData();

  console.log("GenerateMetadata keySetContext: ", keySetContext);
  console.log("GenerateMetadata objectAdminContext: ", objectAdminContext);

  const [recordCount, setRecordCount] = useState(0);
  const [metadataRecords, setMetadataRecords] = useState([]);
  const [importedCount, setImportedCount] = useState(0);
  const [failedCount, setFailedCount] = useState(0);

  const openFile = (theFile) => {
    const propFileReader = new FileReader();

    propFileReader.onload = function(e) {
      const records = JSON.parse(e.target.result);
      setMetadataRecords(records);
      setRecordCount(records.length);
    };
    
    propFileReader.readAsText(theFile);
  }
  

  const importMetadata = () => {
    console.log("importMetadata");

    for (let i = 0; i < recordCount; ++i) {
      const record = metadataRecords[i];
      
      let data = {};
      data.name = record.channel_name;
      data.description = record.description;
      data.custom = {};

      for (const name in record) {
        const value = record[name];

        if (name !== "channel_id" && 
            name !== "channel_name" && 
            name !== "description") 
        {
          data.custom[name] = value;
        }
      } // for-in

      createMetadata(record.channel_id, data);
    } // for
  }

  async function createMetadata(channelId, data) {
    console.log("createMetadata", data);

    try {
      const result = await keySetContext.pubnub.objects.setChannelMetadata({
        channel: channelId,
        data: data, 
        include : {customFields: true},
      });

      console.log("  success");
      // setImportedCount(() => importedCount + 1);
    } 
    catch (status) {
      console.log("  fail", JSON.stringify(status));
      // setFailedCount(() => failedCount + 1);
    }
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

export default ImportMetadata;