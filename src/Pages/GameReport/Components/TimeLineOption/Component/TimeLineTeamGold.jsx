import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import TimeLineTeamGoldLabel from "./TimeLineTeamGoldLabel";

const TimeLineTeamGold = () => {
  const { teamGoldDataset } = useSelector((state) => state.GameReportReducer);

  return (
    <TimeLineGoldContainer>
      <TimeLineTeamGoldLabel />
      <GoldDataBox></GoldDataBox>
    </TimeLineGoldContainer>
  );
};

export default TimeLineTeamGold;

const TimeLineGoldContainer = styled.div`
  width: 694px;
  height: 50px;
  display: flex;
  height: 51px;
  margin: 5px 0 9px 5px;

  .title {
    width: 58px;
    font-family: SpoqaHanSansNeo;
    font-size: 13px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.3;
    letter-spacing: normal;
    text-align: right;
    color: #fff;
    //background-color: #fff;
  }
`;

const GoldDataBox = styled.div`
  width: 623px;
  height: 100%;
  border-radius: 3px;
  background-color: #433f4e;
  margin: 0 0 0 10px;
`;
