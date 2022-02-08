import React, { useState } from "react";
import styled, { css } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import secToMS from "../../../../../../lib/secToMS";

const TeamFightStatusBox = ({ TFdata, id, idx, isActive }) => {
  const gamevalue = useSelector((state) => state.GameReportReducer);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const time = secToMS(Math.floor(TFdata.realCount / 2));
  const data = TFdata.data;

  const blueTeam = data.partis
    .filter((e) => e <= 5)
    .map((e) => gamevalue.fixedDataset[0].players[+e - 1].info);
  const redTeam = data.partis
    .filter((e) => e > 5)
    .map((e) => gamevalue.fixedDataset[0].players[+e - 6].info);
  const title = t(`game.log.status.teamfight.title`);

  return (
    <LogContent isActive={isActive}>
      <div className="title">
        <div className="dot"></div>
        <span>{`${time} ${title}`}</span>
      </div>
      <div className="body">
        {blueTeam.map((e) => {
          return (
            <img src={`Images/champion/${e.championEng}.png`} alt="champion" />
          );
        })}

        {/* <span className="player-name">{player}</span> */}
        <img src={`Images/ic_engagement.svg`} alt="champion" />
        {redTeam.map((e) => {
          return (
            <img src={`Images/champion/${e.championEng}.png`} alt="champion" />
          );
        })}
        {/* <span className="player-name">{`${t(
          "game.log.status.roming.desc"
        )}`}</span> */}
      </div>
    </LogContent>
  );
};

export default TeamFightStatusBox;

const LogContent = styled.div`
  width: 180px;
  height: auto;
  margin: 5px 0;
  padding: 8px 8px 8px 8px;
  border-radius: 10px;
  background-color: #000;
  opacity: ${(props) => (props.isActive ? `1` : `0.3`)};
  border: solid 2px #5942ba;
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
