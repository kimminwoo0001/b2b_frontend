import styled from "@emotion/styled";
import React from "react";
import {
  borderRadiusStyle,
  colors,
  spacing,
  typoStyle,
} from "../../../Styles/ui";
import Avarta from "../../Ui/Avatar";

const ModalPlayerListItem = ({ src, alt, id, tier, ...props }) => {
  return (
    <PlayerItem {...props}>
      <Avarta src={src} alt={alt} size={36} />
      <PlayerInfo>
        <span>{id}</span>
        <span>{tier}</span>
      </PlayerInfo>
    </PlayerItem>
  );
};

const PlayerItem = styled.li`
  ${spacing.paddingY(3)}
  ${spacing.paddingX(2)}
  ${borderRadiusStyle[20]};
  cursor: pointer;
  display: flex;

  /* 선수 아이콘 */
  > div:first-of-type {
    ${spacing.marginR(1)};
  }

  &:hover {
    background-color: ${colors.bg_select_hover};
  }
`;
const PlayerInfo = styled.div`
  span {
    display: block;
    ${typoStyle.select};
  }
  /* 선수 아이디 */
  span:first-of-type {
    ${typoStyle.rate_win};
  }
`;

export default ModalPlayerListItem;
