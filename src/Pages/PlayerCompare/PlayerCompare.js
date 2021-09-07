import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import Nav from "../../Components/Nav/Nav";
import SelectFilter from "../../Components/SelectFilter/SelectFilter";
import SideBar from "../../Components/SideBar/SideBar";
import SoloFilter from "../Solo/Components/SoloFilter";
import Player from "../Solo/Player";
import ErrorBoundary from "../../Components/ErrorBoundary";
function PlayerCompare() {
  const filters = useSelector((state) => state.FilterReducer);

  return (
   <ErrorBoundary>
      <SoloWrapper>
        <SideBar />
        <SoloFilter />
        <ContentWrapper>
          <Nav />
          {filters.player !== "" ? <Player /> : <SelectFilter />}
        </ContentWrapper>
      </SoloWrapper>
    </ErrorBoundary>
  );
}

export default PlayerCompare;

const SoloWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  height: 100%;
  overflow: auto;
  display: flex;
  background-color: #23212a;
`;

const ContentWrapper = styled.div`
  display: flex;
  width: 100%;

  flex-direction: column;
`;
