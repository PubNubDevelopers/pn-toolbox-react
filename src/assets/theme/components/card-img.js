const componentStyles = () => ({
  cardImgTop: {
    borderTopLeftRadius: "calc(.375rem - 1px)",
    borderTopRightRadius: "calc(.375rem - 1px)",
    flexShrink: 0,
    width: "100%",
    verticalAlign: "middle",
    borderStyle: "none",
  },
  cardImgOverlay: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    padding: "1.25rem",
    borderRadius: "calc(.375rem - 1px)",
  },
});

export default componentStyles;
