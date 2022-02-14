import React from "react";
import styled from "styled-components";

import SideBar from "../../Components/SideBar/SideBar";
import Filter from "../../Components/Filter/Filter";
import Nav from "../../Components/Nav/Nav";
// import LeagueTab from "./LeagueTab";
import { useSelector } from "react-redux";
// import SelectFilter from "../../Components/SelectFilter/SelectFilter";
import ErrorBoundary from "../../Components/ErrorBoundary";
import CloseFilter from "../../Components/Filter/CloseFilter";

function MatchAnalysis() {
  const filters = useSelector((state) => state.FilterReducer);
  return (
    <ErrorBoundary>
      <Nav />
      <LeagueWrapper>
        <SideBar />
        <div className={filters.filterMenuState ? "filter-open" : "filter-close"}>
          <Filter />
        </div>
        <div className={filters.filterMenuState ? "filter-close" : "filter-open"}>
          <CloseFilter />
        </div>
        <ContentWrapper>
          {/* patch 값이 있으면 데이터를 보여주고 아니면 selectFilter화면을 보여주도록 */}
          {/* {filters.patch.length !== 0 ? <LeagueTab /> : <SelectFilter />} */}
        </ContentWrapper>
      </LeagueWrapper>
    </ErrorBoundary>
  );
}

export default MatchAnalysis;

const LeagueWrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  overflow: auto;
  display: flex;
  background-color: #16151c;

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
  /* overflow-y: auto; */
`;