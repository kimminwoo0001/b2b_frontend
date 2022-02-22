/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled/macro";
import { getDate } from "date-fns";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { batch, useDispatch } from "react-redux";
import addZero from "../../../lib/addZero";
import getMonthDays from "../../../lib/Calendar/getMonthDays";
import getMonthDayList from "../../../lib/Calendar/getMonthDayList";
import {
  SetCalendarDayEndIdx,
  SetCalendarDayStartIdx,
  SetCalendarEndDate,
  SetCalendarIsOpen,
  SetCalendarStartDate,
} from "../../../redux/modules/calendarvalue";
import theme from "../../../Styles/Theme";
import getLeafYaer from "../../../lib/Calendar/getLeafYear";
import { SetDesc, SetIsOpen } from "../../../redux/modules/modalvalue";
import { useEffect } from "react";
import { useState } from "react";

const date = new Date();

const CalendarFilterNav = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const calendar = useSelector((state) => state.CalendarReducer);
  const filters = useSelector((state) => state.FilterReducer);
  const now = `${date.getFullYear()}-${addZero(date.getMonth() + 1)}-${addZero(
    date.getDate()
  )}`;
  const leapYear = getLeafYaer(filters.year);

  const getCalcuDate = (now, day, mon) => {
    let time = new Date(now);
    let oneDay = 24 * 3600 * 1000;
    if (day) {
      const calcuDate = new Date(time - oneDay * day);

      return `${calcuDate.getFullYear()}-${addZero(
        calcuDate.getMonth() + 1
      )}-${addZero(calcuDate.getDate())}`;
    } else if (mon) {
      const calcuDate = new Date(
        time.getFullYear(),
        time.getMonth() - mon,
        time.getDate()
      );
      return `${calcuDate.getFullYear()}-${addZero(
        calcuDate.getMonth() + 1
      )}-${addZero(calcuDate.getDate())}`;
    } else {
      return `${now.getFullYear()}-${addZero(now.getMonth() + 1)}-${addZero(
        now.getDate()
      )}`;
    }
  };

  const setRecentDayFilter = (day, mon) => {
    const calcuDate = getCalcuDate(now, day ? day : false, mon ? mon : false);

    const seasonStartDateNum = new Date(calendar.seasonStartDate).getTime();
    const calcuDateNum = new Date(calcuDate).getTime();
    const changeToStartSeason = calcuDateNum < seasonStartDateNum;
    const startDate = changeToStartSeason
      ? calendar.seasonStartDate
      : calcuDate;
    const startIdx =
      getMonthDays(+startDate.split("-")[1] - 1, getMonthDayList(leapYear)) +
      +startDate.split("-")[2] -
      1;
    const endIdx =
      getMonthDays(+now.split("-")[1] - 1, getMonthDayList(leapYear)) +
      +now.split("-")[2] -
      1;

    batch(() => {
      dispatch(SetCalendarStartDate(startDate));
      dispatch(SetCalendarEndDate(now));
      dispatch(SetCalendarDayStartIdx(startIdx));
      dispatch(SetCalendarDayEndIdx(endIdx));
      if (changeToStartSeason) {
        dispatch(SetDesc(t("utility.calendarFilter.desc.changeToStartSeason")));
        dispatch(SetIsOpen(true));
      }
    });
  };

  return (
    <SCFContainer>
      <SCFDaysInput
        onClick={() => {
          batch(() => {
            dispatch(SetCalendarIsOpen(true));
          });
        }}
      >
        <input
          className="calendar-input"
          type="text"
          placeholder={t("utility.calendarFilter.inputStart")}
          value={calendar.startDate}
        />
        <img className="calendar-icon" src="Images/ic-calendar.svg" alt="" />
      </SCFDaysInput>
      <div className="hyphen">-</div>
      <SCFDaysInput
        onClick={() => {
          batch(() => {
            dispatch(SetCalendarIsOpen(true));
          });
        }}
      >
        <input
          className="calendar-input"
          type="text"
          placeholder={t("utility.calendarFilter.inputEnd")}
          value={calendar.endDate}
        />
        <img className="calendar-icon" src="Images/ic-calendar.svg" alt="" />
      </SCFDaysInput>

      <SCFButton
        isActive={
          calendar.seasonStartDate === calendar.startDate &&
          calendar.seasonEndDate === calendar.endDate
        }
        isRecentYear={true}
        onClick={() => {
          batch(() => {
            dispatch(SetCalendarStartDate(calendar.seasonStartDate));
            dispatch(SetCalendarEndDate(calendar.seasonEndDate));
            dispatch(SetCalendarDayStartIdx(calendar.info[0].index));
            dispatch(
              SetCalendarDayEndIdx(
                calendar.info[calendar.info.length - 1].index
              )
            );
          });
        }}
      >
        {t("utility.calendarFilter.date.allSeason")}
      </SCFButton>
      <SCFButton
        isActive={
          calendar.startDate === getCalcuDate(now, 3, false) &&
          now === calendar.endDate
        }
        isRecentYear={+filters.year === date.getFullYear()}
        onClick={() => {
          if (+filters.year === date.getFullYear()) {
            setRecentDayFilter(3, false);
          }
        }}
      >
        {t("utility.calendarFilter.date.recent3days")}
      </SCFButton>
      <SCFButton
        isActive={
          calendar.startDate === getCalcuDate(now, 5, false) &&
          now === calendar.endDate
        }
        isRecentYear={+filters.year === date.getFullYear()}
        onClick={() => {
          if (+filters.year === date.getFullYear()) {
            setRecentDayFilter(5, false);
          }
        }}
      >
        {t("utility.calendarFilter.date.recent5days")}
      </SCFButton>
      <SCFButton
        isActive={
          calendar.startDate === getCalcuDate(now, 7, false) &&
          now === calendar.endDate
        }
        isRecentYear={+filters.year === date.getFullYear()}
        onClick={() => {
          if (+filters.year === date.getFullYear()) {
            setRecentDayFilter(7, false);
          }
        }}
      >
        {t("utility.calendarFilter.date.recent7days")}
      </SCFButton>
      <SCFButton
        isActive={
          calendar.startDate === getCalcuDate(now, 15, false) &&
          now === calendar.endDate
        }
        isRecentYear={+filters.year === date.getFullYear()}
        onClick={() => {
          if (+filters.year === date.getFullYear()) {
            setRecentDayFilter(15, false);
          }
        }}
      >
        {t("utility.calendarFilter.date.recent15days")}
      </SCFButton>
      <SCFButton
        isActive={
          calendar.startDate === getCalcuDate(now, false, 1) &&
          now === calendar.endDate
        }
        isRecentYear={+filters.year === date.getFullYear()}
        onClick={() => {
          if (+filters.year === date.getFullYear()) {
            setRecentDayFilter(false, 1);
          }
        }}
      >
        {t("utility.calendarFilter.date.recent1months")}
      </SCFButton>
      <SCFButton
        isActive={
          calendar.startDate === getCalcuDate(now, false, 3) &&
          now === calendar.endDate
        }
        isRecentYear={+filters.year === date.getFullYear()}
        onClick={() => {
          if (+filters.year === date.getFullYear()) {
            setRecentDayFilter(false, 3);
          }
        }}
      >
        {t("utility.calendarFilter.date.recent3months")}
      </SCFButton>
    </SCFContainer>
  );
};

