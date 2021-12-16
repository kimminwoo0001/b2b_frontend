// 선수 이름
// 캐릭터
// 레벨
// 스펠 체크
// HP/MP

import React, { useState } from "react";
import styled, { css } from "styled-components";
import { useSelector, useDispatch } from "react-redux";

/*
when j.spells=1 then 'SummonerBoost'
when j.spells=3 then 'SummonerExhaust'
when j.spells=4 then 'SummonerFlash'
when j.spells=6 then 'SummonerHaste'
when j.spells=7 then 'SummonerHeal'
when j.spells=11 then 'SummonerSmite'
when j.spells=12 then 'SummonerTeleport'
when j.spells=13 then 'SummonerMana'
when j.spells=14 then 'SummonerDot'
when j.spells=21 then 'SummonerBarrier'
 */

const seekSpell = (spellNum) => {
  switch (spellNum) {
    case 1:
      return "SummonerBoost";
    case 3:
      return "SummonerExhaust";
    case 4:
      return "SummonerFlash";
    case 6:
      return "SummonerHaste";
    case 7:
      return "SummonerHeal";
    case 11:
      return "SummonerSmite";
    case 12:
      return "SummonerTeleport";
    case 13:
      return "SummonerMana";
    case 14:
      return "SummonerDot";
    case 21:
      return "SummonerBarrier";
    default:
      console.log("예상치 못한 스펠이 발견되었습니다.");
      return "SummonerPoroThrow";
  }
};

const StatusBox1 = () => {
  const gamevalue = useSelector((state) => state.GameReportReducer);
  const [spell1, setSpell1] = useState(true);
  const [spell2, setSpell2] = useState(false);
  const info =
    gamevalue.fixedDataset[gamevalue.selectedTeam].players[
      gamevalue.selectedPosition
    ].info;

  return (
    <StatusContainer>
      <NameBox>{`${
        gamevalue.selectedTeam === 0 ? gamevalue.blueteam : gamevalue.redteam
      } ${info.player}`}</NameBox>
      <FlexBox>
        <ChampImg champImg={info.championEng}></ChampImg>
        <SpellContainer>
          <SpellImg
            usable={spell1}
            spellImg={seekSpell(info.spell1)}
          ></SpellImg>
          <SpellImg
            usable={spell2}
            spellImg={seekSpell(info.spell2)}
          ></SpellImg>
        </SpellContainer>
      </FlexBox>
      <StatusBar>
        <div className="hp">
          <div className="usable" style={{ backgroundColor: "#37b537" }}></div>
        </div>
        <div className="mp">
          <div className="usable" style={{ backgroundColor: "#2b80e0" }}></div>
        </div>
      </StatusBar>
    </StatusContainer>
  );
};

export default StatusBox1;

const StatusContainer = styled.div`
  width: 78px;
  height: 91px;
  margin: 11px 10px 14.5px 8px;
`;

const NameBox = styled.div`
  font-family: SpoqaHanSansNeo;
  font-size: 10px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 2.2;
  letter-spacing: normal;
  text-align: left;
  color: #fff;
`;

const FlexBox = styled.div`
  display: flex;
`;

const SpellContainer = styled.div`
  width: 20px;
  height: 42px;
  margin: 5px 8px 7px 0px;
`;

const ChampImg = styled.div`
  width: 45px;
  height: 45px;
  margin: 2px 5px 7px 0;
  padding: 25px 25px 0 0;
  border: solid 2px #f04545;
  border-radius: 30px;
  background-image: url(https://ddragon.leagueoflegends.com/cdn/11.24.1/img/champion/${(
    props
  ) => props.champImg}.png);
  background-size: 45px;
`;

const SpellImg = styled.div`
  width: 20px;
  height: 20px;
  background-color: #fff;
  margin-bottom: 2px;
  background-image: url("Images/spell/${(props) => props.spellImg}.png");
  background-size: 20px;
  opacity: ${(props) => (props.usable ? "1" : "0.5")};
`;

const StatusBar = styled.div`
    width: 78px;
    height: 10px;
    margin: 4px 0 0 2px;

    .hp {
      width: 90px;
      height: 10px;
      margin: 0 0 3px;
      padding: 0 8px 0 0;
      border-radius: 10px;
      background-color: #23212a;
    }
    .mp {
      width: 90px;
      height: 10px;
      margin: 3px 0 0;
      padding: 0 50px 0 0;
      border-radius: 10px;
      background-color: #23212a;
    }
    .usable {
      height: 10px;
      padding: 0 10px 0 5px;
      border-radius: 10px;
    }
  }
`;
