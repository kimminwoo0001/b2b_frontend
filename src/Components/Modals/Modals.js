import React, { useContext } from "react";
import { ModalsStateContext, ModalsDispatchCointext } from "./ModalsContext";
import MyModal from "./components/MyModal";

export const modalList = {
  myModal: MyModal,
};

const Modals = () => {
  const openedModals = useContext(ModalsStateContext);
  const { close } = useContext(ModalsDispatchCointext);

  return openedModals.map((modal, index) => {
    const { Component, props } = modal;
    const { onSubmit, ...restProps } = props;

    const onClose = () => {
      close(Component);
    };

    const handleSubmit = async () => {
      if (typeof onSubmit === "function") {
        await onSubmit();
      }
      // 모달 닫기
      onClose(Component);
    };

    return (
      <Component
        key={"Modal" + index}
        onClose={onClose}
        onSubmit={handleSubmit}
        {...restProps}
      />
    );
  });
};

export default Modals;
