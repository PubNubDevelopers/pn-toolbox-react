const componentStyles = (theme) => ({
  header: {
    background:
      "linear-gradient(87deg," + theme.palette.info.main + ",#1171ef)",
    [theme.breakpoints.up("md")]: {
      paddingTop: "10rem",
    },
  },
});

export default componentStyles;
