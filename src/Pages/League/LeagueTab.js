import React, { useState } from "react";
import styled, { css } from "styled-components";
import { useTranslation } from "react-i18next";
import LeagueSchedule from "./LeagueSchedule/LeagueSchedule";
import LeaguePick from "./LeaguePick/LeaguePick";
import LeagueStatistics from "./LeagueStatistics/LeagueStatistics";
import LeaguePlayer from "./LeaguePlayer/LeaguePlayer";
import { useSelector } from "react-redux";
function LeagueTab() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(1);
  const filters = useSelector((state) => state.FilterReducer);
  //리그 보고서 탭 변환
  const BoardTab = {
    0: <LeagueSchedule />,
    1: <LeaguePick />,
    2: <LeagueStatistics />,
    3: <LeaguePlayer />
  };

  return (
    <LeagueTabWrapper>
      <TabContainer>
        {/* <Schedule onClick={() => setActiveTab(0)} changeColor={activeTab === 0}>
          <div>{t("league.tab.calendar")}</div>
          <img
            src={
              activeTab === 0
                ? "Images/ico-1depth-arrow-on.png"
                : "Images/ico-1depth-arrow-off.png"
            }
            alt="arrowIcon"
          ></img>
        </Schedule> */}
        <Pick onClick={() => setActiveTab(1)} changeColor={activeTab === 1}>
          <div>{t("league.tab.draft")}</div>
          <img
            src={
              activeTab === 1
                ? "Images/ico-1depth-arrow-on.png"
                : "Images/ico-1depth-arrow-off.png"
            }
            alt="arrowIcon"
          ></img>
        </Pick>
        {filters.league.indexOf("lpl") === -1 ? (
          <Statistics
            onClick={() => setActiveTab(2)}
            changeColor={activeTab === 2}
          >
            <div>{t("league.tab.leagueStat")}</div>
            <img
              src={
                activeTab === 2
                  ? "Images/ico-1depth-arrow-on.png"
                  : "Images/ico-1depth-arrow-off.png"
              }
              alt="arrowIcon"
            ></img>
          </Statistics>
        ) : (
          <div></div>
        )}

        <Information
          onClick={() => setActiveTab(3)}
          changeColor={activeTab === 3}
        >
          <div>{t("league.tab.playerStat")}</div>
          <img
            src={
              activeTab === 3
                ? "Images/ico-1depth-arrow-on.png"
                : "Images/ico-1depth-arrow-off.png"
            }
            alt="arrowIcon"
          ></img>
        </Information>
      </TabContainer>
      <div>{BoardTab[activeTab]}</div>
    </LeagueTabWrapper>
  );
}

export default LeagueTab;

const LeagueTabWrapper = styled.div`
  margin: 21px 0 25px 22px;
  width: 1097px;
  height: 100%;
`;

const TabContainer = styled.ul`
  display: flex;
  border-bottom: 1px solid #433f4e;
  /* padding-bottom: 15px; */
`;

// const Schedule = styled.li`
//   cursor: pointer;
//   display: flex;
//   align-items: center;
//   padding-bottom: 15px;
//   color: #84818e;
//   margin-right: 30px;
//   ${(props) =>
//     props.changeColor &&
//     css`
//       color: #f04545;
//       border-bottom: 2px solid #f04545;
//     `}
//   div {
//     width: auto;
//     height: 17px;
//     font-family: NotoSansKR, Apple SD Gothic Neo;
//     font-size: 13px;
//     line-height: 1.31;
//     letter-spacing: -0.65px;
//     text-align: left;
//     margin-right: 4px;
//   }
//   img {
//   }
// `;

const Pick = styled.li`
  cursor: pointer;
  display: flex;
  align-items: center;
  padding-bottom: 15px;
  color: #84818e;
  margin-right: 30px;
  ${(props) =>
    props.changeColor &&
    css`
      color: #f04545;
      border-bottom: 2px solid #f04545;
    `}
  div {
    width: auto;
    height: 17px;
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 13px;
    line-height: 1.31;
    letter-spacing: -0.65px;
    text-align: left;
    margin-right: 4px;
  }
  img {
  }
`;

const Statistics = styled.li`
  cursor: pointer;
  display: flex;
  align-items: center;
  padding-bottom: 15px;
  color: #84818e;
  margin-right: 30px;
  ${(props) =>
    props.changeColor &&
    css`
      color: #f04545;
      border-bottom: 2px solid #f04545;
    `}
  div {
    width: auto;
    height: 17px;
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 13px;
    line-height: 1.31;
    letter-spacing: -0.65px;
    text-align: left;
    margin-right: 4px;
  }
  img {
  }
`;

const Information = styled.li`
  cursor: pointer;
  display: flex;
  align-items: center;
  padding-bottom: 15px;
  color: #84818e;
  margin-right: 30px;
  ${(props) =>
    props.changeColor &&
    css`
      color: #f04545;
      border-bottom: 2px solid #f04545;
    `}
  div {
    width: auto;
    height: 17px;
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 13px;
    line-height: 1.31;
    letter-spacing: -0.65px;
    text-align: left;
    margin-right: 4px;
  }
  img {
  }
`;
