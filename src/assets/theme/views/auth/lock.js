import boxShadows from "assets/theme/box-shadow.js";

const componentStyles = (theme) => ({
  cardRoot: {
    boxShadow: boxShadows.boxShadow + "!important",
    border: "0!important",
    background: theme.palette.background.default,
  },
  profileImage: {
    verticalAlign: "middle",
    transform: "translate(-50%,-50%) scale(1)",
    transition: "all .15s ease",
    "&:hover": {
      transform: "translate(-50%,-50%) scale(1.03)",
    },
  },
  cardContent: {
    paddingTop: "6rem !important",
    textAlign: "center",
    [theme.breakpoints.up("md")]: {
      padding: "3rem",
    },
  },
  title: {
    marginBottom: "1.5rem",
  },
  buttonRoot: {
    marginTop: "1rem",
  },
});

export default componentStyles;
