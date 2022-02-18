import { motion } from "framer-motion";
import styled from "@emotion/styled";
import {
  borderRadiusStyle,
  colors,
  spacing,
  typoStyle,
} from "../../../../../Styles/ui";
import CustomCheckBox from "../../../../../Components/Ui/CustomCheckbox";

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
  ${spacing.paddingB(5)}

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
  z-index: 1;
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
  ${borderRadiusStyle[20]};
  ${typoStyle.select}
  background-color: ${colors.bg_select};

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

    &:hover {
      background-color: ${colors.default_hover};
    }
  }

  p {
    font-weight: 700;
  }
`;
export const CloseList = styled.li``;

// 테이블 바디 - col3 최근 플레이한 챔피언
export const ChampList = styled.li``;
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

  h6 {
    font-size: 15px;
    font-weight: bold;
    line-height: 21px;
  }
  p {
    ${typoStyle.contents}
    em {
      color: ${colors.badge_red};
    }
  }
`;

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
export const box8 = styled.div``;
export const box9 = styled.div``;
export const box10 = styled.div``;
