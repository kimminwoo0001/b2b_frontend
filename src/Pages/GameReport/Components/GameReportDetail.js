import React, { memo, useEffect, useState } from 'react';
import styled, { css } from "styled-components";
import YoutubeVideo from '../../../lib/youtube';

const GameReportDetail = ({ videoId, platform }) => {

  useEffect(() => {
    YoutubeVideo(videoId);
  }, [])

  return (
    <GameReportDetailContainer>
      <LogContainer></LogContainer>
      <ChamStatusContainer></ChamStatusContainer>
      <BlockContainer>
        <FlexContainer>

          <VideoContainer>
            {platform === "twitch" ?
              <iframe src="https://player.twitch.tv?video=1136669396&parent=localhost" width="1440px" height="800px"></iframe>
              : <div id="player"></div>
            }
          </VideoContainer>
        </FlexContainer>
        <FlexContainer>
          <DetailContainer></DetailContainer>
          <TimeLineContainer></TimeLineContainer>
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
  background-color: #f0f;
  display: flex;
`;

const LogContainer = styled.div`
  width: 240px;
  height: 1080px;
  padding: 10px 14px 13px;
  box-shadow: 5px 5px 30px 0 rgba(0, 0, 0, 0.15);
  background-color: #f00;
`;

const ChamStatusContainer = styled.div`
  width: 240px;
  height: 1080px;
  padding: 13px 14px 0 0;
  box-shadow: 5px 5px 30px 0 rgba(0, 0, 0, 0.15); 
  background-color: #00f;
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

const TimeLineContainer = styled.div`
  width: 663px;
  height: 249px;
  margin: 0;
  background-color: #953;
`;

const MapContainer = styled.div`
  width: 282px;
  height: 280px;
  margin: 0 0 0 16px;
  object-fit: contain;
  background-color: #a0a;
`;