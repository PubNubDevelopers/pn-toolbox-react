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
  Table,
  CardFooter,
} from "reactstrap";

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

  // const saveChannelObject = () => {
  //   console.log("channelId", channelFilter);

  //   keySetContext.pubnub.objects.setChannelMetadata(
  //     {
  //       channel : objectAdminContext.channelId,
  //       data: {
  //           name: objectAdminContext.channelName,
  //           description: objectAdminContext.channelDesc,
  //           custom: JSON.parse(objectAdminContext.channelCustom)
  //       },
  //       include: {
  //           customFields: true
  //       }
  //     },
  //     function (status) {
  //       console.log(status);

  //       if (!status.error) {
  //         console.log("Success: ", status);
          
  //       }
  //       else {
  //         console.log("Error: ", status);
  //         alert(JSON.stringify(status, null, 4));
  //       }

  //       alert(JSON.stringify(status, null, 4));
  //     }
  //   );
  // }

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
                <div className="pl-lg-4">
                  {/* <Table className="align-items-center table-flush" responsive > */}
                  <Table className="align-items-center" responsive striped>
                    <thead className="thead-light">
                      <tr>
                        <th>Channel ID</th>
                        <th>Channel Name</th>
                        <th>Description</th>
                        <th>Custom</th>
                        <th>Last Updated</th>
                      </tr>
                    </thead>
                    <MetadataRows metadata={objectAdminContext.channelMetadataResults}/>
                  </Table>
                </div>
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

// {
//   "id": "my-channel",
//   "name": "My channel",
//   "description": "A channel that is mine",
//   "custom": null,
// }

function MetadataRows({metadata}) {
  console.log("MetadataRows", metadata);
  const rows = metadata.map((md, index) =>
    <tr key={index}>
      <th scope="row">{md.id}</th>
      <td>{md.name}</td>
      <td>{md.description}</td>
      <td>{JSON.stringify(md.custom, null, 2)}</td>
      <td>{md.updated}</td>
    </tr>
  );
  return (
    <tbody>
      {rows}
    </tbody>
  );
}
