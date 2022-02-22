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

const weekDays = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
const START_DATE = "START_DATE";
const END_DATE = "END_DATE";

function CalendarFilter() {
  const calendar = useSelector((state) => state.CalendarReducer);
  const { year } = useSelector((state) => state.FilterReducer);
  const lang = useSelector((state) => state.LocaleReducer);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const firstDays = getFirstDay(year);
  const leapYear = getLeafYaer(year);
  const monthDays = getMonthDayList(leapYear);

  const [activeLabel, setActiveLabel] = useState(
    calendar.startDayIdx === "" ? START_DATE : END_DATE
  );
  const [selectStartIdx, setSelectStartIdx] = useState(calendar.startDayIdx);
  const [selectEndIdx, setSelectEndIdx] = useState(calendar.endDayIdx);
  const [selectStartValue, setSelectStartValue] = useState(calendar.startDate);
  const [selectEndValue, setSelectEndValue] = useState(calendar.endDate);
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
            Math.floor((+date[2] + firstDays.getDay()) / 7)
        );
      } else {
        autoMoveScroll(getMonthWeeks(month, monthDays, firstDays));
      }
    }
  }, [calendar.isOpen]);

  const CancelDays = (active) => {
    if (active === START_DATE) {
      setSelectStartIdx("");
      setSelectStartValue("");
      setActiveLabel(START_DATE);
    } else if (active === END_DATE) {
      setSelectEndIdx("");
      setSelectEndValue("");
      setActiveLabel(END_DATE);
    }
  };

  return (
    <SCalendarFilter active={calendar.isOpen}>
      <SCalendarContainer>
        <div className="header">
          <div className="date-info">
            <Link
              activeClass="active"
              className="go-to-pre-month"
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
              className="go-to-next-month"
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
            <SCalendarDaysInput
              isActive={activeLabel === START_DATE}
              onClick={() => {
                setActiveLabel(START_DATE);
              }}
            >
              <input
                className="calendar-input"
                type="text"
                placeholder={t("utility.calendarFilter.inputStart")}
                value={selectStartValue}
              />
              <img
                className="calendar-icon"
                src="Images/ic-cancle.svg"
                alt=""
                onClick={() => {
                  CancelDays(START_DATE);
                }}
              />
            </SCalendarDaysInput>
            <div className="hyphen">-</div>
            <SCalendarDaysInput
              isActive={activeLabel === END_DATE}
              onClick={() => {
                setActiveLabel(END_DATE);
              }}
            >
              <input
                className="calendar-input"
                type="text"
                placeholder={t("utility.calendarFilter.inputEnd")}
                value={selectEndValue}
              />
              <img
                className="calendar-icon"
                src="Images/ic-cancle.svg"
                alt=""
                onClick={() => {
                  CancelDays(END_DATE);
                }}
              />
            </SCalendarDaysInput>
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
                          activeLabel={activeLabel}
                          selectStartIdx={selectStartIdx}
                          selectEndIdx={selectEndIdx}
                          setActiveLabel={setActiveLabel}
                          setSelectStartIdx={setSelectStartIdx}
                          setSelectEndIdx={setSelectEndIdx}
                          setSelectStartValue={setSelectStartValue}
                          setSelectEndValue={setSelectEndValue}
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
          isSelect={selectStartIdx !== "" && selectEndIdx !== ""}
          onClick={() =>
            selectStartIdx !== "" && selectEndIdx !== ""
              ? batch(() => {
                  dispatch(SetCalendarDayStartIdx(selectStartIdx));
                  dispatch(SetCalendarStartDate(selectStartValue));
                  dispatch(SetCalendarDayEndIdx(selectEndIdx));
                  dispatch(SetCalendarEndDate(selectEndValue));
                  dispatch(SetCalendarIsOpen(false));
                })
              : batch(() => {
                  dispatch(
                    SetDesc(
                      t(
                        `utility.calendarFilter.desc.${
                          activeLabel === START_DATE ? "noStartIdx" : "noEndIdx"
                        }`
                      )
                    )
                  );
                  dispatch(SetIsOpen(true));
                })
          }
        >
          <div className="label">{t("utility.calendarFilter.Confirm")}</div>
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
`;

const SCalendarContainer = styled.div`
  width: 1200px;
  height: 960px;
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
      width: 100%;
      height: 36px;
      top: 30px;
      position: absolute;
      display: flex;

      .go-to-next-month {
        margin-right: 20px;
      }

      .hyphen {
        width: 16px;
        height: 40px;
        padding: 13px 5px 13px 6px;

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

      .date-view {
        width: 180px;
        height: 31px;
        margin: 2px 0 2px;
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
          width: 36px;
          height: 36px;
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
    height: 699px;
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

const SCalendarDaysInput = styled.div`
  width: 150px;
  height: 37px;
  margin: -1px 0px 0 1px;
  border-radius: 20px;
  border: solid 3px ${(props) => (props.isActive ? "#7056d9" : "rgba(0,0,0,0)")};
  background-color: ${theme.colors.bg_box};
  padding: 3px 7px 3px 15px;
  font-family: SpoqaHanSansNeo;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.23;
  letter-spacing: normal;
  text-align: left;
  color: ${theme.colors.text};

  display: flex;
  position: relative;

  .calendar-input {
    margin-top: 2px;
    width: 78px;
    cursor: pointer;
    color: ${theme.colors.text};
  }

  .calendar-icon {
    width: 34px;
    height: 34px;
    margin-top: -3px;
    position: absolute;
    right: 7px;
    cursor: pointer;
  }
`;
