const componentStyles = (theme) => ({
  cardRootDark: {
    backgroundColor: theme.palette.dark.main,
    "& p,& h5, & smal, & div": {
      color: theme.palette.white.main,
    },
  },
  cardHeader: {
    backgroundColor: "initial",
  },
  containerRoot: {
    [theme.breakpoints.up("md")]: {
      paddingLeft: "30px",
      paddingRight: "30px",
    },
  },
  borderLeft0: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  borderRight0: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
});

export default componentStyles;
