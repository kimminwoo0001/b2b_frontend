import React, { memo } from 'react';
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
        onClick={() =>
          deleteBtn()
        }
      />
      <span>
        &nbsp;{data}
      </span>
    </Selected>
  );
})

export default SelectedData;

const Selected = styled.div`
display: inline-block;
height: 42px;
margin: 5px 10px 0 0;
padding: 11px 20px;
border-radius: 16px;
background-color: #5942ba;
color: #fff;
img {
  cursor: pointer;
  object-fit: contain;
}
`;
