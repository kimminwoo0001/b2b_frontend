import React, { useState } from "react";
import styled, { css } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import secToMS from "../../../../../../lib/secToMS";

const TeleportStatusBox = ({ TPData, idx, isActive, id }) => {
  const gamevalue = useSelector((state) => state.GameReportReducer);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const time = secToMS(Math.floor(TPData.realCount / 2));
  const data = TPData.data;

  const team = data.participant < 6 ? 0 : 1;
  const info =
    gamevalue.fixedDataset[team].players[
      team === 0 ? data.participant - 1 : data.participant - 6
    ].info;
  const player = info.player;
  const championEng = info.championEng;
  const title = t(`game.log.status.teleport.title`);

  return (
    <LogContent isActive={isActive} team={team}>
      <div className="title">
        <div className="dot"></div>
        <span>{`${time} ${title}`}</span>
      </div>
      <div className="body">
        <img src={`Images/champion/${championEng}.png`} alt="champion" />
        <span className="player-name">
          {`${player} ${t("game.log.status.teleport.particicle")}`}
        </span>
        <img src={`Images/SummonerTeleport.png`} alt="teleport" />
        <span className="player-name">
          {t(`game.log.status.teleport.desc`)}
        </span>
      </div>
    </LogContent>
  );
};

export default TeleportStatusBox;

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
