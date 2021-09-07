import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styled, { css } from "styled-components";
import { useLocation, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { InitailizeState } from "../../redux/modules/filtervalue";

import TeamFilterModal from "../../Pages/TeamCompare/TeamFilterModal";
import PlayerFilterModal from "../../Pages/PlayerCompare/PlayerFilterModal";

function Sidebar() {
  //팀 비교 모달창 상태 값
  const [teamModal, setTeamModal] = useState(false);
  //플레이어 비교 마달창 상태 값
  const [playerModal, setPlayerModal] = useState(false);
  const { t } = useTranslation();

  const pathName = useLocation().pathname;
  const dispatch = useDispatch();
  let history = useHistory();

  //onClick 이벤트가 발생할때마다 해당 path로 이동
  const menus = [
    { name: t("sidebar.part1"), path: "/", image: "/Images/ico-home.png" },
    {
      name: t("sidebar.part2"),
      path: "/league",
      image: "/Images/ico-league.png"
    },
    { name: t("sidebar.part3"), path: "/team", image: "/Images/ico-team.png" },
    {
      name: t("sidebar.part4"),
      path: "/solo",
      image: "/Images/ico-player.png"
    },
    {
      name: t("sidebar.part5"),
      path: "/video",
      image: "/Images/ico-team-video-all-on.png"
    },
    {
      name: t("sidebar.part6"),
      path: "/teamCompare",
      image: "/Images/ico-team-compare.png"
    },
    {
      name: t("sidebar.part7"),
      path: "/playerCompare",
      image: "/Images/ico-player-compare.png"
    },
    {
      name: t("sidebar.part8"),
      path: "/simulator",
      image: "/Images/ico-itemsimulator.png"
    },
    {
      name: t("sidebar.part9"),
      path: "/calculator",
      image: "/Images/ico-pick-calculator.png"
    }
  ];

  return (
    <>
      <TeamFilterModal teamModal={teamModal} setTeamModal={setTeamModal} />
      <PlayerFilterModal
        playerModal={playerModal}
        setPlayerModal={setPlayerModal}
      />
      <SideBarWrapper>
        {/* <Link to="/utility"> */}
        <TeamLogo>
          <img src="/Images/profile-default.png" alt="profile"></img>
        </TeamLogo>
        {/* </Link> */}
        <MenuWrapper
          onClick={() => {
            history.push(menus[0].path);
            dispatch(InitailizeState());
          }}
          changeColor={pathName === "/"}
        >
          <img src={menus[0].image} alt="menu"></img>
          <div className="Name">{menus[0].name}</div>
        </MenuWrapper>
        <MenuWrapper
          onClick={() => {
            history.push(menus[1].path);
            dispatch(InitailizeState());
          }}
          changeColor={pathName === "/league"}
        >
          <img src={menus[1].image} alt="menu"></img>
          <div className="Name">{menus[1].name}</div>
        </MenuWrapper>
        <MenuWrapper
          onClick={() => {
            history.push(menus[2].path);
            dispatch(InitailizeState());
          }}
          changeColor={pathName === "/team"}
        >
          <img src={menus[2].image} alt="menu"></img>
          <div className="Name">{menus[2].name}</div>
        </MenuWrapper>
        <MenuWrapper
          onClick={() => {
            history.push(menus[3].path);
            dispatch(InitailizeState());
          }}
          changeColor={pathName === "/solo"}
        >
          <img src={menus[3].image} alt="menu"></img>
          <div className="Name">{menus[3].name}</div>
        </MenuWrapper>
        <MenuWrapper
          onClick={() => {
            history.push(menus[4].path);
            dispatch(InitailizeState());
          }}
          changeColor={pathName === "/video"}
        >
          <img src={menus[4].image} alt="menu" width="20px" height="20px"></img>
          <div className="Name">{menus[4].name}</div>
        </MenuWrapper>
        <MenuWrapper
          onClick={() => {
            if (history.location.pathname === "/teamCompare") {
              history.push("/");
            } else {
              setTeamModal(true);
              dispatch(InitailizeState());
            }
          }}
          changeColor={pathName === "/teamCompare"}
        >
          <img src={menus[5].image} alt="menu"></img>
          <div className="Name">{menus[5].name}</div>
        </MenuWrapper>
        <MenuWrapper
          onClick={() => {
            setPlayerModal(true);
            dispatch(InitailizeState());
          }}
          changeColor={pathName === "/playerCompare"}
        >
          <img src={menus[6].image} alt="menu"></img>
          <div className="Name">{menus[6].name}</div>
        </MenuWrapper>
        {/* <MenuWrapper
          onClick={() => {
            history.push(menus[6].path);
            dispatch(InitailizeState());
          }}
          changeColor={pathName === "/simulator"}
        >
          <img src={menus[6].image} alt="menu"></img>
          <div className="Name">
            아이템
            <br />
            시뮬레이터
          </div>
        </MenuWrapper>
        <MenuWrapper
          onClick={() => {
            history.push(menus[7].path);
            dispatch(InitailizeState());
          }}
          changeColor={pathName === "/calculator"}
        >
          <img src={menus[7].image} alt="menu"></img>
          <div className="Name">
            픽-조합
            <br />
            계산기
          </div>
        </MenuWrapper> */}
      </SideBarWrapper>
    </>
  );
}

export default Sidebar;

const SideBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 72px;
  position: sticky;
  top: 0;
  bottom: 0;
  background-color: #f04545;
  font-family: NotoSansKR, Apple SD Gothic Neo;
  font-size: 11px;
  font-weight: bold;
  letter-spacing: -0.55px;
  text-align: center;
  color: #ffffff;
  a:hover {
    color: #cecfd3;
    text-decoration: none;
  }
`;

const TeamLogo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 47px;
  height: 47px;
  margin-top: 19px;
  margin-bottom: 13.3px;
  border-radius: 30px;
  background-color: #0f0f12;
  img {
    width: 22px;
    height: 22px;
  }
`;

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 72px;
  height: 85px;
  cursor: pointer;
  .Name {
    max-width: 60px;
    width: auto;
    line-height: 1.27;
  }
  img {
    margin-bottom: 6.1px;
  }
  ${(props) =>
    props.changeColor &&
    css`
      border-left: 2px solid white;
      background-color: rgba(255, 255, 255, 0.15);
    `}
`;
