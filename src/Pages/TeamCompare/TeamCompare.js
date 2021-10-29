import React from "react";
import styled from "styled-components";

import SideBar from "../../Components/SideBar/SideBar";
import TeamFilter from "../Team/TeamFilter";
import Nav from "../../Components/Nav/Nav";
import TeamTabs from "../Team/TeamTabs";
import { useSelector } from "react-redux";
import SelectFilter from "../../Components/SelectFilter/SelectFilter";
import ErrorBoundary from "../../Components/ErrorBoundary";
import Filter from "../../Components/Filter/Filter";
import CloseFilter from "../../Components/Filter/CloseFilter";
function TeamCompare() {
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
  min-height: 100vh;
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
