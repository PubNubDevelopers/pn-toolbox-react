import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";

// core components
import componentStyles from "assets/theme/components/cards/widgets/card-latest-messages.js";

const useStyles = makeStyles(componentStyles);

const members = [
  {
    image: require("assets/img/theme/team-1.jpg").default,
    name: "Tim",
    title: "New order for Argon Dashboard",
    description:
      "Doasdnec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.",
    time: "2 hrs ago",
  },
  {
    image: require("assets/img/theme/team-2.jpg").default,
    name: "Mike",
    title: "Your theme has been updated",
    description:
      "Doasdnec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.",
    time: "1 day ago",
  },
];

function CardLatestMessages() {
  const classes = useStyles();
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
        <CardContent classes={{ root: classes.cardContentRoot }}>
          <List disablePadding>
            {members.map((prop, key) => {
              return (
                <ListItem key={key} className={classes.listItemRoot}>
                  <Box display="flex" justifyContent="space-between">
                    <Box display="flex" alignItems="center">
                      <Avatar
                        alt="..."
                        src={prop.image}
                        classes={{
                          root: classes.avatarRoot,
                          img: classes.avatarImg,
                        }}
                      />
                      <Typography
                        variant="h5"
                        component="h5"
                        className={classes.typographyH5}
                      >
                        {prop.name}
                      </Typography>
                    </Box>
                    <Box fontSize="80%" fontWeight="400">
                      {prop.time}
                    </Box>
                  </Box>
                  <Typography
                    variant="h4"
                    component="h4"
                    className={classes.typographyH4}
                  >
                    {prop.title}
                  </Typography>
                  <Box
                    component="p"
                    marginBottom="0"
                    fontWeight="300"
                    lineHeight="1.7"
                    fontSize=".875rem"
                    marginTop="0"
                  >
                    {prop.description}
                  </Box>
                </ListItem>
              );
            })}
          </List>
        </CardContent>
      </Card>
    </>
  );
}

export default CardLatestMessages;
