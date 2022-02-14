import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Team, OppTeam } from "../../redux/modules/filtervalue";
import styled, { css } from "styled-components";
import { useDetectOutsideClick } from "../../Components/SelectFilter/useDetectOustsideClick";
import PickCombineModal from "./PickCombineModal";
import { API } from "../config";
import axiosRequest from "../../lib/axios/axiosRequest";
import { SetModalInfo } from "../../redux/modules/modalvalue";

const PositionImage = [
  {
    Image: "Images/img-player-top-none.png",
    Icon: "Images/ico-position-top2.png",
  },
  {
    Image: "Images/img-player-jug-none.png",
    Icon: "Images/ico-position-jug2.png",
  },
  {
    Image: "Images/img-player-mid-none.png",
    Icon: "Images/ico-position-mid2.png",
  },
  {
    Image: "Images/img-player-bot-none.png",
    Icon: "Images/ico-position-bot2.png",
  },
  {
    Image: "Images/img-player-sup-none.png",
    Icon: "Images/ico-position-sup2.png",
  },
];

function PickCombine() {
  const filters = useSelector((state) => state.FilterReducer);
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  const [openModal, setOpenModal] = useState(false);
  const [teamFilter, setTeamFilter] = useState();
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const [blue, setBlue] = useState(false);
  const [red, setRed] = useState(false);
  const [oppBlue, setOppBlue] = useState(false);
  const [oppRed, setOppRed] = useState(false);

  const [isOppActive, setIsOppActive] = useDetectOutsideClick(
    dropdownRef,
    false
  );

  useEffect(() => {
    fetchingTeamFilter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.patch]);

  //팀 필터 fetch 함수
  const fetchingTeamFilter = () => {
    const url = `${API}/lolapi/filter/team`;
    const params = {
      league: filters.league,
      year: filters.year,
      season: filters.season,
    };
    axiosRequest(undefined, url, params, function (e) {
      setTeamFilter(e.team);
    }, function (objStore) {
      dispatch(SetModalInfo(objStore)) // 오류 발생 시, Alert 창을 띄우기 위해 사용
    })
  };

  const handleButton = () => {
    if (blue === true) {
      setBlue(false);
      setRed(true);
    } else if (red === true) {
      setBlue(true);
      setRed(false);
    }
  };
  const handleOppButton = () => {
    if (oppBlue === true) {
      setOppBlue(false);
      setOppRed(true);
    } else if (oppRed === true) {
      setOppBlue(true);
      setOppRed(false);
    }
  };
  return (
    <>
      <PickCombineModal openModal={openModal} setOpenModal={setOpenModal} />
      <PickCombineWrapper>
        <ContentBoxContainer>
          <ContentBox>
            <FilterArea>
              <DropDownContainer className="container">
                <div className="menu-container">
                  <button
                    onClick={() => setIsActive(!isActive)}
                    className="menu-trigger"
                  >
                    <div className="question">?</div>
                    <span>{filters.team}</span>
                    <img src="Images/select-arrow.png" alt="arrowIcon" />
                  </button>
                  <nav
                    ref={dropdownRef}
                    className={`menu ${isActive ? "active" : "inactive"}`}
                  >
                    <ul>
                      {teamFilter?.map((team, idx) => {
                        return (
                          <li
                            key={idx}
                            onClick={() => {
                              dispatch(Team(team));
                              setIsActive(!isActive);
                            }}
                          >
                            {team}
                          </li>
                        );
                      })}
                    </ul>
                  </nav>
                </div>
              </DropDownContainer>
              <BlueButton
                value="blue"
                changeColor={blue === true}
                onClick={() => {
                  setBlue(!blue);
                  handleButton();
                }}
              >
                <BlueSquare changeColor={blue === true} />
                <span>BLUE</span>
              </BlueButton>
              <RedButton
                value="red"
                changeColor={red === true}
                onClick={() => {
                  setRed(!red);
                  handleButton();
                }}
              >
                <RedSquare changeColor={red === true} />
                RED
              </RedButton>
              <ResetButton>
                <img
                  src="Images/ico-team-video-return-off.png"
                  alt="resetIcon"
                />
                <span>설정 초기화</span>
              </ResetButton>
            </FilterArea>
            <SelectionBox>
              {PositionImage.map((position, idx) => {
                return (
                  <Select key={idx} onClick={() => setOpenModal(true)}>
                    <img
                      src={position.Image}
                      width="60px"
                      height="60px"
                      alt="postion"
                    />
                    <div className="PlayerBox">
                      <div className="Title">Player</div>
                      <div className="LabelBox">
                        <img
                          src={position.Icon}
                          width="12px"
                          height="12px"
                          alt="pos"
                        />
                        <div className="Label">선수를 선택해주세요.</div>
                      </div>
                    </div>
                    <img src="Images/img-champ-none.png" alt="champ" />
                    <div className="ChampBox">
                      <div className="Title">Champion</div>
                      <div className="Label">챔피언을 선택해주세요.</div>
                    </div>
                  </Select>
                );
              })}
            </SelectionBox>
            <Prediction>
              <div className="PredictTitle">예상 승률</div>
              <div className="PredictValue">{`- %`}</div>
            </Prediction>
          </ContentBox>
          <div className="Vs">VS</div>
          <ContentBox>
            <FilterArea>
              <DropDownContainer className="container">
                <div className="menu-container">
                  <button
                    onClick={() => setIsOppActive(!isOppActive)}
                    className="menu-trigger"
                  >
                    <div className="question">?</div>
                    <span>{filters.oppteam}</span>
                    <img src="Images/select-arrow.png" alt="arrowIcon" />
                  </button>
                  <nav
                    ref={dropdownRef}
                    className={`menu ${isOppActive ? "active" : "inactive"}`}
                  >
                    <ul>
                      {teamFilter?.map((team, idx) => {
                        return (
                          <li
                            key={idx}
                            onClick={() => {
                              dispatch(OppTeam(team));
                              setIsOppActive(!isOppActive);
                            }}
                          >
                            {team}
                          </li>
                        );
                      })}
                    </ul>
                  </nav>
                </div>
              </DropDownContainer>
              <BlueButton
                value="blue"
                changeColor={oppBlue === true}
                onClick={() => {
                  setOppBlue(!oppBlue);
                  handleOppButton();
                }}
              >
                <BlueSquare changeColor={oppBlue === true} />
                <span>BLUE</span>
              </BlueButton>
              <RedButton
                value="red"
                changeColor={oppRed === true}
                onClick={() => {
                  setOppRed(!oppRed);
                  handleOppButton();
                }}
              >
                <RedSquare changeColor={oppRed === true} />
                RED
              </RedButton>
              <ResetButton>
                <img
                  src="Images/ico-team-video-return-off.png"
                  alt="resetIcon"
                />
                <span>설정 초기화</span>
              </ResetButton>
            </FilterArea>
            <SelectionBox>
              {PositionImage.map((position, idx) => {
                return (
                  <Select key={idx}>
                    <img
                      src={position.Image}
                      width="60px"
                      height="60px"
                      alt="postion"
                    />
                    <div className="PlayerBox">
                      <div className="Title">Player</div>
                      <div className="LabelBox">
                        <img
                          src={position.Icon}
                          width="12px"
                          height="12px"
                          alt="pos"
                        />
                        <div className="Label">선수를 선택해주세요.</div>
                      </div>
                    </div>
                    <img src="Images/img-champ-none.png" alt="champ" />
                    <div className="ChampBox">
                      <div className="Title">Champion</div>
                      <div className="Label">챔피언을 선택해주세요.</div>
                    </div>
                  </Select>
                );
              })}
            </SelectionBox>
            <Prediction>
              <div className="PredictTitle">예상 승률</div>
              <div className="PredictValue">{`- %`}</div>
            </Prediction>
          </ContentBox>
        </ContentBoxContainer>
        <ButtonBox>
          <button>계산하기</button>
        </ButtonBox>
        <Instruction>
          <span className="Title">픽-조합 계산기를 통해</span>
          <br /> <span className="Title">1.</span> 기존 팀 간의 예상 승률을
          알아볼 수 있고,
          <br /> <span className="Title">2.</span> 가상의 팀과 기존 팀의 비교도
          가능하며
          <br /> <span className="Title">3.</span> 가상의 팀과 가상의 팀간의
          비교 또한 가능합니다.
          <br /> 픽-조합 계산기를 통해 산출되는 예상 승률은 각 선수가 해당 패치
          버전 내에서 보였던 퍼포먼스를 기반으로 합니다.각 포지션을 클릭 해
          원하는 선수를 설정하면 예상 승률이 출력됩니다.
          <br />
          참조하실 점은 예상 승률이 팀의 조합적인 밸런스를 100% 반영하지는
          않는다는 점입니다.
          <br />
          예를 들어 탱커 챔피언 -딜러 챔피언의 수를 5-0 혹은 0-5로 맞추어 예상
          승률을 계산하면 실제 경기 결과와는 동떨어진 예측을 만들어낼 수
          있습니다.
        </Instruction>
      </PickCombineWrapper>
    </>
  );
}

