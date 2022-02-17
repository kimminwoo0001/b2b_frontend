/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled/macro";
import { useDispatch, useSelector } from "react-redux";
import theme from "../../../../Styles/Theme";
import { useTranslation } from "react-i18next";
import {
  SetCalendarDayEndIdx,
  SetCalendarDayStartIdx,
} from "../../../../redux/modules/calendarvalue";
import addZero from "../../../../lib/addZero";
import { SetDesc, SetIsOpen } from "../../../../redux/modules/modalvalue";
import MatchBox from "./MatchBox";
import getMonthDays from "../../../../lib/Calendar/getMonthDays";
import getMonthDayList from "../../../../lib/Calendar/getMonthDayList";
import getLeafYaer from "../../../../lib/Calendar/getLeafYear";

const checkClick = (
  isStartSelector,
  startDayIdx,
  index,
  year,
  seasonStart,
  seasonEnd
) => {
  const leapYear = getLeafYaer(year);
  const seasonStartIdx =
    getMonthDays(+seasonStart.split("-")[1] - 1, getMonthDayList(leapYear)) +
    +seasonStart.split("-")[2] -
    1;
  const seasonEndIdx =
    getMonthDays(+seasonEnd.split("-")[1] - 1, getMonthDayList(leapYear)) +
    +seasonEnd.split("-")[2] -
    1;
  if (isStartSelector) {
    if (-1 < index && seasonStartIdx <= index && index <= seasonEndIdx) {
      return true;
    } else {
      return false;
    }
  } else {
    //const now = new Date();
    if (
      startDayIdx < index &&
      seasonStartIdx <= index &&
      index <= seasonEndIdx
    ) {
      return true;
    } else {
      return false;
    }
  }
  return false;
};

const DayBox = ({
  info,
  isStartSelector,
  selectIdx,
  setSelectIdx,
  setSelectValue,
  startDayIdx,
}) => {
  const lang = useSelector((state) => state.LocaleReducer);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { year, day, month, index, match } = info;
  const calendar = useSelector((state) => state.CalendarReducer);

  if (match.length > 0) {
    console.log("match:", match);
  }
  return (
    <SCalendarDayBox
      isAble={
        startDayIdx === index ||
        checkClick(
          isStartSelector,
          startDayIdx,
          index,
          year,
          calendar.seasonStartDate,
          calendar.seasonEndDate
        )
      }
      isActive={
        selectIdx === index ||
        (!isStartSelector && startDayIdx === index) ||
        (!isStartSelector && startDayIdx <= index && index <= selectIdx)
      }
      onClick={() => {
        if (
          checkClick(
            isStartSelector,
            startDayIdx,
            index,
            year,
            calendar.seasonStartDate,
            calendar.seasonEndDate
          )
        ) {
          if (selectIdx !== index) {
            setSelectIdx(index);
            setSelectValue(`${year}-${addZero(month)}-${addZero(day + 1)}`);
          } else {
            setSelectIdx();
            setSelectValue();
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
      {match.map((data) => {
        return <MatchBox text={data} />;
      })}
    </SCalendarDayBox>
  );
};

export default DayBox;

const SCalendarDayBox = styled.div`
  width: 145px;
  height: 181px;
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
