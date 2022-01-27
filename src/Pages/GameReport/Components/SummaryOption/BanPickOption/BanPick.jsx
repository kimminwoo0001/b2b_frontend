import React from "react";
import styled, { css } from "styled-components";
import { useSelector } from "react-redux";

function getFpickLabel(fpick) {
  return;
}

const BanPick = () => {
  const gamevalue = useSelector((state) => state.GameReportReducer);
  const banObject = gamevalue.fixedDataset[0].BanPick.bans.concat(
    gamevalue.fixedDataset[1].BanPick.bans
  );

  const bluePick = gamevalue.fixedDataset[0].BanPick.picks;
  const redPick = gamevalue.fixedDataset[1].BanPick.picks;
  const pickObject = [];
  pickObject.push(
    bluePick[0],
    redPick[0],
    redPick[1],
    bluePick[1],
    bluePick[2],
    redPick[2],
    redPick[3],
    bluePick[3],
    bluePick[4],
    redPick[4]
  );

  [...Array(5)].forEach((e, i) => {
    for (let j = 0; pickObject.length; j++) {
      if (pickObject[j].position === i + 1) {
        pickObject[j] = { ...pickObject[j], fpick: i };
        break;
      }
    }
  });

  console.log(pickObject);

  const phase1Champion = pickObject.slice(0, 6);
  const phase2Champion = pickObject.slice(6, 10);
  const phase1Ban = banObject.slice(0, 3).concat(banObject.slice(5, 8));
  console.log(phase1Ban);
  const phase2Ban = banObject.slice(3, 5).concat(banObject.slice(8, 10));

  return (
    <BanPickContainer>
      <PhaseBox1>
        <div className="nav">Phase 1</div>
        <BanBox>
          {phase1Ban.map((data) => {
            return (
              data.team === 100 && (
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
                src={`Images/TeamLogo/${gamevalue.blueteam}.png`}
                alt=""
              />
              <span>{gamevalue.blueteam}</span>
            </div>
            {phase1Champion.map((data) => {
              return (
                <PickChampion>
                  {data.team === 100 && (
                    <>
                      <img
                        src={`Images/champion/${data.champion}.png`}
                        alt=""
                      />
                      {data.fpick && <div className="first-pick">HI</div>}
                    </>
                  )}
                </PickChampion>
              );
            })}
          </div>
          <div className="red-team">
            <div className="title">
              <img
                className="logo"
                src={`Images/TeamLogo/${gamevalue.redteam}.png`}
                alt=""
              />
              <span>{gamevalue.redteam}</span>
            </div>
            {phase1Champion.map((data) => {
              return (
                <PickChampion>
                  {data.team === 200 && (
                    <>
                      <img
                        src={`Images/champion/${data.champion}.png`}
                        alt=""
                      />
                      {data.fpick && <div className="first-pick">HI</div>}
                    </>
                  )}
                </PickChampion>
              );
            })}
          </div>
        </SelectedPick>
        <BanBox>
          {phase1Ban.map((data) => {
            return (
              data.team === 200 && (
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
        <div className="nav">Phase 2</div>
        <BanBox>
          {phase2Ban.map((data) => {
            return (
              data.team === 100 && (
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
                  {data.team === 100 && (
                    <>
                      <img
                        src={`Images/champion/${data.champion}.png`}
                        alt=""
                      />
                      {data.fpick && <div className="first-pick">HI</div>}
                    </>
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
                  {data.team === 200 && (
                    <>
                      <img
                        src={`Images/champion/${data.champion}.png`}
                        alt=""
                      />
                      {data.fpick && <div className="first-pick">HI</div>}
                    </>
                  )}
                </PickChampion>
              );
            })}
          </div>
        </SelectedPick>
        <BanBox>
          {phase2Ban.map((data) => {
            return (
              data.team === 200 && (
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
  position: relative;
  img {
    border-radius: 50px;
  }
  .first-pick {
    position: absolute;
    width: 49px;
    height: 17px;
    margin: 0px 0 0;
    left: 2px;
    top: 36px;
    padding: 2px 5px;
    border-radius: 10px;
    background-color: #f04545;
    width: 39px;
    height: 13px;
    font-family: SpoqaHanSansNeo;
    font-size: 10px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1;
    letter-spacing: normal;
    text-align: center;
    color: #fff;
  }
`;
