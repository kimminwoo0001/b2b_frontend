import React, { useState } from "react";
import styled, { css } from "styled-components";
import { useTranslation } from "react-i18next";
import transferTimetoWidth from "../../../../lib/transferTimetoWidth";
import { useSelector, useDispatch } from "react-redux";
import TimeBar from "../Common/TimeBar";
import TimeBarTitle from "../Common/TimeBarTitle";

const romingSuccessTime = [
  { team: 1, time: 500 },
  { team: 2, time: 570 },
  { team: 1, time: 630 },
  { team: 2, time: 710 },
  { team: 1, time: 715 },
];

const TimeLine = ({ fullTime = 1800 }) => {
  const { t } = useTranslation();
  const fullWidth = 623;

  return (
    <TimeLineContainer>
      <TimeLineDataContainer>
        <div className="title">{t("game.summary.timeline.roming")}</div>
        <TimeLine15Box width={transferTimetoWidth(fullTime, fullWidth, 900)}>
          {romingSuccessTime.map((data) => {
            return (
              <TimeLineValue
                team={data.team}
                move={transferTimetoWidth(fullTime, fullWidth, data.time)}
              ></TimeLineValue>
            );
          })}
        </TimeLine15Box>
        <TimeLine15OutBox
          width={transferTimetoWidth(fullTime, fullWidth, 900)}
        ></TimeLine15OutBox>
      </TimeLineDataContainer>
      <TimeLineDataContainer>
        <div className="title">{t("game.summary.timeline.ganking")}</div>
        <TimeLine15Box
          width={transferTimetoWidth(fullTime, fullWidth, 900)}
        ></TimeLine15Box>
        <TimeLine15OutBox
          width={transferTimetoWidth(fullTime, fullWidth, 900)}
        ></TimeLine15OutBox>
      </TimeLineDataContainer>
      <TimeLineDataContainer>
        <div className="title">{t("game.summary.timeline.fight")}</div>
        <TimeLineFullBox></TimeLineFullBox>
      </TimeLineDataContainer>
      <TimeLineDataContainer>
        <div className="title">{t("game.summary.timeline.blue-kill")}</div>
        <TimeLineFullBox></TimeLineFullBox>
      </TimeLineDataContainer>
      <TimeLineDataContainer>
        <div className="title">{t("game.summary.timeline.red-kill")}</div>
        <TimeLineFullBox></TimeLineFullBox>
      </TimeLineDataContainer>
      <TimeLineDataContainer>
        <div className="title">{t("game.summary.timeline.tower")}</div>
        <TimeLineFullBox></TimeLineFullBox>
      </TimeLineDataContainer>
      <TimeLineDataContainer>
        <div className="title">{t("game.summary.timeline.herald&baron")}</div>
        <TimeLineFullBox></TimeLineFullBox>
      </TimeLineDataContainer>
      <TimeLineDataContainer>
        <div className="title">{t("game.summary.timeline.dragon")}</div>
        <TimeLineFullBox></TimeLineFullBox>
      </TimeLineDataContainer>
      <TimeLineGoldContainer></TimeLineGoldContainer>
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
`;

const TimeLineDataContainer = styled.div`
  width: 691px;
  height: 17px;
  margin: 4px 0 4px 5px;
  display: flex;

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

const TimeLineValue = styled.div`
  width: 1px;
  height: 20px;
  background-color: ${(props) => (props.team === 1 ? "#0075bf" : "#f04545")};
  margin: 0 0 0 ${(props) => props.move}px;
  position: absolute;
`;

const TimeLine15OutBox = styled.div`
  width: ${(props) => 623 - props.width}px;
  height: 20px;
  margin: 0 0 0 0px;
  padding: 0 0 0 0;
  border-radius: 0 3px 3px 0;
  background-color: #222;
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
  background-color: #912345;
`;

const TimeLineTimeLine = styled.div`
  wwidth: 677px;
  height: 17px;
  margin: 9px 0 0 19px;
  display: flex;
  background-color: #515353;
`;
