import React, { useState, useEffect } from "react";
import axios from "axios";
import styled, { css } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import {
  InitailizeState,
  League,
  Team,
  Player,
  GetOppPlayer,
} from "../../redux/modules/filtervalue";
import { API } from "../config";
import axiosRequest from "../../lib/axiosRequest";

// import { useDetectOutsideClick } from "../../Components/SelectFilter/useDetectOustsideClick";

function PickCombineModal({ openModal, setOpenModal }) {
  const filters = useSelector((state) => state.FilterReducer);

  const dispatch = useDispatch();

  // const [leagueFilter, setLeagueFilter] = useState();

  // const [patchFilter, setPatchFilter] = useState();

  const [teamFilter, setTeamFilter] = useState();

  const [playerFilter, setPlayerFilter] = useState();
  // const [oppPlayerFilter, setOppPlayerFilter] = useState();

  const LeagueLCK = "lck";
  const LeagueLEC = "lec";
  const LeagueLCS = "lcs";
  // const [isActiveLeague, setIsActiveLeague] = useDetectOutsideClick(
  //   dropdownRef,
  //   false
  // );
  // const [isActivePatch, setIsActivePatch] = useDetectOutsideClick(
  //   dropdownRef,
  //   false
  // );

  useEffect(() => {
    fetchLeagueFilter();
  }, []);

  useEffect(() => {
    handleParams();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.convertleague]);

  useEffect(() => {
    fetchingPatchFilter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.league]);

  useEffect(() => {
    fetchingTeamFilter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.patch]);

  useEffect(() => {
    fetchingPlayerFilter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.team]);

  useEffect(() => {
    fetchingOppPlayerFilter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.oppteam]);

  // 리그 필터 fetch 해오는 함수
  const fetchLeagueFilter = async () => {
    const rawMatchData = await fetch(`${API}/lolapi/filter/league`);
    const parsedMatchData = await rawMatchData.json();
    // console.log("parsed Match Data", parsedMatchData);
    const convertData = [];
    parsedMatchData.league.forEach((el) => {
      if (el === LeagueLCS) {
        convertData.push("LCS");
      } else if (el === LeagueLEC) {
        convertData.push("LEC");
      } else if (el === LeagueLCK) {
        convertData.push("LCK");
      }
    });
    // setLeagueFilter(convertData.sort());
  };

  //리그 필터 데이터 query string으로 보내줄 값 변환 함수
  const handleParams = () => {
    if (filters.convertleague === "LCK") {
      dispatch(League(LeagueLCK));
    } else if (filters.convertleague === "LEC") {
      dispatch(League(LeagueLEC));
    } else if (filters.convertleague === "LCS") {
      dispatch(League(LeagueLCS));
    }
  };

  // 패치 필터 fetch 함수
  const fetchingPatchFilter = () => {
    const url = `${API}/lolapi/filter/patch`;
    const params = { league: filters.league };
    axiosRequest(url, params, function (e) {
      console.log(e);
      // setPatchFilter(result.data.patch);
    });
  };

  //팀 필터 fetch 함수
  const fetchingTeamFilter = async () => {
    const url = `${API}/lolapi/filter/team`;
    const params = {
      league: filters.league,
      year: filters.year,
      season: filters.season,
      patch: filters.patch,
    };
    axiosRequest(url, params, function (e) {
      setTeamFilter(e.data.team);
    });
  };

  //플레이어 필터 fetch 함수
  const fetchingPlayerFilter = async () => {
    const url = `${API}/lolapi/filter/player`;
    const params = {
      league: filters.league,
      year: filters.year,
      season: filters.season,
      patch: filters.patch,
      team: filters.team,
    };
    axiosRequest(url, params, function (e) {
      setPlayerFilter(e.data.player);
    });
  };

  const fetchingOppPlayerFilter = async () => {
    const url = `${API}/lolapi/filter/player`;
    const params = {
      league: filters.league,
      year: filters.year,
      season: filters.season,
      patch: filters.patch,
      team: filters.oppteam,
    };

    axiosRequest(url, params, function (e) {
      console.log(e);
      // setOppPlayerFilter(result.data.player);
    });
  };

  return (
    <>
      <BackScreen
        openModal={openModal}
        onClick={() => setOpenModal(false)}
      ></BackScreen>
      <OpenModalWrapper openModal={openModal}>
        <TeamFilterBox>
          <SelectTeam>
            <div className="SelectTitle">
              <div>소속팀과 선수,챔피언을 설정해주세요.</div>
              <img
                src="Images/btn-popup-close.png"
                alt="close"
                onClick={() => {
                  dispatch(InitailizeState());
                  setOpenModal(false);
                }}
              />
            </div>
            <GetFilterData>
              <ContentBox>
                <div className="Nav">Team</div>
                {teamFilter?.map((team, index) => {
                  return (
                    <MapTeams
                      key={index}
                      onClick={() => dispatch(Team(team))}
                      currentTeam={filters.team === team}
                    >
                      <img
                        src={`Images/HomeLogo/${team}.png`}
                        alt="TeamLogo"
                      ></img>
                      <div className="TeamName">{team}</div>
                    </MapTeams>
                  );
                })}
              </ContentBox>
              <ContentBox>
                <div className="Nav">Player</div>
                {playerFilter?.map((player, index) => {
                  return (
                    <MapTeams
                      key={index}
                      onClick={() => dispatch(Player(player))}
                      currentTeam={filters.player === player}
                    >
                      <img src="Images/HomeLogo/DRX.png" alt="TeamLogo"></img>
                      <div className="TeamName">{player}</div>
                    </MapTeams>
                  );
                })}
              </ContentBox>
              <ContentBox>
                <div className="Nav">Champion</div>
                <input
                  className="SearchChamp"
                  type="text"
                  placeholder="챔피언 검색"
                ></input>
                {playerFilter?.map((player, index) => {
                  return (
                    <MapTeams
                      key={index}
                      onClick={() => dispatch(Player(player))}
                      currentTeam={filters.player === player}
                    >
                      <img src="Images/HomeLogo/DRX.png" alt="TeamLogo"></img>
                      <div className="TeamName">{player}</div>
                    </MapTeams>
                  );
                })}
              </ContentBox>
            </GetFilterData>
          </SelectTeam>
        </TeamFilterBox>
        <ButtonBox>
          <button
            className="Selected"
            onClick={() => {
              dispatch(GetOppPlayer(filters.oppplayer));
              setOpenModal(false);
            }}
          >
            선택완료
          </button>
        </ButtonBox>
      </OpenModalWrapper>
    </>
  );
}

