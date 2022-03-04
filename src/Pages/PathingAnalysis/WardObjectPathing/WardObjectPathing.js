/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import styled from "@emotion/styled";
import { useState } from "react";
import { useSelector } from "react-redux";

import WardFilter from "./components/WardFilter";
import WardSideFilter from "./components/WardSideFilter";
import WardObjectMap from "./components/WardObjectMap";
import PositionCheckList from "../../../Components/Ui/PositionCheckList";
import ToggleSwitch from "../../../Components/Ui/ToggleSwitch/ToggleSwitch";

import * as S from "./components/styled/StyledWardPathingLayout";

const WardObjectPathing = () => {
const junglevalue = useSelector((state) => state.JungleMapReducer);
  return (
    <S.WardPathingContainer>
      {/* 메인 필터 */}
      <S.FilterContainer>
        {/* <JungleFilter /> */}
        <WardFilter />
      </S.FilterContainer>
      {/* 사이드 필터와 맵 비디오  */}
      {Object.keys(junglevalue.patch).length > 0 && Object.keys(junglevalue.patch).filter(key => junglevalue.patch[key] === true).length > 0 && 
      <S.FlexContainer>
        {/* 사이드 필터 */}
        <S.Sidebar>
          {/* <JungleSideFilter /> */}
          <WardSideFilter />
        </S.Sidebar>

        {/*  맵 */}
        <S.Container>
          {/* 맵 비디오 */}
          {junglevalue.isMappingClicked &&
          <S.VideoContainer>
            <WardObjectMap />
          </S.VideoContainer>
          }
        </S.Container>
      </S.FlexContainer>
}
    </S.WardPathingContainer>
  );
};

export default WardObjectPathing;
