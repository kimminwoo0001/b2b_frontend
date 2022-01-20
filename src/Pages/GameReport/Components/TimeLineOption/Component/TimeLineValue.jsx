import React, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { SetSelectedPlayer } from "../../../../../redux/modules/gamevalue";

const TimeLineValue = ({ team, move }) => {
  return <TimeLineValueBox team={team} move={move}></TimeLineValueBox>;
};

export default TimeLineValue;

const TimeLineValueBox = styled.div`
  width: 1px;
  height: 20px;
  background-color: ${(props) => (props.team === 1 ? "#0075bf" : "#f04545")};
  margin: 0 0 0 ${(props) => props.move}px;
  position: absolute;
`;
