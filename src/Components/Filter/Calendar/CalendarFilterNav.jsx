/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled/macro";
import { useTranslation } from "react-i18next";
import theme from "../../../Styles/Theme";

const CalendarFilterNav = () => {
  const { t } = useTranslation();
  return (
    <SCFContainer>
      <div className="calendar-filter-label">
        {t("utility.calendarFilter.dateSet")}
      </div>
      <SCFDaysInput
        placeholder={t("utility.calendarFilter.inputStart")}
      ></SCFDaysInput>
      <div className="hyphen">-</div>
      <SCFDaysInput
        placeholder={t("utility.calendarFilter.inputEnd")}
      ></SCFDaysInput>
      <SCFButton>{t("utility.calendarFilter.date.allSeason")}</SCFButton>
      <SCFButton>{t("utility.calendarFilter.date.recent3days")}</SCFButton>
      <SCFButton>{t("utility.calendarFilter.date.recent5days")}</SCFButton>
      <SCFButton>{t("utility.calendarFilter.date.recent7days")}</SCFButton>
      <SCFButton>{t("utility.calendarFilter.date.recent15days")}</SCFButton>
      <SCFButton>{t("utility.calendarFilter.date.recent1months")}</SCFButton>
      <SCFButton>{t("utility.calendarFilter.date.recent3months")}</SCFButton>
    </SCFContainer>
  );
};

export default CalendarFilterNav;

const SCFContainer = styled.div`
  height: 34px;
  margin: 0 0 20px 0;
  display: flex;

  .calendar-filter-label {
    height: 19px;
    margin: 8px 20px 8px 0;
    font-family: SpoqaHanSansNeo;
    font-size: 15px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    color: ${theme.colors.text};
  }

  .hyphen {
    width: 16px;
    height: 34px;
    padding: 12px 0px 8px 0px;

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
`;

const SCFDaysInput = styled.input`
  type: text;
  width: 122px;
  height: 34px;
  padding: 3px 0 0 10px;
  border-radius: 10px;
  margin: 0 2px;
  background-color: ${theme.colors.bg_box};

  font-family: SpoqaHanSansNeo;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.23;
  letter-spacing: normal;
  text-align: left;
  color: ${theme.colors.text};
`;

const SCFButton = styled.button`
  height: 34px;
  margin-left: 5px;
  padding: 9px 12px 7px;
  border-radius: 10px;
  background-color: ${theme.colors.bg_box};

  font-family: SpoqaHanSansNeo;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: ${theme.colors.text};
`;
