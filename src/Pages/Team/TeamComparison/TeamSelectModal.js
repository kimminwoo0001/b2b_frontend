import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { useTranslation } from "react-i18next";
import axios from "axios";
import qs from "qs";
import { useSelector, useDispatch } from "react-redux";
import {
  OppTeam,
  GetOppTeam,
  HandleTab,
} from "../../../redux/modules/filtervalue";
import { API } from "../../config";
import axiosRequest from "../../../lib/axiosRequest";

function TeamSelectModal({ openModal, setOpenModal, setActiveTab }) {
  //팀 비교 텝 누를 떄 뜨는 모달창
  const [oppTeam, setOppTeam] = useState();
  const { t } = useTranslation();
  const filters = useSelector((state) => state.FilterReducer);
  const user = useSelector((state) => state.UserReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("openModal", openModal);
    if (openModal) {
      fetchingTeamFilter();
    }
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

  return (
    <>
      <BackScreen
        openModal={openModal}
        // onClick={() => setOpenModal(false)}
      ></BackScreen>
      <TeamModalWrapper openModal={openModal}>
        <ModalNav>
          <label>{t("filters.teamCompareLabel")}</label>
          <span>
            <img
              src="Images/ic_close_bk_30.svg"
              alt="closeBtn"
              onClick={() => setOpenModal(false)}
            />
          </span>
        </ModalNav>
        <ContentTitle>Team</ContentTitle>
        <MapTeamContent>
          {oppTeam?.map((team, idx) => {
            return (
              <MapTeam
                key={idx}
                onClick={() => dispatch(OppTeam(team))}
                currentTeam={filters.oppteam === team}
              >
                <div>
                  <img src={`Images/TeamLogo/${team}.png`} alt="teamLogo" />{" "}
                  {team}
                </div>
              </MapTeam>
            );
          })}
        </MapTeamContent>
        <ButtonBox>
          <button
            onClick={() => {
              setOpenModal(false);
              dispatch(GetOppTeam(filters.oppteam));
              dispatch(HandleTab(2));
            }}
          >
            {t("filters.confirm")}
          </button>
        </ButtonBox>
      </TeamModalWrapper>
    </>
  );
}

export default TeamSelectModal;

const BackScreen = styled.div`
  display: ${(props) => (props.openModal ? "block" : "none")};
  margin-left: 201px;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  position: fixed;
  z-index: 3;
  background-color: rgba(0, 0, 0, 1);
  opacity: 1;
`;

const TeamModalWrapper = styled.div`
  display: ${(props) => (props.openModal ? "block" : "none")};
  width: 500px;
  height: 383px;
  border: solid 1px #23212a;
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

const ContentTitle = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 18px;
  // background-color: rgb(35, 33, 42);
  font-family: SpoqaHanSansNeo;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.63;
  padding: 0px 0 0px 14px;
<<<<<<< HEAD
  margin: 25px;
=======
  margin: 25px 41px 10px;
>>>>>>> bc324976cec1e1f8228df9f8236637cb0e1ddab0
  color: rgb(255, 255, 255);
`;

const MapTeamContent = styled.div`
  height: 190px;
  //border-bottom: 1px solid rgb(72, 70, 85);
  overflow-y: scroll;
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
  padding: 5px;
  height: 83px;
  button {
    outline: none;
    text-decoration: none;
    width: 100%;
    height: 54px;
    border-radius: 20px;
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
  height: 60px;
  cursor: pointer;
  color: rgb(132, 129, 142);
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
    object-fit: contain;
    vertical-align: middle;
    margin: 0 10px 1px 15px;
  }
  div {
    margin-left: 50px;
    font-family: SpoqaHanSansNeo;
    font-size: 16px;
    font-weight: 300;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.56;
    letter-spacing: normal;
  }
`;
