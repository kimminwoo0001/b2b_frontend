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

function sortPhase(arr) {
  return arr.sort(function (a, b) {
    return b.value - a.value;
  });
}

function BanIndex() {
  const filters = useSelector((state) => state.FilterReducer);
  const user = useSelector((state) => state.UserReducer);
  const lang = useSelector((state) => state.LocaleReducer);
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
  const fetchingBanIndex = () => {
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

      const isKor = lang === "kr";

      let phaseArray1 = [];
      Object.keys(e.data.phased[0]).forEach(key => {
        const data = e.data.phased[0]
        phaseArray1.push({
          champion: isKor ? data[key].championKor : data[key].championKor,
          key: key,
          value: data[key].total
        });
      });

      let phaseArray2 = [];
      Object.keys(e.data.phased[1]).forEach(key => {
        const data = e.data.phased[1]
        phaseArray2.push({
          champion: isKor ? data[key].championKor : data[key].championKor,
          key: key,
          value: data[key].total
        });
      });

      let phaseArray2_1 = [];
      Object.keys(e.data.phased2[0]).forEach(key => {
        const data = e.data.phased2[0]
        phaseArray2_1.push({
          champion: isKor ? data[key].championKor : data[key].championKor,
          key: key,
          value: data[key].total
        });
      });

      let phaseArray2_2 = [];
      Object.keys(e.data.phased2[1]).forEach(key => {
        const data = e.data.phased2[1]
        phaseArray2_2.push({
          champion: isKor ? data[key].championKor : data[key].championKor,
          key: key,
          value: data[key].total
        });
      });



      setPhase1(sortPhase(phaseArray1));
      setPhase2(sortPhase(phaseArray2));
      setPhase2_1(sortPhase(phaseArray2_1));
      setPhase2_2(sortPhase(phaseArray2_2));

    }).finally(setLoading(false))
  };

  if (loading) return <LoadingImg />;

  return (
    <BanIndexWrapper>
      <BanIndexTabs>
        <BtnItem
          className="All"
          onClick={() => setSide("all")}
          changeColor={side === "all"}
        >
          <div>
            <span>ALL</span>
          </div>
        </BtnItem>

        <BtnItem
          className="Blue"
          onClick={() => setSide("blue")}
          changeColor={side === "blue"}
        >
          <div>
            <span>BLUE</span>
          </div>
        </BtnItem>

        <BtnItem
          className="Red"
          onClick={() => setSide("red")}
          changeColor={side === "red"}
        >
          <div>
            <span>RED</span>
          </div>
        </BtnItem>
        <LastMargin></LastMargin>
      </BanIndexTabs>
      <div>{selectSide[side]}</div>
    </BanIndexWrapper>
  );
}

export default BanIndex;

const BanIndexWrapper = styled.div`
`;

const BanIndexTabs = styled.div`
  display: flex;
  height: 62px;
  // margin-top: 21.5px;
`;

const LineMargin = styled.div`
  width: 10px;
  border-bottom: solid 1px #433f4e;
`;

const LastMargin = styled.div`
  width:90%;
  border-bottom: solid 1px #433f4e;
`;

const BtnItem = styled.button`
  display: flex;
  align-items: center;
  width: auto;
  border-bottom: solid 1px #433f4e;
  white-space: nowrap;

  div {
    padding: 10px 15px;
  }

  :hover {
    div {
      padding: 10px 15px;
      border-radius: 10px;
      background-color : #26262C;
    }
  }
  
  span {
    height: 22px;
    font-family: SpoqaHanSansNeo;
    font-size: 18px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    padding-bottom: 18px;
    border-bottom: solid 1px ${(props) => props.changeColor ? `#fff` : `#433f4e;`};
    color: ${(props) => (props.changeColor ? `#fff` : `#84818e`)};
  }
`;

const BlueBtn = styled.button`
display: flex;
padding: 20px 0 20px 0;
align-items: center;
width: auto;
border-bottom: solid 1px #433f4e;
span {
  height: 22px;
  font-family: SpoqaHanSansNeo;
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: ${(props) => (props.changeColor ? `#fff` : `#84818e`)};
}
${(props) =>
    props.changeColor &&
    css`
  border-bottom: solid 1px #fff;
  `}
`;

const RedBtn = styled.button`
display: flex;
padding: 20px 0 20px 0;
align-items: center;
width: auto;
border-bottom: solid 1px #433f4e;
span {
  height: 22px;
  font-family: SpoqaHanSansNeo;
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: ${(props) => (props.changeColor ? `#fff` : `#84818e`)};
}
${(props) =>
    props.changeColor &&
    css`
  border-bottom: solid 1px #fff;
  `}
`;
