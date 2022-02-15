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

const checkClick = (isStartSelector, startDayIdx, index) => {
  if (isStartSelector) {
    return true;
  } else {
    const now = new Date();
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
    </SCalendarDayBox>
  );
};

export default DayBox;

const SCalendarDayBox = styled.div`
  width: 145px;
  height: 181px;
  margin: 0 10px 20px;
  border-radius: 20px;
  background-color: ${(props) =>
    props.isActive ? theme.colors.point : theme.colors.bg_button};

  .header-day {
    height: 19px;
    padding: 21px 0 26px 20px;
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
