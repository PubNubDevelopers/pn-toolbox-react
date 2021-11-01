import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// @material-ui/icons components

// core components

import componentStyles from "assets/theme/components/cards/cards/card-header-list.js";
import componentStylesCardImg from "assets/theme/components/card-img.js";

const useStyles = makeStyles(componentStyles);
const useStylesCardImg = makeStyles(componentStylesCardImg);

function CardHeaderList() {
  const classes = { ...useStyles(), ...useStylesCardImg() };
  return (
    <>
      <Card className={classes.cardRoot}>
        <img
          alt="..."
          src={require("assets/img/theme/img-1-1000x600.jpg").default}
          className={classes.cardImgTop}
        />
        <List disablePadding>
          <ListItem className={classes.listItemRoot}>Cras justo odio</ListItem>
          <ListItem className={classes.listItemRoot}>
            Dapibus ac facilisis in
          </ListItem>
          <ListItem className={classes.listItemRoot}>
            Vestibulum at eros
          </ListItem>
        </List>
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

export default CardHeaderList;
