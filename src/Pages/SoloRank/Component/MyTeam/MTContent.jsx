/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled/macro";
import React, { useState } from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import MTCategory from "./MTCategory";
import theme from "../../../../Styles/Theme";
import MTPlayerList from "./SubComponent/MTPlayerList";

// styled components
import * as table from "./styled/MTStyledTable";
import * as layout from "./styled/MTStyledLayout";
import { useModal } from "../../../../Hooks";
import Modals, { modalList } from "../../../../Components/Modals/Modals";

const S = { table, layout };

const inquireDayList = [1, 3, 5, 7, 15, 30];

const isLike = true;
const exTeamLine = "DK 정글";
const exPlayerNickName = "Canyon";
const exPlayerName = "김건부";

const MTContent = ({ selectedDay, setSelectedDay }) => {
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
          <MTPlayerList
            id={"showmaker"}
            isLike={isLike}
            teamLine={exTeamLine}
            nickName={exPlayerNickName}
            name={exPlayerName}
          />

          <MTPlayerList
            id={"showmaker"}
            isLike={isLike}
            teamLine={exTeamLine}
            nickName={exPlayerNickName}
            name={exPlayerName}
          />

          <S.table.AddPlayerPopupButton onClick={handleClick}>
            <span>+</span>
            <div>
              <h5>{t("soloRank.myTeam.label.addPlayer")}</h5>
              <span>{t("soloRank.myTeam.desc.addPlayer")}</span>
            </div>
          </S.table.AddPlayerPopupButton>
        </S.table.TableBody>
      </S.table.Table>
    </S.layout.Container>
  );
};

export default MTContent;
