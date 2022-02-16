import { css } from "@emotion/react";
import { colors, transitionStyle } from ".";

const inputStyle = {
  color: {
    default: css`
      color: ${colors.text};
      background-color: ${colors.bg_checkbox};
      outline: 2px solid rgba(89, 66, 186, 0);
      box-shadow: 0 0 2px rgba(89, 66, 186, 0);
      transition: all 0.3s ease-in-out;

      &::placeholder {
        color: ${colors.info};
        ${transitionStyle.opacity}
      }

      &:focus {
        outline: 2px solid rgba(89, 66, 186, 0.8);
        box-shadow: 0 0 2px rgba(89, 66, 186, 0.4);
        &::placeholder {
          opacity: 0;
        }
      }
    `,
  },
};

export default inputStyle;
