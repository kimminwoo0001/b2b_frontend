import React from "react";
import styled, { css } from "styled-components";

const TeamStatus = () => {
  return (
    <ChamStatusContainer>
      <ChampNavConatiner>
        <div className="blue"></div>
        <div className="red"></div>
      </ChampNavConatiner>
      <ChampLineContainer>
        <ChampTeamContainer isActive={true} isDeath={false}>
          <div className="name">
            <span>DK Khan</span>
          </div>
          <div className="champ-pic-box">
            <div className="champ-pic">
              <div className="champ-revive-count">21</div>
            </div>
            <Superiority winner={"blue"}>
              <img
                className="super-img"
                src="Images/ico-point-high-blue.svg"
                alt="superImg"
              />
            </Superiority>
          </div>
          <div className="champ-evnet-box">
            <div className="desc">
              <div className="time">05:32</div>
              <div className="status">인베이드</div>
            </div>
            <div className="event-img"></div>
          </div>
          <div className="champ-status-bar">
            <div className="hp">
              <div
                className="usable"
                style={{ backgroundColor: "#37b537" }}
              ></div>
            </div>
            <div className="mp">
              <div
                className="usable"
                style={{ backgroundColor: "#2b80e0" }}
              ></div>
            </div>
          </div>
        </ChampTeamContainer>
        <ChampOppTeamContainer isActive={false} isDeath={true}>
          <div className="name">
            <span>T1 Odoamne </span>
          </div>
          <div className="champ-pic-box">
            <Superiority winner={"red"}>
              <img
                className="super-img"
                src="Images/ico-point-high-red.svg"
                alt="superImg"
              />
            </Superiority>
            <div className="champ-pic">
              <div className="champ-revive-count">8</div>
            </div>
          </div>
          <div className="champ-evnet-box">
            <div className="event-img"></div>
            <div className="desc">
              <div className="time">05:32</div>
              <div className="status">딜 교환</div>
            </div>
          </div>
          <div className="champ-status-bar">
            <div className="hp">
              <div
                className="usable"
                style={{ backgroundColor: "#37b537" }}
              ></div>
            </div>
            <div className="mp">
              <div
                className="usable"
                style={{ backgroundColor: "#2b80e0" }}
              ></div>
            </div>
          </div>
        </ChampOppTeamContainer>
        <div className="position"></div>
        <div className="gold"></div>
      </ChampLineContainer>
      <ChampLineContainer>
        <ChampTeamContainer isActive={false}></ChampTeamContainer>
        <ChampOppTeamContainer isActive={true}></ChampOppTeamContainer>
      </ChampLineContainer>
      <ChampLineContainer>
        <ChampTeamContainer></ChampTeamContainer>
        <ChampOppTeamContainer></ChampOppTeamContainer>
      </ChampLineContainer>
      <ChampLineContainer>
        <ChampTeamContainer></ChampTeamContainer>
        <ChampOppTeamContainer></ChampOppTeamContainer>
      </ChampLineContainer>
      <ChampLineContainer>
        <ChampTeamContainer></ChampTeamContainer>
        <ChampOppTeamContainer></ChampOppTeamContainer>
      </ChampLineContainer>
    </ChamStatusContainer>
  );
};

export default TeamStatus;

const ChamStatusContainer = styled.div`
  width: 240px;
  height: 1080px;
  padding: 13px 14px 0 0;
  box-shadow: 5px 5px 30px 0 rgba(0, 0, 0, 0.15);
`;

const ChampNavConatiner = styled.div`
  display: flex;
  width: 240px;
  height: 85px;
  margin: 0 0 10px;
  padding: 55px 52px 0 38px;
  box-shadow: 5px 5px 30px 0 rgba(0, 0, 0, 0.15);
  background-color: #ff0;

  img {
    width: 30px;
    height: 30px;
    margin: 0 3px 0 0;
    object-fit: contain;
  }

  .blue {
    width: 58px;
    height: 30px;
    margin: 0 35px 0 0;
    background-color: #00f;
  }

  .red {
    width: 57px;
    height: 30px;
    margin: 0 0 0 35px;
    background-color: #f00;
  }
`;

const ChampLineContainer = styled.div`
  display: flex;
  width: 226px;
  height: 187px;
  margin: 10px 14px 10px 0;
  position: relative;

  .position {
    position: absolute;
    top: 10%;
    left: 46%;
    width: 17px;
    height: 17px;
    object-fit: contain;
    background-color: #fff;
  }

  .gold {
    position: absolute;
    top: 35%;
    left: 39%;
    width: 48px;
    height: 20px;
    padding: 3px 6px 2px;
    border-radius: 10px;
    background-color: #0075bf;
  }
`;

