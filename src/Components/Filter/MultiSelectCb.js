import React, { memo } from 'react';
import styled, { css } from "styled-components";
import { useSelector, useDispatch } from "react-redux";


const MultiSelectCb = memo(({ idx, filterData, mapData, pngPath, clickEvent }) => {
  return (
    <Selecter
      key={idx}
      isChecked={
        filterData?.includes(mapData) ? true : false
      }
      onClick={() => {
        clickEvent()
      }}
    >
      <input
        type="checkbox"
        checked={
          filterData?.includes(mapData) ? true : false
        }
        readOnly
      />
      {/*
        pngPath &&
        <img
          className="IconImg"
          width="14px"
          height="14px"
          src={`Images/${pngPath.toLowerCase()}.png`}
          alt="Icon"
        />
      */}
      <span>{mapData === "11.6" ? "11.6 (P.O)" : mapData}</span>
    </Selecter>
  );
});

export default MultiSelectCb;

const Selecter = styled.div`
  display: flex;
  align-items: center;
  padding: 4.5px 12px;
  width: 100%;
  height: 25px;
  color: #84818e;
  cursor: pointer;
  ${(props) =>
    props.isChecked &&
    css`
      color: rgb(255, 255, 255);
      background-color: rgb(35, 34, 43);
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
    width: 12px;
    height: 12px;

    background-clip: content-box;
    border: 1.5px solid rgb(72, 70, 85);
    border-radius: 2px;
    background-color: transparent;

    margin-right: 8px;

    &:checked {
      background-color: #f04545;
      border: #f04545;
      border-radius: 2px;
      background: url("/Images/check.svg") #f04545 no-repeat 2.5px 4px/5.5px
        4.5px;
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
    margin: 3px 0 2px 5px;
    font-family: SpoqaHanSansNeo;
    font-size: 15px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.47;
    letter-spacing: normal;
    text-align: left;
    color: #fff;
  }
`;