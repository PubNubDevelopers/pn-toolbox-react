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

import { Chip, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from "@material-ui/core";
// import { classnames } from "@material-ui/data-grid";
import { Edit, CheckCircle, AddCircle, DeleteForever, KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material";
import { useState } from "react";
// import classnames from "classnames";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Input,
  Row,
} from "reactstrap";

// // core components
import { useKeySetData } from "../../KeySetProvider";
import { usePresenceData } from "../PresenceProvider";

const PresenceACLs = () => {
  const keySetContext = useKeySetData();
  const usePresenceContext = usePresenceData();

  console.log("PresenceACLs keySetContext: ", keySetContext);
  console.log("PresenceACLs presConfigContext: ", usePresenceContext);

  const [aclsConfigData, setAclsConfigData] = useState([]);

  return (
    <>
      <Container className="mt--7" fluid>
        <Card id="table-acls" className="bg-secondary shadow">

          <CardHeader className="border-0">
            <Row className="align-items-center">
              <div className="col">
                <h3 className="mb-0">Presence ACLs</h3>
              </div>
            </Row>
          </CardHeader>

          <CardBody id="cardbody-acls-table">
            <div className="pl-lg-12">
              <AclsTable aclsConfigData={aclsConfigData} setAclsConfigData={setAclsConfigData} />
            </div>
          </CardBody>
        </Card>
      </Container>
    </>
  );
};

export default PresenceACLs;

const AclsTable = ({ aclsConfigData, setAclsConfigData }) => {
  console.log("ACLs", aclsConfigData);

  const [index, setIndex] = useState(-1);
  const [editAcl, setEditAcl] = useState({"pattern":"*"});

  const clickCGChip = (e) => {
    e.preventDefault();
    let tmp = JSON.parse(JSON.stringify(editAcl));

    if (tmp.pattern != null) {
      tmp.cg_pattern = tmp.pattern;
      delete tmp.pattern;
    }
    else {
      tmp.pattern = tmp.cg_pattern;
      delete tmp.cg_pattern;
    }
    
    setEditAcl(tmp);
  }

  const clickChip = (e, prop, prop2) => {
    e.preventDefault();
    let tmp = JSON.parse(JSON.stringify(editAcl));
    
    if (prop2 == null) {
      tmp[prop] = !editAcl[prop];
    }
    else {
      if (tmp[prop] == null) tmp[prop] = {};
      tmp[prop][prop2] = editAcl[prop] == null ? false : !editAcl[prop][prop2];
    }
    
    setEditAcl(tmp);
  }

  const saveAcl = (e) => {
    e.preventDefault();
    let tmp = JSON.parse(JSON.stringify(aclsConfigData));
    tmp[index] = editAcl;
    setAclsConfigData(tmp);
  }

  const addAcl = (e) => {
    e.preventDefault();
    let tmp = JSON.parse(JSON.stringify(aclsConfigData));
    tmp.push(editAcl);
    setAclsConfigData(tmp);
  }

  const updateAcl = (e, selRow) => {
    e.preventDefault();
    setIndex(selRow);
    setEditAcl(aclsConfigData[selRow]);
  }

  const deleteAcl = (e, selRow) => {
    e.preventDefault();
    let tmp = JSON.parse(JSON.stringify(aclsConfigData));

    if (selRow > -1) {
      tmp.splice(selRow, 1);
    }

    setAclsConfigData(tmp);
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell align="center">Order</TableCell>
              <TableCell align="right">#</TableCell>
              <TableCell>Pattern</TableCell>
              <TableCell align="center">CG?</TableCell>
              <TableCell align="center">Tracking</TableCell>
              <TableCell align="center">Publish Events</TableCell>
              <TableCell align="center">Webhooks</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="right"></TableCell>
              <TableCell align="right" style={{ verticalAlign: 'top'}}>{index}</TableCell>
              <TableCell style={{verticalAlign: 'top'}}>
                <Input
                  className="form-control-alternative"
                  id="input-channel-pattern"
                  placeholder="Enter a name or pattern (using * as wildcard)"
                  type="text"
                  value={editAcl.pattern}
                  disabled
                />
              </TableCell>
              <TableCell align="center" style={{ verticalAlign: 'top'}}>
                <Chip onClick={(e) => clickCGChip(e)} color={editAcl.cg_pattern != null ? "primary" : "secondary"} size="small" label="CG"/>&nbsp;
              </TableCell>
              <TableCell align="center" style={{ verticalAlign: 'top'}}>
                <Chip onClick={(e) => clickChip(e, "t")} color={editAcl.t == null || editAcl.t ? "primary" : "secondary"} size="small" label="T"/>&nbsp;
                <Chip onClick={(e) => clickChip(e, "ts")} color={(editAcl.t == null || editAcl.t) && (editAcl.ts == null || editAcl.ts) ? "primary" : "secondary"} size="small" label="TS"/>&nbsp;
                <Chip onClick={(e) => clickChip(e, "th")} color={(editAcl.t == null || editAcl.t) && (editAcl.th == null || editAcl.th) ? "primary" : "secondary"} size="small" label="TH"/>
              </TableCell>
              <TableCell align="center" style={{ verticalAlign: 'top'}}>
                <Chip onClick={(e) => clickChip(e, "p", "join")} color={(editAcl.t == null || editAcl.t) && (editAcl.p == null || editAcl.p) && (editAcl.p == null || editAcl.p.join == null || editAcl.p.join) ? "primary" : "secondary"} size="small" label="J"/>&nbsp;
                <Chip onClick={(e) => clickChip(e, "p", "leave")} color={(editAcl.t == null || editAcl.t) && (editAcl.p == null || editAcl.p) && (editAcl.p == null || editAcl.p.leave == null || editAcl.p.leave) ? "primary" : "secondary"} size="small" label="L"/>&nbsp;
                <Chip onClick={(e) => clickChip(e, "p", "timeout")} color={(editAcl.t == null || editAcl.t) && (editAcl.p == null || editAcl.p) && (editAcl.p == null || editAcl.p.timeout == null ||editAcl.p.timeout) ? "primary" : "secondary"} size="small" label="T"/>&nbsp;
                <Chip onClick={(e) => clickChip(e, "p", "state-change")} color={(editAcl.t == null || editAcl.t) && (editAcl.p == null || editAcl.p) && (editAcl.p == null || editAcl.p["state-change"] == null || editAcl.p["state-change"]) ? "primary" : "secondary"} size="small" label="S"/>&nbsp;
                <Chip onClick={(e) => clickChip(e, "p", "interval")} color={(editAcl.t == null || editAcl.t) && (editAcl.p == null || editAcl.p) && (editAcl.p == null || editAcl.p.interval == null || editAcl.p.interval) ? "primary" : "secondary"} size="small" label="I"/>
              </TableCell>
              <TableCell align="center" style={{ verticalAlign: 'top'}}>
                <Chip onClick={(e) => clickChip(e, "w", "join")} color={(editAcl.t == null || editAcl.t) && (editAcl.w == null || editAcl.w) && (editAcl.w == null || editAcl.w.join == null || editAcl.w.join) ? "primary" : "secondary"} size="small" label="J"/>&nbsp;
                <Chip onClick={(e) => clickChip(e, "w", "leave")} color={(editAcl.t == null || editAcl.t) && (editAcl.w == null || editAcl.w) && (editAcl.w == null || editAcl.w.leave == null || editAcl.w.leave) ? "primary" : "secondary"} size="small" label="L"/>&nbsp;
                <Chip onClick={(e) => clickChip(e, "w", "timeout")} color={(editAcl.t == null || editAcl.t) && (editAcl.w == null || editAcl.w) && (editAcl.w == null || editAcl.w.timeout == null ||editAcl.w.timeout) ? "primary" : "secondary"} size="small" label="T"/>&nbsp;
                <Chip onClick={(e) => clickChip(e, "w", "state-change")} color={(editAcl.t == null || editAcl.t) && (editAcl.w == null || editAcl.w) && (editAcl.w == null || editAcl.w["state-change"] == null || editAcl.w["state-change"]) ? "primary" : "secondary"} size="small" label="S"/>&nbsp;
                <Chip onClick={(e) => clickChip(e, "w", "interval")} color={(editAcl.t == null || editAcl.t) && (editAcl.w == null || editAcl.w) && (editAcl.w == null || editAcl.w.interval == null || editAcl.w.interval) ? "primary" : "secondary"} size="small" label="I"/>&nbsp;
                <Chip onClick={(e) => clickChip(e, "w", "active")} color={(editAcl.t == null || editAcl.t) && (editAcl.w == null || editAcl.w) && (editAcl.w == null || editAcl.w.active == null || editAcl.w.active) ? "primary" : "secondary"} size="small" label="A"/>&nbsp;
                <Chip onClick={(e) => clickChip(e, "w", "inactive")} color={(editAcl.t == null || editAcl.t) && (editAcl.w == null || editAcl.w) && (editAcl.w == null || editAcl.w.inactive == null || editAcl.w.inactive) ? "primary" : "secondary"} size="small" label="IA"/>
              </TableCell>
              <TableCell align="center" style={{ verticalAlign: 'top'}}>
                <CheckCircle onClick={(e) => saveAcl(e)}/>
                &nbsp;
                <AddCircle onClick={(e) => addAcl(e)}/>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {aclsConfigData.map((acl, index) => (
              <AclRow acl={acl} index={index} updateAcl={updateAcl} deleteAcl={deleteAcl} />
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell colSpan="3"><strong>Selected ACL</strong></TableCell>
              <TableCell colSpan="3"><strong>ACLs Config</strong></TableCell>
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell colSpan="3">
                <Input
                  id="output-edit-acl"
                  type="textarea"
                  rows="10"
                  value={JSON.stringify(editAcl, null, 2)}
                  disabled
                />
              </TableCell>
              <TableCell colSpan="2">
                
                <Input
                  id="output-acls-config"
                  type="textarea"
                  rows="10"
                  value={JSON.stringify(aclsConfigData, null, 2)}
                  disabled
                />
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Paper>
  );
}

const AclRow = ({ acl, index, updateAcl, deleteAcl}) => {
  return (
    <>
      <TableRow id={index} sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell align="center"><KeyboardArrowUp/><br/><KeyboardArrowDown/></TableCell>
        <TableCell align="right">{index}</TableCell>
        <TableCell component="th" scope="row">
          <strong>{acl.pattern || acl.cg_pattern}</strong>
        </TableCell>
        <TableCell align="center">
          <Chip color={acl.cg_pattern != null ? "primary" : "secondary"} size="small" label="CG"/>&nbsp;
        </TableCell>
        <TableCell component="th" scope="row" align="center">
          <Chip color={acl.t == null || acl.t ? "primary" : "secondary"} size="small" label="T"/>&nbsp;
          <Chip color={(acl.t == null || acl.t) && (acl.ts == null || acl.ts) ? "primary" : "secondary"} size="small" label="TS"/>&nbsp;
          <Chip color={(acl.t == null || acl.t) && (acl.th == null || acl.th) ? "primary" : "secondary"} size="small" label="TH"/>&nbsp;
        </TableCell>
        <TableCell align="center">
          <Chip color={(acl.t == null || acl.t) && (acl.p == null || acl.p) && (acl.p == null || acl.p.join == null || acl.p.join) ? "primary" : "secondary"} size="small" label="J"/>&nbsp;
          <Chip color={(acl.t == null || acl.t) && (acl.p == null || acl.p) && (acl.p == null || acl.p.leave == null || acl.p.leave) ? "primary" : "secondary"} size="small" label="L"/>&nbsp;
          <Chip color={(acl.t == null || acl.t) && (acl.p == null || acl.p) && (acl.p == null || acl.p.timeout == null ||acl.p.timeout) ? "primary" : "secondary"} size="small" label="T"/>&nbsp;
          <Chip color={(acl.t == null || acl.t) && (acl.p == null || acl.p) && (acl.p == null || acl.p["state-change"] == null || acl.p["state-change"]) ? "primary" : "secondary"} size="small" label="S"/>&nbsp;
          <Chip color={(acl.t == null || acl.t) && (acl.p == null || acl.p) && (acl.p == null || acl.p.interval == null || acl.p.interval) ? "primary" : "secondary"} size="small" label="I"/>&nbsp;
        </TableCell>
        <TableCell align="center">
          <Chip color={(acl.t == null || acl.t) && (acl.w == null || acl.w) && (acl.w == null || acl.w.join == null || acl.w.join) ? "primary" : "secondary"} size="small" label="J"/>&nbsp;
          <Chip color={(acl.t == null || acl.t) && (acl.w == null || acl.w) && (acl.w == null || acl.w.leave == null || acl.w.leave) ? "primary" : "secondary"} size="small" label="L"/>&nbsp;
          <Chip color={(acl.t == null || acl.t) && (acl.w == null || acl.w) && (acl.w == null || acl.w.timeout == null || acl.w.timeout) ? "primary" : "secondary"} size="small" label="T"/>&nbsp;
          <Chip color={(acl.t == null || acl.t) && (acl.w == null || acl.w) && (acl.w == null || acl.w["state-change"] == null || acl.w["state-change"]) ? "primary" : "secondary"} size="small" label="S"/>&nbsp;
          <Chip color={(acl.t == null || acl.t) && (acl.w == null || acl.w) && (acl.w == null || acl.w.interval == null || acl.w.interval) ? "primary" : "secondary"} size="small" label="I"/>&nbsp;
          <Chip color={(acl.t == null || acl.t) && (acl.w == null || acl.w) && (acl.w == null || acl.w.active == null || acl.w.active) ? "primary" : "secondary"} size="small" label="A"/>&nbsp;
          <Chip color={(acl.t == null || acl.t) && (acl.w == null || acl.w) && (acl.w == null || acl.w.inactive == null || acl.w.inactive) ? "primary" : "secondary"} size="small" label="IA"/>&nbsp;
        </TableCell>
        <TableCell align="center" onClick={(e) => updateAcl(e, index)}>
          <Edit/>
          &nbsp;
          <DeleteForever onClick={(e) => deleteAcl(e, index)}/>
        </TableCell>
      </TableRow>
    </>
  );
}
