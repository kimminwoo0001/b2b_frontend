import React, { memo, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled, { css } from "styled-components";
import EachMatch from "./EachMatch";
import GameReportDetail from "./GameReportDetail";
import axiosRequest from "../../../lib/axiosRequest";
import { SetModalInfo } from "../../../redux/modules/modalvalue";
import { API } from "../../config";
import { API2 } from "../../config";

const GameReportIndex = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.FilterReducer);
  const user = useSelector((state) => state.UserReducer);
  const gamevalue = useSelector((state) => state.GameReportReducer);
  const [indexData, setIndexData] = useState([]);

  useEffect(() => {}, [gamevalue.gameId]);

  useEffect(() => {
    getGameIndexData();
  }, []);

  const getGameIndexData = () => {
    try {
      const url = `${API2}/lolapi/mappingfilter/game`;
      const params = {
        league: filters.league,
        year: filters.year,
        season: filters.season,
        patch: filters.patch,
        team: filters.team,
        token: user.token,
        id: user.id,
      };
      axiosRequest(
        undefined,
        url,
        params,
        function (e) {
          setIndexData(e.game);
          console.log("데이터:", e);
        },
        function (objstore) {
          dispatch(SetModalInfo(objstore)); // 오류 발생 시, Alert 창을 띄우기 위해 사용
        }
      );
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <GameReportIndexWrapper>
      {gamevalue.gameId.length > 0 ? (
        <GameReportDetail
          videoId={gamevalue.gameId}
          platform={gamevalue.platform}
        />
      ) : (
        <>
          {indexData?.map((match, idx) => {
            return (
              <EachMatch
                matchData={match}
                team={filters.team}
                key={match.data + idx}
              />
            );
          })}
          {/* <EachMatch />
          <EachMatch /> */}
        </>
      )}
    </GameReportIndexWrapper>
  );
};

export default memo(GameReportIndex);

const GameReportIndexWrapper = styled.main`
  padding-top: 60px;
  padding-left: 60px;
  font-family: "Spoqa Han Sans";
`;
