import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import styled, { css } from "styled-components";
import { useLocation, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MenuNum, InitailizeState, CompareModal } from "../../redux/modules/filtervalue";
import { UserLogout } from "../../redux/modules";

import LocaleDropdown from "../Nav/LocaleDropdown";
import { SelectorInitailizeState } from "../../redux/modules/selectorvalue";

function Sidebar() {
  //팀 비교 모달창 상태 값
  const lang = useSelector((state) => state.LocaleReducer);
  const user = useSelector((state) => state.UserReducer);
  const { i18n, t } = useTranslation();

  const pathName = useLocation().pathname;
  const dispatch = useDispatch();
  let history = useHistory();

  useEffect(() => {
    changeLanguage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  // 다국어 지원 i18next 라이브러리  setting
  // 변경 된 locale값을 라이브러리에 저장해서 씀
  const changeLanguage = (language) => {
    i18n.changeLanguage(lang);
  };

  //onClick 이벤트가 발생할때마다 해당 path로 이동
  const menus = [
    { // menus[0] Home
      name: t("sidebar.part1"),
      path: "/",
      image: "/Images/sidebar_newLogo/ico-home.png",
    },
    { // menus[1] 리그 보고서
      name: t("sidebar.part2"),
      path: "/league",
      image: "/Images/sidebar_newLogo/ico-league.png",
    },
    { // menus[2] 팀 보고서
      name: t("sidebar.part3"),
      path: "/team",
      image: "/Images/sidebar_newLogo/ico-team.png",
    },
    { // menus[3] 메타 분석
      name: t("sidebar.part4"),
      path: "/metaAnalysis",
      image: "/Images/sidebar_newLogo/ico-meta.png",
    },
    { // menus[4] 선수 보고서
      name: t("sidebar.part5"),
      path: "/solo",
      image: "/Images/sidebar_newLogo/ico-player.png",
    },
    { // menus[5] 영상 보고서
      name: t("sidebar.part6"),
      path: "/video",
      image: "/Images/sidebar_newLogo/ico-movie.png",
    },
    { // menus[6] 매치 분석
      name: t("sidebar.part7"),
      path: "/matchAnalysis",
      image: "/Images/sidebar_newLogo/ico-match.png",
    },
    { // menus[7] 팀 비교
      name: t("sidebar.part8"),
      path: "/teamCompare",
      image: "/Images/sidebar_newLogo/ico-teamcom.png",
    },
    { // menus[8] 선수 비교
      name: t("sidebar.part9"),
      path: "/playerCompare",
      image: "/Images/sidebar_newLogo/ico-playercom.png",
    },
    { // menus[9] 아이템 시뮬레이터
      name: t("sidebar.part10"),
      path: "/simulator",
      image: "/Images/ico-itemsimulator.png",
    },
    { // menus[10] 픽 계산기
      name: t("sidebar.part11"),
      path: "/calculator",
      image: "/Images/ico-pick-calculator.png",
    },
    { // menus[11] 게임 보고서
      name: t("sidebar.part12"),
      path: "/gameReport",
      image: "/Images/sidebar_newLogo/ico_game.png",
    },
  ];

  // 로그아웃 함수, 로그아웃 이벤트가 발생되면 session 값을 clear하고 로그인 페이지로 이동시킴
  const handleLogOut = () => {
    sessionStorage.clear();
    dispatch(UserLogout());
    history.push("/login");
  };

  return (
    <>
      <SideBarWrapper>
        {/* <Link to="/utility"> */}
        {/* <TSBLogo>
      {<img src="/Images/profile-default.png" alt="profile"></img>}
      <img
            src="/Images/logo.png"
            alt="profile"
            onClick={() => history.push("/")}
          ></img>
        </TSBLogo>
        */}
        {/* </Link> */}
        {/* 
        <Info>
          <div className="user">
            {lang === "en" && <span className="text">Hello, </span>}
            {user.id}
            {lang !== "en" && <span className="text">님 안녕하세요!</span>}
          </div>

          <div className="icon">
            {user.alarm ? (
              <img
                className="Alert"
                src="Images/ico_alaram.png"
                alt="alertIconOn"
              ></img>
            ) : (
              <img
                className="Alert"
                src="Images/ico-alarm.png"
                alt="alertIconOff"
              ></img>
            )}
            <img
              className="LogOut"
              src="Images/ico-logout.png"
              alt="LogoutIcon"
              onClick={() => handleLogOut()}
            ></img>
          </div>
        </Info>
      */}
        <MenuList>
          <MenuWrapper // Home
            onClick={() => {
              history.push(menus[0].path);
              dispatch(InitailizeState());
              dispatch(SelectorInitailizeState());
              dispatch(MenuNum(0));
            }}
            changeColor={pathName === "/"}
          >
            <img src={menus[0].image} alt="menu"></img>
            <div className="Name">{menus[0].name}</div>
          </MenuWrapper>
          <MenuWrapper // 리그 보고서
            onClick={() => {
              history.push(menus[1].path);
              dispatch(InitailizeState());
              dispatch(SelectorInitailizeState());
              dispatch(MenuNum(1));
            }}
            changeColor={pathName === "/league"}
          >
            <img src={menus[1].image} alt="menu"></img>
            <div className="Name">{menus[1].name}</div>
          </MenuWrapper>
          <MenuWrapper // 팀 보고서
            onClick={() => {
              history.push(menus[2].path);
              dispatch(InitailizeState());
              dispatch(SelectorInitailizeState());
              dispatch(MenuNum(2));
            }}
            changeColor={pathName === "/team"}
          >
            <img src={menus[2].image} alt="menu"></img>
            <div className="Name">{menus[2].name}</div>
          </MenuWrapper>
          {/* <MenuWrapper // 메타 분석
            onClick={() => {
              history.push(menus[3].path);
              dispatch(InitailizeState());
              dispatch(MenuNum(3));
            }}
            changeColor={pathName === "/metaAnalysis"}
          >
            <img src={menus[3].image} alt="menu"></img>
            <div className="Name">{menus[3].name}</div>
          </MenuWrapper> */}
          <MenuWrapper // 선수 보고서
            onClick={() => {
              history.push(menus[4].path);
              dispatch(InitailizeState());
              dispatch(SelectorInitailizeState());
              dispatch(MenuNum(4));
            }}
            changeColor={pathName === "/solo"}
          >
            <img src={menus[4].image} alt="menu"></img>
            <div className="Name">{menus[4].name}</div>
          </MenuWrapper>
          <MenuWrapper // 영상 보고서
            onClick={() => {
              history.push(menus[5].path);
              dispatch(InitailizeState());
              dispatch(SelectorInitailizeState());
              dispatch(MenuNum(5));
            }}
            changeColor={pathName === "/video"}
          >
            <img
              src={menus[5].image}
              alt="menu"
            ></img>
            <div className="Name">{menus[5].name}</div>
          </MenuWrapper>
          {/* <MenuWrapper // 게임 보고서
            onClick={() => {
              history.push(menus[11].path);
              dispatch(InitailizeState());
              dispatch(MenuNum(11));
            }}
            changeColor={pathName === "/gameReport"}
          >
            <img
              src={menus[11].image}
              alt="menu"
            ></img>
            <div className="Name">{menus[11].name}</div>
          </MenuWrapper> */}
          {/* <MenuWrapper // 매치 분석
            onClick={() => {
              history.push(menus[6].path);
              dispatch(InitailizeState());
              dispatch(MenuNum(6));
            }}
            changeColor={pathName === "/matchAnalysis"}
          >
            <img src={menus[6].image} alt="menu"></img>
            <div className="Name">{menus[6].name}</div>
          </MenuWrapper> */}
          <MenuWrapper // 팀 비교
            onClick={() => {
              history.push(menus[7].path);
              dispatch(InitailizeState());
              dispatch(SelectorInitailizeState());
              dispatch(MenuNum(7));
            }}
            changeColor={pathName === "/teamCompare"}
          >
            <img src={menus[7].image} alt="menu"></img>
            <div className="Name">{menus[7].name}</div>
          </MenuWrapper>
          <MenuWrapper // 선수 비교
            onClick={() => {
              history.push(menus[8].path);
              dispatch(InitailizeState());
              dispatch(SelectorInitailizeState());
              dispatch(MenuNum(8));
            }}
            changeColor={pathName === "/playerCompare"}
          >
            <img src={menus[8].image} alt="menu"></img>
            <div className="Name">{menus[8].name}</div>
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
        {/* 
          <LocaleDropdown />
        */}
      </SideBarWrapper>
    </>
  );
}

export default Sidebar;

const SideBarWrapper = styled.div`
  width: 200px;
  margin: 0 0;
  padding: 26px 7px 103px 12px;
  background-color: #16151c;
  font-family: NotoSansKR, Apple SD Gothic Neo;
  font-size: 11px;
  letter-spacing: -0.55px;
  text-align: center;
  color: #ffffff;
  a:hover {
    color: #cecfd3;
    text-decoration: none;
  }
`;

// const TSBLogo = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   margin-top: 19px;
//   margin-bottom: 0px;
//   // border-radius: 30px;
//   // background-color: #0f0f12;
//   img {
//     width: 135px;
//     height: 35.4px;
//     margin: 0 9.7px 0px 15.3px;
//     object-fit: contain;
//     cursor: pointer;
//   }
// `;

// const Info = styled.div`
//   display: block;
//   // justify-content: center;
//   // align-items: center;
//   width: 164px;
//   height: 113px;
//   margin: 29.6px 6.7px 0px 30.3px;
//   .user {
//     width: 164px;
//     height: 52px;
//     //padding: 0 12px 0 0;
//     font-family: NotoSansKR;
//     font-size: 19px;
//     font-stretch: normal;
//     font-style: normal;
//     font-weight: bold;
//     line-height: 1.32;
//     letter-spacing: normal;
//     text-align: left;
//     color: #fff;
//     .text {
//       font-weight: 300;
//     }
//   }
//   .icon {
//     width: 80px;
//     height: 24px;
//     margin: 10px 0 0 0;
//     .Alert {
//       width: 24px;
//       height: 24px;
//       margin: 0 15px 0 0;
//       object-fit: contain;
//       cursor: pointer;
//     }
//     .LogOut {
//       width: 24px;
//       height: 24px;
//       margin: 0 0 0 15px;
//       object-fit: contain;
//       cursor: pointer;
//     }
//   }
// `;

const MenuList = styled.div`
  width: 161px;
  height: 416px;
  margin: 0 20px 636px 0;
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
