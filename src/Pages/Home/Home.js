import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled/macro";

import Nav from "../../Components/Nav/Nav";
import SideBar from "../../Components/SideBar/SideBar";
import HomeContents from "./HomeContents";
import ErrorBoundary from "../../Components/ErrorBoundary";
import Filter from "../../Components/Filter/Filter";
import { useSelector } from "react-redux";
import TeamFilterModal from "../../Components/Filter/TeamFilterModal";
import PlayerFilterModal from "../../Components/Filter/PlayerFilterModal";
import { goPlayerCompare, goTeamCompare } from "../../lib/pagePath";
function Home() {
  // 홈 화면 컨테이너
  const copyvalue = useSelector((state) => state.CopyReducer);
  const { t } = useTranslation();
  if (document.title !== `${t("sidebar.part1")} - NUNU.GG`) {
    document.title = `${t("sidebar.part1")} - NUNU.GG`;
  }

  return (
    <ErrorBoundary>
      {copyvalue?.openFilterModal === goTeamCompare && <TeamFilterModal />}
      {copyvalue?.openFilterModal === goPlayerCompare && <PlayerFilterModal />}
      <Nav />
      <HomeWrapper>
        <SideBar />
        <ContentWrapper>
          <HomeContents />
        </ContentWrapper>
      </HomeWrapper>
    </ErrorBoundary>
  );
}

export default Home;

const HomeWrapper = styled.div`
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

const NoneContainer = styled.div`
  display: none;
`;
