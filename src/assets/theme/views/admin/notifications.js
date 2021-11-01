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
  buttonWhite: {
    backgroundColor: theme.palette.white.main,
    color: theme.palette.primary.main,
    boxShadow: boxShadows.buttonBoxShadowNeutral,
    borderColor: theme.palette.white.main + "!important",
    "&:hover": {
      color: theme.palette.gray[900],
      borderColor: theme.palette.white.main + "!important",
      backgroundColor: theme.palette.white.main,
    },
  },
  formControlLabelRoot: {
    position: "relative",
    display: "flex",
    minHeight: "1.5rem",
    WebkitPrintColorAdjust: "exact",
  },
  formControlLabelLabel: {
    cursor: "pointer",
    fontSize: ".875rem",
    position: "relative",
    verticalAlign: "top",
    display: "inline-block",
    color: theme.palette.gray[600],
  },
  buttonImg: {
    verticalAlign: "middle",
    borderStyle: "none",
  },
  dialogCardForm: {
    boxShadow: boxShadows.boxShadow + "!important",
    border: "0!important",
    backgroundColor: theme.palette.secondary.main,
  },
  dialogCardContentForm: {
    [theme.breakpoints.up("md")]: {
      padding: "3rem",
    },
  },
});

export default componentStyles;
