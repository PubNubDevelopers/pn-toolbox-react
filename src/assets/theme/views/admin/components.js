import boxShadows from "assets/theme/box-shadow.js";
import hexToRgb from "assets/theme/hex-to-rgb.js";

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
  dropzoneAvatarRoot: {
    borderRadius: ".375rem",
    width: "48px",
    height: "auto",
  },
  dropzoneAvatarImg: {
    borderRadius: ".375rem",
    width: "48px",
    height: "auto",
  },
  sliderBadge: {
    backgroundColor: "rgba(" + hexToRgb(theme.palette.gray[900]) + ",.7)",
  },
});

export default componentStyles;
