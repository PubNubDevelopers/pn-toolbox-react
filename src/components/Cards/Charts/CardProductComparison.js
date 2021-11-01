import React from "react";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Bar } from "react-chartjs-2";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
// @material-ui/icons components

// core components

import { chartOptions, parseOptions, chartExample7 } from "variables/charts.js";

import componentStyles from "assets/theme/components/cards/charts/card-product-comparison.js";

const useStyles = makeStyles(componentStyles);

function CardProductComparison() {
  const classes = useStyles();
  const theme = useTheme();
  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }
  return (
    <>
      <Card
        classes={{
          root: classes.cardRoot,
        }}
      >
        <CardHeader
          title={
            <Box component="span" color={theme.palette.gray[600]}>
              Overview
            </Box>
          }
          subheader="Product comparison"
          classes={{ root: classes.cardHeaderRoot }}
          titleTypographyProps={{
            component: Box,
            variant: "h6",
            letterSpacing: "2px",
            marginBottom: "0!important",
            classes: {
              root: classes.textUppercase,
            },
          }}
          subheaderTypographyProps={{
            component: Box,
            variant: "h3",
            marginBottom: "0!important",
            color: "initial",
          }}
        ></CardHeader>
        <CardContent>
          <Box position="relative" height="350px">
            <Bar
              data={chartExample7.data}
              options={chartExample7.options}
              getDatasetAtEvent={(e) => console.log(e)}
            />
          </Box>
        </CardContent>
      </Card>
    </>
  );
}

export default CardProductComparison;
