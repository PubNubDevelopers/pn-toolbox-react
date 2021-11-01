const componentStyles = (theme) => ({
  infoSwitchThumb: {},
  infoSwitchTrack: {},
  successSwitchThumb: {},
  successSwitchTrack: {},
  errorSwitchThumb: {},
  errorSwitchTrack: {},
  warningSwitchThumb: {},
  warningSwitchTrack: {},
  whiteSwitchThumb: {},
  whiteSwitchTrack: {},
  checkedSwitch: {
    "& $infoSwitchThumb": {
      backgroundColor: theme.palette.info.main + "!important",
    },
    "& + $infoSwitchTrack": {
      borderColor: theme.palette.info.main + "!important",
    },
    "& $successSwitchThumb": {
      backgroundColor: theme.palette.success.main + "!important",
    },
    "& + $successSwitchTrack": {
      borderColor: theme.palette.success.main + "!important",
    },
    "& $errorSwitchThumb": {
      backgroundColor: theme.palette.error.main + "!important",
    },
    "& + $errorSwitchTrack": {
      borderColor: theme.palette.error.main + "!important",
    },
    "& $warningSwitchThumb": {
      backgroundColor: theme.palette.warning.main + "!important",
    },
    "& + $warningSwitchTrack": {
      borderColor: theme.palette.warning.main + "!important",
    },
    "& $whiteSwitchThumb": {
      backgroundColor: theme.palette.white.main + "!important",
    },
    "& + $whiteSwitchTrack": {
      borderColor: theme.palette.white.main + "!important",
    },
  },
});

export default componentStyles;
