import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import Nav from "../../Components/Nav/Nav";
import SelectFilter from "../../Components/SelectFilter/SelectFilter";
import SideBar from "../../Components/SideBar/SideBar";
import SoloFilter from "../Solo/Components/SoloFilter";
import Player from "../Solo/Player";
import ErrorBoundary from "../../Components/ErrorBoundary";
import Filter from "../../Components/Filter/Filter";
import CloseFilter from "../../Components/Filter/CloseFilter";
function PlayerCompare() {
  const filters = useSelector((state) => state.FilterReducer);

  return (
    <ErrorBoundary>
      <SoloWrapper>
        <SideBar />
        <div className={filters.filterMenuState ? "filter-open" : "filter-close"}>
          <Filter />
        </div>
        <div className={filters.filterMenuState ? "filter-close" : "filter-open"}>
          <CloseFilter />
        </div>
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

  .filter-close {
    display: none;
  }

  .filter-open{

  }
`;

const ContentWrapper = styled.div`
  display: flex;
  width: 100%;

  flex-direction: column;
`;
