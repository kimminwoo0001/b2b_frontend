import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import axios from "axios";
import { API } from "../../config";
import { useSelector } from "react-redux";
import LoadingImg from "../../../Components/LoadingImg/LoadingImg";
import qs from "qs";
import TabforTop from "./TabforTop";
import axiosRequest from "../../../lib/axiosRequest";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

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
    ),
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
  const fetchingPickData = () => {
    setLoading(true);

    let url = `${API}/api/league/pick`;
    let params = {
      league: filters.league,
      year: filters.year,
      season: filters.season,
      patch: filters.patch,
      position: queryPosition,
      token: user.token,
      id: user.id,
    };

    axiosRequest(url, params, function (e) {
      //주요픽 데이터 저장
      setImportantPicks(e.data.importantPick);
      //주요픽간의전적 저장
      setPickDifference(e.data.pickDiff);
      //챔피언 티어 저장
      setTier(e.data.championTier);
      //유니크픽 데이터 저장
      setUniquePick(e.data.uniquePick);
    }).finally(setLoading(false));
  };

  if (loading) return <LoadingImg />;

  return (
    <LeaguePickWrapper>
      <LeaguePickTabs changeColor={positionTab}>
        <TabItem
          onClick={() => setPositionTab(0)}
          changeColor={positionTab === 0}
        >
          <div>
            <span>{t("position.top")}</span>
          </div>
        </TabItem>
        <TabItem
          onClick={() => setPositionTab(1)}
          changeColor={positionTab === 1}
        >
          <div>
            <span>{t("position.jg")}</span>
          </div>
        </TabItem>

        <TabItem
          onClick={() => setPositionTab(2)}
          changeColor={positionTab === 2}
        >
          <div>
            <span>{t("position.mid")}</span>
          </div>
        </TabItem>

        <TabItem
          onClick={() => setPositionTab(3)}
          changeColor={positionTab === 3}
        >
          <div>
            <span>{t("position.ad")}</span>
          </div>
        </TabItem>
        <TabItem
          onClick={() => setPositionTab(4)}
          changeColor={positionTab === 4}
        >
          <div>
            <span>{t("position.sup")}</span>
          </div>
        </TabItem>
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
  height: 62px;
  // margin-top: 21.5px;
`;
const LineMargin = styled.div`
  width: 10px;
  border-bottom: solid 1px #433f4e;
`;

const LastMargin = styled.div`
  width: 73%;
  border-bottom: solid 1px #433f4e;
`;

const TabItem = styled.button`
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
      background-color: #26262c;
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
    padding-bottom: 19px;
    border-bottom: solid 1px
      ${(props) => (props.changeColor ? `#fff` : `#433f4e;`)};
    color: ${(props) => (props.changeColor ? `#fff` : `#84818e`)};
  }
`;

const TabContents = styled.div``;
