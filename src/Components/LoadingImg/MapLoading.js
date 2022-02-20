import React from "react";
/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled/macro";

function Loading() {
  return (
    // 영상보고서에 있는 맵 로딩사진
    <LoadingImage>
      <img src="Images/loadingSpinner_purple.gif" alt="Loading" />
    </LoadingImage>
  );
}

export default Loading;

const LoadingImage = styled.div`
  display: flex;
  width: 700px;
  height: 700px;
  justify-content: center;
  align-items: center;
  img {
    width: 50px;
    height: 50px;
  }
`;
