import { css } from "@emotion/css";
import styled from "@emotion/styled";
import {
  tableStyle,
  transitionStyle,
  typoStyle,
} from "../../../../../Styles/ui";

export const Wrapper = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
`;
export const FilterContainer = styled.div`
  padding: 24px 20px 0 20px;
`;

export const FilterSection = styled.div`
  margin-bottom: 30px;
`;
export const ButtonContainer = styled.div`
  padding: 20px;
  border-top: 1px solid ${({ theme }) => theme.colors.border_light};
`;

/* 아코디언 타이틀 */
export const Title = styled.div`
  display: flex;
  align-items: center;
`;
export const TitleLabel = styled.p`
  ${typoStyle.label}
  height: 100%;
  margin-right: 8px;
`;
export const Text = styled.span`
  display: flex;
  align-items: center;
  ${typoStyle.contents}
`;

/* 셀렉트 그룹 */
export const SelectContainer = styled.div`
  .group-row {
    display: flex;
    margin-bottom: 6px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .group-col-1 {
    width: 100%;
    flex: 0 1 100%;
  }
  .group-col-2 {
    width: 50%;
    flex: 0 1 50%;
    &:first-of-type {
      margin-right: 12px;
    }
  }
`;

export const SelectLabel = styled.div`
  opacity: 0.3;
`;

// 테이블 관련 코드
export const Table = styled.div``;

export const Head = styled.div`
  ${tableStyle.table_head}
`;

export const Body = styled.div``;

export const Row = styled.div`
  border-radius: 999px;
  ${tableStyle.table_row}
  ${transitionStyle.background}
  
  background-color: ${({ isActive, theme }) =>
    isActive ? theme.colors.bg_gnb : ""};
  &:hover {
    background-color: ${({ theme }) => theme.colors.bg_gnb};
  }
`;

export const Champ = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0;

  span {
    ${typoStyle.noWrap}
  }
`;

// 테이블
export const Col1 = styled.div`
  margin-right: 16px;
`;

export const Col2 = styled.div`
  flex: 1;
  max-width: 180px;
`;

export const Col3 = styled.div`
  width: 43px;
  text-align: center;
`;

export const Red = styled.div`
  ${Col3}
  color: ${({ theme }) => theme.colors.red};
`;
export const Blue = styled.div`
  ${Col3}
  color: ${({ theme }) => theme.colors.blue};
`;
