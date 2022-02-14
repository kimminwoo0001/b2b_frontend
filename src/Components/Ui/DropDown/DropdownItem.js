import React from "react";
import styled from "@emotion/styled";
import { typoStyle } from "../../../Styles/ui";
import { useContext } from "react";
import { DropdownContext } from "./DropdownContainer";

const DropdownItem = ({ children, value, ...props }) => {
  const { setCurrentValue, setIsActive } = useContext(DropdownContext);

  const handleClick = (e) => {
    const targetValue = e.target.dataset.value;
    setCurrentValue(targetValue);
    setIsActive(false);
  };

  return (
    <Item data-value={value} role="option" onClick={handleClick} {...props}>
      {children}
    </Item>
  );
};

const Item = styled.li`
  cursor: pointer;
  ${typoStyle.select_item}
`;

export default DropdownItem;
