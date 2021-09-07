import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styled, { css } from "styled-components";

import { useSelector, useDispatch } from "react-redux";
import BanReport from "./BanReport/BanReport";
import TeamReport from "./TeamReport/TeamReport";
import TeamComparison from "./TeamComparison/TeamComparison";

import TeamSelectModal from "./TeamComparison/TeamSelectModal";
import { HandleTab, ResetFilter2 } from "../../redux/modules/filtervalue";

function TeamTabs() {
  //팀 보고서 탭
  //ex) 밴픽 보고서, 팀 전력보고서 , 팀비교
  const filters = useSelector((state) => state.FilterReducer);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [openModal, setOpenModal] = useState(false);
  const [whichTeam, setWhichTeam] = useState();

  const TeamTab = {
    0: <BanReport />,
    1: <TeamReport />,
    2: <TeamComparison />
  };

  return (
    <>
      <TeamSelectModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        whichTeam={whichTeam}
        setWhichTeam={setWhichTeam}
      />
      <TeamTabsWrapper>
        <TabContainer>
          {/* <Schedule
            onClick={() => {
              dispatch(HandleTab(0));
              dispatch(ResetFilter2());
            }}
            changeColor={filters.tab === 0}
          >
            <div>{t("team.tab.calendar")}</div>
            <img
              src={
                filters.tab === 0
                  ? "Images/ico-1depth-arrow-on.png"
                  : "Images/ico-1depth-arrow-off.png"
              }
              alt="arrowIcon"
            ></img>
          </Schedule> */}
          <Pick
            onClick={() => {
              dispatch(HandleTab(0));
              dispatch(ResetFilter2());
            }}
            changeColor={filters.tab === 0}
          >
            <div>{t("team.tab.draft")}</div>
            <img
              src={
                filters.tab === 0
                  ? "Images/ico-1depth-arrow-on.png"
                  : "Images/ico-1depth-arrow-off.png"
              }
              alt="arrowIcon"
            ></img>
          </Pick>

          {filters.league.indexOf("lpl") === -1 ? (
            <Statistics
              onClick={() => {
                dispatch(HandleTab(1));
                dispatch(ResetFilter2());
              }}
              changeColor={filters.tab === 1}
            >
              <div>{t("team.tab.analysis")}</div>
              <img
                src={
                  filters.tab === 1
                    ? "Images/ico-1depth-arrow-on.png"
                    : "Images/ico-1depth-arrow-off.png"
                }
                alt="arrowIcon"
              ></img>
            </Statistics>
          ) : (
            <div></div>
          )}

          {filters.league.indexOf("lpl") === -1 ? (
            <TeamCompare
              onClick={() => {
                dispatch(HandleTab(2));
                setOpenModal(true);
              }}
              changeColor={filters.tab === 2}
            >
              <div>
                {filters.getoppteam ? (
                  <div className="GetOpp">
                    <div>{t("team.tab.comparison")}:</div>
                    <img
                      width="16px"
                      height="16px"
                      src={`Images/TeamLogo/${filters.getoppteam}.png`}
                      alt="TeamLogo"
                      className="TeamLogo"
                    />
                    <div>{filters.getoppteam}</div>
                  </div>
                ) : (
                  t("team.tab.comparison")
                )}
              </div>
              <img
                src={
                  filters.tab === 2
                    ? "Images/ico-1depth-arrow-on.png"
                    : "Images/ico-1depth-arrow-off.png"
                }
                alt="arrowIcon"
              ></img>
            </TeamCompare>
          ) : (
            <div></div>
          )}
        </TabContainer>
        <div>{TeamTab[filters.tab]}</div>
      </TeamTabsWrapper>
    </>
  );
}

export default TeamTabs;

const TeamTabsWrapper = styled.div`
  margin: 21px 0 25px 22px;
  width: 1097px;
  /* height: calc(100vh - 95px); */
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

const TeamCompare = styled.li`
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
  .GetOpp {
    display: flex;
    align-items: center;
  }
  .TeamLogo {
    margin: 0 2.5px;
  }
`;
