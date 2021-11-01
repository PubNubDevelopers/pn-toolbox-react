import boxShadows from "assets/theme/box-shadow.js";

const componentStyles = (theme) => ({
  cardRoot: {
    boxShadow: boxShadows.boxShadow + "!important",
    border: "0!important",
  },
  listItemRoot: {
    padding: "1.5rem!important",
    borderBottom: "1px solid " + theme.palette.gray[200],
  },
});

export default componentStyles;
