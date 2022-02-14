import { css } from "@emotion/react";

const scrollbarStyle = {
  hidden: css`
    &::-webkit-scrollbar {
      display: none;
    }
  `,
};

export default scrollbarStyle;
