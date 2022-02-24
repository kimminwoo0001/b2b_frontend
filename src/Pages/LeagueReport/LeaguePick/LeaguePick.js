import React, { useState, useEffect, useRef } from "react";
/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled/macro";
import { API } from "../../config";
import { useSelector, useDispatch, batch } from "react-redux";
import TabforTop from "./TabforTop";
import axiosRequest from "../../../lib/axios/axiosRequest";
import { useTranslation } from "react-i18next";
import { SetModalInfo } from "../../../redux/modules/modalvalue";
import CalendarFilterNav from "../../../Components/Filter/Calendar/CalendarFilterNav";
import { SetCalendarDayEndIdx, SetCalendarDayStartIdx, SetCalendarEndDate, SetCalendarInfo, SetCalendarSeasonEndDate, SetCalendarSeasonStartDate, SetCalendarStartDate } from "../../../redux/modules/calendarvalue";
import addZero from "../../../lib/addZero";
import getMonthWeeks from "../../../lib/Calendar/getMonthWeeks";
import getMonthDayList from "../../../lib/Calendar/getMonthDayList";
import getLeafYaer from "../../../lib/Calendar/getLeafYear";
import getFirstDay from "../../../lib/Calendar/getFirstDay";
import getMonthDays from "../../../lib/Calendar/getMonthDays";
import { Loading } from "../../../redux/modules/filtervalue";

function LeaguePick() {
  const filters = useSelector((state) => state.FilterReducer);
  const user = useSelector((state) => state.UserReducer);
  const calendar = useSelector((state) => state.CalendarReducer);

  const [positionTab, setPositionTab] = useState(0);
  const [queryPosition, setQueryPosition] = useState();

  const [importantPicks, setImportantPicks] = useState();
  const [pickDifference, setPickDifference] = useState();
  const [uniquePick, setUniquePick] = useState();
  const [tier, setTier] = useState();

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isInitialMount2 = useRef(true);

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
  const getPickData = () => {
    dispatch(Loading(true));
    //  선택된 리그가 없을 시 api호출 X
    if (filters.league.length === 0
      && filters.year.length === 0
      && filters.season.length === 0
      && filters.patch.length === 0
    ) {
      return;
    }
    const gml = new Date().getTimezoneOffset();
    let url = `${API}/lolapi/league/pick`;
    let params = {
      league: filters.league,
      year: filters.year,
      season: filters.season,
      patch: filters.patch,
      position: queryPosition,
      startTime: calendar.startDate,
      endTime: calendar.endDate,
      gml: gml,
      token: user.token,
      id: user.id,
    };

    axiosRequest(
      undefined,
      url,
      params,
      function (e) {
        console.log("pick", e);
        //주요픽 데이터 저장
        setImportantPicks(e.importantPick);
        //주요픽간의전적 저장
        setPickDifference(e.pickDiff);
        //챔피언 티어 저장
        setTier(e.championTier);
        //유니크픽 데이터 저장
        setUniquePick(e.uniquePick);
        dispatch(Loading(false))
      },
      function (objStore) {
        dispatch(SetModalInfo(objStore)); // 오류 발생 시, Alert 창을 띄우기 위해 사용
        dispatch(Loading(false))
      }
    )
  };

  const getCalendarFilteData = () => {
    //  선택된 리그가 없을 시 api호출 X
    if (filters.league.length === 0) {
      return;
    }

    const gml = new Date().getTimezoneOffset();
    let url = `${API}/lolapi/filter/schedule`;
    let params = {
      league: filters.league,
      year: filters.year,
      season: filters.season,
      gml: gml,
      token: user.token,
      id: user.id,
    };

    axiosRequest(
      undefined,
      url,
      params,
      function (e) {
        const start = e[0].date;
        const end = e[e.length - 1].date
        const leapYear = getLeafYaer(filters.year);
        const startIdx = (getMonthDays(+start.split("-")[1] - 1, getMonthDayList(leapYear))) + +start.split("-")[2] - 1
        const endIdx = (getMonthDays(+end.split("-")[1] - 1, getMonthDayList(leapYear))) + +end.split("-")[2] - 1

        for (let i = 0; i < e.length; i++) {
          const date = e[i].date;
          const index = (getMonthDays(+date.split("-")[1] - 1, getMonthDayList(leapYear))) + +date.split("-")[2] - 1;
          e[i].index = index;
          //res.push(e[i]);
        }

        batch(() => {
          dispatch(SetCalendarInfo(e));
          dispatch(SetCalendarStartDate(e[0].date));
          dispatch(SetCalendarEndDate(e[e.length - 1].date));
          dispatch(SetCalendarDayStartIdx(startIdx))
          dispatch(SetCalendarDayEndIdx(endIdx))
          dispatch(SetCalendarSeasonStartDate(e[0].date))
          dispatch(SetCalendarSeasonEndDate(e[e.length - 1].date))
        })
      },
      function (objStore) {
        dispatch(SetModalInfo(objStore)); // 오류 발생 시, Alert 창을 띄우기 위해 사용
      }
    )
  }

  // // // week 데이터 fetch 함수
  // const fetchingPickData = () => {
  //   dispatch(Loading(true));
  //   //  선택된 리그가 없을 시 api호출 X
  //   if (filters.league.length === 0) {
  //     return;
  //   }

  //   let url = `${API}/lolapi/league/pick`;
  //   let params = {
  //     league: filters.league,
  //     year: filters.year,
  //     season: filters.season,
  //     patch: filters.patch,
  //     position: queryPosition,
  //     token: user.token,
  //     id: user.id,
  //   };

  //   axiosRequest(
  //     undefined,
  //     url,
  //     params,
  //     function (e) {
  //       //주요픽 데이터 저장
  //       setImportantPicks(e.importantPick);
  //       //주요픽간의전적 저장
  //       setPickDifference(e.pickDiff);
  //       //챔피언 티어 저장
  //       setTier(e.championTier);
  //       //유니크픽 데이터 저장
  //       setUniquePick(e.uniquePick);
  //     },
  //     function (objStore) {
  //       dispatch(SetModalInfo(objStore)); // 오류 발생 시, Alert 창을 띄우기 위해 사용
  //     }
  //   ).finally(dispatch(Loading(false)));
  // };

  useEffect(() => {
    if (calendar.endDate.length > 0 && calendar.startDate.length > 0) {
      getPickData()
    }
    //fetchingPickData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryPosition, calendar.info, calendar.endDate, calendar.startDate]);

  useEffect(() => {

    if (filters.patch.length > 0) {
      getCalendarFilteData();
    }
  }, [filters.patch])

  useEffect(() => {
    if (isInitialMount2.current) {
      isInitialMount2.current = false;
    } else {
      convertPosition();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [positionTab]);

  return (
    <LeaguePickWrapper>
      <CalendarFilterNav />
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
            <span>{t("position.jng")}</span>
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
    padding-bottom: 18px;
    border-bottom: solid 1px ${(props) => (props.changeColor ? `#fff` : `none`)};
    color: ${(props) => (props.changeColor ? `#fff` : `#84818e`)};
  }
`;

const TabContents = styled.div``;
