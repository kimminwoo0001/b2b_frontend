/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled/macro";
import React, { useState } from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import MTCategory from "./SRCategory";
import { getPositon } from "../../../../lib/getPosition";
import MTPlayerList from "./SRPlayerList";

// styled components
import * as table from "../styled/MTStyledTable";
import * as layout from "../styled/MTStyledLayout";
import { useModal } from "../../../../Hooks";
import Modals, { modalList } from "../../../../Components/Modals/Modals";
import { API } from "../../../config";
import { useSelector, useDispatch, batch } from "react-redux";
import { Loading } from "../../../../redux/modules/filtervalue";
import axiosRequest from "../../../../lib/axios/axiosRequest";
import { SetModalInfo } from "../../../../redux/modules/modalvalue";

const S = { table, layout };

const MTContent = ({
  selectedDay,
  setSelectedDay,
  playerInfo,
  myTeamName,
  isMyTeamTab = false,
  getInfoFunc,
}) => {
  const user = useSelector((state) => state.UserReducer);
  const { openModal } = useModal();
  const { t } = useTranslation();
  const [playerInfoSet, setPlayerInfoSet] = useState(playerInfo);
  const dispatch = useDispatch();

  const handleClick = () => {
    openModal(modalList.addTeamPlayer, {
      onSubmit: (e) => {
        console.log("submit시 action을 등록");
        const url = `${API}/lolapi/solorank/summoneradd`;
        const params = {
          player: e.nickname,
          role: e.position,
          summonerId: e.selectedSoloRankIds,
          puuId: e.selectedSoloRankPuuids,
          token: user.token,
        };
        console.log(params);
        // dispatch(Loading(true));
        // axiosRequest(
        //   undefined,
        //   url,
        //   params,
        //   function (e) {
        //     console.log(e);
        //     getInfoFunc();
        //     dispatch(Loading(false));
        //   },
        //   function (objStore) {
        //     dispatch(SetModalInfo(objStore)); // 오류 발생 시, Alert 창을 띄우기 위해 사용
        //     dispatch(Loading(false));
        //   }
        // );
        getInfoFunc();
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
      let lastDayTotal = 0;
      let lastDayWin = 0;
      let lastDayLose = 0;

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

      playerInfo[piIdx] = {
        ...playerInfo[piIdx],
        cdCount: info.soloRankInfo.length,
        cdName: allName.substring(0, allName.length - 1),
        cdTier: maxTier,
        cdRank: maxRank,
        cdLeaguePoints: maxLP,
        cdCalRankPoint: (10 - +maxTier) * 1000 + +maxRank * 100 + +maxLP,
        cdSeasonTotal: seasonTotal,
        cdSeasonWin: seasonWin,
        cdSseasonLose: seasonlose,
        cdSeasonWinrate: Math.round((seasonWin / seasonTotal) * 100),
        cdLastDayTotal: lastDayTotal,
        cdLastDayWin: lastDayWin,
        cdLastDayLose: lastDayLose,
        cdLastDayWinrate: Math.round((lastDayWin / lastDayTotal) * 100),
      };
    });
    setPlayerInfoSet(playerInfo);
  }, [playerInfo]);

  return (
    <S.layout.Container>
      {/* 테이블 */}
      <S.table.Table>
        {/* 테이블 헤더 */}
        <MTCategory
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
          playerInfoSet={playerInfoSet}
          setPlayerInfoSet={setPlayerInfoSet}
        />
        <S.table.TableBody>
          {/* 반복 */}
          {playerInfoSet.length > 0 &&
            playerInfoSet.map((info) => {
              return (
                <MTPlayerList
                  teamLine={`${myTeamName} ${t(
                    `position.${getPositon(info.position)}`
                  )}`}
                  isMyTeamTab={isMyTeamTab}
                  getInfoFunc={getInfoFunc}
                  info={info}
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
