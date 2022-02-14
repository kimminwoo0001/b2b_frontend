/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled/macro";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import theme from "../../../Styles/Theme";
import { SetCalendarIsOpen } from "../../../redux/modules/calendarvalue";
import addZero from "../../../lib/addZero";
import DayBox from "./SubContainer/DayBox";

const date = new Date();
const weekDays = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

function CalendarFilter() {
  const calendar = useSelector((state) => state.CalendarReducer);
  const { year } = useSelector((state) => state.FilterReducer);
  const dispath = useDispatch();
  const { t } = useTranslation();
  const lang = useSelector((state) => state.LocaleReducer);
  const firstDays = new Date(year, 1, 1);
  const leapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  const monthDays = [
    31,
    leapYear ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];

  const getIdx = (idx, idx2) => {
    return idx * 7 + idx2 - firstDays.getDay();
  };

  const getCalendarInfo = (idx, idx2) => {
    let total = 0;
    const index = getIdx(idx, idx2);
    for (let i = 0; monthDays.length; i++) {
      if (index > total + monthDays[i] - 1) {
        total += monthDays[i];
        continue;
      } else {
        return {
          month: i + 1,
          day: index - total,
        };
      }
    }
    return {
      month: -1,
      day: -1,
    };
  };

  return (
    // 전체화면 로딩 이미지
    <SCalendarFilter active={calendar.isOpen}>
      <SCalendarContainer>
        <div className="header">
          <div className="date-info">
            <img src="Images/ic-pre.svg" alt="pre" />
            <div className="date-view">
              {lang === "ko"
                ? `${date.getUTCFullYear()}${t("common.date.year")} ${addZero(
                    date.getUTCMonth() + 1
                  )}${t("common.date.month")}`
                : `${addZero(
                    date.getUTCMonth() + 1
                  )}, ${date.getUTCFullYear()}`}
            </div>
            <img src="Images/ic-next.svg" alt="next" />
          </div>
          <img
            className="close-btn"
            src="Images/ic_close_bk_30.svg"
            alt="close"
            onClick={() => {
              dispath(SetCalendarIsOpen(false));
            }}
          />
        </div>
        <div className="day-of-the-week">
          {weekDays.map((day, idx) => {
            return (
              <div className="day">{t(`common.date.weekDays.${day}`)}</div>
            );
          })}
        </div>
        <CalendarBody>
          {leapYear
            ? [...Array(Math.floor((366 + firstDays.getDay()) / 7) + 1)].map(
                (week, idx) => {
                  return (
                    <div className="calendar-days">
                      {[...Array(7)].map((day, idx2) => {
                        return (
                          <DayBox
                            info={getCalendarInfo(idx, idx2)}
                            isLeapYear={leapYear}
                          />
                        );
                      })}
                    </div>
                  );
                }
              )
            : [...Array(Math.floor((365 + firstDays.getDay()) / 7) + 1)].map(
                (week, idx) => {
                  return (
                    <div className="calendar-days">
                      {[...Array(7)].map((day, idx2) => {
                        return (
                          <DayBox
                            info={getCalendarInfo(idx, idx2)}
                            isLeapYear={leapYear}
                          />
                        );
                      })}
                    </div>
                  );
                }
              )}
        </CalendarBody>
        <div className="confirm">
          <div className="label">
            {calendar.isStartSelector
              ? t("utility.calendarFilter.selectedStartDay")
              : t("utility.calendarFilter.selectedEndDay")}
          </div>
        </div>
      </SCalendarContainer>
    </SCalendarFilter>
  );
}

export default CalendarFilter;

const SCalendarFilter = styled.div`
  display: ${(props) => (props.active ? "flex" : "none")};
  position: fixed;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.75);
  z-index: 1;
  img {
    width: 50px;
    height: 50px;
  }
`;

const SCalendarContainer = styled.div`
  width: 1200px;
  height: 1145px;
  margin: 30px 224px 123px 41px;
  padding: 0 0;
  border-radius: 20px;
  background-color: ${theme.colors.bg_select};

  .header {
    width: 100%;
    height: 116px;
    margin: 0 0 25px;
    padding: 10px 10px 40px 33px;
    display: flex;
    position: relative;

    .date-info {
      width: 252px;
      height: 36px;
      top: 30px;
      position: absolute;
      display: flex;

      .date-view {
        width: 180px;
        height: 31px;
        margin: 9px 0 2px;
        font-family: SpoqaHanSansNeo;
        font-size: 30px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        text-align: center;
        color: ${theme.colors.text};
        white-space: nowrap;

        img {
          width: 50px;
          height: 50px;
          object-fit: contain;
        }
      }
    }
  }

  .day-of-the-week {
    width: 1200px;
    height: 19px;
    margin: 1px 0 0;
    padding: 0 23px;
    display: flex;
    .day {
      width: 145px;
      height: 19px;
      margin: 0 10px;
      font-family: SpoqaHanSansNeo;
      font-size: 15px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: 1;
      letter-spacing: normal;
      text-align: center;
      color: ${theme.colors.text};
    }
  }
  .close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 30px;
    height: 30px;
  }

  .calendar-days {
    margin: 0 23px;
    display: flex;
  }

  .confirm {
    width: 1160px;
    height: 60px;
    margin: 20px;
    border-radius: 20px;
    background-color: ${theme.colors.btn_nor};

    .label {
      line-height: 60px;
    }
    font-family: SpoqaHanSansNeo;
    font-size: 18px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1;
    letter-spacing: normal;
    text-align: center;
    color: ${theme.colors.text};
  }
`;

const CalendarBody = styled.div`
  width: 100%;
  height: 884px;
  padding: 4px 0 0;
  overflow: scroll;
`;
