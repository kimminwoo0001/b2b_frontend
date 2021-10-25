import React from "react";
import styled from "styled-components";

import SideBar from "../../Components/SideBar/SideBar";
import Filter from "../../Components/Filter/Filter";
import Nav from "../../Components/Nav/Nav";
// import LeagueTab from "./LeagueTab";
// import { useSelector } from "react-redux";
// import SelectFilter from "../../Components/SelectFilter/SelectFilter";
import ErrorBoundary from "../../Components/ErrorBoundary";

function MatchAnalysis() {
  //   const filters = useSelector((state) => state.FilterReducer);
  return (
    <ErrorBoundary>
      <Nav />
      <LeagueWrapper>
        <SideBar />
        <Filter />
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
  background-color: #23212a;
`;

const ContentWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  /* overflow-y: auto; */
`;
