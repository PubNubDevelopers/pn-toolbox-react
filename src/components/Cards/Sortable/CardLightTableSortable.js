import React from "react";
// javascript plugin that creates a sortable object from a dom object
import List from "list.js";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import LinearProgress from "@material-ui/core/LinearProgress";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Tooltip from "@material-ui/core/Tooltip";
// @material-ui/lab components
import AvatarGroup from "@material-ui/lab/AvatarGroup";
// @material-ui/icons components
import MoreVert from "@material-ui/icons/MoreVert";
// core components
import componentStyles from "assets/theme/components/cards/sortable/card-light-table-sortable.js";

const useStyles = makeStyles(componentStyles);

const tableHead = ["Project", "Budget", "Status", "Users", "Completion", ""];
const tableBody = [
  {
    projectImage: require("assets/img/theme/bootstrap.jpg").default,
    projectName: "Argon Design System",
    budget: "$2,500 USD",
    status: "pending",
    color: "bgWarning",
    completion: 60,
  },
  {
    projectImage: require("assets/img/theme/angular.jpg").default,
    projectName: "Angular Now UI Kit PRO",
    budget: "$1,800 USD",
    status: "completed",
    color: "bgSuccess",
    completion: 100,
  },
  {
    projectImage: require("assets/img/theme/sketch.jpg").default,
    projectName: "Black Dashboard",
    budget: "$3,150 USD",
    status: "delayed",
    color: "bgError",
    completion: 72,
  },
  {
    projectImage: require("assets/img/theme/react.jpg").default,
    projectName: "React Material Dashboard",
    budget: "$4,400 USD",
    status: "on schedule",
    color: "bgInfo",
    completion: 90,
  },
  {
    projectImage: require("assets/img/theme/vue.jpg").default,
    projectName: "Vue Paper UI Kit PRO",
    budget: "$2,200 USD",
    status: "completed",
    color: "bgSuccess",
    completion: 100,
  },
];

const DropdownComponent = ({ id }) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Box
        aria-controls={"simple-menu-" + id}
        aria-haspopup="true"
        onClick={handleClick}
        size="small"
        component={Button}
        width="2rem!important"
        height="2rem!important"
        minWidth="2rem!important"
        minHeight="2rem!important"
      >
        <Box
          component={MoreVert}
          width="1.25rem!important"
          height="1.25rem!important"
          position="relative"
          top="2px"
          color={theme.palette.gray[500]}
        />
      </Box>
      <Menu
        id={"simple-menu-" + id}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Action</MenuItem>
        <MenuItem onClick={handleClose}>Another action</MenuItem>
        <MenuItem onClick={handleClose}>Something else here</MenuItem>
      </Menu>
    </>
  );
};

const AvatarGroupComponent = () => {
  const classes = useStyles();
  return (
    <>
      <AvatarGroup>
        <Tooltip title="Ryan Tompson" placement="top">
          <Avatar
            classes={{ root: classes.avatarRoot }}
            alt="..."
            src={require("assets/img/theme/team-1-800x800.jpg").default}
          />
        </Tooltip>
        <Tooltip title="Romina Hadid" placement="top">
          <Avatar
            classes={{ root: classes.avatarRoot }}
            alt="..."
            src={require("assets/img/theme/team-2-800x800.jpg").default}
          />
        </Tooltip>
        <Tooltip title="Alexander Smith" placement="top">
          <Avatar
            classes={{ root: classes.avatarRoot }}
            alt="..."
            src={require("assets/img/theme/team-3-800x800.jpg").default}
          />
        </Tooltip>
        <Tooltip title="Jessica Doe" placement="top">
          <Avatar
            classes={{ root: classes.avatarRoot }}
            alt="..."
            src={require("assets/img/theme/team-4-800x800.jpg").default}
          />
        </Tooltip>
      </AvatarGroup>
    </>
  );
};

export default function CardLightTableSortable() {
  const classes = useStyles();
  const tableConatinerRef = React.useRef(null);
  React.useEffect(() => {
    new List(tableConatinerRef.current, {
      valueNames: ["name", "budget", "status", "completion"],
      listClass: "list",
    });
  }, []);
  return (
    <>
      <Card classes={{ root: classes.cardRoot }}>
        <CardHeader
          className={classes.cardHeader}
          title="Light table"
          titleTypographyProps={{
            component: Box,
            marginBottom: "0!important",
            variant: "h3",
          }}
        ></CardHeader>
        <TableContainer ref={tableConatinerRef}>
          <Box component={Table} alignItems="center" marginBottom="0!important">
            <TableHead>
              <TableRow>
                {tableHead.map((prop, key) => (
                  <TableCell
                    key={key}
                    {...{
                      "data-sort":
                        prop !== "" && prop !== "Users"
                          ? (prop === "Project" ? "name" : prop).toLowerCase()
                          : undefined,
                    }}
                    scope="col"
                    classes={{
                      root:
                        classes.tableCellRoot +
                        " sort " +
                        classes.tableCellRootHead,
                    }}
                  >
                    {prop}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody className="list">
              {tableBody.map((prop, key) => (
                <TableRow key={key}>
                  <TableCell
                    classes={{
                      root:
                        classes.tableCellRoot +
                        " " +
                        classes.tableCellRootBodyHead,
                    }}
                    component="th"
                    variant="head"
                    scope="row"
                  >
                    <Box alignItems="center" display="flex">
                      <Box
                        component={Avatar}
                        marginRight="1rem"
                        alt="..."
                        src={prop.projectImage}
                      />
                      <Box display="flex" alignItems="flex-start">
                        <Box
                          fontSize=".875rem"
                          component="span"
                          className="name"
                        >
                          {prop.projectName}
                        </Box>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell
                    classes={{ root: classes.tableCellRoot + " budget" }}
                  >
                    {prop.budget}
                  </TableCell>
                  <TableCell classes={{ root: classes.tableCellRoot }}>
                    <Box paddingTop=".35rem" paddingBottom=".35rem">
                      <Box
                        marginRight="10px"
                        component="i"
                        width=".375rem"
                        height=".375rem"
                        borderRadius="50%"
                        display="inline-block"
                        className={
                          classes.verticalAlignMiddle +
                          " " +
                          classes[prop.color]
                        }
                      ></Box>
                      <span className="status">{prop.status}</span>
                    </Box>
                  </TableCell>
                  <TableCell classes={{ root: classes.tableCellRoot }}>
                    <AvatarGroupComponent />
                  </TableCell>
                  <TableCell classes={{ root: classes.tableCellRoot }}>
                    <Box display="flex" alignItems="center">
                      <Box
                        component="span"
                        marginRight=".5rem"
                        className="completion"
                      >
                        {prop.completion}%
                      </Box>
                      <Box width="100%">
                        <LinearProgress
                          variant="determinate"
                          value={prop.completion}
                          classes={{
                            root: classes.linearProgressRoot,
                            bar: classes[prop.color],
                          }}
                        />
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell
                    classes={{ root: classes.tableCellRoot }}
                    align="right"
                  >
                    <DropdownComponent id={key} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Box>
        </TableContainer>
      </Card>
    </>
  );
}
