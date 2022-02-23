import React from "react";
import styled from "@emotion/styled/macro";
import { cx } from "@emotion/css";

const CustomCheckbox = ({ checked, children, className, ...props }) => {
  return (
    <SContainer
      tabIndex={0}
      className={cx(className, checked ? "is-active" : "")}
    >
      <input type="checkbox" checked={checked} {...props} />
      {children}
    </SContainer>
  );
};

const SContainer = styled.label`
  cursor: pointer;

  > input {
    display: none;
  }
`;

export default CustomCheckbox;
