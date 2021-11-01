import boxShadows from "assets/theme/box-shadow.js";

const componentStyles = (theme) => ({
  cardRoot: {
    boxShadow: boxShadows.boxShadow + "!important",
    border: "0!important",
  },
  gridItemRoot: {
    flexBasis: 0,
    flexGrow: 1,
    maxWidth: "100%",
  },
  listItemRoot: {
    paddingLeft: "1.5rem",
    paddingRight: "1.5rem",
    "&:not(:last-child)": {
      borderBottom: "1px solid " + theme.palette.gray[200],
    },
  },
  mb0: {
    marginBottom: 0,
  },
  typographyH5: {
    marginBottom: "0!important",
  },
  cardContentRoot: {
    padding: "0!important",
  },
  typographyH4: {
    marginTop: "1rem!important",
    marginBottom: ".25rem!important",
  },
  avatarRoot: {
    width: "24px",
    height: "24px",
    borderRadius: ".375rem",
    marginRight: ".5rem",
  },
  avatarImg: {
    borderRadius: ".375rem",
  },
});

export default componentStyles;
