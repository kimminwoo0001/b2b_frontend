import React, { useState, useEffect } from "react";
import Tippy from "@tippy.js/react";
import styled, { css } from "styled-components";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import GameReportToolTip from "../../Common/GameReportToolTip";
import KillEventBox from "./EventOption/KillEventBox";
import MonsterEventBox from "./EventOption/MonsterEventBox";
import BuildEventBox from "./EventOption/BuildEventBox";

const typeCase = (type, data, isActive) => {
  switch (type) {
    case "CHAMPION_KILL":
      return <KillEventBox data={data} isActive={isActive} />;
    case "ELITE_MONSTER_KILL":
      return <MonsterEventBox data={data} isActive={isActive} />;
    case "BUILDING_KILL":
      return <BuildEventBox data={data} isActive={isActive} />;
    default:
      return;
  }
};

const EventLogBox = () => {
  const gamevalue = useSelector((state) => state.GameReportReducer);

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const eventLog = gamevalue.logDataset.event;

  if (eventLog[0].type !== "NONE") {
    eventLog.unshift({
      type: "NONE",
      realCount: 0,
    });
  }

  console.log("eventLog", eventLog);

  useEffect(() => {
    console.log(gamevalue.eventLogActiveIdx);
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
      <LogContentBox>
        {eventLog.map((data, idx, arr) => {
          return typeCase(data.type, data, idx === gamevalue.eventLogActiveIdx);
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
  height: auto;
  margin: 10px 0 0;
  overflow-y: scroll;

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
