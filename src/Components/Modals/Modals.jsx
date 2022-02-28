import React, { useContext } from "react";
import { ModalsStateContext, ModalsDispatchCointext } from "./ModalsContext";
// modal screen
import MyModal from "./screens/MyModal";
import ModalSolorankID from "./screens/ModalAddSolorankID";
import ModalAddTeamPlayer from "./screens/ModalAddTeamPlayer";
import ModalAlert from "./screens/ModalAlert";
import ModalConfirm from "./screens/ModalConfirm";
import { CSSTransition, TransitionGroup } from "react-transition-group";

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

  return (
    <TransitionGroup>
      {openedModals.map((modal, index) => {
        const { Component, props = {} } = modal;
        const { onSubmit, onCancel, ...restProps } = props;

        const onClose = () => {
          close(Component);
        };
        const handleCancel = async () => {
          if (typeof onCancel === "function") {
            await onCancel();
          }
          onClose(Component);
        };

        const handleSubmit = async (e) => {
          if (typeof onSubmit === "function") {
            await onSubmit(e);
          }
          // 모달 닫기
          onClose(Component);
        };

        return (
          <CSSTransition
            key={"Modal" + index}
            classNames={"item"}
            timeout={200}
          >
            <Component
              onClose={onClose}
              onCancel={handleCancel}
              onSubmit={handleSubmit}
              {...restProps}
            />
          </CSSTransition>
        );
      })}
    </TransitionGroup>
  );
};

export default Modals;
