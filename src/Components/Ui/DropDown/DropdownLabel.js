import styled from "@emotion/styled";
import React, { memo } from "react";
import { useContext } from "react";

import { DropdownContext } from "./DropdownContainer";

const DropdownLabel = ({ children, change = true, ...props }) => {
  const { currentValue, currentLabel } = useContext(DropdownContext);
  if (change) {
    return (
      <Container {...props}>
        {currentValue === ""
          ? children
          : currentLabel === ""
          ? currentValue
          : currentLabel}
      </Container>
    );
  } else {
    return <Container {...props}>{children}</Container>;
  }
};

const Container = styled.div`
  width: fit-content;
  height: fit-content;

  input {
    display: none;
  }
`;

export default memo(DropdownLabel);
