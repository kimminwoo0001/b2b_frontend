import React, { useState } from "react";
import { ModalsDispatchCointext, ModalsStateContext } from "./ModalsContext";

const ModalProvider = ({ children }) => {
  const [openedModals, setOpenModals] = useState([]);

  const open = (Component, props) => {
    setOpenModals((modals) => [...modals, { Component, props }]);
  };

  const close = (Component) => {
    setOpenModals((modals) =>
      modals.filter((modal) => modal.Component !== Component)
    );
  };

  const dispatch = { open, close };

  return (
    <ModalsStateContext.Provider value={openedModals}>
      <ModalsDispatchCointext.Provider value={dispatch}>
        {children}
      </ModalsDispatchCointext.Provider>
    </ModalsStateContext.Provider>
  );
};

export default ModalProvider;
