/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled/macro";
import { batch, useDispatch, useSelector } from "react-redux";
import theme from "../../../../Styles/Theme";
import { useTranslation } from "react-i18next";
import addZero from "../../../../lib/addZero";
import { SetDesc, SetIsOpen } from "../../../../redux/modules/modalvalue";
import MatchBox from "./MatchBox";
import getMonthDays from "../../../../lib/Calendar/getMonthDays";
import getMonthDayList from "../../../../lib/Calendar/getMonthDayList";
import getLeafYaer from "../../../../lib/Calendar/getLeafYear";
const START_DATE = "START_DATE";
const END_DATE = "END_DATE";

const checkClick = (index, year, seasonStart, seasonEnd) => {
  const leapYear = getLeafYaer(year);
  const seasonStartIdx =
    getMonthDays(+seasonStart.split("-")[1] - 1, getMonthDayList(leapYear)) +
    +seasonStart.split("-")[2] -
    1;
  const seasonEndIdx =
    getMonthDays(+seasonEnd.split("-")[1] - 1, getMonthDayList(leapYear)) +
    +seasonEnd.split("-")[2] -
    1;
  if (seasonStartIdx <= index && index <= seasonEndIdx) {
    return true;
  } else {
    return false;
  }
};

const DayBox = ({
  info,
  activeLabel,
  selectStartIdx,
  selectEndIdx,
  setActiveLabel,
  setSelectStartIdx,
  setSelectEndIdx,
  setSelectStartValue,
  setSelectEndValue,
}) => {
  const lang = useSelector((state) => state.LocaleReducer);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { year, day, month, index, match } = info;
  const calendar = useSelector((state) => state.CalendarReducer);
  const getActiveLabel = (activeLabel, index) => {
    const exception1 = activeLabel === END_DATE && index < selectStartIdx;
    const exception2 = activeLabel === START_DATE && index > selectEndIdx;
    if (activeLabel === START_DATE || exception1) {
      batch(() => {
        if (exception1 || exception2) {
          setSelectEndIdx("");
          setSelectEndValue("");
        }
        setActiveLabel(END_DATE);
      });
      return START_DATE;
    } else {
      if (selectStartIdx === "") {
        setActiveLabel(START_DATE);
      }
      return END_DATE;
    }
  };
  return (
    <SCalendarDayBox
      isAble={
        selectStartIdx === index ||
        checkClick(
          index,
          year,
          calendar.seasonStartDate,
          calendar.seasonEndDate
        )
      }
      isActive={
        selectStartIdx === index ||
        selectEndIdx === index ||
        (selectStartIdx !== "" &&
          selectStartIdx <= index &&
          index <= selectEndIdx)
      }
      onClick={() => {
        if (
          checkClick(
            index,
            year,
            calendar.seasonStartDate,
            calendar.seasonEndDate
          )
        ) {
          if (getActiveLabel(activeLabel, index) === START_DATE) {
            setSelectStartIdx(index);
            setSelectStartValue(
              `${year}-${addZero(month)}-${addZero(day + 1)}`
            );
            setActiveLabel(END_DATE);
          } else {
            setSelectEndIdx(index);
            setSelectEndValue(`${year}-${addZero(month)}-${addZero(day + 1)}`);
          }
        } else {
          dispatch(SetDesc(t("utility.calendarFilter.desc.wrongDate")));
          dispatch(SetIsOpen(true));
        }
      }}
    >
      {day >= 0 && month < 13 && (
        <div className="header-day">
          {lang === "ko"
            ? (day === 0 ? `${month}${t("common.date.month")} ` : "") +
              `${day + 1}${t("common.date.day")}`
            : `${month}/${day + 1}`}
        </div>
      )}
      <div className="match-box-container">
        {match.map((data) => {
          return <MatchBox text={data} />;
        })}
      </div>
    </SCalendarDayBox>
  );
};

export default DayBox;

const SCalendarDayBox = styled.div`
  width: 145px;
  height: 123px;
  margin: 0 10px 20px;
  //padding: 9px 0 10px;
  border-radius: 20px;
  background-color: ${(props) =>
    props.isActive ? theme.colors.point : theme.colors.bg_button};
  opacity: ${(props) => (props.isAble ? "1" : "0.3")};

  &:hover {
    background-color: ${(props) =>
      props.isActive ? theme.colors.point_hover : theme.colors.bg_hover};
  }


  .match-box-container {
    height: 74px;
    overflow: scroll;
  }

  .header-day {
    height: 19px;
    margin: 9px 20px 3px;
    margin-bottom: 3px;
    font-family: SpoqaHanSansNeo;
    font-size: 15px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1;
    letter-spacing: normal;
    text-align: left;
    color: ${theme.colors.text};
  }
`;
