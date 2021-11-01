import React from "react";
import clsx from "clsx";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Divider from "@material-ui/core/Divider";
import FormGroup from "@material-ui/core/FormGroup";
import Grid from "@material-ui/core/Grid";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
// @material-ui/lab components
import AvatarGroup from "@material-ui/lab/AvatarGroup";
// @material-ui/icons components
import Add from "@material-ui/icons/Add";
import ModeComment from "@material-ui/icons/ModeComment";
import Share from "@material-ui/icons/Share";
import ThumbUp from "@material-ui/icons/ThumbUp";
// core components
import componentStyles from "assets/theme/components/cards/dashboard/card-activity-feed.js";

const useStyles = makeStyles(componentStyles);

const AvatarGroupComponent = () => {
  const classes = useStyles();
  return (
    <>
      <AvatarGroup>
        <Tooltip title="Ryan Tompson" placement="top">
          <Avatar
            classes={{ root: classes.avatarRootXS }}
            alt="..."
            src={require("assets/img/theme/team-1-800x800.jpg").default}
          />
        </Tooltip>
        <Tooltip title="Romina Hadid" placement="top">
          <Avatar
            classes={{ root: classes.avatarRootXS }}
            alt="..."
            src={require("assets/img/theme/team-2-800x800.jpg").default}
          />
        </Tooltip>
        <Tooltip title="Alexander Smith" placement="top">
          <Avatar
            classes={{ root: classes.avatarRootXS }}
            alt="..."
            src={require("assets/img/theme/team-3-800x800.jpg").default}
          />
        </Tooltip>
      </AvatarGroup>
    </>
  );
};

