import React, { memo, useEffect, useState } from 'react';
import styled, { css } from "styled-components";
import YoutubeVideo from '../../../lib/youtube';

const GameReportDetail = ({ videoId = "Iucd7fedW4A" }) => {

  useEffect(() => {
    YoutubeVideo(videoId);
  }, [])

  return (
    <div id="player"></div>
  )
}

export default memo(GameReportDetail);