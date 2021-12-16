import React from "react";
import styled, { css } from "styled-components";
import ChampionContainer from "./Component/ChampionContainer";
import ChampionOppContainer from "./Component/ChampionOppContainer";
import GoldGap from "./Component/GoldGap";

const TeamStatus = () => {
  return (
    <ChamStatusContainer>
      <ChampNavConatiner>
        <div className="blue">
          <div className="team-name">{"DK"}</div>
          <img src={`Images/TeamLogo/${"DK"}.png`} alt="" />
        </div>
        <div className="red">
          <img src={`Images/TeamLogo/${"T1"}.png`} alt="" />
          <div className="team-name">{"T1"}</div>
        </div>
      </ChampNavConatiner>
      <ChampLineContainer>
        <ChampionContainer />
        <ChampionOppContainer />
        <img className="position" src="Images/ic_line_top.svg" alt=""></img>
        <GoldGap gold={933} win={100} />
      </ChampLineContainer>
      <ChampLineContainer>
        <ChampionContainer />
        <ChampionOppContainer />
        <img className="position" src="Images/ic_line_jng.svg" alt=""></img>
        <GoldGap gold={467} win={200} />
      </ChampLineContainer>
      <ChampLineContainer>
        <ChampionContainer />
        <ChampionOppContainer />
        <img className="position" src="Images/ic_line_mid.svg" alt=""></img>
        <GoldGap gold={394} win={200} />
      </ChampLineContainer>
      <ChampLineContainer>
        <ChampionContainer />
        <ChampionOppContainer />
        <img className="position" src="Images/ic_line_ad.svg" alt=""></img>
        <GoldGap gold={933} win={100} />
      </ChampLineContainer>
      <ChampLineContainer>
        <ChampionContainer />
        <ChampionOppContainer />
        <img className="position" src="Images/ic_line_sup.svg" alt=""></img>
        <GoldGap gold={22} win={200} />
      </ChampLineContainer>
    </ChamStatusContainer>
  );
};

export default TeamStatus;

const ChamStatusContainer = styled.div`
  width: 240px;
  height: 1080px;
  padding: 13px 14px 0 0;
  box-shadow: 5px 5px 30px 0 rgba(0, 0, 0, 0.15);
`;

const ChampNavConatiner = styled.div`
  display: flex;
  width: 240px;
  height: 85px;
  margin: 0 0 10px;
  padding: 55px 0 0 0;
  box-shadow: 5px 5px 30px 0 rgba(0, 0, 0, 0.15);
  position: relative;

  img {
    width: 30px;
    height: 30px;
    margin: 0 3px 0 0;
    object-fit: contain;
  }

  .team-name {
    font-family: SpoqaHanSansNeo;
    font-size: 18px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.39;
    letter-spacing: normal;
    color: #fff;
  }

  .blue {
    width: 100%;
    height: 30px;
    padding: 0 17px 0 0;
    display: flex;
    text-align: left;
    justify-content: flex-end;
  }

  .red {
    width: 100%;
    height: 30px;
    padding: 0 0 0 18px;
    display: flex;
    text-align: right;
    justify-content: flex-start;
  }
`;

const ChampLineContainer = styled.div`
  display: flex;
  width: 226px;
  height: 187px;
  margin: 10px 14px 10px 0;
  position: relative;

  .position {
    position: absolute;
    top: 10%;
    left: 46%;
    width: 17px;
    height: 17px;
    object-fit: contain;
    background-color: #fff;
  }

  .gold {
    position: absolute;
    top: 35%;
    left: 39%;
    width: 48px;
    height: 20px;
    padding: 3px 6px 2px;
    border-radius: 10px;
    background-color: #0075bf;
  }
`;
