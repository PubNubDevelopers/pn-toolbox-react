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
  },
  listItemRoot: {
    paddingLeft: 0,
    paddingRight: 0,
    "&:not(:last-child)": {
      borderBottom: "1px solid " + theme.palette.gray[200],
    },
  },
  buttonRoot: {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.white.main,
    borderColor: theme.palette.white.main,
    "&:hover": {
      backgroundColor: theme.palette.white.main,
      borderColor: theme.palette.white.main,
      color: theme.palette.dark.main,
    },
  },
  img: {
    verticalAlign: "middle",
    borderStyle: "none",
  },
  mb0: {
    marginBottom: "0!important",
  },
  vectorMap: {
    position: "relative",
  },
});

export default componentStyles;
