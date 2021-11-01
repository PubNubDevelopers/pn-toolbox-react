import React from "react";
import clsx from "clsx";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
// @material-ui/icons components
// core components

import componentStyles from "assets/theme/components/cards/cards/card-team-member-info.js";
import componentStylesButtons from "assets/theme/components/button.js";
import boxShadows from "assets/theme/box-shadow.js";

const useStylesButtons = makeStyles(componentStylesButtons);
const useStyles = makeStyles(componentStyles);

const socialButtonColors = [
  {
    icon: "fab fa-twitter",
    text: "Twitter",
    color: "buttonContainedTwitter",
  },
  {
    icon: "fab fa-facebook",
    text: "Facebook",
    color: "buttonContainedFacebook",
  },
  {
    icon: "fab fa-dribbble",
    text: "Dribbble",
    color: "buttonContainedDribbble",
  },
];

function CardProfileTeamMemberInfo() {
  const classes = { ...useStyles(), ...useStylesButtons() };
  return (
    <>
      <Card classes={{ root: classes.cardRoot }}>
        <CardContent>
          <Box
            component="img"
            src={require("assets/img/theme/team-1.jpg").default}
            alt="..."
            maxWidth="140px"
            borderRadius="50%"
            marginRight="auto"
            marginLeft="auto"
            display="block"
            boxShadow={boxShadows.boxShadow + "!important"}
            className={classes.profileImage}
          />
          <Box textAlign="center" paddingTop="1.5rem">
            <Typography variant="h3">Ryan Tompson</Typography>
            <Box
              component={Typography}
              variant="h5"
              fontWeight="300!important"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              Web Developer
            </Box>
            <Box marginTop="1rem">
              {socialButtonColors.map((prop, key) => (
                <Box key={key} display="inline-block" marginRight="1rem">
                  <IconButton
                    variant="contained"
                    classes={{
                      root: clsx(classes[prop.color], classes.buttonIconOnly),
                    }}
                  >
                    <Box fontSize="14px" component="i" className={prop.icon} />
                  </IconButton>
                </Box>
              ))}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </>
  );
}

export default CardProfileTeamMemberInfo;
