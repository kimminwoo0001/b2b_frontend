import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { SelectorInitailizeState } from "../../redux/modules/selectorvalue";
import {
  InitailizeState,
  ResetWardPathingTab,
  HandleTab,
  Reset_MapTab,
  Reset_Object_MapTab,
} from "../../redux/modules/filtervalue";
import WardMapping from "./WardMapping/WardMapping";
import ObjectMapping from "./ObjectMapping/ObjectMapping";
import GameMapping from "./GameMapping/GameMapping";
import HitMap from "./HitMap/HitMap";
import JungleMap from "./JungleMap/JungleMap";
import { useTranslation } from "react-i18next";

function VideoTabs() {

  const filters = useSelector((state) => state.FilterReducer);
  const [team, setTeam] = useState("")
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    if (team !== filters.team) {
      setTeam(filters.team);
      dispatch(Reset_MapTab());
      dispatch(Reset_Object_MapTab());
    }
  }, [filters.team])

  const VideoTab = {
    0: <WardMapping />,
    1: <ObjectMapping />,
    2: <GameMapping />,
    3: <HitMap />,
    4: <JungleMap />,
  };

  return (
    <>
      <VideoTabsWrapper>
        <TabContainer>
          <TabContent
            onClick={() => {
              dispatch(HandleTab(0));
              dispatch(Reset_MapTab());
              if (filters.tab === 4) {
                dispatch(ResetWardPathingTab());
                dispatch(SelectorInitailizeState());
              }
            }}
            changeColor={filters.tab === 0}
          >
            <div>
              <span>{t("video.tab.ward")}</span>
            </div>
          </TabContent>
          <TabContent
            onClick={() => {
              dispatch(HandleTab(1));
              dispatch(Reset_MapTab()); 
              dispatch(Reset_Object_MapTab());
              if (filters.tab === 4) {
              dispatch(ResetWardPathingTab());
              dispatch(SelectorInitailizeState());

              }
            }}
            changeColor={filters.tab === 1}
          >
            <div>
              <span>{t("video.tab.object")}</span>
            </div>
          </TabContent>
          {/* <TabContent
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
          </TabContent> */}
          <TabContent
            onClick={() => {
              dispatch(HandleTab(3));
              dispatch(Reset_MapTab());
              if (filters.tab === 4) {
              dispatch(ResetWardPathingTab());
              dispatch(SelectorInitailizeState());
              }
            }}
            changeColor={filters.tab === 3}
          >
            <div>
              <span>{t("video.tab.heatmap")}</span>
            </div>
          </TabContent>
          {/* 정글동선 탭 */}
          <TabContent
            onClick={() => {
              dispatch(HandleTab(4));
              dispatch(Reset_MapTab());
              dispatch(ResetWardPathingTab());
              dispatch(SelectorInitailizeState());
              // dispatch(InitializeGameState());
              // dispatch(InitailizeState());

            }}
            changeColor={filters.tab === 4}
          >
            <div>
              <span>{t("video.tab.jungle")}</span>
            </div>
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
  width: auto;
  height: 60px;
  display: flex;
  cursor: pointer;
  //border-bottom: 1px solid #433f4e;
  /* padding-bottom: 15px; */
`;

const TabContent = styled.li`
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
