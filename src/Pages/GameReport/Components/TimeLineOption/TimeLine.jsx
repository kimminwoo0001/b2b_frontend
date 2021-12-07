import React from "react";
import styled, { css } from "styled-components";

const TimeLine = () => {
  return (
    <TimeLineContainer>
      <TimeLineDataContainer></TimeLineDataContainer>
      <TimeLineDataContainer></TimeLineDataContainer>
      <TimeLineDataContainer></TimeLineDataContainer>
      <TimeLineDataContainer></TimeLineDataContainer>
      <TimeLineDataContainer></TimeLineDataContainer>
      <TimeLineDataContainer></TimeLineDataContainer>
      <TimeLineDataContainer></TimeLineDataContainer>
      <TimeLineGoldContainer></TimeLineGoldContainer>
      <TimeLineTimeLine></TimeLineTimeLine>
    </TimeLineContainer>
  );
};

export default TimeLine;

const TimeLineContainer = styled.div`
  width: 728px;
  height: 270px;
  margin: 0px 0 px;
  padding: 17px 27px 0 5px;
  opacity: 1;
  background-color: #953;
`;

const TimeLineDataContainer = styled.div`
  width: 691px;
  height: 17px;
  margin: 4px 0 4px 5px;
  background-color: #fff;
`;

const TimeLineGoldContainer = styled.div`
  width: 694px;
  height: 50px;
  display: flex;
  height: 51px;
  margin: 11px 0 9px 2px;
  background-color: #912345;
`;

const TimeLineTimeLine = styled.div`
  wwidth: 677px;
  height: 17px;
  margin: 9px 0 0 19px;
  display: flex;
  background-color: #515353;
`;
