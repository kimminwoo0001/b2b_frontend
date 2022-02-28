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
  display: inline-block;
  border: ${({ size }) => size}px solid transparent;
  margin: auto;

  ${({ direction, color, size }) => {
    switch (direction) {
      case "L":
        return `border-right: ${size}px solid ${color}`;
      case "R":
        return `border-left: ${size}px solid ${color}`;
      case "T":
        return `border-bottom: ${size}px solid ${color}`;
      case "B":
        return `border-top: ${size}px solid ${color}`;
      default:
        break;
    }
  }}
`;

export default Arrow;
