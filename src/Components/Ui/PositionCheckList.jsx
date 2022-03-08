/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import CustomCheckbox from "./CustomCheckbox";
import styled from "@emotion/styled/macro";
import { isObjEqual } from "../../lib/isObjEqual";
import {
  borderRadiusStyle,
  colors,
  transitionStyle,
  typoStyle,
} from "../../Styles/ui";
import PropTypes from "prop-types";

// 포지션 정보
const POSITION_IMG = {
  all: "ALL",
  top: <img src="images/position/ico-position-top.svg" alt="top" />,
  jng: <img src="images/position/ico-position-jng.svg" alt="jng" />,
  mid: <img src="images/position/ico-position-mid.svg" alt="mid" />,
  bot: <img src="images/position/ico-position-bot.svg" alt="bot" />,
  sup: <img src="images/position/ico-position-sup.svg" alt="sup" />,
};
/**
 * 포지션을 다중 선택, 단일 선택할 때 사용하는 UI 컴포넌트입니다.
 *
 */
const PositionCheckList = ({
  all = true,
  multi = true,
  defaultColor = "rgbas(255,255,255,0.3)",
  hoverColor = colors.bg_checkbox,
  position = {
    all: false,
    top: false,
    jug: false,
    mid: false,
    bot: false,
    sup: false,
  },
  setPosition = () => {},
  ...props
}) => {
  const handleChangeMulti = (e) => {
    const { name, value, checked } = e.target;
    if (value === "all") {
      setPosition((prev) => {
        let newPosition = { ...prev };
        for (let key in newPosition) {
          newPosition[key] = checked;
        }
        return newPosition;
      });
    } else {
      setPosition((prev) => {
        const newPosition = { ...prev };
        newPosition[value] = checked;

        if (isObjEqual(newPosition)) {
          newPosition.all = checked;
        } else {
          newPosition.all = false;
        }

        return newPosition;
      });
    }
  };
  const handleChangeSingle = (e) => {
    const { name, value, checked } = e.target;
    if (position[value]) return setPosition({ ...position, [value]: checked });
    setPosition((prev) => {
      const newPosition = { ...prev };
      for (let key in newPosition) {
        newPosition[key] = !checked;
      }
      newPosition[value] = checked;
      return newPosition;
    });
  };
  return (
    <div {...props}>
      <SList>
        {Object.keys(position)
          .filter((pos) => {
            if (!all || !multi) return pos !== "all";
            return true;
          })
          .map((key, i) => {
            return (
              <SListItem key={key + i}>
                <SCustomCheckbox
                  name={"position"}
                  value={key}
                  onChange={multi ? handleChangeMulti : handleChangeSingle}
                  checked={position[key]}
                  defaultcolor={defaultColor}
                  hovercolor={hoverColor}
                >
                  <SIcon>
                    <span>{POSITION_IMG[key]}</span>
                  </SIcon>
                </SCustomCheckbox>
              </SListItem>
            );
          })}
      </SList>
    </div>
  );
};

const SList = styled.ul`
  display: flex;
`;

const SIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  ${typoStyle.button_popin}
  user-select: none;

  span {
    opacity: 0.3;
    ${transitionStyle.opacity}
    user-select: none;

    img {
      width: 21px;
      height: 21px;
      user-select: none;
    }
  }
`;

const SCustomCheckbox = styled(CustomCheckbox)`
  display: block;
  overflow: hidden;
  ${borderRadiusStyle[10]}
  ${transitionStyle.background}
  
  ${SIcon} {
    background-color: ${({ defaultcolor }) => defaultcolor};

    &:hover {
      background-color: ${({ hovercolor }) => hovercolor};
      span {
        opacity: 1;
      }
    }
  }

  &.is-active {
    ${SIcon} {
      background-color: ${({ hovercolor }) => hovercolor};
      span {
        opacity: 1;
      }
    }
  }
`;

const SListItem = styled.li`
  &:not(:last-child) {
    margin-right: 6px;
  }
`;

PositionCheckList.propTypes = {
  /**
   * 다중 선택 가능 여부 (multi의 값이 false일 경우 all 값은 자동으로 false 입니다)
   */
  multi: PropTypes.bool,
  /**
   * 전체 선택 영역의 활성화 여부
   */
  all: PropTypes.bool,
  /**
   * 체크박스 영역의 default color를 결정합니다
   */
  defaultColor: PropTypes.string,
  /**
   * 체크박스 영역의 hover 및 checked color를 결정합니다
   */
  hoverColor: PropTypes.string,
  /**
   * 상위state에서 주입받은 상태입니다
   */
  position: PropTypes.shape({}),
  /**
   * 상위state에서 주입받은 setState입니다
   */
  setPosition: PropTypes.func,
};

export default PositionCheckList;
