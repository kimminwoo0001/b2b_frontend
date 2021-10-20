import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import SetWardData from "./SetWardData/SetWardData";
import SetPiData from "./SetPiData/SetPiData";
import axios from "axios";
import { API3 } from "../config";

const PiArea = () => {
  const [tab, setTab] = useState(0);
  const [gameIdInput, setGameIdInput] = useState("");
  const [gameIdSearchData, setGameIdSearchData] = useState([]);
  const [clickedGameId, setClickedGameId] = useState("");
  const [entireData, setEntireData] = useState([]);
  const [youtubeUrl, setYoutubeUrl] = useState("");

  const tabContents = {
    0: <SetWardData data={entireData} />,
    1: <SetPiData data={entireData} />,
  };

  // onchange
  const handleInput = (e) => {
    setGameIdInput(e.target.value);
  };

  // youtube url input onchange
  const handleUrlInput = (e) => {
    setYoutubeUrl(e.target.value);
  };

  //검색창 game id data fetching
  const handleSearch = async () => {
    if (gameIdInput.length < 3) {
      return;
    }

    const response = await axios.request({
      method: "GET",
      url: `${API3}/gameidsearchAjax.do`,
      params: {
        q: gameIdInput,
      },
    });
    setGameIdSearchData(response.data.items);
  };

  // dropdown 내 game id 클릭 시 해당 id에 대한 data fetching
  const handleGameIdClick = (id) => {
    setClickedGameId(id);
    // list 드롭다운 닫기
    setGameIdSearchData([]);
    // game id 인풋창에 id 담기
    setGameIdInput(id);
  };

  // game id 받아온 data에서 youtube url 추출해서 input value에 넣기
  const handleYoutubeData = (data) => {
    if (data.length !== 0) {
      if (data[3][0].Vod !== "") {
        setYoutubeUrl(data[3][0].vod);
      }
      if (data[2][0].VodGameStart !== "") {
        setYoutubeUrl(data[3][0].VodGameStart);
      }
      setYoutubeUrl(data[2][0].Vod);
    }
  };

  // gameid 저장 후 data fetching => 여기서 받아온 data로 ward 및 pi 둘다에 뿌려줌
  useEffect(() => {
    if (!clickedGameId) {
      return;
    }
    const fetchClickedData = async () => {
      const response = await axios.request({
        method: "GET",
        url: `${API3}/searchByGameidAjax.do`,
        params: {
          gameid: clickedGameId,
        },
      });
      setEntireData(response.data);
      handleYoutubeData(response.data);
    };
    fetchClickedData();
  }, [clickedGameId]);

  // db저장 submit 함수
  // const handleSubmit = async () => {
  //   const response = await axios.request(`${API4}/setWardPostition.do`, {
  //     method:"POST",
  //     data: {
  //       youtubeUrl,

  //     }

  //   })
  // }

  return (
    <PiAreaWrapper>
      <InnerWrapper>
        <Title>TeamSnowBall PI Area</Title>
        <GameIdInput
          type="text"
          value={gameIdInput}
          placeholder="GAME ID 검색 : 3글자 이상 입력해주세요."
          onKeyUp={handleSearch}
          onChange={(e) => handleInput(e)}
        />
        <GameIdSearchList isOpen={gameIdSearchData.length > 1}>
          {gameIdSearchData?.map((el) => {
            return (
              <SearchList
                key={el.gameid}
                onClick={() => handleGameIdClick(el.gameid)}
              >
                <div>{el.gameid}</div>
                <span>{el.date.substring(0, 11)}</span>
                <span>{el.team}</span>
              </SearchList>
            );
          })}
        </GameIdSearchList>
        <TabWrapper>
          <WardTab onClick={() => setTab(0)} changeColor={tab === 0}>
            WARD
          </WardTab>
          <PiTab onClick={() => setTab(1)} changeColor={tab === 1}>
            PI
          </PiTab>
        </TabWrapper>
        <YoutubeURL
          type="text"
          placeholder="Youtube URL을 입력하세요. 공유 -> 시작 시간 : 꼭 체크해주세요!"
          onChange={(e) => handleUrlInput(e)}
          value={youtubeUrl || ""}
        />
        <TabContents>{tabContents[tab]}</TabContents>
      </InnerWrapper>
    </PiAreaWrapper>
  );
};

export default PiArea;

const PiAreaWrapper = styled.section`
  background-color: #23212a;
  padding: 40px;
  height: 100vh;
`;

const InnerWrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const Title = styled.div`
  padding: 10px;
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  color: #fff;
`;

const GameIdInput = styled.input`
  width: 100%;
  background-color: #fff;
  border-radius: 5px;
  padding: 10px;
`;

const GameIdSearchList = styled.ul`
  background-color: #fff;
  display: ${(props) => (props.isOpen ? "block" : "none")};
  border-top: 1px solid black;
  /* scroll bar */
  overflow: scroll;
  height: 200px;
`;

const SearchList = styled.li`
  padding: 5px 10px;
  cursor: pointer;
  color: #b4b4b4;
  &:hover {
    color: black;
    background-color: #b4b4b4;
  }
`;

const TabWrapper = styled.div`
  margin: 5px 0;
`;

const WardTab = styled.button`
  background-color: #fff;
  border-radius: 5px;
  padding: 10px;
  margin: 2px;
  ${(props) =>
    props.changeColor &&
    css`
      color: #fff;
      background-color: #5942ba;
    `}
`;

const PiTab = styled.button`
  background-color: #fff;
  border-radius: 5px;
  padding: 10px;
  ${(props) =>
    props.changeColor &&
    css`
      color: #fff;
      background-color: #5942ba;
    `}
`;

const YoutubeURL = styled.input`
  width: 100%;
  background-color: #fff;
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px;
`;

const TabContents = styled.div`
  background-color: #23212a;
  padding: 10px 0;
  border-radius: 5px;
`;
