import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { useTranslation } from "react-i18next";
import axios from "axios";
import qs from "qs";
import { useSelector, useDispatch } from "react-redux";
import {
  OppTeam,
  GetOppTeam,
  HandleTab
} from "../../../redux/modules/filtervalue";
import { API } from "../../config";

function TeamSelectModal({ openModal, setOpenModal, setActiveTab }) {
  //팀 비교 텝 누를 떄 뜨는 모달창
  const [oppTeam, setOppTeam] = useState();
  const { t } = useTranslation();
  const filters = useSelector((state) => state.FilterReducer);
  const user = useSelector((state) => state.UserReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchingTeamFilter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openModal]);

  const fetchingTeamFilter = async () => {
    const result = await axios.request({
      method: "GET",
      url: `${API}/api/filter/oppteam`,
      params: {
        league: filters.league,
        patch: filters.patch,
        team: filters.team,
        token: user.token,
        id: user.id
      },
      paramsSerializer: (params) => {
        return qs.stringify(params, { arrayFormat: "repeat" });
      }
    });

    setOppTeam(result.data.oppteam);
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
          <img
            src="Images/btn-popup-close.png"
            alt="closeBtn"
            onClick={() => setOpenModal(false)}
          />
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
                <img src={`Images/TeamLogo/${team}.png`} alt="teamLogo" />
                <div>{team}</div>
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
  width: 310px;
  height: 517px;
  border: solid 1px rgb(58, 55, 69);
  background-color: rgb(47, 45, 56);
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  opacity: 1;
  position: fixed;
  z-index: 3;
`;

const ModalNav = styled.div`
  display: flex;
  align-items: center;
  height: 48px;
  justify-content: space-between;
  padding: 0 11px;
  label {
    width: auto;
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 12px;
    font-weight: bold;
    color: rgb(129, 126, 144);
  }
  img {
    width: 24px;
    height: 24px;
    cursor: pointer;
  }
`;

const ContentTitle = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 34px;
  background-color: rgb(35, 33, 42);
  font-family: NotoSansKR, Apple SD Gothic Neo;
  font-size: 12px;
  padding: 0px 0 0px 14px;
  color: rgb(255, 255, 255);
`;

const MapTeamContent = styled.div`
  height: 351px;
  border-bottom: 1px solid rgb(72, 70, 85);
`;

const ButtonBox = styled.div`
  padding: 21px 94px 26px 94px;
  height: 83px;
  button {
    outline: none;
    text-decoration: none;
    width: 122px;
    height: 36px;
    border-radius: 3px;
    background-color: rgb(240, 69, 69);
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
      color: rgb(255, 255, 255);
      background-color: rgb(58, 55, 69);
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
