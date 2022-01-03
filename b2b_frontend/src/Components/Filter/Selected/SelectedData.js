import React, { memo } from "react";
import styled, { css } from "styled-components";
import { useSelector, useDispatch } from "react-redux";

const SelectedData = memo(({ idx, data, deleteBtn }) => {
  return (
    <Selected>
      <img
        className="deleteIcon"
        width="18px"
        height="18px"
        src={`Images/ic_close_wh_18.png`}
        alt="delete icon"
        onClick={() => deleteBtn()}
      />
      <span>&nbsp;{data}</span>
    </Selected>
  );
});

export default SelectedData;

const Selected = styled.div`
  display: inline-block;
  margin: 5px 5px 0 0;
  padding: 6px 10px 6px 5px;
  border-radius: 10px;
  background-color: #5942ba;
  color: #fff;
  img {
    width: 18px;
    height: 18px;
    object-fit: contain;
    vertical-align: top;
    cursor: pointer;
  }
  span {
    height: 18px;
    font-family: SpoqaHanSansNeo;
    font-size: 14.5px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 18px;
    letter-spacing: normal;
    text-align: left;
    color: #fff;
  }
`;
