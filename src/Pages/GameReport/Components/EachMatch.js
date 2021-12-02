import React, { memo, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { SetGameId } from "../../../redux/modules/gamevalue";

const EachMatch = () => {
  const dispatch = useDispatch();

  return (
    <>
      <MetaData>
        <Round>LCK Spring 1R 1주차</Round>
        <Date>2022.02.03 FRI 19:00</Date>
      </MetaData>
      <GameInfoBox>
        <MatchInfo>
          <Team>
            <TeamName>DK</TeamName>
            <TeamImg src="Images/TeamLogo/ico-team-dk.png"></TeamImg>
          </Team>
          <LeftArrow></LeftArrow>
          <Score>
            <LeftScore>3</LeftScore>:<RightScore>0</RightScore>
          </Score>
          <RightArrow></RightArrow>
          <OppTeam>
            <OppTeamImg src="Images/TeamLogo/ico-team-t1.png"></OppTeamImg>
            <OppTeamName>T1</OppTeamName>
          </OppTeam>
        </MatchInfo>
        <SetInfo>
          <SetTitle>SET</SetTitle>
          <SetList onClick={() => {
            dispatch(SetGameId())
          }}>1</SetList>
          <SetList>2</SetList>
          <SetList>3</SetList>
          <SetList>4</SetList>
          <SetList>5</SetList>
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
  width: 336px;
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
`;

const TeamName = styled.div``;
const TeamImg = styled.img``;

const OppTeam = styled.div`
  display: flex;
  align-items: center;
`;
const OppTeamName = styled.div``;
const OppTeamImg = styled.img``;

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
  /* opacity: 0.3; */
  font-size: 20px;
  cursor: pointer;
  color: #fff;

  &:hover {
    background-color: #fff;
    opacity: 0.1;
    cursor: pointer;
    color: #fff;
  }
`;
