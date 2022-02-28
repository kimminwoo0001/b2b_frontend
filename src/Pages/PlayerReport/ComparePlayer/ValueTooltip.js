import React from "react";
/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled/macro";

function StatsTooltip({ stat }) {
  return (
    <ArrowWrapper>
      <StatsTooltipWrapper>
        <Content>{stat.value}</Content>
      </StatsTooltipWrapper>
      <Arrow />
    </ArrowWrapper>
  );
}

export default StatsTooltip;

const ArrowWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const StatsTooltipWrapper = styled.div`
  max-width: 232px;
  /* min-height: 106px; */
  border: solid 1px #3a3745;
  background-color: #1d1d1d;
  padding: 5px 16px;
`;

const Content = styled.div`
  font-family: NotoSansKR, Apple SD Gothic Neo;
  font-size: 12px;
  letter-spacing: -0.6px;
  text-align: left;
  color: #ffffff;
  line-height: 1.3;
`;

const Arrow = styled.div`
  border-top: 5px solid #1d1d1d;
  border-right: 5px solid transparent;
  border-left: 5px solid transparent;
  border-top-color: #1d1d1d;
  width: 5px;
`;
