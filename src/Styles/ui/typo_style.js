import { css } from "@emotion/react";
import fontsStyle from "./fonts_style";
import colors from "./colors";

const typoStyle = {
  // body text
  body_title: css`
    font-family: Spoqa Han Sans;
    ${fontsStyle.size[18]};
    ${fontsStyle.weight[700]};
    color: ${colors.text};
  `,

  body: css`
    font-family: Spoqa Han Sans;
    ${fontsStyle.size[18]};
    ${fontsStyle.weight[400]};
    color: ${colors.text};
  `,

  // contents text
  contents: css`
    font-family: Spoqa Han Sans;
    ${fontsStyle.size[15]};
    ${fontsStyle.weight[400]}
    color: ${colors.text};
  `,
  contents_md: css`
    font-family: Spoqa Han Sans;
    ${fontsStyle.size[15]};
    ${fontsStyle.weight[500]};
    color: ${colors.text};
  `,
  contents_title: css`
    ${fontsStyle.size[16]}
    font-family: Spoqa Han Sans;
    ${fontsStyle.weight[400]};
    color: ${colors.text};
  `,

  /** info */
  info: css`
    font-family: Spoqa Han Sans;
    ${fontsStyle.size[13]};
    ${fontsStyle.weight[400]};
    color: ${colors.info};
  `,

  info_md: css`
    font-family: Spoqa Han Sans;
    ${fontsStyle.size[15]};
    ${fontsStyle.weight[400]};
    color: ${colors.info};
  `,

  /* label */
  label: css`
    font-family: Spoqa Han Sans;
    ${fontsStyle.size[15]};
    text-align: left;
    color: ${colors.info};
  `,

  /** error */
  error: css`
    font-family: Spoqa Han Sans;
    ${fontsStyle.size[11]};
    color: ${colors.error};
  `,

  /**  popup  */
  popup: css`
    font-family: Spoqa Han Sans;
    ${fontsStyle.size[18]};
    ${fontsStyle.weight[400]};
    color: ${colors.text};
  `,
  popup_title: css`
    font-family: Spoqa Han Sans;
    ${fontsStyle.size[17]}
    ${fontsStyle.weight[700]};
    color: ${colors.text};
  `,

  /** input type */

  placeHolder: css`
    &::placeholder {
      font-family: Spoqa Han Sans;
      ${fontsStyle.size[13]};
      color: ${colors.point};
    }
  `,

  input_label: css`
    font-family: Spoqa Han Sans;
    ${fontsStyle.weight[500]};
    ${fontsStyle.size[13]};
    color: ${colors.text};
  `,

  /** button type */
  button: css`
    font-family: Spoqa Han Sans;
    font-size: 14px;
    color: ${colors.text};
    letter-spacing: 0.025em;
  `,
  button_13: css`
    font-family: Spoqa Han Sans;
    ${fontsStyle.size[13]};
    ${fontsStyle.weight[700]};
    color: ${colors.text};
  `,

  button_popin: css`
    font-family: Poppins;
    ${fontsStyle.size[12]};
    ${fontsStyle.weight[700]};
    color: ${colors.text};
  `,
  button_18: css`
    ${fontsStyle.size[18]};
    ${fontsStyle.weight[400]};
    color: ${colors.text};
  `,

  /** select type **/

  select: css`
    font-family: Spoqa Han Sans;
    text-align: left;
    ${fontsStyle.size[13]};
    color: ${colors.text};
  `,

  select_item: css`
    font-family: NotoSansKR, Apple SD Gothic Neo;
    ${fontsStyle.size[11]};
    letter-spacing: -0.55px;
    color: ${colors.text};
  `,

  select_red: css`
    font-family: Spoqa Han Sans;
    letter-spacing: normal;
    text-align: left;
    ${fontsStyle.size[13]};
    color: ${colors.badge_red};
  `,

  /* table */
  table_head: css`
    font-family: Spoqa Han Sans;
    ${fontsStyle.size[15]};
    color: ${colors.vs};
  `,
  table_text: css`
    font-family: Spoqa Han Sans;
    ${fontsStyle.size[15]};
    line-height: 1.4;
    color: ${colors.text};
  `,

  /* vs */
  vs: css`
    font-family: Spoqa Han Sans;
    ${fontsStyle.size[15]};
    color: ${colors.vs};
    ${fontsStyle.weight[700]};
  `,

  /* player text */
  player_id: css`
    font-family: Spoqa Han Sans;
    ${fontsStyle.size[18]};
    line-height: 22px;
    ${fontsStyle.weight[400]};
    color: ${colors.text};
  `,
  player_title: css`
    font-family: Spoqa Han Sans;
    ${fontsStyle.size[15]};
    line-height: 21px;
    ${fontsStyle.weight[700]};
    color: ${colors.text};
  `,

  /* event log */
  eventlog: css`
    line-height: 22px;
    ${fontsStyle.size[13]};
    color: ${colors.text};

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
    width: inherit;
  `,

  /* 2줄 말줄임 스타일2  */
  ellipsis_two: css`
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  `,

  /* rate  */
  rate_win: css`
    font-family: Spoqa Han Sans;
    ${fontsStyle.size[15]};
    ${fontsStyle.weight[400]};
    color: ${colors.badge_red};
  `,

  /* SoloRank Search Button */
  search_btn: css`
    font-family: Spoqa Han Sans;
    ${fontsStyle.size[14]};
    color: ${colors.text};
  `
};

export default typoStyle;
