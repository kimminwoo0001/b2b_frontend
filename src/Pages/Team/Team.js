import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import SideBar from "../../Components/SideBar/SideBar";
import Filter from "../../Components/Filter/Filter";
import TeamTabs from "./TeamTabs";
import SelectFilter from "../../Components/SelectFilter/SelectFilter";
import ErrorBoundary from "../../Components/ErrorBoundary";
// import TeamFilter from "./TeamFilter";
import Nav from "../../Components/Nav/Nav";
import CloseFilter from "../../Components/Filter/CloseFilter";

function Team() {
  const filters = useSelector((state) => state.FilterReducer);

  return (
    <ErrorBoundary>
      <Nav />
      <TeamWrapper>
        <SideBar />
        <div className={filters.filterMenuState ? "filter-open" : "filter-close"}>
          <Filter />
        </div>
        <div className={filters.filterMenuState ? "filter-close" : "filter-open"}>
          <CloseFilter />
        </div>
        <ContentWrapper>
          {filters.team !== "" && filters.season.length > 0 ? (
            <TeamTabs />
          ) : (
            <SelectFilter />
          )}
        </ContentWrapper>
      </TeamWrapper>
    </ErrorBoundary>
  );
}

export default Team;

const TeamWrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  overflow: auto;
  display: flex;
  /* background-color: #16151c; */


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
  background-color: #16151a;
`;
