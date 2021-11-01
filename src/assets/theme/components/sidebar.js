const componentStyles = (theme) => ({
  collapseRoot: {
    "& $listItemRoot": {
      fontSize: ".8125rem",
      padding: ".65rem 1rem !important",
    },
  },
  listRoot: {
    marginTop: "2rem",
    height: "100%",
  },
  listRootCollapse: {
    padding: "0!important",
  },
  listItemRoot: {
    display: "flex",
    fontSize: ".9rem",
    color: theme.palette.sidebarLinks.main,
    padding: ".8125rem 1rem !important",
    borderRadius: ".375rem",
    marginRight: ".5rem",
    marginLeft: ".5rem",
    width: "auto",
    "&:hover": {
      color: theme.palette.sidebarLinks.dark,
    },
  },
  listItemRootCollapseActive: {
    background: theme.palette.gray[100],
    color: theme.palette.sidebarLinks.dark,
  },
  listItemRootCollapseIcon: {
    transition: "all .15s ease",
  },
  listItemRootCollapseActiveIcon: {
    transform: "rotate(90deg)",
  },
  listItemRootUpgradeToPro: {
    [theme.breakpoints.up("md")]: {
      position: "absolute",
      bottom: "10px",
    },
    "&,&:hover": {
      background: theme.palette.gray[100] + "!important",
    },
    "&:before": {
      display: "none",
    },
  },
  listItemSelected: {
    color: theme.palette.sidebarLinks.dark,
    "&$listItemRoot,&$listItemRoot:hover": {
      backgroundColor: "unset",
    },
  },
  listItemIconRoot: {
    minWidth: "2.25rem",
    fontSize: ".9375rem",
    lineHeight: "1.5rem",
    display: "inline-block",
    top: "2px",
  },
  divider: {
    marginBottom: "1rem",
    marginTop: "1rem",
    marginLeft: "1.5rem",
    marginRight: "1.5rem",
  },
  title: {
    paddingTop: ".25rem",
    paddingBottom: ".25rem",
    fontSize: ".75rem",
    textTransform: "uppercase",
    letterSpacing: ".04em",
    paddingLeft: "1.5rem",
    paddingRight: "1.5rem",
    color: theme.palette.gray[600],
  },
  logoClasses: {
    maxHeight: "2rem",
    maxWidth: "100%",
    verticalAlign: "middle",
    borderStyle: "none",
  },
  logoLinkClasses: {
    fontSize: "1.25rem",
    lineHeight: "inherit",
    whiteSpace: "nowrap",
    textDecoration: "none",
    display: "block",
    textAlign: "center",
  },
  textPrimary: {
    color: theme.palette.primary.main,
  },
  textPrimaryLight: {
    color: theme.palette.primary.light,
  },
  textError: {
    color: theme.palette.error.main,
  },
  textErrorLight: {
    color: theme.palette.error.light,
  },
  textWarning: {
    color: theme.palette.warning.main,
  },
  textWarningLight: {
    color: theme.palette.warning.light,
  },
  textInfo: {
    color: theme.palette.info.main,
  },
  textInfoLight: {
    color: theme.palette.info.light,
  },
  textSuccess: {
    color: theme.palette.success.main,
  },
  textSuccessLight: {
    color: theme.palette.success.light,
  },
  textDefault: {
    color: theme.palette.dark.main,
  },
  menuPaper: {
    width: "calc(100% - 2rem)",
  },
  outlineNone: {
    outline: "none!important",
  },
  drawerDockedMiniActive: {
    width: "62px",
    overflowX: "hidden",
  },
  drawerPaperMiniActive: {
    width: "62px",
    overflowX: "hidden",
  },
});

export default componentStyles;
