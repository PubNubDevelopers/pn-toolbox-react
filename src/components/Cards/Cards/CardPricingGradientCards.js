import React from "react";
import clsx from "clsx";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
// @material-ui/icons components
import Backup from "@material-ui/icons/Backup";
import Brush from "@material-ui/icons/Brush";
import Notes from "@material-ui/icons/Notes";

// core components
import componentStyles from "assets/theme/components/cards/cards/card-pricing-gradient-cards.js";
import buttonsStyles from "assets/theme/components/button.js";

const useStyles = makeStyles(componentStyles);
const useStylesButtons = makeStyles(buttonsStyles);

function CardPricingGradientCards() {
  const classes = {
    ...useStyles(),
    ...useStylesButtons(),
  };
  const theme = useTheme();

  return (
    <>
      <Card
        className={clsx(classes.cardRoot, classes.cardRootGradientSuccess)}
        elevation={0}
      >
        <CardHeader
          title="Bravo pack"
          className={classes.bgInherit}
          titleTypographyProps={{
            className: classes.titleWhite,
            component: "h4",
            variant: "h4",
          }}
        ></CardHeader>
        <CardContent className={classes.cardContentRoot}>
          <Box className={classes.display2} color={theme.palette.white.main}>
            $49
          </Box>
          <Box component="span" color={theme.palette.white.main}>
            per application
          </Box>
          <Box
            component="ul"
            paddingLeft="0"
            className={classes.listStyleNone}
            margin="1.5rem 0"
          >
            <Box
              component="li"
              paddingTop=".5rem"
              paddingBottom=".5rem"
              display="flex"
              alignItems="center"
            >
              <div className={classes.iconWhite}>
                <Notes />
              </div>
              <Box paddingLeft=".5rem" color={theme.palette.white.main}>
                Complete documentation
              </Box>
            </Box>
            <Box
              component="li"
              paddingTop=".5rem"
              paddingBottom=".5rem"
              display="flex"
              alignItems="center"
            >
              <div className={classes.iconWhite}>
                <Brush />
              </div>
              <Box paddingLeft=".5rem" color={theme.palette.white.main}>
                Working materials in Sketch
              </Box>
            </Box>
            <Box
              component="li"
              paddingTop=".5rem"
              paddingBottom=".5rem"
              display="flex"
              alignItems="center"
            >
              <div className={classes.iconWhite}>
                <Backup />
              </div>
              <Box paddingLeft=".5rem" color={theme.palette.white.main}>
                2GB cloud storage
              </Box>
            </Box>
          </Box>
          <Box marginBottom="1rem" textAlign="center">
            <Button variant="contained" color="secondary">
              Start free trial
            </Button>
          </Box>
        </CardContent>
        <CardActions
          className={clsx(classes.cardActionsRoot, classes.bgInherit)}
        >
          <a
            href="#mui"
            onClick={(e) => e.preventDefault()}
            className={classes.whiteAnchor}
          >
            Request s demo
          </a>
        </CardActions>
      </Card>
    </>
  );
}

export default CardPricingGradientCards;
