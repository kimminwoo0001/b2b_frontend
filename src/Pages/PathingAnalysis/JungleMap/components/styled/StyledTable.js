import styled from "@emotion/styled";

import {
  borderRadiusStyle,
  colors,
  spacing,
  typoStyle,
} from "../../../../../Styles/ui";

/** 캠프선택 비율 테이블 css */
export const TableContainer = styled.div`
  ${borderRadiusStyle[20]};
  background-color: ${colors.bg_box};

  /* 사이즈 */
  width: 440px;
  height: 470px;
`;

export const TableHeader = styled.div`
  display: flex;
  justify-content: space-between;
  ${spacing.paddingX(2)};
  ${spacing.paddingY(2)};
`;

export const TableButtonGroup = styled.div`
  display: flex;
  > button {
    ${spacing.marginX(0.5)}
  }
`;

export const TableTitle = styled.h6`
  display: flex;
  align-items: center;
  ${typoStyle.contents_title}
`;

export const Table = styled.table`
  width: 100%;

  /* 회색 테이블헤더 */
  thead {
    border-top: 1px solid ${colors.bg_select};
    background-color: ${colors.bg_checkbox};
    padding-left: 16px;
    ${typoStyle.vs}

    tr {
      th {
        ${spacing.paddingY(1)}
      }

      th:first-of-type {
        text-align: center;
        ${spacing.paddingX(3)}
      }
    }
  }

  /* 테이블 아이템 */
  tbody {
    ${typoStyle.table_text}

    tr {
      position: relative;
      ${spacing.paddingX(3)}
      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        height: 1px;
        width: calc(100% - 32px);
        background-color: ${colors.bg_checkbox};
      }

      td {
        vertical-align: middle;
        ${spacing.paddingY(3)}
      }

      td:nth-of-type(1) {
        text-align: center;
        ${spacing.paddingX(3)}
      }
    }
  }
`;

export const TableData = styled.div`
  display: flex;
  align-items: center;

  > div:nth-of-type(1) {
    ${spacing.marginR(2)}
  }

  > div:nth-of-type(2) {
    p:nth-of-type(2) {
      ${typoStyle.select}
    }
  }
`;
