import React, { useState, useEffect, useRef } from "react";
import Tippy from "@tippy.js/react";
import styled, { css } from "styled-components";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import {
  Link,
  DirectLink,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller,
} from "react-scroll";
import GameReportToolTip from "../../Common/GameReportToolTip";
import KillEventBox from "./EventOption/KillEventBox";
import MonsterEventBox from "./EventOption/MonsterEventBox";
import BuildEventBox from "./EventOption/BuildEventBox";

const typeCase = (type, data, isActive, idx) => {
  switch (type) {
    case "CHAMPION_KILL":
      return (
        <Element name={`event-log-${idx}`} className="element">
          <KillEventBox data={data} isActive={isActive} />
        </Element>
      );
    case "ELITE_MONSTER_KILL":
      return (
        <Element name={`event-log-${idx}`} className="element">
          <MonsterEventBox data={data} isActive={isActive} />
        </Element>
      );
    case "BUILDING_KILL":
      return (
        <Element name={`event-log-${idx}`} className="element">
          <BuildEventBox data={data} isActive={isActive} />
        </Element>
      );
    default:
      return;
  }
};

const EventLogBox = () => {
  const gamevalue = useSelector((state) => state.GameReportReducer);
  const logBoxRef = useRef();

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const eventLog = gamevalue.logDataset.event;

  if (eventLog[0].type !== "NONE") {
    eventLog.unshift({
      type: "NONE",
      realCount: 0,
    });
  }



  const autoMoveScroll = (idx) => {
    if (idx > 0) {
      scroller.scrollTo(`event-log-${idx}`, {
        duration: 500,
        delay: 0,
        smooth: "easeInOutQuart",
        containerId: "eventLogContentBox",
      });
    } else {
      scroll.scrollToTop({
        duration: 500,
        delay: 0,
        smooth: "easeInOutQuart",
        containerId: "eventLogContentBox",
      });
    }
  };

  useEffect(() => {
    console.log(gamevalue.eventLogActiveIdx);
    autoMoveScroll(gamevalue.eventLogActiveIdx);
  }, [gamevalue.eventLogActiveIdx]);

  return (
    <LogDetailContainer>
      <LogTitle>
        <div>
          <span>{t("game.log.event.subject")}</span>
          <StyledTippy
            duration={0}
            delay={[100, 0]}
            content={
              <GameReportToolTip
                tooltipInfo={t("game.log.event.tooltipInfo")}
              />
            }
            placement="bottom"
          >
            <img src={"Images/ico-question-mark.svg"} alt="question" />
          </StyledTippy>
        </div>
      </LogTitle>
      <LogContentBox ref={logBoxRef} id={"eventLogContentBox"}>
        {eventLog.map((data, idx, arr) => {
          return typeCase(
            data.type,
            data,
            idx === gamevalue.eventLogActiveIdx,
            idx
          );
        })}
      </LogContentBox>
    </LogDetailContainer>
  );
};

export default EventLogBox;

const LogDetailContainer = styled.div`
  width: 200px;
  height: 502px;
  margin: 0px 14px 13px 26px;
  padding: 10px 10px 0;
  border-radius: 20px;
  background-color: #23212a;
  overflow: hidden;
`;

const LogTitle = styled.div`
  width: auto;
  height: 21px;
  span {
    font-family: SpoqaHanSansNeo;
    font-size: 16px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 2.63;
    letter-spacing: normal;
    text-align: left;
    color: #fff;
  }

  img {
    width: 15px;
    height: 15px;
    margin: -5px 0 0px 5px;
    object-fit: contain;
    vertical-align: middle;
  }
`;

const StyledTippy = styled(Tippy)``;

const LogContentBox = styled.div`
  width: 180px;
  height: 91%;
  margin: 10px 0 0;
  overflow-y: scroll;
  overflow-x: hidden;

  /* Hide scrollbar for Chrome, Safari and Opera */
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;
