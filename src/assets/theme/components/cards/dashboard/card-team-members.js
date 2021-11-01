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
    paddingLeft: "0!important",
  },
  listItemRoot: {
    paddingLeft: 0,
    paddingRight: 0,
    "&:not(:last-child)": {
      borderBottom: "1px solid " + theme.palette.gray[200],
    },
  },
  mb0: {
    marginBottom: 0,
  },
  cardContentRoot: {
    paddingTop: "0!important",
    paddingBottom: "0!important",
  },
});

export default componentStyles;
