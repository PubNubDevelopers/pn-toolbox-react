import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
// @material-ui/icons components

// core components

import componentStyles from "assets/theme/components/cards/cards/card-button.js";

const useStyles = makeStyles(componentStyles);

function CardButton() {
  const classes = useStyles();
  return (
    <>
      <Card className={classes.cardRoot}>
        <CardContent>
          <Box
            component={Typography}
            variant="h3"
            marginBottom="1rem!important"
          >
            Card title
          </Box>
          <Box
            component="p"
            marginBottom="1rem"
            fontWeight="300"
            lineHeight="1.7"
            fontSize="1rem"
            marginTop="0"
          >
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis
            non dolore est fuga nobis ipsum illum eligendi nemo iure repellat,
            soluta, optio minus ut reiciendis voluptates enim impedit veritatis
            officiis.
          </Box>
          <Button variant="contained" color="primary">
            Go somewhere
          </Button>
        </CardContent>
      </Card>
    </>
  );
}

export default CardButton;
