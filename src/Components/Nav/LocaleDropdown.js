import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled/macro";
import { useDetectOutsideClick } from "../SelectFilter/useDetectOustsideClick";
import { Language } from "../../redux/modules/locale";

function LocaleDropdown() {
  const lang = useSelector((state) => state.LocaleReducer);
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const [region, setRegion] = useState(lang === "ko" ? "한국어" : "English");
  return (
    <LocaleDropdownWrapper>
      <DropDown className="container">
        <div className="menu-container">
          <img src="Images/ico_global.png" alt="globalIcon" onClick={() => {
            setIsActive(!isActive);
          }} />
          {/* <button
            onClick={() => {
              setIsActive(!isActive);
            }}
            className="menu-trigger"
          >
            
            <span className="Label">{region}</span>
            <img
              className="ArrowIcon"
              src="Images/ico-filter-arrow.png"
              alt="arrowIcon"
            />
          </button> */}
          <nav
            ref={dropdownRef}
            className={`menu ${isActive ? "active" : "inactive"}`}
          >
            <ul>
              <li
                onClick={() => {
                  setRegion("English");
                  setIsActive(false);
                  dispatch(Language("en"));
                  sessionStorage.setItem("i18nextLng", "en");
                }}
              >
                ENG
              </li>
              <li
                onClick={() => {
                  setRegion("한국어");
                  setIsActive(false);
                  dispatch(Language("ko"));
                  sessionStorage.setItem("i18nextLng", "ko");
                }}
              >
                한국어
              </li>
            </ul>
          </nav>
        </div>
      </DropDown>
    </LocaleDropdownWrapper>
  );
}

export default LocaleDropdown;

const LocaleDropdownWrapper = styled.div``;

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
    font-family: NotoSansKR, Apple SD Gothic Neo;
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
    width: 90px;
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
    padding: 8px 5px;
    margin: 0;
  }

  .menu li {
    height: 31px;
    text-decoration: none;
    margin: 2px 0;
    padding: 6px 0px;
    display: block;
    color: rgb(255, 255, 255);
    cursor: pointer;
    font-family: SpoqaHanSansNeo;
    font-size: 15px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.25;
    letter-spacing: normal;
    text-align: center;
    color: #fff;
    border-radius: 10px;
    
    :hover {
      background-color: rgba(255, 255, 255,0.1);
    }
  }
`;
