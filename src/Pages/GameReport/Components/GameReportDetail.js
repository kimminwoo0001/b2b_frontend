import React, { memo, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
//import YoutubeVideo from '../../../lib/youtube';
import ChampDetail from "./SummaryOption/ChampionOption/ChampDetail";
import DetailLog from "./DetailLogOption/DetailLog";
import TeamStatus from "./TeamStatusOption/TeamStatus";
import TimeLine from "./TimeLineOption/TimeLine";
import Summary from "./SummaryOption/Summary";
import VideoPlayer from "../../../Components/Video/VideoPlayer";
import ErrorBoundary from "../../../Components/ErrorBoundary";

const GameReportDetail = () => {
  const { t } = useTranslation();

  if (document.title !== `${t("sidebar.part12")} - NUNU.GG`) {
    document.title = `${t("sidebar.part12")} - NUNU.GG`
  }

  return (
    <ErrorBoundary>
      <GameWrapper>
        <GameReportIndexWrapper>
          <GameReportDetailContainer>
            <DetailLog />
            <TeamStatus />

            <BlockContainer>
              <FlexContainer>
                <VideoContainer>
                  <VideoPlayer />
                </VideoContainer>
              </FlexContainer>
              <FlexContainer>
                <Summary />
                <TimeLine />
                {/* <MapContainer></MapContainer> */}
              </FlexContainer>
            </BlockContainer>
          </GameReportDetailContainer>
        </GameReportIndexWrapper>
      </GameWrapper>
    </ErrorBoundary>
  );
};

export default memo(GameReportDetail);

const GameReportIndexWrapper = styled.main`
  padding-top: 60px;
  padding-left: 60px;
  font-family: "Spoqa Han Sans";
`;

const GameReportDetailContainer = styled.div`
  width: 1920px;
  height: 1080px;
  display: flex;
`;

const BlockContainer = styled.div`
  display: block;
`;

const FlexContainer = styled.div`
  display: flex;
`;

const VideoContainer = styled.div`
  width: 1440px;
  height: 800px;
`;

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
