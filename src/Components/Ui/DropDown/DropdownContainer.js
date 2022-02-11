import React, {
  useState,
  useRef,
  createContext,
  useMemo,
  useEffect,
} from "react";
import styled from "@emotion/styled";
import { useDetectOutsideClick } from "../../../Hooks/useDetectOutsideClick";

export const DropdownContext = createContext({
  label: "",
  isActive: false,
  currentValue: "",
  setCurrentValue: () => {},
  setIsActive: () => {},
});

const DropdownContainer = ({ children, onChange, label, ...props }) => {
  const containerRef = useRef(null);
  const [currentValue, setCurrentValue] = useState("");
  const [isActive, setIsActive] = useDetectOutsideClick(containerRef, false);

  useEffect(() => {
    if (onChange) {
      onChange({ currentValue, label });
    }
  }, [currentValue, onChange]);

  const contextValue = useMemo(
    () => ({
      isActive,
      currentValue,
      setCurrentValue,
      setIsActive,
    }),
    [setCurrentValue, setIsActive, currentValue, isActive]
  );

  return (
    <SContainer ref={containerRef} onClick={() => setIsActive(!isActive)}>
      <DropdownContext.Provider value={contextValue}>
        {children}
      </DropdownContext.Provider>
    </SContainer>
  );
};

const SContainer = styled.div``;

export default DropdownContainer;
