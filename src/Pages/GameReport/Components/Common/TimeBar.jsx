import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import secToMS from "../../../../lib/secToMS";

const TimeBar = () => {
  const gamevalue = useSelector((state) => state.GameReportReducer);
  const minValue = +gamevalue.startTime / +gamevalue.duration;
  const [value, setValue] = useState(
    (+gamevalue.playedSeconds - +gamevalue.startTime) / gamevalue.duration +
      +gamevalue.startTime / +gamevalue.duration
  );
  const maxValue =
    (+gamevalue.startTime + +gamevalue.gameTime) / +gamevalue.duration;

  useEffect(() => {
    setValue(
      (+gamevalue.playedSeconds - +gamevalue.startTime) / gamevalue.duration +
        +gamevalue.startTime / +gamevalue.duration
    );
  }, [gamevalue.playedSeconds]);

  return (
    <RangeInput
      min={minValue}
      value={value}
      max={maxValue}
      id="rangeSlider"
      type="range"
      step="any"
    />
  );
};

export default TimeBar;
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
