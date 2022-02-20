import React, { useState } from "react";
import { useMemo } from "react";

import { createContext } from "react";
import { useDetectOutsideClick } from "../../../Hooks/useDetectOutsideClick";

export const AccordionContext = createContext({
  isActive: false,
  setIsActive: () => {},
});

const Accordion = ({ children, ...props }) => {
  const [isActive, setIsActive] = useState(true);
  const contextValue = useMemo(
    () => ({
      setIsActive,
      isActive,
    }),
    [setIsActive, isActive]
  );

  return (
    <div {...props}>
      <AccordionContext.Provider value={contextValue}>
        {children}
      </AccordionContext.Provider>
    </div>
  );
};

export default Accordion;
