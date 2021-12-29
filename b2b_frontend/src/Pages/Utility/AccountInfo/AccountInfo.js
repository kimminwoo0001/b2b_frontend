import React from "react";
import styled from "styled-components";

function AccountInfo() {
  const mockData = ["Head Coach", "Coach", "BotLaner", "Support"];
  return (
    <AccountInfoWrapper>
      <ClubInfoContainer>
        <div className="ClubTitle">구단 정보</div>
        <ClubContents>
          <ClubNameBox>
            <div className="ClubName">구단 명</div>
            <img
              src="Images/ico-team-ns.png"
              width="54px"
              height="54px"
              alt="TeamIcon"
            />
            <div className="NameBox">
              <span className="Korean">농심레드포스</span>
              <span className="English">Nongshim Redforce</span>
            </div>
          </ClubNameBox>
          <CoachBox>
            <div className="CoachName">감독/코치</div>
            {mockData.map((data, idx) => {
              return (
                <MapCoachInfo key={idx}>
                  <div className="ImageBox"></div>
                  <div className="CoachRank">{data}</div>
                  <div className="CoachName">sBs(배지훈)</div>
                </MapCoachInfo>
              );
            })}
          </CoachBox>
          <PlayerBox>
            <div className="PlayerName">소속 선수</div>
            {mockData.map((data, idx) => {
              return (
                <MapPlayerInfo key={idx}>
                  <div className="ImageBox"></div>
                  <div className="PlayerRank">{data}</div>
                  <div className="PlayerName">sBs(배지훈)</div>
                </MapPlayerInfo>
              );
            })}
          </PlayerBox>
        </ClubContents>
      </ClubInfoContainer>
      <AccountContents>
        <div className="AccountTitle">계정 정보</div>
        <AccountBox>
          <div className="ContentBox">
            <p className="Title">계정 아이디</p>
            <p className="ID">nsforce</p>
          </div>
          <div className="ContentBox">
            <p className="Title">비밀번호</p>
            <input type="password" className="password" />
          </div>
          <div className="ContentBox">
            <p className="Title">비밀번호 확인</p>
            <input type="password" className="password" />
          </div>
          <div className="ContentBox">
            <p className="Title">메일주소</p>
            <input type="text" className="Email" />
          </div>
        </AccountBox>
      </AccountContents>
      <button>정보 수정하기</button>
    </AccountInfoWrapper>
  );
}

export default AccountInfo;

const AccountInfoWrapper = styled.div`
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  button {
    width: 142px;
    height: 34px;
    border-radius: 4px;
    background-color: rgb(240, 69, 69);
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: -0.65px;
    text-align: center;
    color: rgb(255, 255, 255);
  }
`;

const ClubInfoContainer = styled.div`
  .ClubTitle {
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 13px;
    font-weight: bold;
    letter-spacing: -0.65px;
    text-align: left;
    color: rgb(255, 255, 255);
    margin: 21.5px 0 10px 10px;
  }
`;

const AccountContents = styled.div`
  .AccountTitle {
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 13px;
    font-weight: bold;
    letter-spacing: -0.65px;
    text-align: left;
    color: rgb(255, 255, 255);
    margin: 37px 0 10px 10px;
  }
`;

const ClubContents = styled.div`
  width: 1098px;
  height: 427px;
  border: solid 1px rgb(58, 55, 69);
  background-color: rgb(47, 45, 56);
  padding: 20px 0 0 20px;
`;

const AccountBox = styled.div`
  width: 1098px;
  height: 187px;
  border: solid 1px rgb(58, 55, 69);
  background-color: rgb(47, 45, 56);
  margin-bottom: 15px;
  font-family: NotoSansKR, Apple SD Gothic Neo;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: -0.65px;
  color: rgb(132, 129, 142);
  padding: 10px 0 0 20px;
  .Title {
    width: 101px;
  }
  input {
    width: 250px;
    height: 34px;
    border: solid 1px rgb(67, 63, 78);
    background-color: rgb(47, 45, 56);
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 13px;
    text-align: left;
    color: rgb(132, 129, 142);
  }
  .ContentBox {
    display: flex;
    margin-bottom: 6px;
    height: 34px;
    align-items: center;
  }
`;

const ClubNameBox = styled.div`
  display: flex;

  .ClubName {
    width: 101px;
    height: 19px;
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 13px;
    letter-spacing: -0.65px;
    text-align: left;
    color: rgb(132, 129, 142);
  }
  .NameBox {
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 13px;
    letter-spacing: -0.65px;
    text-align: left;
    color: rgb(132, 129, 142);
    margin-left: 15px;
  }
  .Korean {
    margin-bottom: 6px;
  }
`;

const CoachBox = styled.div`
  display: flex;
  margin-top: 20px;
  .CoachName {
    width: 101px;
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 13px;
    letter-spacing: -0.65px;
    text-align: left;
    color: rgb(132, 129, 142);
  }
`;

const PlayerBox = styled.div`
  display: flex;
  margin-top: 20px;
  .PlayerName {
    width: 101px;
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 13px;
    letter-spacing: -0.65px;
    text-align: left;
    color: rgb(132, 129, 142);
  }
`;

const MapCoachInfo = styled.div`
  margin-right: 7.7px;
  .ImageBox {
    width: 125.3px;
    height: 94px;
    border: solid 1px rgb(58, 55, 69);
  }
  .CoachRank {
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 13px;
    letter-spacing: -0.65px;
    text-align: left;
    color: rgb(132, 129, 142);
    margin: 10px 0 6px 0;
  }
  .CoachName {
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 13px;
    letter-spacing: -0.65px;
    text-align: left;
    color: rgb(255, 255, 255);
  }
`;

const MapPlayerInfo = styled.div`
  margin-right: 7.7px;
  .ImageBox {
    width: 125.3px;
    height: 94px;
    border: solid 1px rgb(58, 55, 69);
  }
  .PlayerRank {
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 13px;
    letter-spacing: -0.65px;
    text-align: left;
    color: rgb(132, 129, 142);
    margin: 10px 0 6px 0;
  }
  .PlayerName {
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 13px;
    letter-spacing: -0.65px;
    text-align: left;
    color: rgb(255, 255, 255);
  }
`;
