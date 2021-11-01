import React from "react";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line } from "react-chartjs-2";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
// @material-ui/icons components

// core components

import { chartOptions, parseOptions, chartExample1 } from "variables/charts.js";

import componentStyles from "assets/theme/components/cards/dashboard/card-sales-value.js";

const useStyles = makeStyles(componentStyles);

function CardSalesValue() {
  const classes = useStyles();
  const theme = useTheme();
  const [activeNav, setActiveNav] = React.useState(1);
  const [chartExample1Data, setChartExample1Data] = React.useState("data1");

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const toggleNavs = (index) => {
    setActiveNav(index);
    setChartExample1Data("data" + index);
  };
  return (
    <>
      <Card
        classes={{
          root: classes.cardRoot + " " + classes.cardRootBgGradient,
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
                  variant="h6"
                  letterSpacing=".0625rem"
                  marginBottom=".25rem!important"
                  className={classes.textUppercase}
                >
                  <Box component="span" color={theme.palette.gray[400]}>
                    Overview
                  </Box>
                </Box>
                <Box
                  component={Typography}
                  variant="h2"
                  marginBottom="0!important"
                >
                  <Box component="span" color={theme.palette.white.main}>
                    Sales value
                  </Box>
                </Box>
              </Grid>
              <Grid item xs="auto">
                <Box justifyContent="flex-end" display="flex" flexWrap="wrap">
                  <Button
                    variant="contained"
                    color="primary"
                    component={Box}
                    marginRight="1rem!important"
                    onClick={() => toggleNavs(1)}
                    classes={{
                      root: activeNav === 1 ? "" : classes.buttonRootUnselected,
                    }}
                  >
                    Month
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => toggleNavs(2)}
                    classes={{
                      root: activeNav === 2 ? "" : classes.buttonRootUnselected,
                    }}
                  >
                    Week
                  </Button>
                </Box>
              </Grid>
            </Grid>
          }
          classes={{ root: classes.cardHeaderRoot }}
        ></CardHeader>
        <CardContent>
          <Box position="relative" height="350px">
            <Line
              data={chartExample1[chartExample1Data]}
              options={chartExample1.options}
              getDatasetAtEvent={(e) => console.log(e)}
            />
          </Box>
        </CardContent>
      </Card>
    </>
  );
}

export default CardSalesValue;
