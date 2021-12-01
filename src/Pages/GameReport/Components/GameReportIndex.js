import React, { memo, useEffect, useState } from "react";
import styled, { css } from "styled-components";

const GameReportIndex = () => {
  useEffect(() => {}, []);

  return (
    <GameReportIndexWrapper>
      <MetaData>
        <Round>LCK Spring 1R 1주차 3SET</Round>
        <Date>2022.02.03 FRI 19:00</Date>
      </MetaData>
      <GameInfoBox></GameInfoBox>
    </GameReportIndexWrapper>
  );
};

export default memo(GameReportIndex);

const GameReportIndexWrapper = styled.main`
  padding: 60px;
  /* margin: 0 auto; */
`;

const GameInfoBox = styled.section`
  background-color: #23212a;
  width: 1050px;
  height: 113px;
  border-radius: 20px;
`;

const MetaData = styled.section`
  color: #fff;
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

const Round = styled.div`
  font-weight: bold;
  margin-right: 5px;
  font-size: 24px;
`;

const Date = styled.div`
  font-size: 20px;
`;
