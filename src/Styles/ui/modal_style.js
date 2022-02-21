export const modalStyle = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },

  content: {
    position: "relative",
    inset: 0,
    border: "none",
    borderRadius: 0,
    padding: 0,
    width: "fit-content",
    height: "fit-content",
    overflow: "auto",
    WebkitOverflowScrolling: "touch",
    outline: "none",
  },
};

export default modalStyle;
