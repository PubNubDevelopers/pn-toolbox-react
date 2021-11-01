import boxShadows from "assets/theme/box-shadow.js";

const componentStyles = (theme) => ({
  cardRoot: {
    boxShadow: boxShadows.boxShadow + "!important",
  },
  cardHeader: {
    backgroundColor: "initial",
  },
  cardHeaderSecond: {
    display: "flex",
    alignItems: "center",
  },
  dNoneDSmBlock: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  primaryColor: {
    color: theme.palette.primary.main + "!important",
  },
  anchor: {
    marginTop: ".25rem",
    display: "inline-flex",
    alignItems: "center",
    marginRight: ".75rem",
    color: theme.palette.dark.main,
    fontSize: ".875rem",
    textDecoration: "none",
  },
  justifyContentSmEnd: {
    [theme.breakpoints.up("sm")]: {
      justifyContent: "flex-end",
    },
  },
  avatarRootXS: {
    width: "24px",
    height: "24px",
  },
  mediaRoot: {
    "&:hover $avatarRootMedia": {
      transform: "scale(1.1)",
    },
  },
  avatarRootMedia: {
    marginTop: "-1rem",
    marginRight: "-2rem",
    position: "relative",
    zIndex: 1,
    border: "4px solid " + theme.palette.white.main,
    transition: "all .15s ease",
    width: "58px",
    height: "58px",
  },
  avatarRootMediaComment: {
    width: "58px",
    height: "58px",
    marginRight: "1.5rem",
  },
  mediaComment: {
    backgroundColor: theme.palette.gray[100],
  },
  boxImg: {
    verticalAlign: "middle",
    borderStyle: "none",
  },
  avatarRounded: {
    borderRadius: ".375rem!important",
  },
});

export default componentStyles;
