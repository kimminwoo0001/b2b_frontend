import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
function SelectFilter() {
  const { t } = useTranslation();
  // 필터 미선택시 띄어주는 화면
  return (
    <SelectFilterWrapper>
      <InnerWrapper>
        <div className="FirstLabel">{t("filters.selectOption")}</div>
        <div className="SecondLabel">
          {t("filters.selectOption2")} {t("filters.selectOption3")}
        </div>
      </InnerWrapper>
    </SelectFilterWrapper>
  );
}

export default SelectFilter;

const SelectFilterWrapper = styled.div`
  /* display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; */
  /* width: 100%;
  height: calc(100vh - 50px); */
  padding-top: 60px;
`;

const InnerWrapper = styled.div`
  background-color: #23212a;
  padding: 50px 100px;
  border-radius: 30px;
  width: 1050px;
  margin: 0 auto;

  .FirstLabel {
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 18px;
    font-weight: bold;
    letter-spacing: -0.75px;
    text-align: center;
    color: #fff;
    margin-bottom: 20px;
  }
  .SecondLabel {
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 15px;
    letter-spacing: -0.6px;
    text-align: center;
    color: #fff;
    line-height: 1.25;
  }
`;
