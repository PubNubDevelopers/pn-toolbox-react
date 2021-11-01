import boxShadows from "assets/theme/box-shadow.js";
import hexToRgb from "assets/theme/hex-to-rgb.js";

const componentStyles = (theme) => ({
  appBarRoot: {
    borderBottom:
      "1px solid rgba(" + hexToRgb(theme.palette.dark.main) + ", 0.08)",
    backgroundColor: theme.palette.transparent.main,
  },
  brandTitle: {
    textTransform: "uppercase",
    margin: "0",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  searchBoxShow: {
    display: "flex!important",
    marginRight: "0",
    "& div:first-of-type": {
      flex: 1,
    },
  },
  searchBox: {
    borderColor: theme.palette.dark.main,
    borderRadius: "2rem",
    border: "2px solid",
    backgroundColor: "rgba(" + hexToRgb(theme.palette.dark.main) + ",0.9)",
    boxShadow: boxShadows.inputBoxShadow,
    transition: "box-shadow .15s ease",
    color: theme.palette.gray[400],
    [theme.breakpoints.down("xs")]: {
      display: "none",
      width: "100%",
    },
  },
  searchIcon: {
    color: theme.palette.gray[400],
    marginRight: "0.5rem",
    marginLeft: "1rem",
  },
  searchClose: {
    color: theme.palette.gray[400],
    marginRight: "1rem",
    marginLeft: "-.5rem",
  },
  searchInput: {
    color: theme.palette.gray[200],
    width: "270px",
    backgroundColor: "initial",
    border: 0,
    boxShadow: "none",
    padding: "0",
  },
  containerRoot: {
    [theme.breakpoints.up("md")]: {
      paddingLeft: "30px",
      paddingRight: "30px",
    },
  },
  marginLeftAuto: {
    [theme.breakpoints.down("sm")]: {
      marginLeft: "auto",
    },
  },
  marginLeftNone: {
    [theme.breakpoints.down("sm")]: {
      marginLeft: "unset",
    },
  },
  displayNone: {
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
});

export default componentStyles;
