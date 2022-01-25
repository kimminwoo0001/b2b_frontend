import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import thousand from "../../../../../lib/thousand";

function thousandGold(gold) {
  let result = gold;
  if (gold >= 1000) {
    result = Math.floor(gold / 100) / 10 + "k";
  }
  return result;
}

const TimeLineTeamGoldLabel = () => {
  const gamevalue = useSelector((state) => state.GameReportReducer);

  const goldSet = gamevalue.teamGoldDataset[gamevalue.goldActiveIdx];
  return (
    <TeamGoldBox>
      <div className="title blue">{thousandGold(goldSet.blueGold)}</div>
      <div className="title">
        {thousandGold(goldSet.blueGold - goldSet.redGold)}
      </div>
      <div className="title red">{thousandGold(goldSet.redGold)}</div>
    </TeamGoldBox>
  );
};

export default TimeLineTeamGoldLabel;

const TeamGoldBox = styled.div`
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

  .blue {
    color: #0075bf;
  }

  .red {
    color: #f04545;
  }
`;
