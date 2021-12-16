import React, { useState } from "react";
import styled, { css } from "styled-components";
import { useSelector } from "react-redux";

const StatusBox4 = () => {
  const staticvalue = useSelector((state) => state.StaticValueReducer);
  const gamevalue = useSelector((state) => state.GameReportReducer);
  const runesJoson = staticvalue.runesObjects;
  const runesData =
    gamevalue.fixedDataset[gamevalue.selectedTeam].players[
      gamevalue.selectedPosition
    ].rune;

  const mainRune = getMainRunes(runesData.slice(0, 5));
  const subRune = runesData.slice(5, 8);
  const statRune = runesData.slice(8, 11);

  function getMainRunes(runeList) {
    let arrImgAddr = [];

    for (let id of runeList) {
      for (let runeObject of runesJoson) {
        if (runeObject.id === mainRune[0]) {
          let slots = runeObject.slots;
          arrImgAddr.push(runeObject.icon);
          for (let runes of slots) {

          }

          break;
        }
      }
    }
  }

  return (
    <RunesContainer>
      <RunesBox>
        <div className="main-rune">
          <img src="" alt="" />
        </div>
        <div className="sub-rune"></div>
        <div className="sub-rune"></div>
        <div className="sub-rune"></div>
        <div className="sub-rune"></div>
      </RunesBox>
      <RunesBox>
        <div className="main-rune"></div>
        <div className="sub-rune"></div>
        <div className="sub-rune"></div>
      </RunesBox>
      <RuneStatsBox>
        <div className="rune-stat"></div>
        <div className="rune-stat"></div>
        <div className="rune-stat"></div>
      </RuneStatsBox>
    </RunesContainer>
  );
};

export default StatusBox4;

const RunesContainer = styled.div`
  width: 126px;
  height: 83px;
  margin: 22px 6px 19.5px 15px;
`;

const RunesBox = styled.div`
  width: 126px;
  height: 26px;
  margin: 0 0 7px;
  display: flex;

  .main-rune {
    width: 26px;
    height: 26px;
    margin: 0 4px 0 0;
    object-fit: contain;
    background-color: #f0f;

    img {
      width: 26px;
      height: 26px;
    }
  }

  .sub-rune {
    width: 21px;
    height: 21px;
    margin: 2px 3px 3px 0px;
    object-fit: contain;
    background-color: #ff0;
  }
`;

const RuneStatsBox = styled.div`
  height: 16px;
  margin: 8px 0px 0 0;
  display: flex;

  .rune-stat {
    width: 16px;
    height: 16px;
    margin: 0 6px 0 0;
    object-fit: contain;
    border-radius: 10px;
    border: solid 1px #bb9834;
  }
`;
