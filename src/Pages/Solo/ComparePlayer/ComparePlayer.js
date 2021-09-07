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
    2: <OppStat />
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
  border-bottom: solid 1px rgb(124, 119, 139);
`;

const LastMargin = styled.div`
  width: 721px;
  border-bottom: solid 1px rgb(124, 119, 139);
`;

const NormalInfoTab = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 125px;
  height: 36px;
  border: solid 1px rgb(67, 63, 78);
  color: rgb(132, 129, 142);
  border-bottom: 1px solid rgb(124, 119, 139);
  font-family: NotoSansKR, Apple SD Gothic Neo;
  font-size: 13px;

  ${(props) =>
    props.changeColor &&
    css`
      color: rgb(255, 255, 255);
      border-top: solid 1px rgb(124, 119, 139);
      border-right: solid 1px rgb(124, 119, 139);
      border-left: solid 1px rgb(124, 119, 139);
      border-bottom: none;
    `}
`;

const StatTab = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 125px;
  height: 36px;
  border: solid 1px rgb(67, 63, 78);
  color: rgb(132, 129, 142);
  border-bottom: 1px solid rgb(124, 119, 139);
  font-family: NotoSansKR, Apple SD Gothic Neo;
  font-size: 13px;

  ${(props) =>
    props.changeColor &&
    css`
      color: rgb(255, 255, 255);
      border-top: solid 1px rgb(124, 119, 139);
      border-right: solid 1px rgb(124, 119, 139);
      border-left: solid 1px rgb(124, 119, 139);
      border-bottom: none;
    `}
`;

const OppStatTab = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 125px;
  height: 36px;
  border: solid 1px rgb(67, 63, 78);
  color: rgb(132, 129, 142);
  border-bottom: 1px solid rgb(124, 119, 139);
  font-family: NotoSansKR, Apple SD Gothic Neo;
  font-size: 13px;

  ${(props) =>
    props.changeColor &&
    css`
      color: rgb(255, 255, 255);
      border-top: solid 1px rgb(124, 119, 139);
      border-right: solid 1px rgb(124, 119, 139);
      border-left: solid 1px rgb(124, 119, 139);
      border-bottom: none;
    `}
`;

const TabContents = styled.div``;
