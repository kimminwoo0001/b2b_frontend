import React from "react";
import styled from "styled-components";

function GameReportToolTip({ tooltipInfo }) {
  return (
    <ArrowWrapper>
      <ToolTipWrapper>
        <Contents>{tooltipInfo}</Contents>
      </ToolTipWrapper>
      {/* <Arrow /> */}
    </ArrowWrapper>
  );
}

export default GameReportToolTip;

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
  background-color: #433f4e;
  padding: 10px;
  border-radius: 10px;
  width: 151px;
  font-size: 13px;
`;

const Contents = styled.div`
  color: #ffffff;
  line-height: 1.38;
`;
