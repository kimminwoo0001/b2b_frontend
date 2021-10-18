import React, { useState } from 'react'
import styled, { css } from 'styled-components';
import SetWardData from './SetWardData/SetWardData';
import SetPiData from './SetPiData/SetPiData';

function PiArea() {
    const [tab, setTab] = useState(0);
    const [gameIdInput, setGameIdInput] = useState('');
    const tabContents = {
        0: <SetWardData />,
        1: <SetPiData />
    }

    const handleSearch = (e) => {
        setGameIdInput(e.target.value)
        console.log(gameIdInput);
    }

    return (
        <PiAreaWrapper>
            <InnerWrapper>
                <Title>TeamSnowBall PI Area</Title>
                <GameIdInput type="text" value={gameIdInput} placeholder="GAME ID 검색" onChange={(e) => handleSearch(e)} />
                <TabWrapper>
                    <WardTab onClick={() => setTab(0)} changeColor={tab === 0}>WARD</WardTab>
                    <PiTab onClick={() => setTab(1)} changeColor={tab === 1}>PI</PiTab>
                </TabWrapper>
                <YoutubeURL type="text" placeholder="Youtube URL을 입력하세요. 공유 -> 시작 시간 : 꼭 체크해주세요!" />
                <TabContents>{tabContents[tab]}</TabContents>
            </InnerWrapper>
        </PiAreaWrapper >
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
