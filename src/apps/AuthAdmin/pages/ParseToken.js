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
} from "reactstrap";

// core components
import { useKeySetData } from "../../../KeySetProvider";

const ParseToken = (props) => {
  const keySetContext = useKeySetData();
  console.log("PARSE TOKEN keySetContext: ", keySetContext);

  const [token, setToken] = useState();
  const [permissions, setPermissions] = useState();
  
  const [isInitialized, setIsInitialized] = useState(keySetContext.pubnub != null);

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const parseToken = () => {
    try {
      console.log("parseToken", token);
      const perms = JSON.stringify(keySetContext.pubnub.parseToken(token), null, 4);
      
      console.log("    permissions", perms);
      setPermissions((permsissions) => (perms));
    }
    catch (error) {
        console.log("    error", error);
        setPermissions("ERROR:\n" + error);
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

  return (
    <>
      {/* <AddChannelsModal
        // toggle={toggle}
        modal={modal}
        newChannels={newChannels}
        addChannels={addChannels}
      /> */}
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
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row className="mt-0">
          <Col className="order-xl-2">
            <Card className="bg-secondary shadow"> 
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Parse Auth v3 Token</h3>
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
                            htmlFor="input-token"
                          >
                            Auth Token
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-token"
                            placeholder="Input v3 auth token"
                            type="text"
                            onChange={(e) => setToken(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <Row>
                    <Col className="text-right">
                      <Button
                        color="primary"
                        onClick={parseToken}
                        disabled = {!isInitialized || token === ""}
                        // size="sm"
                      >
                        Parse Token
                      </Button>
                    </Col>
                  </Row> 
                </Form>
              </CardBody>
            </Card>
            <p />
            <Card className="bg-secondary shadow">              
              <CardHeader>
                <Row>
                  <div className="col">
                    <h3 className="mb-0">
                      Permissions
                    </h3>
                  </div>
                </Row>
                {/* <Row>
                  <div className="col">
                    <h3 className="mb-0">
                      Results for:
                    </h3>
                  </div>
                </Row>
                <Row>
                  <Col lg="2">
                  <div className="col">
                    <h4 className="mb-0">
                      &nbsp;&nbsp;&nbsp;&nbsp;Auth Token:
                    </h4>
                  </div>
                  </Col>
                  <Col>{resultsToken}</Col>
                </Row> */}
                {/* <p></p> */}
              </CardHeader>
              <CardBody>
              <Row>
                <Col sm="12">
                  <Card body>
                    <FormGroup>
                      {/* <Row>
                        <Col>
                          <label
                            className="form-control-label"
                            htmlFor="input-channel"
                          >
                            Permissions
                          </label>
                        </Col>
                      </Row> */}
                      <Input
                        className="form-control-alternative"
                        id="input-message"
                        type="textarea"
                        rows="25"
                        value={permissions}
                      />
                    </FormGroup>
                  </Card>
                </Col>
              </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ParseToken;