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
import classnames from "classnames";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  Input,
  Container,
  Row,
  Col,
  CardFooter,
  // DropdownToggle,
  // DropdownMenu,
  // DropdownItem,
  // UncontrolledDropdown,
  Table,
  Nav,
  NavLink,
  NavItem,
  TabContent,
  TabPane,
} from "reactstrap";

// core components
import { useKeySetData } from "./KeySetProvider";
import { MenuItem } from "@material-ui/core";
import { InputLabel, Select } from "@mui/material";

const KeySet = () => {
  const keySetContext = useKeySetData();
  console.log("KEYSET keySetContext: ", keySetContext);

  const [keySetName, setKeySetName] = useState(keySetContext.keySetName);
  const [subKey, setSubKey] = useState(keySetContext.subKey);
  const [pubKey, setPubKey] = useState(keySetContext.pubKey);
  const [secKey, setSecKey] = useState(keySetContext.secKey);
  const [uuid, setUuid] = useState(keySetContext.uuid);
  const [authToken, setAuthToken] = useState(keySetContext.authToken);
  const [showInitButton, setShowInitButton] = useState(true);

  // const [authKey, setAuthKey] = useState();
  const [tab, setTab] = useState(2);

  const toggleNavs = (e, state, index) => {
    e.preventDefault();
    setTab(index);
  };

  const openKeySetFile = (theFile) => {
    const propFileReader = new FileReader();

    propFileReader.onload = function(e) {
      keySetContext.setKeySetProps(JSON.parse(e.target.result));
    };
    
    propFileReader.readAsText(theFile);
  }

  const submitForm = () => {
    keySetContext.initKeySet({
      keySetName: keySetName,
      pubKey: pubKey,
      subKey: subKey,
      secKey: secKey,
      uuid: uuid,
      authKey: authToken,
    });

    notify("Key Set Initialized");
  }

  const keySetSelected = (index) => {
    console.log("keySetSelected: index: ", index);
    console.log("    keSetProps: ", keySetContext.keySetProps);

    if (index === -1) {
      // setShowInitButton(true);

      setKeySetName("Key Set Not Selected");
      setPubKey("");
      setSubKey("");
      setSecKey("");
      setUuid("");
      setAuthToken("");

      keySetContext.uninitKeySet();
    }
    else {
      // setShowInitButton(
      //   !keySetContext.isInitialized ||
      //   keySetContext.subKey === subKey
      // );

      const keySet = keySetContext.keySetProps.pn_keys[index];
      setKeySetName(keySet.name);
      setPubKey(keySet.pub_key);
      setSubKey(keySet.sub_key);
      setSecKey(keySet.secret_key);
      setUuid(keySet.uuid);
      setAuthToken(keySet.authToken);
    }
  }

  const notify = (title) => {
    toast.success(title, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
  
  return (
    <>
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
      <Container className="mt--7" fluid>
        <Row className="mt-0">
          <Col className="order-xl-2">
            <Card className="bg-secondary shadow"> 
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <Nav
                      className="nav-fill flex-column flex-md-row"
                      id="tabs-icons-text"
                      pills
                      role="tablist"
                    >
                      <NavItem>
                        <NavLink
                          aria-selected={tab === 2}
                          className={classnames("mb-sm-3 mb-md-0", {
                            active: tab === 2
                          })}
                          onClick={e => toggleNavs(e, "tabs", 2)}
                          role="tab"
                        >
                          <i className="ni ni-folder-17 mr-2" />
                          Enter Key Set
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          aria-selected={tab === 1}
                          className={classnames("mb-sm-3 mb-md-0", {
                            active: tab === 1
                          })}
                          onClick={e => toggleNavs(e, "tabs", 1)}
                          role="tab"
                        >
                          <i className="ni ni-settings-gear-65 mr-2" />
                          PN Dashboard Key Sets (DEMO ONLY)
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                <TabContent activeTab={"tabs" + tab}>
                  <TabPane tabId="tabs1">
                    <Row className="mt-0">
                      <Col className="mb-5 mb-xl-0" xl="12">
                        <Card className="shadow">
                          <CardHeader className="border-0">
                            <Row className="align-items-center">
                              <div className="col">
                                <h3 className="mb-0">Key Sets</h3>
                                <p>DEMO DISPLAY ONLY - FUTURE FEATURE</p>
                              </div>
                              <div className="col text-right">
                                <Button
                                  color="danger"
                                  onClick={(e) => e.preventDefault()}
                                  size="sm"
                                >
                                  Search
                                </Button>
                              </div>
                            </Row>
                          </CardHeader>
                          <CardBody>
                            <Table className="align-items-center table-flush" responsive>
                              <thead className="thead-light">
                                <tr>
                                  <th scope="col">App</th>
                                  <th scope="col">Key Set</th>
                                  <th scope="col">Sub Key</th>
                                  <th scope="col">Initialize</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <th scope="row">Date Night App</th>
                                  <td>Dev Env</td>
                                  <td>sub-c-fdslkj-afdsafsa</td>
                                  <td>
                                    <Button 
                                      color="danger"
                                      size="sm"
                                      onClick={(e) => e.preventDefault()}
                                    >
                                      Initialize
                                    </Button>
                                  </td>
                                </tr>
                                <tr>
                                <th scope="row">Date Night App</th>
                                  <td>Test Env</td>
                                  <td>sub-c-fddgk-cbbn</td>
                                  <td>
                                    <Button 
                                      color="danger"
                                      size="sm"
                                      onClick={(e) => e.preventDefault()}
                                    >
                                      Initialize
                                    </Button>
                                  </td>
                                </tr>
                                <tr>
                                <th scope="row">Date Night App</th>
                                  <td>Prod Env</td>
                                  <td>sub-c-f3x6y89lkj-af49f94sa</td>
                                  <td>
                                    <Button 
                                      color="danger"
                                      size="sm"
                                      onClick={(e) => e.preventDefault()}
                                    >
                                      Initialize
                                    </Button>
                                  </td>
                                </tr>
                                <tr>
                                  <th scope="row">Arena Live</th>
                                  <td>POC</td>
                                  <td>sub-c-4ffju9-dkeke9b-o824ht</td>
                                  <td>
                                    <Button 
                                      color="danger"
                                      size="sm"
                                      onClick={(e) => e.preventDefault()}
                                    >
                                      Initialize
                                    </Button>
                                  </td>
                                </tr>
                                <tr>
                                  <th scope="row">Excecutive Dashboard</th>
                                  <td>Beta</td>
                                  <td>sub-c-rgtdju9-dk46df9b-o824ht</td>
                                  <td>
                                    <Button 
                                      color="danger"
                                      size="sm"
                                      onClick={(e) => e.preventDefault()}
                                    >
                                      Initialize
                                    </Button>
                                  </td>
                                </tr>
                              </tbody>
                            </Table>
                          </CardBody>
                          <CardFooter>
                          </CardFooter>
                        </Card>
                      </Col>
                    </Row>
                  </TabPane>
                </TabContent>

                <TabContent activeTab={"tabs" + tab}>
                  <TabPane tabId="tabs2">
                    <Row className="mt-0">
                      <Col className="mb-5 mb-xl-0" xl="8">
                        <Card className="shadow">
                          <Form>
                            <CardHeader className="border-0">
                              <Row className="align-items-center">
                                <div className="col">
                                  <h3 className="mb-0">Initialize Key Set</h3>
                                </div>
                              </Row>
                            </CardHeader>
                            <CardBody>
                              <div className="pl-lg-4">
                                <Row>
                                  <Col>
                                    <KeySetSelector 
                                      keySets={keySetContext.keySetProps} 
                                      keySetSelected={keySetSelected}
                                      openKeySetFile={openKeySetFile}
                                      keySetName={keySetContext.keySetName}
                                    />
                                  </Col>
                                  { (!keySetContext.isInitialized || keySetContext.subKey !== subKey) 
                                  ? 
                                    <div className="col text-right">
                                      <Button
                                        color="danger"
                                        disabled={subKey === ""}
                                        onClick={submitForm}
                                      >
                                        Initialize
                                      </Button>
                                    </div>
                                  : 
                                    <div className="col text-right">
                                      <Button
                                        color="warning"
                                        // disabled={subKey === ""}
                                        onClick={keySetContext.uninitKeySet}
                                      >
                                        De-Initialize
                                      </Button>
                                    </div>
                                  }
                                </Row>
                                <Row>
                                  <Col>
                                    <FormGroup>
                                      <label
                                        className="form-control-label"
                                        htmlFor="input-pub-key"
                                      >
                                        Publish Key
                                      </label>
                                      <Input
                                        className="form-control-alternative"
                                        id="input-pub-key"
                                        placeholder="required for sending test messages only"
                                        type="text"
                                        name="pubKey"
                                        onChange={(e) => setPubKey(e.target.value)}
                                        value={pubKey}
                                      />
                                    </FormGroup>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col>
                                    <FormGroup>
                                      <label
                                        className="form-control-label"
                                        htmlFor="input-sub-key"
                                      >
                                        Subscribe Key *
                                      </label>
                                      <Input
                                        className="form-control-alternative"
                                        id="input-sub-key"
                                        placeholder="required"
                                        type="text"
                                        name="subKey"
                                        onChange={(e) => setSubKey(e.target.value)}
                                        value={subKey}
                                      />
                                    </FormGroup>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col>
                                    <FormGroup>
                                      <label
                                        className="form-control-label"
                                        htmlFor="input-sec-key"
                                      >
                                        Secret Key
                                      </label>
                                      <Input
                                        className="form-control-alternative"
                                        id="input-sec-key"
                                        placeholder="required for retrieving device tokens only"
                                        type="password"
                                        name="secKey"
                                        onChange={(e) => setSecKey(e.target.value)}
                                        value={pubKey}
                                      />
                                    </FormGroup>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col>
                                    <FormGroup>
                                      <label
                                        className="form-control-label"
                                        htmlFor="input-uuid"
                                      >
                                        UUID
                                      </label>
                                      <Input
                                        className="form-control-alternative"
                                        id="input-uuid"
                                        placeholder="leave empty to auto-generate value"
                                        type="text"
                                        name="uuid"
                                        onChange={(e) => setUuid(e.target.value)}
                                      />
                                    </FormGroup>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col>
                                    <FormGroup>
                                      <label
                                        className="form-control-label"
                                        htmlFor="input-auth-token"
                                      >
                                        Auth Token (Auth Key)
                                      </label>
                                      <Input
                                        className="form-control-alternative"
                                        id="input-auth-token"
                                        placeholder="Enter auth token/key if required"
                                        type="text"
                                        name="auth-token"
                                        onChange={(e) => setAuthToken(e.target.value)}
                                      />
                                    </FormGroup>
                                  </Col>
                                </Row>
                              </div>
                            </CardBody>

                          </Form>
                        </Card>
                      </Col>
                    </Row>
                  </TabPane>
                </TabContent>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default KeySet;


const KeySetSelector = (props) => {
  console.log("KeySetSelector: props: ", props);

  if (props.keySets == null || props.keySets.pn_keys == null || props.keySets.pn_keys.length === 0) {
    return (
      <>
        <label
          className="form-control-label"
          htmlFor="button-open-file"
        >
          Key Set Properties File
        </label><br/>
        <input 
          id="button-open-file" 
          type="file" 
          onChange={(e) => props.openKeySetFile(e.target.files[0])}
        />
        <p/>
      </>
    )
  }

  const options = props.keySets.pn_keys.map((item, index) =>
    <MenuItem key={index} value={index} onClick={() => props.keySetSelected(index)}>
      {item.name + ":  " + item.sub_key.substring(0,14)}
    </MenuItem>
  );

  return (
      <>
        <InputLabel htmlFor="select-key-set">Key Sets</InputLabel>
        <Select 
          variant="standard"
          defaultValue={-1} 
          id="select-key-set" 
          label="Key Sets" 
          autoWidth={true}
        >
          <MenuItem value={-1} onClick={() => props.keySetSelected(-1)}>
            Select a Key Set
          </MenuItem>
          {options}
        </Select>
        <p />
      </>
  );
}