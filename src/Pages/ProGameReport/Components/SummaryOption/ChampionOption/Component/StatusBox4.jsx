import React, { useState } from "react";
/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled/macro";
import { useSelector } from "react-redux";
import { recentVersion } from "../../../../../config";

const StatusBox4 = () => {
  const staticvalue = useSelector((state) => state.StaticValueReducer);
  const gamevalue = useSelector((state) => state.GameReportReducer);
  const runesJoson = staticvalue.runesObjects;
  const runesData =
    gamevalue.fixedDataset[gamevalue.selectedTeam].players[
      gamevalue.selectedPosition
    ].rune;

  const mainRune = getRunesAddr(runesData.slice(0, 5));
  const subRune = getRunesAddr(runesData.slice(5, 8));
  const statRune = runesData.slice(8, 11);

  function getRunesAddr(runeList) {
    let arrImgAddr = [];
    let slots = null;
    for (let runeObject of runesJoson) {
      if (runeObject.id === runeList[0]) {
        slots = runeObject.slots;
        arrImgAddr.push(runeObject.icon);
        break;
      }
    }

    for (let id of runeList.slice(1)) {
      for (let slot of slots) {
        for (let rune of slot.runes) {
          if (id === rune.id) {
            arrImgAddr.push(rune.icon);
            break;
          }
        }
      }
    }

    //console.log("arrImgAddr", arrImgAddr);
    return arrImgAddr;
  }

  return (
    <RunesContainer>
      <MainRuneBox>
        <img
          src={`https://ddragon.leagueoflegends.com/cdn/img/${mainRune[1]}`}
          alt=""
        />
      </MainRuneBox>
      <SubRuneBox>
        <RunesBox>
          <div className="sub-rune">
            <img
              src={`https://ddragon.leagueoflegends.com/cdn/img/${mainRune[2]}`}
              alt=""
            />
          </div>
          <div className="sub-rune">
            <img
              src={`https://ddragon.leagueoflegends.com/cdn/img/${mainRune[3]}`}
              alt=""
            />
          </div>
          <div className="sub-rune">
            <img
              src={`https://ddragon.leagueoflegends.com/cdn/img/${mainRune[4]}`}
              alt=""
            />
          </div>
        </RunesBox>
        <RunesBox>
          <div className="sub-rune">
            <img
              src={`https://ddragon.leagueoflegends.com/cdn/img/${subRune[1]}`}
              alt=""
            />
          </div>
          <div className="sub-rune">
            <img
              src={`https://ddragon.leagueoflegends.com/cdn/img/${subRune[2]}`}
              alt=""
            />
          </div>
        </RunesBox>
        <RuneStatsBox>
          <div className="rune-stat">
            <img src={`Images/icon/${statRune[0]}.png`} alt="" />
          </div>
          <div className="rune-stat">
            <img src={`Images/icon/${statRune[1]}.png`} alt="" />
          </div>
          <div className="rune-stat">
            <img src={`Images/icon/${statRune[2]}.png`} alt="" />
          </div>
        </RuneStatsBox>
      </SubRuneBox>
    </RunesContainer>
  );
};

export default StatusBox4;

const RunesContainer = styled.div`
  width: auto;
  height: 76px;
  margin: 14px 10px 19.5px 5px;
  display: flex;
`;

const MainRuneBox = styled.div`
  width: 76px;
  height: 76px;
  margin: 0 3px 0 0;
  object-fit: contain;

  img {
  }
`;

const SubRuneBox = styled.div``;

const RunesBox = styled.div`
  width: 126px;
  height: 26px;
  margin: 0 0 0px;
  display: flex;

  .sub-rune {
    width: 21px;
    height: 21px;
    margin: 0px 3px 0px 0px;
    object-fit: contain;

    img {
      width: 21px;
      height: 21px;
    }
  }
`;

const RuneStatsBox = styled.div`
  height: 16px;
  margin: 6px 0px 0 0;
  display: flex;

  .rune-stat {
    width: 16px;
    height: 16px;
    margin: 0 6px 0 0;
    object-fit: contain;
    border-radius: 10px;

    img {
      width: 16px;
      height: 16px;
    }
  }
`;
