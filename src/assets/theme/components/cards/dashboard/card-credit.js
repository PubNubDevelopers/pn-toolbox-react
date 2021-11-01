const componentStyles = (theme) => ({
  cardRoot: {
    background:
      "linear-gradient(87deg," +
      theme.palette.error.main +
      ",#f56036)!important",
  },
  typographyH6: {
    color: theme.palette.gray[400],
    marginBottom: 0,
    letterSpacing: "2px",
    textTransform: "uppercase",
  },
  typographyH1: {
    color: theme.palette.white.main,
  },
  typographyH3: {
    color: theme.palette.white.main,
    display: "block",
  },
  boxImg: {
    verticalAlign: "center",
    borderStyle: "none",
  },
});

export default componentStyles;
