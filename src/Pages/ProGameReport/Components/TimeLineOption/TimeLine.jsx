import React, { useState } from "react";
import styled, { css } from "styled-components";
import { useTranslation } from "react-i18next";
import transferValuetoWidth from "../../lib/transferValuetoWidth";
import { useSelector, useDispatch } from "react-redux";
import TimeBar from "../Common/TimeBar";
import TimeBarTitle from "../Common/TimeBarTitle";
import Tippy from "@tippy.js/react";
import GameReportToolTip from "../Common/GameReportToolTip";
import TimeLineValue from "./Component/TimeLineValue";
import TimeLineTeamGold from "./Component/TimeLineTeamGold";

const romingSuccessTime = [
  { team: 1, time: 500 },
  { team: 2, time: 570 },
  { team: 1, time: 630 },
  { team: 2, time: 710 },
  { team: 1, time: 715 },
];

const TimeLine = () => {
  const { t } = useTranslation();
  const { timeLineDataset, gameTime: fullTime } = useSelector(
    (state) => state.GameReportReducer
  );
  const teamfightSet = timeLineDataset.timefight;
  const bluekillsSet = timeLineDataset.blueKills;
  const redkillsSet = timeLineDataset.redKills;
  const towerDestroySet = timeLineDataset.buildDestroy;
  const objectSet = timeLineDataset.objectKill;
  const dragonSet = timeLineDataset.dragonKill;
  const romingSet = timeLineDataset.roming;
  const gankingSet = timeLineDataset.ganking;

  const fullWidth = 623;

  return (
    <TimeLineContainer>
      {/* <div className="dev">TimeLine 개발 중</div> */}
      <TimeLineDataContainer>
        <div className="title">{t("game.summary.timeline.roming")}</div>
        <TimeLine15Box width={transferValuetoWidth(fullTime, fullWidth, 900)}>
          {romingSet.map((data) => {
            return (
              <TimeLineValue
                team={data.data.participant > 5 ? 0 : 1}
                move={transferValuetoWidth(
                  fullTime,
                  fullWidth,
                  data.realCount / 2
                )}
                time={data.realCount}
              />
            );
          })}
        </TimeLine15Box>
        <TimeLine15OutBox
          width={transferValuetoWidth(fullTime, fullWidth, 900)}
        >
          <StyledTippy
            duration={0}
            delay={[100, 0]}
            content={
              <GameReportToolTip
                tooltipInfo={t("game.log.event.tooltipInfo")}
              />
            }
            placement="top"
          >
            <img
              className="tip"
              src={"Images/ico-question-mark.svg"}
              alt="question"
            />
          </StyledTippy>
        </TimeLine15OutBox>
      </TimeLineDataContainer>
      <TimeLineDataContainer>
        <div className="title">{t("game.summary.timeline.ganking")}</div>
        <TimeLine15Box width={transferValuetoWidth(fullTime, fullWidth, 900)}>
          {gankingSet.map((data) => {
            return (
              <TimeLineValue
                team={data.data.participant > 5 ? 0 : 1}
                move={transferValuetoWidth(
                  fullTime,
                  fullWidth,
                  data.realCount / 2
                )}
                time={data.realCount}
              />
            );
          })}
        </TimeLine15Box>
        <TimeLine15OutBox
          width={transferValuetoWidth(fullTime, fullWidth, 900)}
        >
          <StyledTippy
            duration={0}
            delay={[100, 0]}
            content={
              <GameReportToolTip
                tooltipInfo={t("game.log.event.tooltipInfo")}
              />
            }
            placement="top"
          >
            <img
              className="tip"
              src={"Images/ico-question-mark.svg"}
              alt="question"
            />
          </StyledTippy>
        </TimeLine15OutBox>
      </TimeLineDataContainer>
      <TimeLineDataContainer>
        <div className="title">{t("game.summary.timeline.fight")}</div>
        <TimeLineFullBox>
          {teamfightSet.map((data) => {
            return (
              <TimeLineValue
                move={transferValuetoWidth(
                  fullTime,
                  fullWidth,
                  data.realCount / 2
                )}
                time={data.realCount}
              />
            );
          })}
        </TimeLineFullBox>
      </TimeLineDataContainer>
      <TimeLineDataContainer>
        <div className="title">{t("game.summary.timeline.blue-kill")}</div>
        <TimeLineFullBox>
          {bluekillsSet.map((data) => {
            return (
              <TimeLineValue
                team={1}
                move={transferValuetoWidth(
                  fullTime,
                  fullWidth,
                  data.realCount / 2
                )}
                time={data.realCount}
              />
            );
          })}
        </TimeLineFullBox>
      </TimeLineDataContainer>
      <TimeLineDataContainer>
        <div className="title">{t("game.summary.timeline.red-kill")}</div>
        <TimeLineFullBox>
          {redkillsSet.map((data) => {
            return (
              <TimeLineValue
                team={0}
                move={transferValuetoWidth(
                  fullTime,
                  fullWidth,
                  data.realCount / 2
                )}
                time={data.realCount}
              />
            );
          })}
        </TimeLineFullBox>
      </TimeLineDataContainer>
      <TimeLineDataContainer>
        <div className="title">{t("game.summary.timeline.tower")}</div>
        <TimeLineFullBox>
          {towerDestroySet.map((data) => {
            return (
              <TimeLineValue
                team={data.participantid > 5 ? 0 : 1}
                move={transferValuetoWidth(
                  fullTime,
                  fullWidth,
                  data.realCount / 2
                )}
                time={data.realCount}
              />
            );
          })}
        </TimeLineFullBox>
      </TimeLineDataContainer>
      <TimeLineDataContainer>
        <div className="title">{t("game.summary.timeline.herald&baron")}</div>
        <TimeLineFullBox>
          {objectSet.map((data) => {
            return (
              <TimeLineValue
                team={data.participantid > 5 ? 0 : 1}
                move={transferValuetoWidth(
                  fullTime,
                  fullWidth,
                  data.realCount / 2
                )}
                monster={data.subType}
                time={data.realCount}
              />
            );
          })}
        </TimeLineFullBox>
      </TimeLineDataContainer>
      <TimeLineDataContainer>
        <div className="title">{t("game.summary.timeline.dragon")}</div>
        <TimeLineFullBox>
          {dragonSet.map((data) => {
            return (
              <TimeLineValue
                team={data.participantid > 5 ? 0 : 1}
                move={transferValuetoWidth(
                  fullTime,
                  fullWidth,
                  data.realCount / 2
                )}
                monster={data.subType}
                time={data.realCount}
              />
            );
          })}
        </TimeLineFullBox>
      </TimeLineDataContainer>
      <TimeLineTeamGold />
      <TimeLineDataContainer>
        <TimeBarTitle />
        <div className="time-bar">
          <TimeBar />
        </div>
      </TimeLineDataContainer>
    </TimeLineContainer>
  );
};

