import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import SideBar from "../../Components/SideBar/SideBar";
import Filter from "../../Components/Filter/Filter";
import LeagueTab from "./LeagueTab";
import { useSelector } from "react-redux";
import SelectFilter from "../../Components/SelectFilter/SelectFilter";
import ErrorBoundary from "../../Components/ErrorBoundary";
// import Filter from "./Components/Filter";
import Nav from "../../Components/Nav/Nav";
import CloseFilter from "../../Components/Filter/CloseFilter";

function League() {
  const filters = useSelector((state) => state.FilterReducer);
  const { t } = useTranslation();

  useEffect(() => {
    document.title = `${t("sidebar.part2")} - NUNU.GG`
  }, [])

  return (
    <ErrorBoundary>
      <Nav />
      <LeagueWrapper>
        <SideBar />
        <div
          // className={filters.filterMenuState ? "filter-open" : "filter-close"}
        >
          <Filter />
        </div>
       {/* <div
          className={filters.filterMenuState ? "filter-close" : "filter-open"}
        >
          <CloseFilter />
        </div> */}
        <ContentWrapper>
          {/* season 값이 있으면 데이터를 보여주고 아니면 selectFilter화면을 보여주도록 */}
          {filters.season.length !== 0 ? <LeagueTab /> : <SelectFilter />}
        </ContentWrapper>
      </LeagueWrapper>
    </ErrorBoundary>
  );
}

export default League;

const LeagueWrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  /* overflow: auto; */
  display: flex;
  background-color: #16151c;

  .filter-close {
    display: none;
  }

  .filter-open {
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  width: 100%;

  // 리그보고서 겹스크롤바 임시 수정
  overflow-x: hidden;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 0px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #434050;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    margin: 5px;
  }

  flex-direction: column;
`;
