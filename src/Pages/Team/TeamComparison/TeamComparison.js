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
    2: <CompareReport />,
  };
  return (
    <TeamCompareTabWrapper>
      <TeamCompareTab>
        <Tab onClick={() => setIsClicked(0)} changeColor={isClicked === 0}>
          <div>
            <span>{t("team.comparison.ingamesStat")}</span>
          </div>
        </Tab>

        <Tab onClick={() => setIsClicked(1)} changeColor={isClicked === 1}>
          <div>
            <span>{t("team.comparison.lanes")}</span>
          </div>
        </Tab>

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
  height: 62px;
`;

const LastMargin = styled.div`
  width: 842px;
  border-bottom: solid 1px #433f4e;
`;

const LineMargin = styled.div`
  width: 6px;
  border-bottom: solid 1px #433f4e;
`;

const Tab = styled.button`
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
    border-bottom: solid 1px
      ${(props) => (props.changeColor ? `#fff` : `#433f4e;`)};
    color: ${(props) => (props.changeColor ? `#fff` : `#84818e`)};
  }
  :hover {
    div {
      padding: 10px 15px;
      border-radius: 10px;
      background-color: #26262c;
    }
  }
`;
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

const TabContents = styled.div``;
