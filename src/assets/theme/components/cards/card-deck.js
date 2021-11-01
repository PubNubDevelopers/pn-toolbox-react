const componentStyles = (theme) => ({
  cardDeck: {
    display: "flex",
    flexDirection: "column",
    "& .MuiCard-root": {
      marginBottom: "30px",
    },
    [theme.breakpoints.up("sm")]: {
      display: "flex",
      flexFlow: "row wrap",
      marginLeft: "-15px",
      marginRight: "-15px",
      "& .MuiCard-root": {
        flex: "1 0",
        marginRight: "15px",
        marginLeft: "15px",
        display: "flex",
        flexDirection: "column",
      },
    },
  },
});

export default componentStyles;
