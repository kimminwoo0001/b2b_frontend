import React from 'react'
import styled from "styled-components";
import SideBar from "../../Components/SideBar/SideBar";
// import Filter from "../../Components/Filter/Filter";
// import CloseFilter from "../../Components/Filter/CloseFilter";
// import SelectFilter from "../../Components/SelectFilter/SelectFilter";
import Filter from '../../Components/Filter/Filter';
import CloseFilter from '../../Components/Filter/CloseFilter';
import ErrorBoundary from "../../Components/ErrorBoundary";
import Nav from "../../Components/Nav/Nav";
import { useSelector } from "react-redux";
import SelectFilter from '../../Components/SelectFilter/SelectFilter';
import VideoTabs from '../VideoReport/VideoTabs';

function GameReport() {
  const filters = useSelector((state) => state.FilterReducer);

  return (
    <ErrorBoundary>
      <Nav />
      <GameWrapper>
        <SideBar />
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
        <ContentWrapper>
          {filters.team !== "" && filters.team.length > 0 ? (
            <VideoTabs />
          ) : (
            <SelectFilter />
          )}
        </ContentWrapper>
      </GameWrapper>
    </ErrorBoundary>

  )
}

export default GameReport;


const GameWrapper = styled.div`
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
`

const ContentWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 0px 0;
`;
