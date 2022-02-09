import { css } from "@emotion/react";

const transitionStyle = {
  opacity: css`
    transition: opacity 200ms ease-in-out;
  `,
  background: css`
    transition: background-image 200ms ease-in-out;
  `,
};

export default transitionStyle;
