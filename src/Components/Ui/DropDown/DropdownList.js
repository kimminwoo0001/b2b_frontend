import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { shadowStyle } from "../../../Styles/ui";
import { motion, AnimatePresence } from "framer-motion/dist/framer-motion";
import { useContext } from "react";
import { DropdownContext } from "./DropdownContainer";

// animation
const variants = {
  hidden: {
    opacity: 0,
    y: -10,
  },

  visible: {
    opacity: 1,
    y: 0,
  },

  transition: {
    type: "tween",
    duration: 0.4,
    easing: "easeInOut",
  },
};

const DropdownList = ({ children, ...props }) => {
  const { isActive } = useContext(DropdownContext);

  return (
    <SContainer {...props}>
      <AnimatePresence>
        {isActive && (
          <SList
            variants={variants}
            initial="hidden"
            animate="visible"
            exit={"hidden"}
          >
            {children}
          </SList>
        )}
      </AnimatePresence>
    </SContainer>
  );
};
const SContainer = styled.div`
  position: relative;
`;

const SList = styled(motion.ul)`
  position: absolute;
  z-index: 1000;
  top: calc(100% + 5px);
  min-width: 100%;
  width: fit-content;
  height: fit-content;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.bg_select};
  overflow: hidden;
  ${shadowStyle.select}
`;
export default DropdownList;
