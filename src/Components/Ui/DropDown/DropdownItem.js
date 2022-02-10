import React from "react";
import styled from "@emotion/styled";
import { typoStyle } from "../../../Styles/ui";
import { useContext } from "react";
import { ListContext } from "./DropdownList";

const DropdownItem = ({ children, value, ...props }) => {
  const { setCurrentValue, setIsActive } = useContext(ListContext);

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
  padding: 10px 10px;
  cursor: pointer;
  ${typoStyle.select_item}
  :hover {
    background-color: rgb(60, 58, 72);
  }
`;

export default DropdownItem;
