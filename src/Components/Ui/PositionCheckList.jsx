import React, { useEffect, useState } from "react";
import CustomCheckbox from "./CustomCheckbox";
import styled from "@emotion/styled";
import { isObjEqual } from "../../lib/isObjEqual";
import {
  borderRadiusStyle,
  colors,
  transitionStyle,
  typoStyle,
} from "../../Styles/ui";
import { useUpdateEffect } from "../../Hooks";

// 포지션 정보
const POSITION_IMG = {
  all: "ALL",
  top: <img src="images/position/ico-position-top.svg" alt="top" />,
  jng: <img src="images/position/ico-position-jng.svg" alt="jng" />,
  mid: <img src="images/position/ico-position-mid.svg" alt="mid" />,
  bot: <img src="images/position/ico-position-bot.svg" alt="bot" />,
  sup: <img src="images/position/ico-position-sup.svg" alt="sup" />,
};

const PositionCheckList = ({
  all = true,
  multi = true,
  defaultColor = "rgba(255,255,255,0.3)",
  hoverColor = colors.bg_checkbox,
  position = {
    all: false,
    top: false,
    jng: false,
    mid: false,
    bot: false,
    sup: false,
  },
  setPosition = () => {},
  ...props
}) => {
  const handleChangeMulti = (e) => {
    const { name, value, checked } = e.target;
    if (value === "all") {
      setPosition((prev) => {
        let newPosition = { ...prev };
        for (let key in newPosition) {
          newPosition[key] = checked;
        }
        return newPosition;
      });
    } else {
      setPosition((prev) => {
        const newPosition = { ...prev };
        newPosition[value] = checked;

        if (isObjEqual(newPosition)) {
          newPosition.all = checked;
        } else {
          newPosition.all = false;
        }

        return newPosition;
      });
    }
  };
  const handleChangeSingle = (e) => {
    const { name, value, checked } = e.target;
    if (position[value]) return setPosition({ ...position, [value]: checked });
    setPosition((prev) => {
      const newPosition = { ...prev };
      for (let key in newPosition) {
        newPosition[key] = !checked;
      }
      newPosition[value] = checked;
      return newPosition;
    });
  };
  return (
    <div {...props}>
      <SList>
        {Object.keys(position)
          .filter((pos) => {
            if (!all || !multi) return pos !== "all";
            return true;
          })
          .map((key, i) => {
            return (
              <SListItem key={key + i}>
                <SCustomCheckbox
                  name={"position"}
                  value={key}
                  onChange={multi ? handleChangeMulti : handleChangeSingle}
                  checked={position[key]}
                  defaultcolor={defaultColor}
                  hovercolor={hoverColor}
                >
                  <SIcon>
                    <span>{POSITION_IMG[key]}</span>
                  </SIcon>
                </SCustomCheckbox>
              </SListItem>
            );
          })}
      </SList>
    </div>
  );
};

const SList = styled.ul`
  display: flex;
`;

const SCustomCheckbox = styled(CustomCheckbox)`
  overflow: hidden;
  ${borderRadiusStyle[10]}
  ${transitionStyle.background}
  background-color: ${({ defaultcolor }) => defaultcolor};
  &.is-active {
    background-color: ${({ hovercolor }) => hovercolor};
    span {
      opacity: 1;
    }
  }
`;

const SIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  ${typoStyle.button_popin}

  span {
    opacity: 0.3;
    ${transitionStyle.opacity}
    img {
      width: 21px;
      height: 21px;
    }
  }

  &:hover {
    span {
      opacity: 1;
    }
  }
`;

const SListItem = styled.li`
  &:not(:last-child) {
    margin-right: 6px;
  }
`;

export default PositionCheckList;
