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
      <div className="blue title">{thousandGold(goldSet.blueGold)}</div>
      <div className="gap title">
        {thousandGold(goldSet.blueGold - goldSet.redGold)}
      </div>
      <div className="red title">{thousandGold(goldSet.redGold)}</div>
    </TeamGoldBox>
  );
};

export default TimeLineTeamGoldLabel;

const TeamGoldBox = styled.div`
  .blue {
    color: #0075bf;
  }

  .gap {
    color: #fff;
  }

  .red {
    color: #f04545;
  }
`;
