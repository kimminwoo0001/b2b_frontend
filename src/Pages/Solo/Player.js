import React, { useState } from "react";
import styled, { css } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import PlayerBoard from "../Solo/PlayerBoard/PlayerBoard";
// import PlayerVideo from "../Solo/PlayerVideo/PlayerVideo";
import PlayerSoloRank from "../Solo/PlayerSoloRank/PlayerSoloRank";
import ComparePlayer from "../Solo/ComparePlayer/ComparePlayer";
import PlayerSelectModal from "../../Components/Filter/PlayerSelectModal";
import { useTranslation } from "react-i18next";
import {
  HandleTab,
  ResetChampion,
  ResetFilter2
} from "../../redux/modules/filtervalue";
import ErrorBoundary from "../../Components/ErrorBoundary";
import HitMap from "../VideoReport/HitMap/HitMap";

function Player() {
  const filters = useSelector((state) => state.FilterReducer);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [openModal, setOpenModal] = useState(false);

  const BoardTab = {
    0: <PlayerBoard />,
    1: <ComparePlayer />,
    2: <PlayerSoloRank />,
    3: <HitMap />,
  };

  return (
    <>
      <ErrorBoundary>
        <PlayerSelectModal openModal={openModal} setOpenModal={setOpenModal} />
        <BoardWrapper>
          <TabContainer>
            <TabContent
              onClick={() => {
                dispatch(HandleTab(0));
                dispatch(ResetChampion());
                dispatch(ResetFilter2());
              }}
              changeColor={filters.tab === 0}
            >
              <div>{t("solo.tabs.board")}</div>
            </TabContent>
            {/* <SoloReport
            onClick={() => {
              dispatch(HandleTab(1));
              dispatch(ResetFilter2());
            }}
            changeColor={filters.tab === 1}
          >
            <div>{t("solo.tabs.soloRank")}</div>
            <img
              src={
                filters.tab === 1
                  ? "Images/ico-1depth-arrow-on.png"
                  : "Images/ico-1depth-arrow-off.png"
              }
              alt="arrowIcon"
            ></img>
          </SoloReport> */}
            <Comparison
              onClick={() => {
                setOpenModal(true);
              }}
              changeColor={filters.tab === 1}
            >
              <div>
                {filters.getoppplayer ? (
                  <div className="GetOpp">
                    <div>{t("solo.tabs.comparison")} :</div>
                    <div>{filters.getoppplayer}</div>
                  </div>
                ) : (
                  t("solo.tabs.comparison")
                )}
              </div>
            </Comparison>
            {/* <TabContent
              onClick={() => {
                dispatch(HandleTab(3));d
                dispatch(ResetFilter2());
              }}
              changeColor={filters.tab === 3}
            >
              <div>{t("solo.tabs.heatmap")}</div>
              <img
                src={
                  filters.tab === 3
                    ? "Images/ico-1depth-arrow-on.png"
                    : "Images/ico-1depth-arrow-off.png"
                }
                alt="arrowIcon"
              ></img>
            </TabContent> */}
          </TabContainer>
          <div>{BoardTab[filters.tab]}</div>
        </BoardWrapper>
      </ErrorBoundary>
    </>
  );
}

export default Player;

const BoardWrapper = styled.div`
  margin: 21px 0 25px 22px;
  width: 1097px;
  height: 100%;
`;

const TabContainer = styled.ul`
  display: flex;
`;

/*
const PlayerAility = styled.li`
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
*/

const TabContent = styled.li`
  cursor: pointer;
  display: flex;
  align-items: center;
  padding-bottom: 15px;
  color: #84818e;
  margin-right: 30px;
  font-weight: bold;
  font-size: 18px;

  ${(props) =>
    props.changeColor &&
    css`
      color: #fff;
    `}
  div {
    width: auto;
    height: 17px;
    font-family: NotoSansKR, Apple SD Gothic Neo;
    line-height: 1.31;
    letter-spacing: -0.65px;
    text-align: left;
    margin-right: 4px;
  }
  img {
  }
`;


// const SoloReport = styled.li`
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
//     font-family: NotoSansKR, Apple SD Gothic Neo;;
//     font-size: 13px;
//     line-height: 1.31;
//     letter-spacing: -0.65px;
//     text-align: left;
//     margin-right: 4px;
//   }
//   img {
//   }
// `;

const Comparison = styled.li`
  cursor: pointer;
  display: flex;
  align-items: center;
  padding-bottom: 15px;
  color: #84818e;
  margin-right: 30px;
  font-weight: bold;
  font-size: 18px;


  ${(props) =>
    props.changeColor &&
    css`
      color: #fff;
    `}
  div {
    width: auto;
    height: 17px;
    font-family: NotoSansKR, Apple SD Gothic Neo;
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

