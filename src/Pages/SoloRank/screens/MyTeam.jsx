/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled/macro";
import MTHeader from "../Component/MTHeader";
import MTContent from "../Component/Common/SRContent";
import { API } from "../../config";
import { useState } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import axiosRequest from "../../../lib/axios/axiosRequest";
import { Loading } from "../../../redux/modules/filtervalue";
import { SetModalInfo } from "../../../redux/modules/modalvalue";

const MyTeam = () => {
  const [selectedDay, setSelectedDay] = useState("30");
  const [headerInfo, setheaderInfo] = useState([]);
  const [playerInfo, setPlayerInfo] = useState([]);
  const [myTeamName, setMyTeamName] = useState("");
  const user = useSelector((state) => state.UserReducer);
  const lang = useSelector((state) => state.LocaleReducer);
  const dispatch = useDispatch();

  const getMyTeamSoloRankInfo = () => {
    const url = `${API}/lolapi/solorank/teamlist`;
    const params = {
      days: selectedDay,
      token: user.token,
    };
    axiosRequest(
      undefined,
      url,
      params,
      function (e) {
        setheaderInfo([
          {
            logo: `Images/ico-league-${"LCK"}.png`,
            text: e.league,
          },
          { logo: `Images/TeamLogo/${e.team}.png` },
          { text: e.team },
          // { text: "" },
          { text: e.playerCount + (lang === "ko" ? "명" : "") },
        ]);
        setPlayerInfo(e.players);
        setMyTeamName(e.team);
        dispatch(Loading(false));
      },
      function (objStore) {
        dispatch(SetModalInfo(objStore)); // 오류 발생 시, Alert 창을 띄우기 위해 사용
        dispatch(Loading(false));
      }
    );
  };

  useState(() => {
    getMyTeamSoloRankInfo();
  }, [selectedDay]);

  return (
    <>
      {/* 팀 정보 헤더 */}
      <MTHeader headerInfo={headerInfo} />

      {/* 팀 선수 테이블 */}
      <MTContent
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        playerInfo={playerInfo}
        myTeamName={myTeamName}
        isMyTeamTab={true}
        getInfoFunc={getMyTeamSoloRankInfo}
      />
    </>
  );
};

export default MyTeam;
