import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
// @material-ui/lab components
// @material-ui/icons components
import Create from "@material-ui/icons/Create";
import Delete from "@material-ui/icons/Delete";
// core components
import componentStyles from "assets/theme/components/cards/tables/card-light-table-tables.js";

const useStyles = makeStyles(componentStyles);

let date = new Date();

const tableHead = ["Author", "Created at", "Product", ""];
const tableBody = [
  {
    authorImage: require("assets/img/theme/team-1-800x800.jpg").default,
    authorName: "John Michael",
    createdAt:
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear(),
    product: "Argon Dashboard PRO",
  },
  {
    authorImage: require("assets/img/theme/team-2-800x800.jpg").default,
    authorName: "Alex Smith",
    createdAt:
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear(),
    product: "Argon Design System",
  },
  {
    authorImage: require("assets/img/theme/team-3-800x800.jpg").default,
    authorName: "Samantha Ivy",
    createdAt:
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear(),
    product: "Black Dashboard",
  },
  {
    authorImage: require("assets/img/theme/team-1-800x800.jpg").default,
    authorName: "John Michael",
    createdAt:
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear(),
    product: "Argon Dashboard PRO",
  },
  {
    authorImage: require("assets/img/theme/team-2-800x800.jpg").default,
    authorName: "John Michael",
    createdAt:
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear(),
    product: "Argon Dashboard PRO",
  },
];

const Tooltips = () => {
  const theme = useTheme();
  return (
    <>
      <Tooltip title="Edit product">
        <IconButton aria-label="edit">
          <Box
            component={Create}
            width="1.25rem!important"
            height="1.25rem!important"
            color={theme.palette.gray[500]}
          />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete product">
        <IconButton aria-label="delete">
          <Box
            component={Delete}
            width="1.25rem!important"
            height="1.25rem!important"
            color={theme.palette.gray[500]}
          />
        </IconButton>
      </Tooltip>
    </>
  );
};

export default function CardInlineActionsStripped() {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <>
      <Card
        classes={{ root: classes.cardRoot + " " + classes.cardRootStripped }}
      >
        <CardHeader
          subheader={
            <Grid
              container
              component={Box}
              alignItems="center"
              justifyContent="space-between"
            >
              <Grid item xs="auto">
                <Box
                  component={Typography}
                  variant="h2"
                  marginBottom="0!important"
                >
                  <Box component="span">Striped table</Box>
                </Box>
              </Grid>
              <Grid item xs="auto">
                <Box justifyContent="flex-end" display="flex" flexWrap="wrap">
                  <Button variant="contained" size="small" color="primary">
                    <Box component={Create} position="relative" top="-2px" />{" "}
                    Export
                  </Button>
                </Box>
              </Grid>
            </Grid>
          }
          classes={{ root: classes.cardHeaderRoot }}
        ></CardHeader>
        <TableContainer>
          <Box component={Table} alignItems="center" marginBottom="0!important">
            <TableHead>
              <TableRow>
                {tableHead.map((prop, key) => (
                  <TableCell
                    key={key}
                    classes={{
                      root:
                        classes.tableCellRoot + " " + classes.tableCellRootHead,
                    }}
                  >
                    {prop}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
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
                        src={prop.authorImage}
                      />
                      <Box display="flex" alignItems="flex-start">
                        <Box fontSize=".875rem" component="span">
                          {prop.authorName}
                        </Box>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell classes={{ root: classes.tableCellRoot }}>
                    <Box component="span" color={theme.palette.gray[600]}>
                      {prop.createdAt}
                    </Box>
                  </TableCell>
                  <TableCell classes={{ root: classes.tableCellRoot }}>
                    <a
                      href="#mui"
                      onClick={(e) => e.preventDefault}
                      className={classes.anchorStyles}
                    >
                      {prop.product}
                    </a>
                  </TableCell>
                  <TableCell classes={{ root: classes.tableCellRoot }}>
                    <Tooltips />
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
