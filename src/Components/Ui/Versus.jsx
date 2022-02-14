import React from "react";
import styled from "@emotion/styled";
import { typoStyle } from "../../Styles/ui";

const Versus = ({ size = 15, spacing = 0, ...props }) => {
  return (
    <SContainer size={size} spacing={spacing} {...props} aria-label="versus">
      VS
    </SContainer>
  );
};

const SContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  ${typoStyle.vs}
  font-size: ${({ size }) => size}px;
  margin: 0 ${({ spacing }) => spacing}px;
`;

export default Versus;
