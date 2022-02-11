import styled from "@emotion/styled";
import React, { memo } from "react";
import { useContext } from "react";
import { DropdownContext } from "./DropdownContainer";

const DropdownLabel = ({ children, change = true, ...props }) => {
  const { currentValue } = useContext(DropdownContext);

  return (
    <Container {...props}>
      {change ? (currentValue === "" ? children : currentValue) : children}
    </Container>
  );
};

const Container = styled.div`
  width: fit-content;
  height: fit-content;

  input {
    display: none;
  }
`;

export default memo(DropdownLabel);