export default TimeLine;

const TimeLineContainer = styled.div`
  width: 728px;
  height: 270px;
  margin: 0px 0 px;
  padding: 17px 27px 0 5px;
  opacity: 1;
  position: relative;

  .dev {
    position: absolute;
    font-family: SpoqaHanSansNeo;
    font-size: 20px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.3;
    letter-spacing: normal;
    text-align: center;
    color: #fff;
    top: 47%;
    left: 42%;
    background-color: #000;
  }
`;

const TimeLineDataContainer = styled.div`
  width: 691px;
  height: 17px;
  margin: 4px 0 4px 5px;
  display: flex;
  //opacity: 0.3;

  .title {
    width: 58px;
    font-family: SpoqaHanSansNeo;
    font-size: 13px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.3;
    letter-spacing: normal;
    text-align: right;
    color: #fff;
  }

  .time-bar {
    margin-left: 5px;
    width: 100%;
  }
`;
const TimeLine15Box = styled.div`
  width: ${(props) => props.width}px;
  height: 20px;
  border-radius: 3px 0px 0px 3px;
  background-color: #433f4e;
  margin: 0 0 0 10px;
  position: relative;
`;

const TimeLine15OutBox = styled.div`
  width: ${(props) => 623 - props.width}px;
  height: 20px;
  margin: 0 0 0 0px;
  padding: 0 0 0 0;
  border-radius: 0 3px 3px 0;
  background-color: #222;
  position: relative;
  .tip {
    position: absolute;
    right: ${(props) => (623 - props.width - 15) / 2}px;
    bottom: ${(20 - 15) / 2}px;
  }
`;

const TimeLineFullBox = styled.div`
  width: 623px;
  height: 20px;
  border-radius: 3px;
  background-color: #433f4e;
  margin: 0 0 0 10px;
`;

const TimeLineGoldContainer = styled.div`
  width: 694px;
  height: 50px;
  display: flex;
  height: 51px;
  margin: 5px 0 9px 2px;
  //background-color: #912345;
`;

const TimeLineTimeLine = styled.div`
  wwidth: 677px;
  height: 17px;
  margin: 9px 0 0 19px;
  display: flex;
  background-color: #515353;
`;

const StyledTippy = styled(Tippy)``;
