import boxShadows from "assets/theme/box-shadow.js";

const componentStyles = (theme) => ({
  cardRoot: {
    marginBottom: "30px",
    transition: "all .15s ease",
    boxShadow: boxShadows.boxShadow,
    "&:hover": {
      transform: "translateY(-20px)",
    },
  },
  redBgGradient: {
    background:
      "linear-gradient(87deg," +
      theme.palette.error.main +
      ",#f56036)!important",
  },
  blueBgGradient: {
    background:
      "linear-gradient(87deg," +
      theme.palette.info.main +
      ",#1171ef)!important",
  },
  greenBgGradient: {
    background:
      "linear-gradient(87deg," +
      theme.palette.success.main +
      ",#2dcecc)!important",
  },
  orangeBgGradient: {
    background:
      "linear-gradient(87deg," +
      theme.palette.warning.main +
      ",#fbb140)!important",
  },
  redText: {
    color: theme.palette.error.main,
  },
  blueText: {
    color: theme.palette.info.main,
  },
  greenText: {
    color: theme.palette.success.main,
  },
  orangeText: {
    color: theme.palette.warning.main,
  },
  title: {
    textTransform: "uppercase",
  },
  marginRight2: {
    marginRight: ".5rem",
  },
});

export default componentStyles;