export default CalendarFilterNav;

const SCFContainer = styled.div`
  height: 34px;
  margin: 0 0 20px 0;
  display: flex;

  .calendar-filter-label {
    height: 19px;
    margin: 8px 20px 8px 0;
    font-family: SpoqaHanSansNeo;
    font-size: 15px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    color: ${theme.colors.text};
  }

  .hyphen {
    width: 16px;
    height: 34px;
    padding: 12px 0px 8px 0px;

    font-family: SpoqaHanSans;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
    color: ${theme.colors.text};
  }

  .calendar-input {
    width: 78px;
    cursor: pointer;
    color: ${theme.colors.text};
  }

  .calendar-icon {
    width: 34px;
    height: 34px;
    margin-top: -3px;
  }
`;

const SCFDaysInput = styled.div`
  display: flex;
  width: 122px;
  height: 34px;
  padding: 3px 0 0 10px;
  border-radius: 10px;
  margin: 0 2px;
  background-color: ${theme.colors.bg_box};
  font-family: SpoqaHanSansNeo;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.23;
  letter-spacing: normal;
  text-align: left;
  color: ${theme.colors.text};
  cursor: pointer;
`;

const SCFButton = styled.button`
  cursor: default;
  height: 34px;
  margin-left: 5px;
  padding: 9px 12px 7px;
  border-radius: 10px;
  background-color: ${(props) =>
    props.isActive ? theme.colors.point : theme.colors.bg_box};
  opacity: ${(props) => (props.isRecentYear ? "1" : "0.3")};

  font-family: SpoqaHanSansNeo;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: ${theme.colors.text};
`;
