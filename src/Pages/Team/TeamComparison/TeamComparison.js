import React, { useState } from "react";
import styled, { css } from "styled-components";
import { useTranslation } from "react-i18next";

import ComparePosition from "./ComparePosition";
import CompareIngame from "./CompareIngame";
import CompareReport from "./CompareReport";

function TeamComparison({ filteredData }) {
  const [isClicked, setIsClicked] = useState(0);
  const { t } = useTranslation();
  //팀 비교 탭 안에 있는 포지션 별 비교 , 인게임 지표 비교, 팀 비교보고서 텝 변환
  const currentTab = {
    0: <CompareIngame filteredData={filteredData} />,
    1: <ComparePosition />,
    2: <CompareReport />
  };
  return (
    <TeamCompareTabWrapper>
      <TeamCompareTab>
        <Tab
          onClick={() => setIsClicked(0)}
          changeColor={isClicked === 0}
        >
          <div>{t("team.comparison.ingamesStat")}</div>
        </Tab>
        <LineMargin></LineMargin>
        <Tab
          onClick={() => setIsClicked(1)}
          changeColor={isClicked === 1}
        >
          <div>{t("team.comparison.lanes")}</div>
        </Tab>

        <LineMargin></LineMargin>
        {/* <Tab
          onClick={() => setIsClicked(2)}
          changeColor={isClicked === 2}
        >
          <div>{t("team.comparison.insights")}</div>
        </Tab> */}
        <LastMargin></LastMargin>
      </TeamCompareTab>
      <TabContents>{currentTab[isClicked]}</TabContents>
    </TeamCompareTabWrapper>
  );
}

export default TeamComparison;

const TeamCompareTabWrapper = styled.div``;

const TeamCompareTab = styled.div`
  display: flex;
  margin-top: 21.5px;
`;

const LastMargin = styled.div`
  width: 842px;
  border-bottom: solid 1px rgb(124, 119, 139);
`;

const LineMargin = styled.div`
  width: 6px;
  border-bottom: solid 1px rgb(124, 119, 139);
`;

const Tab = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 157px;
  height: 36px;
  padding-bottom: 20px;
  color: rgb(132, 129, 142);
  border-bottom: 1px solid rgb(124, 119, 139);
  font-weight: bold;
  font-size: 18px;
  ${(props) =>
    props.changeColor &&
    css`
      color: rgb(255, 255, 255);
      border-top: none;
      border-right: none;
      border-left: none;
      border-bottom: 1px solid  #fff;
    `}

  div {
    width: auto;
    font-family: Poppins;
    text-align: center;
  }
`;
;

// const ReportTab = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width: 125px;
//   height: 36px;
//   border: solid 1px rgb(67, 63, 78);
//   color: rgb(132, 129, 142);
//   border-bottom: 1px solid rgb(124, 119, 139);
//   cursor: pointer;
//   ${(props) =>
//     props.changeColor &&
//     css`
//       color: rgb(255, 255, 255);
//       border-top: solid 1px rgb(124, 119, 139);
//       border-right: solid 1px rgb(124, 119, 139);
//       border-left: solid 1px rgb(124, 119, 139);
//       border-bottom: none;
//     `}

//   div {
//     width: auto;
//     font-family: Poppins;
//     font-size: 13px;
//     text-align: center;
//   }
// `;

const TabContents = styled.div`

`;
