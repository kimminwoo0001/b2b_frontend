import React from "react";
import styled from "styled-components";

function ObjectTooltip({
  champion,
  player,
  position,
  side,
  gameid,
  result,
  oppteam,
  oppchampion,
}) {
  return (
    <ObjectTooltipWrapper>
      <Top>
        <LeftSection>
          <ChampionImage
            src={`Images/champion/${champion}.png`}
            color={side === "red" ? "#f04545" : "#0075bf"}
          ></ChampionImage>
        </LeftSection>
        <RightSection>
          <PlayerInfo
            color={side === "red" ? "#f04545" : "#0075bf"}
          >{`${player.toUpperCase()} ${position.toUpperCase()} ${result.toUpperCase()}`}</PlayerInfo>
        </RightSection>
      </Top>
      <VS>VS</VS>
      <Bottom>
        <OppInfo>
          <OppTeamLogo
            src={`Images/TeamLogo/${oppteam}.png`}
            // color={side === "red" ? "#0075bf" : "#f04545"}
          ></OppTeamLogo>
          <OppChampLogo
            src={`Images/champion/${oppchampion}.png`}
            // color={side === "red" ? "#0075bf" : "#f04545"}
          ></OppChampLogo>
        </OppInfo>
      </Bottom>
    </ObjectTooltipWrapper>
  );
}

export default ObjectTooltip;

const ObjectTooltipWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px 9px;
  min-width: 151px;
  min-height: 55px;
  border-radius: 10px;
  background-color: #433f4e;
`;

const Top = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LeftSection = styled.section`
  margin-right: 5px;
`;

const RightSection = styled.section``;

const ChampionImage = styled.img`
  width: 26px;
  height: 26px;
  border: solid 1px ${(props) => props.color};
  border-radius: 30px;
`;

const PlayerInfo = styled.div`
  font-family: NotoSansKR;
  font-size: 13px;
  font-weight: bold;
  letter-spacing: -0.06px;
  text-align: left;
  color: ${(props) => props.color};
  margin-bottom: 5px;
`;

const VS = styled.div`
  color: #fff;
  margin-bottom: 10px;
  font-size: 13px;
`;

const Bottom = styled.div``;

const OppInfo = styled.div``;

const OppTeamLogo = styled.img`
  width: 26px;
  height: 26px;
`;

const OppChampLogo = styled.img`
  width: 26px;
  height: 26px;
  border-radius: 30px;
  border: solid 1px ${(props) => props.color};
`;
