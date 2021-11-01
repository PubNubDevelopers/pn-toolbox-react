import boxShadows from "assets/theme/box-shadow.js";

const componentStyles = (theme) => ({
  iconInfo: {
    padding: "12px",
    textAlign: "center",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "1.25rem",
    height: "1.25rem",
    boxShadow: boxShadows.boxShadow,
    color: theme.palette.white.main,
    borderRadius: "50%",
    background:
      "linear-gradient(87deg," +
      theme.palette.info.main +
      ",#1171ef)!important",
  },
  mutedAnchor: {
    color: theme.palette.gray[400],
    textDecoration: "none",
    backgroundColor: "initial",
    "&:hover": {
      color: theme.palette.gray[500],
    },
  },
  cardRoot: {
    textAlign: "center",
    marginBottom: "1.5rem",
  },
  cardContentRoot: {
    [theme.breakpoints.up("md")]: {
      paddingLeft: "6rem",
      paddingRight: "6rem",
    },
  },
  cardActionsRoot: {
    justifyContent: "center",
  },
  display2: {
    fontSize: "2.75rem",
    fontWeight: 600,
    lineHeight: 1.5,
  },
  titleInfo: {
    letterSpacing: ".0625rem",
    textTransform: "uppercase",
    color: theme.palette.info.main,
    paddingTop: "1rem",
    paddingBottom: "1rem",
    marginBottom: "0",
  },
});

export default componentStyles;
