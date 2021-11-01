const componentStyles = (theme) => ({
  defaultCard: {
    background:
      "linear-gradient(87deg," +
      theme.palette.dark.main +
      ",#1a174d)!important",
  },
  errorCard: {
    background:
      "linear-gradient(87deg," +
      theme.palette.error.main +
      ",#f56036)!important",
  },
  successCard: {
    background:
      "linear-gradient(87deg," +
      theme.palette.success.main +
      ",#2dcecc)!important",
  },
  primaryCard: {
    background:
      "linear-gradient(87deg," +
      theme.palette.primary.main +
      ",#825ee4)!important",
  },
  infoCard: {
    background:
      "linear-gradient(87deg," +
      theme.palette.info.main +
      ",#1171ef)!important",
  },
  warningCard: {
    background:
      "linear-gradient(87deg," +
      theme.palette.warning.main +
      ",#fbb140)!important",
  },
  typographyH5: {
    color: theme.palette.white.main,
    textTransform: "uppercase",
    marginBottom: 0,
  },
  typographyH2: {
    color: theme.palette.white.main,
    marginBottom: 0,
  },
  linearProgressRoot: {
    height: "3px!important",
    marginBottom: "0",
  },
  primaryProgress: {
    backgroundColor: theme.palette.primary.main,
  },
  infoProgress: {
    backgroundColor: theme.palette.info.main,
  },
  errorProgress: {
    backgroundColor: theme.palette.error.main,
  },
  warningProgress: {
    backgroundColor: theme.palette.warning.main,
  },
  defaultProgress: {
    backgroundColor: theme.palette.dark.main,
  },
  successProgress: {
    backgroundColor: theme.palette.success.main,
  },
});

export default componentStyles;
