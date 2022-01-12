import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import SideBar from "../../Components/SideBar/SideBar";
// import Filter from "../../Components/Filter/Filter";
// import CloseFilter from "../../Components/Filter/CloseFilter";
// import SelectFilter from "../../Components/SelectFilter/SelectFilter";
import Filter from "../../Components/Filter/Filter";
import CloseFilter from "../../Components/Filter/CloseFilter";
import ErrorBoundary from "../../Components/ErrorBoundary";
import Nav from "../../Components/Nav/Nav";
import { useSelector } from "react-redux";
import SelectFilter from "../../Components/SelectFilter/SelectFilter";
// import VideoTabs from '../VideoReport/VideoTabs';
// import GameReportIndex from './Components/GameReportIndex';
import GameReportTab from "./GameReportTab";

function GameReport() {
  const filters = useSelector((state) => state.FilterReducer);
  const gamevalue = useSelector((state) => state.GameReportReducer);
  const { t } = useTranslation();
  const checkGameId = gamevalue.fixedDataset.length === 2;

  useEffect(() => {
    document.title = `${t("sidebar.part12")} - NUNU.GG`
  }, [])

  return (
    <ErrorBoundary>
      {checkGameId ? "" : <Nav />}
      <GameWrapper>
        {checkGameId && filters.team !== "" && filters.team.length > 0 ? "" :
          <>
          <SideBar />
            {/* <div
            className={filters.filterMenuState ? "filter-open" : "filter-close"}
          >
            <Filter />
          </div>
          <div
            className={filters.filterMenuState ? "filter-close" : "filter-open"}
          >
            <CloseFilter />
          </div> */}
        </>}
        <ContentWrapper>
          {filters.team !== "" && filters.team.length > 0 ? (
            <GameReportTab />
          ) : (
              // <SelectFilter />
              <Temporal>
                <iframe width="1422" height="800" src="https://www.youtube.com/embed/c6e38xOmXfw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
              </Temporal>
          )}
        </ContentWrapper>
      </GameWrapper>
    </ErrorBoundary>
  );

}

export default GameReport;

const GameWrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  overflow: auto;
  display: flex;
  background-color: #000000;
  overflow: hidden;

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
  padding: 0px 0;

`;


const Temporal = styled.div`
  padding: 40px 0;

`