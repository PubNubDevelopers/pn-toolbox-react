const componentStyles = (theme) => ({
  cardRoot: {
    background:
      "linear-gradient(87deg," +
      theme.palette.dark.main +
      ",#1a174d)!important",
  },
  typographyH2: {
    color: theme.palette.white.main,
  },
  buttonRoot: {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.white.main,
    borderColor: theme.palette.white.main,
    "&:first-of-type": { marginRight: ".75rem" },
    "&:hover": {
      backgroundColor: theme.palette.white.main,
      borderColor: theme.palette.white.main,
      color: theme.palette.dark.main,
    },
  },
  linearProgressRoot: {
    height: "3px!important",
    margin: ".5rem 0!important",
  },
  bgSuccess: {
    background: theme.palette.success.main,
  },
  bgWarning: {
    background: theme.palette.warning.main,
  },
});

export default componentStyles;
