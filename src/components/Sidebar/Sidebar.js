import React from "react";
import PropTypes from "prop-types";
import { useLocation, Link } from "react-router-dom";
import clsx from "clsx";

// import {
//   Row,
// } from "reactstrap";

// react library that creates nice scrollbar on windows devices
import PerfectScrollbar from "react-perfect-scrollbar";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";

// @material-ui/icons components
import MenuIcon from "@material-ui/icons/Menu";
import MenuOpen from "@material-ui/icons/MenuOpen";
import NavigateNext from "@material-ui/icons/NavigateNext";

// core components
import componentStyles from "assets/theme/components/sidebar.js";

const useStyles = makeStyles(componentStyles);

export default function Sidebar({
  routes,
  logo,
  openResponsive,
  closeSidebarResponsive,
}) {
  const classes = useStyles();
  const location = useLocation();
  const [state, setState] = React.useState({});
  const [miniActive, setMiniActive] = React.useState(false);
  const [mouseEnter, setMouseEnter] = React.useState(false);

  React.useEffect(() => {
    setState(getCollapseStates(routes));
    // eslint-disable-next-line
  }, []);

  const toggleMiniActive = () => {
    if (mouseEnter) {
      setMiniActive(false);
      setMouseEnter(false);
    } else {
      setMiniActive(!miniActive);
    }
  };

  // makes the sidenav normal on hover (actually when mouse enters on it)
  const onMouseEnterSidenav = () => {
    if (miniActive && !mouseEnter) {
      setMiniActive(false);
      setMouseEnter(true);
    }
  };
  // makes the sidenav mini on hover (actually when mouse leaves from it)
  const onMouseLeaveSidenav = () => {
    if (mouseEnter) {
      setMiniActive(true);
      setMouseEnter(false);
    }
  };

  // this creates the intial state of this component based on the collapse routes
  // that it gets through routes
  const getCollapseStates = (routes) => {
    let initialState = {};
    routes.map((prop) => {
      if (prop.collapse) {
        initialState = {
          [prop.state]: getCollapseInitialState(prop.views),
          ...getCollapseStates(prop.views),
          ...initialState,
        };
      }
      return null;
    });
    return initialState;
  };

  // this verifies if any of the collapses should be default opened on a rerender of this component
  // for example, on the refresh of the page,
  // while on the src/views/forms/RegularForms.js - route /admin/regular-forms
  const getCollapseInitialState = (routes) => {
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse && getCollapseInitialState(routes[i].views)) {
        return true;
      } else if (location.pathname.indexOf(routes[i].path) !== -1) {
        return true;
      }
    }
    return false;
  };

  // this is used on mobile devices, when a user navigates
  // the sidebar will autoclose
  const handleMenuClose = () => {
    if (window.innerWidth < 1200) {
      // toggleSidenav();
    }
  };
  
  // creates the links that appear in the left menu / Sidebar
  const createLinks = (routes) => {
    return routes.map((prop, key) => {
      if (prop.redirect) {
        return null;
      } else if (prop.divider) {
        return <Divider key={key} classes={{ root: classes.divider }} />;
      } else if (prop.title) {
        if (miniActive) {
          return null;
        }
        return (
          <Typography
            key={key}
            variant="h6"
            component="h6"
            classes={{ root: classes.title }}
          >
            {prop.title}
          </Typography>
        );
      }
      let textContent = (
        <>
          <Box minWidth="2.25rem" display="flex" alignItems="center">
            {typeof prop.icon === "string" ? (
              <Box
                component="i"
                className={prop.icon + " " + classes["text" + prop.iconColor]}
                marginLeft={miniActive ? "-.25rem" : ""}
              />
            ) : null}
            {typeof prop.icon === "object" ? (
              <Box
                component={prop.icon}
                width="1.25rem!important"
                height="1.25rem!important"
                marginLeft={miniActive ? "-.25rem" : ""}
                className={classes["text" + prop.iconColor]}
              />
            ) : null}
            {prop.icon === undefined && prop.miniName !== undefined ? (
              <Box
                component="span"
                className={classes["text" + prop.iconColor]}
              >
                {prop.miniName}
              </Box>
            ) : null}
          </Box>
          {miniActive ? null : prop.name}
        </>
      );
      if (prop.collapse) {
        var st = {};
        st[prop["state"]] = !state[prop.state];
        if (prop.multiStates) {
          prop.multiStates.forEach((item) => {
            st[item] = state[item];
          });
        }
        return (
          <React.Fragment key={key}>
            <ListItem
              component={"a"}
              href="#mui"
              onClick={(e) => {
                e.preventDefault();
                setState(st);
              }}
              classes={{
                root: clsx(classes.listItemRoot, {
                  [classes.listItemRootCollapseActive]: getCollapseInitialState(
                    prop.views
                  ),
                }),
              }}
            >
              {textContent}
              {miniActive ? null : (
                <Box
                  component={NavigateNext}
                  marginLeft="auto"
                  width="1rem!important"
                  height="1rem!important"
                  className={clsx(classes.listItemRootCollapseIcon, {
                    [classes.listItemRootCollapseActiveIcon]: state[prop.state],
                  })}
                />
              )}
            </ListItem>
            <Collapse
              in={state[prop.state]}
              unmountOnExit
              className={classes.collapseRoot}
            >
              <List classes={{ root: classes.listRootCollapse }}>
                {createLinks(prop.views)}
              </List>
            </Collapse>
          </React.Fragment>
        );
      } else if (prop.href) {
        return (
          <ListItem
            key={key}
            component={"a"}
            href={prop.href}
            onClick={handleMenuClose}
            classes={{
              root:
                classes.listItemRoot +
                (prop.upgradeToPro
                  ? " " + classes.listItemRootUpgradeToPro
                  : ""),
              selected: classes.listItemSelected,
            }}
            target="_blank"
            selected={prop.upgradeToPro === true}
          >
            {textContent}
          </ListItem>
        );
      } else {
        return (
          <ListItem
            key={key}
            component={Link}
            onClick={handleMenuClose}
            to={prop.layout + prop.path}
            classes={{
              root:
                classes.listItemRoot +
                (prop.upgradeToPro
                  ? " " + classes.listItemRootUpgradeToPro
                  : ""),
              selected: classes.listItemSelected,
            }}
            selected={
              location.pathname === prop.layout + prop.path ||
              prop.upgradeToPro === true
            }
          >
            {textContent}
          </ListItem>
        );
      }
    });
  };
  let logoImage = (
    <img alt={logo.imgAlt} className={classes.logoClasses} src={logo.imgSrc} />
  );
  let logoObject =
    logo && logo.innerLink ? (
      <Link to={logo.innerLink} className={classes.logoLinkClasses}>
        {logoImage}
      </Link>
    ) : logo && logo.outterLink ? (
      <a href={logo.outterLink} className={classes.logoLinkClasses}>
        {logoImage}
      </a>
    ) : null;

  const desktopObject = (
    <>      
      <Box
        padding={miniActive ? "0 0 1rem 0" : "0 1rem 1rem 1.5rem"}
        display="flex"
        justifyContent={miniActive ? "center" : "space-between"}
        alignItems="center"
      >
        {miniActive ? null : logoObject}
        <IconButton onClick={toggleMiniActive}>
          <Box
            component={miniActive || mouseEnter ? MenuOpen : MenuIcon}
            width="1.5rem!important"
            height="1.5rem!important"
          />
        </IconButton>
      </Box>
      <Box align="center" 
        style={{
          'fontFamily': "'Consolas', 'monaco', 'monospace'",
          'fontSize': "24px",
        }}
      >
        &lt;the_toolbox/&gt;
      </Box>
      <List classes={{ root: classes.listRoot }}>{createLinks(routes)}</List>
    </>
  );
  const mobileObject = (
    <>
      <Box
        padding={"0 1rem 1rem 1.5rem"}
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
      >
        {logoObject}
      </Box>
      <List classes={{ root: classes.listRoot }}>{createLinks(routes)}</List>
    </>
  );
  return (
    <>
      <Hidden lgDown implementation="css">
        <Drawer
          variant="permanent"
          anchor="left"
          open
          classes={{
            paper: clsx({ [classes.drawerDockedMiniActive]: miniActive }),
            docked: clsx({ [classes.drawerPaperMiniActive]: miniActive }),
          }}
          onMouseEnter={onMouseEnterSidenav}
          onMouseLeave={onMouseLeaveSidenav}
        >
          {navigator.platform.indexOf("Win") > -1 ? (
            <PerfectScrollbar>{desktopObject}</PerfectScrollbar>
          ) : (
            desktopObject
          )}
        </Drawer>
      </Hidden>
      <Hidden xlUp implementation="js">
        <Drawer
          variant="temporary"
          anchor="left"
          open={openResponsive}
          onClose={closeSidebarResponsive}
        >
          {navigator.platform.indexOf("Win") > -1 ? (
            <PerfectScrollbar>{mobileObject}</PerfectScrollbar>
          ) : (
            mobileObject
          )}
        </Drawer>
      </Hidden>
    </>
  );
}

