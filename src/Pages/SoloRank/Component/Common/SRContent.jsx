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

  const handleClick = () => {
    openModal(modalList.addTeamPlayer, {
      onSubmit: () => {
        console.log("submit시 action을 등록");
      },
    });
  };

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
