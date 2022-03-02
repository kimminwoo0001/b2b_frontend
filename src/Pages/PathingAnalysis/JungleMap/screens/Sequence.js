/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";

import { useSelector } from "react-redux";
import PositionCheckList from "../../../../Components/Ui/PositionCheckList";
import JungleFilter from "../components/JungleFilter";
import JungleSideFilter from "../components/JungleSideFilter";
import SequenceDialog from "../components/SequenceDialog";
import Map from "../components/Map";
import * as S from "../components/styled/StyledJungleLayout";
import { getTrueValueList } from "../../../../lib/getTureValueList";

const Sequence = () => {
  const patchList = useSelector((state) => state.JungleMapReducer.patch);
  const teamList = useSelector((state) => state.JungleMapReducer.team);
  const selectedPatch = getTrueValueList(patchList);

  return (
    <S.SequenceContainer>
      {/* 메인 필터 */}
      <S.FilterContainer>
        <JungleFilter />
      </S.FilterContainer>
      {/* 사이드 필터와 맵 비디오  */}
      {teamList.length > 0 && selectedPatch.length > 0 && (
        <S.FlexContainer>
          {/* 사이드 필터 */}
          <S.Sidebar>
            <JungleSideFilter />
          </S.Sidebar>

          {/*  맵 & 다이얼로그 */}
          <S.Container>
            {/* 맵 비디오 */}
            <S.VideoContainer>
              <PositionCheckList
                onChange={(position) => console.log(position)}
              />
              <Map />
            </S.VideoContainer>
            {/* 이벤트 다이얼로그 */}
            <S.DialogContainer>
              <SequenceDialog />
            </S.DialogContainer>
          </S.Container>
        </S.FlexContainer>
      )}
    </S.SequenceContainer>
  );
};

export default Sequence;
