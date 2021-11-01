import React from "react";
import clsx from "clsx";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Container from "@material-ui/core/Container";
import FilledInput from "@material-ui/core/FilledInput";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import Typography from "@material-ui/core/Typography";
// @material-ui/icons components
import Lock from "@material-ui/icons/Lock";
// core components
import AuthHeader from "components/Headers/AuthHeader.js";

import componentStyles from "assets/theme/views/auth/lock.js";
import componentStylesButtons from "assets/theme/components/button.js";
import boxShadows from "assets/theme/box-shadow.js";

const useStyles = makeStyles(componentStyles);
const useStylesButtons = makeStyles(componentStylesButtons);

function LockPage() {
  const classes = { ...useStyles(), ...useStylesButtons() };
  const theme = useTheme();
  return (
    <>
      <AuthHeader
        title="Lock screen"
        description="Better to be safe than sorry."
      ></AuthHeader>
      <Container
        component={Box}
        maxWidth="xl"
        marginTop="-8rem"
        paddingBottom="3rem"
        position="relative"
        zIndex="101"
      >
        <Box component={Grid} container justifyContent="center">
          <Grid item xs={12} md={7} lg={5}>
            <Card classes={{ root: classes.cardRoot }}>
              <Box component={Grid} container justifyContent="center">
                <Grid item xs={12} lg={3}>
                  <Box position="relative">
                    <Box
                      component="img"
                      src={
                        require("assets/img/theme/team-4-800x800.jpg").default
                      }
                      alt="..."
                      maxWidth="140px"
                      borderRadius="50%"
                      position="absolute"
                      left="50%"
                      border={"3px solid " + theme.palette.white.main}
                      boxShadow={boxShadows.boxShadow + "!important"}
                      className={classes.profileImage}
                    />
                  </Box>
                </Grid>
              </Box>
              <CardContent classes={{ root: classes.cardContent }}>
                <Typography
                  variant="h3"
                  component="h3"
                  className={classes.title}
                >
                  Jessica Jones
                </Typography>
                <FormControl
                  variant="filled"
                  component={Box}
                  width="100%"
                  marginBottom="1rem!important"
                >
                  <FilledInput
                    autoComplete="off"
                    type="password"
                    placeholder="Password"
                    startAdornment={
                      <InputAdornment position="start">
                        <Lock />
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <Button
                  variant="contained"
                  classes={{
                    root: clsx(classes.buttonContainedInfo, classes.buttonRoot),
                  }}
                >
                  Unlock
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Box>
      </Container>
    </>
  );
}

export default LockPage;
