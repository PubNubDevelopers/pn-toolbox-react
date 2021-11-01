import boxShadows from "assets/theme/box-shadow.js";

const componentStyles = () => ({
  cardRoot: {
    boxShadow: boxShadows.boxShadow + "!important",
    border: "0!important",
  },
  gridItemRoot: {
    flexBasis: 0,
    flexGrow: 1,
    maxWidth: "100%",
  },
  mb0: {
    marginBottom: 0,
  },
  avatarRoot: {
    width: "74px",
    height: "74px",
  },
});

export default componentStyles;
