import styled from "@emotion/styled";
import React, { forwardRef } from "react";

const Avatar = forwardRef(
  (
    { src, alt, circle = true, size = 20, color, block = true, ...props },
    ref
  ) => {
    return (
      <SAvarta
        ref={ref}
        color={color}
        size={size}
        circle={circle}
        block={block}
        {...props}
      >
        <img src={src} alt={alt} />
      </SAvarta>
    );
  }
);

const SAvarta = styled.div`
  display: ${({ block }) => (block ? "block" : "inline-block")};
  flex: 0 0 ${({ size }) => size}px;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border: ${({ color, theme }) =>
    color ? `1px solid ${theme.colors[color]}` : ""};
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

export default Avatar;
