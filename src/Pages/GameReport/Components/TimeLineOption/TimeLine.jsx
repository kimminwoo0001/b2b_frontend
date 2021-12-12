import React, { useState } from "react";
import styled, { css } from "styled-components";
import { useTranslation } from "react-i18next";

const romingSuccessTime = [
  { team: 1, time: 500 },
  { team: 2, time: 570 },
  { team: 1, time: 630 },
  { team: 2, time: 710 },
  { team: 1, time: 715 },
];

const TimeLine = ({ fullTime = 1800 }) => {
  const [range, setRange] = useState(0);
  const [minTime, setMinTime] = useState();
  const [maxTime, setMaxTime] = useState();
  const { t } = useTranslation();
  const fullWidth = 623;

  function transferTime(time) {
    const time1px = fullTime / 100; // 9
    const width1px = fullWidth / 100; // 6.23

    return (time / time1px) * width1px;
  }

  return (
    <TimeLineContainer>
      <TimeLineDataContainer>
        <div className="title">{t("game.summary.timeline.roming")}</div>
        <TimeLine15Box width={transferTime(900)}>
          {romingSuccessTime.map((data) => {
            return (
              <TimeLineValue
                team={data.team}
                move={transferTime(data.time)}
              ></TimeLineValue>
            );
          })}
        </TimeLine15Box>
        <TimeLine15OutBox width={transferTime(900)}></TimeLine15OutBox>
      </TimeLineDataContainer>
      <TimeLineDataContainer>
        <div className="title">{t("game.summary.timeline.ganking")}</div>
        <TimeLine15Box width={transferTime(900)}></TimeLine15Box>
        <TimeLine15OutBox width={transferTime(900)}></TimeLine15OutBox>
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
        <div className="title"></div>
        <RangeInput
          min={0}
          value={range}
          max={maxTime}
          id="rangeSlider"
          type="range"
          onChange={(e) => {
            setRange(Number(e.target.value));
          }}
          onKeyPress={(e) => {
            setRange(Number(e.target.value));
          }}
          step="1"
        />
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
  background-color: #953;
`;

const TimeLineDataContainer = styled.div`
  width: 691px;
  height: 17px;
  margin: 4px 0 4px 5px;
  background-color: #412;
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
    text-align: left;
    color: #fff;
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

const RangeInput = styled.input`
  width: 85%;
  height: 6px;
  border-radius: 3px;
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  background-color: rgb(58, 55, 69);
  border-radius: 6px;
  border: 0.2px solid rgb(58, 55, 69);
  -webkit-appearance: none;
  ::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    border: 1px solid #817e90;
    height: 11px;
    width: 11px;
    border-radius: 50%;
    background: #817e90;
    cursor: pointer;
  }
`;
