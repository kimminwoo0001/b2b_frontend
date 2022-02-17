import styled from "@emotion/styled";
import React from "react";
import { colors } from "../../Styles/ui";
import PropsTypes from "prop-types";

const Avatar = ({
  src,
  alt,
  circle = true,
  size = 20,
  color,
  block = true,
  ...props
}) => {
  return (
    <SAvarta color={color} size={size} circle={circle} block={block} {...props}>
      <img src={src} alt={alt} />
    </SAvarta>
  );
};

const SAvarta = styled.div`
  display: ${({ block }) => (block ? "block" : "inline-block")};
  flex: 0 0 ${({ size }) => size}px;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border: 1px solid
    ${({ color }) =>
      color === undefined
        ? "transparent"
        : color === "red"
        ? colors.red
        : colors.blue};
  overflow: hidden;
  border-radius: ${({ circle }) => (circle ? "50%" : 0)};

  > img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`;

Avatar.propTypes = {
  /**
   * 이미지 주소
   */
  src: PropsTypes.string.isRequired,
  /**
   * 대체 이미지 텍스트
   */
  alt: PropsTypes.string.isRequired,
  /**
   * 아바타 모양
   */
  circle: PropsTypes.bool,
  /**
   * 렌더링 사이즈, 가로 세로 같음
   */
  size: PropsTypes.number,
  /**
   * 테두리 컬러
   */
  color: PropsTypes.oneOf([undefined, "red", "blue"]),
  /**
   * 요소의 디스플레이 타입 ? block : inline-block
   */
  block: PropsTypes.bool,
};

Avatar.defaultProps = {
  color: undefined,
};

export default Avatar;
