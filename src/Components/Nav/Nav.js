import React, { useEffect } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { UserLogout } from "../../redux/modules";

import { useHistory } from "react-router-dom";
import LocaleDropdown from "../../Pages/Login/LocaleDropdown";
import DataProcess from "../DataProcessing/DataProcess";

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
      <Greet>
        <div>
          {lang === "en" ? `Hello, ${user.id}` : `${user.id} 님 안녕하세요!`}
        </div>
        {/* <div>{t("title")}</div> */}
        {/* <div className="LastUpdate"></div> */}
        <DataProcess />
      </Greet>

      <ContentsWrapper>
        {/* <input
          type="text"
          placeholder="리그, 팀명 및 선수를 검색하세요"
        ></input> */}
        {/* <select
          onChange={(e) => {
            dispatch(Language(e.target.value));
            sessionStorage.setItem("i18nextLng", e.target.value);
          }}
        >
          <option value="kr">한국어</option>
          <option value="en">English</option>
        </select> */}
        <LocaleDropdown />
        <img className="Alert" src="Images/ico-alarm.png" alt="alertIcon"></img>
        <img
          className="LogOut"
          src="Images/ico-logout.png"
          alt="LogoutIcon"
          onClick={() => handleLogOut()}
        ></img>
      </ContentsWrapper>
    </NavWrapper>
  );
}

export default Nav;

const NavWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  height: 48.5px;
  width: 100%;
  border-bottom: 1px solid #3b3945;
  /* position: sticky;
  top: 4px; */
`;

const Greet = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  div {
    /* width: 160px; */

    margin: 0px 0px 0px 20px;
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 12px;
    letter-spacing: -0.6px;
    text-align: left;
    color: #ffffff;
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
  align-items: center;
  justify-content: center;
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
  input {
    width: 306px;
    height: 32px;
    background-color: #2f2d38;
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 13px;
    letter-spacing: -0.65px;
    text-align: left;
    color: #84818e;
    margin-right: 24.5px;
    padding: 6px 0 6px 12px;
    background-image: url("Images/ico-champ-search.png");
    background-repeat: no-repeat;
    background-position: 280px center;
  }
  > button {
    width: 50px;
    height: 20px;
    /* background-color: red; */
    color: white;
    border: 1px solid black;
  }
`;
