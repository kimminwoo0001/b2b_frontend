import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import secToMS from "../../../../lib/secToMS";

const TimeBar = ({ hidebar = false }) => {
  const videovalue = useSelector((state) => state.VideoReducer);
  const minValue = +videovalue.startTime / +videovalue.duration;
  const [value, setValue] = useState(
    (+videovalue.playedSeconds - +videovalue.startTime) / videovalue.duration +
      +videovalue.startTime / +videovalue.duration
  );
  const maxValue =
    (+videovalue.startTime + +videovalue.gameTime) / +videovalue.duration;

  useEffect(() => {
    setValue(
      (+videovalue.playedSeconds - +videovalue.startTime) /
        videovalue.duration +
        +videovalue.startTime / +videovalue.duration
    );
  }, [videovalue.playedSeconds]);

  return (
    <>
      <TimeBarContainer
        value={((value - minValue) / (maxValue - minValue)) * 100}
      >
        {hidebar && <TimeBarHideBar></TimeBarHideBar>}
      </TimeBarContainer>
      <RangeInput
        min={minValue}
        value={value}
        max={maxValue}
        id="rangeSlider"
        type="range"
        step="any"
      />
    </>
  );
};

export default TimeBar;

const TimeBarContainer = styled.div`
  margin-left: ${(props) => props.value}%;
  position: relative;
`;

const TimeBarHideBar = styled.div`
  position: absolute;
  width: 98.5%;
  margin-left: 10px;
  height: 100px;
  background-color: rgba(0, 0, 0, 0.5);
  top: -90px;
  left: 0;
`;
const RangeInput = styled.input`
  -webkit-appearance: none; /* Override default CSS styles */
  appearance: none;
  margin-top: 6px;
  margin-left: 10px;
  width: 98.5%; /* Full-width */
  height: 6px; /* Specified height */
  background: #d3d3d3; /* Grey background */
  outline: none; /* Remove outline */
  opacity: 0.7; /* Set transparency (for mouse-over effects on hover) */
  -webkit-transition: 0.2s; /* 0.2 seconds transition on hover */
  transition: opacity 0.2s;
  border-radius: 10px;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  ::-webkit-slider-thumb {
    -webkit-appearance: none; /* Override default look */
    appearance: none;
    width: 25px; /* Set a specific slider handle width */
    height: 6px; /* Slider handle height */
    background: #5942ba; /* Green background */
    box-shadow: -100vw 0 0 100vw #5942ba;
    cursor: pointer; /* Cursor on hover */
  }

  ::-webkit-slider-runnable-track {
    width: 100%;
    height: 6px;
    cursor: pointer;
    animate: 0.2s;
    background: #3a3745;
  }

  ::-moz-range-thumb {
    width: 25px; /* Set a specific slider handle width */
    height: 6px; /* Slider handle height */
    background: #5942ba; /* Green background */
    cursor: pointer; /* Cursor on hover */
  }
`;
