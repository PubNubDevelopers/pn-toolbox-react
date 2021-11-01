const componentStyles = (theme) => ({
  header: {
    background: theme.palette.info.main,
  },
  typographyH1: {
    color: theme.palette.white.main,
    fontWeight: "600!important",
    marginBottom: "0!important",
    fontSize: "2.75rem",
    lineHeight: 1.5,
  },
  typographyH2: {
    color: theme.palette.white.main,
    fontWeight: "300!important",
    marginBottom: "0!important",
    fontSize: "1.6275rem",
    lineHeight: 1.5,
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
  ptLg5: {
    [theme.breakpoints.up("md")]: {
      paddingTop: "3rem",
    },
  },
});

export default componentStyles;
