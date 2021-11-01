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
  timeline: {
    position: "relative",
    "&:before": {
      [theme.breakpoints.up("md")]: {
        left: "50%",
        marginLeft: "-2px",
      },
      borderRightStyle: "dashed",
      content: "''",
      position: "absolute",
      top: 0,
      left: "1rem",
      height: "100%",
      borderRight: "2px solid " + theme.palette.gray[200],
    },
  },
  timelineOneSide: {
    "&:before": {
      left: "1rem",
    },
    "& $timelineContent": {
      width: "auto",
      [theme.breakpoints.up("md")]: {
        maxWidth: "30rem",
      },
    },
    "& $timelineBadgeRoot": {
      [theme.breakpoints.up("md")]: {
        left: "-2px",
      },
    },
    "& $timelineBlock": {
      "&:nth-child(2n) $timelineContent": {
        float: "none",
      },
    },
  },
  timelineBlock: {
    position: "relative",
    margin: "2rem 0",
    "&:first-child": {
      marginTop: 0,
    },
    "&:last-child": {
      marginBottom: 0,
    },
    "&:after": {
      content: "''",
      display: "table",
      clear: "both",
    },
    "&:nth-child(2n) $timelineContent": {
      float: "right",
    },
  },
  timelineBadgeRoot: {
    position: "absolute",
    [theme.breakpoints.up("md")]: {
      left: "47.5%",
    },
  },
  timelineBadge: {
    width: "33px",
    height: "33px",
    borderRadius: "50%",
    display: "inline-flex",
  },
  timelineContent: {
    marginLeft: "60px",
    paddingTop: ".5rem",
    position: "relative",
    top: " -6px",
    [theme.breakpoints.up("md")]: {
      width: "38%",
    },
  },
  typographyH5: {
    marginBottom: 0,
    marginTop: "1rem",
  },
  badgeMargin: {
    "&:not(:last-child)": {
      marginRight: ".5rem!important",
    },
  },
});

export default componentStyles;
