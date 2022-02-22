import React, { useContext } from "react";
import { ModalsStateContext, ModalsDispatchCointext } from "./ModalsContext";
import MyModal from "./screens/MyModal";
import ModalSolorankID from "./screens/ModalAddSolorankID";
import ModalAddTeamPlayer from "./screens/ModalAddTeamPlayer";

export const modalList = {
  myModal: MyModal,
  addSolorankID: ModalSolorankID,
  addTeamPlayer: ModalAddTeamPlayer,
};

const Modals = () => {
  const openedModals = useContext(ModalsStateContext);
  const { close } = useContext(ModalsDispatchCointext);

  return openedModals.map((modal, index) => {
    const { Component, props } = modal;
    const { onSubmit, onCancel, ...restProps } = props;

    const handleClose = async () => {
      if (typeof onCancel === "function") {
        await onCancel();
      }
      close(Component);
    };

    const handleSubmit = async () => {
      if (typeof onSubmit === "function") {
        await onSubmit();
      }
      // 모달 닫기
      handleClose(Component);
    };

    return (
      <Component
        key={"Modal" + index}
        onClose={handleClose}
        onSubmit={handleSubmit}
        {...restProps}
      />
    );
  });
};

export default Modals;
