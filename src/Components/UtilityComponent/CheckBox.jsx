import React, { memo, useEffect } from "react";
import styled, { css } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

const CheckBox = memo(
  ({ key, text, checked, clickEvent, radioBtn = false }) => {
    const { t } = useTranslation();

    return (
      <>
        <Selecter
          key={key}
          isChecked={checked}
          radioBtn={radioBtn}
          onClick={() => {
            clickEvent();
          }}
        >
          <input type="checkbox" checked={checked} readOnly />
          <span>{text}</span>
        </Selecter>
      </>
    );
  }
);

export default CheckBox;

const Selecter = styled.div`
  display: flex;
  align-items: center;
  margin: 5px 0;
  padding-left: 5px;
  width: 100%;
  height: 30px;
  color: #84818e;
  cursor: pointer;

  ${
    // (props) =>
    //   props.isChecked &&
    //   css`
    //     color: rgb(255, 255, 255);
    //     background-color: rgba(22, 21, 28, 0.5);
    //     border-radius: 10px;`
    ""
  }

  ${(props) =>
    !props.isChecked && props.radioBtn
      ? css`
          color: rgb(255, 255, 255);
          opacity: 0.3;
          border-radius: 10px;
        `
      : css`
          color: rgb(255, 255, 255);
          border-radius: 10px;
        `}


  ${(props) =>
    props.noTeamSelected &&
    css`
      opacity: 1;
    `}

    ${(props) =>
    props.noPlayerSelected &&
    !props.noTeamSelected &&
    css`
      opacity: 1;
    `}



  > .Version {
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 11px;
    letter-spacing: -0.55px;
    text-align: left;
  }
  > input[type="checkbox"] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;

    display: inline-block;
    width: 24px;
    height: 24px;

    background-clip: content-box;
    background: ${(props) =>
        props.radioBtn
          ? `url("/Images/btn_radio_off.svg")`
          : `url("/Images/btn_check_off.svg")`}
      no-repeat;
    margin-right: 8px;

    &:checked {
      background-color: #5942ba;
      border: #5942ba;
      border-radius: 2px;
      background: ${(props) =>
          props.radioBtn
            ? `url("/Images/btn_radio_on.svg")`
            : `url("/Images/btn_check_on.svg")`}
        no-repeat;
      float: right;
    }

    &:focus {
      outline: none !important;
    }
  }

  .IconImg {
    margin: 0 8px 0 4px;
  }

  span {
    height: 19px;
    margin: 3px 0 2px 0px;
    font-family: SpoqaHanSansNeo;
    font-size: 15px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.42;
    letter-spacing: normal;
    text-align: left;
    color: #fff;
  }

  :hover {
    border-radius: 10px;
    background-color: #3a3745;
  }
`;
