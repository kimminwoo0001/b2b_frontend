import React, { memo, useEffect, useState } from 'react';
import styled, { css } from "styled-components";
import YoutubeVideo from '../../../lib/youtube';
import ChampDetail from './SummaryOption/ChampionOption/ChampDetail';
import DetailLog from './DetailLogOption/DetailLog';
import TeamStatus from './TeamStatusOption/TeamStatus';
import TimeLine from './TimeLineOption/TimeLine';
import Summary from './SummaryOption/Summary';

const GameReportDetail = ({ videoId, platform }) => {

  useEffect(() => {
    YoutubeVideo(videoId);
  }, [])

  return (
    <GameReportDetailContainer>
      <DetailLog />
      <TeamStatus />

      <BlockContainer>
        <FlexContainer>
          <VideoContainer>
            {platform === "twitch" ?
              <iframe src={`https://player.twitch.tv?video=${videoId}&parent=localhost`} width="1440px" height="800px"></iframe>
              : <div id="player"></div>
            }

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
  background-color: #0f0;
`;

const DetailContainer = styled.div`
  width: 702px;
  height: 260px;
  margin: 10px 25px 10px 0px;
  background-color: #99a;
`;

const DetailNav = styled.div`
  width: 702px;
  height: 40px;
  margin: 0 0 11px;
  background-color: #f00;
`;

const DetailChampContainer = styled.div`
  display: block;
  backgorund-color: orange;
`;


const MapContainer = styled.div`
  width: 282px;
  height: 280px;
  margin: 0 0 0 16px;
  object-fit: contain;
  background-color: #a0a;
`;