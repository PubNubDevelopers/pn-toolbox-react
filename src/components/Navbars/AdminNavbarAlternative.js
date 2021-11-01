import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import Toolbar from "@material-ui/core/Toolbar";
// @material-ui/icons components
import Clear from "@material-ui/icons/Clear";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import ZoomIn from "@material-ui/icons/ZoomIn";

// core components
import AppsDropdownAlternative from "components/Dropdowns/AppsDropdownAlternative.js";
import NotificationsDropdownAlternative from "components/Dropdowns/NotificationsDropdownAlternative.js";
import UserDropdownAlternative from "components/Dropdowns/UserDropdownAlternative.js";

import componentStyles from "assets/theme/components/navbars/admin-navbar-alternative.js";

const useStyles = makeStyles(componentStyles);

export default function AdminNavbarAlternative({ openSidebarResponsive }) {
  const classes = useStyles();
  const [showSearch, setShowSearch] = React.useState(false);
  return (
    <>
      <AppBar
        position="relative"
        elevation={0}
        classes={{ root: classes.appBarRoot }}
      >
        <Toolbar disableGutters>
          <Container
            maxWidth={false}
            component={Box}
            classes={{ root: classes.containerRoot }}
          >
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              width="100%"
              marginTop="1rem"
              marginBottom="1rem"
            >
              <Box
                display="flex"
                alignItems="center"
                width="auto"
                marginRight="1rem"
                className={clsx(classes.searchBox, {
                  [classes.searchBoxShow]: showSearch,
                })}
              >
                <SearchIcon className={classes.searchIcon} />
                <InputBase
                  placeholder="Search"
                  classes={{
                    input: classes.searchInput,
                  }}
                />
                <Hidden smUp implementation="css">
                  <Clear
                    className={classes.searchClose}
                    onClick={() => setShowSearch(false)}
                  />
                </Hidden>
              </Box>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                marginLeft="auto"
                className={clsx(classes.marginLeftNone, {
                  [classes.displayNone]: showSearch,
                })}
              >
                <Hidden xlUp implementation="css">
                  <IconButton onClick={openSidebarResponsive}>
                    <Box
                      component={MenuIcon}
                      width="1.5rem!important"
                      height="1.5rem!important"
                    />
                  </IconButton>
                </Hidden>
                <Hidden smUp implementation="css">
                  <IconButton onClick={() => setShowSearch(true)}>
                    <Box
                      component={ZoomIn}
                      width="1.5rem!important"
                      height="1.5rem!important"
                    />
                  </IconButton>
                </Hidden>
                <NotificationsDropdownAlternative />
                <AppsDropdownAlternative />
              </Box>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                className={clsx(classes.marginLeftAuto, {
                  [classes.displayNone]: showSearch,
                })}
              >
                <UserDropdownAlternative />
              </Box>
            </Box>
          </Container>
        </Toolbar>
      </AppBar>
    </>
  );
}
AdminNavbarAlternative.defaultProps = {
  openSidebarResponsive: () => {},
};

AdminNavbarAlternative.propTypes = {
  // use this to make the Sidebar open on responsive mode
  openSidebarResponsive: PropTypes.func.isRequired,
};
