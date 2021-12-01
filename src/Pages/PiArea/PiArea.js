import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import SetWardData from "./SetWardData/SetWardData";
import SetPiData from "./SetPiData/SetPiData";
import axios from "axios";
import qs from "qs";

import { API4 } from "../config";
import axiosRequest from "../../lib/axiosRequest";

const PiArea = () => {
  const [tab, setTab] = useState(0);
  const [gameIdInput, setGameIdInput] = useState("");
  const [gameIdSearchData, setGameIdSearchData] = useState([]);
  const [clickedGameId, setClickedGameId] = useState("");
  const [entireData, setEntireData] = useState([]);
  const [ward, setWard] = useState([]);
  const [pi, setPI] = useState([]);
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const tabContents = {
    0: <SetWardData wardData={ward} setWard={setWard} />,
    1: <SetPiData piData={pi} setPi={setPI} />,
  };


  // onchange
  const handleInput = (e) => {
    setGameIdInput(e.target.value);
  };

  // youtube url input onchange
  const handleUrlInput = (e) => {
    if (!e.target.value.includes("?t=")) {
      alert("youtube url에 시작 시간을 추가해주세요!");
    }
    setYoutubeUrl(e.target.value);
  };

  //검색창 game id data fetching
  const handleSearch = async () => {
    if (gameIdInput.length < 3) {
      return;
    }

    const url = `${API4}/gameidsearchAjax.do`;
    const params = {
      q: gameIdInput,
    }

    axiosRequest(null, url, params, function (e) {
      setGameIdSearchData(e.data.items);
    })
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
    // setEntireData("");
    const fetchClickedData = async () => {

      const url = `${API4}/searchByGameidAjax.do`;
      const params = {
        gameid: clickedGameId,
      }
      axiosRequest(null, url, params, function (e) {
        setEntireData(e.data);
        handleYoutubeData(e.data);
      })

    };
    fetchClickedData();
  }, [clickedGameId]);

  useEffect(() => {
    setWard(entireData[0]);
    setPI(entireData[1]);
    console.log(entireData)
  }, [entireData]);


  // db저장 submit 함수
  const handleSubmit = async () => {

    // table_value key에 들어갈 배열 가공함수

    // let newPi = [];
    // const makeNewArray = (arr) => {

    //   // pi data가 그대로인 경우
    //   if (arr.length === 1) {
    //     const values = Object.values(arr[0]);
    //     for (let i = 0; i < values.length; i++) {
    //       newPi.push(values[i]);
    //     }
    //   }

    //   // pi data가 수정되어 저장된 경우
    //   for (let i = 0; i < arr.length; i++) {
    //     for (let j = 0; j < arr[i].length; j++) {
    //       newPi.push(arr[i][j]);
    //     }
    //   }
    //   return newPi;
    // }

    // makeNewArray(pi);
    axios.defaults.baseURL = `${API4}`;
    axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

    console.log(pi[0])
    // console.log(newPi)

    let data = {
      vod: youtubeUrl,
      gameid: clickedGameId,
      btop1: ward[0].firstwardPosition,
      btop2: ward[0].secondwardPosition,
      bjng1: ward[1].firstwardPosition,
      bjng2: ward[1].secondwardPosition,
      bmid1: ward[2].firstwardPosition,
      bmid2: ward[2].secondwardPosition,
      bbot1: ward[3].firstwardPosition,
      bbot2: ward[3].secondwardPosition,
      bsup1: ward[4].firstwardPosition,
      bsup2: ward[4].secondwardPosition,
      rtop1: ward[5].firstwardPosition,
      rtop2: ward[5].secondwardPosition,
      rjng1: ward[6].firstwardPosition,
      rjng2: ward[6].secondwardPosition,
      rmid1: ward[7].firstwardPosition,
      rmid2: ward[7].secondwardPosition,
      rbot1: ward[8].firstwardPosition,
      rbot2: ward[8].secondwardPosition,
      rsup1: ward[9].firstwardPosition,
      rsup2: ward[9].secondwardPosition,
      table_value: pi[0],
    };
    // const response = await axios.get(
    //   // `${API4}/setWardPostition.do`,
    //   `/setWardPostition.do`, {
    //   params: data
    // },
    //   {
    //     headers: {
    //       "Content-Type": " application/x-www-form-urlencoded",
    //     },
    //   }
    // );
    // console.log(response);

    const options = {
      headers: {
        'Access-Control-Allow-Headers': 'Original,Content-Type,Authorization,X-Auth-Token',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,DELETE,HEAD,OPTIONS',
      }
    }

    const response = await axios.get(`${API4}/setWardPostition.do`, {
      params: {
        data,
      }, options,
      paramsSerializer: (params) => {
        return qs.stringify(params, { arrayFormat: "repeat" })
      }
    });

    console.log(response);
  };

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
        {ward && <SubmitBtn onClick={handleSubmit}>저장하기</SubmitBtn>}
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

const SubmitBtn = styled.button`
  background-color: #fff;
  width: 100%;
  border-radius: 5px;
  padding: 10px;
  font-weight: bold;
  &:hover {
    color: #fff;
    background-color: #5942ba;
  }
`;