Sidebar.defaultProps = {
  routes: [],
  openResponsive: false,
  closeSidebarResponsive: () => {},
};

const commonProps = {
  name: PropTypes.string,
  // NOTE: you can either use miniName or icon, but not both
  // // // if you use both, only the icon will render
  miniName: PropTypes.string,
  icon: PropTypes.oneOfType([
    // this refers to icons such as ni ni-spaceship or fa fa-heart
    PropTypes.string,
    // this refers to icons from @material-ui/icons
    PropTypes.object,
  ]),
  iconColor: PropTypes.oneOf([
    "Primary",
    "PrimaryLight",
    "Error",
    "ErrorLight",
    "Warning",
    "WarningLight",
    "Info",
    "InfoLight",
    "Success",
    "SuccessLight",
    "Default",
  ]),
};

// this generates an anchor (<a href="href">..</a>) link
// this is a link that is sent outside the app
const hrefProp = PropTypes.shape({
  // if this is set to true, than the link will have an absolute position
  // use wisely and with precaution
  upgradeToPro: PropTypes.bool,
  href: PropTypes.string,
  ...commonProps,
});

// this generates a Link (<Link to="layout + path">..</Link>) link
// this is a link that is sent inside the app
const linkProp = PropTypes.shape({
  path: PropTypes.string,
  layout: PropTypes.string,
  component: PropTypes.func,
  ...commonProps,
});

