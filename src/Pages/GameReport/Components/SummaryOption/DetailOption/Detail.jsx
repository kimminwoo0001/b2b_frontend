import React from "react";
import styled, { css } from "styled-components";

const Detail = () => {
  return (
    <DetailContainer>
      <DetailChampStatus></DetailChampStatus>
      <DetailChampTimeStatus></DetailChampTimeStatus>
      <DetailChampTimeLine></DetailChampTimeLine>
    </DetailContainer>
  );
};

export default Detail;

const DetailContainer = styled.div`
  width: 702px;
  height: 225px;
  display: block;
  background-color: #ff0;
`;

const DetailChampStatus = styled.div`
  width: 702px;
  height: 120px;
  display: flex;
  background-color: #fff;
`;

const DetailChampTimeStatus = styled.div`
  width: 702px;
  height: 86px;
  display: flex;
  background-color: #912345;
`;

const DetailChampTimeLine = styled.div`
  width: 702px;
  height: 19px;
  display: flex;
  background-color: #515353;
`;
