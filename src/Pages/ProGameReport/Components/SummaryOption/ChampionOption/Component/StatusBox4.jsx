import React, { useState } from "react";
import styled, { css } from "styled-components";
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
      <RunesBox>
        <div className="main-rune">
          <img
            src={`https://ddragon.leagueoflegends.com/cdn/img/${mainRune[0]}`}
            alt=""
          />
        </div>
        <div className="sub-rune">
          <img
            src={`https://ddragon.leagueoflegends.com/cdn/img/${mainRune[1]}`}
            alt=""
          />
        </div>
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
        <div className="main-rune">
          <img
            src={`https://ddragon.leagueoflegends.com/cdn/img/${subRune[0]}`}
            alt=""
          />
        </div>
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

    img {
      width: 21px;
      height: 21px;
    }
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

    img {
      width: 16px;
      height: 16px;
    }
  }
`;
