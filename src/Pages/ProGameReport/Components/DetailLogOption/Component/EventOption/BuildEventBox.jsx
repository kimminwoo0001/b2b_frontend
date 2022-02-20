import React, { useState } from "react";
/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled/macro";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import secToMS from "../../../../../../lib/secToMS";

const BuildEventBox = ({ data, idx, isActive }) => {
  const gamevalue = useSelector((state) => state.GameReportReducer);
  const { t } = useTranslation();
  const dispatch = useDispatch(); // 나중에 클릭 시, 시간대로 이동하는 이벤트 만들어야 함.
  const time = secToMS(Math.floor(data.realCount / 2));
  const type = getBuildType(data.subType);
  const team = data.participantid < 6 ? 0 : 1;
  const info =
    gamevalue.fixedDataset[team].players[
      team === 0 ? data.participantid - 1 : data.participantid - 6
    ].info;
  const player = info.player;
  const championEng = info.championEng;

  function getBuildType(subType) {
    let result = {
      type: "",
      line: "",
      build: "",
    };
    result.line = subType.split("_")[0].toLowerCase();
    result.type = subType.includes("TURRET")
      ? t("game.log.event.broken.tower")
      : t("game.log.event.broken.inhibitor");

    switch (subType.replace(subType.split("_", 1), "")) {
      case "_OUTER_TURRET": // 1차 타워
        result.build = t("game.log.event.build.outer");
        break;
      case "_INNER_TURRET": // 2차 타워
        result.build = t("game.log.event.build.inner");
        break;
      case "_BASE_TURRET": // 억제기 타워
        result.build = t("game.log.event.build.base");
        break;
      case "_INHIBITOR_BUILDING": // 억제기
        result.build = t("game.log.event.build.inhibitor");
        break;
      case "_NEXUS_TURRET":
        result.build = t("game.log.event.build.nexus");
        break;
      default:
        return;
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
        <span className="player-name">{player}</span>
        <img
          src={`Images/ic_${team === 0 ? "blue" : "red"}_kill.svg`}
          alt="champion"
        />
        <img src={`Images/ico-position-${type.line}.png`} alt="monster" />
        <span className="player-name">{`${type.build}${t(
          "game.log.event.buildDestroyed"
        )}`}</span>
      </div>
    </LogContent>
  );
};

export default BuildEventBox;

const LogContent = styled.div`
  width: 180px;
  height: auto;
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
