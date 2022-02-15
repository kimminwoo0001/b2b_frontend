/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import PositionCheckList from "../../../../Components/Ui/PositionCheckList";
import { testStyle } from "../../../../Styles/ui";
import JungleFilter from "../components/JungleFilter";
import JungleSideFilter from "../components/JungleSideFilter";
import SequenceDialog from "../components/SequenceDialog";

const Sequence = () => {
  const junglevalue = useSelector((state) => state.JungleMapReducer);
  return (
    <SContainer>
      <SFilterContainer>
        <JungleFilter />
      </SFilterContainer>
      {/* jungleFilter의 패치까지 선택되었을 때 하위 컨텐츠 노출 */}
      {Object.keys(junglevalue.patch).length !== 0 && Object.keys(junglevalue.patch).filter(key => junglevalue.patch[key] === true).length > 0 &&
      <SFitlerContents>
      <SSelector>
        <JungleSideFilter />
      </SSelector>
      <SMap>
        <SVideo>
          <PositionCheckList onChange={(position) => console.log(position)} />
        </SVideo>
        <SDialog>
          <SequenceDialog />
        </SDialog>
      </SMap>
    </SFitlerContents> 
      }
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
/* 임시 margin부여 */
  margin-top: 80px;
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
