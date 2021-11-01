import boxShadows from "assets/theme/box-shadow.js";

const componentStyles = (theme) => ({
  cardRoot: {
    boxShadow: boxShadows.boxShadow + "!important",
    border: "0!important",
  },
  cardContentRoot: {
    paddingTop: "0!important",
    paddingBottom: "0!important",
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
  linearProgressRoot: {
    height: "3px!important",
    margin: "0!important",
  },
  infoLinearProgress: {
    backgroundColor: theme.palette.info.main,
  },
  successLinearProgress: {
    backgroundColor: theme.palette.success.main,
  },
  errorLinearProgress: {
    backgroundColor: theme.palette.error.main,
  },
  warningLinearProgress: {
    backgroundColor: theme.palette.warning.main,
  },
  typographyRootH3: {
    display: "flex",
  },
});

export default componentStyles;
