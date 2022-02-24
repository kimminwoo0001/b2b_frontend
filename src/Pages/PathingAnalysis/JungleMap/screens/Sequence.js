/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import PositionCheckList from "../../../../Components/Ui/PositionCheckList";
import JungleFilter from "../components/JungleFilter";
import JungleSideFilter from "../components/JungleSideFilter";
import SequenceDialog from "../components/SequenceDialog";
import Map from "../components/Map";
import * as S from "../components/styled/StyledJungleLayout";
import { useState } from "react";

const Sequence = () => {
  const junglevalue = useSelector((state) => state.JungleMapReducer);
  const [position, setPosition] = useState();
  return (
    <S.SequenceContainer>
      {/* 메인 필터 */}
      <S.FilterContainer>
        <JungleFilter />
      </S.FilterContainer>
      {/* 사이드 필터와 맵 비디오  */}
      {Object.keys(junglevalue.patch).length > 0 && Object.keys(junglevalue.patch).filter(key => junglevalue.patch[key] === true).length > 0 && 
      <S.FlexContainer>
        {/* 사이드 필터 */}
        <S.Sidebar>
          <JungleSideFilter />
        </S.Sidebar>

        {/*  맵 & 다이얼로그 */}
        <S.Container>
          {/* 맵 비디오 */}
          <S.VideoContainer>
            <PositionCheckList onChange={(position) => setPosition(position)} />
            <Map position={position} setPosition={setPosition}/>
          </S.VideoContainer>
          {/* 이벤트 다이얼로그 */}
          <S.DialogContainer>
            <SequenceDialog />
          </S.DialogContainer>
        </S.Container>
      </S.FlexContainer>
}
    </S.SequenceContainer>
  );
};

export default Sequence;
