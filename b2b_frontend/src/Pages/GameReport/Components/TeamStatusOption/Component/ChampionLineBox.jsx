import React from "react";
import styled, { css } from "styled-components";
import { useSelector, useDispatch, batch } from "react-redux";
import ChampionContainer from "./ChampionContainer";
import ChampionOppContainer from "./ChampionOppContainer";
import GoldGap from "./GoldGap";
import {
  SetSelectedParticipant,
  SetSelectedPlayer,
  SetSelectedPosition,
  SetSelectedTeam,
} from "../../../../../redux/modules/gamevalue";

const ChampionLiuneBox = ({ position }) => {
  const gamevalue = useSelector((state) => state.GameReportReducer);
  const dispatch = useDispatch();
  return (
    <ChampLineContainer>
      <ChampionContainer
        player={gamevalue.fixedDataset[0].players[position]}
        participant={position}
        teamName={gamevalue.blueteam}
      />
      <ChampionOppContainer
        player={gamevalue.fixedDataset[1].players[position]}
        participant={position + 5}
        teamName={gamevalue.redteam}
      />
      <img className="position" src="Images/ic_line_top.svg" alt=""></img>
      <GoldGap gold={933} win={100} />
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
