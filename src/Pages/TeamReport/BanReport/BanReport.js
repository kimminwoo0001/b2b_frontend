import React, { useState } from "react";
import styled, { css } from "styled-components";
import { useTranslation } from "react-i18next";

import BanIndex from "./BanIndex";
// import BanBoard from "./BanBoard";

function BanReport() {
  const [isClicked, setIsClicked] = useState(0);
  const { t } = useTranslation();
  //밴픽 보고서 밴픽지표, 밴픽보고서 탭 변환
  const currentTab = {
    0: <BanIndex />
    // 1: <BanBoard />
  };
  return (
    <BanReportWrapper>
      <BanReportTabs>
        <BanIndexTab
          onClick={() => setIsClicked(0)}
          changeColor={isClicked === 0}
        >
          <div>{t("team.draft.stats")}</div>
        </BanIndexTab>

        {/* <BanBoardTab
          onClick={() => setIsClicked(1)}
          changeColor={isClicked === 1}
        >
          <div>{t("team.draft.insight")}</div>
        </BanBoardTab> */}
        <LastMargin></LastMargin>
      </BanReportTabs>
      <TabContents>{currentTab[isClicked]}</TabContents>
    </BanReportWrapper>
  );
}

export default BanReport;

const BanReportWrapper = styled.div``;

const BanReportTabs = styled.div`
  display: flex;
  margin-top: 21.5px;
`;
const LastMargin = styled.div`
  width: 989px;
  border-bottom: solid 1px rgb(124, 119, 139);
`;

const LineMargin = styled.div`
  width: 6px;
  border-bottom: solid 1px rgb(124, 119, 139);
`;

const BanIndexTab = styled.button`
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
    text-align: left;
  }
`;

// const BanBoardTab = styled.button`
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
//     text-align: left;
//   }
// `;

const TabContents = styled.div``;
