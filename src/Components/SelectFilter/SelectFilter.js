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
        {t("filters.selectOption2")}
        <br /> {t("filters.selectOption3")}
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
  width: 100%;
  height: calc(100vh - 50px);

  .FirstLabel {
    width: 270px;
    height: 21px;
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 15px;
    font-weight: bold;
    letter-spacing: -0.75px;
    text-align: center;
    color: #ffffff;
  }
  .SecondLabel {
    width: 280px;
    height: 34px;
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 12px;
    letter-spacing: -0.6px;
    text-align: center;
    color: #827f8c;
    line-height: 1.25;
  }
`;
