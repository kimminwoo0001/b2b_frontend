import React from "react";
import styled, { css } from "styled-components";
import { useSelector, useDispatch, batch } from "react-redux";
import ChampionContainer from "./ChampionContainer";
import ChampionOppContainer from "./ChampionOppContainer";
import GoldGap from "./GoldGap";

const ChampionLiuneBox = ({ position }) => {
  const gamevalue = useSelector((state) => state.GameReportReducer);
  const dispatch = useDispatch();
  const videovalue = useSelector((state) => state.VideoReducer);

  // mapping 데이터 관련
  const getIdx = Math.floor(
    videovalue.playedSeconds -
      +gamevalue.startTime -
      gamevalue.mappingDataset[0].realCount / 2
  );
  const realCnt =
    getIdx < 0
      ? 0
      : getIdx * 2 >= gamevalue.mappingDataset.length
      ? gamevalue.mappingDataset.length - 1
      : getIdx * 2;

  // 골드 데이터 관련
  const goldDataset = gamevalue.teamGoldDataset;
  const goldData = goldDataset[gamevalue.goldActiveIdx];

  if (goldDataset[0].realCount !== 0) {
    goldDataset.unshift({
      realCount: 0,
      blueGold: 0,
      redGold: 0,
      golds: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    });
  }

  const goldgap = goldData.golds[position] - goldData.golds[position + 5];
  const arrPosition = ["top", "jng", "mid", "ad", "sup"];
  let timer = Math.floor(videovalue.playedSeconds - +gamevalue.startTime);
  const playerStatusMax = gamevalue.playersStatusDataset.length - 1;
  timer = timer > 0 ? (timer < playerStatusMax ? timer : playerStatusMax) : 0;
  const isMax = timer === playerStatusMax;

  return (
    <ChampLineContainer>
      <ChampionContainer
        player={gamevalue.fixedDataset[0].players[position]}
        participant={position}
        teamName={gamevalue.blueteam}
        mapping={gamevalue.mappingDataset[realCnt].player[position]}
        winner={Math.abs(goldgap) >= 300 && goldgap > 0}
        status={
          timer === "MAX"
            ? gamevalue.playersStatusDataset[playerStatusMax].players[position]
            : gamevalue.playersStatusDataset[timer].players[position]
        }
        time={timer ? timer : 0}
        isMax={isMax}
        playerStatusTime={gamevalue.playerStatusTime}
      />
      <ChampionOppContainer
        player={gamevalue.fixedDataset[1].players[position]}
        participant={position + 5}
        teamName={gamevalue.redteam}
        mapping={gamevalue.mappingDataset[realCnt].player[position + 5]}
        winner={Math.abs(goldgap) >= 300 && goldgap < 0}
        status={
          timer === "MAX"
            ? gamevalue.playersStatusDataset[playerStatusMax].players[
                position + 5
              ]
            : gamevalue.playersStatusDataset[timer].players[position + 5]
        }
        time={timer ? timer : 0}
        isMax={isMax}
        playerStatusTime={gamevalue.playerStatusTime}
      />
      <img
        className="position"
        src={`Images/ic_line_${arrPosition[position]}.svg`}
        alt=""
      ></img>
      {Math.abs(goldgap) >= 300 && (
        <GoldGap gold={Math.abs(goldgap)} win={goldgap > 0 ? "blue" : "red"} />
      )}
    </ChampLineContainer>
  );
};

export default ChampionLiuneBox;

const ChampLineContainer = styled.div`
  display: flex;
  width: 226px;
  height: 187px;
  margin: 10px 14px 10px 0;
  position: relative;

  .position {
    position: absolute;
    top: 10%;
    left: 46%;
    width: 17px;
    height: 17px;
    object-fit: contain;
    background-color: #fff;
  }

  .gold {
    position: absolute;
    top: 35%;
    left: 39%;
    width: 48px;
    height: 20px;
    padding: 3px 6px 2px;
    border-radius: 10px;
    background-color: #0075bf;
  }
`;
