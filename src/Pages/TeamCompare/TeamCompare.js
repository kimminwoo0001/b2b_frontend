import React from "react";
import styled from "styled-components";

import SideBar from "../../Components/SideBar/SideBar";
import Nav from "../../Components/Nav/Nav";
import TeamTabs from "../Team/TeamTabs";
import { useSelector } from "react-redux";
import SelectFilter from "../../Components/SelectFilter/SelectFilter";
import ErrorBoundary from "../../Components/ErrorBoundary";
import Filter from "../../Components/Filter/Filter";
import CloseFilter from "../../Components/Filter/CloseFilter";
import TeamFilterModal from "../../Components/Filter/TeamFilterModal";
import PlayerFilterModal from "../../Components/Filter/PlayerFilterModal";

function TeamCompare() {
  const filters = useSelector((state) => state.FilterReducer);
  const copyvalue = useSelector((state) => state.CopyReducer);

  return (
    <ErrorBoundary>
      {copyvalue?.openFilterModal === "/teamCompare" && <TeamFilterModal />}
      {copyvalue?.openFilterModal === "/playerCompare" && <PlayerFilterModal />}

      <Nav />
      <TeamWrapper>
        <SideBar />
        {filters.openFilterModal === "/teamCompare" && filters.oppteam.length > 0 && filters.compareModal ?
          (
            <CloseFilter />
          ) : (
            <>
              <div
          className={filters.filterMenuState ? "filter-open" : "filter-close"}
        >
          <Filter />
        </div>
       {/* <div
          className={filters.filterMenuState ? "filter-close" : "filter-open"}
        >
          <CloseFilter />
        </div> */}
            </>
          )
        }
        <ContentWrapper>
          {filters.team !== "" ? <TeamTabs /> : <SelectFilter />}
        </ContentWrapper>
      </TeamWrapper>
    </ErrorBoundary>
  );
}

export default TeamCompare;

const TeamWrapper = styled.div`
  width: 100%;
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
