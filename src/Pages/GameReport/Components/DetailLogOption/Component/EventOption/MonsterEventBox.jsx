import React, { useState } from "react";
import styled, { css } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import secToMS from "../../../../../../lib/secToMS";

function drakeType(apiDragonType) {
  switch (apiDragonType) {
    case "AIR":
      return "Cloud";
    case "FIRE":
      return "Infernal";
    case "EARTH":
      return "Mountain";
    case "WATER":
      return "Ocean";
    case "ELDER":
      return "Elder";
    case "CHEMTECH":
      return "Chemtech";
    case "HEXTECH":
      return "Hextech";
    default:
      return "";
  }
}

const MonsterEventBox = ({ data, idx, isActive }) => {
  const gamevalue = useSelector((state) => state.GameReportReducer);
  const { t } = useTranslation();
  const dispatch = useDispatch(); // 나중에 클릭 시, 시간대로 이동하는 이벤트 만들어야 함.
  const time = secToMS(Math.floor(data.realCount / 2));
  const type = getMosterType(data.subType);
  const team = data.participantid < 6 ? 0 : 1;
  const info =
    gamevalue.fixedDataset[team].players[
      team === 0 ? data.participantid - 1 : data.participantid - 6
    ].info;
  const player = info.player;
  const championEng = info.championEng;

  function getMosterType(type) {
    let result = {
      type: "",
      subType: "",
      name: "",
      img: "",
    };
    if (type.includes("DRAGON")) {
      result.type = t("game.log.event.dragon");
      const subType = type.split("_")[0];
      result.subType = drakeType(subType);
      result.name = `${t(
        "game.log.event.dragonType." + subType.toLowerCase()
      )} ${t("game.log.event.dragon")}`;
      result.img = "ico-drake-" + result.subType.toLowerCase() + ".svg";
    } else if (type === "RIFTHERALD") {
      result.type = t("game.log.event.herald");
      result.subType = t("game.log.event.herald");
      result.name = t("game.log.event.herald");
      result.img = "ico-heralds.svg";
    } else if (type === "BARON_NASHOR") {
      result.type = t("game.log.event.baron");
      result.subType = t("game.log.event.baron");
      result.name = t("game.log.event.baron");
      result.img = "ico-baron.svg";
    }
    return result;
  }

  return (
    <LogContent isActive={isActive} team={team}>
      <div className="title">
        <div className="dot"></div>
        <span>{`${time} ${type.type}`}</span>
      </div>
      <div className="body">
        <img src={`Images/champion/${championEng}.png`} alt="champion" />
        <div className="player-name">{player}</div>
        <img
          src={`Images/ic_${team === 0 ? "blue" : "red"}_kill.svg`}
          alt="champion"
        />
        <img src={`Images/${type.img}`} alt="monster" />
        <div className="player-name">{type.name}</div>
      </div>
    </LogContent>
  );
};

export default MonsterEventBox;

const LogContent = styled.div`
  width: 180px;
  height: autopx;
  margin: 5px 0;
  padding: 8px 8px 8px 8px;
  border-radius: 10px;
  background-color: #000;
  opacity: ${(props) => (props.isActive ? `1` : `0.3`)};
  border: solid 2px
    ${(props) => props.isActive && (props.team === 1 ? `#f04545` : `#0075bf`)};
  cursor: pointer;

  .title {
    display: flex;
    height: 19px;
    margin: 0 5px 4px;
    //background-color: #f00;
    span {
      font-family: SpoqaHanSansNeo;
      font-size: 15px;
      font-weight: 500;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.15;
      letter-spacing: normal;
      text-align: left;
      color: #fff;
    }
  }

  .body {
    display: flex;
    padding-bottom: 0px;
    //border-bottom: solid 1px #23212a;
    img {
      width: 15px;
      height: 15px;
      //margin: 1px 2px 1px 0;
      object-fit: contain;
      border-radius: 20px;
    }

    .player-name {
      font-family: SpoqaHanSansNeo;
      font-size: 13px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: 1;
      letter-spacing: normal;
      text-align: left;
      color: #fff;
    }
  }
  .footer {
    display: flex;
    margin-top: 3px;
    img {
      width: 15px;
      height: 15px;
      //margin: 1px 2px 1px 0;
      object-fit: contain;
      border-radius: 20px;
    }

    .player-name {
      font-family: SpoqaHanSansNeo;
      font-size: 13px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: 1;
      letter-spacing: normal;
      text-align: left;
      color: #fff;
    }
  }

  .dot {
    width: 6px;
    height: 6px;
    margin: 7px 5px 10px 2px;
    background-color: ${(props) =>
      props.team === "red" ? `#f04545` : `#0075bf`};
    border-radius: 10px;
  }
`;
