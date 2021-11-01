const componentStyles = (theme) => ({
  cardRoot: {
    marginBottom: "1.5rem",
    [theme.breakpoints.up("xl")]: {
      marginBottom: 0,
    },
  },
  cardContentRoot: {
    padding: "1rem 1.5rem !important",
  },
  textUppercase: {
    textTransform: "uppercase",
  },
  bgPrimary: {
    background:
      "linear-gradient(87deg," +
      theme.palette.primary.main +
      ",#825ee4)!important",
  },
  bgPrimaryLight: {
    background:
      "linear-gradient(87deg," +
      theme.palette.primary.light +
      ",#825ee4)!important",
  },
  bgError: {
    background:
      "linear-gradient(87deg," +
      theme.palette.error.main +
      ",#f56036)!important",
  },
  bgErrorLight: {
    background:
      "linear-gradient(87deg," +
      theme.palette.error.light +
      ",#f56036)!important",
  },
  bgWarning: {
    background:
      "linear-gradient(87deg," +
      theme.palette.warning.main +
      ",#fbb140)!important",
  },
  bgWarningLight: {
    background:
      "linear-gradient(87deg," +
      theme.palette.warning.light +
      ",#fbb140)!important",
  },
  bgInfo: {
    background:
      "linear-gradient(87deg," +
      theme.palette.info.main +
      ",#1171ef)!important",
  },
  bgInfoLight: {
    background:
      "linear-gradient(87deg," +
      theme.palette.info.light +
      ",#1171ef)!important",
  },
  bgSuccess: {
    background:
      "linear-gradient(87deg," +
      theme.palette.success.main +
      ",#2dcecc)!important",
  },
  bgSuccessLight: {
    background:
      "linear-gradient(87deg," +
      theme.palette.success.light +
      ",#2dcecc)!important",
  },
});

export default componentStyles;
