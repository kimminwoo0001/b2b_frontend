import React from "react";
import styled, { css } from "styled-components";

function SelectGame({
  gameData,
  setSide,
  side,
  gameSelect,
  setGameSelect,
  setObjectOpen,
  setPositionOpen
}) {
  //오브젝트 별 동선 경기 데이터 받아와서 선택하는 부분
  const getGameId = (data) => {
    if (gameSelect.find((e) => e === data.gameid)) {
      setGameSelect(gameSelect.filter((e) => e !== data.gameid));
    } else if (gameSelect.length >= 0) {
      setGameSelect([...gameSelect.filter((e) => e !== ""), data.gameid]);
    }
  };

  return (
    <SelectGameContainer>
      <SideButtonWrapper>
        <SideButton onClick={() => setSide("all")} isActive={side === "all"}>
          ALL
        </SideButton>
        <SideButton onClick={() => setSide("blue")} isActive={side === "blue"}>
          BLUE
        </SideButton>
        <SideButton onClick={() => setSide("red")} isActive={side === "red"}>
          RED
        </SideButton>
      </SideButtonWrapper>
      <GameLists>
        {gameData &&
          gameData?.map((data, idx) => {
            return (
              <Game
                key={idx}
                onClick={() => {
                  getGameId(data);
                  setObjectOpen(true);
                  setPositionOpen(true);
                }}
                isActive={gameSelect.find((e) => e === data.gameid)}
              >
                <GameNav>
                  <TeamImage>
                    <img src={`Images/TeamLogo/${data.team}.png`} alt="team" />
                    <span>VS</span>
                    <img
                      src={`Images/TeamLogo/${data.opp_team}.png`}
                      alt="team"
                    />
                  </TeamImage>
                  <TimeStamp>
                    <LabelWin>{data.win}</LabelWin>
                    <LabelDate>{data.date}</LabelDate>
                  </TimeStamp>
                </GameNav>
                <ShowChampion>
                  <RedSide isActive={data.side === "blue"}>
                    <img
                      src={`Images/champion/${data?.champion[0]}.png`}
                      alt="champ"
                    />
                    <img
                      src={`Images/champion/${data?.champion[1]}.png`}
                      alt="champ"
                    />
                    <img
                      src={`Images/champion/${data?.champion[2]}.png`}
                      alt="champ"
                    />
                    <img
                      src={`Images/champion/${data?.champion[3]}.png`}
                      alt="champ"
                    />
                    <img
                      src={`Images/champion/${data?.champion[4]}.png`}
                      alt="champ"
                    />
                  </RedSide>
                  <VS>VS</VS>
                  <BlueSide isActive={data.side === "red"}>
                    <img
                      src={`Images/champion/${data?.opp_champions[0]}.png`}
                      alt="champ"
                    />
                    <img
                      src={`Images/champion/${data?.opp_champions[1]}.png`}
                      alt="champ"
                    />
                    <img
                      src={`Images/champion/${data?.opp_champions[2]}.png`}
                      alt="champ"
                    />
                    <img
                      src={`Images/champion/${data?.opp_champions[3]}.png`}
                      alt="champ"
                    />
                    <img
                      src={`Images/champion/${data?.opp_champions[4]}.png`}
                      alt="champ"
                    />
                  </BlueSide>
                </ShowChampion>
              </Game>
            );
          })}
      </GameLists>
    </SelectGameContainer>
  );
}

export default SelectGame;

const SelectGameContainer = styled.div`
  margin-top: 20px;
`;

const SideButtonWrapper = styled.div`
  margin-bottom: 9px;
`;

const SideButton = styled.button`
  width: 65px;
  height: 27px;
  border-radius: 2px;
  border: solid 1px rgb(67, 63, 78);
  background-color: rgb(47, 45, 56);
  font-family: Poppins;
  font-size: 13px;
  text-align: center;
  color: rgb(129, 126, 144);
  margin-right: 5px;
  ${(props) =>
    props.isActive &&
    css`
      border-radius: 2px;
      border: solid 1px rgb(124, 119, 139);
      background-color: rgb(35, 33, 42);
      color: rgb(255, 255, 255);
    `}
`;

const GameLists = styled.div`
  /* height: 79px; */
  max-height: 270px;
  overflow-y: auto;
  margin-bottom: 21px;
  &::-webkit-scrollbar {
    width: 4px;
    height: 10px;

    border-radius: 3px;
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgb(67, 63, 78);
    border-radius: 3px;
  }
`;

const Game = styled.div`
  width: 330px;
  height: 79px;
  border: solid 1px rgb(58, 55, 69);
  background-color: rgb(35, 33, 42);
  ${(props) =>
    props.isActive &&
    css`
      border: 1px solid white;
    `}
`;

const GameNav = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 11px;
  height: 38px;
  border-bottom: solid 1px rgb(58, 55, 69);
`;

const ShowChampion = styled.div`
  display: flex;
  align-items: center;
  height: 39px;
  width: 100%;
`;

const TeamImage = styled.div`
  display: flex;
  align-items: center;
  > img {
    width: 24px;
    height: 24px;
    object-fit: contain;
  }
  > span {
    font-family: Poppins;
    font-size: 13px;
    text-align: center;
    color: rgb(129, 126, 144);
    margin: 0 4px;
  }
`;

const TimeStamp = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 110px;
  font-family: Poppins;
  font-size: 12px;
  text-align: center;
`;

const LabelWin = styled.span`
  color: rgb(255, 255, 255);
`;

const LabelDate = styled.span`
  color: rgb(129, 126, 144);
`;

const RedSide = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("Images/left-red-gradient.png");
  background-repeat: no-repeat;
  background-position: left;
  width: 150px;
  height: 100%;
  > img {
    width: 20px;
    height: 20px;
    border-radius: 20px;
    margin-right: 4px;
  }
  ${(props) =>
    props.isActive &&
    css`
      background-image: url("Images/left-blue-gradient.png");
    `}
`;

const VS = styled.div`
  font-family: Poppins;
  font-size: 13px;
  margin: 0 6px;
  text-align: center;
  color: rgb(129, 126, 144);
`;

const BlueSide = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("Images/right-win-gradient.png");
  background-repeat: no-repeat;
  background-position: right;
  width: 150px;
  height: 100%;
  > img {
    width: 20px;
    height: 20px;
    border-radius: 20px;
    margin-left: 4px;
  }
  ${(props) =>
    props.isActive &&
    css`
      background-image: url("Images/right-blue-gradient.png");
    `}
`;