export default PickCombine;

const PickCombineWrapper = styled.div`
  margin: 23.5px 0 0 22px;
  /* height: calc(100vh - 300px); */
`;

const ContentBoxContainer = styled.div`
  display: flex;
  align-items: center;
  .Vs {
    width: 24px;
    height: 25px;
    font-family: Poppins;
    font-size: 18px;
    font-weight: bold;
    line-height: 1.56;
    text-align: left;
    color: #6b6979;
    margin: 0 22px 0 22px;
  }
`;

const ContentBox = styled.div``;

const FilterArea = styled.div`
  display: flex;
`;

const BlueButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 57px;
  height: 40px;
  background-color: #3a3745;
  margin-left: 9px;
  font-family: Poppins;
  font-size: 12px;
  font-weight: 500;
  text-align: center;
  color: #6b6979;

  ${(props) =>
    props.changeColor &&
    css`
      border: solid 1px #0075bf;
      background-color: #2f2d38;
      color: #0f7fd1;
    `}
`;

const BlueSquare = styled.div`
  width: 8px;
  height: 8px;
  background-color: #6b6979;
  margin-right: 4px;
  ${(props) =>
    props.changeColor &&
    css`
      background-color: #0f7fd1;
    `}
`;

const RedButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 57px;
  height: 40px;
  background-color: #3a3745;
  margin-right: 9px;
  font-family: Poppins;
  font-size: 12px;
  font-weight: 500;
  text-align: center;
  color: #6b6979;
  ${(props) =>
    props.changeColor &&
    css`
      border: solid 1px #f04545;
      background-color: #2f2d38;
      color: #f04545;
    `}
`;

