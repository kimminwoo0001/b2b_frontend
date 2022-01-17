import React, { useState } from "react";
import styled from "styled-components";
import ChampionEventBox from "./ChampionEventBox";
import { useSelector, useDispatch } from "react-redux";
import { SetSelectedPlayer } from "../../../../../redux/modules/gamevalue";

const ChampionOppContainer = ({
  player,
  winner,
  participant,
  teamName,
  mapping,
}) => {
  const gamevalue = useSelector((state) => state.GameReportReducer);
  const dispatch = useDispatch();
  return (
    <ChampOppTeamContainer
      isActive={participant === gamevalue.selectedParticipant}
      isDeath={mapping.dead}
      champImg={player.info.championEng}
      onClick={() => {
        dispatch(
          SetSelectedPlayer({
            team: 1,
            position: participant - 5,
            participant: participant,
          })
        );
      }}
    >
      <div className="name">
        <span>{`${teamName} ${player.info.player}`}</span>
      </div>
      <div className="champ-pic-box">
        <Superiority winner={winner}>
          <img
            className="super-img"
            src="Images/ico-point-high-red.svg"
            alt="superImg"
          />
        </Superiority>
        <div className="champ-pic">
          <div className="img-box"></div>
          <div className="champ-revive-count">8</div>
        </div>
      </div>
      <ChampionEventBox isDeath={true} isOpp={true} />
      <div className="champ-status-bar">
        <HpBox used={(100 - mapping.hp) * 0.9}>
          <div className="usable" style={{ backgroundColor: "#37b537" }}></div>
        </HpBox>
        <MpBox used={(100 - mapping.mp) * 0.9}>
          <div className="usable" style={{ backgroundColor: "#2b80e0" }}></div>
        </MpBox>
      </div>
    </ChampOppTeamContainer>
  );
};

export default ChampionOppContainer;

const ChampOppTeamContainer = styled.div`
  width: 113px;
  height: 187px;
  padding: 15px 11px 20px 10px;
  border-radius: 10px;
  box-sizing: border-box;
  border: solid 2px ${(props) =>
    props.isActive ? `#f04545` : `rgba(0,0,0,0)`};
  background-color: #23212a;

  .name {
    ${(props) => props.isDeath && `opacity: 0.3;`}
    width: 100%;
    font-family: SpoqaHanSansNeo;
    font-size: 13px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.69;
    letter-spacing: normal;
    text-align: right;
    color: #fff;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .champ-pic-box {
    display: flex;
    margin: 8px 0 0 0;
    }

    .champ-pic {
      width: 60px;
      height: 60px;
      margin: 0px 0px 0px;
      object-fit: contain;

      position: relative;
     
      .img-box {
        width: 60px;
        height: 60px;
        border-radius: 30px;
       border: solid 2px
        ${(props) => (props.isActive ? `#f04545` : `rgba(0,0,0,0)`)};
        background-image: url(https://ddragon.leagueoflegends.com/cdn/11.24.1/img/champion/${(
          props
        ) => props.champImg}.png);
       background-size: 60px;
       ${(props) => props.isDeath && `mix-blend-mode: luminosity;`}
       
     }

      .champ-revive-count {
        //display:  ${(props) => (props.isDeath ? "block" : "none")};
        display: none;
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

  .champ-evnet-box {
    ${(props) => props.isDeath && `opacity: 0.3;`}
    margin: 10px 0 6px 2px;
    width: 100%;
    height: 28px;
    display: flex;
    .desc {
      width: 58px;
      height: 28px;
      .time {
        font-family: SpoqaHanSansNeo;
        font-size: 10px;
        font-weight: 300;
        font-stretch: normal;
        font-style: normal;
        line-height: 1;
        letter-spacing: normal;
        text-align: right;
        color: #fff;
      }
      .status {
        font-family: SpoqaHanSansNeo;
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.5;
        letter-spacing: normal;
        text-align: right;
        color: #fff;
      }
    }
    .event-img {
      visibility: hidden;
      margin-right: 2px;
      width: 28px;
      height: 28px;
      object-fit: contain;
      background-color: #fff;
    }
  }

  .champ-status-bar {
    ${(props) => props.isDeath && `opacity: 0.3;`}
    width: 90px;
    height: 23px;
    margin: 6px 0 0 2px;
    .usable {
      height: 10px;
      //padding: 0 10px 0 5px;
      border-radius: 10px;
    }
  }
`;

const HpBox = styled.div`
  width: 90px;
  height: 10px;
  margin: 0 0 3px;
  padding: 0 0 0 ${(props) => props.used}px;
  border-radius: 10px;
  background-color: #000;
  overflow: hidden;
`;

const MpBox = styled.div`
  width: 90px;
  height: 10px;
  margin: 3px 0 0;
  padding: 0 0 0 ${(props) => props.used}px;
  border-radius: 10px;
  background-color: #000;
  overflow: hidden;
`;

const Superiority = styled.div`
  width: 30px;
  height: 60px;
  position: relative;

  .super-img {
    display: ${(props) => (props.winner ? "block" : "none")};
    position: absolute;
    top: 30%;
    ${(props) => props.winner && `left: 50%;`}
    ${(props) => props.winner && `right: 10%;`}
    width: 11px;
    height: 11px;
    margin: 5px 0 4px;
    object-fit: contain;
`;
