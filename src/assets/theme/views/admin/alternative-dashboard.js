const componentStyles = (theme) => ({
  containerRoot: {
    [theme.breakpoints.up("md")]: {
      paddingLeft: "30px",
      paddingRight: "30px",
    },
  },
  flexColumnFlexXlRow: {
    flexDirection: "column!important",
    [theme.breakpoints.up("lg")]: {
      flexDirection: "row!important",
    },
  },
  buttonRoot: {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.white.main,
    borderColor: theme.palette.white.main,
    width: "2rem!important",
    height: "2rem!important",
    minWidth: "2rem!important",
    minHeight: "2rem!important",
    "&:hover": {
      backgroundColor: theme.palette.white.main,
      borderColor: theme.palette.white.main,
      color: theme.palette.dark.main,
    },
  },
});

export default componentStyles;
