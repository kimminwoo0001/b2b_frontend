import React, { useState } from "react";
/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled/macro";
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
        <TabItem
          onClick={() => {
            setCurrentCompare(0);
            dispatch(ResetChampion());
          }}
          changeColor={currentCompare === 0}
        >
          <div>
            <span>{t("solo.comparison.overview")}</span>
          </div>
        </TabItem>

        <TabItem
          onClick={() => {
            setCurrentCompare(1);
            dispatch(ResetChampion());
          }}
          changeColor={currentCompare === 1}
        >
          <div>
            <span>{t("solo.comparison.stats")}</span>
          </div>
        </TabItem>

        <TabItem
          onClick={() => {
            setCurrentCompare(2);
            dispatch(ResetChampion());
          }}
          changeColor={currentCompare === 2}
        >
          <div>
            <span>{t("solo.comparison.records")}</span>
          </div>
        </TabItem>
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
  height: 62px;
  //border-bottom: 1px solid #433f4e;
`;
const LineMargin = styled.div`
  width: 10px;
  border-bottom: solid 1px #433f4e;
`;

const LastMargin = styled.div`
  width: 73%;
  border-bottom: solid 1px #433f4e;
`;

const TabItem = styled.button`
  display: flex;
  align-items: center;
  width: auto;
  border-bottom: solid 1px #433f4e;
  white-space: nowrap;

  div {
    padding: 10px 15px;
  }

  :hover {
    div {
      padding: 10px 15px;
      border-radius: 10px;
      background-color: #26262c;
    }
  }

  span {
    height: 22px;
    font-family: SpoqaHanSansNeo;
    font-size: 18px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    padding-bottom: 18px;
    border-bottom: solid 1px ${(props) => (props.changeColor ? `#fff` : `none`)};
    color: ${(props) => (props.changeColor ? `#fff` : `#84818e`)};
  }
`;

const StatTab = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  height: 36px;
  color: rgb(132, 129, 142);
  font-family: NotoSansKR, Apple SD Gothic Neo;
  font-size: 18px;
  padding: 10px 0;
  margin-right: 10px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

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
  width: auto;
  height: 36px;
  color: rgb(132, 129, 142);
  font-family: NotoSansKR, Apple SD Gothic Neo;
  font-size: 18px;
  padding: 10px 0;
  margin-right: 10px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

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
