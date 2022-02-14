/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled/macro";
import { useSelector } from "react-redux";
import theme from "../../../../Styles/Theme";
import { useTranslation } from "react-i18next";

const DayBox = ({ info, isLeapYear }) => {
  const lang = useSelector((state) => state.LocaleReducer);
  const { t } = useTranslation();
  const { day, month } = info;
  console.log("month", month);
  return (
    <SCalendarDayBox>
      {day >= 0 && day < (isLeapYear ? 366 : 365) && (
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
  background-color: ${theme.colors.bg_button};

  .header-day {
    height: 19px;
    margin: 21px 0 26px 20px;
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
