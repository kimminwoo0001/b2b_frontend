import React, { useState } from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled/macro";
import secToMS from "../../../../../../lib/secToMS";

const StatusBox2 = () => {
  const gamevalue = useSelector((state) => state.GameReportReducer);

  return (
    <StatusContainer>
      <FlexBox>
        <StatusDesc>
          {/* <StatusTime>
            {gamevalue.selectedStatusTime > 0 &&
              secToMS(gamevalue.selectedStatusTime)}
          </StatusTime> */}
          <StatusText>{gamevalue.selectedStatusText}</StatusText>
        </StatusDesc>
      </FlexBox>
      <ChampStatContainer></ChampStatContainer>
    </StatusContainer>
  );
};

export default StatusBox2;
const StatusContainer = styled.div`
  width: 119px;
  height: 91px;
  margin: 11px 20px 15.5px 10px;
`;

const FlexBox = styled.div`
  display: flex;
  margin-top: 13px;
`;

const StatusImgBox = styled.div`
  width: 36px;
  height: 36px;
  margin: 0 5px 0 0;
  object-fit: contain;
  background-color: #fff;
`;

const StatusDesc = styled.div`
  width: 98px;
  height: 21px;;
  margin: 0px 0px 11px 0px;
  display flex;
`;

const StatusTime = styled.div`
  height: 13px;
  width: 100%;
  margin: 0 6px 0 0;
  font-family: SpoqaHanSansNeo;
  font-size: 13px;
  font-weight: 300;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.69;
  letter-spacing: normal;
  text-align: left;
  color: #fff;
`;

const StatusText = styled.div`
  height: 19px;
  margin: 4px 0 0;
  font-family: SpoqaHanSansNeo;
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  text-align: left;
  color: #fff;
  white-space: nowrap;
`;

const ChampStatContainer = styled.div`
  width: 119px;
  height: 41px;
  margin: 0px 20px 15.5px 0px;
  background-color: #000;
`;
