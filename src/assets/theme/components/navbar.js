import hexToRgb from "assets/theme/hex-to-rgb.js";

const componentStyles = (theme) => ({
  appBarRootDefault: {
    backgroundColor: theme.palette.dark.main,
    "& $appBarBrand": {
      color: "rgba(" + hexToRgb(theme.palette.white.main) + ",.5)",
    },
  },
  appBarRootPrimary: {
    backgroundColor: theme.palette.primary.main,
    "& $appBarBrand": {
      color: "rgba(" + hexToRgb(theme.palette.white.main) + ",.5)",
    },
  },
  appBarRootSuccess: {
    backgroundColor: theme.palette.success.main,
    "& $appBarBrand": {
      color: "rgba(" + hexToRgb(theme.palette.white.main) + ",.5)",
    },
  },
  appBarRootError: {
    backgroundColor: theme.palette.error.main,
    "& $appBarBrand": {
      color: "rgba(" + hexToRgb(theme.palette.white.main) + ",.5)",
    },
  },
  appBarRootWarning: {
    backgroundColor: theme.palette.warning.main,
    "& $appBarBrand": {
      color: "rgba(" + hexToRgb(theme.palette.white.main) + ",.5)",
    },
  },
  appBarRootInfo: {
    backgroundColor: theme.palette.info.main,
    "& $appBarBrand": {
      color: "rgba(" + hexToRgb(theme.palette.white.main) + ",.5)",
    },
  },
  appBarBrand: {
    textTransform: "uppercase",
  },
  appBarList: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
    },
  },
  appBarMenuPaper: {
    width: "calc(100% - 2rem)",
  },
  appBarOutlineNone: {
    outline: "none!important",
  },
  appBarHeaderImg: {
    verticalAlign: "middle",
    borderStyle: "none",
  },
  appBarListItem: {
    [theme.breakpoints.up("lg")]: {
      color: theme.palette.white.main,
    },
  },
  appBarListItemIcon: {
    [theme.breakpoints.down("md")]: {
      position: "relative",
      top: "-2px",
      marginRight: ".5rem",
    },
  },
});

export default componentStyles;
