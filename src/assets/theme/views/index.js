import boxShadows from "assets/theme/box-shadow.js";
import hexToRgb from "assets/theme/hex-to-rgb.js";

const componentStyles = (theme) => ({
  bgDefault: {
    backgroundColor: theme.palette.dark.main,
  },
  bgWhite: {
    backgroundColor: theme.palette.white.main,
  },
  typographyH2: {
    fontSize: "2.1875rem",
    fontWeight: 600,
    lineHeight: 1.5,
    color: theme.palette.white.main,
  },
  centerElements: {
    justifyContent: "center",
    textAlign: "center",
  },
  orderMd1: {
    [theme.breakpoints.up("md")]: {
      order: 1,
    },
  },
  orderMd2: {
    [theme.breakpoints.up("md")]: {
      order: 2,
    },
  },
  prMd5: {
    [theme.breakpoints.up("md")]: {
      paddingRight: "3rem",
    },
  },
  justifyContentCenter: {
    justifyContent: "center",
  },
  imgBox: {
    verticalAlign: "middle",
    borderStyle: "none",
  },
  listStyleNone: {
    listStyle: "none",
  },
  typographyH4: {
    marginBottom: "0",
    marginLeft: "1rem",
  },
  warningAnchor: {
    textDecoration: "none",
    "&:hover": {
      color: theme.palette.warning.dark,
    },
  },
  infoAnchor: {
    textDecoration: "none",
    "&:hover": {
      color: theme.palette.info.dark,
    },
  },
  textCenter: {
    textAlign: "center",
  },
  blurWrapper: {
    "&:hover $blurItem": {
      opacity: ".8",
      WebkitFilter: "blur(10px)",
      filter: "blur(10px)",
      transform: "scale(.95)",
      zIndex: 1,
    },
    "&:hover $blurHidden": {
      opacity: 1,
      top: "50%",
    },
  },
  blurItem: {
    transition: "1s cubic-bezier(.19,1,.22,1)",
    willChange: "transform",
    WebkitFilter: "blur(0)",
    filter: "blur(0)",
    opacity: 1,
    position: "relative",
    maxWidth: "100%",
    height: "360px",
    margin: "0 auto",
    zIndex: 1,
  },
  blurHidden: {
    color: theme.palette.success.main,
    position: "absolute",
    top: "calc(50% + 7px)",
    left: "50%",
    transform: "translate(-50%,-50%)",
    opacity: 0,
    transition: "all .15s ease",
    zIndex: 100,
  },
  iconNi: {
    width: "5rem",
    height: "5rem",
    fontSize: "1.7em",
    color: theme.palette.primary.main,
    position: "absolute",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    background: "#fff",
    zIndex: 1,
    transform: "translate(-50%,-50%)",
    boxShadow: "0 0 2rem 0 rgb(136 152 170 / 15%)",
    transition: "all .2s cubic-bezier(.25,.65,.9,.75)",
    "&:first-child": {
      left: "50%",
      top: "50%",
      fontSize: "42px",
      color: theme.palette.warning.main,
    },
    "&:nth-child(2)": {
      width: "3.75rem",
      height: "3.75rem",
      fontSize: "1.5em",
      left: "calc(50% + 7rem*1.7)",
      top: "50%",
    },
    "&:nth-child(3)": {
      width: "3.75rem",
      height: "3.75rem",
      fontSize: "1.5em",
      left: "calc(50% + 7rem)",
      top: "calc(50% + 7rem)",
    },
    "&:nth-child(4)": {
      width: "3.75rem",
      height: "3.75rem",
      fontSize: "1.5em",
      left: "calc(50% + 7rem)",
      top: "calc(50% - 7rem)",
    },
    "&:nth-child(5)": {
      left: "calc(50% + 7rem*4)",
      top: "50%",
    },
    "&:nth-child(6)": {
      left: "calc(50% + 7rem*2.7)",
      top: "calc(50% + 7rem*1.5)",
    },
    "&:nth-child(7)": {
      left: "calc(50% + 7rem*2.7)",
      top: "calc(50% - 7rem*1.5)",
    },
    "&:nth-child(8)": {
      width: "3.75rem",
      height: "3.75rem",
      fontSize: "1.5em",
      left: "calc(50% - 7rem*1.7)",
      top: "50%",
    },
    "&:nth-child(9)": {
      width: "3.75rem",
      height: "3.75rem",
      fontSize: "1.5em",
      left: "calc(50% - 7rem)",
      top: "calc(50% + 7rem)",
    },
    "&:nth-child(10)": {
      width: "3.75rem",
      height: "3.75rem",
      fontSize: "1.5em",
      left: "calc(50% - 7rem)",
      top: "calc(50% - 7rem)",
    },
    "&:nth-child(11)": {
      left: "calc(50% - 7rem*4)",
      top: "50%",
    },
    "&:nth-child(12)": {
      left: "calc(50% - 7rem*2.7)",
      top: "calc(50% + 7rem*1.5)",
    },
    "&:nth-child(13)": {
      left: "calc(50% - 7rem*2.7)",
      top: "calc(50% - 7rem*1.5)",
    },
  },
  buttonRoot: {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.white.main,
    borderColor: theme.palette.white.main,
    marginRight: "1rem",
    "&:hover": {
      backgroundColor: theme.palette.white.main,
      borderColor: theme.palette.white.main,
      color: theme.palette.dark.main,
    },
  },
  typographyH4Display4: {
    fontSize: "1.6275rem",
    fontWeight: 600,
    lineHeight: 1.5,
    marginTop: "3rem",
    marginBottom: "3rem",
  },
  imageBadge: {
    maxWidth: "100%",
    height: "auto",
    verticalAlign: "middle",
    borderStyle: "none",
    transition: "all .15s ease",
    boxShadow: boxShadows.boxShadow,
  },
  cardContentRoot: {
    display: "flex",
    justifyContent: "center",
    paddingTop: "0",
    paddingBottom: "0",
  },
  cardActionsRoot: {
    border: "0!important",
    background: "inherit!important",
  },
  cardHeaderRoot: {
    border: "0!important",
    background: "inherit",
  },
  typographyH1Pricing: {
    fontSize: "2.1875rem",
    fontWeight: 600,
    lineHeight: 1.5,
    color: theme.palette.dark.main,
    marginBottom: "0",
  },
  textWhite: {
    color: theme.palette.white.main + "!important",
  },
  typographyH5Pricing: {
    textTransform: "uppercase",
    marginBottom: "0",
  },
  paddingLg0: {
    [theme.breakpoints.up("md")]: {
      padding: "0!important",
    },
  },
  middleCard: {
    paddingTop: "2rem",
    paddingBottom: "2rem",
    border: "1px solid rgba(" + hexToRgb(theme.palette.black.main) + ", 0.1)",
    backgroundColor: theme.palette.dark.main,
  },
});

export default componentStyles;
