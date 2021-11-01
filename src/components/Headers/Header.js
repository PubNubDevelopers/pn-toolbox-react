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
import { useKeySetData } from "../../KeySetProvider"


const Header = (props) => {
  const keySetContext = useKeySetData();
  console.log("HEADER: keySetContext: ", keySetContext);

  return (
    <>
      <div className="header bg-gradient-red pb-8 pt-5 pt-md-4">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row>
              <Col lg="3" xl="4">
              {/* <Col lg="6" xl="3"> */}
                <Card className="card-stats mb- mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Active Key Set
                        </CardTitle>
                        {/* <span className="font-weight-bold mb-0">{props.keySetStatus.keySetName}</span> */}
                        <span className="font-weight-bold mb-0">{keySetContext.keySetName}</span>
                        
                      </div>
                    </Row>
                    <p className="mt-1 mb-0 text-muted text-sm">
                    <span className="text-nowrap">Sub Key: {`${keySetContext.subKey}`}</span>
                    </p>
                    <p className="mt-1 mb-0 text-muted text-sm">
                    <span className="text-nowrap">UUID: {`${keySetContext.uuid}`}</span>
                    </p>
                    <p className="mt-1 mb-0 text-muted text-sm">
                    <span className="text-nowrap">Status: {`${keySetContext.status}`}</span>
                    </p>
                    {/* <p className="mt-1 mb-0 text-muted text-sm">
                    <span className="text-nowrap">Sub Key: {`${props.keySetStatus.subKey}`}</span>
                    </p>
                    <p className="mt-1 mb-0 text-muted text-sm">
                    <span className="text-nowrap">UUID: {`${props.keySetStatus.uuid}`}</span>
                    </p>
                    <p className="mt-1 mb-0 text-muted text-sm">
                    <span className="text-nowrap">Status: {`${props.keySetStatus.status}`}</span>
                    </p> */}
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
