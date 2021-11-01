const componentStyles = (theme) => ({
  cardHeader: {
    backgroundColor: "initial",
  },
  containerRoot: {
    [theme.breakpoints.up("md")]: {
      paddingLeft: "30px",
      paddingRight: "30px",
    },
  },
  header: {
    position: "relative",
    backgroundColor: theme.palette.info.main,
    paddingBottom: "4.5rem",
  },
  buttonRoot: {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.white.main,
    borderColor: theme.palette.white.main,
    "&:not(:last-of-type)": { marginRight: ".75rem" },
    "&:hover": {
      backgroundColor: theme.palette.white.main,
      borderColor: theme.palette.white.main,
      color: theme.palette.dark.main,
    },
  },
  displayInlineBlock: {
    display: "inline-block",
  },
  mb0: {
    marginBottom: 0,
  },
  breadcrumbRoot: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      marginLeft: "1.5rem",
      display: "inline-block",
    },
  },
  breadcrumbOl: {
    background: "transparent",
    marginBottom: 0,
  },
  breadcrumbLi: {
    "& a": {
      color: theme.palette.gray[100],
      textDecoration: "none",
      fontWeight: 600,
      "&:hover": {
        color: theme.palette.white.main,
        textDecoration: "none",
      },
    },
  },
  breadcrumbSeparator: {
    color: theme.palette.white.main,
  },
  breadcrumbActive: {
    fontSize: ".875rem",
    color: theme.palette.gray[300],
    fontWeight: 600,
  },
  textWhite: {
    color: theme.palette.white.main,
  },
  p0: {
    padding: "0!important",
  },
  radioButton: {
    width: "30px!important",
    height: "30px!important",
  },
  textLgRight: {
    [theme.breakpoints.up("lg")]: {
      textAlign: "right",
    },
  },
});

export default componentStyles;
