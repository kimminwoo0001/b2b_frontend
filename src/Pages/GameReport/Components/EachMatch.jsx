import React, { memo, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { useSelector, useDispatch, batch } from "react-redux";
import { useHistory } from "react-router-dom";
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
  SetMappingDataset,
  SetLiveDataset,
  SetTeamGoldDataset,
  SetStatusLogDataset,
  SetPlayersStatusDataset,
  SetTimeLineDataset,
} from "../../../redux/modules/gamevalue";
import { SetVodUrl } from "../../../redux/modules/videovalue";
import axiosRequest from "../../../lib/axiosRequest";
import {
  SetDesc,
  SetIsOpen,
  SetIsSelector,
  SetModalInfo,
} from "../../../redux/modules/modalvalue";
import { API } from "../../config";
import { API2 } from "../../config";
import { API5 } from "../../config";
import { Loading, SetTeam } from "../../../redux/modules/filtervalue";
import { useTranslation } from "react-i18next";
import secToMS from "../../../lib/secToMS";

const TOTAL_SET = [0, 1, 2, 3, 4];

const EachMatch = ({ matchData, team }) => {
  const dispatch = useDispatch();
  let history = useHistory();
  const { t } = useTranslation();
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

  const getGameDetailData = (gameId, gameFullTime) => {
    try {
      dispatch(Loading(true));
      const url = `${API5}/api/test/test2`;
      const params = {
        gameid: gameId,
      };
      axiosRequest(
        "GET",
        url,
        params,
        function (e) {
          let isDone = true;
          for (const [key, value] of Object.entries(e)) {
            if (value.length === 0) {
              console.log("None key", key);
              isDone = false;
              dispatch(SetIsSelector(false));
              dispatch(SetIsOpen(true));
              dispatch(SetDesc(t("game.eachMatch.noneData")));
              dispatch(Loading(false));
              break;
            }
          }

          if (isDone) {
            if (e?.infos.length === 2) {
              const roming = e.actionLog.filter((e) => e.type === "Roaming");
              const ganking = e.actionLog.filter((e) => e.type === "Ganking");
              const timefight = e.actionLog.filter(
                (e) => e.type === "matchLog"
              );
              const blueKills = e.log.event.filter(
                (e) => e.type === "CHAMPION_KILL" && e.participantid < 6
              );
              const redKills = e.log.event.filter(
                (e) => e.type === "CHAMPION_KILL" && e.participantid > 5
              );
              const buildDestroy = e.log.event.filter(
                (e) => e.type === "BUILDING_KILL"
              );
              const objectKill = e.log.event.filter(
                (e) =>
                  e.type === "ELITE_MONSTER_KILL" &&
                  ["RIFTHERALD", "BARON_NASHOR"].includes(e.subType)
              );
              const dragonKill = e.log.event.filter(
                (e) =>
                  e.type === "ELITE_MONSTER_KILL" &&
                  e.subType.includes("DRAGON")
              );

              let tg_rc_idx = 0;
              let teamGold_x = [];
              let teamGold_y = [];
              let teamGold_max = 0;

<<<<<<< HEAD
            batch(() => {
              dispatch(SetFixedDataset(e?.infos));
              dispatch(SetPlayersDataset(e?.players));
              dispatch(SetLogDataset(e?.log));
              dispatch(SetMappingDataset(e?.mapping));
              dispatch(SetLiveDataset(e?.live));
              dispatch(SetTeamGoldDataset(e?.teamGold));
              dispatch(SetStatusLogDataset(e?.actionLog));
              dispatch(SetPlayersStatusDataset(e?.status));
              dispatch(SetTimeLineDataset(timeLineSet));
              dispatch(Loading(false));
            });
=======
              for (let i = 0; i < gameFullTime; i++) {
                teamGold_x.push(secToMS(i));
                if (
                  e.teamGold.length > tg_rc_idx &&
                  i === e.teamGold[tg_rc_idx].realCount
                ) {
                  let e_tg = e.teamGold[tg_rc_idx];
                  let e_tg_gold = e_tg.blueGold - e_tg.redGold;

                  teamGold_y.push(e_tg_gold);
                  if (teamGold_max < Math.abs(e_tg_gold)) {
                    teamGold_max = Math.abs(e_tg_gold);
                  }
                  tg_rc_idx += 1;
                } else {
                  teamGold_y.push(undefined);
                }
              }

              const timeLineSet = {
                roming,
                ganking,
                timefight,
                blueKills,
                redKills,
                buildDestroy,
                objectKill,
                dragonKill,
                teamGold_x,
                teamGold_y,
                teamGold_max,
              };

              batch(() => {
                dispatch(SetFixedDataset(e?.infos));
                dispatch(SetPlayersDataset(e?.players));
                dispatch(SetLogDataset(e?.log));
                dispatch(SetMappingDataset(e?.mapping));
                dispatch(SetLiveDataset(e?.live));
                dispatch(SetTeamGoldDataset(e?.teamGold));
                dispatch(SetStatusLogDataset(e?.actionLog));
                dispatch(SetPlayersStatusDataset(e?.status));
                dispatch(SetTimeLineDataset(timeLineSet));
                history.push("/gameReportDetail");
              });
            } else {
              dispatch(SetIsSelector(false));
              dispatch(SetIsOpen(true));
              dispatch(SetDesc(t("game.eachMatch.noneData")));
            }
            dispatch(Loading(false));
>>>>>>> dev_hosting
          }
        },
        function (objstore) {
          dispatch(SetModalInfo(objstore)); // 오류 발생 시, Alert 창을 띄우기 위해 사용
          dispatch(Loading(false));
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
                  getGameDetailData(gameid[game], gamelength[game] / 2 ?? 0);
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
