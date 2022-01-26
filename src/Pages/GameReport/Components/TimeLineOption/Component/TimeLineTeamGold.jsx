import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import TimeLineTeamGoldLabel from "./TimeLineTeamGoldLabel";
import { Line } from "react-chartjs-2";

const TimeLineTeamGold = () => {
  const { timeLineDataset } = useSelector((state) => state.GameReportReducer);

  const TeamGoldChart = {
    datasets: [
      {
        fill: true,
        lineTension: 0,
        backgroundColor: "#314444",
        borderColor: "#f14444",
        borderWidth: 2,
        data: timeLineDataset?.y,
      },
    ],
  };

  return (
    <TimeLineGoldContainer>
      <TimeLineTeamGoldLabel />
      <GoldDataBox>
        {/* <Line
          data={MatchChart}
          options={{
            tooltips: {
              intersect: false,
              backgroundColor: "#1d1d1d",
              titleFontSize: 12,
              bodyFontSize: 10,
              displayColors: true,
              boxWidth: 2,
              boxHeight: 2,
              cornerRadius: 10,
            },
            legend: {
              display: false,
            },
            hover: {
              animationDuration: 100,
            },
            maintainAspectRatio: false,
            scales: {
              xAxes: [
                {
                  ticks: {
                    fontColor: "#84818e",
                    fontSize: 15,
                  },
                  gridLines: { color: "rgb(47, 45, 56)" },
                  offset: true,
                },
              ],
              yAxes: [
                {
                  ticks: {
                    stepSize: graphDomain?.matchGraph["row"],
                    fontColor: "#84818e",
                    fontSize: 15,
                    min: graphDomain?.matchGraph["min"],
                    max: graphDomain?.matchGraph["max"],
                  },
                  gridLines: {
                    color: "rgb(58, 55, 69)",
                  },
                },
              ],
            },
          }}
        /> */}
      </GoldDataBox>
    </TimeLineGoldContainer>
  );
};

export default TimeLineTeamGold;

const TimeLineGoldContainer = styled.div`
  width: 694px;
  height: 50px;
  display: flex;
  height: 51px;
  margin: 5px 0 9px 5px;

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
    //background-color: #fff;
  }
`;

const GoldDataBox = styled.div`
  width: 623px;
  height: 100%;
  border-radius: 3px;
  background-color: #433f4e;
  margin: 0 0 0 10px;
`;
