import React from "react";
import styled from "styled-components";

function PlayerSoloRank() {
  // const mockData = ["Hide On bush", "SKT T1 Faker", "고전파", "이상혁", "욜로"];
  return (
    <SoloRankWrapper>
      {/* {mockData.map((mock, idx) => {
        return (
          <SoloRankBox key={idx}>
            <img src="Images/ico-player-dash-duo.png" alt="PlayerIcon" />
            <div className="NickName">{mock}</div>
            <div className="RecentUpdates">마지막 플레이 일자: 21.02.18</div>
            <button className="SeeRecords">전적보기</button>
          </SoloRankBox>
        );
      })} */}
    </SoloRankWrapper>
  );
}

export default PlayerSoloRank;

const SoloRankWrapper = styled.div`
  margin-top: 22.5px;
  height: calc(100vh - 152px);
`;

// const SoloRankBox = styled.div`
//   display: flex;
//   align-items: center;
//   width: 100%;
//   height: 67px;
//   border: solid 1px rgb(58, 55, 69);
//   background-color: rgb(47, 45, 56);
//   font-family: NotoSansKR, Apple SD Gothic Neo;;
//   font-size: 13px;
//   font-weight: bold;
//   text-align: left;
//   color: rgb(129, 126, 139);
//   margin-bottom: 10px;
//   img {
//     width: 30.4px;
//     height: 35px;
//     margin: 0 18.6px 0 23px;
//   }
//   .NickName {
//     width: 680px;
//   }
//   .SeeRecords {
//     width: 122px;
//     height: 36px;
//     border-radius: 3px;
//     background-color: rgb(240, 69, 69);
//     font-family: NotoSansKR, Apple SD Gothic Neo;;
//     font-size: 13px;
//     font-weight: 500;
//     color: rgb(255, 255, 255);
//     margin-left: 22px;
//   }
// `;
