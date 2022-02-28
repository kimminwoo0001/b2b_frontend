import React from "react";

// 커스텀 tick
const CustomTick = ({ payload, x, y, stroke, radius, index, data }) => {
  return (
    <g className="recharts-layer recharts-polar-angle-axis-tick">
      <text
        radius={radius}
        stroke={stroke}
        x={x}
        y={y - 8}
        text-anchor={"middle"}
      >
        <tspan x={x} dy="0em" fill="white" fontSize={15}>
          {payload.value}
        </tspan>
        <tspan x={x} dy="1.2em" fill="white" fontSize={15}>
          {data[index]["A"]}
        </tspan>
      </text>
    </g>
  );
};

export default CustomTick;
