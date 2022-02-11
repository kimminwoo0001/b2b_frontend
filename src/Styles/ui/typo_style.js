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

  /** info */
  info: css`
    font-family: "Spoqa Han Sans";
    font-size: 13px;
    font-weight: 400;
    color: ${theme.colors.info};
  `,

  info_md: css`
    font-family: "Spoqa Han Sans";
    font-size: 15px;
    font-weight: 400;
    color: ${theme.colors.info};
  `,

  /* label */
  label: css`
    font-family: "Spoqa Han Sans";
    font-size: 15px;
    text-align: left;
    color: ${theme.colors.info};
  `,

  /** error */
  error: css`
    font-family: "Spoqa Han Sans";
    font-size: 11px;
    color: ${theme.colors.error};
  `,

  /**  popup  */
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

  /** input type */

  placeHolder: css`
    &::placeholder {
      font-family: "Spoqa Han Sans";
      font-size: 13px;
      color: ${theme.colors.point};
    }
  `,

  /** button type */
  button: css`
    font-family: "Spoqa Han Sans";
    font-size: 14px;
    color: ${theme.colors.text};
    letter-spacing: 0.025em;
  `,

  /** select type **/

  select: css`
    font-family: SpoqaHanSansNeo;
    letter-spacing: normal;
    text-align: left;
    font-size: 13px;
    color: ${theme.colors.text};
  `,

  select_item: css`
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 11px;
    letter-spacing: -0.55px;
    color: ${theme.colors.text};
  `,

  /* table */
  table_head: css`
    font-family: SpoqaHanSansNeo;
    font-size: 15px;
    color: ${theme.colors.vs};
  `,

  /* vs */
  vs: css`
    font-family: SpoqaHanSansNeo;
    font-size: 15px;
    color: ${theme.colors.vs};
    font-weight: 700;
  `,
};

export default typoStyle;
