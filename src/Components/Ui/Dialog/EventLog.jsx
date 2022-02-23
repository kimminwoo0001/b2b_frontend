import React from "react";
import styled from "@emotion/styled";
import { typoStyle } from "../../../Styles/ui";

const EventLog = ({ index, time, color, children, ...props }) => {
  const badgeColor = color === "red" ? "badge_red" : "badge_blue";
  return (
    <SContainer {...props}>
      {/* 이벤트 번호 & 시간 */}
      <SInfo>
        <Sbadge badgeColor={badgeColor}>{index}</Sbadge>
        <span>{time}</span>
      </SInfo>
      {/* 메세지 */}
      <SMessage>{children}</SMessage>
    </SContainer>
  );
};

const SContainer = styled.div`
  ${typoStyle.contents_md}
  padding: 8px 10px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.black};
`;

const SInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 4px;
`;

const Sbadge = styled.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 5px;

  background-color: ${({ theme, badgeColor }) => theme.colors[badgeColor]};
`;

const SMessage = styled.div`
  ${typoStyle.contents}
`;

export default EventLog;
