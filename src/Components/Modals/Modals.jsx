import React, { useContext } from "react";
import { ModalsStateContext, ModalsDispatchCointext } from "./ModalsContext";
// modal screen
import MyModal from "./screens/MyModal";
import ModalSolorankID from "./screens/ModalAddSolorankID";
import ModalAddTeamPlayer from "./screens/ModalAddTeamPlayer";
import ModalAlert from "./screens/ModalAlert";
import ModalConfirm from "./screens/ModalConfirm";

export const modalList = {
  myModal: MyModal,
  alert: ModalAlert,
  confirm: ModalConfirm,
  addSolorankID: ModalSolorankID,
  addTeamPlayer: ModalAddTeamPlayer,
};

const Modals = () => {
  const openedModals = useContext(ModalsStateContext);
  const { close } = useContext(ModalsDispatchCointext);

  return openedModals.map((modal, index) => {
    const { Component, props = {} } = modal;
    const { onSubmit, onCancel, ...restProps } = props;

    console.log(restProps);

    const onClose = () => {
      close(Component);
    };
    const handleCancel = async () => {
      if (typeof onCancel === "function") {
        await onCancel();
      }
      onClose(Component);
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
        onCancel={handleCancel}
        onSubmit={handleSubmit}
        {...restProps}
      />
    );
  });
};

export default Modals;
