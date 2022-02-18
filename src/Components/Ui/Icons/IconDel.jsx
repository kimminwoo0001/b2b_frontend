import styled from "@emotion/styled/macro";
import React from "react";
import { colors } from "../../../Styles/ui";

const IconDel = ({ size = 20 }) => {
  return (
    <SVG
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      style={{ fill: "none" }}
      viewBox="0 0 20 20"
    >
      <path d="M0 0h20v20H0z" />
      <g transform="translate(2 3)">
        <circle
          className="background"
          cx={size / 2}
          cy={size / 2}
          r={size / 2}
          transform="translate(-2 -3)"
        />
        <path
          className="text"
          d="M5.366 5.891 3 3.525.635 5.891a.372.372 0 0 1-.526-.526L2.474 3 .109.635A.372.372 0 1 1 .635.108L3 2.474 5.366.108a.372.372 0 0 1 .526.527L3.526 3l2.365 2.365a.372.372 0 1 1-.526.526z"
          transform="translate(5.5 4.501)"
        />
      </g>
    </SVG>
  );
};

const SVG = styled.svg`
  .background {
    fill: ${colors.default};
  }
  .text {
    fill: ${colors.text};
    stroke: ${colors.text};
    stroke-width: 0.5px;
  }
`;

export default IconDel;
