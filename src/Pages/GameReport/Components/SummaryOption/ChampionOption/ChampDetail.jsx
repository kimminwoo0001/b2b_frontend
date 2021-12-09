import React, { useState } from "react";
import styled, { css } from "styled-components";
import StatusBox1 from "./StatusBox1";
import StatusBox2 from "./StatusBox2";
import StatusBox3 from "./StatusBox3";
import StatusBox4 from "./StatusBox4";
import TimeStatus from "./TimeStatus";

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
      <DetailChampTimeLine></DetailChampTimeLine>
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
  width: 702px;
  height: 19px;
  display: flex;
  background-color: #515353;
`;
