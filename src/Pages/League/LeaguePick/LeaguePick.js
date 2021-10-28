import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import axios from "axios";
import { API } from "../../config";
import { useSelector } from "react-redux";
import LoadingImg from "../../../Components/LoadingImg/LoadingImg";
import qs from "qs";
import TabforTop from "./TabforTop";


function LeaguePick() {
  const filters = useSelector((state) => state.FilterReducer);
  const user = useSelector((state) => state.UserReducer);
  const [loading, setLoading] = useState(false);
  const [positionTab, setPositionTab] = useState(0);
  const [queryPosition, setQueryPosition] = useState();
  const [importantPicks, setImportantPicks] = useState();
  const [pickDifference, setPickDifference] = useState();
  const [uniquePick, setUniquePick] = useState();
  const [tier, setTier] = useState();

  // 리그 보고서 => 픽에 있는 Top, JG ,Mid, Adc, Sup 텝
  const positionTabs = {
    0: (
      <TabforTop
        importantPicks={importantPicks}
        pickDifference={pickDifference}
        uniquePick={uniquePick}
        tier={tier}
      />
    ),
    1: (
      <TabforTop
        importantPicks={importantPicks}
        pickDifference={pickDifference}
        uniquePick={uniquePick}
        tier={tier}
      />
    ),
    2: (
      <TabforTop
        importantPicks={importantPicks}
        pickDifference={pickDifference}
        uniquePick={uniquePick}
        tier={tier}
      />
    ),
    3: (
      <TabforTop
        importantPicks={importantPicks}
        pickDifference={pickDifference}
        uniquePick={uniquePick}
        tier={tier}
      />
    ),
    4: (
      <TabforTop
        importantPicks={importantPicks}
        pickDifference={pickDifference}
        uniquePick={uniquePick}
        tier={tier}
      />
    )
  };

  useEffect(() => {
    fetchingPickData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, queryPosition]);

  useEffect(() => {
    convertPosition();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [positionTab]);

  // 선택된 탭에 따라서 백엔드 요청에 쓰일 position 저장해주는 함수
  const convertPosition = () => {
    if (positionTab === 0) {
      setQueryPosition("top");
    } else if (positionTab === 1) {
      setQueryPosition("jng");
    } else if (positionTab === 2) {
      setQueryPosition("mid");
    } else if (positionTab === 3) {
      setQueryPosition("bot");
    } else if (positionTab === 4) {
      setQueryPosition("sup");
    }
  };

  // week 데이터 fetch 함수
  const fetchingPickData = async () => {
    setLoading(true);

    const result = await axios.request({
      method: "GET",
      url: `${API}/api/league/pick`,
      params: {
        league: filters.league,
        year: filters.year,
        season: filters.season,
        patch: filters.patch,
        position: queryPosition,
        token: user.token,
        id: user.id,
      },
      paramsSerializer: (params) => {
        return qs.stringify(params, { arrayFormat: "repeat" });
      }
    });

    //주요픽 데이터 저장
    setImportantPicks(result.data.importantPick);
    //주요픽간의전적 저장
    setPickDifference(result.data.pickDiff);
    //챔피언 티어 저장
    setTier(result.data.championTier);
    //유니크픽 데이터 저장
    setUniquePick(result.data.uniquePick);

    setLoading(false);
  };

  if (loading) return <LoadingImg />;

  return (
    <LeaguePickWrapper>
      <LeaguePickTabs changeColor={positionTab}>
        <TopTab
          onClick={() => setPositionTab(0)}
          changeColor={positionTab === 0}
        >
          <img src="Images/ico-position-top.png" alt="positionIcon"></img>
          <div>TOP</div>
        </TopTab>
        <LineMargin></LineMargin>
        <JngTab
          onClick={() => setPositionTab(1)}
          changeColor={positionTab === 1}
        >
          <img src="Images/ico-position-jng.png" alt="positionIcon"></img>
          <div>JG</div>
        </JngTab>
        <LineMargin></LineMargin>
        <MidTab
          onClick={() => setPositionTab(2)}
          changeColor={positionTab === 2}
        >
          <img src="Images/ico-position-mid.png" alt="positionIcon"></img>
          <div>MID</div>
        </MidTab>
        <LineMargin></LineMargin>
        <BotTab
          onClick={() => setPositionTab(3)}
          changeColor={positionTab === 3}
        >
          <img src="Images/ico-position-bot.png" alt="positionIcon"></img>
          <div>ADC</div>
        </BotTab>
        <LineMargin></LineMargin>
        <SupTab
          onClick={() => setPositionTab(4)}
          changeColor={positionTab === 4}
        >
          <img src="Images/ico-position-sup.png" alt="positionIcon"></img>
          <div>SUP</div>
        </SupTab>
        <LastMargin></LastMargin>
      </LeaguePickTabs>
      <TabContents>{positionTabs[positionTab]}</TabContents>
    </LeaguePickWrapper>
  );
}

export default LeaguePick;

const LeaguePickWrapper = styled.div`
  height: calc(100vh - 151px);
`;

const LeaguePickTabs = styled.div`
  display: flex;
  margin-top: 21.5px;
`;
const LineMargin = styled.div`
  width: 6px;
  border-bottom: solid 1px rgb(124, 119, 139);
`;

const LastMargin = styled.div`
  width: 445px;
  border-bottom: solid 1px rgb(124, 119, 139);
`;

const TopTab = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 125px;
  height: 36px;
  border: solid 1px rgb(67, 63, 78);
  color: rgb(132, 129, 142);
  border-bottom: 1px solid rgb(124, 119, 139);
  ${(props) =>
    props.changeColor &&
    css`
      color: rgb(255, 255, 255);
      border-top: solid 1px rgb(124, 119, 139);
      border-right: solid 1px rgb(124, 119, 139);
      border-left: solid 1px rgb(124, 119, 139);
      border-bottom: none;
    `}

  img {
    width: 14px;
    height: 14px;
  }
  div {
    margin-left: 8px;
    width: 26px;
    font-family: Poppins;
    font-size: 13px;
    text-align: left;
  }
`;

const JngTab = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 125px;
  height: 36px;
  border: solid 1px rgb(67, 63, 78);
  color: rgb(132, 129, 142);
  border-bottom: 1px solid rgb(124, 119, 139);
  ${(props) =>
    props.changeColor &&
    css`
      color: rgb(255, 255, 255);
      border-top: solid 1px rgb(124, 119, 139);
      border-right: solid 1px rgb(124, 119, 139);
      border-left: solid 1px rgb(124, 119, 139);
      border-bottom: none;
    `}

  img {
    width: 14px;
    height: 14px;
  }
  div {
    margin-left: 8px;
    width: 26px;
    font-family: Poppins;
    font-size: 13px;
    text-align: left;
  }
`;

const MidTab = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 125px;
  height: 36px;
  border: solid 1px rgb(67, 63, 78);
  color: rgb(132, 129, 142);
  border-bottom: 1px solid rgb(124, 119, 139);
  ${(props) =>
    props.changeColor &&
    css`
      color: rgb(255, 255, 255);
      border-top: solid 1px rgb(124, 119, 139);
      border-right: solid 1px rgb(124, 119, 139);
      border-left: solid 1px rgb(124, 119, 139);
      border-bottom: none;
    `}

  img {
    width: 14px;
    height: 14px;
  }
  div {
    margin-left: 8px;
    width: 26px;
    font-family: Poppins;
    font-size: 13px;
    text-align: left;
  }
`;

const BotTab = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 125px;
  height: 36px;
  border: solid 1px rgb(67, 63, 78);
  color: rgb(132, 129, 142);
  border-bottom: 1px solid rgb(124, 119, 139);
  ${(props) =>
    props.changeColor &&
    css`
      color: rgb(255, 255, 255);
      border-top: solid 1px rgb(124, 119, 139);
      border-right: solid 1px rgb(124, 119, 139);
      border-left: solid 1px rgb(124, 119, 139);
      border-bottom: none;
    `}

  img {
    width: 14px;
    height: 14px;
  }
  div {
    margin-left: 8px;
    width: 26px;
    font-family: Poppins;
    font-size: 13px;
    text-align: left;
  }
`;

const SupTab = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 125px;
  height: 36px;
  border: solid 1px rgb(67, 63, 78);
  color: rgb(132, 129, 142);
  border-bottom: 1px solid rgb(124, 119, 139);
  ${(props) =>
    props.changeColor &&
    css`
      color: rgb(255, 255, 255);
      border-top: solid 1px rgb(124, 119, 139);
      border-right: solid 1px rgb(124, 119, 139);
      border-left: solid 1px rgb(124, 119, 139);
      border-bottom: none;
    `}

  img {
    width: 14px;
    height: 14px;
  }
  div {
    margin-left: 8px;
    width: 26px;
    font-family: Poppins;
    font-size: 13px;
    text-align: left;
  }
`;

const TabContents = styled.div``;