const RedSquare = styled.div`
  width: 8px;
  height: 8px;
  background-color: #6b6979;
  margin-right: 4px;
  ${(props) =>
    props.changeColor &&
    css`
      background-color: #f04545;
    `}
`;

const ResetButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 92px;
  height: 40px;
  border: solid 1px #3a3745;
  background-color: #2f2d38;
  font-family: NotoSansKR, Apple SD Gothic Neo;
  font-size: 11px;
  letter-spacing: -0.55px;
  text-align: left;
  color: #afadbe;
  img {
    width: 10px;
    height: 10px;
    margin-right: 10px;
  }
  span {
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 11px;
    letter-spacing: -0.55px;
    text-align: left;
    color: #afadbe;
  }
`;

const SelectionBox = styled.div`
  margin-top: 10px;
`;

const Select = styled.div`
  display: flex;
  align-items: center;
  width: 515px;
  height: 102px;
  border: solid 1px #3a3745;
  background-color: #2f2d38;
  background-image: url("Images/left-lose-gradient2.png");
  background-repeat: no-repeat;
  padding: 20px 0 20px 20px;
  cursor: pointer;
  .PlayerBox {
    margin-left: 13px;
  }
  .ChampBox {
    margin-left: 13px;
  }
  .Title {
    font-family: Poppins;
    font-size: 11px;
    font-weight: bold;
    text-align: left;
    color: #6b6979;
    margin-bottom: 10px;
  }
  .LabelBox {
    display: flex;
    align-items: center;
  }
  .Label {
    width: 155px;
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 12px;
    letter-spacing: -0.6px;
    text-align: left;
    color: #afadbe;
    :nth-of-type(1) {
      margin-left: 5px;
    }
  }
`;

const Prediction = styled.div`
  display: flex;
  align-items: center;
  padding: 11px 20px 11px 20px;
  margin-top: 10px;
  width: 515px;
  height: 50px;
  border-radius: 3px;
  border: solid 1px #3a3745;
  background-color: #23212a;
  .PredictTitle {
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: -0.65px;
    text-align: left;
    color: #afadbe;
  }
  .PredictValue {
    width: 415px;
    font-family: Poppins;
    font-size: 20px;
    font-weight: bold;
    text-align: right;
    color: #ffffff;
  }
`;

const ButtonBox = styled.div`
  display: flex;
  width: 1100px;
  padding: 30px 0 30px 0;
  border-bottom: 1px solid #3a3745;
  justify-content: center;
  align-items: center;
  button {
    width: 158px;
    height: 36px;
    border-radius: 3px;
    background-color: #6b6979;
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: -0.65px;
    text-align: center;
    color: #ffffff;
  }
`;

const Instruction = styled.div`
  /* width: 835px; */
  height: 137px;
  font-family: NotoSansKR, Apple SD Gothic Neo;
  font-size: 12px;
  font-weight: 500;
  margin-top: 15px;
  letter-spacing: -0.6px;
  text-align: left;
  line-height: 1.67;
  color: #6b6979;
  .Title {
    color: #afadbe;
  }
`;

const DropDownContainer = styled.div`
  margin: 0;
  padding: 0;
  width: 291px;
  * {
    box-sizing: border-box;
  }

  body {
    font-family: Arial, Helvetica, sans-serif;
  }

  .menu-container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .menu-trigger {
    display: flex;
    align-items: center;
    width: 291px;
    height: 40px;
    border: solid 1px #3a3745;
    background-color: #2f2d38;
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: -0.6px;
    text-align: left;
    color: #6b6979;
  }

  .menu-trigger:hover {
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
  }

  .menu-trigger span {
    vertical-align: middle;
    width: 220px;
    margin: 0 10px;
  }

  .menu-trigger div {
    width: 17px;
    height: 17px;
    border: solid 1px #3a3745;
    background-color: #23212a;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 11px;
    font-weight: 500;
    text-align: left;
    color: #6b6979;
  }

  .menu {
    background: #2f2d38;
    position: absolute;
    top: 40px;
    right: 1;
    width: 291px;
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
    opacity: 0;
    visibility: hidden;
    transform: translateY(-20px);
    transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
  }

  .menu.active {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  .menu ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .menu li {
    text-decoration: none;
    padding: 15px 20px;
    display: block;
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 12px;
    font-weight: 500;
    text-align: left;
    color: #6b6979;
    cursor: pointer;
    :hover {
      background-color: rgb(60, 58, 72);
    }
  }
`;
