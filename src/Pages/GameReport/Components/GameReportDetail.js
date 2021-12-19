import React, { memo, useEffect, useState } from 'react';
import styled, { css } from "styled-components";
import { useSelector } from "react-redux";
//import YoutubeVideo from '../../../lib/youtube';
import ChampDetail from './SummaryOption/ChampionOption/ChampDetail';
import DetailLog from './DetailLogOption/DetailLog';
import TeamStatus from './TeamStatusOption/TeamStatus';
import TimeLine from './TimeLineOption/TimeLine';
import Summary from './SummaryOption/Summary';
import VideoPlayer from '../../../Components/Video/VideoPlayer';


const GameReportDetail = () => {

  useEffect(() => {

  }, [])

  return (
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

  )
}

export default memo(GameReportDetail);



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