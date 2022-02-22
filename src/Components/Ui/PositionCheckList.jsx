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
const positionList = {
  all: "ALL",
  top: <img src="images/position/ico-position-top.svg" alt="top" />,
  jun: <img src="images/position/ico-position-jug.svg" alt="jun" />,
  mid: <img src="images/position/ico-position-mid.svg" alt="mid" />,
  bot: <img src="images/position/ico-position-bot.svg" alt="bot" />,
  sup: <img src="images/position/ico-position-sup.svg" alt="sup" />,
};

const PositionCheckList = ({
  all = true,
  defaultColor = "rgba(255,255,255,0.3)",
  hoverColor = colors.bg_checkbox,
  onChange,
  ...props
}) => {
  const [postionData, setPositionData] = useState(() =>
    Object.keys(positionList).reduce((a, c) => {
      a[c] = false;
      return a;
    }, {})
  );

  const handleChange = (e) => {
    const { name, value, checked } = e.target;

    if (value === "all") {
      setPositionData((prev) => {
        let newPosition = { ...prev };
        for (let key in newPosition) {
          newPosition[key] = checked;
        }
        return newPosition;
      });
    } else {
      setPositionData((prev) => {
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

  useUpdateEffect(() => {
    if (onChange) {
      onChange(postionData);
    }
  }, [postionData, onChange]);

  return (
    <div {...props}>
      <SList>
        {Object.keys(positionList)
          .filter((pos) => {
            if (!all) return pos !== "all";
            return true;
          })
          .map((position, i) => {
            return (
              <SListItem key={position + i}>
                <SCustomCheckbox
                  name={"position"}
                  value={position}
                  onChange={handleChange}
                  checked={postionData[position]}
                  defaultcolor={defaultColor}
                  hovercolor={hoverColor}
                >
                  <SIcon>
                    <span>{positionList[position]}</span>
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
