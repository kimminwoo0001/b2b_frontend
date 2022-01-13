import React, { useState, useEffect, useRef, memo } from "react";
import { useTranslation } from "react-i18next";
import styled, { css } from "styled-components";
import Timer from "../../../Components/UtilityComponent/Timer";

const SetInputBox = ({
  type = "text",
  width = "80",
  placeholder = "",
  id = "",
  maxlength = 50,
  onChange,
  timer = 0,
  timeOutFunc,
}) => {
  const { t } = useTranslation();

  return (
    <SearchBoxWrapper width={width}>
      <input
        id={id}
        type="text"
        placeholder={`${placeholder}`}
        onChange={onChange}
        autocapitalize="off"
        className={type}
        maxlength={maxlength}
        autocomplete="off"
      />
      {timer > 0 && <Timer time={timer} timeOutFunc={timeOutFunc} />}
    </SearchBoxWrapper>
  );
};

export default SetInputBox;

const SearchBoxWrapper = styled.div`
  display: flex;
  width: ${(props) => props.width}%;
  height: 36px;
  margin: 0 5px 0 0px;

  padding: 10px 0px 9px 20px;
  border-radius: 20px;
  background-color: #3a3745;

  img {
    width: 24px;
    height: 24px;
    margin: 0 10px 0 0;
    object-fit: contain;
  }
  input {
    width: 90%;
    font-family: NotoSansKR;
    font-size: 15px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    color: #fff;
  }

  .password {
    -webkit-text-security: disc;
  }
`;
