import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";
// import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

// core components
import componentStyles from "assets/theme/components/cards/alternative/card-info-bg.js";

const useStyles = makeStyles(componentStyles);

function CardInfoBg({
  subtitle,
  title,
  color,
  rightAction,
  bottomAction,
  progressValue,
  progressColor,
}) {
  const classes = useStyles();
  return (
    <>
      <Card className={classes[color + "Card"]} elevation={0}>
        <CardContent>
          <Grid container>
            <Grid
              item
              component={Box}
              flexBasis="0"
              flexGrow="1"
              maxWidth="100%"
            >
              <Typography
                variant="h5"
                component="h5"
                className={classes.typographyH5}
              >
                {subtitle}
              </Typography>
              <Typography
                variant="h2"
                component="span"
                className={classes.typographyH2}
              >
                {title}
              </Typography>
              <Box marginTop="1rem">
                <LinearProgress
                  variant="determinate"
                  value={progressValue}
                  classes={{
                    root: classes.linearProgressRoot,
                    bar: classes[progressColor + "Progress"],
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs="auto">
              {rightAction}
            </Grid>
          </Grid>
          <Box
            component="p"
            fontSize=".875rem"
            marginBottom="0"
            marginTop="1rem"
            lineHeight="1.7"
            fontWeight="300"
          >
            {bottomAction}
          </Box>
        </CardContent>
      </Card>
    </>
  );
}

CardInfoBg.propTypes = {
  subtitle: PropTypes.string,
  title: PropTypes.string,
  color: PropTypes.oneOf([
    "primary",
    "info",
    "error",
    "warning",
    "default",
    "success",
  ]),
  rightAction: PropTypes.node,
  bottomAction: PropTypes.node,
  progressValue: PropTypes.number,
  progressColor: PropTypes.oneOf([
    "primary",
    "info",
    "error",
    "warning",
    "default",
    "success",
  ]),
};

export default CardInfoBg;
