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

// import { useState } from "react";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Container,
  // FormGroup,
  Form,
  // Input,
  Row,
  Col,
} from "reactstrap";

// core components
import { useKeySetData } from "../../KeySetProvider"
import { useAuthAdminData } from "../AuthAdminProvider";

const PermTest = () => {
  const keySetContext = useKeySetData();
  const authAdminContext = useAuthAdminData();

  console.log("PermTest keySetContext: ", keySetContext);
  console.log("PermTest authAdminContext: ", authAdminContext);

  // const [keySetRead, setKeySetRead] = useState(authAdminContext.keySetRead);
  // const [keySetWrite, setKeySetWrite] = useState(authAdminContext.keySetWrite);

  // const [isReadCheck, setIsReadCheck] = useState(authAdminContext.isReadCheck);
  // const [isWriteCheck, setIsWriteCheck] = useState(authAdminContext.isWriteCheck);

  const checkKeySetPermissions = () => {
    console.log("checkKeySetPermissions");

    if (authAdminContext.isReadCheck()) testRead();
    if (authAdminContext.isWriteCheck()) testWrite();
  }

  const testRead = async () => {
    console.log("testRead");

    const channel = "__thetoolbox__";
    console.log("    target channel: ", channel);

    const url = `https://ps.pndsn.com/v2/subscribe/${keySetContext.subKey}/${channel}/0?tt=-1000&uuid=thetoolbox&pnsdk=the-toolbox-v0.2.0`;
    console.log("    signal url: ", url);

    try {
      const response = await fetch(url);
      console.log("response", response);

      if (response.status === 200) {
        authAdminContext.setKeySetRead("true");
      }
      else if (response.status === 403) {
        authAdminContext.setKeySetRead("false");
      }
    }
    catch (status) {
      console.log("an error occurred" + status);
    }
  }

  const testWrite = async () => {
    console.log("testWrite");

    const channel = "__thetoolbox__";
    console.log("    target channel: ", channel);

    const url = `https://ps.pndsn.com/signal/${keySetContext.pubKey}/${keySetContext.subKey}/0/${channel}/0/"write_test"?uuid=the-toolbox&pnsdk=the-toolbox-v0.2.0`;
    console.log("    signal url: ", url);

    try {
      const response = await fetch(url);
      console.log("response", response);

      if (response.status === 200) {
        authAdminContext.setKeySetWrite("true");
      }
      else if (response.status === 403) {
        authAdminContext.setKeySetWrite("false");
      }
    }
    catch (status) {
      console.log("an error occurred" + status);
    }
  }

  // const toastNotify = (type, title) => {
  //   const params = {
  //     position: "top-center",
  //     autoClose: 5000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //   };

  //   if (type === "success") toast.success(title, params);
  //   else if (type === "error") toast.error(title, params);
  //   else toast.info(title, params);
  // }

  return (
    <>
      {/* <AddChannelsModal
        // toggle={toggle}
        modal={modal}
        newChannels={newChannels}
        addChannels={addChannels}
      /> */}
      {/* <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />       */}

      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row className="mt-0">
          <Col className="order-xl-2">
            <Card className="bg-secondary shadow"> 
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Verify Permissions - Auth v2</h3>
                  </div>
                  <div className="col text-right">
                  </div>
                </Row>
              </CardHeader>             
              <CardBody>
                <h2>Key Set Permissions</h2>
                <Form>
                <Row>
                    <Col className="text-left">
                      <Button
                        color="primary"
                        onClick={testRead}
                        disabled = {keySetContext.pubnub == null}
                        size="sm"
                      >
                        Test Read
                      </Button>
                    </Col>
                    <Col className="text-left">
                      <label
                        className="form-control-label"
                        // htmlFor="input-channel"
                      >
                        {authAdminContext.keySetRead}
                      </label>
                    </Col>
                  </Row> 
                  <Row>
                    <Col className="text-left">
                      <Button
                        color="primary"
                        onClick={testWrite}
                        disabled = {keySetContext.pubnub == null}
                        size="sm"
                      >
                        Test Write
                      </Button>
                    </Col>
                    <Col className="text-left">
                      <label
                        className="form-control-label"
                        // htmlFor="input-channel"
                      >
                        {authAdminContext.keySetWrite}
                      </label>
                    </Col>
                  </Row> 
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PermTest;