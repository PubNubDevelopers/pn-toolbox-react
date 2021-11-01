import React from "react";
import clsx from "clsx";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import Menu from "@material-ui/core/Menu";
// @material-ui/icons components
import CreditCard from "@material-ui/icons/CreditCard";
import DateRange from "@material-ui/icons/DateRange";
import FileCopy from "@material-ui/icons/FileCopy";
import LocationOn from "@material-ui/icons/LocationOn";
import Mail from "@material-ui/icons/Mail";
import Report from "@material-ui/icons/Report";
import ShoppingBasket from "@material-ui/icons/ShoppingBasket";

// core components
import componentStyles from "assets/theme/components/dropdowns/apps-dropdown.js";

const useStyles = makeStyles(componentStyles);

const firstItems = [
  {
    name: "Calendar",
    icon: DateRange,
    color: "bgGradientError",
  },
  {
    name: "Email",
    icon: Mail,
    color: "bgGradientWarning",
  },
  {
    name: "Payments",
    icon: CreditCard,
    color: "bgGradientInfo",
  },
];

const secondItems = [
  {
    name: "Reports",
    icon: Report,
    color: "bgGradientSuccess",
  },
  {
    name: "Maps",
    icon: LocationOn,
    color: "bgGradientPurple",
  },
  {
    name: "Shop",
    icon: ShoppingBasket,
    color: "bgGradientYellow",
  },
];

export default function AppsDropdown() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = "dropdowns-apps-dropdown-id";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      classes={{ paper: classes.menuPaper }}
    >
      <Grid container classes={{ root: classes.gridContainerRoot }}>
        {firstItems.map((prop, key) => (
          <Grid item xs={4} key={key} classes={{ root: classes.gridItemRoot }}>
            <Avatar
              component="span"
              classes={{
                root: clsx(classes.avatarRoot, classes[prop.color]),
              }}
            >
              <Box
                component={prop.icon}
                width="1.25rem!important"
                height="1.25rem!important"
              />
            </Avatar>
            <Box
              component="small"
              display="block"
              marginTop=".75rem"
              fontSize=".8125rem"
              fontWeight="600"
            >
              {prop.name}
            </Box>
          </Grid>
        ))}
      </Grid>
      <Grid container classes={{ root: classes.gridContainerRoot }}>
        {secondItems.map((prop, key) => (
          <Grid item xs={4} key={key} classes={{ root: classes.gridItemRoot }}>
            <Avatar
              component="span"
              classes={{
                root: clsx(classes.avatarRoot, classes[prop.color]),
              }}
            >
              <Box
                component={prop.icon}
                width="1.25rem!important"
                height="1.25rem!important"
              />
            </Avatar>
            <Box
              component="small"
              display="block"
              marginTop=".75rem"
              fontSize=".8125rem"
              fontWeight="600"
            >
              {prop.name}
            </Box>
          </Grid>
        ))}
      </Grid>
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
          component={FileCopy}
          width="1rem!important"
          height="1rem!important"
        />
      </IconButton>
      {renderMenu}
    </>
  );
}
