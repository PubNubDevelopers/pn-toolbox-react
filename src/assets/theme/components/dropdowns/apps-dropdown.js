const componentStyles = (theme) => ({
  buttonLabel: {
    fontSize: ".875rem",
    fontWeight: "600",
    color: theme.palette.buttonLightLabel.main,
    textTransform: "capitalize",
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      padding: "0!important",
    },
  },
  gridItemRoot: {
    color: theme.palette.white.main,
    paddingTop: "1rem",
    paddingBottom: "1rem",
    textAlign: "center",
  },
  gridContainerRoot: {
    paddingLeft: "1.5rem",
    paddingRight: "1.5rem",
  },
  menuPaper: {
    background: theme.palette.dark.main,
    minWidth: "320px",
  },
  avatarRoot: {
    // color: #fff;
    // display: inline-flex;
    // align-items: center;
    // justify-content: center;
    // font-size: 1rem;
    height: "48px",
    width: "48px",
    // transition: all .15s cubic-bezier(.68,-.55,.265,1.55)
  },
  bgGradientError: {
    background:
      "linear-gradient(87deg," +
      theme.palette.error.main +
      ",#f56036)!important",
  },
  bgGradientWarning: {
    background:
      "linear-gradient(87deg," +
      theme.palette.warning.main +
      ",#fbb140)!important",
  },
  bgGradientInfo: {
    background:
      "linear-gradient(87deg," +
      theme.palette.info.main +
      ",#1171ef)!important",
  },
  bgGradientSuccess: {
    background:
      "linear-gradient(87deg," +
      theme.palette.success.main +
      ",#2dcecc)!important",
  },
  bgGradientPurple: {
    background: "linear-gradient(87deg,#8965e0,#bc65e0)!important",
  },
  bgGradientYellow: {
    background:
      "linear-gradient(87deg," +
      theme.palette.warning.light +
      ",#beff00)!important",
  },
});

export default componentStyles;
