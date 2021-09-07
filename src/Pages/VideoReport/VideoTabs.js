import React from "react";
import styled, { css } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { HandleTab, Reset_MapTab } from "../../redux/modules/filtervalue";
import WardMapping from "./WardMapping/WardMapping";
import ObjectMapping from "./ObjectMapping/ObjectMapping";
import GameMapping from "./GameMapping/GameMapping";
import HitMap from "./HitMap/HitMap";
import { useTranslation } from "react-i18next";

function VideoTabs() {
  const filters = useSelector((state) => state.FilterReducer);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const VideoTab = {
    0: <WardMapping />,
    1: <ObjectMapping />,
    2: <GameMapping />,
    3: <HitMap />
  };

  return (
    <>
      <VideoTabsWrapper>
        <TabContainer>
          <TabContent
            onClick={() => {
              dispatch(HandleTab(0));
              dispatch(Reset_MapTab());
            }}
            changeColor={filters.tab === 0}
          >
            <div>{t("video.tab.ward")}</div>
            <img
              src={
                filters.tab === 0
                  ? "Images/ico-1depth-arrow-on.png"
                  : "Images/ico-1depth-arrow-off.png"
              }
              alt="arrowIcon"
            ></img>
          </TabContent>
          <TabContent
            onClick={() => {
              dispatch(HandleTab(1));
              dispatch(Reset_MapTab());
            }}
            changeColor={filters.tab === 1}
          >
            <div>{t("video.tab.object")}</div>
            <img
              src={
                filters.tab === 1
                  ? "Images/ico-1depth-arrow-on.png"
                  : "Images/ico-1depth-arrow-off.png"
              }
              alt="arrowIcon"
            ></img>
          </TabContent>
          <TabContent
            onClick={() => {
              dispatch(HandleTab(2));
              dispatch(Reset_MapTab());
            }}
            changeColor={filters.tab === 2}
          >
            <div>{t("video.tab.games")}</div>
            <img
              src={
                filters.tab === 2
                  ? "Images/ico-1depth-arrow-on.png"
                  : "Images/ico-1depth-arrow-off.png"
              }
              alt="arrowIcon"
            ></img>
          </TabContent>
          <TabContent
            onClick={() => {
              dispatch(HandleTab(3));
              dispatch(Reset_MapTab());
            }}
            changeColor={filters.tab === 3}
          >
            <div>{t("video.tab.heatmap")}</div>
            <img
              src={
                filters.tab === 3
                  ? "Images/ico-1depth-arrow-on.png"
                  : "Images/ico-1depth-arrow-off.png"
              }
              alt="arrowIcon"
            ></img>
          </TabContent>
        </TabContainer>
        <div>{VideoTab[filters.tab]}</div>
      </VideoTabsWrapper>
    </>
  );
}

export default VideoTabs;

const VideoTabsWrapper = styled.div`
  margin: 21px 0 25px 22px;
  width: 1097px;
`;

const TabContainer = styled.ul`
  display: flex;
  border-bottom: 1px solid #433f4e;
  /* padding-bottom: 15px; */
`;

const TabContent = styled.li`
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