export default PickCombineModal;

const BackScreen = styled.div`
  display: ${(props) => (props.openModal ? "block" : "none")};
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  position: fixed;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 1;
`;

const OpenModalWrapper = styled.div`
  display: ${(props) => (props.openModal ? "block" : "none")};
  width: 611px;
  height: 517px;
  border: solid 1px #3a3745;
  background-color: #2f2d38;
  top: 10%;
  left: 30%;
  opacity: 1;
  position: absolute;
  z-index: 3;
`;

const TeamFilterBox = styled.div`
  display: flex;
  height: 433px;
  border-bottom: 1px solid #484655;
`;

const SelectTeam = styled.div`
  width: 100%;
  height: 100%;
  :nth-child(1) {
    border-right: 1px solid #484655;
  }

  .SelectTitle {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 10px 0 15px;
    height: 48px;
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 12px;
    font-weight: bold;
    width: 100%;
    letter-spacing: -0.6px;
    text-align: left;
    color: #817e90;
  }
  .Nav {
    height: 34px;
    width: 202px;
    padding: 7px 0 10px 15px;
    background-color: #23212a;
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 12px;
    text-align: left;
    color: #ffffff;
  }
  input {
    width: 190px;
    height: 32px;
    margin: 6px;
    padding: 7px 6px 8px 9px;
    border: solid 1px #3a3745;
    background-color: #23212a;
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 12px;
    letter-spacing: -0.6px;
    text-align: left;
    color: #84818e;
    background-image: url("Images/ico-champ-search.png");
    background-repeat: no-repeat;
    background-position: 165px center;
  }
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 83px;
  .Selected {
    width: 122px;
    height: 36px;
    border-radius: 3px;
    background-color: #f04545;
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: -0.65px;
    text-align: center;
    color: #ffffff;
    margin-right: 20px;
  }
  .Close {
    width: 122px;
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

const MapTeams = styled.div`
  display: flex;
  align-items: center;
  height: 34px;
  cursor: pointer;

  img {
    width: 20px;
    height: 20px;
    margin: 0 10px 0 15px;
  }
  .TeamName {
    width: 100%;
    font-family: Poppins;
    font-size: 12px;
    text-align: left;
    color: #84818e;
  }
  ${(props) =>
    props.currentTeam &&
    css`
      color: #ffffff;
      background-color: rgb(58, 55, 69);
    `}
`;

const GetFilterData = styled.div`
  display: flex;
`;

const ContentBox = styled.div`
  height: 385px;
  border-right: 1px solid #3a3745;
`;
