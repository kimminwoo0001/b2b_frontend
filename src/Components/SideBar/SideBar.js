import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import SideBarItem from "./SideBarItem";

function Sidebar() {
  //팀 비교 모달창 상태 값
  const lang = useSelector((state) => state.LocaleReducer);
  const { i18n, t } = useTranslation();

  const pathName = useLocation().pathname;

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
    {
      // menus[0] Home
      idx: 0,
      name: t("sidebar.part1"),
      path: "/",
      image: "/Images/sidebar_newLogo/ico-home.png",
      changeColor: pathName === "/",
    },
    {
      // menus[1] 리그 보고서
      idx: 1,
      name: t("sidebar.part2"),
      path: "/league",
      image: "/Images/sidebar_newLogo/ico-league.png",
      changeColor: pathName === "/league",
    },
    {
      // menus[2] 팀 보고서
      idx: 2,
      name: t("sidebar.part3"),
      path: "/team",
      image: "/Images/sidebar_newLogo/ico-team.png",
      changeColor: pathName === "/team",
    },
    {
      // menus[3] 메타 분석
      idx: 3,
      name: t("sidebar.part4"),
      path: "/metaAnalysis",
      image: "/Images/sidebar_newLogo/ico-meta.png",
      changeColor: pathName === "/metaAnalysis",
    },
    {
      // menus[4] 선수 보고서
      idx: 4,
      name: t("sidebar.part5"),
      path: "/solo",
      image: "/Images/sidebar_newLogo/ico-player.png",
      changeColor: pathName === "/solo",
    },
    {
      // menus[5] 영상 보고서
      idx: 5,
      name: t("sidebar.part6"),
      path: "/video",
      image: "/Images/sidebar_newLogo/ico-movie.png",
      changeColor: pathName === "/video",
    },
    {
      // menus[6] 매치 분석
      idx: 6,
      name: t("sidebar.part7"),
      path: "/matchAnalysis",
      image: "/Images/sidebar_newLogo/ico-match.png",
      changeColor: pathName === "/matchAnalysis",
    },
    {
      // menus[7] 팀 비교
      idx: 7,
      name: t("sidebar.part8"),
      path: "/teamCompare",
      image: "/Images/sidebar_newLogo/ico-teamcom.png",
      changeColor: pathName === "/teamCompare",
      modal: true,
    },
    {
      // menus[8] 선수 비교
      idx: 8,
      name: t("sidebar.part9"),
      path: "/playerCompare",
      image: "/Images/sidebar_newLogo/ico-playercom.png",
      changeColor: pathName === "/playerCompare",
      modal: true,
    },
    {
      // menus[9] 아이템 시뮬레이터
      idx: 9,
      name: t("sidebar.part10"),
      path: "/simulator",
      image: "/Images/ico-itemsimulator.png",
      changeColor: pathName === "/simulator",
    },
    {
      // menus[10] 픽 계산기
      idx: 10,
      name: t("sidebar.part11"),
      path: "/calculator",
      image: "/Images/ico-pick-calculator.png",
      changeColor: pathName === "/calculator",
    },
    {
      // menus[11] 게임 보고서
      idx: 11,
      name: t("sidebar.part12"),
      path: "/gameReport",
      image: "/Images/sidebar_newLogo/ico_game.png",
      changeColor: pathName === "/gameReport",
      version: "beta",
    },
    {
      // menus[12] 솔로 랭크
      idx: 12,
      name: t("sidebar.part13"),
      path: "/soloRank",
      image: "/Images/sidebar_newLogo/ico_solorank.svg",
      changeColor: pathName === "/soloRank",
      version: "beta",
    },
    {
      // menus[13] 아이템 계산기
      idx: 13,
      name: t("sidebar.part14"),
      path: "/itemCalculator",
      image: "/Images/sidebar_newLogo/ico_calculate.svg",
      changeColor: pathName === "/itemCalculator",
      version: "beta",
    },
  ];

  // sidebar 에서 사용되는 menus를 순차적으로 추가.
  const usingValue = [
    menus[0],
    menus[1],
    menus[2],
    menus[4],
    menus[5],
    menus[11],
    menus[7],
    menus[8],
    menus[12],
  ];

  // // 로그아웃 함수, 로그아웃 이벤트가 발생되면 session 값을 clear하고 로그인 페이지로 이동시킴
  // const handleLogOut = () => {
  //   sessionStorage.clear();
  //   dispatch(UserLogout());
  //   history.push("/login");
  // };

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
          {usingValue.length > 0 &&
            usingValue.map((menu, idx) => (
              <SideBarItem menu={menu} idx={idx} />
            ))}
        </MenuList>
      </SideBarWrapper>
    </>
  );
}

export default Sidebar;

const SideBarWrapper = styled.div`
  width: 230px;
  /* margin: 10px 0; */
  padding: 15px 18px 113px 10px;
  background-color: #16151c;
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
  width: 170px;
  //margin: 0 20px 636px 0;
`;
