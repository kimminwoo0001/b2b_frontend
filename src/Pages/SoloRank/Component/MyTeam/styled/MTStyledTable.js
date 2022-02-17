import styled from "@emotion/styled";
import { moiton } from "framer-motion";
import {
  borderRadiusStyle,
  colors,
  fontsStyle,
  inputStyle,
  spacing,
  transitionStyle,
  typoStyle,
} from "../../../../../Styles/ui";
import CustomCheckBox from "../../../../../Components/Ui/CustomCheckbox";
import theme from "../../../../../Styles/Theme";

export const Table = styled.div`
  width: 100%;
`;

// 공통 레이아웃
export const Row = styled.div`
  display: flex;

  > div {
    display: flex;
  }

  .table-col1 {
    width: 150px;
    padding-left: 12px;
    text-align: left;
  }
  .table-col2 {
    width: 170px;
  }
  .table-col3 {
    text-align: left;
    width: 230px;
  }
  .table-col4 {
    width: 100px;
  }
  .table-col5 {
    width: 70px;
  }
  .table-col6 {
    width: 95px;
  }

  .table-col7 {
    width: 70px;
  }

  .table-col8 {
    width: calc(1110px - 885px);
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

// 테이블 헤더
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

// 테이블 바디
export const TableItemRow = styled(Row)`
  position: relative;
  z-index: 2;

  > div {
    display: block;
  }

  /* 테이블 행 뒷배경 */
  &::after {
    content: "";
    position: absolute;
    z-index: -1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: ${colors.bg_select};
    border-radius: 20px;
  }

  .table-item-col1 {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: left;
    width: 150px;
    ${spacing.paddingX(3)};
    ${spacing.paddingY(5)}
  }

  .table-item-col2 {
    width: 735px;
    background-color: ${theme.colors.bg_box};
    border-radius: 20px 0 0 20px;
  }

  .table-item-col3 {
    width: calc(1110px - 885px);
    background-color: ${theme.colors.bg_box};
    border-radius: 0 20px 20px 0;
  }
`;

// 테이블 바디 - col1 유저정보, 유저정보입력
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
export const Form = styled.form`
  ${spacing.marginT(15)}
  p {
    display: inline-flex;
    align-items: center;
    ${typoStyle.input_label}
    ${spacing.marginB(2)}

    em {
      position: relative;
      margin-left: 4px;
      width: 14px;
      height: 16px;
      cursor: pointer;

      img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      &::after {
        ${typoStyle.select}
        line-height: 18px;
        content: "ID는 최대 6개까지 등록 \ 가능합니다.";
        position: absolute;
        left: 50%;
        top: -56px;
        transform: translateX(-50%);
        width: 150px;
        height: 54px;
        background-color: ${theme.colors.border_light};
        ${borderRadiusStyle[10]}
        ${spacing.padding(2)}

        opacity: 0;
        visibility: hidden;
        ${transitionStyle.fade}
      }

      &:hover::after {
        visibility: visible;
        opacity: 1;
        ${transitionStyle.fade}
      }
    }
  }
  input {
    width: 100%;
    ${spacing.padding(2)}
    ${spacing.marginB(1)}
    ${borderRadiusStyle[10]}
    ${inputStyle.color.default}
    ${typoStyle.select}
  }
`;

// 테이블 바디 - col2 정렬필터
export const OpenList = styled.li`
  position: relative;
  z-index: 1;
  display: flex;

  /* 아래 라인 */
  &::after {
    content: "";
    position: absolute;
    z-index: -2;
    left: 167px;
    bottom: 0;
    width: 530px;
    height: 1px;
    background-color: ${colors.bg_checkbox};
  }

  /* hover 효과 */
  &::before {
    content: "";
    position: absolute;
    z-index: -1;
    left: 12px;
    width: 695px;
    height: 100%;
    background-color: ${colors.text_hover};
    border-radius: 20px;
    pointer-events: none;

    visibility: hidden;
    opacity: 0;
    ${transitionStyle.fade}
  }

  &:hover {
    &::before {
      opacity: 1;
      visibility: visible;
    }
  }

  div {
    ${typoStyle.contents};
    ${spacing.paddingY(2)};
    display: flex;
    justify-content: center;
    align-items: center;
  }

  /* 선수이름, 삭제버튼 */
  > div:nth-of-type(1) {
    span {
      ${typoStyle.player_title};
    }

    button {
      width: 18px;
      height: 18px;
      padding: 0;
      margin-left: 5px;

      img {
        object-fit: cover;
        object-position: center;
        width: 100%;
        height: 100%;
      }
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
  }

  > div:nth-of-type(4) {
    flex-direction: column;
    align-items: flex-start;

    ${typoStyle.rate_win}
  }

  > div:nth-of-type(5) {
    flex-direction: column;
    align-items: flex-start;
  }

  > div:nth-of-type(6) {
    flex-direction: column;
    align-items: flex-start;

    ${typoStyle.rate_win}
  }

  > div:nth-of-type(7) {
  }
`;
export const CloseList = styled.li``;

// 테이블 바디 - col3 최근 플레이한 챔피언
export const ChampList = styled.li``;
export const ChampInfo = styled.div`
  span {
    height: 60px;
    padding: 0 10px;
    border-radius: 3px;
    background-color: ${colors.bg_select};
    ${typoStyle.select}
  }
  h6 {
  }
  p {
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
  background-color: red;
`;
export const box8 = styled.div``;
export const box9 = styled.div``;
export const box10 = styled.div``;
