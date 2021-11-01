import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
// @material-ui/icons components
// core components
import componentStyles from "assets/theme/components/cards/dashboard/card-credit.js";
import componentStylesBadge from "assets/theme/components/badge.js";
const useStyles = makeStyles(componentStyles);
const useStylesBadge = makeStyles(componentStylesBadge);

export default function CardCredit() {
  const classes = { ...useStyles(), ...useStylesBadge() };
  return (
    <>
      <Card className={classes.cardRoot}>
        <CardContent>
          <Grid
            container
            component={Box}
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item xs="auto">
              <Box
                component="img"
                className={classes.boxImg}
                src={require("assets/img/icons/cards/bitcoin.png").default}
                alt="..."
              ></Box>
            </Grid>
            <Grid item xs="auto">
              <Badge
                badgeContent={"success"}
                classes={{
                  badge:
                    classes.badgePositionRelative +
                    " " +
                    classes.badgeSuccess +
                    " " +
                    classes.badgeSizeLg,
                }}
              ></Badge>
            </Grid>
          </Grid>
          <Box marginBottom="1.5rem" marginTop="1.5rem">
            <Typography
              variant="h6"
              component="span"
              className={classes.typographyH6}
            >
              Username
            </Typography>
            <Typography
              variant="h1"
              component="div"
              className={classes.typographyH1}
            >
              @johnsnow
            </Typography>
          </Box>
          <Grid container>
            <Grid item xs={12}>
              <Typography
                variant="h6"
                component="span"
                className={classes.typographyH6}
              >
                Name
              </Typography>
              <Typography
                variant="h3"
                component="span"
                className={classes.typographyH3}
              >
                John Snow
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
