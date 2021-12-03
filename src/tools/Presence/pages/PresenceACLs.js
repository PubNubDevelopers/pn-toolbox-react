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
              <AclsTable aclsConfigData={aclsConfigData} setAclsConfigData={setAclsConfigData} keySetContext={keySetContext} />
            </div>
          </CardBody>
        </Card>
      </Container>
    </>
  );
};

export default PresenceACLs;

const AclsTable = ({ aclsConfigData, setAclsConfigData, keySetContext }) => {
  console.log("ACLs", aclsConfigData);

  const [index, setIndex] = useState(-1);
  const [editAcl, setEditAcl] = useState({"pattern":"*"});
  const [pnConfig, setPnConfig] = useState();

  const handlePatternChange = (e) => {
    e.preventDefault();
    let tmp = JSON.parse(JSON.stringify(editAcl));
    
    tmp.pattern = e.target.value;
    setEditAcl(tmp);
  } 

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
      // t, ts or th
      if (prop === "t") tmp = {};
      
      if (editAcl["pattern"] != null) tmp["pattern"] = editAcl["pattern"];
      else tmp["cg_pattern"] = editAcl["cg_pattern"];

      if (editAcl[prop] == null) tmp[prop] = false;
      else delete tmp[prop];
    }
    else {
      if (editAcl[prop] == null) {
        tmp[prop] = {};
        tmp[prop][prop2] = false;
      }
      else {
        if (!editAcl[prop]) {
          tmp[prop] = {};
          tmp[prop] = disableOthers(tmp[prop], prop2);
        }
        else if (editAcl[prop][prop2] == null || editAcl[prop][prop2]) {
          tmp[prop][prop2] = false;
        }
        else delete tmp[prop][prop2];
      }

      if (Object.keys(tmp[prop]).length === 0) delete tmp[prop];
      else if (Object.keys(tmp[prop]).length === 7) tmp[prop] = false;
    }
    
    setEditAcl(tmp);
  }

  const disableOthers = (path, prop2) => {
    path.join = "join" === prop2;
    path.leave = "leave" === prop2;
    path.timeout = "timeout" === prop2;
    path["state-change"] = "state-change" === prop2;
    path.interval = "interval" === prop2;
    path.active = "active" === prop2;
    path.inactive = "inactive" === prop2;

    delete path[prop2];
    return path;
  }

  const saveAcl = (e) => {
    e.preventDefault();
    let tmp = JSON.parse(JSON.stringify(aclsConfigData));
    tmp[index] = editAcl;
    setAclsConfigData(tmp);
    generatePnConfig(tmp);
  }

  const addAcl = (e) => {
    e.preventDefault();
    let tmp = JSON.parse(JSON.stringify(aclsConfigData));
    tmp.push(editAcl);
    setAclsConfigData(tmp);
    generatePnConfig(tmp);
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
    generatePnConfig(tmp);
  }

  const generatePnConfig = (tmp) => {
    const acls = JSON.stringify(tmp);
    const cmd = `pnconfig-cli.py --email YOU@pubnub.com ${keySetContext.subKey} presence_acl '${acls}'`
    setPnConfig(cmd);
  }

  const AclTxChip = ({chipLabel, prop, prop2}) => {
    return (
      <Chip 
        onClick={(e) => clickChip(e, prop, prop2)} 
        disabled={editAcl.t != null} 
        color={(editAcl["t"] == null || editAcl["t"]) 
            && (editAcl[prop] == null || editAcl[prop]) 
            ? "primary" : "secondary"} size="small" label={chipLabel}
      />
    );
  } 

  const AclChip = ({chipLabel, prop, prop2}) => {
    return (
      <Chip 
        size="small" label={chipLabel}
        onClick={(e) => clickChip(e, prop, prop2)} 
        disabled={editAcl.t != null} 
        color={(editAcl["t"] == null || editAcl["t"]) 
            && (editAcl[prop] == null || editAcl[prop]) 
            // refactor above and below lines???
            && (editAcl[prop] == null || editAcl[prop][prop2] == null || editAcl[prop][prop2]) 
              ? "primary" : "secondary"}
      />
    );
  } 

  var moveRow = function(i, up) {
    let tmp = JSON.parse(JSON.stringify(aclsConfigData));

    const eli = tmp[i];
    let j;

    if (up) {
      j = i - 1;
      if (j === -1) j = aclsConfigData.length - 1;
    }
    else {
      j = i + 1;
      if (j === aclsConfigData.length) j = 0;
    }

    tmp[i] = tmp[j];
    tmp[j] = eli;

    setAclsConfigData(tmp);
  };

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
                  onChange={(e) => handlePatternChange(e)}
                />
              </TableCell>
              <TableCell align="center" style={{ verticalAlign: 'top'}}>
                <Chip size="small" label="CG"
                  onClick={(e) => clickCGChip(e)} 
                  color={editAcl.cg_pattern != null ? "primary" : "default"} 
                />
              </TableCell>
              <TableCell align="center" style={{ verticalAlign: 'top'}}>
                <Chip size="small" label="T"
                  onClick={(e) => clickChip(e, "t")} 
                  color={editAcl.t == null || editAcl.t ? "primary" : "secondary"} 
                />&nbsp;
                <AclTxChip chipLabel={"TS"} prop={"ts"}/>&nbsp;
                <AclTxChip chipLabel={"TH"} prop={"th"}/>
              </TableCell>
              <TableCell align="center" style={{ verticalAlign: 'top'}}>
                <AclChip chipLabel={"J"} prop={"p"} prop2={"join"}/>&nbsp;
                <AclChip chipLabel={"L"} prop={"p"} prop2={"leave"}/>&nbsp;
                <AclChip chipLabel={"T"} prop={"p"} prop2={"timeout"}/>&nbsp;
                <AclChip chipLabel={"S"} prop={"p"} prop2={"state-change"}/>&nbsp;
                <AclChip chipLabel={"I"} prop={"p"} prop2={"interval"}/>&nbsp;
                <AclChip chipLabel={"A"} prop={"p"} prop2={"active"}/>&nbsp;
                <AclChip chipLabel={"IA"} prop={"p"} prop2={"inactive"}/>
              </TableCell>
              <TableCell align="center" style={{ verticalAlign: 'top'}}>
                <AclChip chipLabel={"J"} prop={"w"} prop2={"join"}/>&nbsp;
                <AclChip chipLabel={"L"} prop={"w"} prop2={"leave"}/>&nbsp;
                <AclChip chipLabel={"T"} prop={"w"} prop2={"timeout"}/>&nbsp;
                <AclChip chipLabel={"S"} prop={"w"} prop2={"state-change"}/>&nbsp;
                <AclChip chipLabel={"I"} prop={"w"} prop2={"interval"}/>&nbsp;
                <AclChip chipLabel={"A"} prop={"w"} prop2={"active"}/>&nbsp;
                <AclChip chipLabel={"IA"} prop={"w"} prop2={"inactive"}/>
              </TableCell>
              <TableCell align="center" style={{ verticalAlign: 'top'}}>
                <CheckCircle 
                  disabled={index === -1}
                  color={index === -1 ? "default" : "primary"}
                  onClick={(e) => saveAcl(e)}
                />
                &nbsp;
                <AddCircle color="primary" onClick={(e) => addAcl(e)}/>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {aclsConfigData.map((acl, index) => (
              <AclRow acl={acl} index={index} length={aclsConfigData.length} updateAcl={updateAcl} deleteAcl={deleteAcl} moveRow={moveRow} />
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell/>
              <TableCell/>
              <TableCell colSpan="3"><strong>Selected ACL</strong></TableCell>
              <TableCell colSpan="2"><strong>ACLs Config</strong></TableCell>
            </TableRow>
            <TableRow>
              <TableCell/>
              <TableCell/>
              <TableCell colSpan="3">
                <pre>{JSON.stringify(editAcl, null, 2)}</pre>
              </TableCell> 
              <TableCell colSpan="2">
                <pre>
                  {JSON.stringify(aclsConfigData, null, 2)}
                </pre>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      <Card>
        <CardBody>
          <div className="pl-lg-12"><h3>pnconfig-cli</h3></div>
          <div className="pl-lg-12">{pnConfig}</div>
        </CardBody>
      </Card>
    </Paper>
  );
}

const AclRow = ({ acl, index, length, updateAcl, deleteAcl, moveRow}) => {
  return (
    <>
      <TableRow id={index} sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell align="center">
          <KeyboardArrowUp 
            color="primary"
            onClick={() => moveRow(index, true)}
          />
          <br/>
          <KeyboardArrowDown 
            color="primary"
            onClick={() => moveRow(index, false)}/>
        </TableCell>
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
          <Chip color={(acl.t == null || acl.t) && (acl.th == null || acl.th) ? "primary" : "secondary"} size="small" label="TH"/>
        </TableCell>
        <TableCell align="center">
          <Chip color={(acl.t == null || acl.t) && (acl.p == null || acl.p) && (acl.p == null || acl.p.join == null || acl.p.join) ? "primary" : "secondary"} size="small" label="J"/>&nbsp;
          <Chip color={(acl.t == null || acl.t) && (acl.p == null || acl.p) && (acl.p == null || acl.p.leave == null || acl.p.leave) ? "primary" : "secondary"} size="small" label="L"/>&nbsp;
          <Chip color={(acl.t == null || acl.t) && (acl.p == null || acl.p) && (acl.p == null || acl.p.timeout == null ||acl.p.timeout) ? "primary" : "secondary"} size="small" label="T"/>&nbsp;
          <Chip color={(acl.t == null || acl.t) && (acl.p == null || acl.p) && (acl.p == null || acl.p["state-change"] == null || acl.p["state-change"]) ? "primary" : "secondary"} size="small" label="S"/>&nbsp;
          <Chip color={(acl.t == null || acl.t) && (acl.p == null || acl.p) && (acl.p == null || acl.p.interval == null || acl.p.interval) ? "primary" : "secondary"} size="small" label="I"/>&nbsp;
          <Chip color={(acl.t == null || acl.t) && (acl.p == null || acl.p) && (acl.p == null || acl.p.active == null || acl.p.active) ? "primary" : "secondary"} size="small" label="A"/>&nbsp;
          <Chip color={(acl.t == null || acl.t) && (acl.p == null || acl.p) && (acl.p == null || acl.p.inactive == null || acl.p.inactive) ? "primary" : "secondary"} size="small" label="IA"/>
        </TableCell>
        <TableCell align="center">
          <Chip color={(acl.t == null || acl.t) && (acl.w == null || acl.w) && (acl.w == null || acl.w.join == null || acl.w.join) ? "primary" : "secondary"} size="small" label="J"/>&nbsp;
          <Chip color={(acl.t == null || acl.t) && (acl.w == null || acl.w) && (acl.w == null || acl.w.leave == null || acl.w.leave) ? "primary" : "secondary"} size="small" label="L"/>&nbsp;
          <Chip color={(acl.t == null || acl.t) && (acl.w == null || acl.w) && (acl.w == null || acl.w.timeout == null || acl.w.timeout) ? "primary" : "secondary"} size="small" label="T"/>&nbsp;
          <Chip color={(acl.t == null || acl.t) && (acl.w == null || acl.w) && (acl.w == null || acl.w["state-change"] == null || acl.w["state-change"]) ? "primary" : "secondary"} size="small" label="S"/>&nbsp;
          <Chip color={(acl.t == null || acl.t) && (acl.w == null || acl.w) && (acl.w == null || acl.w.interval == null || acl.w.interval) ? "primary" : "secondary"} size="small" label="I"/>&nbsp;
          <Chip color={(acl.t == null || acl.t) && (acl.w == null || acl.w) && (acl.w == null || acl.w.active == null || acl.w.active) ? "primary" : "secondary"} size="small" label="A"/>&nbsp;
          <Chip color={(acl.t == null || acl.t) && (acl.w == null || acl.w) && (acl.w == null || acl.w.inactive == null || acl.w.inactive) ? "primary" : "secondary"} size="small" label="IA"/>
        </TableCell>
        <TableCell align="center">
          <Edit color="primary" onClick={(e) => updateAcl(e, index)}/>
          &nbsp;
          <DeleteForever color="error" onClick={(e) => deleteAcl(e, index)}/>
        </TableCell>
      </TableRow>
    </>
  );
}
