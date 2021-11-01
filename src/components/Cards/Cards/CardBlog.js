import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
// @material-ui/icons components

// core components

import componentStyles from "assets/theme/components/cards/cards/card-header-list.js";
import componentStylesCardImg from "assets/theme/components/card-img.js";

const useStyles = makeStyles(componentStyles);
const useStylesCardImg = makeStyles(componentStylesCardImg);

function CardBlog() {
  const classes = { ...useStyles(), ...useStylesCardImg() };
  const theme = useTheme();
  return (
    <>
      <Card className={classes.cardRoot}>
        <img
          alt="..."
          src={require("assets/img/theme/img-1-1000x900.jpg").default}
          className={classes.cardImgTop}
        />
        <CardContent>
          <Box component={Typography} variant="h2" marginBottom="0!important">
            Get started with Argon
          </Box>
          <Box
            component="small"
            fontSize="80%"
            fontWeight="400"
            color={theme.palette.gray[600]}
          >
            by John Snow on Oct 29th at 10:23 AM
          </Box>
          <Box
            component="p"
            marginBottom="1rem"
            fontWeight="300"
            lineHeight="1.7"
            fontSize="1rem"
            marginTop="1.5rem"
          >
            Argon is a great free UI package based on Bootstrap 4 that includes
            the most important components and features.
          </Box>
          <Button
            variant="text"
            color="primary"
            disableRipple
            component={Box}
            padding="0!important"
          >
            View Article
          </Button>
        </CardContent>
      </Card>
    </>
  );
}

export default CardBlog;
