import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
function SelectFilter() {
  const { t } = useTranslation();
  // 필터 미선택시 띄어주는 화면
  return (
    <SelectFilterWrapper>
      <div className="FirstLabel">{t("filters.selectOption")}</div>
      <div className="SecondLabel">
        {t("filters.selectOption2")} {t("filters.selectOption3")}
      </div>
    </SelectFilterWrapper>
  );
}

export default SelectFilter;

const SelectFilterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  background-color: #23212a;
  width: 90%;
  min-width: 800px;
  height: 16%;
  min-height: 100px;
  margin: 60px;

  .FirstLabel {
    width: auto;
    height: 22px;
    margin: 0 203px 20px;
    font-family: SpoqaHanSansNeo;
    font-size: 18px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.11;
    letter-spacing: normal;
    text-align: center;
    color: #fff;
  }
  .SecondLabel {
    width: auto;
    height: 18px;
    margin: 20px 0 0;
    font-family: SpoqaHanSansNeo;
    font-size: 15px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.73;
    letter-spacing: normal;
    text-align: center;
    color: #fff;
  }
`;
