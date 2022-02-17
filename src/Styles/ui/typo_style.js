import { css } from "@emotion/react";
import fontsStyle from "./fonts_style";
import colors from "./colors";
import theme from "../Theme";

const typoStyle = {
  // body text
  body_title: css`
    font-family: Spoqa Han Sans;
    ${fontsStyle.size[18]};
    ${fontsStyle.weight[700]};
    color: ${theme.colors.text};
  `,

  body: css`
    font-family: Spoqa Han Sans;
    ${fontsStyle.size[18]};
    ${fontsStyle.weight[400]};
    color: ${theme.colors.text};
  `,

  // contents text
  contents: css`
    font-family: Spoqa Han Sans;
    ${fontsStyle.size[15]};
    ${fontsStyle.weight[400]}
    color: ${theme.colors.text};
  `,
  contents_md: css`
    font-family: Spoqa Han Sans;
    ${fontsStyle.size[15]};
    ${fontsStyle.weight[500]};
    color: ${theme.colors.text};
  `,
  contents_title: css`
    ${fontsStyle.size[16]}
    font-family: Spoqa Han Sans;
    ${fontsStyle.weight[400]};
    color: ${theme.colors.text};
  `,

  /** info */
  info: css`
    font-family: Spoqa Han Sans;
    ${fontsStyle.size[13]};
    ${fontsStyle.weight[400]};
    color: ${theme.colors.info};
  `,

  info_md: css`
    font-family: Spoqa Han Sans;
    ${fontsStyle.size[15]};
    ${fontsStyle.weight[400]};
    color: ${theme.colors.info};
  `,

  /* label */
  label: css`
    font-family: Spoqa Han Sans;
    ${fontsStyle.size[15]};
    text-align: left;
    color: ${theme.colors.info};
  `,

  /** error */
  error: css`
    font-family: Spoqa Han Sans;
    ${fontsStyle.size[11]};
    color: ${theme.colors.error};
  `,

  /**  popup  */
  popup: css`
    font-family: Spoqa Han Sans;
    ${fontsStyle.size[18]};
    ${fontsStyle.weight[400]};
    color: ${theme.colors.text};
  `,
  popup_title: css`
    font-family: Spoqa Han Sans;
    ${fontsStyle.size[17]}
    ${fontsStyle.weight[700]};
    color: ${theme.colors.text};
  `,

  /** input type */

  placeHolder: css`
    &::placeholder {
      font-family: Spoqa Han Sans;
      ${fontsStyle.size[13]};
      color: ${theme.colors.point};
    }
  `,

  input_label: css`
    font-family: Spoqa Han Sans;
    ${fontsStyle.weight[500]};
    ${fontsStyle.size[13]};
    color: ${theme.colors.text};
  `,

  /** button type */
  button: css`
    font-family: Spoqa Han Sans;
    font-size: 14px;
    color: ${theme.colors.text};
    letter-spacing: 0.025em;
  `,

  button_popin: css`
    font-family: Poppins;
    ${fontsStyle.size[12]};
    ${fontsStyle.weight[700]};
    color: ${theme.colors.text};
  `,

  /** select type **/

  select: css`
    font-family: Spoqa Han Sans;
    text-align: left;
    ${fontsStyle.size[13]};
    color: ${theme.colors.text};
  `,

  select_item: css`
    font-family: NotoSansKR, Apple SD Gothic Neo;
    ${fontsStyle.size[11]};
    letter-spacing: -0.55px;
    color: ${theme.colors.text};
  `,

  select_red: css`
    font-family: Spoqa Han Sans;
    letter-spacing: normal;
    text-align: left;
    ${fontsStyle.size[13]};
    color: ${theme.colors.badge_red};
  `,

  /* table */
  table_head: css`
    font-family: Spoqa Han Sans;
    ${fontsStyle.size[15]};
    color: ${theme.colors.vs};
  `,
  table_text: css`
    font-family: Spoqa Han Sans;
    ${fontsStyle.size[15]};
    line-height: 1.4;
    color: ${theme.colors.text};
  `,

  /* vs */
  vs: css`
    font-family: Spoqa Han Sans;
    ${fontsStyle.size[15]};
    color: ${theme.colors.vs};
    ${fontsStyle.weight[700]};
  `,

  /* player text */
  player_id: css`
    font-family: Spoqa Han Sans;
    ${fontsStyle.size[18]};
    line-height: 22px;
    ${fontsStyle.weight[400]};
    color: ${theme.colors.text};
  `,
  player_title: css`
    font-family: Spoqa Han Sans;
    ${fontsStyle.size[15]};
    line-height: 21px;
    ${fontsStyle.weight[700]};
    color: ${theme.colors.text};
  `,

  /* event log */
  eventlog: css`
    line-height: 22px;
    ${fontsStyle.size[13]};
    color: ${theme.colors.text};

    > div {
      vertical-align: middle;
      margin: 0 2px;
    }
  `,

  /* 말줄임 스타일  */
  noWrap: css`
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  `,

  /* rate  */
  rate_win: css`
    font-family: Spoqa Han Sans;
    ${fontsStyle.size[15]};
    ${fontsStyle.weight[400]};
    color: ${colors.badge_red};
  `,
};

export default typoStyle;
