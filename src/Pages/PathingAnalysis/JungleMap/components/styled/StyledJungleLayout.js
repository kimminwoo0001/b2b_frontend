import styled from "@emotion/styled/macro";
import { testStyle } from "../../../../../Styles/ui";

// 공통 레이아웃
export const FlexContainer = styled.div`
  display: flex;
  width: 100%;
`;

export const Container = styled.div``;

// 사이드바
export const Sidebar = styled.aside`
  flex: 0 0 376px;
  width: 376px;
  border-radius: 20px;
  margin-right: 20px;
`;

// 메인 컨텐츠
export const Contents = styled.div``;

// sequence - 정글동선

export const SequenceContainer = styled.section`
  width: 1097px;
`;

export const FilterContainer = styled.div`
  /* height: 348px; */
  margin-bottom: 30px;
  /* ${testStyle.border3} */
`;

export const SequenceContents = styled.section`
  width: 700px;
  /* height: 1115px; */
  ${testStyle.border5}
`;

export const VideoContainer = styled.div`
  height: 810px;
  margin-bottom: 20px;
  ${testStyle.border6}
`;

export const DialogContainer = styled.div`
  height: 280px;
`;

// compare - 동선비교
export const CompareContainer = styled.div`
  width: 1296px;
`;

export const CompareTableContainer = styled.div``;
export const CompareTable = styled.div``;
export const TextTableContainer = styled.div``;
