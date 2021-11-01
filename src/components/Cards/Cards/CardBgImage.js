import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
// import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

// core components
import componentStyles from "assets/theme/components/cards/cards/card-bg-image.js";
import componentStylesCardImg from "assets/theme/components/card-img.js";

const useStyles = makeStyles(componentStyles);
const useStylesCardImg = makeStyles(componentStylesCardImg);

function CardBgImage() {
  const classes = { ...useStyles(), ...useStylesCardImg() };
  return (
    <>
      <Card className={classes.cardRoot}>
        <img
          alt="..."
          className={classes.cardImgTop}
          src={require("assets/img/theme/img-1-1000x600.jpg").default}
        />
        <Box
          display="flex"
          alignItems="center"
          className={classes.cardImgOverlay}
        >
          <div>
            <Typography variant="h2" className={classes.typographyH2}>
              Card title
            </Typography>
            <Box
              component="p"
              marginBottom="1rem"
              fontWeight="300"
              lineHeight="1.7"
              fontSize="1rem"
              marginTop="0"
            >
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </Box>
            <Box
              component="p"
              marginBottom="0"
              fontWeight="600"
              lineHeight="1.7"
              fontSize=".875rem"
              marginTop="0"
            >
              Last updated 3 mins ago
            </Box>
          </div>
        </Box>
      </Card>
    </>
  );
}

export default CardBgImage;
