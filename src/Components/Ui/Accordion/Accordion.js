import React, { useEffect, useState } from "react";
import { useMemo } from "react";

import { createContext } from "react";
import { useDetectOutsideClick } from "../../../Hooks/useDetectOutsideClick";

export const AccordionContext = createContext({
  isActive: false,
  setIsActive: () => {},
});

const Accordion = ({ children, act = false, ...props }) => {
  const [isActive, setIsActive] = useState(act);

  const contextValue = useMemo(
    () => ({
      setIsActive,
      isActive,
    }),
    [setIsActive, isActive]
  );

    useEffect(() => {
      setIsActive(act);
    },[act])

  return (
    <div {...props}>
      <AccordionContext.Provider value={contextValue}>
        {children}
      </AccordionContext.Provider>
    </div>
  );
};

export default Accordion;
