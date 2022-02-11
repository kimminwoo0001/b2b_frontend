import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { SetSeekTime } from "../../../../../redux/modules/gamevalue";

const TimeLineValue = ({ team, move, monster, time }) => {
  const dispatch = useDispatch();
  const getMonsterImg = (monster) => {
    monster = monster.includes("DRAGON") ? monster.split("_")[0] : monster;

    switch (monster) {
      case "AIR":
        return "ico-drake-cloud.svg";
      case "FIRE":
        return "ico-drake-infernal.svg";
      case "EARTH":
        return "ico-drake-mountain.svg";
      case "WATER":
        return "ico-drake-ocean.svg";
      case "ELDER":
        return "ico-elders.svg";
      case "CHEMTECH":
        return "ico-drake-chemtech.svg";
      case "HEXTECH":
        return "ico-drake-hextech.svg";
      case "RIFTHERALD":
        return "ico-heralds.svg";
      case "BARON_NASHOR":
        return "ico-baron.svg";
      default:
        return;
    }
  };

  const onClick = (time) => {
    dispatch(SetSeekTime(time / 2));
  };

  return (
    <TimeLineValueBox
      team={team}
      move={move}
      monster={monster}
      onClick={() => onClick(time)}
    >
      {monster ? (
        <div className="monster">
          <img
            src={`Images/${getMonsterImg(monster)}`}
            alt="closeBtn"
            className="Close"
          />
        </div>
      ) : (
        ""
      )}
    </TimeLineValueBox>
  );
};

export default TimeLineValue;

const TimeLineValueBox = styled.div`
  width: 1px;
  height: 20px;
  cursor: pointer;
  background-color: ${(props) =>
    props.monster !== undefined
      ? ""
      : props.team !== undefined
      ? props.team === 1
        ? "#0075bf"
        : "#f04545"
      : "#fff"};
  margin: 0 0 0 ${(props) => (props.monster ? props.move - 14 : props.move)}px;
  position: absolute;

  .monster {
    width: 14px;
    img {
      width: 14px;
      height: 14px;
    }
    border-bottom: 1px solid
      ${(props) => (props.team === 1 ? "#0075bf" : "#f04545")};
    margin-top: 1px;
  }
`;
