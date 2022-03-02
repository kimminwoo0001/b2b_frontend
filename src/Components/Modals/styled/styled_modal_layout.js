import styled from "@emotion/styled/macro";
import {
  colors,
  spacing,
  typoStyle,
  buttonStyle,
  borderRadiusStyle,
  boxshadowStyle,
} from "../../../Styles/ui";

// 전체 레이아웃
export const Container = styled.div`
  position: relative;
  width: 376px;
  ${borderRadiusStyle[20]};
  background-color: ${colors.bg_box};
`;

export const Header = styled.header`
  ${spacing.paddingY(4)};
  ${typoStyle.popup_title};
  display: flex;
  justify-content: center;
  border-bottom: 1px solid ${colors.border_light};
`;
export const Main = styled.div`
  ${spacing.paddingT(7)};
  ${spacing.paddingB(10)};
  ${spacing.paddingX(6)};
  border-bottom: 1px solid ${colors.border_light};
`;
export const Footer = styled.div`
  ${spacing.padding(5)};
`;
// 닫기버튼
export const CloseButton = styled.button`
  position: absolute;
  right: 10px;
  top: 10px;
  width: 30px;
  height: 30px;
  padding: 0;

  svg {
    width: 100%;
    height: 100%;
  }
`;
// 하단 버튼
export const SubmitButton = styled.button`
  ${buttonStyle.color.main};
  ${buttonStyle.size.full};
  ${spacing.paddingY(4)}
  ${typoStyle.button_18};
  ${borderRadiusStyle[20]};
`;
export const CancelButton = styled.button`
  ${buttonStyle.color.normal};
  ${buttonStyle.size.full};
  ${spacing.paddingY(4)}
  ${typoStyle.button_18};
  ${borderRadiusStyle[20]};
`;
