import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
// @material-ui/icons components

// core components

import componentStyles from "assets/theme/components/cards/dashboard/card-social-traffic.js";

const useStyles = makeStyles(componentStyles);

function CardSocialTraffic() {
  const classes = useStyles();
  return (
    <>
      <Card classes={{ root: classes.cardRoot }}>
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
                  Social traffic
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
                  Refferal
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
                ></TableCell>
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
                  Facebook
                </TableCell>
                <TableCell classes={{ root: classes.tableCellRoot }}>
                  1,480
                </TableCell>
                <TableCell classes={{ root: classes.tableCellRoot }}>
                  <Box display="flex" alignItems="center">
                    <Box component="span" marginRight=".5rem">
                      60%
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={60}
                      classes={{
                        root: classes.linearProgressRoot,
                        bar: classes.bgGradientError,
                      }}
                    />
                  </Box>
                </TableCell>
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
                  Facebook
                </TableCell>
                <TableCell classes={{ root: classes.tableCellRoot }}>
                  5,480
                </TableCell>
                <TableCell classes={{ root: classes.tableCellRoot }}>
                  <Box display="flex" alignItems="center">
                    <Box component="span" marginRight=".5rem">
                      70%
                    </Box>
                    <Box width="100%">
                      <LinearProgress
                        variant="determinate"
                        value={70}
                        classes={{
                          root: classes.linearProgressRoot,
                          bar: classes.bgGradientSuccess,
                        }}
                      />
                    </Box>
                  </Box>
                </TableCell>
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
                  Google
                </TableCell>
                <TableCell classes={{ root: classes.tableCellRoot }}>
                  4,807
                </TableCell>
                <TableCell classes={{ root: classes.tableCellRoot }}>
                  <Box display="flex" alignItems="center">
                    <Box component="span" marginRight=".5rem">
                      80%
                    </Box>
                    <Box width="100%">
                      <LinearProgress
                        variant="determinate"
                        value={80}
                        classes={{
                          root: classes.linearProgressRoot,
                          bar: classes.bgGradientPrimary,
                        }}
                      />
                    </Box>
                  </Box>
                </TableCell>
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
                  Instagram
                </TableCell>
                <TableCell classes={{ root: classes.tableCellRoot }}>
                  3,678
                </TableCell>
                <TableCell classes={{ root: classes.tableCellRoot }}>
                  <Box display="flex" alignItems="center">
                    <Box component="span" marginRight=".5rem">
                      75%
                    </Box>
                    <Box width="100%">
                      <LinearProgress
                        variant="determinate"
                        value={75}
                        classes={{
                          root: classes.linearProgressRoot,
                          bar: classes.bgGradientInfo,
                        }}
                      />
                    </Box>
                  </Box>
                </TableCell>
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
                  twitter
                </TableCell>
                <TableCell
                  classes={{
                    root:
                      classes.tableCellRoot + " " + classes.borderBottomUnset,
                  }}
                >
                  2,645
                </TableCell>
                <TableCell
                  classes={{
                    root:
                      classes.tableCellRoot + " " + classes.borderBottomUnset,
                  }}
                >
                  <Box display="flex" alignItems="center">
                    <Box component="span" marginRight=".5rem">
                      30%
                    </Box>
                    <Box width="100%">
                      <LinearProgress
                        variant="determinate"
                        value={30}
                        classes={{
                          root: classes.linearProgressRoot,
                          bar: classes.bgGradientWarning,
                        }}
                      />
                    </Box>
                  </Box>
                </TableCell>
              </TableRow>
            </TableBody>
          </Box>
        </TableContainer>
      </Card>
    </>
  );
}

export default CardSocialTraffic;
