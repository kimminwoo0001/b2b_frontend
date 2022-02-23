import { useContext } from "react";
import { ModalsDispatchCointext } from "../Components/Modals/ModalsContext";

export function useModal() {
  const { open, close } = useContext(ModalsDispatchCointext);

  const openModal = (Component, props) => {
    open(Component, props);
  };
  const closeModal = (Component) => {
    close(Component);
  };

  return {
    openModal,
    closeModal,
  };
}
