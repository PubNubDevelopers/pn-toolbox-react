import boxShadows from "assets/theme/box-shadow.js";

const componentStyles = (theme) => ({
  flexMdRow: {
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row!important",
    },
  },
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
  cardRootGradientSuccess: {
    background:
      "linear-gradient(87deg," +
      theme.palette.success.main +
      ",#2dcecc)!important",
    boxShadow: boxShadows.boxShadowLg,
    [theme.breakpoints.up("md")]: {
      zIndex: 1,
      transform: "scale(1.1)",
    },
  },
  bgInherit: {
    background: "inherit",
  },
  titleWhite: {
    letterSpacing: ".0625rem",
    textTransform: "uppercase",
    color: theme.palette.white.main,
    paddingTop: "1rem",
    paddingBottom: "1rem",
    marginBottom: "0",
  },
  whiteAnchor: {
    color: theme.palette.white.main,
    textDecoration: "none",
    backgroundColor: "initial",
    "&:hover": {
      color: theme.palette.gray[100],
    },
  },
  iconWhite: {
    padding: "12px",
    textAlign: "center",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "1.25rem",
    height: "1.25rem",
    boxShadow: boxShadows.boxShadow,
    color: theme.palette.gray[600],
    borderRadius: "50%",
    background: theme.palette.white.main,
  },
  display1: {
    fontSize: "3.3rem",
    fontWeight: 600,
    lineHeight: 1.5,
  },
  buttonRootWhite: {
    color: theme.palette.dark.main,
    backgroundColor: theme.palette.white.main,
    borderColor: theme.palette.white.main,
    marginRight: "1rem",
    "&:hover": {
      backgroundColor: theme.palette.white.main,
      borderColor: theme.palette.white.main,
      color: theme.palette.dark.dark,
    },
  },
  justifyContentLgCenter: {
    [theme.breakpoints.up("md")]: {
      justifyContent: "center",
    },
  },
  avatarRoot: {
    backgroundColor: theme.palette.white.main,
  },
  tableCellHead: {
    borderTopColor: theme.palette.dark.tableBorder,
    color: theme.palette.gray[400],
  },
  tableCellBody: {
    borderBottomColor: theme.palette.dark.tableBorder,
    color: theme.palette.background.default,
  },
  tableRowBody: {
    "&:last-child $tableCellBody": {
      border: 0,
    },
  },
});

export default componentStyles;
