import boxShadows from "assets/theme/box-shadow.js";

const componentStyles = (theme) => ({
  cardRoot: {
    boxShadow: boxShadows.boxShadow + "!important",
  },
  cardHeader: {
    backgroundColor: "initial",
  },
  containerRoot: {
    [theme.breakpoints.up("md")]: {
      paddingLeft: "30px",
      paddingRight: "30px",
    },
  },
  mb0: {
    marginBottom: "0!important",
  },
  borderWarning: {
    borderColor: theme.palette.warning.main + "!important",
  },
  borderSuccess: {
    borderColor: theme.palette.success.main + "!important",
  },
  textWarning: {
    color: theme.palette.warning.main + "!important",
  },
});

export default componentStyles;
