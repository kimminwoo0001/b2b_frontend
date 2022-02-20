import React, { useState } from "react";
/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled/macro";
import { useTranslation } from "react-i18next";
import TeamIndex from "./TeamIndex";
import TeamBoard from "./TeamBoard";

function TeamReport({ filteredData }) {
  //팀 전력 보고서
  const { t } = useTranslation();
  const [isClicked, setIsClicked] = useState(0);
  const currentTab = {
    0: <TeamIndex filteredData={filteredData} />,
    1: <TeamBoard />
  };
  return (
    <TeamReportWrapper>
      <TeamReportTabs>
        <TeamIndexTab
          onClick={() => setIsClicked(0)}
          changeColor={isClicked === 0}
        >
          <div>{t("team.analysis.stat")}</div>
        </TeamIndexTab>
        <LineMargin></LineMargin>
        {/* <TeamBoardTab
          onClick={() => setIsClicked(1)}
          changeColor={isClicked === 1}
        >
          <div>{t("team.analysis.insight")}</div>
        </TeamBoardTab> */}
        <LastMargin></LastMargin>
      </TeamReportTabs>
      <TabContents>{currentTab[isClicked]}</TabContents>
    </TeamReportWrapper>
  );
}

export default TeamReport;

const TeamReportWrapper = styled.div``;

const TeamReportTabs = styled.div`
  display: flex;
  margin-top: 21.5px;
`;
const LastMargin = styled.div`
  width: 982px;
  border-bottom: solid 1px rgb(124, 119, 139);
`;

const LineMargin = styled.div`
  width: 6px;
  border-bottom: solid 1px rgb(124, 119, 139);
`;

const TeamIndexTab = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 125px;
  height: 36px;
  border: solid 1px rgb(67, 63, 78);
  color: rgb(132, 129, 142);
  border-bottom: 1px solid rgb(124, 119, 139);
  ${(props) =>
    props.changeColor &&
    css`
      color: rgb(255, 255, 255);
      border-top: solid 1px rgb(124, 119, 139);
      border-right: solid 1px rgb(124, 119, 139);
      border-left: solid 1px rgb(124, 119, 139);
      border-bottom: none;
    `}

  img {
    width: 14px;
    height: 14px;
  }
  div {
    width: auto;
    font-family: Poppins;
    font-size: 13px;
    text-align: center;
  }
`;

// const TeamBoardTab = styled.button`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width: 125px;
//   height: 36px;
//   border: solid 1px rgb(67, 63, 78);
//   color: rgb(132, 129, 142);
//   border-bottom: 1px solid rgb(124, 119, 139);
//   ${(props) =>
//     props.changeColor &&
//     css`
//       color: rgb(255, 255, 255);
//       border-top: solid 1px rgb(124, 119, 139);
//       border-right: solid 1px rgb(124, 119, 139);
//       border-left: solid 1px rgb(124, 119, 139);
//       border-bottom: none;
//     `}

//   img {
//     width: 14px;
//     height: 14px;
//   }
//   div {
//     width: auto;
//     font-family: Poppins;
//     font-size: 13px;
//     text-align: center;
//   }
// `;

const TabContents = styled.div``;
