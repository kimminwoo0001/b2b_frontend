import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useDetectOutsideClick } from "../../Components/SelectFilter/useDetectOustsideClick";
import { Language } from "../../redux/modules/locale";

function LocaleDropdown() {
  const lang = useSelector((state) => state.LocaleReducer);
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const [region, setRegion] = useState(lang === "kr" ? "한국어" : "English");
  return (
    <LocaleDropdownWrapper>
      <DropDown className="container">
        <div className="menu-container">
          <button
            onClick={() => {
              setIsActive(!isActive);
            }}
            className="menu-trigger"
          >
            <img src="Images/ico-login-global.png" alt="globalIcon"></img>
            <span className="Label">{region}</span>
            <img
              className="ArrowIcon"
              src="Images/ico-filter-arrow.png"
              alt="arrowIcon"
            />
          </button>
          <nav
            ref={dropdownRef}
            className={`menu ${isActive ? "active" : "inactive"}`}
          >
            <ul>
              <li
                onClick={() => {
                  setRegion("한국어");
                  setIsActive(false);
                  dispatch(Language("kr"));
                  sessionStorage.setItem("i18nextLng", "kr");
                }}
              >
                한국어
              </li>
              <li
                onClick={() => {
                  setRegion("English");
                  setIsActive(false);
                  dispatch(Language("en"));
                  sessionStorage.setItem("i18nextLng", "en");
                }}
              >
                English
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
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
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
    background: rgb(35, 33, 42);
    position: absolute;
    top: 35px;
    right: 0;
    width: 144px;
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
    padding: 0;
    margin: 0;
  }

  .menu li {
    text-decoration: none;
    padding: 15px 20px;
    display: block;
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 11px;
    letter-spacing: -0.55px;
    text-align: left;
    color: rgb(255, 255, 255);
    cursor: pointer;
    :hover {
      background-color: rgb(60, 58, 72);
    }
  }
`;
