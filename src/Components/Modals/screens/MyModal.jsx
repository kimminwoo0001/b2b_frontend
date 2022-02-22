import React from "react";
import ReactModal from "react-modal";
import { modalStyle } from "../../../Styles/ui";

const MyModal = ({ onSubmit, onClose }) => {
  const handleClickSubmit = () => {
    onSubmit();
  };
  const handleClickCancel = () => {
    onClose();
  };

  return (
    <ReactModal style={modalStyle} isOpen onRequestClose={onClose}>
      <div>나는 모달이에오</div>
      <div>
        <button onClick={handleClickSubmit}>확인</button>
        <button onClick={handleClickCancel}>취소</button>
      </div>
    </ReactModal>
  );
};

export default MyModal;
