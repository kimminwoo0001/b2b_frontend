import React, { useState } from "react";
import styled from "styled-components";
import ChampionEventBox from "./ChampionEventBox";

const ChampionContainer = () => {
  return (
    <ChampTeamContainer isActive={true} isDeath={false}>
      <div className="name">
        <span>DK Khan</span>
      </div>
      <div className="champ-pic-box">
        <div className="champ-pic">
          <div className="champ-revive-count">21</div>
        </div>
        <Superiority winner={"blue"}>
          <img
            className="super-img"
            src="Images/ico-point-high-blue.svg"
            alt="superImg"
          />
        </Superiority>
      </div>
      <ChampionEventBox isDeath={false} />
      <div className="champ-status-bar">
        <HpBox used={30}>
          <div className="usable" style={{ backgroundColor: "#37b537" }}></div>
        </HpBox>
        <MpBox used={50}>
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
  }

  .champ-pic-box {
    display: flex;
    margin: 8px 0 0 0;

    .champ-pic {
      width: 60px;
      height: 60px;
      margin: 0 2px;
      padding: 40px 40px 0 0;
      object-fit: contain;
      background-color: #fff;
      border-radius: 30px;
      border: solid 2px
        ${(props) => (props.isActive ? `#1580b6` : `rgba(0,0,0,0)`)};
      position: relative;

      img {
        ${(props) => props.isDeath && `opacity: 0.5;`}
      }

      .champ-revive-count {
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
    width: 90px;
    height: 23px;
    margin: 6px 0 0 2px;

   
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
  padding: 0 ${(props) => props.used}px 0 0;
  border-radius: 10px;
  background-color: #000;
`;

const MpBox = styled.div`
  width: 90px;
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
    position: absolute;
    top: 30%;
    ${(props) => props.winner === "blue" && `left: 10%;`}
    ${(props) => props.winner === "red" && `right: 10%;`}
    width: 11px;
    height: 11px;
    margin: 5px 0 4px;
    object-fit: contain;
`;
