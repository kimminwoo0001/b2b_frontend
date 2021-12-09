import React, { useState } from "react";
import styled, { css } from "styled-components";

const StatusBox2 = () => {
  const [spell1, setSpell1] = useState(false);
  const [spell2, setSpell2] = useState(false);

  return (
    <StatusContainer>
      <FlexBox>
        <StatusImgBox></StatusImgBox>
        <StatusDesc>
          <StatusTime>05:32</StatusTime>
          <StatusText>인베이드 중</StatusText>
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
  width: 72px;
  height: 36px;
  margin: 0px 0px 11px 0px;
`;

const StatusTime = styled.div`
  height: 13px;
  width: 100%;
  margin: 0 0 0 0;
  font-family: SpoqaHanSansNeo;
  font-size: 10px;
  font-weight: 300;
  font-stretch: normal;
  font-style: normal;
  line-height: 2.2;
  letter-spacing: normal;
  text-align: left;
  color: #fff;
`;

const StatusText = styled.div`
  height: 19px;
  margin: 4px 0 0;
  font-family: SpoqaHanSansNeo;
  font-size: 15px;
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
  background-color: #f0f;
`;
