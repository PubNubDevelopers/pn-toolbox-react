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

// // reactstrap components
// import {
//   Button,
//   Card,
//   CardHeader,
//   CardBody,
//   Container,
//   FormGroup,
//   Form,
//   Input,
//   Table,
//   Row,
//   Col,
//   ButtonGroup,
//   Modal, 
//   ModalHeader, 
//   ModalBody, 
//   ModalFooter,
// } from "reactstrap";

// // core components
// import { useKeySetData } from "../../KeySetProvider";
// import { useAppNameData } from "../_AppName_Provider";

// const Page1 = () => {
//   const keySetContext = useKeySetData();
//   const _appName_Context = use_AppName_Data();

//   console.log("Page1 keySetContext: ", keySetContext);
//   console.log("Page1 _appName_Context: ", use_AppName_Context);

//   const [foo, setFoo] = useState(_appName_Context.foo);
//   const [bar, setBar] = useState(_appName_Context.bar);


//   return (
//     <>
//       <Container className="mt--7" fluid>
//         <Row className="mt-0">
//           <Col className="order-xl-2">
//             <Card className="bg-secondary shadow"> 
//               <CardHeader className="border-0">
//                 <Row className="align-items-center">
//                   <div className="col">
//                     <h3 className="mb-0">Device Push Details</h3>
//                   </div>
//                   <div className="col text-right">
//                   </div>
//                 </Row>
//               </CardHeader>             
//               <CardBody>
//                 <Form>
//                   <div className="pl-lg-4">
//                     <Row>
//                       <Col>
//                         <FormGroup>
//                           <label
//                             className="form-control-label"
//                             htmlFor="input-token"
//                           >
//                             Device Token
//                           </label>
//                           <Input
//                             className="form-control-alternative"
//                             id="input-token"
//                             placeholder="Input device push token"
//                             type="text"
//                             value={token}
//                             onChange={(e) => setToken(e.target.value)}
//                           />
//                         </FormGroup>
//                       </Col>
//                     </Row>
//                     <Row>
//                       <Col lg="3">
//                         <FormGroup>
//                           <label
//                             className="form-control-label"
//                             htmlFor="input-push-type"
//                           >
//                             Push Type
//                           </label>
//                           <div>
//                             <ButtonGroup 
//                               className="btn-group-toggle" 
//                               data-toggle="buttons"
//                             >
//                               <Button 
//                                 className={classnames({ active: pushRadios === 0})} 
//                                 color="danger" 
//                                 onClick={() => handlePushTypeClick(0)}
//                                 // size="sm"
//                               >
//                                 <input
//                                   autoComplete="off"
//                                   name="options"
//                                   type="radio"
//                                   value={pushRadios === 0}
//                                 />
//                                 APNs 2
//                               </Button>
//                               <Button 
//                                 className={classnames({ active: pushRadios === 1 })} 
//                                 color="danger" 
//                                 onClick={() => handlePushTypeClick(1)}
//                                 // size="sm"
//                               >
//                                 <input
//                                   autoComplete="off"
//                                   name="options"
//                                   type="radio"
//                                   value={pushRadios === 1}
//                                 />
//                                 APNs
//                               </Button>
//                               <Button 
//                                 className={classnames({ active: pushRadios === 2 })} 
//                                 color="danger" 
//                                 onClick={() => handlePushTypeClick(2)}
//                                 // size="sm"
//                               >
//                                 <input
//                                   autoComplete="off"
//                                   name="options"
//                                   type="radio"
//                                   value={pushRadios === 2}
//                                 />
//                                 FCM
//                               </Button>
//                             </ButtonGroup>
//                           </div>
//                         </FormGroup>
//                       </Col>
//                       <Col lg="3">
//                         <FormGroup>
//                           <label
//                             className="form-control-label"
//                             htmlFor="input-environment"
//                           >
//                             Environment
//                           </label>
//                           <div >
//                             <ButtonGroup 
//                               className="btn-group-toggle" 
//                               data-toggle="buttons"
//                             >
//                               <Button 
//                                 className={classnames({ active: environmentRadios === 0})} 
//                                 color="danger" 
//                                 onClick={() => handleEnvironmentClick(0)}
//                                 // size="sm"
//                                 disabled={!enableEnvironment}
//                               >
//                                 <input
//                                   autoComplete="off"
//                                   name="options"
//                                   type="radio"
//                                   value={environmentRadios === 0}
//                                 />
//                                 Development
//                               </Button>
//                               <Button 
//                                 className={classnames({ active: environmentRadios === 1 })} 
//                                 color="danger" 
//                                 onClick={() => handleEnvironmentClick(1)}
//                                 // size="sm"
//                                 disabled={!enableEnvironment}
//                               >
//                                 <input
//                                   autoComplete="off"
//                                   name="options"
//                                   type="radio"
//                                   value={environmentRadios === 1}
//                                 />
//                                 Production
//                               </Button>
//                             </ButtonGroup>
//                           </div>
//                         </FormGroup>
                        
