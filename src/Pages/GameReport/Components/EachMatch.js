import React, { memo, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { SetGameId } from "../../../redux/modules/gamevalue";
import axiosRequest from "../../../lib/axiosRequest";
import { SetModalInfo } from "../../../redux/modules/modalvalue";
import { API } from "../../config";
import { API2 } from "../../config";

const TOTAL_SET = [0, 1, 2, 3, 4];

const EachMatch = ({ matchData, team }) => {
  const dispatch = useDispatch();
  const { date, game, gameid, oppteam, uniqueId, teamresult, oppteamresult } =
    matchData;
  // const acitveSetList = () => {
  //   let activeSet = [];
  //   for (let i = 0; i < TOTAL_SET; i++) {}
  // };

  return (
    <>
      <MetaData>
        <Round>{uniqueId}</Round>
        <Date>{date}</Date>
      </MetaData>
      <GameInfoBox>
        <MatchInfo>
          <Team>
            <TeamName>{team}</TeamName>
            <TeamImg
              src={`Images/TeamLogo/${team.toUpperCase()}.png`}
            ></TeamImg>
          </Team>
          <LeftArrow didMyTeamWin={teamresult > oppteamresult}></LeftArrow>
          <Score>
            <LeftScore>{teamresult}</LeftScore>&nbsp;:&nbsp;
            <RightScore>{oppteamresult}</RightScore>
          </Score>
          <RightArrow didOppTeamWin={teamresult < oppteamresult}></RightArrow>
          <OppTeam>
            <OppTeamImg
              src={`Images/TeamLogo/${oppteam.toUpperCase()}.png`}
            ></OppTeamImg>
            <OppTeamName>{oppteam}</OppTeamName>
          </OppTeam>
        </MatchInfo>
        <SetInfo>
          <SetTitle>SET</SetTitle>
          {TOTAL_SET.map((game, idx) => {
            return (
              <SetList
                inactive={gameid[game] === undefined}
                onClick={() => {
                  dispatch(SetGameId(gameid[game]));
                  // console.log(gameid[game]);
                }}
              >
                {idx + 1}
              </SetList>
            );
          })}
        </SetInfo>
      </GameInfoBox>
    </>
  );
};

export default EachMatch;

const MetaData = styled.section`
  color: #fff;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  font-family: "Spoqa Han Sans";
`;

const Round = styled.div`
  font-weight: bold;
  margin-right: 20px;
  font-size: 24px;
`;

const Date = styled.div`
  font-size: 20px;
`;

const GameInfoBox = styled.section`
  background-color: #23212a;
  width: 1050px;
  height: 113px;
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  margin-bottom: 20px;
`;

const MatchInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #ffffff;
  width: 360px;
`;

const Team = styled.div`
  display: flex;
  align-items: center;
`;

const LeftArrow = styled.div`
  width: 0px;
  height: 0px;
  border-top: 7px solid transparent;
  border-right: 8px solid #fff;
  border-bottom: 7px solid transparent;
  visibility: ${(props) => (props.didMyTeamWin ? "visibile" : "hidden ")};
`;
const Score = styled.div`
  font-size: 20px;
`;

const LeftScore = styled.span``;
const RightScore = styled.span``;

const RightArrow = styled.div`
  width: 0px;
  height: 0px;
  border-top: 7px solid transparent;
  border-left: 8px solid #fff;
  border-bottom: 7px solid transparent;
  visibility: ${(props) => (props.didOppTeamWin ? "visibile" : "hidden ")};
`;

const TeamName = styled.div`
  font-size: 20px;
  margin-right: 10px;
`;
const TeamImg = styled.img`
  width: 73px;
  height: 73px;
`;

const OppTeam = styled.div`
  display: flex;
  align-items: center;
`;
const OppTeamName = styled.div`
  font-size: 20px;
  margin-left: 10px;
`;
const OppTeamImg = styled.img`
  width: 73px;
  height: 73px;
`;

const SetInfo = styled.div`
  /* background-color: #fff; */
  width: 386px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
`;

const SetTitle = styled.ul`
  font-size: 20px;
`;

const SetList = styled.li`
  list-style: none;
  width: 50px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  border-radius: 50%;
  background-color: #16151c;
  font-size: 20px;
  cursor: pointer;
  color: #fff;

  ${(props) =>
    props.inactive &&
    css`
      cursor: not-allowed;
      pointer-events: none;
      opacity: 0.3;
    `}

  &:hover {
    background-color: #484655;
    cursor: pointer;
    color: #fff;
  }
`;
