import React, { useState, useEffect, useRef, memo } from "react";
import styled, { css } from "styled-components";
import { useTranslation } from "react-i18next";

const SearchBox = () => {
  return (
    <SearchBoxWrapper>
      <img src="Images/ico_serch.png" alt="alertIcon"></img>
      <input type="text" placeholder="NUNU.GG 검색" />
    </SearchBoxWrapper>
  )
}

export default SearchBox;

const SearchBoxWrapper = styled.div`
  display: flex;
  width: 301px;
  height: 42px;
  margin: 0 0px 11px 0px;
  padding: 9px 146px 9px 23px;
  border-radius: 26px;
  background-color: #23212a;
  visibility: hidden; // 숨김
  img {
    width: 24px;
    height: 24px;
    margin: 0 10px 0 0;
    object-fit: contain;
  }
  input {
    font-family: NotoSansKR;
    font-size: 15px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
  }
`;