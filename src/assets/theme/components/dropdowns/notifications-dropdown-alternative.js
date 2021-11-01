const componentStyles = (theme) => ({
  buttonLabel: {
    fontSize: ".875rem",
    fontWeight: "600",
    textTransform: "capitalize",
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      padding: "0!important",
    },
  },
  listItemRoot: {
    padding: "1rem",
    borderBottom: "1px solid " + theme.palette.gray[200],
    textDecoration: "none",
    "&:hover": {
      backgroundColor: theme.palette.gray[100],
    },
  },
  boxAnchor: {
    textDecoration: "none",
    "&:hover": {
      backgroundColor: theme.palette.gray[100],
      color: theme.palette.info.dark,
    },
  },
  menuList: {
    padding: "0!important",
  },
  menuPaper: {
    padding: "0!important",
    minWidth: "420px",
  },
  typographyH6: {
    fontSize: ".875rem!important",
    margin: "0!important",
    color: theme.palette.gray[600],
  },
  typographyH4: {
    fontSize: ".875rem!important",
    margin: "0!important",
  },
});

export default componentStyles;
