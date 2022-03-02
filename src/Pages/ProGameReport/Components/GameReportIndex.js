import React, { memo, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled/macro";
import EachMatch from "./EachMatch.jsx";
import GameReportDetail from "./GameReportDetail";
import axiosRequest from "../../../lib/axios/axiosRequest";
import { SetModalInfo } from "../../../redux/modules/modalvalue";
import { API } from "../../config";
import { API2 } from "../../config";
import { Loading } from "../../../redux/modules/filtervalue.js";

const GameReportIndex = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.FilterReducer);
  const user = useSelector((state) => state.UserReducer);
  const gamevalue = useSelector((state) => state.GameReportReducer);
  const [indexData, setIndexData] = useState([]);

  useEffect(() => { }, [gamevalue.gameId]);

  useEffect(() => {
    getGameIndexData();
  }, [filters.team, filters.patch]);

  const getGameIndexData = () => {
    try {
      dispatch(Loading(true));
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
          dispatch(Loading(false));
        },
        function (objstore) {
          dispatch(SetModalInfo(objstore)); // 오류 발생 시, Alert 창을 띄우기 위해 사용
          dispatch(Loading(false));
        }
      );
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <GameReportIndexWrapper>
      {indexData?.map((match, idx) => {
        return (
          <EachMatch matchData={match} team={filters.team} key={idx} />
        );
      })}
    </GameReportIndexWrapper>
  );
};

export default memo(GameReportIndex);

const GameReportIndexWrapper = styled.main`
  padding-top: 60px;
  padding-left: 60px;
  font-family: "Spoqa Han Sans";
`;