const collapseProp = PropTypes.shape({
  collapse: true,
  // name of the collapse - needs to be unique
  state: PropTypes.string,
  // if you have multi level collapses,
  // you need to set this array to all of the
  // collapses you wish to keep open when opening
  // the multi level collapse
  multiStates: PropTypes.arrayOf(PropTypes.string),
  views: PropTypes.arrayOf(PropTypes.oneOfType([hrefProp, linkProp])),
  ...commonProps,
});

Sidebar.propTypes = {
  // use this to make the Sidebar open on responsive mode
  openResponsive: PropTypes.bool.isRequired,
  // callback for closing the Sidebar on responsive mode
  closeSidebarResponsive: PropTypes.func.isRequired,
  // this is the input/component that will be rendered on responsive
  // in our demo, we add this input component since the AdminNavbar
  // will not be visible on responsive mode
  input: PropTypes.node,
  // this is the dropdown/component that will be rendered on responsive
  // in our demo, it is the same with the dropdown from the AdminNavbar
  // since the AdminNavbar will not be visible on responsive mode
  dropdown: PropTypes.node,
  // NOTE: we recommend that your logo has the following dimensions
  // // 135x40 or 487x144 or a resize of these dimensions
  logo: PropTypes.shape({
    // innerLink is for links that will direct the user within the app
    // it will be rendered as <Link to="...">...</Link> tag
    innerLink: PropTypes.string,
    // outterLink is for links that will direct the user outside the app
    // it will be rendered as simple <a href="...">...</a> tag
    outterLink: PropTypes.string,
    // the image src of the logo
    imgSrc: PropTypes.string.isRequired,
    // the alt for the img
    imgAlt: PropTypes.string.isRequired,
  }),
  // links that will be displayed inside the component
  routes: PropTypes.arrayOf(
    PropTypes.oneOfType([
      hrefProp,
      linkProp,
      collapseProp,
      // this is just a title without any action on it
      // you can think of it as a disabled link
      PropTypes.shape({
        title: PropTypes.string,
      }),
      // this is just a divider line
      PropTypes.shape({
        divider: true,
      }),
    ])
  ),
};
