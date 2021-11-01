import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
// import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

// core components
import componentStyles from "assets/theme/components/cards/cards/card-testimonial.js";

const useStyles = makeStyles(componentStyles);

function CardTestimonial() {
  const classes = { ...useStyles() };
  const theme = useTheme();
  return (
    <>
      <Card className={classes.cardRoot}>
        <CardContent>
          <Typography
            variant="h3"
            component="h3"
            className={classes.typographyH3}
          >
            Testimonial
          </Typography>
          <Box
            component="blockquote"
            fontSize="1.25rem"
            margin="0"
            color={theme.palette.white.main}
          >
            <Box
              component="p"
              marginBottom="1rem"
              fontWeight="300"
              lineHeight="1.7"
              fontSize="1rem"
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              posuere erat a ante.
            </Box>
            <Box
              component="footer"
              fontSize="80%"
              display="block"
              color={theme.palette.error.main}
            >
              — Someone famous in{" "}
              <Box component="cite" title="Source Title">
                Source Title
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </>
  );
}

export default CardTestimonial;
