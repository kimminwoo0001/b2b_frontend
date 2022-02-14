import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

import Nav from "../../Components/Nav/Nav";
import SelectFilter from "../../Components/SelectFilter/SelectFilter";
import SideBar from "../../Components/SideBar/SideBar";
import Player from "../PlayerReport/Player";
import ErrorBoundary from "../../Components/ErrorBoundary";
import Filter from "../../Components/Filter/Filter";
import CloseFilter from "../../Components/Filter/CloseFilter";
import TeamFilterModal from "../../Components/Filter/TeamFilterModal";
import PlayerFilterModal from "../../Components/Filter/PlayerFilterModal";
import { goPlayerCompare, goTeamCompare } from "../../lib/pagePath";

function PlayerCompare() {
  const filters = useSelector((state) => state.FilterReducer);
  const copyvalue = useSelector((state) => state.CopyReducer);
  const { t } = useTranslation();

  if (document.title !== `${t("sidebar.part9")} - NUNU.GG`) {
    document.title = `${t("sidebar.part9")} - NUNU.GG`
  }
  return (
    <ErrorBoundary>
      {copyvalue?.openFilterModal === goTeamCompare && <TeamFilterModal />}
      {copyvalue?.openFilterModal === goPlayerCompare && <PlayerFilterModal />}

      <Nav />
      <SoloWrapper>
        <SideBar />
        {filters.openFilterModal === goPlayerCompare && filters.oppplayer !== "" && filters.compareModal ?
          (
            <CloseFilter />
          ) :
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
  flex-direction: column;
  background-color: #16151a;
`;
