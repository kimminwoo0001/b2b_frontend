import React, { memo, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import EachMatch from "./EachMatch";
import GameReportDetail from "./GameReportDetail";
import { useSelector } from "react-redux";

const GameReportIndex = () => {
  useEffect(() => { }, []);
  const gamevalue = useSelector((state) => state.GameReportReducer);

  useEffect(() => {

  }, [gamevalue.gameId])


  return (
    <GameReportIndexWrapper>
      {gamevalue.gameId.length > 0 ?
        <GameReportDetail
          videoId={gamevalue.gameId}
          platform={gamevalue.platform}
        />
        : <>
          <EachMatch />
          <EachMatch />
          <EachMatch />
        </>}

    </GameReportIndexWrapper>
  );
};

export default memo(GameReportIndex);

const GameReportIndexWrapper = styled.main`
  padding-top: 60px;
  padding-left: 60px;
  font-family: "Spoqa Han Sans";
`;
