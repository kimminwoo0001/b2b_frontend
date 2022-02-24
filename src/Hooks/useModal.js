import { useContext } from "react";
import { ModalsDispatchCointext } from "../Components/Modals/ModalsContext";
/**
 * 2022 .02. 24
 * @author kimminwoo
 *
 * @param {jsx} Component 모달리스트에 등록할 모달 컴포넌트
 * @param {[key:string] : string } props 모달 컴포넌트에 전달할 props 객체
 * @returns {open, close}
 * @example
 * open(modalList.MyModal, {onSubmit: () => { Do something }})
 *
 * @desc modal context에 모달을 추가하는 커스텀 훅
 */

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
