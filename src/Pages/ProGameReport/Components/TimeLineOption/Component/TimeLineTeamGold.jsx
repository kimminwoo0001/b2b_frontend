import React, { useState } from "react";
/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled/macro";
import { useDispatch, useSelector } from "react-redux";
import TimeLineTeamGoldLabel from "./TimeLineTeamGoldLabel";
import { Line } from "react-chartjs-2";

//=> up(ctx, "#0075bf") || down(ctx, "#f04545")

const TimeLineTeamGold = () => {
  const { timeLineDataset } = useSelector((state) => state.GameReportReducer);

  const TeamGoldChart = {
    labels: timeLineDataset?.teamGold_x,
    datasets: [
      {
        fill: false,
        lineTension: 0,
        backgroundColor: "rgba(0,0,0,0)",
        borderColor: "#84818e",
        borderWidth: 0.5,
        pointRadius: 1,
        data: timeLineDataset?.teamGold_y,
        segment: {
          borderColor: function (ctx) {
            console.log("ctx", ctx);
            return ctx.p0.parsed.y >= 0 ? "#0075bf" : "#f04545";
          },
        },
      },
    ],
  };

  return (
    <TimeLineGoldContainer>
      <TimeLineTeamGoldLabel />
      <GoldDataBox>
        <Line
          data={TeamGoldChart}
          options={{
            tooltips: {
              intersect: false,
              backgroundColor: "#1d1d1d",
              titleFontSize: 11,
              bodyFontSize: 11,
              displayColors: false,
              boxWidth: 2,
              boxHeight: 2,
              cornerRadius: 10,
              yAlign: "center",
              // position: "top",
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
                    fontSize: 0.5,
                  },
                  gridLines: { color: "rgba(47, 45, 56,0)" },
                  offset: true,
                  display: false,
                },
              ],
              yAxes: [
                {
                  ticks: {
                    //stepSize: 1,
                    fontColor: "rgba(0,0,0,0)",
                    fontSize: 0,
                    mix: timeLineDataset?.teamGold_max,
                    min: -timeLineDataset?.teamGold_max,
                  },
                  gridLines: {
                    color: "rgba(58, 55, 69,0)",
                  },
                },
              ],
            },
          }}
        />
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
  }
`;

const GoldDataBox = styled.div`
  width: 623px;
  height: 100%;
  border-radius: 3px;
  margin: 0 0 0 0px;

  .chartjs-render-monitor {
    // position: relative;
    z-index: 9999;
  }
`;
