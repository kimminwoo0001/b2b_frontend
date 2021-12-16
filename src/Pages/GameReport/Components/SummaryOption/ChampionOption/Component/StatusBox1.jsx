// 선수 이름
// 캐릭터
// 레벨
// 스펠 체크
// HP/MP

import React, { useState } from "react";
import styled, { css } from "styled-components";

const StatusBox1 = () => {
  const [spell1, setSpell1] = useState(false);
  const [spell2, setSpell2] = useState(false);

  return (
    <StatusContainer>
      <NameBox>T1 Inspired</NameBox>
      <FlexBox>
        <ChampImg></ChampImg>
        <SpellContainer>
          <SpellImg usable={spell1}></SpellImg>
          <SpellImg usable={spell2}></SpellImg>
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
`;

const SpellImg = styled.div`
  width: 20px;
  height: 20px;
  background-color: #fff;
  margin-bottom: 2px;
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

