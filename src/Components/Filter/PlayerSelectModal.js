import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import qs from "qs";

import { API } from "../../Pages/config";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import {
  OppTeam,
  OppPlayer,
  GetOppPlayer,
  ResetChampion,
  HandleTab,
} from "../../redux/modules/filtervalue";
import axiosRequest from "../../lib/axiosRequest";

function PlayerSelectModal({ openModal, setOpenModal }) {
  const filters = useSelector((state) => state.FilterReducer);
  const user = useSelector((state) => state.UserReducer);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [oppTeam, setOppTeam] = useState();
  const [oppPlayer, setOppPlayer] = useState();

  useEffect(() => {
    if (!openModal) {
      return;
    }
    fetchingTeamFilter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openModal]);

  const fetchingTeamFilter = () => {
    const url = `${API}/lolapi/filter/oppteam`;
    const params = {
      league: filters.league,
      year: filters.year,
      season: filters.season,
      patch: filters.patch,
      team: filters.team,
      token: user.token,
      id: user.id,
    };
    axiosRequest(url, params, function (e) {
      setOppTeam(e.oppteam);
    });
  };

  const fetchingPlayerFilter = (team) => {
    const url = `${API}/lolapi/filter/oppplayer`;
    const params = {
      league: filters.league,
      year: filters.year,
      season: filters.season,
      patch: filters.patch,
      team: team,
      position: filters.position,
      token: user.token,
      id: user.id,
    };
    axiosRequest(url, params, function (e) {
      setOppPlayer(e);
    });
  };

  const HandleSelect = () => {
    if (filters.oppplayer) {
      setOpenModal(false);
      dispatch(GetOppPlayer(filters.oppplayer));
      dispatch(ResetChampion());
      dispatch(HandleTab(1));
    } else {
      alert(t("filters.noPlayer"));
    }
  };

  return (
    <>
      <BackScreen
        openModal={openModal}
        // onClick={() => setOpenModal(false)}
      ></BackScreen>
      <Wrapper openModal={openModal}>
        <ModalNav>
          <label>{t("filters.playerCompareLabel")}</label>
          <img
            src="Images/ic_close_bk_30.png"
            alt="closeBtn"
            onClick={() => setOpenModal(false)}
          />
        </ModalNav>
        <ComponentBox>
          <ContentBox>
            <ContentTitle isOppTeamSelected={filters.player}>Team</ContentTitle>
            <MapTeamContent>
              {oppTeam?.map((team, idx) => {
                return (
                  <MapTeam
                    key={idx}
                    onClick={() => {
                      dispatch(OppTeam(team));
                      fetchingPlayerFilter(team);
                      // dispatch(OppPlayer(""));
                    }}
                    currentTeam={filters.oppteam === team}
                  >
                    <img src={`Images/TeamLogo/${team}.png`} alt="teamLogo" />
                    <div>{team}</div>
                  </MapTeam>
                );
              })}
            </MapTeamContent>
          </ContentBox>
          <ContentBox>
            <ContentTitle isOppTeamSelected={filters.oppteam !== ""}>
              Player
            </ContentTitle>
            <MapTeamContent>
              {!oppPlayer ? (
                <PickTeamFirst>
                  <div className="LabelContainer">
                    {t("solo.comparison.findLabel")}
                  </div>
                </PickTeamFirst>
              ) : (
                oppPlayer.map((player, idx) => {
                  return (
                    <MapTeam
                      key={idx}
                      onClick={() => dispatch(OppPlayer(player.name))}
                      currentTeam={filters.oppplayer === player.name}
                    >
                      <img
                        src={`Images/ico-position-${player.position}.png`}
                        alt="teamLogo"
                      />
                      <div>{player.name}</div>
                    </MapTeam>
                  );
                })
              )}
            </MapTeamContent>
          </ContentBox>
        </ComponentBox>
        <ButtonBox
          isAllFilterSelected={
            filters.oppteam !== "" && filters.oppplayer !== ""
          }
        >
          <button onClick={() => HandleSelect()}>{t("filters.confirm")}</button>
        </ButtonBox>
      </Wrapper>
    </>
  );
}

export default PlayerSelectModal;

const BackScreen = styled.div`
  display: ${(props) => (props.openModal ? "block" : "none")};
  margin-left: 201px;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  position: fixed;
  z-index: 1;
  background-color: rgba(0, 0, 0, 1);
  opacity: 1;
`;

const Wrapper = styled.div`
  display: ${(props) => (props.openModal ? "block" : "none")};
  width: 500px;
  // height: 516px;
  border: solid 1px #3a3745;
  background-color: #23212a;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  opacity: 1;
  position: fixed;
  z-index: 3;
  border-radius: 20px;
`;

const ModalNav = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 50px;
  justify-content: center;
  padding: 0 11px;
  border-bottom: solid 1px #433f4e;
  label {
    font-family: SpoqaHanSansNeo;
    font-size: 15px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.33;
    color: #fff;
  }
  img {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 30px;
    height: 30px;
    cursor: pointer;
  }
`;

const ComponentBox = styled.div``;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  border-right: 1px solid #484655;
  margin-top: 30px;
`;

const ContentTitle = styled.div`
  display: flex;
  align-items: center;
  height: 18px;
  font-family: NotoSansKR, Apple SD Gothic Neo;
  font-size: 18px;
  /* padding: 0px 0 0px 14px; */
  padding: 10px 14px;
  margin: 0px 39px 0px 23px;
  color: rgb(255, 255, 255);
  opacity: ${(props) => (props.isOppTeamSelected ? "1" : "0.3")};
`;

const PickTeamFirst = styled.div`
  display: flex;
  /* justify-content: center; */
  align-items: center;
  padding: 0 0 0 25px;
  margin-top: 25px;
  .LabelContainer {
    font-family: "Spoqa Han Sans";
    font-size: 18px;
    letter-spacing: -0.6px;
    text-align: left;
    color: #84818e;
    line-height: 1.5;
  }
`;

const MapTeamContent = styled.div`
  max-height: 190px;
  //border-bottom: 1px solid rgb(72, 70, 85);
  overflow-y: scroll;
  padding: 0 16px;
  padding-top: 10px;
  &::-webkit-scrollbar {
    width: 8px;
    background-color: #434050;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #23212a;
    border-radius: 10px;
  }
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90px;
  margin: 5px 16px 0;
  button {
    outline: none;
    text-decoration: none;
    width: 100%;
    height: 60px;
    margin: 0 5px;
    border-radius: 20px;
    background-color: ${(props) =>
      props.isAllFilterSelected ? "#5942ba" : "#484655"};
    font-family: SpoqaHanSansNeo;
    font-size: 18px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.56;
    letter-spacing: normal;
    text-align: center;
    color: rgb(255, 255, 255);
  }
`;

const MapTeam = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 60px;
  cursor: pointer;
  color: rgb(132, 129, 142);
  padding: 15px 0 15px 46px;
  ${(props) =>
    props.currentTeam &&
    css`
      color: rgb(255, 255, 255);
      background-color: #16151c;
      border-radius: 20px;
    `}
  img {
    width: 30px;
    height: 30px;
    margin: 0 11px 0 0px;
  }
  div {
    font-family: SpoqaHanSansNeo;
    font-size: 16px;
    font-weight: 300;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.56;
    letter-spacing: normal;
  }
`;
