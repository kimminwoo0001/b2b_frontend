import React from "react";
import styled from "styled-components";

function Loading() {
  return (
    // 전체화면 로딩 이미지
    <LoadingImage>
      <img src="Images/Loading.gif" alt="Loading" />
    </LoadingImage>
  );
}

export default Loading;

const LoadingImage = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
  img {
    width: 50px;
    height: 50px;
  }
`;
