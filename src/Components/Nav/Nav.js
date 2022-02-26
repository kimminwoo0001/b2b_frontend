import React, { useEffect, useState } from "react";
/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled/macro";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { UserLogout } from "../../redux/modules";
import { API } from "../../Pages/config";
import { useNavigate } from "react-router-dom";
import LocaleDropdown from "./LocaleDropdown";
import DataProcess from "../DataProcessing/DataProcess";
import SearchBox from "./SearchBox";
import AlertModal from "../UtilityComponent/AlertModal";
import axiosRequest from "./../../lib/axios/axiosRequest"
import NoticeDropdown from "./NoticeDropdown";
import { Loading } from "../../redux/modules/filtervalue";
import { goHome, goLogin } from "../../lib/pagePath";

function Nav() {
  // locale 값을 store에 저장된 값을 가져옴
  const lang = useSelector((state) => state.LocaleReducer);
  const user = useSelector((state) => state.UserReducer);
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { t } = useTranslation();
  const [alertDesc, setAlertDesc] = useState("");
  const [isOpen, setIsOpen] = useState(false);

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
  const handleLogOut = async () => {
    dispatch(Loading(true))
    const url = `${API}/lolapi/logout`;
    const info = `id=${user.id}&charge_time=${user.charge_time}&lang=${lang}`;
    axiosRequest("POST", url, info, function (e) {
      dispatch(Loading(false))
      sessionStorage.clear();
      dispatch(UserLogout());
      navigate(goLogin)
    });
  };

  // const dummyAlarm = () => {
  //   setAlertDesc("새로운 알림이 없습니다.");
  //   setIsOpen(true);
  // };

  return (
    <>
      {/* <AlertModal desc={alertDesc} isOpen={isOpen} setIsOpen={setIsOpen} />/ */}
      <NavWrapper>
        <div className="nav-left">
          <div className="nav-flex">
            <img
              className="logo"
              src="/Images/logo.png"
              alt="profile"
              onClick={() => navigate(goHome)}
            />
            <SearchBox />
          </div>
        </div>
        <div className="nav-mid">
          <DataProcess />
        </div>
        <div className="nav-right">
          <ContentsWrapper>
            {/* <div className="icon">
              <img
                className="setting"
                src="Images/ico_setting.svg"
                alt="settingIcon"
              ></img>
            </div> */}
            <div className="icon">
              <NoticeDropdown
                alertDesc={alertDesc}
                setAlertDesc={setAlertDesc}
                setIsOpen={setIsOpen}
              />
            </div>
            <div className="icon">
              <LocaleDropdown />
            </div>
            <div className="text" onClick={() => handleLogOut()}>
              <lable>
                {user.id.length > 0
                  ? `${t("nav.logout")}`
                  : `${t("nav.login")}`}
              </lable>
            </div>
          </ContentsWrapper>
        </div>
      </NavWrapper>
    </>
  );
}

export default Nav;

const NavWrapper = styled.div`
  width: 100%;
  height: 66px;
  padding: 12px 25px 0 0;
  background-color: #16151c;
  border-bottom: 1px solid #484655;
  display: flex;
  position: relative;
  .nav-left {
    display: table-cell;
    vertical-align: middle;
    width: auto;
    position: absolute;
    left: 0;
    .logo {
      width: 158px;
      height: 37px;
      margin: 3px 18px 13px 24px;
      object-fit: contain;
      cursor: pointer;
    }
  }

  .nav-flex {
    display: flex;
  }

  .nav-mid {
    position: absolute;
    left: 43%;
    top: 40%;
  }

  .nav-right {
    position: absolute;
    right: 1%;
  }
`;
const ContentsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  div {
    display: flex;
    width: 40px;
    height: 40px;
    align-items: center;
    white-space: nowrap;
    cursor: pointer;
    border-radius: 50px;
    justify-content: center;
    margin: 0 1px;
  }

  .icon:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  .text {
    width: auto;
    height: 40px;
    border-radius: 16px;
    margin-left: 17px;
    lable {
      padding-left: 0px;
      margin: 4px 13px;
      font-family: NotoSansKR;
      font-size: 16px;
      font-weight: bold;
      font-stretch: normal;
      font-style: normal;
      line-height: normal;
      letter-spacing: normal;
      text-align: left;
      color: #fff;
      cursor: pointer;
    }
    :hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
  }

  > select {
    // background-color: #23212a;
    color: #84818e;
  }

  .setting {
    cursor: pointer;
  }

  > button {
    width: 50px;
    height: 20px;
    color: white;
    border: 1px solid black;
  }
`;
