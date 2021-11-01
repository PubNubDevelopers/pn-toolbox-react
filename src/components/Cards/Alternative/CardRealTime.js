import React from "react";
// react plugin for creating vector maps
import { VectorMap } from "react-jvectormap";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";

// core components
import componentStyles from "assets/theme/components/cards/alternative/card-real-time.js";

const useStyles = makeStyles(componentStyles);

let mapData = {
  AU: 760,
  BR: 550,
  CA: 120,
  DE: 1300,
  FR: 540,
  GB: 690,
  GE: 200,
  IN: 200,
  RO: 600,
  RU: 300,
  US: 2920,
};

const items = [
  {
    image: require("assets/img/icons/flags/US.png").default,
    country: "United States",
    visits: "2500",
    bounce: "30%",
  },
  {
    image: require("assets/img/icons/flags/DE.png").default,
    country: "Germany",
    visits: "2500",
    bounce: "30%",
  },
  {
    image: require("assets/img/icons/flags/GB.png").default,
    country: "Great Britain",
    visits: "2500",
    bounce: "30%",
  },
];

function CardRealTime() {
  const classes = useStyles();
  return (
    <>
      <Card classes={{ root: classes.cardRoot }} elevation={0}>
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
                  <Box component="span">Real Time</Box>
                </Box>
              </Grid>
              <Grid item xs="auto">
                <Box justifyContent="flex-end" display="flex" flexWrap="wrap">
                  <Button
                    variant="contained"
                    size="small"
                    classes={{
                      root: classes.buttonRoot,
                    }}
                  >
                    Action
                  </Button>
                </Box>
              </Grid>
            </Grid>
          }
          classes={{ root: classes.cardHeaderRoot }}
        ></CardHeader>
        <CardContent classes={{ root: classes.cardContentRoot }}>
          <VectorMap
            containerClassName={classes.vectorMap}
            containerStyle={{
              width: "100%",
              height: "280px",
            }}
            map={"world_mill"}
            zoomOnScroll={false}
            scaleColors={["#f00", "#0071A4"]}
            normalizeFunction="polynomial"
            hoverOpacity={0.7}
            hoverColor={false}
            backgroundColor="transparent"
            regionStyle={{
              initial: {
                fill: "#e9ecef",
                "fill-opacity": 0.8,
                stroke: "none",
                "stroke-width": 0,
                "stroke-opacity": 1,
              },
              hover: {
                fill: "#dee2e6",
                "fill-opacity": 0.8,
                cursor: "pointer",
              },
              selected: {
                fill: "yellow",
              },
              selectedHover: {},
            }}
            markerStyle={{
              initial: {
                fill: "#fb6340",
                "stroke-width": 0,
              },
              hover: {
                fill: "#11cdef",
                "stroke-width": 0,
              },
            }}
            markers={[
              {
                latLng: [41.9, 12.45],
                name: "Vatican City",
              },
              {
                latLng: [43.73, 7.41],
                name: "Monaco",
              },
              {
                latLng: [35.88, 14.5],
                name: "Malta",
              },
              {
                latLng: [1.3, 103.8],
                name: "Singapore",
              },
              {
                latLng: [1.46, 173.03],
                name: "Kiribati",
              },
              {
                latLng: [-21.13, -175.2],
                name: "Tonga",
              },
              {
                latLng: [15.3, -61.38],
                name: "Dominica",
              },
              {
                latLng: [-20.2, 57.5],
                name: "Mauritius",
              },
              {
                latLng: [26.02, 50.55],
                name: "Bahrain",
              },
            ]}
            series={{
              regions: [
                {
                  values: mapData,
                  scale: ["#ced4da", "#adb5bd"],
                  normalizeFunction: "polynomial",
                },
              ],
            }}
          />
          <List disablePadding>
            {items.map((prop, key) => {
              return (
                <ListItem key={key} className={classes.listItemRoot}>
                  <Grid container component={Box} alignItems="center">
                    <Grid item xs="auto">
                      <img alt="..." className={classes.img} src={prop.image} />
                    </Grid>
                    <Grid
                      item
                      component={Box}
                      maxWidth="100%!important"
                      flexBasis="0!important"
                      flexGrow="1!important"
                    >
                      <Box component="small" fontSize="80%" fontWeight="400">
                        Country
                      </Box>
                      <Typography
                        component="h5"
                        variant="h5"
                        className={classes.mb0}
                      >
                        {prop.country}
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      component={Box}
                      maxWidth="100%!important"
                      flexBasis="0!important"
                      flexGrow="1!important"
                    >
                      <Box component="small" fontSize="80%" fontWeight="600">
                        Visits
                      </Box>
                      <Typography
                        component="h5"
                        variant="h5"
                        className={classes.mb0}
                      >
                        {prop.visits}
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      component={Box}
                      maxWidth="100%!important"
                      flexBasis="0!important"
                      flexGrow="1!important"
                    >
                      <Box component="small" fontSize="80%" fontWeight="600">
                        Bounce
                      </Box>
                      <Typography
                        component="h5"
                        variant="h5"
                        className={classes.mb0}
                      >
                        {prop.bounce}
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>
              );
            })}
          </List>
        </CardContent>
      </Card>
    </>
  );
}

export default CardRealTime;
