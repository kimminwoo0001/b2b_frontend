import styled from "@emotion/styled";
import React from "react";

const Avatar = ({ src, alt, circle = true, size = 20, ...props }) => {
  return (
    <SAvarta {...props} size={size} circle={circle}>
      <img src={src} alt={alt} />
    </SAvarta>
  );
};

const SAvarta = styled.div`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
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
