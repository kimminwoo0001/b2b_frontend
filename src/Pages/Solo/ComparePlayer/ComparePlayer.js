import React, { useState } from "react";
import styled, { css } from "styled-components";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import NormalInfo from "./NormalInfo";
import Stats from "./Stats";
import OppStat from "./OppStat";

import { ResetChampion } from "../../../redux/modules/filtervalue";

function ComparePlayer() {
  const [currentCompare, setCurrentCompare] = useState(0);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  //선수 비교 => 기본정보 , 능력치, 상대전적기록 탭
  const currentTab = {
    0: <NormalInfo />,
    1: <Stats />,
    2: <OppStat />,
  };

  return (
    <ComparePlayerWrapper>
      <ComparePlayerTabs changeColor={currentCompare}>
        <NormalInfoTab
          onClick={() => {
            setCurrentCompare(0);
            dispatch(ResetChampion());
          }}
          changeColor={currentCompare === 0}
        >
          <div>{t("solo.comparison.overview")}</div>
        </NormalInfoTab>
        <LineMargin></LineMargin>
        <StatTab
          onClick={() => {
            setCurrentCompare(1);
            dispatch(ResetChampion());
          }}
          changeColor={currentCompare === 1}
        >
          <div>{t("solo.comparison.stats")}</div>
        </StatTab>
        <LineMargin></LineMargin>
        <OppStatTab
          onClick={() => {
            setCurrentCompare(2);
            dispatch(ResetChampion());
          }}
          changeColor={currentCompare === 2}
        >
          <div>{t("solo.comparison.records")}</div>
        </OppStatTab>
        <LastMargin></LastMargin>
      </ComparePlayerTabs>
      <TabContents>{currentTab[currentCompare]}</TabContents>
    </ComparePlayerWrapper>
  );
}

export default ComparePlayer;

const ComparePlayerWrapper = styled.div``;

const ComparePlayerTabs = styled.div`
  display: flex;
  margin-top: 21.5px;
`;
const LineMargin = styled.div`
  width: 6px;
  border-bottom: 1px solid #433f4e;
`;

const LastMargin = styled.div`
  width: 721px;
  border-bottom: 1px solid #433f4e;
`;

const NormalInfoTab = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 36px;
  color: rgb(132, 129, 142);
  border-bottom: 1px solid #433f4e;
  font-family: NotoSansKR, Apple SD Gothic Neo;
  font-size: 18px;
  padding-bottom: 20px;

  ${(props) =>
    props.changeColor &&
    css`
      color: rgb(255, 255, 255);
      border-top: none;
      border-right: none;
      border-left: none;
      border-bottom: solid 1px #fff;
    `}
`;

const StatTab = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 36px;
  color: rgb(132, 129, 142);
  border-bottom: 1px solid #433f4e;

  font-family: NotoSansKR, Apple SD Gothic Neo;
  font-size: 18px;
  padding-bottom: 20px;

  ${(props) =>
    props.changeColor &&
    css`
      color: rgb(255, 255, 255);
      border-top: none;
      border-right: none;
      border-left: none;
      border-bottom: solid 1px #fff;
    `}
`;

const OppStatTab = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 36px;
  color: rgb(132, 129, 142);
  border-bottom: 1px solid #433f4e;

  font-family: NotoSansKR, Apple SD Gothic Neo;
  font-size: 18px;
  padding-bottom: 20px;

  ${(props) =>
    props.changeColor &&
    css`
      color: rgb(255, 255, 255);
      border-top: none;
      border-right: none;
      border-left: none;
      border-bottom: solid 1px #fff;
    `}
`;

const TabContents = styled.div``;
