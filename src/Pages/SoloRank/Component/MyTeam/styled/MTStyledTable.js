import { motion } from "framer-motion";
import styled from "@emotion/styled";
import {
  borderRadiusStyle,
  colors,
  spacing,
  typoStyle,
} from "../../../../../Styles/ui";
import CustomCheckBox from "../../../../../Components/Ui/CustomCheckbox";
import theme from "../../../../../Styles/Theme";

export const Table = styled.div`
  width: 100%;
`;

// 공통 레이아웃 -> col 간격
export const Row = styled.div`
  display: flex;

  > div {
    display: flex;
  }

  .table-col1 {
    width: 150px;
    padding-left: 12px;
  }
  .table-col2 {
    width: 170px;
    padding-left: 20px;
    padding-right: 12px;
  }
  .table-col3 {
    width: 230px;
  }
  .table-col4 {
    width: 100px;
  }
  .table-col5 {
    width: 60px;
  }
  .table-col6 {
    width: 95px;
  }

  .table-col7 {
    width: 60px;
  }

  .table-col8 {
    ${spacing.paddingL(5)}
    width: calc(1110px - 865px);
  }
`;

/* * *  테이블 헤더 * * */
export const TableHead = styled.div`
  margin: 0 0 5px;
  height: 38px;
  ${typoStyle.table_head}
  line-height: 1.2;
  align-items: center;

  .table-head-dropdown {
    > span {
      justify-content: space-between;

      > div {
        width: 100px;
      }
    }
  }
`;
export const TableHeaderRow = styled(Row)`
  > div {
    > span {
      display: flex;
      align-items: center;
    }
  }

  .table-col8 {
    > span {
      width: 100%;
      justify-content: space-between;

      > div {
        width: 100px;
      }
    }
  }
`;

/* * * 테이블 바디 * * */
export const TableBody = styled.div``;
export const TableItemRow = styled(Row)`
  position: relative;
  background-color: ${colors.bg_box};
  ${borderRadiusStyle[20]}
  ${spacing.paddingT(1)}
  ${spacing.marginB(2)};

  > div {
    display: block;
  }

  .table-item-col1 {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: left;
    width: 150px;
    ${spacing.paddingX(3)};
    ${spacing.paddingY(5)};
  }

  .table-item-col2 {
    width: 715px;
  }

  .table-item-col3 {
    ${spacing.paddingT(2)};
    ${spacing.paddingL(5)}
    width: calc(1110px - 905px);
  }
`;
// col1 : 유저정보
export const InfoId = styled.div`
  span {
    ${typoStyle.info}
    line-height: 17px;
  }
  h5 {
    ${typoStyle.player_id}
  }
  h6 {
    ${typoStyle.select}
    line-height: 17px;
  }
`;
export const Star = styled(CustomCheckBox)`
  display: block;
  margin-bottom: 4px;
`;

// 테이블 바디 - col2 정렬필터
export const OpenList = styled.li`
  position: relative;
  display: flex;
  ${borderRadiusStyle[20]}
  ${spacing.paddingY(3)}
  background-color: ${colors.bg_select};

  &:not(:last-child) {
    ${spacing.marginY(1)}
  }

  div {
    display: flex;
    align-items: center;
  }

  /* 선수이름, 삭제버튼 */
  > div:nth-of-type(1) {
    span {
      ${typoStyle.player_title};
    }
  }

  /* 선수티어 */
  > div:nth-of-type(2) {
    flex-direction: column;
    align-items: flex-start;

    /* 현재티어 점수 */
    p {
      line-height: 38px;
    }

    /* 이번시즌 / 전시즌 */
    span {
      ${typoStyle.info}
    }
  }

  > div:nth-of-type(3) {
    flex-direction: column;
    align-items: flex-start;

    span {
      display: block;
    }
  }

  > div:nth-of-type(4) {
    ${typoStyle.rate_win}
  }

  > div:nth-of-type(5) {
    flex-direction: column;
    align-items: flex-start;

    span {
      display: block;
    }
  }

  > div:nth-of-type(6) {
    ${typoStyle.rate_win}
  }

  > div:nth-of-type(7) {
  }

  button {
    position: absolute;
    right: -5px;
    top: 0;
    padding: 0;

    &:hover {
      .background {
        fill: ${colors.default_hover};
      }
    }
  }
`;
export const AddPlayer = styled.li`
  width: 715px;
  display: flex;
  align-items: center;
  ${spacing.paddingY(3)};
  ${spacing.paddingX(5)};
  ${spacing.marginB(5)};
  ${borderRadiusStyle[20]};
  ${typoStyle.select}
  background-color: ${colors.bg_select};
  cursor: pointer;

  &:hover {
    button {
      background-color: ${colors.default_hover};
    }
  }

  button {
    ${spacing.marginR(2)}
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    background-color: ${colors.default};
    border-radius: 50%;
    font-size: 24px;
    color: white;
  }

  p {
    font-weight: 700;
  }
`;

// close 상태
export const CloseList = styled.li`
  display: flex;
  height: 100%;

  > div {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }

  > div:nth-of-type(2) {
    /* 이번시즌 / 전시즌 */
    span {
      ${typoStyle.info}
    }
  }

  > div:nth-of-type(4) {
    ${typoStyle.rate_win}
  }

  > div:nth-of-type(6) {
    ${typoStyle.rate_win}
  }
`;

// 테이블 바디 - col3 최근 플레이한 챔피언
export const ChampList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: ${({ isOpen }) => (isOpen ? "flex-start" : "center")};

  li {
    margin-bottom: ${({ isOpen }) => (isOpen ? "32px" : "4px")};
  }
`;
export const ChampListItem = styled.li``;
export const ChampLabel = styled.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 17px;
  border-radius: 3px;
  background-color: ${colors.bg_select};
  ${spacing.marginB(1)}
  ${typoStyle.select}
`;
export const ChampInfo = styled.div``;
export const ChampInfoText = styled.div`
  display: flex;
  align-items: center;

  > div:first-of-type {
    ${spacing.marginR(1)}
  }

  > div:nth-of-type(2) {
    overflow: hidden;
    flex: 1;
  }

  h6 {
    font-size: 15px;
    font-weight: bold;
    line-height: 21px;
  }
  p {
    width: 100%;
    ${typoStyle.contents}
    em {
      display: block;
      color: ${colors.badge_red};
    }
  }
`;

// 오픈 클로즈 버튼
export const ToggleMenuButton = styled.button`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  right: 0;
  top: 0;
  width: 40px;
  height: 100%;
  border-radius: 0 20px 20px 0;
  background-color: ${colors.bg_select};
`;

// 우리팀 소속선수 등록
export const AddPlayerPopupButton = styled.button`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  background-color: ${colors.bg_box};
  ${borderRadiusStyle[20]}
  ${spacing.paddingY(9)}
  ${spacing.paddingX(5)}

  &:hover {
    > span {
      background-color: ${colors.default_hover};
    }
  }

  > div {
    text-align: left;

    h5 {
      ${typoStyle.player_id};
      font-weight: 700;
      ${spacing.marginB(1)}
    }

    span {
      ${typoStyle.body};
    }
  }

  > span {
    ${spacing.marginR(2)}
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    background-color: ${colors.default};
    border-radius: 50%;
    font-size: 24px;
    color: white;
  }
`;
