import React from "react";
import styled, { css } from "styled-components";

const BanPick = () => {
  const pickObject = [
    { team: 1, champion: "LeeSin", first: "2" },
    { team: 2, champion: "Ryze", first: "3" },
    { team: 2, champion: "Jayce", first: "1" },
    { team: 1, champion: "Lucian", first: "" },
    { team: 1, champion: "Leblanc", first: "" },
    { team: 2, champion: "Poppy", first: "" },
    { team: 2, champion: "Leona", first: "5" },
    { team: 1, champion: "Jhin", first: "4" },
    { team: 1, champion: "Maokai", first: "" },
    { team: 2, champion: "MissFortune", first: "" },
  ];

  const banObject = [
    { team: 1, champion: "Aphelios" },
    { team: 2, champion: "Yuumi" },
    { team: 2, champion: "Syndra" },
    { team: 1, champion: "Nami" },
    { team: 1, champion: "Graves" },
    { team: 2, champion: "TwistedFate" },
    { team: 2, champion: "Ziggs" },
    { team: 1, champion: "Thresh" },
    { team: 1, champion: "Jinx" },
    { team: 2, champion: "Rakan" },
  ];

  const phase1Champion = pickObject.slice(0, 6);
  const phase2Champion = pickObject.slice(6, 10);
  const phase1Ban = banObject.slice(0, 6);
  const phase2Ban = banObject.slice(6, 10);

  return (
    <BanPickContainer>
      <PhaseBox1>
        <div className="nav">Phase</div>
        <BanBox>
          {phase1Ban.map((data) => {
            return (
              data.team === 1 && (
                <img
                  className="ban-champ"
                  src={`Images/champion/${data.champion}.png`}
                  alt="ban"
                />
              )
            );
          })}
        </BanBox>
        <SelectedPick>
          <div className="blue-team">
            <div className="title">
              <img
                className="logo"
                src={`Images/TeamLogo/${"C9"}.png`}
                alt=""
              />
              <span>Cloud9</span>
            </div>
            {phase1Champion.map((data) => {
              return (
                <PickChampion>
                  {data.team === 1 && (
                    <img src={`Images/champion/${data.champion}.png`} alt="" />
                  )}
                </PickChampion>
              );
            })}
          </div>
          <div className="red-team">
            <div className="title">
              <img
                className="logo"
                src={`Images/TeamLogo/${"DK"}.png`}
                alt=""
              />
              <span>DWA KIA</span>
            </div>
            {phase1Champion.map((data) => {
              return (
                <PickChampion>
                  {data.team === 2 && (
                    <img src={`Images/champion/${data.champion}.png`} alt="" />
                  )}
                </PickChampion>
              );
            })}
          </div>
        </SelectedPick>
        <BanBox>
          {phase1Ban.map((data) => {
            return (
              data.team === 2 && (
                <img
                  className="ban-champ"
                  src={`Images/champion/${data.champion}.png`}
                  alt="ban"
                />
              )
            );
          })}
        </BanBox>
      </PhaseBox1>
      <PhaseBox2>
        <div className="nav">Phase</div>
        <BanBox>
          {phase2Ban.map((data) => {
            return (
              data.team === 1 && (
                <img
                  className="ban-champ"
                  src={`Images/champion/${data.champion}.png`}
                  alt="ban"
                />
              )
            );
          })}
        </BanBox>
        <SelectedPick>
          <div className="blue-team">
            <PickChampion></PickChampion>
            {phase2Champion.map((data) => {
              return (
                <PickChampion>
                  {data.team === 1 && (
                    <img src={`Images/champion/${data.champion}.png`} alt="" />
                  )}
                </PickChampion>
              );
            })}
          </div>
          <div className="red-team">
            <PickChampion></PickChampion>
            {phase2Champion.map((data) => {
              return (
                <PickChampion>
                  {data.team === 2 && (
                    <img src={`Images/champion/${data.champion}.png`} alt="" />
                  )}
                </PickChampion>
              );
            })}
          </div>
        </SelectedPick>
        <BanBox>
          {phase2Ban.map((data) => {
            return (
              data.team === 2 && (
                <img
                  className="ban-champ"
                  src={`Images/champion/${data.champion}.png`}
                  alt="ban"
                />
              )
            );
          })}
        </BanBox>
      </PhaseBox2>
    </BanPickContainer>
  );
};

export default BanPick;

const BanPickContainer = styled.div`
  width: 676px;
  height: 213px;
  margin: 12px 18px 0 0;
  background-color: #333;
  display: flex;

  .nav {
    font-family: SpoqaHanSansNeo;
    font-size: 10px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 3.6;
    letter-spacing: normal;
    text-align: left;
    color: #fff;
  }
`;

const PhaseBox1 = styled.div`
  width: 430px;
  height: 15px;
`;

const PhaseBox2 = styled.div`
  width: 246px;
  height: 15px;
`;

const BanBox = styled.div`
  width: 100%;
  height: 40px;
  display: flex;

  .ban-champ {
    width: 40px;
    height: 40px;
    margin: 0 5px 0 0;
    object-fit: contain;
    mix-blend-mode: luminosity;
    border-radius: 50px;
    background-color: #fff;
  }
`;

const SelectedPick = styled.div`
  width: 100%;
  height: 90px;
  margin: 3px 0 3px 0px;

  .blue-team {
    width: 100%;
    height: 45px;
    display: flex;
    align-items: center;
  }

  .red-team {
    width: 100%;
    height: 45px;
    display: flex;
    align-items: center;
  }

  .title {
    width: 100px;
    height: 30px;
    line-height: 30px;
    display: flex;

    .logo {
      width: 30px;
      height: 30px;
      margin: 0 3px 0 0;
      object-fit: contain;
    }

    span {
      font-family: SpoqaHanSansNeo;
      font-size: 13px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: 2.3;
      letter-spacing: normal;
      text-align: left;
      color: #fff;
      white-space: nowrap;
    }
  }
`;

const PickChampion = styled.div`
  width: 45px;
  height: 45px;
  margin: 0px 2px 0;

  img {
    border-radius: 3px;
  }
`;
