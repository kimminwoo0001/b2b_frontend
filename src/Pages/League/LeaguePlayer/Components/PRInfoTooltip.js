import React from "react";
import styled from "styled-components";
function PRInfoTooltip({ PRInfo }) {
  return (
    <ArrowWrapper>
      <ToolTipWrapper>
        <Contents>{PRInfo}</Contents>
      </ToolTipWrapper>
      {/* <Arrow /> */}
    </ArrowWrapper>
  );
}

export default PRInfoTooltip;

const ArrowWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Arrow = styled.div`
  border-top: 10px solid #000000;
  border-right: 10px solid transparent;
  border-left: 10px solid transparent;
  border-top-color: #000000;
  width: 15px;
`;

const ToolTipWrapper = styled.div`
  max-width: 295px;
  background-color: #433f4e;
  padding: 10px;
  border-radius: 10px;
  /* text-align: left; */
  font-size: 13px;
`;

const Contents = styled.div`
  color: #ffffff;
  line-height: 1.38;
`;
