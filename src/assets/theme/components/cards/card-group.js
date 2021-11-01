const componentStyles = (theme) => ({
  cardGroup: {
    display: "flex",
    flexDirection: "column",
    "&>.MuiCard-root": {
      marginBottom: "15px",
    },
    [theme.breakpoints.up("sm")]: {
      flexFlow: "row wrap",
      "&>.MuiCard-root": {
        flex: "1 0",
        marginBottom: 0,
      },
      "&>.MuiCard-root:first-child,&>.MuiCard-root:not(:last-child)": {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
      },
      "&>.MuiCard-root:last-child,&>.MuiCard-root:not(:first-child)": {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
      },
      "&>.MuiCard-root+.MuiCard-root": {
        marginLeft: "0",
        borderLeft: "0",
      },
    },
  },
});

export default componentStyles;
