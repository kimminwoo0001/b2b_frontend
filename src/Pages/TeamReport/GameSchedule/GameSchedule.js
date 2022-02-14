import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import DatePicker from "react-datepicker";
import "./DatePicker.css";
import qs from "qs";
import axios from "axios";
import { useSelector } from "react-redux";
import { API } from "../../config";
import { useTranslation } from "react-i18next";

import First from "./First";
import Second from "./Second";
import Third from "./Third";
import Fourth from "./Fourth";
import Fifth from "./Fifth";
import axiosRequest from "../../../lib/axios/axiosRequest";
import { useDispatch } from "react-redux";
import { SetModalInfo } from "../../../redux/modules/modalvalue";

function GameSchedule() {
  const filters = useSelector((state) => state.FilterReducer);
  const user = useSelector((state) => state.UserReducer);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  //week 상태 관리
  const [startDate, setStartDate] = useState(new Date());
  const [weekData1, setWeekData1] = useState();
  const [weekData2, setWeekData2] = useState();
  const [weekData3, setWeekData3] = useState();
  const [weekData4, setWeekData4] = useState();
  const [weekData5, setWeekData5] = useState();
  const [whichWeek, setWhichWeek] = useState();
  const [thisWeek, setThisWeek] = useState();
  // week tab 컴포넌트
  const weeks = {
    1: <First weekData1={weekData1} />,
    2: <Second weekData2={weekData2} />,
    3: <Third weekData3={weekData3} />,
    4: <Fourth weekData4={weekData4} />,
    5: <Fifth weekData5={weekData5} />,
  };

  // 왼쪽 화살표 버튼 함수
  const handlePrevBtn = (e) => {
    const oneMonth = new Date(
      startDate.getFullYear(),
      startDate.getMonth() - 1
    );
    setStartDate(oneMonth);
  };

  // 오른쪽 화살표 버튼 함수
  const handleNextBtn = (e) => {
    const oneMonth = new Date(
      startDate.getFullYear(),
      startDate.getMonth() + 1
    );
    setStartDate(oneMonth);
  };

  // 날짜 변환 함수
  const convertMonth = (date) => {
    const d = new Date(date);
    let month = 1 + d.getMonth();
    // month와 day가 10 이상일 경우 그대로 출력, 10 이하일 경우 앞에 0 을 붙인 뒤 출력
    return `${month >= 10 ? month : "0" + month}`;
  };

  const convertYear = (date) => {
    const d = new Date(date);
    let year = d.getFullYear();
    return `${year}`;
  };
  useEffect(() => {
    fetchingWeekData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [convertYear(startDate), convertMonth(startDate)]);

  useEffect(() => {
    fetchingWeekData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.team]);

  // week 데이터 featch 함수
  const fetchingWeekData = () => {
    const url = `${API}/lolapi/team/schedule`;
    const params = {
      league: filters.league,
      season: filters.season,
      year: convertYear(startDate),
      month: convertMonth(startDate),
      team: filters.team,
      token: user.token,
      id: user.id,
    };
    axiosRequest(undefined, url, params, function (e) {
      setWeekData1(e[0].week);
      setWeekData2(e[1].week);
      setWeekData3(e[2].week);
      setWeekData4(e[3].week);
      setWeekData5(e[4].week);

      e.forEach((week, idx) => {
        if (week.thisWeek === true) {
          setWhichWeek(idx + 1);
          setThisWeek(idx + 1);
        } else if ((week.thisWeek = false)) {
          setThisWeek(0);
          setWhichWeek(0);
        }
      });
    }, function (objStore) {
      dispatch(SetModalInfo(objStore)) // 오류 발생 시, Alert 창을 띄우기 위해 사용
    })
  };

  return (
    <GameScheduleWrapper>
      <LeagueDateHeader>
        <TodayButton
          onClick={() => {
            setWhichWeek(thisWeek);
            setStartDate(new Date());
          }}
        >
          {t("league.schedule.today")}
        </TodayButton>
        <DateSlider>
          <img
            className="IconPrev"
            src="Images/ico-calendar-prev.png"
            alt="icoArrow"
            onClick={handlePrevBtn}
          ></img>
          <div className="SliderDate">{`${convertYear(
            startDate
          )}.${convertMonth(startDate)}`}</div>
          <img
            className="IconNext"
            src="Images/ico-calendar-next.png"
            alt="icoArrow"
            onClick={handleNextBtn}
          ></img>
        </DateSlider>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          dateFormat="MM/yyyy"
          customInput={
            <img src="Images/ico-calendar.png" alt="calendarIco"></img>
          }
          showMonthYearPicker
        />
      </LeagueDateHeader>
      <WeekTab>
        <FirstWeek
          onClick={() => setWhichWeek(1)}
          changeColor={whichWeek === 1}
        >
          <ThisWeekPop
            showDisplay={
              convertMonth(startDate) === convertMonth(new Date()) &&
              thisWeek === 1
            }
          >
            {t("league.schedule.thisWeek")}
          </ThisWeekPop>
          {t("league.schedule.week1")}
        </FirstWeek>
        <SecondWeek
          onClick={() => setWhichWeek(2)}
          changeColor={whichWeek === 2}
        >
          <ThisWeekPop
            showDisplay={
              convertMonth(startDate) === convertMonth(new Date()) &&
              thisWeek === 2
            }
          >
            {t("league.schedule.thisWeek")}
          </ThisWeekPop>
          {t("league.schedule.week2")}
        </SecondWeek>
        <ThirdWeek
          onClick={() => setWhichWeek(3)}
          changeColor={whichWeek === 3}
        >
          <ThisWeekPop
            showDisplay={
              convertMonth(startDate) === convertMonth(new Date()) &&
              thisWeek === 3
            }
          >
            {t("league.schedule.thisWeek")}
          </ThisWeekPop>
          {t("league.schedule.week3")}
        </ThirdWeek>
        <FourthWeek
          onClick={() => setWhichWeek(4)}
          changeColor={whichWeek === 4}
        >
          <ThisWeekPop
            showDisplay={
              convertMonth(startDate) === convertMonth(new Date()) &&
              thisWeek === 4
            }
          >
            {t("league.schedule.thisWeek")}
          </ThisWeekPop>
          {t("league.schedule.week4")}
        </FourthWeek>
        <FifthWeek
          onClick={() => setWhichWeek(5)}
          changeColor={whichWeek === 5}
        >
          <ThisWeekPop
            showDisplay={
              convertMonth(startDate) === convertMonth(new Date()) &&
              thisWeek === 5
            }
          >
            {t("league.schedule.thisWeek")}
          </ThisWeekPop>
          {t("league.schedule.week5")}
        </FifthWeek>
      </WeekTab>
      <div>{weeks[whichWeek]}</div>
    </GameScheduleWrapper>
  );
}

export default GameSchedule;

const ThisWeekPop = styled.div`
  position: absolute;
  display: none;
  padding: 4.5px 5.5px 4.5px 5.5px;
  border-radius: 3px;
  background-color: #f04545;
  font-family: NotoSansKR, Apple SD Gothic Neo;
  font-size: 11px;
  letter-spacing: -0.55px;
  text-align: center;
  color: #ffffff;
  z-index: 1;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  ${(props) =>
    props.showDisplay &&
    css`
      display: block;
    `}
`;

const TodayButton = styled.button`
  width: 48px;
  height: 30px;
  border-radius: 3px;
  border: solid 1px #7c778b;
  background-color: transparent;
  font-family: NotoSansKR, Apple SD Gothic Neo;
  font-size: 11px;
  letter-spacing: -0.55px;
  text-align: center;
  color: #afadbe;
`;

const GameScheduleWrapper = styled.div``;

const LeagueDateHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 76.5px;
  width: 100%;
  .SliderDate {
    width: auto;
    font-family: Poppins;
    font-size: 22px;
    font-weight: 500;
    color: #ffffff;
  }
  img {
    cursor: pointer;
  }
`;

const WeekTab = styled.div`
  width: 100%;
`;

const FirstWeek = styled.button`
  width: 219px;
  height: 46px;
  border: solid 1px #3a3745;
  font-family: NotoSansKR, Apple SD Gothic Neo;
  font-size: 13px;
  font-weight: bold;
  letter-spacing: -0.65px;
  text-align: center;
  color: rgb(132, 129, 142);
  border-bottom: solid 1px rgb(124, 119, 139);
  position: relative;
  ${(props) =>
    props.changeColor &&
    css`
      color: rgb(255, 255, 255);
      border-top: solid 1px rgb(124, 119, 139);
      border-right: solid 1px rgb(124, 119, 139);
      border-left: solid 1px rgb(124, 119, 139);
      border-bottom: none;
    `}
`;

const SecondWeek = styled.button`
  width: 219px;
  height: 46px;
  border: solid 1px #3a3745;
  font-family: NotoSansKR, Apple SD Gothic Neo;
  font-size: 13px;
  font-weight: bold;
  letter-spacing: -0.65px;
  text-align: center;
  color: rgb(132, 129, 142);
  border-bottom: solid 1px rgb(124, 119, 139);
  position: relative;
  ${(props) =>
    props.changeColor &&
    css`
      color: rgb(255, 255, 255);
      border-top: solid 1px rgb(124, 119, 139);
      border-right: solid 1px rgb(124, 119, 139);
      border-left: solid 1px rgb(124, 119, 139);
      border-bottom: none;
    `}
`;

const ThirdWeek = styled.button`
  width: 219px;
  height: 46px;
  border: solid 1px #3a3745;
  font-family: NotoSansKR, Apple SD Gothic Neo;
  font-size: 13px;
  font-weight: bold;
  letter-spacing: -0.65px;
  text-align: center;
  color: rgb(132, 129, 142);
  border-bottom: solid 1px rgb(124, 119, 139);
  position: relative;
  ${(props) =>
    props.changeColor &&
    css`
      color: rgb(255, 255, 255);
      border-top: solid 1px rgb(124, 119, 139);
      border-right: solid 1px rgb(124, 119, 139);
      border-left: solid 1px rgb(124, 119, 139);
      border-bottom: none;
    `}
`;

const FourthWeek = styled.button`
  width: 219px;
  height: 46px;
  border: solid 1px #3a3745;
  font-family: NotoSansKR, Apple SD Gothic Neo;
  font-size: 13px;
  font-weight: bold;
  letter-spacing: -0.65px;
  text-align: center;
  color: rgb(132, 129, 142);
  border-bottom: solid 1px rgb(124, 119, 139);
  position: relative;
  ${(props) =>
    props.changeColor &&
    css`
      color: rgb(255, 255, 255);
      border-top: solid 1px rgb(124, 119, 139);
      border-right: solid 1px rgb(124, 119, 139);
      border-left: solid 1px rgb(124, 119, 139);
      border-bottom: none;
    `}
`;

const FifthWeek = styled.button`
  width: 219px;
  height: 46px;
  border: solid 1px #3a3745;
  font-family: NotoSansKR, Apple SD Gothic Neo;
  font-size: 13px;
  font-weight: bold;
  letter-spacing: -0.65px;
  text-align: center;
  color: rgb(132, 129, 142);
  border-bottom: solid 1px rgb(124, 119, 139);
  position: relative;
  ${(props) =>
    props.changeColor &&
    css`
      color: rgb(255, 255, 255);
      border-top: solid 1px rgb(124, 119, 139);
      border-right: solid 1px rgb(124, 119, 139);
      border-left: solid 1px rgb(124, 119, 139);
      border-bottom: none;
    `}
`;

const DateSlider = styled.div`
  display: flex;
  div {
    color: white;
    font-size: 19.9px;
  }
  .IconNext {
    margin: 0 452px 0 17px;
  }
  .IconPrev {
    margin: 0 17px 0 424px;
  }
`;
