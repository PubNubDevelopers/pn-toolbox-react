import React from "react";
import clsx from "clsx";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
// import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";

// core components
import componentStyles from "assets/theme/components/cards/dashboard/card-to-do-list.js";

const useStyles = makeStyles(componentStyles);

function CardToDoList() {
  const classes = useStyles();
  const [state, setState] = React.useState([
    {
      name: "Call with Dave",
      time: "10:30 AM",
      checked: true,
      color: "success",
    },
    {
      name: "Launch meeting",
      time: "10:30 AM",
      checked: false,
      color: "warning",
    },
    {
      name: "Argon Dashboard Launch",
      time: "10:30 AM",
      checked: false,
      color: "info",
    },
    {
      name: "Winter Hackathon",
      time: "10:30 AM",
      checked: true,
      color: "error",
    },
  ]);
  return (
    <>
      <Card classes={{ root: classes.cardRoot }} elevation={0}>
        <CardHeader
          subheader="To do list"
          subheaderTypographyProps={{
            component: Box,
            variant: "h3",
            marginBottom: "0!important",
            color: "initial",
          }}
        ></CardHeader>
        <CardContent classes={{ root: classes.cardContentRoot }}>
          <List disablePadding>
            {state.map((prop, key) => {
              return (
                <ListItem key={key} className={classes.listItemRoot}>
                  <Grid container component={Box} alignItems="center">
                    <Grid
                      item
                      className={clsx(
                        classes.gridItemRoot,
                        classes[prop.color + "GridItemRoot"]
                      )}
                    >
                      <Typography
                        variant="h5"
                        component="h5"
                        className={clsx(classes.mb0, {
                          [classes.lineThrough]: prop.checked,
                        })}
                      >
                        {prop.name}
                      </Typography>
                      <Box
                        fontSize="80%"
                        fontWeight="400"
                        component="small"
                        className={clsx({
                          [classes.lineThrough]: prop.checked,
                        })}
                      >
                        {prop.time}
                      </Box>
                    </Grid>
                    <Grid item xs="auto">
                      <Checkbox
                        checked={prop.checked}
                        onChange={() => {
                          let newState = state.map((stateProp, stateKey) => {
                            if (key === stateKey) {
                              return {
                                key: stateKey,
                                ...stateProp,
                                checked: !prop.checked,
                              };
                            }
                            return stateProp;
                          });
                          setState(newState);
                        }}
                        inputProps={{ "aria-label": "primary checkbox" }}
                        classes={{ checked: classes[prop.color + "Checkbox"] }}
                      />
                    </Grid>
                  </Grid>
                </ListItem>
              );
            })}
          </List>
        </CardContent>
      </Card>
    </>
  );
}

export default CardToDoList;
