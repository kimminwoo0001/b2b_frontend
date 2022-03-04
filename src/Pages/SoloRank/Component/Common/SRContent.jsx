/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled/macro";
import React, { useState } from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import MTCategory from "./SRCategory";
import { getPositon } from "../../../../lib/getPosition";
import MTPlayerList from "../MTPlayerList";

// styled components
import * as table from "../styled/MTStyledTable";
import * as layout from "../styled/MTStyledLayout";
import { useModal } from "../../../../Hooks";
import Modals, { modalList } from "../../../../Components/Modals/Modals";

const S = { table, layout };

const MTContent = ({
  selectedDay,
  setSelectedDay,
  playerInfo,
  myTeamName,
  isMyTeamTab = false,
}) => {
  const { openModal } = useModal();
  const { t } = useTranslation();
  const [closeData, setCloseData] = useState({
    count: 0,
    name: "",
    tier: 0,
    season: {
      total: 0,
      win: 0,
      lose: 0,
      winrate: 0,
    },
    lastDay: {
      total: 0,
      win: 0,
      lose: 0,
      winrate: 0,
    },
  });

  const handleClick = () => {
    openModal(modalList.addTeamPlayer, {
      onSubmit: () => {
        console.log("submit시 action을 등록");
      },
    });
  };

  useEffect(() => {
    playerInfo.map((info, piIdx) => {
      let allName = "";
      let maxTier = 9;
      let maxRank = 0;
      let maxLP = 0;
      let seasonTotal = 0;
      let seasonWin = 0;
      let seasonlose = 0;
      let seasonWinrate = 0;
      let lastDayTotal = 0;
      let lastDayWin = 0;
      let lastDayLose = 0;
      let lastDayWinrate = 0;

      for (let data of info.soloRankInfo) {
        allName += (data.summonerName ?? "") + ",";
        if (data.lastSeason) {
          seasonTotal += +data.lastSeason.total;
          seasonWin += +data.lastSeason.win;
          seasonlose += +data.lastSeason.lose;
        }
        if (data.lastDay) {
          lastDayTotal += +data.lastDay.total;
          lastDayWin += +data.lastDay.win;
          lastDayLose += +data.lastDay.lose;
        }

        if (data.tier > 0 && data.tier <= maxTier) {
          if (maxTier !== data.tier) {
            maxRank = 0;
          }
          maxTier = data.tier;

          if (maxRank < data.rank) {
            maxRank = data.rank;
            maxLP = 0;
          }

          if (maxLP < data.leaguePoints) {
            maxLP = data.leaguePoints;
          }
        }
      }

      playerInfo[piIdx].closeData = {
        count: info.soloRankInfo.length,
        name: allName.substring(0, allName.length - 1),
        tier: maxTier,
        rank: maxRank,
        leaguePoints: maxLP,
        season: {
          total: seasonTotal,
          win: seasonWin,
          lose: seasonlose,
          winrate: Math.round((seasonWin / seasonTotal) * 100),
        },
        lastDay: {
          total: lastDayTotal,
          win: lastDayWin,
          lose: lastDayLose,
          winrate: Math.round((lastDayWin / lastDayTotal) * 100),
        },
      };
    });
  }, [playerInfo]);

  return (
    <S.layout.Container>
      {/* 테이블 */}
      <S.table.Table>
        {/* 테이블 헤더 */}
        <MTCategory selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
        <S.table.TableBody>
          {/* 반복 */}
          {playerInfo.length > 0 &&
            playerInfo.map((info) => {
              return (
                <MTPlayerList
                  player={info.player}
                  bookmark={info.bookmark}
                  teamLine={`${myTeamName} ${t(
                    `position.${getPositon(info.position)}`
                  )}`}
                  role={info.position}
                  nickName={info.player}
                  name={""}
                  playChampion={info.playChampion}
                  soloRankInfo={info.soloRankInfo}
                  isMyTeamTab={isMyTeamTab}
                  closeData={info.closeData}
                />
              );
            })}
          {isMyTeamTab && (
            <S.table.AddPlayerPopupButton onClick={handleClick}>
              <span>+</span>
              <div>
                <h5>{t("soloRank.myTeam.label.addPlayer")}</h5>
                <span>{t("soloRank.myTeam.desc.addPlayer")}</span>
              </div>
            </S.table.AddPlayerPopupButton>
          )}
        </S.table.TableBody>
      </S.table.Table>
    </S.layout.Container>
  );
};

export default MTContent;
