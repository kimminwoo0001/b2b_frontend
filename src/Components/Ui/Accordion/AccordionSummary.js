import styled from "@emotion/styled";
import React from "react";
import { useContext } from "react";
import { transitionStyle } from "../../../Styles/ui";
import { AccordionContext } from "./Accordion";

const AccordionSummary = ({ label, children, onClick, ...props }) => {
  const { isActive, setIsActive } = useContext(AccordionContext);
  const handleClick = () => {
    setIsActive((prev) => !prev);
    if (onClick) {
      onClick();
    }
  };

  return (
    <SContainer {...props} onClick={handleClick} isActive={isActive}>
      {children}
    </SContainer>
  );
};

const SContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding-left: 22px;

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    width: 12px;
    height: 12px;
    transform: translateY(-50%);
    background-image: ${({ isActive }) =>
      isActive
        ? `url("images/ico-arrow-up.svg")`
        : `url("images/ico-arrow-down2.png")`};

    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;

    ${transitionStyle.background}
  }
`;

export default AccordionSummary;
