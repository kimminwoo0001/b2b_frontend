import React, {
  useState,
  useRef,
  createContext,
  useMemo,
  useEffect,
} from "react";
import styled from "@emotion/styled";
import { shadowStyle } from "../../../Styles/ui";
import { typoStyle } from "../../../Styles/ui";
import { useDetectOutsideClick } from "../../../Hooks/useDetectOutsideClick";
import { motion, AnimatePresence } from "framer-motion/dist/framer-motion";

export const ListContext = createContext({
  setCurrentValue: () => {},
  setIsActive: () => {},
});

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

const DropdownList = ({ children, label, value = "", onChange, ...props }) => {
  const containerRef = useRef(null);
  const [animate, setAnimate] = useState("hidden");
  const [currentValue, setCurrentValue] = useState(value);
  const [isActive, setIsActive] = useDetectOutsideClick(containerRef, false);

  useEffect(() => {
    if (!currentValue) return;
    if (onChange) {
      onChange();
    }
  }, [currentValue, onChange]);

  const contextValue = useMemo(
    () => ({
      setCurrentValue,
      setIsActive,
    }),
    [setCurrentValue, setIsActive]
  );

  return (
    <SContainer {...props} ref={containerRef}>
      <SLabel onClick={() => setIsActive(!isActive)}>
        <input type="text" placeholder={label} value={currentValue} readOnly />
        <img src="Images/select-arrow.png" alt="arrowIcon" />
      </SLabel>

      <AnimatePresence>
        {isActive && (
          <ListContext.Provider value={contextValue}>
            <SList
              variants={variants}
              initial="hidden"
              animate="visible"
              exit={"hidden"}
            >
              {children}
            </SList>
          </ListContext.Provider>
        )}
      </AnimatePresence>
    </SContainer>
  );
};
const SContainer = styled.div`
  position: relative;

  .list-enter {
    opacity: 0;
    transform: scale(0.9);
  }
  .list-enter-active {
    opacity: 1;
    transform: translateX(0);
    transition: opacity 300ms, transform 300ms;
  }
  .list-exit {
    opacity: 1;
  }
  .list-exit-active {
    opacity: 0;
    transform: scale(0.9);
    transition: opacity 300ms, transform 300ms;
  }
`;

const SLabel = styled.button`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.bg_select};

  > input {
    padding: 10px 0 8px 10px;
    ${typoStyle.select}
    width: 100%;
    height: 100%;
    cursor: pointer;

    &::placeholder {
      ${typoStyle.select}
    }
  }

  > img {
    position: absolute;

    top: 50%;
    right: 10px;
    transform: translateX(-50%);
  }
`;
const SList = styled(motion.ul)`
  position: absolute;
  z-index: 1000;
  top: calc(100% + 5px);
  width: 100%;
  overflow: hidden;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.bg_select};

  ${shadowStyle.select}
`;
export default DropdownList;
