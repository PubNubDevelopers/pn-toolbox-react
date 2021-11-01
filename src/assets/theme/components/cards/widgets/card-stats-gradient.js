const componentStyles = (theme) => ({
  cardRoot: {},
  cardContentRoot: {
    padding: "1rem 1.5rem !important",
  },
  typographyRootH5: {
    textTransform: "uppercase",
    display: "flex",
  },
  bgWhite: {
    backgroundColor: theme.palette.white.main,
  },
  bgGradientDefault: {
    background:
      "linear-gradient(87deg," +
      theme.palette.dark.main +
      ",#1a174d)!important",
  },
  bgGradientError: {
    background:
      "linear-gradient(87deg," +
      theme.palette.error.main +
      ",#f56036)!important",
  },
  bgGradientSuccess: {
    background:
      "linear-gradient(87deg," +
      theme.palette.success.main +
      ",#2dcecc)!important",
  },
  bgGradientPrimary: {
    background:
      "linear-gradient(87deg," +
      theme.palette.primary.main +
      ",#825ee4)!important",
  },
  bgGradientInfo: {
    background:
      "linear-gradient(87deg," +
      theme.palette.info.main +
      ",#1171ef)!important",
  },
  bgGradientWarning: {
    background:
      "linear-gradient(87deg," +
      theme.palette.warning.main +
      ",#fbb140)!important",
  },
});

export default componentStyles;
