import React, { memo, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import EachMatch from "./EachMatch";

const GameReportIndex = () => {
  useEffect(() => {}, []);

  return (
    <GameReportIndexWrapper>
      <EachMatch />
      <EachMatch />
      <EachMatch />
    </GameReportIndexWrapper>
  );
};

export default memo(GameReportIndex);

const GameReportIndexWrapper = styled.main`
  padding-top: 60px;
  padding-left: 60px;

  font-family: "Spoqa Han Sans";
`;
