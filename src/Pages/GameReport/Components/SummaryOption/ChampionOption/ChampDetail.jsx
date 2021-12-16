import React, { useState } from "react";
import styled, { css } from "styled-components";
import TimeBar from "../../Common/TimeBar";
import TimeBarTitle from "../../Common/TimeBarTitle";
import StatusBox1 from "./Component/StatusBox1";
import StatusBox2 from "./Component/StatusBox2";
import StatusBox3 from "./Component/StatusBox3";
import StatusBox4 from "./Component/StatusBox4";
import TimeStatus from "./Component/TimeStatus";

const ChampDetail = () => {
  return (
    <DetailChampContainer>
      <StatusContainer>
        <StatusBox1 />
        <StatusBox2 />
        <StatusBox3 />
        <StatusBox4 />
      </StatusContainer>
      <TimeStatus />
      <DetailChampTimeLine>
        <div>
          <TimeBarTitle textAligh="left" />
        </div>
        <div className="time-bar">
          <TimeBar />
        </div>
      </DetailChampTimeLine>
    </DetailChampContainer>
  );
};

export default ChampDetail;

const DetailChampContainer = styled.div`
  width: 702px;
  height: 225px;
  display: block;
`;

const StatusContainer = styled.div`
  width: 702px;
  height: 120px;
  display: flex;
`;

const DetailChampTimeLine = styled.div`
  width: 100%;
  height: 19px;
  display: flex;
  padding-left: 10px;

  .time-bar {
    padding-left: 4px;
    width: 100%;
    padding-right: 9px;
  }
`;
