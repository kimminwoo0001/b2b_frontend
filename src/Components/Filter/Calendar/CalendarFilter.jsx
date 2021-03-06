/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled/macro";
import React from "react";
import { batch, useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import theme from "../../../Styles/Theme";
import {
  SetCalendarDayEndIdx,
  SetCalendarDayStartIdx,
  SetCalendarEndDate,
  SetCalendarIsOpen,
  SetCalendarStartDate,
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
import { SetDesc, SetIsOpen } from "../../../redux/modules/modalvalue";
import getMonthDayList from "../../../lib/Calendar/getMonthDayList";
import getFirstDay from "../../../lib/Calendar/getFirstDay";
import getMonthWeeks from "../../../lib/Calendar/getMonthWeeks";
import getLeafYaer from "../../../lib/Calendar/getLeafYear";

const date = new Date();
const weekDays = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

function CalendarFilter() {
  const calendar = useSelector((state) => state.CalendarReducer);
  const { year } = useSelector((state) => state.FilterReducer);
  const lang = useSelector((state) => state.LocaleReducer);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const firstDays = getFirstDay(year);
  const leapYear = getLeafYaer(year);
  const monthDays = getMonthDayList(leapYear);

  const [selectIdx, setSelectIdx] = useState(
    calendar.isStartSelector ? calendar.startDayIdx : calendar.endDayIdx
  );
  const [selectValue, setSelectValue] = useState(
    calendar.isStartSelector ? calendar.startDate : calendar.endDate
  );
  const [month, setMonth] = useState(new Date().getUTCMonth() + 1);
  const [lock, setLock] = useState(false);

  const getIdx = (idx, idx2) => {
    return idx * 7 + idx2 - firstDays.getDay();
  };

  const getCalendarInfo = (idx, idx2) => {
    let total = 0;
    const index = getIdx(idx, idx2);
    const info = calendar.info;

    for (let i = 0; monthDays.length; i++) {
      if (index > total + monthDays[i] - 1) {
        total += monthDays[i];
        continue;
      } else {
        return {
          month: i + 1,
          day: index - total,
          year: year,
          index: index,
          match: info
            ? info
                .filter((arr) => arr.index === index)
                .map((data) => data.matchs)
                .flat()
            : [],
        };
      }
    }
    return {
      year: year,
      month: -1,
      day: -1,
      index: index,
    };
  };

  const autoMoveScroll = (idx) => {
    if (idx > 0) {
      scroller.scrollTo(`week-${idx}`, {
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
    let currentIdx = (+to.split("-")[1] + 1) * 7 - firstDays.getDay();

    for (let i = 0; i < monthDays.length; i++) {
      if (currentIdx - monthDays[i] >= 0) {
        currentIdx -= monthDays[i];
        continue;
      } else {
        return setMonth(i);
        //
      }
    }
  };

  const moveLock = () => {
    setLock(true);
    setTimeout(() => setLock(false), 1000);
  };

  useEffect(() => {
    if (calendar.isOpen) {
      scrollSpy.update();
      moveLock();

      if (calendar.startDate) {
        const date = calendar.startDate.split("-");
        console.log("month", month);

        setMonth(+date[1] - 1);
        autoMoveScroll(
          getMonthWeeks(+date[1] - 1, monthDays, firstDays) +
            Math.floor((+date[2] + firstDays.getDay()) / 7) +
            (calendar.isStartSelector ? -2 : 0)
        );
      } else {
        autoMoveScroll(getMonthWeeks(month, monthDays, firstDays));
      }
    }
  }, [calendar.isOpen]);

  return (
    <SCalendarFilter active={calendar.isOpen}>
      <SCalendarContainer>
        <div className="header">
          <div className="date-info">
            <Link
              activeClass="active"
              className="test1"
              to={`week-${getMonthWeeks(month - 1, monthDays, firstDays)}`}
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
              to={`week-${getMonthWeeks(month + 1, monthDays, firstDays)}`}
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
              dispatch(SetCalendarIsOpen(false));
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
                          isStartSelector={calendar.isStartSelector}
                          setSelectIdx={setSelectIdx}
                          selectIdx={selectIdx}
                          setSelectValue={setSelectValue}
                          startDayIdx={calendar.startDayIdx}
                        />
                      );
                    })}
                  </div>
                </Element>
              );
            })}
          </div>
        </CalendarBody>
        <SCalendarConfirm
          isSelect={selectIdx > -1}
          onClick={() =>
            selectIdx >= 0
              ? calendar.isStartSelector
                ? batch(() => {
                    dispatch(SetCalendarDayStartIdx(selectIdx));
                    dispatch(SetCalendarStartDate(selectValue));
                    dispatch(SetCalendarDayEndIdx(""));
                    dispatch(SetCalendarEndDate(""));
                    dispatch(SetCalendarIsOpen(false));
                  })
                : batch(() => {
                    dispatch(SetCalendarDayEndIdx(selectIdx));
                    dispatch(SetCalendarEndDate(selectValue));
                    dispatch(SetCalendarIsOpen(false));
                  })
              : batch(() => {
                  dispatch(
                    SetDesc(
                      t(
                        `utility.calendarFilter.desc.${
                          calendar.isStartSelector ? "noStartIdx" : "noEndIdx"
                        }`
                      )
                    )
                  );
                  dispatch(SetIsOpen(true));
                })
          }
        >
          <div className="label">
            {calendar.isStartSelector
              ? t("utility.calendarFilter.selectedStartDay")
              : t("utility.calendarFilter.selectedEndDay")}
          </div>
        </SCalendarConfirm>
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

const SCalendarConfirm = styled.div`
  width: 1160px;
  height: 60px;
  margin: 20px;
  border-radius: 20px;
  background-color: ${(props) =>
    props.isSelect ? theme.colors.point : theme.colors.btn_nor};

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
`;
