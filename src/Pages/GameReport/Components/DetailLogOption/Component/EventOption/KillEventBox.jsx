import React, { memo, useState } from "react";
import styled, { css } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import secToMS from "../../../../../../lib/secToMS";
const KillEventBox = ({ data, idx, isActive }) => {
  const gamevalue = useSelector((state) => state.GameReportReducer);

  const { t } = useTranslation();
  const dispatch = useDispatch(); // 나중에 클릭 시, 시간대로 이동하는 이벤트 만들어야 함.

  const time = secToMS(Math.floor(data.realCount / 2));
  const type = `${t("game.log.event.kill")}`;
  const team = data.participantid < 6 ? 0 : 1;
  const info =
    gamevalue.fixedDataset[team].players[
      team === 0 ? data.participantid - 1 : data.participantid - 6
    ].info;
  const player = info.player;
  const championEng = info.championEng;
  const oppTeam = team === 0 ? 1 : 0;
  const oppInfo =
    gamevalue.fixedDataset[oppTeam].players[
      oppTeam === 0 ? data.victimId - 1 : data.victimId - 6
    ].info;
  const oppPlayer = oppInfo.player;
  const oppChampionEng = oppInfo.championEng;
  const assistList =
    data.assistingParticipantIds &&
    data.assistingParticipantIds.map((id) => {
      const info =
        gamevalue.fixedDataset[team].players[team === 0 ? id - 1 : id - 6].info;
      return { player: info.player, championEng: info.championEng };
    });

  return (
    <LogContent
      isActive={isActive}
      team={team}
      isAssist={assistList.length > 0}
    >
      <div className="title">
        <div className="dot"></div>
        <span>{`${time} ${type}`}</span>
      </div>
      <div className="body">
        <img src={`Images/champion/${championEng}.png`} alt="champion" />
        <div className="player-name">{player}</div>
        <img
          src={`Images/ic_${team === 0 ? "blue" : "red"}_kill.svg`}
          alt="champion"
        />
        <img src={`Images/champion/${oppChampionEng}.png`} alt="champion" />
        <div className="player-name">{oppPlayer}</div>
      </div>
      <div className="footer">
        {assistList.map((data) => {
          return (
            <>
              <img
                src={`Images/champion/${data.championEng}.png`}
                alt="champion"
              />
              <div className="player-name">{data.player}</div>
            </>
          );
        })}
      </div>
    </LogContent>
  );
};

export default memo(KillEventBox);

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
    display: flex;
    ${(props) =>
      props.isAssist
        ? css`
            padding-bottom: 3px;
            border-bottom: solid 1px #23212a;
          `
        : css`
            padding-bottom: 0px;
          `}

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
