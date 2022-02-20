import React from "react";
import styled from "@emotion/styled";
import { typoStyle } from "../../../Styles/ui";
import { useContext } from "react";
import { DropdownContext } from "./DropdownContainer";

const DropdownItem = ({ children, value, label, ...props }) => {
  const { setCurrentValue, setCurrentLabel, setIsActive } =
    useContext(DropdownContext);

  const handleClick = (e) => {
    const targetValue = e.target.dataset.value;
    if (label) {
      setCurrentLabel(label);
    } else {
      setCurrentLabel("");
    }
    setCurrentValue(targetValue);
    setIsActive(false);
  };

  return (
    <Item
      data-value={value}
      data-label={label}
      role="option"
      onClick={handleClick}
      {...props}
    >
      {children}
    </Item>
  );
};

const Item = styled.li`
  cursor: pointer;
  ${typoStyle.select_item}
`;

export default DropdownItem;
