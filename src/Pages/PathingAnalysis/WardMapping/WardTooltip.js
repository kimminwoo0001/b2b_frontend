import React, { useState, useEffect } from "react";
/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled/macro";

function WardTooltip({
  wardType,
  champion,
  player,
  time,
  team,
  side,
  date,
  position,
  oppteam,
  uniqueId,
}) {
  const [pos, setPos] = useState("");

  useEffect(() => {
    if (position == "1") {
      setPos("TOP");
    } else if (position == "2") {
      setPos("JNG");
    } else if (position == "3") {
      setPos("MID");
    } else if (position == "4") {
      setPos("BOT");
    } else if (position == "5") {
      setPos("SUP");
    }
  }, [position]);

  return (
    <WardTooltipWrapper>
      <TopSection>
        <ChampionImage
          src={`Images/champion/${champion}.png`}
          color={side === "red" ? "#f04545" : "#0075bf"}
        ></ChampionImage>
        <ChampionContents>
          <PlayerInfo>{`${team.toUpperCase()} ${pos} ${player}`}</PlayerInfo>
          <OtherInfo>
            <GameInfo>{`${uniqueId.replaceAll("_", " ")}`}</GameInfo>
            {`${date} VS ${oppteam}`}
          </OtherInfo>
        </ChampionContents>
      </TopSection>
      <BottomSection>
        <WardImage
          src={`Images/${wardType.replace(" ", "").toLowerCase()}-${side}.png`}
        ></WardImage>
        <WardDetail>
          {`${Math.floor(time / 1000 / 60)}m ${Math.floor(
            (time / 1000) % 60
          )}s`}
        </WardDetail>
        <WardName>{wardType}</WardName>
      </BottomSection>
    </WardTooltipWrapper>
  );
}

export default WardTooltip;

const WardTooltipWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 10px 10px;
  align-items: center;
  min-width: 100px;
  min-height: 55px;
  border-radius: 20px;
  background-color: #23212a;
`;

const TopSection = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
`;

const ChampionImage = styled.img`
  width: 26px;
  height: 26px;
  border: solid 1px ${(props) => props.color};
  border-radius: 30px;
  margin-right: 5px;
`;

const ChampionContents = styled.div`
  display: flex;
  flex-direction: column;
  font-family: NotoSansKR;
  font-size: 13px;
  letter-spacing: -0.06px;
  text-align: left;
  color: #fff;
  padding-bottom: 5px;
  border-bottom: 1px solid #3a3745;
`;

const PlayerInfo = styled.div`
  width: auto;
  font-weight: bold;
  margin-bottom: 5px;
`;

const OtherInfo = styled.div``;

const GameInfo = styled.div`
  margin-bottom: 5px;
`;

const WardImage = styled.img`
  width: 26px;
  height: 26px;
  margin-right: 5px;
`;

const BottomSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-family: NotoSansKR;
  font-size: 13px;
  text-align: left;
  color: #fff;
`;

const WardDetail = styled.div`
  margin-right: 5px;
  font-size: 13px;
`;

const WardName = styled.div``;
