import React, { useRef } from "react";
import Tippy from "@tippy.js/react";
import styled, { css } from "styled-components";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import GameReportToolTip from "../../Common/GameReportToolTip";
import { useState } from "react";
import { useEffect } from "react";
import { Element, animateScroll as scroll, scroller } from "react-scroll";
import GankingRoamingStatusBox from "./StatusOption/GankingRoamingStatusBox";
import RoamingStatusBox from "./StatusOption/RoamingStatusBox";
import DiveStatusBox from "./StatusOption/DiveStatusBox";
import StarterStatusBox from "./StatusOption/StarterStatusBox";

const typeCase = (type, data, isActive, idx) => {
  switch (type) {
    case "Ganking":
      return (
        <Element name={`status-log-${idx}`} className="element">
          <GankingRoamingStatusBox
            gankingData={data}
            isActive={isActive}
            id={type.toLowerCase()}
          />
        </Element>
      );
    case "Roaming":
      return (
        <Element name={`status-log-${idx}`} className="element">
          <GankingRoamingStatusBox
            gankingData={data}
            isActive={isActive}
            id={type.toLowerCase()}
          />
        </Element>
      );
    default:
      return;
  }
};

const StatusLogBox = () => {
  const gamevalue = useSelector((state) => state.GameReportReducer);
  const logBoxRef = useRef();

  const statusLog = gamevalue.statusLogDataset;

  const { t } = useTranslation();
  const dispatch = useDispatch();

  if (statusLog[0].type !== "NONE") {
    statusLog.unshift({
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
        containerId: "statusLogContentBox",
      });
    } else {
      scroll.scrollToTop({
        duration: 500,
        delay: 0,
        smooth: "easeInOutQuart",
        containerId: "statusLogContentBox",
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
        <span>{t("game.log.status.subject")}</span>
        <StyledTippy
          duration={0}
          delay={[100, 0]}
          content={
            <GameReportToolTip tooltipInfo={t("game.log.status.tooltipInfo")} />
          }
          placement="top"
        >
          <img src={"Images/ico-question-mark.svg"} alt="question" />
        </StyledTippy>
      </LogTitle>
      <LogContentBox ref={logBoxRef} id={"statusLogContentBox"}>
        {statusLog.map((data, idx, arr) => {
          return typeCase(
            data.type,
            data,
            idx === gamevalue.statusLogActiveIdx,
            idx
          );
        })}
      </LogContentBox>
    </LogDetailContainer>
  );
};

export default StatusLogBox;

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

const LogContent = styled.div`
  width: 180px;
  height: 76px;
  margin: 5px 0;
  padding: 8px 0px 8px 0px;
  border-radius: 10px;
  background-color: #000;
  opacity: ${(props) => (props.isActive ? `1` : `0.3`)};
  border: solid 2px
    ${(props) =>
      props.isActive && (props.team === "red" ? `#f04545` : `#0075bf`)};

  .title {
    display: flex;
    height: 19px;
    margin: 0 5px 4px;
    //background-color: #f00;
    span {
      font-family: SpoqaHanSansNeo;
      font-size: 15px;
      font-weight: 500;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.15;
      letter-spacing: normal;
      text-align: left;
      color: #fff;
    }
  }

  .dot {
    width: 6px;
    height: 6px;
    margin: 7px 5px 10px 2px;
    background-color: ${(props) =>
      props.team === "red" ? `#f04545` : `#0075bf`};
    border-radius: 10px;
  }
`;
