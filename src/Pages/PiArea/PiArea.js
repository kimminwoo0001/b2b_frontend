import React, { useEffect, useState } from 'react'
import styled, { css } from 'styled-components';
import SetWardData from './SetWardData/SetWardData';
import SetPiData from './SetPiData/SetPiData';
import axios from 'axios';
import { API3 } from '../config';

function PiArea() {
    const [tab, setTab] = useState(0);
    const [gameIdInput, setGameIdInput] = useState('');
    const [gameIdSearchData, setGameIdSearchData] = useState([]);
    const [clickedGameId, setClickedGameId] = useState("");
    const [entireData, setEntireData] = useState([]);

    const tabContents = {
        0: <SetWardData />,
        1: <SetPiData />
    }

    // onchange
    const handleInput = (e) => {
        setGameIdInput(e.target.value)
    }

    //onkeyup 
    const handleSearch = async () => {
        // const response = await axios.request({
        //     method: "GET",
        //     url: `${API3}/gameidsearchAjax.do`,
        //     url: "http://localhost:3001/data/mockdata.json",
        //         params: {
        //             q: gameIdInput,
        //         },
        // })

        // CORS 에러 -> 민규님 확인 요청
        // setGameIdSearchData(response.data.items)

        if (gameIdInput.length < 3) {
            return;
        }

        const response = await axios.request({
            method: 'GET',
            url: `http://localhost:3001/data/mockdata.json`,
        })
        setGameIdSearchData(response.data.items);
        setGameIdInput('');
    }

    // dropdown 내 game id 클릭 시 해당 id에 대한 data fetching
    // ** click하면서 dropdown 닫기 구현할 것 
    const handleGameIdClick = async (id) => {
        setClickedGameId(id);

    }

    // gameid 저장 후 data fetching
    // 여기서 받아온 data로 ward 및 pi 둘다에 뿌려줌
    useEffect(async () => {
        const response = await axios.request({
            method: "GET",
            url: `${API3}/searchByGameAjax.do`,
            params: {
                gameid: clickedGameId,
            }
        })

        // setEntireData(response)
    }, [clickedGameId])

    return (
        <PiAreaWrapper>
            <InnerWrapper>
                <Title>TeamSnowBall PI Area</Title>
                <GameIdInput type="text" value={gameIdInput} placeholder="GAME ID 검색 : 3글자 이상 입력해주세요." onKeyUp={handleSearch} onChange={(e) => handleInput(e)} />
                <GameIdSearchList isOpen={gameIdSearchData.length > 1}>{
                    gameIdSearchData?.map((el) => {
                        return (
                            <SearchList key={el.gameid} onClick={() => handleGameIdClick(el.gameid)}>
                                <div>{el.gameid}</div>
                                <span>{el.date.substring(0, 11)}</span>
                                <span>{el.team}</span>
                            </SearchList>
                        )
                    })
                }</GameIdSearchList>
                <TabWrapper>
                    <WardTab onClick={() => setTab(0)} changeColor={tab === 0}>WARD</WardTab>
                    <PiTab onClick={() => setTab(1)} changeColor={tab === 1}>PI</PiTab>
                </TabWrapper>
                <YoutubeURL type="text" placeholder="Youtube URL을 입력하세요. 공유 -> 시작 시간 : 꼭 체크해주세요!" />
                <TabContents>{tabContents[tab]}</TabContents>
            </InnerWrapper>
        </PiAreaWrapper>
    )
}

export default PiArea;

const PiAreaWrapper = styled.section`
    background-color: #23212A;
    padding: 40px;
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
display: ${(props) => props.isOpen ? "block" : "none"};
border-radius: 10px;
border-top: 1px solid black;
`;

const SearchList = styled.li`

border-radius: 10px;
padding: 5px 10px;
cursor: pointer;
color: #b4b4b4;
&:hover {
    color: black;
    background-color: #b4b4b4;
}
`;


const TabWrapper = styled.div`
    margin:5px 0;
`;

const WardTab = styled.button`
    background-color: #fff;
    border-radius: 5px;
    padding: 10px;
    margin:2px;
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
    background-color: #5942ba;
    padding: 10px;
    border-radius: 5px;
`;
