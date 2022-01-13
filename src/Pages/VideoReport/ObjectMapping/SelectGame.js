import React from "react";
import styled, { css } from "styled-components";

function SelectGame({
  gameData,
  setSide,
  side,
  gameSelect,
  setGameSelect,
  setObjectOpen,
  setPositionOpen,
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
                      src={`Images/TeamLogo/${data.oppteam}.png`}
                      alt="team"
                    />
                  </TeamImage>
                  <TimeStamp>
                    <LabelWin>{data.win}</LabelWin>
                    <LabelDate>{data.date.slice(0, 10)}</LabelDate>
                  </TimeStamp>
                </GameNav>
                <ShowChampion>
                  <RedSide isActive={data.side === "blue"}>
                    <LeftSideColor color={data.side === "blue"}></LeftSideColor>
                    <LeftImg color={data.side === "blue"}
                      src={`Images/champion/${data?.champion[0]}.png`}
                      alt="champ"
                    />
                    <LeftImg color={data.side === "blue"}
                      src={`Images/champion/${data?.champion[1]}.png`}
                      alt="champ"
                    />
                    <LeftImg color={data.side === "blue"}
                      src={`Images/champion/${data?.champion[2]}.png`}
                      alt="champ"
                    />
                    <LeftImg color={data.side === "blue"}
                      src={`Images/champion/${data?.champion[3]}.png`}
                      alt="champ"
                    />
                    <LeftImg color={data.side === "blue"}
                      src={`Images/champion/${data?.champion[4]}.png`}
                      alt="champ"
                    />
                  </RedSide>
                  <VS>VS</VS>
                  <BlueSide isActive={data.side === "red"}>
                    <RightImg color={data.side === "blue"}
                      src={`Images/champion/${data?.oppchampion[0]}.png`}
                      alt="champ"
                    />
                    <RightImg color={data.side === "blue"}
                      src={`Images/champion/${data?.oppchampion[1]}.png`}
                      alt="champ"
                    />
                    <RightImg color={data.side === "blue"}
                      src={`Images/champion/${data?.oppchampion[2]}.png`}
                      alt="champ"
                    />
                    <RightImg color={data.side === "blue"}
                      src={`Images/champion/${data?.oppchampion[3]}.png`}
                      alt="champ"
                    />
                    <RightImg color={data.side === "blue"}
                      src={`Images/champion/${data?.oppchampion[4]}.png`}
                      alt="champ"
                    />
                    <RightSideColor color={data.side === "blue"}></RightSideColor>
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
  margin-top: 0px;
  background-color: #2f2d38;
`;

const SideButtonWrapper = styled.div`
  margin-bottom: 9px;
`;

const SideButton = styled.button`
  width: 62px;
  height: 34px;
  border-radius: 10px;
  background-color: ${(props) => (props.isActive ? "#23212a" : "#3a3745")};
  font-family: SpoqaHanSansNeo;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #fff;
  opacity: ${(props) => (props.isActive ? 1.0 : 0.3)};
  margin-right: 5px;
`;

const GameLists = styled.div`
  /* height: 79px; */
  height: 330px;
  overflow-y: auto;
  border-radius: 20px;
  margin: 5px 0;
  padding-top: 5px;
  background-color: #23212a;
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
  width: 315px;
  height: 79px;
  background-color: #23212a;
  border-radius: 20px;
  margin: 5px 10px;
  ${(props) =>
    props.isActive &&
    css`
      background-color: #16151c;
    `}
`;

const GameNav = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px 0;
  height: 38px;
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
  font-family: SpoqaHanSansNeo;
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 2.67;
  letter-spacing: normal;
  text-align: right;
  color: #fff;
  color: rgb(255, 255, 255);
`;

const LabelDate = styled.span`
  font-family: SpoqaHanSansNeo;
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 2.67;
  letter-spacing: normal;
  text-align: center;
  color: #817e90;
  color: rgb(129, 126, 144);
`;

const RedSide = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  // background-image: url("Images/left-red-gradient.png");
  // background-repeat: no-repeat;
  // background-position: left;
  width: 150px;
  height: 100%;
  ${(props) =>
    props.isActive &&
    css`
      // background-image: url("Images/left-blue-gradient.png");
    `}
`;

const LeftImg = styled.img`
    width: 20px;
    height: 20px;
    border-radius: 20px;
    margin-right: 4px;

    ${props => props.color ? css`
    border: 1px solid #0075bf;
    `
    :
    css`
     border: 1px solid #f04545;
    `
  }
`;

const LeftSideColor = styled.div`
    width: 3px;
    height: 20px;
    margin-right: 5px;

    ${props => props.color ? css`
    background-color: #0075bf;
    `
    :
    css`
     background-color: #f04545;
    `
  }
`;

const RightSideColor = styled.div`
    width: 3px;
    height: 20px;
    margin-left: 5px;

    ${props => props.color ? css`
    background-color: #f04545;
    `
    :
    css`
     background-color: #0075bf;
    `
  }
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
  // background-image: url("Images/right-win-gradient.png");
  // background-repeat: no-repeat;
  // background-position: right;
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
      // background-image: url("Images/right-blue-gradient.png");
    `}
`;

const RightImg = styled.img`
    width: 20px;
    height: 20px;
    border-radius: 20px;
    margin-right: 4px;

    ${props => props.color ? css`
    border: 1px solid #f04545;;
    `
    :
    css`
     border: 1px solid #0075bf;
     
    `
  }
`;
