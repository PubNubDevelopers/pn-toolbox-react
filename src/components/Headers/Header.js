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

// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import { useKeySetData } from "../../tools/KeySetProvider"


const Header = () => {
  const keySetContext = useKeySetData();
  console.log("HEADER: keySetContext: ", keySetContext);

  return (
    <>
      <div className="header bg-gradient-red pb-8 pt-5 pt-md-4">
        <Container fluid>
          <div className="header-body">
            <Row>
              <Col sm="10">
                <Card className="card-stats mb- mb-xl-0" >
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle tag="h4" className="text-uppercase text-muted mb-0">
                          Active Key Set
                        </CardTitle>
                        <span className="font-weight-bold mb-0">{keySetContext.keySetName}</span>
                      </div>
                    </Row>
                    <Row>
                      <Col sm="5">
                        <Row className="mt-1 mb-0 text-muted text-sm">
                          <Col sm="2">
                            <span className="text-nowrap"><strong>Sub Key:</strong> </span>
                          </Col>
                          <Col sm="8">{`${keySetContext.subKey}`}</Col>
                        </Row>
                        <Row className="mt-1 mb-0 text-muted text-sm">
                          <Col sm="2">
                            <span className="text-nowrap"><strong>UUID:</strong> </span>
                          </Col>
                          <Col sm="8">{`${keySetContext.uuid}`}</Col>
                        </Row>
                        <Row className="mt-1 mb-0 text-muted text-sm">
                          <Col sm="2">
                            <span className="text-nowrap"><strong>Status:</strong> </span>
                          </Col>
                          <Col sm="8">{`${keySetContext.status}`}</Col>
                        </Row>
                      </Col>
                      <Col sm="6">
                        <Row className="mt-1 mb-0 text-muted text-sm">
                          <Col sm="2">
                            <span className="text-nowrap"><strong>Pub Key:</strong> </span>
                          </Col>
                          <Col sm="8">{`${keySetContext.pubKey}`.substr(0,6)}</Col>
                        </Row>
                        <Row className="mt-1 mb-0 text-muted text-sm">
                          <Col sm="2">
                            <span className="text-nowrap"><strong>Secret Key:</strong> </span>
                          </Col>
                          <Col sm="8">{`${keySetContext.secKey}`.substr(0,6)}</Col>
                        </Row>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
