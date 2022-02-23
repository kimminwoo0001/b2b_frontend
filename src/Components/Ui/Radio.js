import React, { useState, useRef, forwardRef } from "react";
import styled from "@emotion/styled";
import { transitionStyle } from "../../Styles/ui";

const Radio = forwardRef(({ children, checked, ...props }, ref) => {
  return (
    <SRadioContainer>
      <input type="radio" checked={checked} {...props} ref={ref} />
      <em className={checked ? "is-active" : ""}></em>
      <span>{children}</span>
    </SRadioContainer>
  );
});

// style
const SRadioContainer = styled.label`
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  width: auto;
  margin: 5px 0;

  > em {
    position: relative;
    display: block;
    width: 24px;
    height: 24px;
    background-image: url("Images/btn_radio_off.svg");
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
      background-image: url("Images/btn_radio_on.svg");
    }
  }

  > input {
    display: none;
  }
`;

export default Radio;
