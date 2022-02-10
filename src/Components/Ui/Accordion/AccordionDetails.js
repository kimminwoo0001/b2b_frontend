import React from "react";
import { useContext } from "react";
import { AccordionContext } from "./Accordion";
import { motion, AnimatePresence } from "framer-motion";
import styled from "@emotion/styled";

const accrodionVariants = {
  hidden: {
    opacity: 0,
    visiblity: "hidden",
    y: -10,
  },

  visible: {
    opacity: 1,
    visiblity: "visible",
    y: 0,
  },

  transition: {
    type: "tween",
    duration: 0.2,
    easing: "linear",
  },
};

const AccordionDetails = ({ children, ...props }) => {
  const { isActive } = useContext(AccordionContext);
  return (
    <AnimatePresence>
      {isActive && children && (
        <Container
          variants={accrodionVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {children}
        </Container>
      )}
    </AnimatePresence>
  );
};

const Container = styled(motion.div)``;

export default AccordionDetails;
