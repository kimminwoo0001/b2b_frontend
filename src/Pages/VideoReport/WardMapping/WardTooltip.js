import React from "react";
import styled from "styled-components";

function WardTooltip({ wardType, champion, player, time, team, side, date }) {
  return (
    <WardTooltipWrapper>
      <LeftSection>
        <ChampionImage
          src={`Images/champion/${champion}.png`}
          color={side === "red" ? "#f04545" : "#0075bf"}
        ></ChampionImage>
      </LeftSection>
      <RightSection>
        <PlayerInfo
          color={side === "red" ? "#f04545" : "#0075bf"}
        >{`${team} ${player}`}</PlayerInfo>
        <WardInfo>
          {date}
          <br />
          {`${Math.floor(time / 1000 / 60)}m ${Math.floor(
            (time / 1000) % 60
          )}s`}
          <br />
          {wardType}
        </WardInfo>
      </RightSection>
    </WardTooltipWrapper>
  );
}

export default WardTooltip;

const WardTooltipWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px 10px;
  align-items: center;
  min-width: 100px;
  min-height: 55px;
  border: solid 1px rgb(88, 84, 101);
  background-color: rgb(29, 29, 29);
`;

const LeftSection = styled.section`
  margin-right: 12px;
`;

const RightSection = styled.section``;

const ChampionImage = styled.img`
  width: 32px;
  height: 32px;
  border: solid 1px ${(props) => props.color};
  border-radius: 30px;
`;

const PlayerInfo = styled.div`
  font-family: NotoSansKR;
  font-size: 15px;
  font-weight: bold;
  letter-spacing: -0.06px;
  text-align: left;
  color: ${(props) => props.color};
  margin-bottom: 5px;
`;

const WardInfo = styled.div`
  font-family: NotoSansKR;
  font-size: 14px;
  text-align: left;
  color: rgb(255, 255, 255);
`;
