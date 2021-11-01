const componentStyles = (theme) => ({
  buttonContainedDefault: {
    backgroundColor: theme.palette.dark.main,
    borderColor: theme.palette.dark.main,
    color: theme.palette.white.main,
    "&:hover": {
      backgroundColor: theme.palette.dark.dark,
      borderColor: theme.palette.dark.dark,
    },
  },
  buttonContainedPrimary: {
    backgroundColor: theme.palette.primary.main,
    borderColor: theme.palette.primary.main,
    color: theme.palette.white.main,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
      borderColor: theme.palette.primary.dark,
    },
  },
  buttonContainedInfo: {
    backgroundColor: theme.palette.info.main,
    borderColor: theme.palette.info.main,
    color: theme.palette.white.main,
    "&:hover": {
      backgroundColor: theme.palette.info.dark,
      borderColor: theme.palette.info.dark,
    },
  },
  buttonContainedSuccess: {
    backgroundColor: theme.palette.success.main,
    borderColor: theme.palette.success.main,
    color: theme.palette.white.main,
    "&:hover": {
      backgroundColor: theme.palette.success.dark,
      borderColor: theme.palette.success.dark,
    },
  },
  buttonContainedError: {
    backgroundColor: theme.palette.error.main,
    borderColor: theme.palette.error.main,
    color: theme.palette.white.main,
    "&:hover": {
      backgroundColor: theme.palette.error.dark,
      borderColor: theme.palette.error.dark,
    },
  },
  buttonContainedWarning: {
    backgroundColor: theme.palette.warning.main,
    borderColor: theme.palette.warning.main,
    color: theme.palette.white.main,
    "&:hover": {
      backgroundColor: theme.palette.warning.dark,
      borderColor: theme.palette.warning.dark,
    },
  },
  buttonOutlineInfo: {
    color: theme.palette.info.main,
    borderColor: theme.palette.info.main,
    "&:hover": {
      backgroundColor: theme.palette.info.main,
    },
  },
  buttonOutlineSuccess: {
    color: theme.palette.success.main,
    borderColor: theme.palette.success.main,
    "&:hover": {
      backgroundColor: theme.palette.success.main,
    },
  },
  buttonOutlineError: {
    color: theme.palette.error.main,
    borderColor: theme.palette.error.main,
    "&:hover": {
      backgroundColor: theme.palette.error.main,
    },
  },
  buttonOutlineWarning: {
    color: theme.palette.warning.main,
    borderColor: theme.palette.warning.main,
    "&:hover": {
      backgroundColor: theme.palette.warning.main,
    },
  },
  buttonActive: {
    backgroundColor: theme.palette.dark.dark,
    borderColor: theme.palette.dark.dark,
  },
  buttonActivePrimary: {
    backgroundColor: theme.palette.primary.dark,
    borderColor: theme.palette.primary.dark,
  },
  buttonActiveSecondary: {
    backgroundColor: theme.palette.secondary.btnActive,
    borderColor: theme.palette.secondary.btnActive,
  },
  buttonActiveInfo: {
    backgroundColor: theme.palette.info.dark,
    borderColor: theme.palette.info.dark,
  },
  buttonActiveSuccess: {
    backgroundColor: theme.palette.success.dark,
    borderColor: theme.palette.success.dark,
  },
  buttonActiveError: {
    backgroundColor: theme.palette.error.dark,
    borderColor: theme.palette.error.dark,
  },
  buttonActiveWarning: {
    backgroundColor: theme.palette.warning.dark,
    borderColor: theme.palette.warning.dark,
  },
  buttonDisabled: {
    opacity: ".65",
    boxShadow: "none!important",
    pointerEvents: "none",
  },
  butttonInfoContainedGroup: {
    backgroundColor: theme.palette.info.main + "!important",
    borderColor: theme.palette.info.main + "!important",
    color: theme.palette.white.main + "!important",
    "&:hover": {
      backgroundColor: theme.palette.info.dark + "!important",
      borderColor: theme.palette.info.dark + "!important",
    },
  },
  // use this when working with small buttons
  letterSpacingInherit: {
    letterSpacing: "inherit",
  },
  buttonContainedFacebook: {
    backgroundColor: theme.palette.facebook.main,
    borderColor: theme.palette.facebook.main,
    color: theme.palette.white.main,
    "&:hover": {
      backgroundColor: theme.palette.facebook.dark,
      borderColor: theme.palette.facebook.dark,
    },
  },
  buttonContainedTwitter: {
    backgroundColor: theme.palette.twitter.main,
    borderColor: theme.palette.twitter.main,
    color: theme.palette.white.main,
    "&:hover": {
      backgroundColor: theme.palette.twitter.dark,
      borderColor: theme.palette.twitter.dark,
    },
  },
  buttonContainedGoogle: {
    backgroundColor: theme.palette.google.main,
    borderColor: theme.palette.google.main,
    color: theme.palette.white.main,
    "&:hover": {
      backgroundColor: theme.palette.google.dark,
      borderColor: theme.palette.google.dark,
    },
  },
  buttonContainedInstagram: {
    backgroundColor: theme.palette.instagram.main,
    borderColor: theme.palette.instagram.main,
    color: theme.palette.white.main,
    "&:hover": {
      backgroundColor: theme.palette.instagram.dark,
      borderColor: theme.palette.instagram.dark,
    },
  },
  buttonContainedPinterest: {
    backgroundColor: theme.palette.pinterest.main,
    borderColor: theme.palette.pinterest.main,
    color: theme.palette.white.main,
    "&:hover": {
      backgroundColor: theme.palette.pinterest.dark,
      borderColor: theme.palette.pinterest.dark,
    },
  },
  buttonContainedYoutube: {
    backgroundColor: theme.palette.youtube.main,
    borderColor: theme.palette.youtube.main,
    color: theme.palette.white.main,
    "&:hover": {
      backgroundColor: theme.palette.youtube.dark,
      borderColor: theme.palette.youtube.dark,
    },
  },
  buttonContainedVimeo: {
    backgroundColor: theme.palette.vimeo.main,
    borderColor: theme.palette.vimeo.main,
    color: theme.palette.white.main,
    "&:hover": {
      backgroundColor: theme.palette.vimeo.dark,
      borderColor: theme.palette.vimeo.dark,
    },
  },
  buttonContainedSlack: {
    backgroundColor: theme.palette.slack.main,
    borderColor: theme.palette.slack.main,
    color: theme.palette.white.main,
    "&:hover": {
      backgroundColor: theme.palette.slack.dark,
      borderColor: theme.palette.slack.dark,
    },
  },
  buttonContainedDribbble: {
    backgroundColor: theme.palette.dribbble.main,
    borderColor: theme.palette.dribbble.main,
    color: theme.palette.white.main,
    "&:hover": {
      backgroundColor: theme.palette.dribbble.dark,
      borderColor: theme.palette.dribbble.dark,
    },
  },
  buttonContainedGithub: {
    backgroundColor: theme.palette.github.main,
    borderColor: theme.palette.github.main,
    color: theme.palette.white.main,
    "&:hover": {
      backgroundColor: theme.palette.github.dark,
      borderColor: theme.palette.github.dark,
    },
  },
  buttonIconOnly: {
    width: "2.375rem",
    height: "2.375rem",
    padding: "0",
    minWidth: "unset",
  },
});

export default componentStyles;
