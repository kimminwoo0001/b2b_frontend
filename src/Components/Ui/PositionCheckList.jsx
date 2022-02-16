import React, { useEffect, useState } from "react";
import CustomCheckbox from "./CustomCheckbox";
import styled from "@emotion/styled";
import { isObjEqual } from "../../lib/isObjEqual";
import { transitionStyle, typoStyle } from "../../Styles/ui";

const PositionCheckList = ({ onChange, ...props }) => {
  const [position, setPosition] = useState({
    all: false,
    top: false,
    jun: false,
    mid: false,
    bot: false,
    sup: false,
  });

  const handleChange = (e) => {
    const { name, value, checked } = e.target;

    if (value === "all") {
      setPosition((prev) => {
        let newPosition = { ...prev };
        for (let key in newPosition) {
          newPosition[key] = checked;
        }

        if (onChange) {
          onChange(newPosition);
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

        if (onChange) {
          onChange(newPosition);
        }

        return newPosition;
      });
    }
  };

  return (
    <div {...props}>
      <SList>
        <SListItem>
          <SCustomCheckbox
            name={"position"}
            value={"all"}
            onChange={handleChange}
            checked={position.all}
          >
            <SIcon>
              <span>ALL</span>
            </SIcon>
          </SCustomCheckbox>
        </SListItem>
        <SListItem>
          <SCustomCheckbox
            name={"position"}
            value={"top"}
            onChange={handleChange}
            checked={position.top}
          >
            <SIcon>
              <span>
                <img src="images/position/ico-position-top.svg" alt="top" />
              </span>
            </SIcon>
          </SCustomCheckbox>
        </SListItem>
        <SListItem>
          <SCustomCheckbox
            name={"position"}
            value={"jun"}
            onChange={handleChange}
            checked={position.jun}
          >
            <SIcon>
              <span>
                <img src="images/position/ico-position-jug.svg" alt="top" />
              </span>
            </SIcon>
          </SCustomCheckbox>
        </SListItem>
        <SListItem>
          <SCustomCheckbox
            name={"position"}
            value={"mid"}
            onChange={handleChange}
            checked={position.mid}
          >
            <SIcon>
              <span>
                <img src="images/position/ico-position-mid.svg" alt="mid" />
              </span>
            </SIcon>
          </SCustomCheckbox>
        </SListItem>
        <SListItem>
          <SCustomCheckbox
            name={"position"}
            value={"bot"}
            onChange={handleChange}
            checked={position.bot}
          >
            <SIcon>
              <span>
                <img src="images/position/ico-position-bot.svg" alt="bot" />
              </span>
            </SIcon>
          </SCustomCheckbox>
        </SListItem>
        <SListItem>
          <SCustomCheckbox
            name={"position"}
            value={"sup"}
            onChange={handleChange}
            checked={position.sup}
          >
            <SIcon>
              <span>
                <img src="images/position/ico-position-sup.svg" alt="sup" />
              </span>
            </SIcon>
          </SCustomCheckbox>
        </SListItem>
      </SList>
    </div>
  );
};

const SList = styled.ul`
  display: flex;
`;

const SCustomCheckbox = styled(CustomCheckbox)`
  border-radius: 10px;
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.3);

  &.is-active {
    background-color: ${({ theme }) => theme.colors.bg_checkbox};

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
