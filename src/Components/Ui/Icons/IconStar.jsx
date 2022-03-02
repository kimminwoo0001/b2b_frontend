import styled from "@emotion/styled";
import React from "react";
import { colors } from "../../../Styles/ui";

const IconStar = ({
  isActive = false,
  size = 20,
  color = colors.badge_red,
  ...props
}) => {
  return (
    <>
      <SVG
        xmlns="http://www.w3.org/2000/svg"
        width={`${size}`}
        height={`${size}`}
        viewBox={`0 0 ${size} ${size}`}
      >
        <path style={{ fill: "none" }} d="M0 0h20v20H0z" />
        <path
          d="M12.235 15.224 7.9 12.016l-4.174 3.06A.691.691 0 0 1 2.66 14.3l1.592-4.93L.275 6.385a.69.69 0 0 1 .417-1.242H5.7L7.272.472A.691.691 0 0 1 7.924 0a.688.688 0 0 1 .65.464L10.2 5.143h5.109a.692.692 0 0 1 .416 1.242l-4.136 3.1 1.711 4.957a.692.692 0 0 1-1.062.781z"
          transform="translate(2 2)"
          style={{ fill: isActive ? color : colors.border_light }}
        />
      </SVG>
    </>
  );
};

const SVG = styled.svg`
  path {
    transition: fill 0.2s ease-in-out;
  }
`;

export default IconStar;
