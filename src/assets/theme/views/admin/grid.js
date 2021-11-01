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
  boxRoot: {
    boxShadow: boxShadows.boxShadow + "!important",
    backgroundColor: theme.palette.white.main,
    border: "1px solid " + theme.palette.gray[300],
  },
});

export default componentStyles;
