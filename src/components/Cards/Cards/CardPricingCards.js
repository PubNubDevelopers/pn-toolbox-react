import React from "react";
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
import componentStyles from "assets/theme/components/cards/cards/card-pricing-cards.js";

const useStyles = makeStyles(componentStyles);

function CardPricingCards() {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <>
      <Card className={classes.cardRoot} elevation={0}>
        <CardHeader
          title="Bravo pack"
          titleTypographyProps={{
            className: classes.titleInfo,
            component: "h4",
            variant: "h4",
          }}
        ></CardHeader>
        <CardContent className={classes.cardContentRoot}>
          <div className={classes.display2}>$49</div>
          <Box component="span" color={theme.palette.gray[600]}>
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
              <div className={classes.iconInfo}>
                <Notes />
              </div>
              <Box paddingLeft=".5rem" color={theme.palette.gray[600]}>
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
              <div className={classes.iconInfo}>
                <Brush />
              </div>
              <Box paddingLeft=".5rem" color={theme.palette.gray[600]}>
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
              <div className={classes.iconInfo}>
                <Backup />
              </div>
              <Box paddingLeft=".5rem" color={theme.palette.gray[600]}>
                2GB cloud storage
              </Box>
            </Box>
          </Box>
          <Box marginBottom="1rem" textAlign="center">
            <Button variant="contained" color="primary">
              Start free trial
            </Button>
          </Box>
        </CardContent>
        <CardActions className={classes.cardActionsRoot}>
          <a
            href="#mui"
            onClick={(e) => e.preventDefault()}
            className={classes.mutedAnchor}
          >
            Request demo
          </a>
        </CardActions>
      </Card>
    </>
  );
}

export default CardPricingCards;