const ChampTeamContainer = styled.div`
  width: 113px;
  height: 187px;
  padding: 15px 10px 20px 11px;
  border-radius: 10px;
  box-sizing: border-box;
  border: solid 2px ${(props) => (props.isActive ? `#0075bf` : `rgba(0,0,0,0)`)};
  background-color: #033;
  .name {
    ${(props) => props.isDeath && `opacity: 0.3;`}
    font-family: SpoqaHanSansNeo;
    font-size: 13px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.69;
    letter-spacing: normal;
    text-align: left;
    color: #fff;
  }

  .champ-pic-box {
    display: flex;
    margin: 8px 0 0 0;

    .champ-pic {
      width: 60px;
      height: 60px;
      margin: 0 2px;
      padding: 40px 40px 0 0;
      object-fit: contain;
      background-color: #fff;
      border-radius: 30px;
      border: solid 2px
        ${(props) => (props.isActive ? `#1580b6` : `rgba(0,0,0,0)`)};
      position: relative;

      img {
        ${(props) => props.isDeath && `opacity: 0.5;`}
      }

      .champ-revive-count {
        width: 25px;
        height: 25px;
        position: absolute;
        top: 28%;
        left: 28%;

        font-family: SpoqaHanSansNeo;
        font-size: 20px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.1;
        letter-spacing: normal;
        text-align: center;
        color: #f04545;
      }
    }
  }

  .champ-evnet-box {
    ${(props) => props.isDeath && `opacity: 0.3;`}
    margin: 10px 0 6px 2px;
    width: 100%;
    height: 28px;
    display: flex;
    .desc {
      width: 58px;
      height: 28px;
      .time {
        font-family: SpoqaHanSansNeo;
        font-size: 10px;
        font-weight: 300;
        font-stretch: normal;
        font-style: normal;
        line-height: 1;
        letter-spacing: normal;
        text-align: left;
        color: #fff;
      }
      .status {
        font-family: SpoqaHanSansNeo;
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.5;
        letter-spacing: normal;
        text-align: left;
        color: #fff;
      }
    }
    .event-img {
      margin-left: 2px;
      width: 28px;
      height: 28px;
      object-fit: contain;
      background-color: #fff;
    }
  }

  .champ-status-bar {
    ${(props) => props.isDeath && `opacity: 0.3;`}
    width: 90px;
    height: 23px;
    margin: 6px 0 0 2px;

    .hp {
      width: 90px;
      height: 10px;
      margin: 0 0 3px;
      padding: 0 30px 0 0;
      border-radius: 10px;
      background-color: #000;
    }
    .mp {
      width: 90px;
      height: 10px;
      margin: 3px 0 0;
      padding: 0 50px 0 0;
      border-radius: 10px;
      background-color: #000;
    }
    .usable {
      height: 10px;
      padding: 0 10px 0 5px;
      border-radius: 10px;
    }
  }
`;

const ChampOppTeamContainer = styled.div`
  width: 113px;
  height: 187px;
  padding: 15px 11px 20px 10px;
  border-radius: 10px;
  box-sizing: border-box;
  border: solid 2px ${(props) =>
    props.isActive ? `#f04545` : `rgba(0,0,0,0)`};
  background-color: #23212a;

  .name {
    ${(props) => props.isDeath && `opacity: 0.3;`}
    width: 100%;
    font-family: SpoqaHanSansNeo;
    font-size: 13px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.69;
    letter-spacing: normal;
    text-align: right;
    color: #fff;
  }

  .champ-pic-box {
    display: flex;
    margin: 8px 0 0 0;
    }

    .champ-pic {
      width: 60px;
      height: 60px;
      margin: 0px 2px 0px;
      padding: 40px 40px 0 0;
      object-fit: contain;
      border-radius: 30px;
      background-color: #fff;
      position: relative;

      img {
        ${(props) => props.isDeath && `opacity: 0.5;`}
      }

      .champ-revive-count {
        ${(props) => (props.isDeath ? `opacity: 1` : `opacity: 0`)};
        width: 25px;
        height: 25px;
        position: absolute;
        top: 28%;
        left: 28%;

        font-family: SpoqaHanSansNeo;
        font-size: 20px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.1;
        letter-spacing: normal;
        text-align: center;
        color: #f04545;
      }
    }
  }

  .champ-evnet-box {
    ${(props) => props.isDeath && `opacity: 0.3;`}
    margin: 10px 0 6px 2px;
    width: 100%;
    height: 28px;
    display: flex;
    .desc {
      width: 58px;
      height: 28px;
      .time {
        font-family: SpoqaHanSansNeo;
        font-size: 10px;
        font-weight: 300;
        font-stretch: normal;
        font-style: normal;
        line-height: 1;
        letter-spacing: normal;
        text-align: right;
        color: #fff;
      }
      .status {
        font-family: SpoqaHanSansNeo;
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.5;
        letter-spacing: normal;
        text-align: right;
        color: #fff;
      }
    }
    .event-img {
      margin-right: 2px;
      width: 28px;
      height: 28px;
      object-fit: contain;
      background-color: #fff;
    }
  }

  .champ-status-bar {
    ${(props) => props.isDeath && `opacity: 0.3;`}
    width: 90px;
    height: 23px;
    margin: 6px 0 0 2px;

    .hp {
      width: 90px;
      height: 10px;
      margin: 0 0 3px;
      padding: 0 0 0 30px;
      border-radius: 10px;
      background-color: #000;
    }
    .mp {
      width: 90px;
      height: 10px;
      margin: 3px 0 0;
      padding: 0 0 0 50px;
      border-radius: 10px;
      background-color: #000;
    }
    .usable {
      height: 10px;
      padding: 0 10px 0 5px;
      border-radius: 10px;
    }
  }
`;

const Superiority = styled.div`
  width: 30px;
  height: 60px;
  position: relative;

  .super-img {
    position: absolute;
    top: 30%;
    ${(props) => props.winner === "blue" && `left: 10%;`}
    ${(props) => props.winner === "red" && `right: 10%;`}
    width: 11px;
    height: 11px;
    margin: 5px 0 4px;
    object-fit: contain;
`;
