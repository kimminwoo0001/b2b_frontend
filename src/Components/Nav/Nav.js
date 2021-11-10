import React, { useEffect } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { UserLogout } from "../../redux/modules";

import { useHistory } from "react-router-dom";
import LocaleDropdown from "./LocaleDropdown";
import DataProcess from "../DataProcessing/DataProcess";
import SearchBox from "./SearchBox";

function Nav() {
  // locale 값을 store에 저장된 값을 가져옴
  const lang = useSelector((state) => state.LocaleReducer);
  const user = useSelector((state) => state.UserReducer);
  const { i18n } = useTranslation();
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

  // 로그아웃 함수, 로그아웃 이벤트가 발생되면 session 값을 clear하고 로그인 페이지로 이동시킴
  const handleLogOut = () => {
    sessionStorage.clear();
    dispatch(UserLogout());
    history.push("/login");
  };

  return (
    <NavWrapper>
      <div className="nav-left">
        <div className="nav-flex">
          <img
            className="logo"
            src="/Images/logo.png"
            alt="profile"
            onClick={() => history.push("/")}
          />
          <SearchBox />
        </div>
      </div>
      <div className="nav-mid">
        <DataProcess />
      </div>
      <div className="nav-right">
        <ContentsWrapper>
          <img
            className="Alert"
            src="Images/ico-alarm.png"
            alt="alertIcon"
          ></img>
          <img
            className="LogOut"
            src="Images/ico-logout.png"
            alt="LogoutIcon"
            onClick={() => handleLogOut()}
          ></img>
          <LocaleDropdown />
          <lable>
            {lang === "en" ? `Hello, ${user.id}` : `${user.id} 님 안녕하세요!`}
          </lable>
        </ContentsWrapper>
      </div>
    </NavWrapper>
  );
}

export default Nav;

const NavWrapper = styled.div`
  width: 100%;
  height: 66px;
  padding: 12px 25px 0 0;
  background-color: #16151c;
  border-bottom: 1px solid #484655;
  display: table;
  .nav-left {
    display: table-cell;
    vertical-align: middle;
    .logo {
      width: 158px;
      height: 37px;
      margin: 3px 18px 13px 24px;
      object-fit: contain;
    }
  }

  .nav-flex {
    display: flex;
  }

  .nav-mid {
    display: table-cell;
  }

  .nav-right {
    display: table-cell;
    lable {
      padding-left: 20px;
      font-family: NotoSansKR, Apple SD Gothic Neo;
      font-size: 12px;
      letter-spacing: -0.6px;
      text-align: left;
      color: #ffffff;
    }
  }
`;

const Greet = styled.div`
  display: flex;
  align-items: center;
  justify-content: f;

  div {
    /* width: 160px; */
  }
  .LastUpdate {
    width: 180px;
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 12px;
    letter-spacing: -0.6px;
    text-align: left;
    color: #827f8c;
    margin-left: 10px;
  }
`;

const ContentsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 5px;
  > select {
    background-color: #23212a;
    color: #84818e;
  }

  .Alert {
    margin-left: 20px;
    margin-right: 24.5px;
    cursor: pointer;
  }
  .LogOut {
    margin-right: 20px;
    cursor: pointer;
  }
  > button {
    width: 50px;
    height: 20px;
    /* background-color: red; */
    color: white;
    border: 1px solid black;
  }
`;
