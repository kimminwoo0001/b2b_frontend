import { css } from "@emotion/react";
import theme from "../Theme";

const scrollbarStyle = {
  hidden: css`
    &::-webkit-scrollbar {
      display: none;
    }
  `,

  scroll: css`
    &::-webkit-scrollbar {
      width: 9px;

      border-radius: 999px;
    }

    &::-webkit-scrollbar-thumb {
      border-right: 3px solid transparent;
      border-left: 3px solid transparent;
      background-clip: padding-box;
      background-color: ${theme.colors.bg_scrollbar};
      border-radius: 999px;
    }

    &::-webkit-scrollbar-track {
    }
  `,
};

export default scrollbarStyle;
