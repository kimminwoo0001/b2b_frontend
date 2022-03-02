import React from "react";

// 좌표 세부이동
const calculateX = (index) => {
  switch (index) {
    case 1:
      return 12;
    case 4:
      return -12;
    default:
      return 0;
  }
};

const calculateY = (index) => {
  switch (index) {
    case 0:
      return -12;
    case 2:
    case 3:
      return 8;
    default:
      return 0;
  }
};

// 커스텀 tick
const CustomTick = ({ index, data, payload, x, y, stroke, radius }) => {
  return (
    <g className="recharts-layer recharts-polar-angle-axis-tick">
      <text
        radius={radius}
        stroke={stroke}
        x={x}
        y={y + calculateY(index)}
        textAnchor={"middle"}
      >
        <tspan x={x} dx={calculateX(index)} dy="0em" fill="white" fontSize={15}>
          {payload.value}
        </tspan>
        <tspan
          x={x}
          dx={calculateX(index)}
          dy="1.2em"
          fill="white"
          fontSize={15}
        >
          {data[index]["A"]}
        </tspan>
      </text>
    </g>
  );
};

export default CustomTick;
