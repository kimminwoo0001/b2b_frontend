import { css } from "@emotion/react";
import theme from "../Theme";

const buttonStyle = {
  color: {
    main: css`
      background-color: ${theme.colors.point};
    `,
    default: css`
      background-color: ${theme.colors.default};
    `,
  },

  size: {
    lg: css`
      padding: 20px 0;
      width: 100%;
    `,
    md: css`
      padding: 0 25px;
    `,
  },
};

export default buttonStyle;
