import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";

// core components
import componentStyles from "assets/theme/components/cards/dashboard/card-progress-track.js";

const useStyles = makeStyles(componentStyles);

const items = [
  {
    image: require("assets/img/theme/bootstrap.jpg").default,
    name: "Argon Design System",
    color: "warning",
    value: 60,
  },
  {
    image: require("assets/img/theme/angular.jpg").default,
    name: "Angular Now UI Kit PRO",
    color: "success",
    value: 100,
  },
  {
    image: require("assets/img/theme/sketch.jpg").default,
    name: "Black Dashboard",
    color: "error",
    value: 72,
  },
  {
    image: require("assets/img/theme/react.jpg").default,
    name: "Material Dashboard React",
    color: "info",
    value: 90,
  },
];

function CardProgressTrack() {
  const classes = useStyles();
  return (
    <>
      <Card classes={{ root: classes.cardRoot }} elevation={0}>
        <CardHeader
          subheader="Progress Track"
          subheaderTypographyProps={{
            component: Box,
            variant: "h3",
            marginBottom: "0!important",
            color: "initial",
            className: classes.typographyRootH3,
          }}
        ></CardHeader>
        <CardContent classes={{ root: classes.cardContentRoot }}>
          <List disablePadding>
            {items.map((prop, key) => {
              return (
                <ListItem key={key} className={classes.listItemRoot}>
                  <Grid container component={Box} alignItems="center">
                    <Grid item xs="auto">
                      <Avatar alt="..." src={prop.image} />
                    </Grid>
                    <Grid item className={classes.gridItemRoot}>
                      <Typography variant="h5" component="h5">
                        {prop.name}
                      </Typography>
                      <Box width="100%">
                        <LinearProgress
                          variant="determinate"
                          value={prop.value}
                          classes={{
                            root: classes.linearProgressRoot,
                            bar: classes[prop.color + "LinearProgress"],
                          }}
                        />
                      </Box>
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

export default CardProgressTrack;
