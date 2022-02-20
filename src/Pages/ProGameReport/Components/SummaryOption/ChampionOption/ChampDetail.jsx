import React, { useState } from "react";
/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled/macro";
import TimeBar from "../../Common/TimeBar";
import TimeBarTitle from "../../Common/TimeBarTitle";
import StatusBox1 from "./Component/StatusBox1";
import StatusBox2 from "./Component/StatusBox2";
import StatusBox3 from "./Component/StatusBox3";
import StatusBox4 from "./Component/StatusBox4";
import TimeStatus from "./Component/TimeStatus";
import { useSelector } from "react-redux";

const ChampDetail = () => {
  const gamevalue = useSelector((state) => state.GameReportReducer);
  return (
    <DetailChampContainer>
      <StatusContainer>
        <StatusBox1 />
        <StatusBox2 />
        <StatusBox3 />
        <StatusBox4 />
      </StatusContainer>
      <TimeStatus />
      <DetailChampTimeLine itemBuild={gamevalue.champTab === 1}>
        <div>
          <TimeBarTitle textAligh="left" />
        </div>
        <div className="time-bar">
          <TimeBar hidebar={true} />
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
  width: ${(props) => (props.itemBuild ? "417px" : "100%")};
  height: 19px;
  display: flex;
  padding-left: ${(props) => (props.itemBuild ? "0" : "10")}px;

  .time-bar {
    padding-left: 4px;
    width: 100%;
    padding-right: 8px;
  }
`;
