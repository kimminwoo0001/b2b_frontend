import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import Nav from "../../Components/Nav/Nav";
import SelectFilter from "../../Components/SelectFilter/SelectFilter";
import SideBar from "../../Components/SideBar/SideBar";
import Player from "../Solo/Player";
import ErrorBoundary from "../../Components/ErrorBoundary";
import Filter from "../../Components/Filter/Filter";
import CloseFilter from "../../Components/Filter/CloseFilter";
import TeamFilterModal from "../../Components/Filter/TeamFilterModal";
import PlayerFilterModal from "../../Components/Filter/PlayerFilterModal";

function PlayerCompare() {
  const filters = useSelector((state) => state.FilterReducer);
  const copyvalue = useSelector((state) => state.CopyReducer);
  return (
    <ErrorBoundary>
      {copyvalue?.openFilterModal === "/teamCompare" && <TeamFilterModal />}
      {copyvalue?.openFilterModal === "/playerCompare" && <PlayerFilterModal />}

      <Nav />
      <SoloWrapper>
        <SideBar />
        {filters.openFilterModal === "/playerCompare" && filters.oppplayer !== "" && filters.compareModal ?
          (
            <CloseFilter />
          ) :
          <>
        <div
          className={filters.filterMenuState ? "filter-open" : "filter-close"}
        >
          <Filter />
        </div>
        <div
          className={filters.filterMenuState ? "filter-close" : "filter-open"}
        >
          <CloseFilter />
        </div>
          </>
        }
        <ContentWrapper>
          {filters.player !== "" ? <Player /> : <SelectFilter />}
        </ContentWrapper>
      </SoloWrapper>
    </ErrorBoundary>
  );
}

export default PlayerCompare;

const SoloWrapper = styled.div`
  height: 100%;
  overflow: auto;
  min-height: 100vh;
  display: flex;
  background-color: #23212a;

  .filter-close {
    display: none;
  }

  .filter-open {
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  background-color: #16151a;
`;
