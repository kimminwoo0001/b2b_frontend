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
    fetchingTeamFilter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openModal]);

  const fetchingTeamFilter = () => {
    const url = `${API}/api/filter/oppteam`;
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
      setOppTeam(e.data.oppteam);
    });
  };

  const fetchingPlayerFilter = (team) => {
    const url = `${API}/api/filter/oppplayer`;
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
      setOppPlayer(e.data);
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
            <ContentTitle>Team</ContentTitle>
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
            <ContentTitle>Player</ContentTitle>
            <MapTeamContent>
              {!oppPlayer ? (
                <PickTeamFirst>
                  <div className="LabelContainer">
                    {t("solo.comparison.findLabel")}
                    <br /> {t("solo.comparison.findLabel2")}
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
        <ButtonBox>
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
  width: 408px;
  height: 517px;
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
  display: flex;
  align-items: center;
  /* justify-content: space-between; */
  height: 48px;
  padding: 0 11px;
  border-bottom: 1px solid #433f4e;
  label {
    text-align: center;
    width: 100%;
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 12px;
    font-weight: bold;
    color: #fff;
  }
  img {
    width: 24px;
    height: 24px;
    cursor: pointer;
  }
`;

const ComponentBox = styled.div``;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  border-right: 1px solid #484655;
  /* padding:  */
  :nth-child(2) {
    border-right: none;
  }
`;

const ContentTitle = styled.div`
  display: flex;
  align-items: center;
  height: 34px;
  /* background-color: rgb(35, 33, 42); */
  font-family: NotoSansKR, Apple SD Gothic Neo;
  font-size: 12px;
  /* padding: 0px 0 0px 14px; */
  padding: 10px 14px;
  color: rgb(255, 255, 255);
`;

const PickTeamFirst = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  .LabelContainer {
    font-family: Poppins;
    font-size: 12px;
    letter-spacing: -0.6px;
    text-align: center;
    color: #84818e;
    line-height: 1.5;
  }
`;

const MapTeamContent = styled.div`
  height: 160px;
  border-bottom: 1px solid rgb(72, 70, 85);
  overflow-y: scroll;
  padding: 10px;
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
  height: 83px;
  button {
    outline: none;
    text-decoration: none;
    width: 380px;
    height: 42px;
    border-radius: 10px;
    background-color: #5942ba;
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 13px;
    font-weight: 500;
    color: rgb(255, 255, 255);
  }
`;

const MapTeam = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 34px;
  cursor: pointer;
  color: rgb(132, 129, 142);
  ${(props) =>
    props.currentTeam &&
    css`
      /* color: rgb(255, 255, 255); */
      background-color: #16151c;
      border-radius: 10px;
    `}
  img {
    width: 20px;
    height: 20px;
    margin: 0 10px 0 15px;
  }
  div {
    font-family: Poppins;
    font-size: 12px;
  }
`;
