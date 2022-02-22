import React from "react";
import styled from "@emotion/styled/macro";
import { AnimatePresence, motion } from "framer-motion";
// ui style, component
import {
  borderRadiusStyle,
  boxshadowStyle,
  colors,
  inputStyle,
  scrollbarStyle,
  spacing,
  typoStyle,
} from "../../../Styles/ui";
import Avatar from "../../Ui/Avatar";
import IconDel from "../../Ui/Icons/IconDel";

const ModalLocalPlayerSearch = React.forwardRef(
  (
    {
      options = {},
      value,
      isOpen,
      onSelect = () => {},
      onChange = () => {},
      onClear = () => {},
      readOnly = false,
      name = "nickname",
      ...props
    },
    ref
  ) => {
    const handleClick = (player) => {
      onSelect(player);
    };

    return (
      <Container ref={ref} {...props}>
        <div className="dropdown__input__container">
          <input
            className="dropdown__input"
            type="text"
            name={name}
            value={value}
            onChange={onChange}
            readOnly={readOnly}
            autoComplete="off"
          />

          {/* 리셋버튼 */}
          {value && (
            <button
              className="dropdown__button__clear"
              onClick={onClear}
              type="reset"
            >
              <IconDel />
            </button>
          )}
        </div>

        {/* 옵션 선택 박스 */}
        <AnimatePresence>
          {isOpen && (
            <OptionList>
              {options.map((player) => (
                <OptionItem key={player.id} onClick={() => handleClick(player)}>
                  <TeamLogo>
                    <Avatar src={player.logo} alt={player.team} size={20} />
                    <span>{player.team}</span>
                  </TeamLogo>
                  <PlayerInfo>
                    <span>
                      {player.id}&nbsp;({player.name})
                    </span>
                  </PlayerInfo>
                </OptionItem>
              ))}
            </OptionList>
          )}
        </AnimatePresence>
      </Container>
    );
  }
);

/* 스타일  */
const Container = styled.div`
  position: relative;

  .dropdown__button__clear {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translate(0, -50%);
    padding: 0;

    width: 18px;
    height: 18px;

    svg {
      width: 100%;
      height: 100%;
    }
  }

  .dropdown__input {
    /* display: block; */
    width: 100%;
    height: 100%;
    ${borderRadiusStyle[10]};
    ${spacing.paddingY(2)};
    ${inputStyle.color.main};
    ${inputStyle.size[13]};
  }

  .dropdown__input__clear {
    position: absolute;
    right: 0;
    top: 50%;
  }
`;
/* 스타일 - 옵션 리스트관련 */
const OptionList = styled(motion.ul)`
  position: absolute;
  z-index: 1;
  ${spacing.marginT(1)};
  ${spacing.paddingY(2)};
  ${spacing.paddingX(3)};
  overflow: auto;
  ${scrollbarStyle.hidden};
  width: 100%;
  height: 114px;

  background-color: ${colors.bg_select};
  ${borderRadiusStyle[10]};
  ${boxshadowStyle.modal};
`;
const OptionItem = styled.li`
  ${typoStyle.contents}
  ${spacing.paddingY(2)};
  ${spacing.paddingX(4)};

  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    ${borderRadiusStyle.full};
    background-color: ${colors.text_hover};
  }
`;
const TeamLogo = styled.div`
  flex: 1;
  display: flex;

  > div:first-of-type {
    ${spacing.marginR(2)};
  }
`;
const PlayerInfo = styled.div`
  flex: 2.1;
`;

export default ModalLocalPlayerSearch;
