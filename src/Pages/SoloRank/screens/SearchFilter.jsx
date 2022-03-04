import React, { useState } from "react";
/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled/macro";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch, batch } from "react-redux";
import MTContent from "../Component/Common/SRContent";
import { Loading } from "../../../redux/modules/filtervalue";
import { SetModalInfo } from "../../../redux/modules/modalvalue";
import axiosRequest from "../../../lib/axios/axiosRequest";
import { API } from "../../config";
import TopFilter from "../../../Components/Filter/TopFilter";
import FSHeader from "../Component/FSHeader";

const SearchFilter = () => {
  const [selectedDay, setSelectedDay] = useState("30");
  const [playerInfo, setPlayerInfo] = useState([]);
  const [myTeamName, setMyTeamName] = useState("");

  const user = useSelector((state) => state.UserReducer);
  const lang = useSelector((state) => state.LocaleReducer);
  const dispatch = useDispatch();

  const getSeachFilterPlayer = (team, patch) => {
    const url = `${API}/lolapi/solorank/filterlist`;
    const params = {
      team: team[0],
      patch: patch,
      days: selectedDay,
      token: user.token,
    };
    axiosRequest(
      undefined,
      url,
      params,
      function (e) {
        if (Object.keys(e).length !== 0) {
          setPlayerInfo(e.players);
          setMyTeamName(e.team);
          dispatch(Loading(false));
        }
      },
      function (objStore) {
        dispatch(SetModalInfo(objStore)); // 오류 발생 시, Alert 창을 띄우기 위해 사용
        dispatch(Loading(false));
      }
    );
  };

  return (
    <>
      <FSHeader getSeachFilterPlayer={getSeachFilterPlayer} />
      {/* 팀 선수 테이블 */}
      <MTContent
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        playerInfo={playerInfo}
        myTeamName={myTeamName}
      />
    </>
  );
};

export default SearchFilter;
