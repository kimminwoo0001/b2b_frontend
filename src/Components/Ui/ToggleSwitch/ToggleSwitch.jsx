import React from "react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { borderRadiusStyle, colors, spacing } from "../../../Styles/ui";
import { cx } from "@emotion/css";

const ToggleSwitch = ({
  className,
  checked = false,
  disabled = false,
  ...props
}) => {
  return (
    <ToggleContainer className={className}>
      <input type="checkbox" checked={checked} disabled={disabled} {...props} />
      <div
        className={cx([{ "is-active": checked }, { "is-disabled": disabled }])}
      >
        <motion.span layout aria-hidden transition={transition}></motion.span>
      </div>
    </ToggleContainer>
  );
};

const transition = {
  type: "spring",
  stiffness: 600,
  damping: 20,
};

const ToggleContainer = styled.label`
  ${spacing.paddingY(1)}
  cursor: pointer;

  > input {
    display: none;
  }

  > div {
    position: relative;
    width: 36px;
    height: 14px;
    background-color: rgba(255, 255, 255, 0.3);
    ${borderRadiusStyle.full};

    &.is-active {
      background-color: ${colors.point};
      > span {
        left: initial;
        right: 0;
      }
    }

    &.is-disabled {
      background-color: rgba(255, 255, 255, 0.1);
      > span {
        background-color: rgba(255, 255, 255, 0.3);
      }
    }

    > span {
      position: absolute;
      top: -3px;
      left: 0;

      display: block;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background-color: white;
    }
  }
`;

export default ToggleSwitch;
