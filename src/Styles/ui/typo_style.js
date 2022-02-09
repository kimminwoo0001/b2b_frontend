import { css } from "@emotion/react";
import theme from "../Theme";

const typoStyle = {
  // body text
  body_title: css`
    font-family: "Spoqa Han Sans";
    font-size: 18px;
    font-weight: 700;
    color: ${theme.colors.text};
  `,

  body: css`
    font-family: "Spoqa Han Sans";
    font-size: 18px;
    font-weight: 400;
    color: ${theme.colors.text};
  `,

  // contents text
  contents: css`
    font-family: "Spoqa Han Sans";
    font-size: 15px;
    font-weight: 400;
    color: ${theme.colors.text};
  `,
  contents_md: css`
    font-family: "Spoqa Han Sans";
    font-size: 15px;
    font-weight: 500;
    color: ${theme.colors.text};
  `,
  contents_title: css`
    font-size: 16px;
    font-family: "Spoqa Han Sans";
    font-weight: 500;
    color: ${theme.colors.text};
  `,

  // info text
  info: css`
    font-family: "Spoqa Han Sans";
    font-size: 13px;
    font-weight: 400;
    color: ${theme.colors.info};
  `,

  // error text
  error: css`
    font-family: "Spoqa Han Sans";
    font-size: 11px;
    color: ${theme.colors.error};
  `,

  // popup text
  popup: css`
    font-family: "Spoqa Han Sans";
    font-size: 18px;
    font-weight: 400;
    color: ${theme.colors.text};
  `,
  popup_title: css`
    font-family: "Spoqa Han Sans";
    font-size: 17px;
    font-weight: 700;
    color: ${theme.colors.text};
  `,

  //placeHolder
  placeHolder: css`
    &::placeholder {
      font-family: "Spoqa Han Sans";
      font-size: 13px;
      color: ${theme.colors.point};
    }
  `,

  // button text
  button: css`
    font-family: "Spoqa Han Sans";
    font-size: 14px;
    color: ${theme.colors.text};
    letter-spacing: 0.025em;
  `,
};

export default typoStyle;
