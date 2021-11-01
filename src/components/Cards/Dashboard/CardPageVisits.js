import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
// @material-ui/icons components
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import ArrowUpward from "@material-ui/icons/ArrowUpward";

// core components

import componentStyles from "assets/theme/components/cards/dashboard/card-page-visits.js";

const useStyles = makeStyles(componentStyles);

function CardPageVisits() {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <>
      <Card
        classes={{
          root: classes.cardRoot,
        }}
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
                  variant="h3"
                  marginBottom="0!important"
                >
                  Page visits
                </Box>
              </Grid>
              <Grid item xs="auto">
                <Box justifyContent="flex-end" display="flex" flexWrap="wrap">
                  <Button variant="contained" color="primary" size="small">
                    See all
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
                <TableCell
                  classes={{
                    root:
                      classes.tableCellRoot + " " + classes.tableCellRootHead,
                  }}
                >
                  Page name
                </TableCell>
                <TableCell
                  classes={{
                    root:
                      classes.tableCellRoot + " " + classes.tableCellRootHead,
                  }}
                >
                  Visitors
                </TableCell>
                <TableCell
                  classes={{
                    root:
                      classes.tableCellRoot + " " + classes.tableCellRootHead,
                  }}
                >
                  Unique users
                </TableCell>
                <TableCell
                  classes={{
                    root:
                      classes.tableCellRoot + " " + classes.tableCellRootHead,
                  }}
                >
                  Bounce rate
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
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
                  /argon/
                </TableCell>
                <TableCell classes={{ root: classes.tableCellRoot }}>
                  4,569
                </TableCell>
                <TableCell classes={{ root: classes.tableCellRoot }}>
                  340
                </TableCell>
                <Box
                  component={TableCell}
                  className={classes.tableCellRoot}
                  marginBottom="-2px"
                >
                  <Box
                    component={ArrowUpward}
                    width="1rem!important"
                    height="1rem!important"
                    marginRight="1rem"
                    color={theme.palette.success.main}
                  />
                  46,53%
                </Box>
              </TableRow>
              <TableRow>
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
                  /argon/index.html
                </TableCell>
                <TableCell classes={{ root: classes.tableCellRoot }}>
                  3,985
                </TableCell>
                <TableCell classes={{ root: classes.tableCellRoot }}>
                  319
                </TableCell>
                <Box
                  component={TableCell}
                  className={classes.tableCellRoot}
                  marginBottom="-2px"
                >
                  <Box
                    component={ArrowDownward}
                    width="1rem!important"
                    height="1rem!important"
                    marginRight="1rem"
                    color={theme.palette.warning.main}
                  />
                  46,53%
                </Box>
              </TableRow>
              <TableRow>
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
                  /argon/charts.html
                </TableCell>
                <TableCell classes={{ root: classes.tableCellRoot }}>
                  3,513
                </TableCell>
                <TableCell classes={{ root: classes.tableCellRoot }}>
                  294
                </TableCell>
                <Box
                  component={TableCell}
                  className={classes.tableCellRoot}
                  marginBottom="-2px"
                >
                  <Box
                    component={ArrowDownward}
                    width="1rem!important"
                    height="1rem!important"
                    marginRight="1rem"
                    color={theme.palette.warning.main}
                  />
                  36,49%
                </Box>
              </TableRow>
              <TableRow>
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
                  /argon/tables.html
                </TableCell>
                <TableCell classes={{ root: classes.tableCellRoot }}>
                  2,050
                </TableCell>
                <TableCell classes={{ root: classes.tableCellRoot }}>
                  147
                </TableCell>
                <Box
                  component={TableCell}
                  className={classes.tableCellRoot}
                  marginBottom="-2px"
                >
                  <Box
                    component={ArrowUpward}
                    width="1rem!important"
                    height="1rem!important"
                    marginRight="1rem"
                    color={theme.palette.success.main}
                  />
                  50,87%
                </Box>
              </TableRow>
              <TableRow>
                <TableCell
                  classes={{
                    root:
                      classes.tableCellRoot +
                      " " +
                      classes.tableCellRootBodyHead +
                      " " +
                      classes.borderBottomUnset,
                  }}
                  component="th"
                  variant="head"
                  scope="row"
                >
                  /argon/profile.html
                </TableCell>
                <TableCell
                  classes={{
                    root:
                      classes.tableCellRoot + " " + classes.borderBottomUnset,
                  }}
                >
                  1,795
                </TableCell>
                <TableCell
                  classes={{
                    root:
                      classes.tableCellRoot + " " + classes.borderBottomUnset,
                  }}
                >
                  190
                </TableCell>
                <Box
                  component={TableCell}
                  className={
                    classes.tableCellRoot + " " + classes.borderBottomUnset
                  }
                  marginBottom="-2px"
                >
                  <Box
                    component={ArrowDownward}
                    width="1rem!important"
                    height="1rem!important"
                    marginRight="1rem"
                    color={theme.palette.error.main}
                  />
                  46,53%
                </Box>
              </TableRow>
            </TableBody>
          </Box>
        </TableContainer>
      </Card>
    </>
  );
}

export default CardPageVisits;
