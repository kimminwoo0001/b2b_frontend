import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styled, { css } from "styled-components";
import { useLocation, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { InitailizeState } from "../../redux/modules/filtervalue";

import TeamFilterModal from "../../Pages/TeamCompare/TeamFilterModal";
import PlayerFilterModal from "../../Pages/PlayerCompare/PlayerFilterModal";

function Sidebar() {
  //팀 비교 모달창 상태 값
  const [teamModal, setTeamModal] = useState(false);
  //플레이어 비교 마달창 상태 값
  const [playerModal, setPlayerModal] = useState(false);
  const lang = useSelector((state) => state.LocaleReducer);
  const user = useSelector((state) => state.UserReducer);
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
        <TSBLogo>
          {/*<img src="/Images/profile-default.png" alt="profile"></img>*/}
          <img src="/Images/logo.png" alt="profile"></img>
        </TSBLogo>
        {/* </Link> */}

        <Info>
          <div class="user">
            {lang === "en" && <span className="text">Hello, </span>}
            {user.id}
            {lang !== "en" && <span className="text">님 안녕하세요!</span>}
          </div>

          <div class="icon">

          </div>
        </Info>

        <MenuList>
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
        </MenuList>
      </SideBarWrapper>
    </>
  );
}

export default Sidebar;

const SideBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 200px;
  //margin: 0 0 141px;
  padding: 40px 30.3px 25px 9.7px;
  background-color: var(--bg-gnb);
  // background-color: orange;

  // position: sticky;
  top: 0;
  bottom: 0;
  font-family: NotoSansKR, Apple SD Gothic Neo;
  font-size: 11px;
  // font-weight: bold;
  letter-spacing: -0.55px;
  text-align: center;
  color: #ffffff;
  a:hover {
    color: #cecfd3;
    text-decoration: none;
  }
`;

const TSBLogo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 19px;
  margin-bottom: 0px;
  // border-radius: 30px;
  // background-color: #0f0f12;
  img {
    width: 135px;
    height: 35.4px;
    margin: 0 9.7px 0px 15.3px;
    object-fit: contain;
  }
`;

const Info = styled.div`
  display: flex;
  justify-content: center;
  // align-items: center;
  width: 164px;
  height: 113px;
  margin: 29.6px 6.7px 0px 30.3px;
  .user {
    width: 175px;
    height: 52px;
    //padding: 0 12px 0 0;
    font-family: NotoSansKR;
    font-size: 19px;
    font-stretch: normal;
    font-style: normal;
    font-weight: bold;
    line-height: 1.32;
    letter-spacing: normal;
    text-align: left;
    color: #fff;
    .text {
      font-weight: 300;
    }
  }
  .icon {
    width: 24px;
    height: 24px;
    object-fit: contain;
  }
`;

const MenuList = styled.div`
  width: 160px;
  height: 416px;
  margin: 0 0 157px;
`;

const MenuWrapper = styled.div`
  display: flex;
  // flex-direction: column;
  // align-items: center;
  // justify-content: center;
  width: 150px;
  height: 24px;
  margin: 16px 28.7px 25px 15.3px;
  cursor: pointer;
  .Name {
    // max-width: 60px;
    // width: auto;
    // line-height: 1.27;
    width: 100px;
    height: 17px;
    margin: 4px 0 3px 12px;
    font-family: NotoSansKR;
    font-size: 12px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    color: #fff;
  }
  img {
    // margin-bottom: 6.1px;
    width: 24px;
    height: 24px;
    margin: 0 12px 0 0;
    object-fit: contain;
  }
  ${(props) =>
    props.changeColor &&
    css`
      width: 160px;
      height: 42px;
      margin: 16px 0 16px;
      padding: 9px 0px 9px 15px;
      border-radius: 16px;
      background-color: #5942ba;
    `}
`;
