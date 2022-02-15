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

const DayBox = ({
  info,
  isLeapYear,
  startDayIdx,
  endDayIdx,
  isStartSelector,
}) => {
  const lang = useSelector((state) => state.LocaleReducer);
  const { t } = useTranslation();
  const dispath = useDispatch();
  const { day, month, index } = info;
  console.log(
    startDayIdx,
    index,
    endDayIdx,
    startDayIdx <= index || index <= endDayIdx
  );
  return (
    <SCalendarDayBox
      isActive={
        startDayIdx === -1 &&
        startDayIdx <= index &&
        endDayIdx === -1 &&
        index <= endDayIdx
      }
      onClick={() => {
        console.log("a");
        dispath(
          isStartSelector
            ? SetCalendarDayStartIdx(index)
            : SetCalendarDayEndIdx(index)
        );
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
