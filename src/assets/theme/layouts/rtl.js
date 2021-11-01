const componentStyles = (theme) => ({
  mainContent: {
    maxWidth: "100%",
  },
  containerRoot: {
    [theme.breakpoints.up("md")]: {
      paddingLeft: "30px",
      paddingRight: "30px",
    },
  },
  directionRTL: {
    direction: "rtl",
  },
});

export default componentStyles;
