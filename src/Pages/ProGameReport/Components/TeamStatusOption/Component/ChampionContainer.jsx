import React, { useState } from "react";
import styled from "styled-components";
import ChampionEventBox from "./ChampionEventBox";
import { useSelector, useDispatch } from "react-redux";
import { SetSelectedPlayer } from "../../../../../redux/modules/gamevalue";

const ChampionContainer = ({
  player,
  winner,
  participant,
  teamName,
  mapping,
  status,
  time,
  isMax,
  playerStatusTime,
}) => {
  const gamevalue = useSelector((state) => state.GameReportReducer);
  const dispatch = useDispatch();
  return (
    <ChampTeamContainer
      isActive={participant === gamevalue.selectedParticipant}
      isDeath={mapping.dead}
      champImg={player.info.championEng}
      onClick={() => {
        dispatch(
          SetSelectedPlayer({
            team: 0,
            position: participant,
            participant: participant,
          })
        );
      }}
    >
      <div className="name">
        <span>{`${teamName} ${player.info.player}`}</span>
      </div>
      <div className="champ-pic-box">
        <div className="champ-pic">
          <div className="img-box"></div>
          <div className="champ-revive-count">21</div>
        </div>
        <Superiority winner={winner}>
          <img
            className="super-img"
            src="Images/ico-point-high-blue.svg"
            alt="superImg"
          />
        </Superiority>
      </div>
      <ChampionEventBox
        isDeath={false}
        status={status}
        time={time}
        isMax={isMax}
        participant={participant}
        playerStatusTime={playerStatusTime}
      />
      <div className="champ-status-bar">
        <HpBox used={(100 - mapping.hp) * 0.9}>
          <div className="usable" style={{ backgroundColor: "#37b537" }}></div>
        </HpBox>
        <MpBox used={(100 - mapping.mp) * 0.9}>
          <div className="usable" style={{ backgroundColor: "#2b80e0" }}></div>
        </MpBox>
      </div>
    </ChampTeamContainer>
  );
};

export default ChampionContainer;

const ChampTeamContainer = styled.div`
  width: 113px;
  height: 187px;
  padding: 15px 10px 20px 11px;
  border-radius: 10px;
  box-sizing: border-box;
  border: solid 2px ${(props) =>
    props.isActive ? `#0075bf` : `rgba(0,0,0,0)`};
  background-color: #23212a;
}
  .name {
    ${(props) => props.isDeath && `opacity: 0.3;`}
    font-family: SpoqaHanSansNeo;
    font-size: 13px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.69;
    letter-spacing: normal;
    text-align: left;
    color: #fff;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .champ-pic-box {
    display: flex;
    margin: 8px 0 0 0;

    .champ-pic {
      width: 60px;
      height: 60px;
      margin: 0 0px;
      object-fit: contain;
      position: relative;

      .img-box {
        border-radius: 30px;
        width: 60px;
        height: 60px;
        border: solid 2px
        ${(props) => (props.isActive ? `#1580b6` : `rgba(0,0,0,0)`)};
        background-image: url(https://ddragon.leagueoflegends.com/cdn/11.24.1/img/champion/${(
          props
        ) => props.champImg}.png);
       background-size: 60px;
       ${(props) => props.isDeath && `mix-blend-mode: luminosity;`}
     }

      .champ-revive-count {
        //display:  ${(props) => (props.isDeath ? "block" : "none")};
        display:  none;
        ${(props) => (props.isDeath ? `opacity: 1` : `opacity: 0`)};
        width: 25px;
        height: 25px;
        position: absolute;
        top: 28%;
        left: 28%;

        font-family: SpoqaHanSansNeo;
        font-size: 20px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.1;
        letter-spacing: normal;
        text-align: center;
        color: #f04545;
      }
    }
  }

 

  .champ-status-bar {
    ${(props) => props.isDeath && `opacity: 0.3;`}
    width: 100%;
    height: 23px;
    margin: 6px 0px 0 0px;

   
    .usable {
      height: 10px;
      //padding: 0 10px 0 5px;
      border-radius: 10px;
    }
  }
`;

const HpBox = styled.div`
  width: 100%;
  height: 10px;
  margin: 0 0 3px;
  padding: 0 ${(props) => props.used}px 0 0;
  border-radius: 10px;
  background-color: #000;
`;

const MpBox = styled.div`
  width: 100%;
  height: 10px;
  margin: 3px 0 0;
  padding: 0 ${(props) => props.used}px 0 0;
  border-radius: 10px;
  background-color: #000;
`;

const Superiority = styled.div`
  width: 30px;
  height: 60px;
  position: relative;

  .super-img {
    display: ${(props) => (props.winner ? "block" : "none")};
    position: absolute;
    top: 30%;
    ${(props) => props.winner && `left: 15%;`}
    ${(props) => props.winner && `right: 10%;`}
    width: 11px;
    height: 11px;
    margin: 5px 0 4px;
    object-fit: contain;
`;
