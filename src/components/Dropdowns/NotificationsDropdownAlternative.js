import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Menu from "@material-ui/core/Menu";
import Typography from "@material-ui/core/Typography";
// @material-ui/icons components
import Notifications from "@material-ui/icons/Notifications";

// core components
import componentStyles from "assets/theme/components/dropdowns/notifications-dropdown-alternative.js";

const useStyles = makeStyles(componentStyles);

const items = [
  {
    image: require("assets/img/theme/team-1-800x800.jpg").default,
    name: "John Snow",
    description: "Let's meet at Starbucks at 11:30. Wdyt?",
    time: "2 hrs ago",
  },
  {
    image: require("assets/img/theme/team-2-800x800.jpg").default,
    name: "John Snow",
    description: "A new issue has been reported for Argon.",
    time: "3 hrs ago",
  },
  {
    image: require("assets/img/theme/team-3-800x800.jpg").default,
    name: "John Snow",
    description: "Your posts have been liked a lot.",
    time: "4 hrs ago",
  },
  {
    image: require("assets/img/theme/team-4-800x800.jpg").default,
    name: "John Snow",
    description: "Let's meet at Starbucks at 11:30. Wdyt?",
    time: "5 hrs ago",
  },
  {
    image: require("assets/img/theme/team-1-800x800.jpg").default,
    name: "John Snow",
    description: "A new issue has been reported for Argon.",
    time: "6 hrs ago",
  },
];

export default function NotificationsDropdown() {
  const classes = useStyles();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = "dropdowns-notifications-dropdown-id";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      classes={{
        list: classes.menuList,
        paper: classes.menuPaper,
      }}
    >
      <Box padding="1rem">
        <Typography
          variant="h6"
          component="h6"
          className={classes.typographyH6}
        >
          You have{" "}
          <Box component="strong" color={theme.palette.info.main}>
            13
          </Box>{" "}
          notifications.
        </Typography>
      </Box>
      <List disablePadding>
        {items.map((prop, key) => {
          return (
            <ListItem key={key} className={classes.listItemRoot} component="a">
              <Grid container alignItems="center">
                <Box
                  flex="0 0 auto"
                  width="auto"
                  maxWidth="100%"
                  position="relative"
                  paddingRight="15px"
                  paddingLeft="15px"
                  minHeight="1px"
                >
                  <Avatar
                    alt="..."
                    src={prop.image}
                    classes={{
                      root: classes.avatarRoot,
                    }}
                  />
                </Box>
                <Box
                  flexBasis="0"
                  flexGrow="1"
                  width="100%;"
                  maxWidth="100%"
                  position="relative"
                  paddingRight="15px"
                  paddingLeft="15px"
                  minHeight="1px"
                >
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <div>
                      <Typography
                        variant="h4"
                        component="h4"
                        className={classes.typographyH4}
                      >
                        {prop.name}
                      </Typography>
                    </div>
                    <Box
                      textAlign="right"
                      color={theme.palette.gray[600]}
                      fontSize="80%"
                    >
                      {prop.time}
                    </Box>
                  </Box>
                  <Box
                    component="p"
                    fontSize=".875rem"
                    fontWeight="300"
                    lineHeight="1.7"
                    margin="0"
                  >
                    {prop.description}
                  </Box>
                </Box>
              </Grid>
            </ListItem>
          );
        })}
      </List>
      <Box
        component="a"
        href="#mui"
        padding=".5rem 1rem"
        fontSize=".875rem"
        color={theme.palette.info.main}
        fontWeight="600"
        textAlign="center"
        paddingBottom="1rem"
        paddingTop="1rem"
        display="block"
        className={classes.boxAnchor}
      >
        View all
      </Box>
    </Menu>
  );

  return (
    <>
      <IconButton
        aria-label="account of current user"
        aria-controls={menuId}
        aria-haspopup="true"
        onClick={handleProfileMenuOpen}
        classes={{
          label: classes.buttonLabel,
        }}
      >
        <Box
          component={Notifications}
          width="1rem!important"
          height="1rem!important"
        />
      </IconButton>
      {renderMenu}
    </>
  );
}
