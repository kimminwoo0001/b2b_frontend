import React, { memo, useEffect, useState } from 'react';
import styled, { css } from "styled-components";
import YoutubeVideo from '../../../lib/youtube';

const GameReportDetail = ({ videoId }) => {

  useEffect(() => {
    YoutubeVideo(videoId);
  }, [])

  return (
    <GameReportDetailContainer>
      
    </GameReportDetailContainer>
    
  )
}

export default memo(GameReportDetail);

const GameReportDetailContainer = styled.div`
  width: 1920px;
  height: 1080px;
  background-color: #f0f;
`;

const Nav = styled.div`
  width: 480px;
  height: 56px;
  padding: 15px 129px 11px 26px;
  background-color: #ff0;
`;

const YoutubeContainer = styled.div`
  width: 1440px;
  height: 800px;
  padding: 600px 0 0;
  opacity: 0.2;
  background-color: #0f0;
`;

const LogContainer = styled.div`
  width: 240px;
  height: 1024px;
  margin: 56px 0 0;
  padding: 20px 14px 0 26px;
  box-shadow: 5px 5px 30px 0 rgba(0, 0, 0, 0.15);
  background-color: #f00;
`;

const ChamStatusContainer = styled.div`
width: 240px;
  height: 744px;
  margin: 56px 0 0;
  padding: 5px 14px 0 0;
  box-shadow: 5px 5px 30px 0 rgba(0, 0, 0, 0.15);
  background-color: #00f;
`;

const DetailContainer = styled.div`
  width: 702px;
  height: 260px;
  margin: 10px 25px 10px 232px;
  background-color: #99a;
`;

const TimeLineContainer = styled.div`
  width: 663px;
  height: 249px;
  margin: 15px 16px 16px 25px;
  background-color: #953;
`;

const MapContainer = styled.div`
  width: 282px;
  height: 280px;
  margin: 744px 0 0 16px;
  object-fit: contain;
  background-color: #a0a;
`;