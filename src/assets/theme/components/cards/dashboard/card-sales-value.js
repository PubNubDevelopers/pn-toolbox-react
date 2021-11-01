import boxShadows from "assets/theme/box-shadow.js";

const componentStyles = (theme) => ({
  cardRootBgGradient: {
    background:
      "linear-gradient(87deg," +
      theme.palette.dark.main +
      ",#1a174d)!important",
  },
  cardRoot: {
    boxShadow: boxShadows.boxShadow + "!important",
    border: "0!important",
  },
  cardHeaderRoot: {
    backgroundColor: "initial!important",
  },
  textUppercase: {
    textTransform: "uppercase",
  },
  buttonRootUnselected: {
    background: theme.palette.white.main + "!important",
    color: theme.palette.primary.main + "!important",
  },
});

export default componentStyles;