//                       </Col>
//                       <Col lg="6">
//                         <FormGroup>
//                           <label
//                             className="form-control-label"
//                             htmlFor="input-topic"
//                           >
//                             Topic (Bundle ID)
//                           </label>
//                           <Input
//                             className="form-control-alternative"
//                             id="input-topic"
//                             placeholder="com.example.app.topic"
//                             type="text"
//                             disabled={!enableTopic}
//                             value={topic}
//                             onChange={(e) => setTopic(e.target.value)}
//                           />
//                         </FormGroup>
//                       </Col>
//                     </Row>
//                   </div>
//                   <Row>
//                     <Col className="text-right">
//                       <Button
//                         color="danger"
//                         onClick={listChannels}
//                         disabled = {keySetContext.pubnub == null || token === "" || (pushType === "apns2" && topic === "")}
//                         // size="sm"
//                       >
//                         List Channels
//                       </Button>
//                       <Button
//                         color="secondary"
//                         onClick={toggle}
//                         disabled = {keySetContext.pubnub == null || token === "" || (pushType === "apns2" && topic === "")}
//                         // size="sm"
//                       >
//                         Add Channels
//                       </Button>
//                     </Col>
//                   </Row> 
//                 </Form>
//               </CardBody>
//             </Card>
//             <p />
//             <Card className="bg-secondary shadow">              
//               <CardHeader>
//                 <Row>
//                   <div className="col">
//                     <h3 className="mb-0">
//                       Results for:
//                     </h3>
//                   </div>
//                 </Row>
//                 <Row>
//                   <Col lg="2">
//                   <div className="col">
//                     <h4 className="mb-0">
//                       &nbsp;&nbsp;&nbsp;&nbsp;Device Token:
//                     </h4>
//                   </div>
//                   </Col>
//                   <Col>{_appNameContext_.token}</Col>
//                 </Row>
//                 <Row>
//                   <Col lg="2">
//                   <div className="col">
//                     <h4 className="mb-0">
//                       &nbsp;&nbsp;&nbsp;&nbsp;Push Type:
//                     </h4>
//                   </div>
//                   </Col>
//                   <Col>{_appNameContext_.pushType}</Col>
//                 </Row>
//                 <Row hidden={_appNameContext_.pushType !== "apns2"}>
//                   <Col lg="2">
//                   <div className="col">
//                     <h4 className="mb-0">
//                       &nbsp;&nbsp;&nbsp;&nbsp;Environment:
//                     </h4>
//                   </div>
//                   </Col>
//                   <Col>{_appNameContext_.environment}</Col>
//                 </Row>
//                 <Row hidden={_appNameContext_.pushType !== "apns2"}>
//                   <Col lg="2">
//                   <div className="col">
//                     <h4 className="mb-0">
//                       &nbsp;&nbsp;&nbsp;&nbsp;Topic:
//                     </h4>
//                   </div>
//                   </Col>
//                   <Col>{_appNameContext_.topic}</Col>
//                 </Row>
//                 <p></p>
//                 <Row>
//                   <div className="col">
//                     <h3 className="mb-0">
//                       Registered Channels: {_appNameContext_.registeredChannels.length}
//                     </h3>
//                   </div>
//                 </Row>
//                 </CardHeader>
//                 <CardBody>
//                   <div className="pl-lg-4">
//                     <Table className="align-items-center table-flush" >
//                       <Rows channels={_appNameContext_.registeredChannels} handleRemoveChannel={handleRemoveChannel}/>
//                     </Table>
//                   </div>
//               </CardBody>
//             </Card>
//           </Col>
//         </Row>
//       </Container> 
//     </>
//   );
// };

// export default Page1;


// function Rows(props) {
//   const channels = props.channels;

//   const rows = channels.map((ch, index) =>
//     <tr key={index}>
//       <td width="100%">{ch}</td>
//       <td>
//         <Button
//           color="warning"
//           onClick={(e) => props.handleRemoveChannel(e, ch)}
//           size="sm"
//         >
//           Remove
//         </Button>
//       </td>
//     </tr>
//   );
//   return (
//     <tbody>
//       {rows}
//     </tbody>
//   );
// }


