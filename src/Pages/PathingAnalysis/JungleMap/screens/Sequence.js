/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import styled from "@emotion/styled";
import { testStyle } from "../../../../Styles/ui";
import JungleFilter from "../components/JungleFilter";
import JungleSideFilter from "../components/JungleSideFilter";
import SequenceDialog from "../components/SequenceDialog";

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
        <SMap>
          <SVideo>여기에 비디오 플레이어가 들어갑니다</SVideo>
          <SDialog>
            <SequenceDialog />
          </SDialog>
        </SMap>
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
  flex: 0 0 376px;
  width: 376px;
  border-radius: 20px;
  margin-right: 20px;
  background-color: ${({ theme }) => theme.colors.bg_light};
`;
const SMap = styled.section`
  flex: 1 0;
  ${testStyle.border5}
  height: 1115px;
`;

const SVideo = styled.div`
  height: 810px;
  margin-bottom: 20px;
  ${testStyle.border6}
`;
const SDialog = styled.div`
  height: 280px;
`;

export default Sequence;
