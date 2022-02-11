/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import styled from "@emotion/styled";
import { testStyle } from "../../../../Styles/ui";
import JungleFilter from "../components/JungleFilter";
import JungleSideFilter from "../components/JungleSideFilter";

const Sequence = () => {
  return (
    <SContainer>
      <SFilterContainer>
        <JungleFilter />
      </SFilterContainer>
      <SFitlerContents>
        <SSelector>
          <JungleSideFilter />
        </SSelector>
        <SMap>맵이 들어가요!</SMap>
      </SFitlerContents>
    </SContainer>
  );
};

// layout
const SContainer = styled.article`
  width: 100%;
`;
const SFilterContainer = styled.section`
  height: 348px;
  margin-bottom: 30px;
  ${testStyle.border3}
`;
const SFitlerContents = styled.section`
  display: flex;
`;
// components
const SSelector = styled.section`
  flex: 0;
  flex-basis: 376px;

  padding: 29px 23px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.bg_light};
`;
const SMap = styled.section`
  flex: 1 0;
  ${testStyle.border5}
  height: 1115px;
`;

export default Sequence;
