import React from "react";
import clsx from "clsx";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
// @material-ui/icons components
import Code from "@material-ui/icons/Code";
import Notifications from "@material-ui/icons/Notifications";
import ThumbUp from "@material-ui/icons/ThumbUp";
import WatchLater from "@material-ui/icons/WatchLater";
// core components

import componentStyles from "assets/theme/components/cards/widgets/card-latest-notifications.js";
import componentStylesBadge from "assets/theme/components/badge.js";

const useStyles = makeStyles(componentStyles);
const useStylesBadge = makeStyles(componentStylesBadge);

const items = [
  {
    icon: Notifications,
    title: "New message",
    description: "Let's meet at Starbucks at 11:30. Wdyt?",
    time: "2 hrs ago",
    color: "Success",
  },
  {
    icon: Code,
    title: "Product issue",
    description: "A new issue has been reported for Argon.",
    time: "3 hrs ago",
    color: "Error",
  },
  {
    icon: ThumbUp,
    title: "New likes",
    description: "Your posts have been liked a lot.",
    time: "5 hrs ago",
    color: "Info",
  },
];

function CardLatestNotifications() {
  const classes = {
    ...useStyles(),
    ...useStylesBadge(),
  };
  const theme = useTheme();
  return (
    <>
      <Card className={classes.cardRoot}>
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
                  Latest notifications
                </Box>
              </Grid>
            </Grid>
          }
          classes={{ root: classes.cardHeaderRoot }}
        ></CardHeader>
        <CardContent>
          <div className={clsx(classes.timeline, classes.timelineOneSide)}>
            {items.map((prop, key) => (
              <div key={key} className={classes.timelineBlock}>
                <Badge
                  badgeContent={<prop.icon />}
                  color={prop.color === "Error" ? "error" : undefined}
                  classes={{
                    root: classes.timelineBadgeRoot,
                    badge: clsx(
                      classes.timelineBadge,
                      classes.badgePositionRelative,
                      {
                        [classes["badge" + prop.color]]: prop.color !== "Error",
                      }
                    ),
                  }}
                ></Badge>
                <div className={classes.timelineContent}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    paddingTop=".25rem"
                  >
                    <Box
                      component="span"
                      fontSize=".875rem"
                      fontWeight="600"
                      color={theme.palette.gray[600]}
                    >
                      {prop.title}
                    </Box>
                    <Box
                      component="small"
                      fontSize="80%"
                      fontWeight="600"
                      color={theme.palette.gray[600]}
                    >
                      <Box
                        component={WatchLater}
                        position="relative"
                        top="-2px"
                        marginRight=".5rem"
                      />
                      {prop.time}
                    </Box>
                  </Box>
                  <Typography
                    component="h6"
                    variant="h6"
                    className={classes.typographyH6}
                  >
                    {prop.description}
                  </Typography>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export default CardLatestNotifications;