export default function CardActivityFeed() {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <>
      <Card classes={{ root: classes.cardRoot }}>
        <CardHeader
          className={classes.cardHeader}
          title="Activity feed"
          titleTypographyProps={{
            component: Box,
            marginBottom: "0!important",
            variant: "h3",
          }}
        ></CardHeader>
        <CardHeader
          className={classes.cardHeader}
          subheader={
            <>
              <Box display="flex" alignItems="center">
                <Avatar
                  alt="..."
                  src={require("assets/img/theme/team-1-800x800.jpg").default}
                  classes={{
                    root: classes.avatarRounded,
                    img: classes.avatarRounded,
                  }}
                />
                <Box marginRight="1rem" marginLeft="1rem">
                  <Box
                    fontSize=".875rem"
                    fontWeight="600"
                    color={theme.palette.gray[900]}
                  >
                    John Snow
                  </Box>
                  <Box
                    component="small"
                    display="block"
                    fontSize="80%"
                    fontWeight="400"
                    color={theme.palette.gray[600]}
                  >
                    3 days ago
                  </Box>
                </Box>
              </Box>
              <Box textAlign="right" marginLeft="auto">
                <Button color="primary" variant="contained" size="small">
                  <Box
                    component={Add}
                    marginRight=".5rem"
                    position="relative"
                    top="-1px"
                  />{" "}
                  Follow
                </Button>
              </Box>
            </>
          }
          subheaderTypographyProps={{
            component: "div",
            className: classes.cardHeaderSecond,
          }}
        ></CardHeader>
        <CardContent>
          <Box
            component="p"
            marginBottom="1.5rem"
            fontWeight="300"
            lineHeight="1.7"
            fontSize="1rem"
            marginTop="0"
          >
            Personal profiles are the perfect way for you to grab their
            attention and persuade recruiters to continue reading your CV
            because you’re telling them from the off exactly why they should
            hire you.
          </Box>
          <Box
            component="img"
            alt="..."
            borderRadius=".375rem"
            maxWidth="100%"
            height="auto"
            className={classes.boxImg}
            src={require("assets/img/theme/img-1-1000x600.jpg").default}
          />
          <Grid
            container
            component={Box}
            alignItems="center"
            paddingBottom="1rem"
            marginTop="1rem"
            marginBottom="1rem"
            borderBottom={"1px solid " + theme.palette.gray[200]}
          >
            <Grid item xs={12} sm={6}>
              <div>
                <a
                  href="#mui"
                  onClick={(e) => e.preventDefault}
                  className={clsx(classes.anchor, classes.primaryColor)}
                >
                  <Box component={ThumbUp} position="relative" />
                  <Box
                    component="span"
                    color={theme.palette.gray[600]}
                    fontWeight="600"
                    marginLeft="7px"
                  >
                    150
                  </Box>
                </a>
                <a
                  href="#mui"
                  onClick={(e) => e.preventDefault}
                  className={classes.anchor}
                >
                  <Box component={ModeComment} position="relative" />
                  <Box
                    component="span"
                    color={theme.palette.gray[600]}
                    fontWeight="600"
                    marginLeft="7px"
                  >
                    36
                  </Box>
                </a>
                <a
                  href="#mui"
                  onClick={(e) => e.preventDefault}
                  className={classes.anchor}
                >
                  <Box component={Share} position="relative" />
                  <Box
                    component="span"
                    color={theme.palette.gray[600]}
                    fontWeight="600"
                    marginLeft="7px"
                  >
                    12
                  </Box>
                </a>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} className={classes.dNoneDSmBlock}>
              <Box
                display="flex"
                alignItems="center"
                className={classes.justifyContentSmEnd}
              >
                <AvatarGroupComponent />
                <Box
                  paddingLeft=".5rem"
                  fontWeight="600"
                  component="small"
                  fontSize="80%"
                >
                  and 30+ more
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Box marginBottom=".25rem">
            <Box
              marginTop="2rem"
              display="flex"
              alignItems="flex-start"
              className={classes.mediaRoot}
            >
              <Avatar
                classes={{ root: classes.avatarRootMedia }}
                alt="..."
                src={require("assets/img/theme/team-1-800x800.jpg").default}
              />
              <Box display="flex" alignItems="flex-start">
                <Box
                  borderRadius=".4375rem"
                  position="relative"
                  className={classes.mediaComment}
                  padding="1rem 1.25rem 1rem 2.5rem"
                >
                  <Typography variant="h5" component="h6">
                    Michael Lewis
                  </Typography>
                  <Box
                    component="p"
                    marginBottom="1rem"
                    fontWeight="300"
                    lineHeight="1.6"
                    fontSize=".875rem"
                    marginTop="0"
                  >
                    Cras sit amet nibh libero nulla vel metus scelerisque ante
                    sollicitudin. Cras purus odio vestibulum in vulputate
                    viverra turpis.
                  </Box>
                  <div>
                    <a
                      href="#mui"
                      onClick={(e) => e.preventDefault}
                      className={clsx(classes.anchor, classes.primaryColor)}
                    >
                      <Box component={ThumbUp} position="relative" />
                      <Box
                        component="span"
                        color={theme.palette.gray[600]}
                        fontWeight="600"
                        marginLeft="7px"
                      >
                        3 likes
                      </Box>
                    </a>
                    <a
                      href="#mui"
                      onClick={(e) => e.preventDefault}
                      className={classes.anchor}
                    >
                      <Box component={Share} position="relative" />
                      <Box
                        component="span"
                        color={theme.palette.gray[600]}
                        fontWeight="600"
                        marginLeft="7px"
                      >
                        2 shares
                      </Box>
                    </a>
                  </div>
                </Box>
              </Box>
            </Box>
            <Box
              marginTop="2rem"
              display="flex"
              alignItems="flex-start"
              className={classes.mediaRoot}
            >
              <Avatar
                classes={{ root: classes.avatarRootMedia }}
                alt="..."
                src={require("assets/img/theme/team-2-800x800.jpg").default}
              />
              <Box display="flex" alignItems="flex-start">
                <Box
                  borderRadius=".4375rem"
                  position="relative"
                  className={classes.mediaComment}
                  padding="1rem 1.25rem 1rem 2.5rem"
                >
                  <Typography variant="h5" component="h6">
                    Jessica Stones
                  </Typography>
                  <Box
                    component="p"
                    marginBottom="1rem"
                    fontWeight="300"
                    lineHeight="1.6"
                    fontSize=".875rem"
                    marginTop="0"
                  >
                    Cras sit amet nibh libero nulla vel metus scelerisque ante
                    sollicitudin. Cras purus odio vestibulum in vulputate
                    viverra turpis.
                  </Box>
                  <div>
                    <a
                      href="#mui"
                      onClick={(e) => e.preventDefault}
                      className={clsx(classes.anchor, classes.primaryColor)}
                    >
                      <Box component={ThumbUp} position="relative" />
                      <Box
                        component="span"
                        color={theme.palette.gray[600]}
                        fontWeight="600"
                        marginLeft="7px"
                      >
                        10 likes
                      </Box>
                    </a>
                    <a
                      href="#mui"
                      onClick={(e) => e.preventDefault}
                      className={classes.anchor}
                    >
                      <Box component={Share} position="relative" />
                      <Box
                        component="span"
                        color={theme.palette.gray[600]}
                        fontWeight="600"
                        marginLeft="7px"
                      >
                        1 share
                      </Box>
                    </a>
                  </div>
                </Box>
              </Box>
            </Box>
            <Box
              component={Divider}
              marginTop="2rem!important"
              marginBottom="2rem!important"
            />
            <Box
              marginTop="2rem"
              display="flex"
              alignItems="center"
              className={classes.mediaRoot}
            >
              <Avatar
                classes={{ root: classes.avatarRootMediaComment }}
                alt="..."
                src={require("assets/img/theme/team-3-800x800.jpg").default}
              />
              <Box flex="1 1">
                <Box component={FormGroup} marginBottom="0!important">
                  <OutlinedInput
                    fullWidth
                    multiline
                    rows="1"
                    placeholder="Write your comment"
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </>
  );
}
