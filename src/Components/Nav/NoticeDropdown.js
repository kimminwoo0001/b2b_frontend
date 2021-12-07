import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useDetectOutsideClick } from "../SelectFilter/useDetectOustsideClick";

function NoticeDropdown({ alertDesc, setAlertDesc, setIsOpen }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);

  const dummyAlarm = () => {
    setAlertDesc(t("nav.noData"));
    // setIsOpen(true);
    setIsActive(!isActive);
  };
  return (
    <NoticeDropdownWrapper>
      <DropDown className="container">
        <div className="menu-container">
          <img
            className="Alert"
            src="Images/ico-alarm.png"
            alt="alertIcon"
            onClick={() => dummyAlarm()}
          />
          <nav
            ref={dropdownRef}
            className={`menu ${isActive ? "active" : "inactive"}`}
          >
            <ul>
              <div className="noticeTitle">{t("nav.notice")}</div>
              <li>{alertDesc}</li>
            </ul>
          </nav>
        </div>
      </DropDown>
    </NoticeDropdownWrapper>
  );
}

export default NoticeDropdown;

const NoticeDropdownWrapper = styled.div``;

const DropDown = styled.div`
  margin: 0;
  padding: 0;
  * {
    box-sizing: border-box;
  }

  body {
    font-family: Arial, Helvetica, sans-serif;
  }

  .menu-container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      cursor: pointer;
    }
  }

  .menu-trigger {
    display: flex;
    align-items: center;
    width: 144px;
    height: 33px;
    margin: 0px 0.7px 0 15.3px;
    padding: 5px 11px 4px;
    border-radius: 16px;
    border: solid 1px #3a3745;
  }

  .menu-trigger:hover {
    // box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
  }

  .SelectedLabel {
    font-family: Poppins;
    font-size: 13px;
    text-align: left;
    color: rgb(132, 129, 142);
    width: 180px;
    margin-left: 20px;
  }

  .Label {
    font-family: "Spoqa Han Sans";
    font-size: 12px;
    letter-spacing: -0.6px;
    text-align: left;
    color: rgb(255, 255, 255);
    margin: 0 0px 0 11.4px;
    /* padding-right: 29.6px; */
    width: 350px;
  }

  .ArrowIcon {
    /* position: fixed; */
    /* margin-left: 390px; */
  }

  .ChampIconImg {
    /* position: fixed; */
    margin-left: 13.1px;
  }

  .menu {
    background: #23212a;
    position: absolute;
    top: 46px;
    border-radius: 10px;
    width: 260px;
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
    opacity: 0;
    visibility: hidden;
    transform: translateY(-20px);
    transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
  }

  .menu.active {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  .menu ul {
    list-style: none;
    padding: 8px 10px;
    margin: 0;

    .noticeTitle {
      color: #fff;
      font-size: 18px;
    }
  }

  .menu li {
    height: 31px;
    text-decoration: none;
    margin: 2px;
    padding: 6px 0px;
    display: block;
    color: rgb(255, 255, 255);
    cursor: pointer;
    font-family: "Spoqa Han Sans";
    font-size: 15px;
    line-height: 1.25;
    letter-spacing: normal;
    text-align: left;
    border-radius: 10px;
  }
`;
