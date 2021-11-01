import boxShadows from "assets/theme/box-shadow.js";

const componentStyles = (theme) => ({
  cardRoot: {
    boxShadow: boxShadows.boxShadow + "!important",
    border: "0!important",
  },
  gridItemRoot: {
    flexBasis: 0,
    flexGrow: 1,
    maxWidth: "100%",
    position: "relative",
    paddingLeft: "2rem",
    "&:before": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "3px",
      height: "100%",
      content: "''",
      borderRadius: "8px",
      marginLeft: ".75rem",
    },
  },
  listItemRoot: {
    padding: "1.35rem 1.5rem!important",
    "&:not(:last-child)": {
      borderBottom: "1px solid " + theme.palette.gray[200],
    },
  },
  mb0: {
    marginBottom: 0,
  },
  cardContentRoot: {
    padding: "0!important",
  },
  lineThrough: {
    textDecoration: "line-through",
  },
  successGridItemRoot: {
    "&:before": {
      backgroundColor: theme.palette.success.main,
    },
  },
  warningGridItemRoot: {
    "&:before": {
      backgroundColor: theme.palette.warning.main,
    },
  },
  infoGridItemRoot: {
    "&:before": {
      backgroundColor: theme.palette.info.main,
    },
  },
  errorGridItemRoot: {
    "&:before": {
      backgroundColor: theme.palette.error.main,
    },
  },
  successCheckbox: {
    color: theme.palette.success.main + "!important",
  },
  warningCheckbox: {
    color: theme.palette.warning.main + "!important",
  },
  infoCheckbox: {
    color: theme.palette.info.main + "!important",
  },
  errorCheckbox: {
    color: theme.palette.error.main + "!important",
  },
});

export default componentStyles;
