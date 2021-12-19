import React, { memo, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { useSelector, useDispatch, batch } from "react-redux";
import {
  SetBlueTeam,
  SetDetailDataSet,
  SetFixedDataset,
  SetGameId,
  SetLogDataset,
  SetOppside,
  SetPlayersDataset,
  SetRedTeam,
  SetUniqueId,
  SetGameTime,
  SetStartTime,
} from "../../../redux/modules/gamevalue";
import { SetVodUrl } from "../../../redux/modules/videovalue";
import axiosRequest from "../../../lib/axiosRequest";
import { SetModalInfo } from "../../../redux/modules/modalvalue";
import { API } from "../../config";
import { API2 } from "../../config";
import { API5 } from "../../config";

const TOTAL_SET = [0, 1, 2, 3, 4];

const EachMatch = ({ matchData, team }) => {
  const dispatch = useDispatch();
  const {
    date,
    game,
    gameid,
    vod,
    gamelength,
    platform,
    starttime,
    oppteam,
    uniqueId,
    teamresult,
    oppteamresult,
    oppside,
  } = matchData;

  const getGameDetailData = (gameId) => {
    try {
      const url = `${API5}/api/test/test2`;
      const params = {
        gameid: gameId,
      };
      axiosRequest(
        "GET",
        url,
        params,
        function (e) {
          console.log("fixedDataSet:", e?.infos);
          console.log("playerDataSet:", e?.players);
          console.log("logDataSet:", e?.log);
          return (dispatch, getState) => {
            batch(() => {
              dispatch(SetFixedDataset(e?.infos));
              dispatch(SetPlayersDataset(e?.players));
              dispatch(SetLogDataset(e?.log));
            });
          };
        },
        function (objstore) {
          dispatch(SetModalInfo(objstore)); // 오류 발생 시, Alert 창을 띄우기 위해 사용
        }
      );
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <MetaData>
        <Round>{uniqueId.replaceAll("_", " ")}</Round>
        <Date>{date.substring(0, 16)}</Date>
      </MetaData>
      <GameInfoBox>
        <MatchInfo>
          <Team>
            <TeamName>{team}</TeamName>
            <TeamImg
              src={`Images/TeamLogo/${team.toUpperCase()}.png`}
            ></TeamImg>
          </Team>
          <ScoreBox>
            <LeftArrow didMyTeamWin={teamresult > oppteamresult}></LeftArrow>
            <Score>
              <LeftScore>{teamresult}</LeftScore>&nbsp;:&nbsp;
              <RightScore>{oppteamresult}</RightScore>
            </Score>
            <RightArrow didOppTeamWin={teamresult < oppteamresult}></RightArrow>
          </ScoreBox>
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
                  dispatch(SetVodUrl(vod[game]));
                  dispatch(SetGameTime(gamelength[game] / 2 ?? 0));
                  dispatch(SetStartTime(starttime[game] ?? 0));
                  dispatch(SetUniqueId(uniqueId.replaceAll("_", " ")));
                  //dispatch(SetOppside(oppside[game]))
                  dispatch(
                    SetBlueTeam(
                      (oppside[game] === "red" ? team : oppteam).toUpperCase()
                    )
                  );
                  dispatch(
                    SetRedTeam(
                      (oppside[game] === "red" ? oppteam : team).toUpperCase()
                    )
                  );
                  getGameDetailData(gameid[game]);
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
  background-color: #2f2d38;
  width: 1050px;
  height: 113px;
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  margin-bottom: 53px;
`;

const MatchInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #ffffff;
  width: 380px;
`;

const Team = styled.div`
  display: flex;
  align-items: center;
  width: 155px;
`;

const ScoreBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 130px;
`;

const LeftArrow = styled.div`
  width: 0px;
  height: 0px;
  border-top: 5px solid transparent;
  border-right: 8px solid #fff;
  border-bottom: 5px solid transparent;
  visibility: ${(props) => (props.didMyTeamWin ? "visible" : "hidden")};
`;
const Score = styled.div`
  font-size: 20px;
`;

const LeftScore = styled.span`
  width: 40px;
  margin-left: 10px;
`;
const RightScore = styled.span`
  width: 40px;
  margin-right: 10px;
`;

const RightArrow = styled.div`
  width: 0px;
  height: 0px;
  border-top: 5px solid transparent;
  border-left: 8px solid #fff;
  border-bottom: 5px solid transparent;
  visibility: ${(props) => (props.didOppTeamWin ? "visible" : "hidden")};
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
  justify-content: flex-end;
  width: 155px;
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
  background-color: #484655;
  font-size: 20px;
  cursor: pointer;
  color: #fff;

  ${(props) =>
    props.inactive &&
    css`
      pointer-events: none;
      opacity: 0.3;
    `}

  &:hover {
    background-color: #484655;
    opacity: 0.7;
    cursor: pointer;
    color: #fff;
  }
`;
