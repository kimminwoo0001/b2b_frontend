import React from "react";
/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled/macro";
import { useSelector, useDispatch, batch } from "react-redux";
import ChampionContainer from "./ChampionContainer";
import ChampionOppContainer from "./ChampionOppContainer";
import GoldGap from "./GoldGap";
import { colors } from "../../../../../Styles/ui";

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
  const transPosition = ["TOP", "JUG", "MID", "BOT", "SUP"];
  let timer = Math.floor(videovalue.playedSeconds - +gamevalue.startTime);
  const playerStatusMax = gamevalue.playersStatusDataset.length - 1;
  timer =
    timer > 0 ? (timer < playerStatusMax ? timer * 2 : playerStatusMax) : 0;
  const isMax = timer > playerStatusMax;
  const liveIdx = gamevalue.liveActiveIdx - 1 < 0 ? 0 : gamevalue.liveActiveIdx;

  return (
    <SChampLineContainer>
      <SLineContainer>
        <img src={`Images/ic_line_${arrPosition[position]}.svg`} alt=""></img>
        &nbsp;{transPosition[position]?.toUpperCase()}
      </SLineContainer>
      <ChampLineContainer>
        <ChampionContainer
          player={gamevalue.fixedDataset[0].players[position]}
          participant={position}
          teamName={gamevalue.blueteam}
          mapping={gamevalue.mappingDataset[realCnt].player[position]}
          winner={Math.abs(goldgap) >= 300 && goldgap > 0}
          status={
            isMax
              ? gamevalue.playersStatusDataset[playerStatusMax].players[
                  position
                ]
              : gamevalue.playersStatusDataset[timer].players[position]
          }
          time={timer ? timer / 2 : 0}
          isMax={isMax}
          playerStatusTime={gamevalue.playerStatusTime}
          level={gamevalue.liveDataset[liveIdx].players[position].level}
        />
        <ChampionOppContainer
          player={gamevalue.fixedDataset[1].players[position]}
          participant={position + 5}
          teamName={gamevalue.redteam}
          mapping={gamevalue.mappingDataset[realCnt].player[position + 5]}
          winner={Math.abs(goldgap) >= 300 && goldgap < 0}
          status={
            isMax
              ? gamevalue.playersStatusDataset[playerStatusMax].players[
                  position + 5
                ]
              : gamevalue.playersStatusDataset[timer].players[position + 5]
          }
          time={timer ? timer / 2 : 0}
          isMax={isMax}
          playerStatusTime={gamevalue.playerStatusTime}
          level={gamevalue.liveDataset[liveIdx].players[position + 5].level}
        />

        {Math.abs(goldgap) >= 300 && (
          <GoldGap
            gold={Math.abs(goldgap)}
            win={goldgap > 0 ? "blue" : "red"}
          />
        )}
      </ChampLineContainer>
    </SChampLineContainer>
  );
};

export default ChampionLiuneBox;

const ChampLineContainer = styled.div`
  display: flex;
  width: 226px;
  height: 155px;
  margin: 6px 14px 10px 0;
  position: relative;

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

const SChampLineContainer = styled.div`
  width: 226px;
  height: 187px;
  background-color: ${colors.bg_select};
  border-radius: 20px;
  margin-bottom: 10px;
  padding-top: 5px;
`;

const SLineContainer = styled.div`
  display: flex;
  width: 100%;
  height: 21px;

  font-family: SpoqaHanSansNeo;
  font-size: 16px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.38;
  letter-spacing: normal;
  text-align: center;
  justify-content: center;
  color: ${colors.text};
`;
