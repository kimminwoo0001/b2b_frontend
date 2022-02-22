import { colors } from ".";

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
    padding: 0,
    width: "fit-content",
    height: "fit-content",
    overflow: "visible",
    backgroundColor: colors.bg_box,
    color: colors.text,
    WebkitOverflowScrolling: "touch",
    outline: "none",
    borderRadius: "20px",
  },
};

export default modalStyle;
