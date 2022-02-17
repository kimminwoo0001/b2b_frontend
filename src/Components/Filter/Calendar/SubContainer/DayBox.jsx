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

const checkClick = (isStartSelector, startDayIdx, index) => {
  if (isStartSelector) {
    if (-1 < index) {
      return true;
    } else {
      return false;
    }
  } else {
    //const now = new Date();
    if (startDayIdx < index) {
      return true;
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
  const { year, day, month, index } = info;

  return (
    <SCalendarDayBox
      isAble={
        startDayIdx === index || checkClick(isStartSelector, startDayIdx, index)
      }
      isActive={
        selectIdx === index ||
        (!isStartSelector && startDayIdx === index) ||
        (!isStartSelector && startDayIdx <= index && index <= selectIdx)
      }
      onClick={() => {
        if (checkClick(isStartSelector, startDayIdx, index)) {
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
      <MatchBox text="T1 : GEN" />
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
