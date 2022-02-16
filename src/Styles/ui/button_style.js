import { css } from "@emotion/react";
import theme from "../Theme";

const buttonStyle = {
  color: {
    main: css`
      background-color: ${theme.colors.point};

      &:disabled {
        background-color: ${theme.colors.default};
      }

      &:not(:disabled):hover {
      }
    `,
    default: css`
      background-color: ${theme.colors.default};
      &:disabled {
        background-color: ${theme.colors.default};
      }
      &:not(:disabled):hover {
        background-color: ${theme.colors.point};
      }
    `,
    normal: css`
      color: ${theme.colors.text_hover};
      background-color: ${theme.colors.default};

      &:disabled {
        background-color: ${theme.colors.default};
      }

      &:not(:disabled):hover,
      &:not(:disabled).is-active {
        color: ${theme.colors.text};
        background-color: ${theme.colors.bg_select};
      }
    `,
  },

  size: {
    /* w-full */
    full: css`
      width: 100%;
    `,
    /* lg : 25px */
    25: css`
      padding: 25px;
    `,
    x_25: css`
      padding-right: 25px;
      padding-left: 25px;
    `,
    y_25: css`
      padding-top: 25px;
      padding-bottom: 25px;
    `,
    /* md : 20px */
    20: css`
      padding: 20px;
    `,
    x_20: css`
      padding-right: 20px;
      padding-left: 20px;
    `,
    y_20: css`
      padding-top: 20px;
      padding-bottom: 20px;
    `,

    /* sm : 10px */
    10: css`
      padding: 10px;
    `,
    x_8: css`
      padding-right: 8px;
      padding-left: 8px;
    `,
    y_8: css`
      padding-top: 8px;
      padding-bottom: 8px;
    `,
  },
};

export default buttonStyle;
