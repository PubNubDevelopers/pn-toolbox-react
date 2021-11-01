import React from "react";
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
import LocationOn from "@material-ui/icons/LocationOn";
import School from "@material-ui/icons/School";
// core components

import componentStyles from "assets/theme/components/cards/profile/card-profile.js";
import componentStylesCardImg from "assets/theme/components/card-img.js";
import boxShadows from "assets/theme/box-shadow.js";

const useStyles = makeStyles(componentStyles);
const useStylesCardImg = makeStyles(componentStylesCardImg);

function CardProfile() {
  const classes = { ...useStyles(), ...useStylesCardImg() };
  const theme = useTheme();
  return (
    <>
      <Card classes={{ root: classes.cardRoot }}>
        <img
          alt="..."
          src={require("assets/img/theme/img-1-1000x600.jpg").default}
          className={classes.cardImgTop}
        />
        <Box component={Grid} container justifyContent="center">
          <Grid item xs={12} lg={3}>
            <Box
              component="img"
              src={require("assets/img/theme/team-4-800x800.jpg").default}
              alt="..."
              maxWidth="140px"
              borderRadius="50%"
              position="absolute"
              left="50%"
              border={"3px solid " + theme.palette.white.main}
              boxShadow={boxShadows.boxShadow + "!important"}
              className={classes.profileImage}
            />
          </Grid>
        </Box>
        <Box
          component={CardHeader}
          border="0!important"
          textAlign="center"
          paddingBottom="0!important"
          paddingTop="8rem!important"
          classes={{ root: classes.cardHeaderRootProfile }}
          subheader={
            <Box display="flex" justifyContent="space-between">
              <Button
                variant="contained"
                size="small"
                classes={{ root: classes.buttonRootInfo }}
              >
                Connect
              </Button>
              <Button
                variant="contained"
                size="small"
                classes={{ root: classes.buttonRootDark }}
              >
                Message
              </Button>
            </Box>
          }
        ></Box>
        <Box
          component={CardContent}
          classes={{ root: classes.cardContentRoot }}
          paddingTop="0!important"
        >
          <Grid container>
            <Grid item xs={12}>
              <Box padding="1rem 0" justifyContent="center" display="flex">
                <Box textAlign="center" marginRight="1rem" padding=".875rem">
                  <Box
                    component="span"
                    fontSize="1.1rem"
                    fontWeight="700"
                    display="block"
                    letterSpacing=".025em"
                    className={classes.typographyRootH6}
                  >
                    22
                  </Box>
                  <Box
                    component="span"
                    fontSize=".875rem"
                    color={theme.palette.gray[500]}
                  >
                    Friends
                  </Box>
                </Box>
                <Box textAlign="center" marginRight="1rem" padding=".875rem">
                  <Box
                    component="span"
                    fontSize="1.1rem"
                    fontWeight="700"
                    display="block"
                    letterSpacing=".025em"
                    className={classes.typographyRootH6}
                  >
                    10
                  </Box>
                  <Box
                    component="span"
                    fontSize=".875rem"
                    color={theme.palette.gray[500]}
                  >
                    Photos
                  </Box>
                </Box>
                <Box textAlign="center" padding=".875rem">
                  <Box
                    component="span"
                    fontSize="1.1rem"
                    fontWeight="700"
                    display="block"
                    letterSpacing=".025em"
                    className={classes.typographyRootH6}
                  >
                    89
                  </Box>
                  <Box
                    component="span"
                    fontSize=".875rem"
                    color={theme.palette.gray[500]}
                  >
                    Comments
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Box textAlign="center">
            <Typography variant="h3">
              Jessica Jones
              <Box component="span" fontWeight="300">
                , 27
              </Box>
            </Typography>
            <Box
              component={Typography}
              variant="h5"
              fontWeight="300!important"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Box
                component={LocationOn}
                width="1.25rem!important"
                height="1.25rem!important"
              ></Box>
              Bucharest, Romania
            </Box>
            <Box component={Typography} variant="h5" marginTop="2rem!important">
              Solution Manager - Creative Tim Officer
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              fontSize="1rem"
            >
              <Box
                component={School}
                width="1.25rem!important"
                height="1.25rem!important"
                marginRight=".5rem"
              ></Box>
              University of Computer Science
            </Box>
          </Box>
        </Box>
      </Card>
    </>
  );
}

export default CardProfile;
