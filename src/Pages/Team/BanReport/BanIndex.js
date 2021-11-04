import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { API } from "../../config";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  Pick1,
  Pick2,
  Pick3,
  Pick4,
  Pick5,
  Ban1,
  Ban2,
  Ban3,
  Ban4,
  Ban5,
  GetBanData,
  Baned1,
  Baned2,
  Baned3,
  Baned4,
  Baned5
} from "../../../redux/modules/teambanpick";
import LoadingImg from "../../../Components/LoadingImg/LoadingImg";
import All from "./All";
import qs from "qs";
import axiosRequest from "../../../lib/axiosRequest";


function BanIndex() {
  const filters = useSelector((state) => state.FilterReducer);
  const user = useSelector((state) => state.UserReducer);
  const dispatch = useDispatch();
  const [phase1, setPhase1] = useState();
  const [phase2, setPhase2] = useState();
  const [phase2_1, setPhase2_1] = useState();
  const [phase2_2, setPhase2_2] = useState();
  const [loading, setLoading] = useState(false);
  // side 선택 상태 값
  //ex) all, blue , red
  const [side, setSide] = useState("all");
  //side 상태값에 따라 탭 변환
  const selectSide = {
    all: (
      <All
        phase1={phase1}
        phase2={phase2}
        phase2_1={phase2_1}
        phase2_2={phase2_2}
      />
    ),
    blue: (
      <All
        phase1={phase1}
        phase2={phase2}
        phase2_1={phase2_1}
        phase2_2={phase2_2}
      />
    ),
    red: (
      <All
        phase1={phase1}
        phase2={phase2}
        phase2_1={phase2_1}
        phase2_2={phase2_2}
      />
    )
  };

  useEffect(() => {
    dispatch(GetBanData());
  }, [dispatch]);

  useEffect(() => {
    fetchingBanIndex();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.team, side, filters.patch]);

  //밴지표 전체 데이터 가져오는 함수
  const fetchingBanIndex = async () => {
    setLoading(true);
    const url = `${API}/api/team/pick`;
    const params = {
      league: filters.league,
      year: filters.year,
      season: filters.season,
      patch: filters.patch,
      team: filters.team,
      side: side,
      token: user.token,
      id: user.id
    };

    axiosRequest(url, params, function (e) {
      dispatch(Pick1(e.data.Picks[0].order));
      dispatch(Pick2(e.data.Picks[1].order));
      dispatch(Pick3(e.data.Picks[2].order));
      dispatch(Pick4(e.data.Picks[3].order));
      dispatch(Pick5(e.data.Picks[4].order));
      dispatch(Ban1(e.data.Bans[0].BanInfos));
      dispatch(Ban2(e.data.Bans[1].BanInfos));
      dispatch(Ban3(e.data.Bans[2].BanInfos));
      dispatch(Ban4(e.data.Bans[3].BanInfos));
      dispatch(Ban5(e.data.Bans[4].BanInfos));
      dispatch(Baned1(e.data.Baneds[0].BanInfos));
      dispatch(Baned2(e.data.Baneds[1].BanInfos));
      dispatch(Baned3(e.data.Baneds[2].BanInfos));
      dispatch(Baned4(e.data.Baneds[3].BanInfos));
      dispatch(Baned5(e.data.Baneds[4].BanInfos));

      let phaseArray1 = [];
      Object.keys(e.data.phased.phase1).forEach((key) => {
        phaseArray1.push({
          champion: key,
          value: e.data.phased.phase1[key]
        });
      });

      let phaseArray2 = [];
      Object.keys(e.data.phased.phase2).forEach((key) => {
        phaseArray2.push({
          champion: key,
          value: e.data.phased.phase2[key]
        });
      });

      let phaseArray2_1 = [];
      Object.keys(e.data.phased2.phase1).forEach((key) => {
        phaseArray2_1.push({
          champion: key,
          value: e.data.phased2.phase1[key]
        });
      });

      let phaseArray2_2 = [];
      Object.keys(e.data.phased2.phase2).forEach((key) => {
        phaseArray2_2.push({
          champion: key,
          value: e.data.phased2.phase2[key]
        });
      });

      setPhase1(phaseArray1);
      setPhase2(phaseArray2);
      setPhase2_1(phaseArray2_1);
      setPhase2_2(phaseArray2_2);

    }).finally(setLoading(false))
  };

  if (loading) return <LoadingImg />;

  return (
    <BanIndexWrapper>
      <SideButtons>
        <AllBtn
          className="All"
          onClick={() => setSide("all")}
          changeColor={side === "all"}
        >
          ALL
        </AllBtn>
        <BlueBtn
          className="Blue"
          onClick={() => setSide("blue")}
          changeColor={side === "blue"}
        >
          BLUE
        </BlueBtn>
        <RedBtn
          className="Red"
          onClick={() => setSide("red")}
          changeColor={side === "red"}
        >
          RED
        </RedBtn>
      </SideButtons>
      <div>{selectSide[side]}</div>
    </BanIndexWrapper>
  );
}

export default BanIndex;

const BanIndexWrapper = styled.div``;

const SideButtons = styled.div`
  display: flex;
  padding: 25px 0 19px 0;
  width: 100%;
`;

const AllBtn = styled.button`
  width: 65px;
  height: 27px;
  border-radius: 2px;
  background-color: #3a3745;
  font-family: Poppins;
  font-size: 13px;
  text-align: center;
  color: #6b6979;
  ${(props) =>
    props.changeColor &&
    css`
      background-color: #23212a;
      color: #f04545;
      border: solid 1px #f04545;
    `}
`;

const BlueBtn = styled.button`
  width: 65px;
  height: 27px;
  border-radius: 2px;
  background-color: #3a3745;
  font-family: Poppins;
  font-size: 13px;
  text-align: center;
  color: #6b6979;
  margin: 0 10px 0 10px;
  ${(props) =>
    props.changeColor &&
    css`
      background-color: #23212a;
      color: #f04545;
      border: solid 1px #f04545;
    `}
`;

const RedBtn = styled.button`
  width: 65px;
  height: 27px;
  border-radius: 2px;
  background-color: #3a3745;
  font-family: Poppins;
  font-size: 13px;
  text-align: center;
  color: #6b6979;
  ${(props) =>
    props.changeColor &&
    css`
      background-color: #23212a;
      color: #f04545;
      border: solid 1px #f04545;
    `}
`;
