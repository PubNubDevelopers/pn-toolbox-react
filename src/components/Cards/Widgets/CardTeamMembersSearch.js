import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
// @material-ui/icons components
import Search from "@material-ui/icons/Search";
// core components
import componentStyles from "assets/theme/components/cards/widgets/card-team-members-search.js";

const useStyles = makeStyles(componentStyles);

const members = [
  {
    image: require("assets/img/theme/team-1.jpg").default,
    name: "John Michael",
    status: "Online",
    color: "success",
  },
  {
    image: require("assets/img/theme/team-2.jpg").default,
    name: "Alex Smith",
    status: "In a meeting",
    color: "warning",
  },
  {
    image: require("assets/img/theme/team-3.jpg").default,
    name: "Samantha Ivy",
    status: "Offline",
    color: "error",
  },
  {
    image: require("assets/img/theme/team-4.jpg").default,
    name: "John Michelle",
    status: "Online",
    color: "success",
  },
  {
    image: require("assets/img/theme/team-1.jpg").default,
    name: "John Snow",
    status: "Online",
    color: "success",
  },
];

function CardTeamMembersSearch() {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <>
      <Card classes={{ root: classes.cardRoot }} elevation={0}>
        <CardHeader
          subheader="Team members"
          subheaderTypographyProps={{
            component: Box,
            variant: "h3",
            marginBottom: "0!important",
            color: "initial",
          }}
        ></CardHeader>
        <CardHeader
          subheader={
            <>
              <Box display="flex">
                <IconButton type="submit" aria-label="search">
                  <Box
                    component={Search}
                    width="1.25rem!important"
                    height="1.25rem!important"
                  />
                </IconButton>
                <InputBase
                  classes={{
                    root: classes.inputBaseRoot,
                    input: classes.inputBaseInput,
                  }}
                  placeholder="Search"
                  inputProps={{ "aria-label": "search google maps" }}
                />
              </Box>
            </>
          }
          classes={{
            root: classes.py1,
          }}
        ></CardHeader>
        <CardContent classes={{ root: classes.cardContentRoot }}>
          <List disablePadding>
            {members.map((prop, key) => {
              return (
                <ListItem key={key} className={classes.listItemRoot}>
                  <Grid container component={Box} alignItems="center">
                    <Grid item xs="auto">
                      <Avatar alt="..." src={prop.image} />
                    </Grid>
                    <Grid item className={classes.gridItemRoot}>
                      <Typography
                        variant="h4"
                        component="h4"
                        className={classes.mb0}
                      >
                        {prop.name}
                      </Typography>
                      <Box
                        color={theme.palette[prop.color].main}
                        component="span"
                      >
                        ●
                      </Box>
                      <Box fontSize="80%" fontWeight="400" component="small">
                        {prop.status}
                      </Box>
                    </Grid>
                    <Grid item xs="auto">
                      <Button size="small" variant="contained" color="primary">
                        Add
                      </Button>
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

export default CardTeamMembersSearch;
