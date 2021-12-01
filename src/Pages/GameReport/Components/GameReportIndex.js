import React, { memo, useEffect, useState } from "react";
import styled, { css } from "styled-components";

const GameReportIndex = () => {
  useEffect(() => {}, []);

  return (
    <GameReportIndexWrapper>
      <MetaData></MetaData>
      <GameInfoBox></GameInfoBox>
    </GameReportIndexWrapper>
  );
};

export default memo(GameReportIndex);

const GameReportIndexWrapper = styled.main``;

const MetaData = styled.section``;
const GameInfoBox = styled.section`
  background-color: #23212a;
`;
