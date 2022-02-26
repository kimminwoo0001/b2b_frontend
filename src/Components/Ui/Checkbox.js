import React, { memo } from "react";
import styled from "@emotion/styled";
import { transitionStyle } from "../../Styles/ui";

const Checkbox = ({
  children,
  checked,
  name,
  value,
  disabled,
  onChange,
  ...props
}) => {
  return (
    <SCheckboxContainer className={disabled ? "is-disabled" : ""} {...props}>
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        name={name}
        value={value}
        onChange={onChange}
      />
      <em className={checked ? "is-active" : ""}></em>
      <span>{children}</span>
    </SCheckboxContainer>
  );
};

const SCheckboxContainer = styled.label`
  display: inline-flex;
  justify-content: center;
  align-items: center;

  &.is-disabled {
    opacity: 0.3;
  }

  > em {
    position: relative;
    display: block;
    width: 24px;
    height: 24px;
    background-image: url("Images/btn_check_off.svg");
    margin-right: 3px;
    ${transitionStyle.background}

    &::after {
      content: "";
      width: 30px;
      height: 30px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      background-color: rgba(255, 255, 255, 0.1);
      border-radius: 50%;
      opacity: 0;

      ${transitionStyle.opacity};
    }

    &:hover {
      &::after {
        opacity: 1;
      }
    }

    &.is-active {
      background-image: url("Images/btn_check_on_white.svg");
    }
  }

  > input {
    display: none;
  }
`;

export default memo(Checkbox);
