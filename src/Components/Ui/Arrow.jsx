import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
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
  border: ${({ size }) => size / 2}px solid transparent;
  ${({ direction, color, size }) => {
    switch (direction) {
      case "R":
        return `border-left: ${size}px solid ${color}`;

      case "L":
        return `border-right: ${size}px solid ${color}`;

      case "T":
        return `border-bottom: ${size}px solid ${color}`;

      case "B":
        return `border-top: ${size}px solid ${color}`;

      default:
        break;
    }
  }}
`;

Arrow.propTypes = {
  /**
   * 컬러
   */
  color: PropTypes.string,
  /**
   * 가로세로 화살표의 넓이
   */
  size: PropTypes.number,
  /**
   * 화살표의 방향
   */
  direction: PropTypes.oneOf(["R", "L", "T", "B"]).isRequired,
};

Arrow.default = {
  /**
   * 컬러
   */
  color: colors.text,
  /**
   * 가로세로 화살표의 넓이
   */
  size: 8,
};
export default Arrow;
