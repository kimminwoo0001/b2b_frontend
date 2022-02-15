/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled/macro";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import theme from "../../../Styles/Theme";
import {
  SetCalendarDayEndIdx,
  SetCalendarDayStartIdx,
  SetCalendarIsOpen,
} from "../../../redux/modules/calendarvalue";
import addZero from "../../../lib/addZero";
import DayBox from "./SubContainer/DayBox";
import {
  Link,
  DirectLink,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller,
} from "react-scroll";
import { useState } from "react";

const date = new Date();
const weekDays = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

function CalendarFilter() {
  const [month, setMonth] = useState(new Date().getUTCMonth() + 1);
  const [lock, setLock] = useState(false);
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
          index: index,
        };
      }
    }
    return {
      month: -1,
      day: -1,
      index: index,
    };
  };

  const autoMoveScroll = (idx) => {
    if (idx > 1) {
      scroller.scrollTo(`week-${getMonthDays(idx)}`, {
        duration: 500,
        delay: 0,
        smooth: "easeInOutQuart",
        containerId: "calendar-body",
      });
    } else {
      scroll.scrollToTop({
        duration: 500,
        delay: 0,
        smooth: "easeInOutQuart",
        containerId: "calendar-body",
      });
    }
  };

  const handleSetActive = (to) => {
    if (lock) {
      return;
    }
    console.log("to", to);
    let currentIdx = (+to.split("-")[1] + 1) * 7 - firstDays.getDay();

    for (let i = 0; i < monthDays.length; i++) {
      console.log("currentIdx", currentIdx);
      if (currentIdx - monthDays[i] >= 0) {
        currentIdx -= monthDays[i];
        continue;
      } else {
        console.log("i", i + 1);
        return setMonth(i);
        //
      }
    }
  };

  const getMonthDays = (mon) => {
    let result = 0;
    console.log("mon", mon);
    for (let i = 0; i < mon; i++) {
      result += monthDays[i];
    }
    result = Math.floor((result + firstDays.getDay()) / 7);
    return result;
  };

  const moveLock = () => {
    setLock(true);
    setTimeout(() => setLock(false), 1000);
  };

  useEffect(() => {
    scrollSpy.update();
    moveLock();
    autoMoveScroll(month);
  }, []);

  return (
    <SCalendarFilter active={calendar.isOpen}>
      <SCalendarContainer>
        <div className="header">
          <div className="date-info">
            <Link
              activeClass="active"
              className="test1"
              to={`week-${getMonthDays(month - 1)}`}
              smooth={true}
              duration={500}
              containerId="calendar-body"
              onClick={() => {
                setMonth(month - 1);
                moveLock();
              }}
              //onSetActive={handleSetActive}
            >
              <img src="Images/ic-pre.svg" alt="pre" />
            </Link>
            <div className="date-view">
              {lang === "ko"
                ? `${year}${t("common.date.year")} ${addZero(month + 1)}${t(
                    "common.date.month"
                  )}`
                : `${addZero(month + 1)}, ${year}`}
            </div>
            <Link
              activeClass="active"
              className="test1"
              to={`week-${getMonthDays(month + 1)}`}
              smooth={true}
              duration={500}
              containerId="calendar-body"
              onClick={() => {
                setMonth(month + 1);
                moveLock();
              }}
            >
              <img src="Images/ic-next.svg" alt="next" />
            </Link>
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
          <div id="calendar-body">
            {[
              ...Array(
                Math.floor(
                  (365 + (leapYear ? 1 : 0) + firstDays.getDay()) / 7
                ) + 1
              ),
            ].map((week, idx) => {
              return (
                <Element name={`week-${idx}`} className="element">
                  <Link
                    activeClass="active"
                    className="test1"
                    to={`week-${idx}`}
                    spy={true}
                    containerId="calendar-body"
                    onSetActive={handleSetActive}
                    spyThrottle={200}
                  ></Link>
                  <div className="calendar-days">
                    {[...Array(7)].map((day, idx2) => {
                      return (
                        <DayBox
                          info={getCalendarInfo(idx, idx2)}
                          isLeapYear={leapYear}
                          startDayIdx={calendar.startDayIdx}
                          endDayIdx={calendar.endDayIdx}
                          isStartSelector={calendar.isStartSelector}
                        />
                      );
                    })}
                  </div>
                </Element>
              );
            })}
          </div>
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

      .active {
        background-color: green;
      }

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
  #calendar-body {
    overflow: scroll;
    width: 100%;
    height: 884px;
    padding: 4px 0 0;
  }
`;
