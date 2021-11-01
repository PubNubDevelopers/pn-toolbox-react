import boxShadows from "assets/theme/box-shadow.js";

const componentStyles = (theme) => ({
  cardRoot: {
    boxShadow: boxShadows.boxShadow + "!important",
    border: "0!important",
    "& .fc.fc-theme-standard td, .fc.fc-theme-standard th, .fc.fc-theme-standard .fc-scrollgrid": {
      borderColor: theme.palette.white.main + "!important",
    },
  },
  cardHeaderRoot: {
    backgroundColor: "initial!important",
  },
  textUppercase: {
    textTransform: "uppercase",
  },
});

export default componentStyles;
