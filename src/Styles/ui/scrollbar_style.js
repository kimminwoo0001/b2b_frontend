import { css } from "@emotion/react";

const scrollbarStyle = {
  hidden: css`
    &::-webkit-scrollbar {
      display: hidden;
    }
  `,
};

export default scrollbarStyle;
