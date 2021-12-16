import React, { useState } from "react";
import styled from "styled-components";
import ChampionEventBox from "./ChampionEventBox";

const ChampionOppContainer = () => {
  return (
    <ChampOppTeamContainer isActive={false} isDeath={true}>
      <div className="name">
        <span>T1 Odoamne </span>
      </div>
      <div className="champ-pic-box">
        <Superiority winner={"red"}>
          <img
            className="super-img"
            src="Images/ico-point-high-red.svg"
            alt="superImg"
          />
        </Superiority>
        <div className="champ-pic">
          <div className="champ-revive-count">8</div>
        </div>
      </div>
      <ChampionEventBox isDeath={true} />
      <div className="champ-status-bar">
        <HpBox>
          <div className="usable" style={{ backgroundColor: "#37b537" }}></div>
        </HpBox>
        <MpBox>
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
  }

  .champ-pic-box {
    display: flex;
    margin: 8px 0 0 0;
    }

    .champ-pic {
      width: 60px;
      height: 60px;
      margin: 0px 2px 0px;
      padding: 40px 40px 0 0;
      object-fit: contain;
      border-radius: 30px;
      background-color: #fff;
      position: relative;

      img {
        ${(props) => props.isDeath && `opacity: 0.5;`}
      }

      .champ-revive-count {
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

    .hp {
     
    }
    .mp {
     
    }
    .usable {
      height: 10px;
      padding: 0 10px 0 5px;
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
`;

const MpBox = styled.div`
  width: 90px;
  height: 10px;
  margin: 3px 0 0;
  padding: 0 0 0 ${(props) => props.used}px;
  border-radius: 10px;
  background-color: #000;
`;

const Superiority = styled.div`
  width: 30px;
  height: 60px;
  position: relative;

  .super-img {
    position: absolute;
    top: 30%;
    ${(props) => props.winner === "blue" && `left: 10%;`}
    ${(props) => props.winner === "red" && `right: 10%;`}
    width: 11px;
    height: 11px;
    margin: 5px 0 4px;
    object-fit: contain;
`;
