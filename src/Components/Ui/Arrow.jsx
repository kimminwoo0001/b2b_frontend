import React from "react";
import styled from "styled-components";
import { colors } from "../../Styles/ui";

// 기본  사이즈 8px
// 기본 컬러 white
const Arrow = ({ direction, size = 8, color = colors.text, ...props }) => {
  return (
    <SArrow direction={direction} size={size} color={color} {...props}></SArrow>
  );
};
const SArrow = styled.span`
  display: block;
  width: ${({ size }) => size * 2}px;
  height: ${({ size }) => size}px;
  border: ${({ size }) => size / 2}px solid transparent;
  margin: auto;
  ${({ direction, color, size }) =>
    direction === "L"
      ? `border-right: ${size}px solid ${color}`
      : `border-left: ${size}px solid ${color}`}
`;
export default Arrow;
