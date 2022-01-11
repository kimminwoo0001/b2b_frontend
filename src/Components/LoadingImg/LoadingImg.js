import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

function Loading() {
  const filters = useSelector((state) => state.FilterReducer);
  return (
    // 전체화면 로딩 이미지
    <LoadingImage active={filters.loading}>
      <img src="Images/loadingSpinner_purple.gif" alt="Loading" />
    </LoadingImage>
  );
}

export default Loading;

const LoadingImage = styled.div`
  display: ${props => props.active ? "flex" : "none"};
  position: absolute;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.75);
  img {
    width: 50px;
    height: 50px;
  }
`;
