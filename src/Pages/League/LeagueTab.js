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
    3: <LeaguePlayer />,
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
        <TabItem onClick={() => setActiveTab(1)} changeColor={activeTab === 1}>
          <div>
            <span>{t("league.tab.draft")}</span>
          </div>
        </TabItem>
        {filters.league.indexOf("lpl") === -1 ? (
          <TabItem
            onClick={() => setActiveTab(2)}
            changeColor={activeTab === 2}
          >
            <div>
              <span>{t("league.tab.leagueStat")}</span>
            </div>
          </TabItem>
        ) : (
          <div></div>
        )}

        <TabItem onClick={() => setActiveTab(3)} changeColor={activeTab === 3}>
          <div>
            <span>{t("league.tab.playerStat")}</span>
          </div>
        </TabItem>
      </TabContainer>
      <div>{BoardTab[activeTab]}</div>
    </LeagueTabWrapper>
  );
}

export default LeagueTab;

const LeagueTabWrapper = styled.div`
  width: 1170px;
  height: 1080px;
  margin: 21px 0 25px 22px;
  /* padding: 0 30px; */
`;

const TabContainer = styled.ul`
  width: auto;
  height: 60px;
  display: flex;
  // border-bottom: 1px solid #433f4e;
  /* padding-bottom: 15px; */
`;

const TabItem = styled.li`
  cursor: pointer;
  display: flex;
  align-items: center;
  width: auto;
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
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    padding-bottom: 19px;
    color: ${(props) => (props.changeColor ? `#fff` : `#84818e`)};
  }
`;
