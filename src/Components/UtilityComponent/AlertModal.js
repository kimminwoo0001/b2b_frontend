import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { SetIsOpen } from "../../redux/modules/modalvalue";

const customStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    background: "rgba(0, 0, 0, 0.75)",
    border: "1px solid rgba(0, 0, 0, 0.75)",
    overflow: "auto",
    WebkitOverflowScrolling: "touch",
    borderRadius: "4px",
    outline: "none",
    padding: "0px",
  },
};

const AlertModal = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const { isOpen, desc, isSelector, confirmFuncId, cancelFuncId } = useSelector(
    (state) => state.ModalReducer
  );

  useEffect(() => {
    console.log("모달 창 useEffect");
    if (isOpen) {
      console.log("모달 창 열림");
    }
  }, [isOpen]);

  const activeConfirmFunc = () => {
    dispatch(SetIsOpen(false));

    if (desc === t("alert.logout.sessionExpires")) {
      history.push("/login");
    }
    if (confirmFuncId) {
      //confirmFunc();
    }
  };

  const activeCancelFunc = () => {
    dispatch(SetIsOpen(false));

    if (cancelFuncId) {
      //cancelfunc();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => dispatch(SetIsOpen(false))}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <ModalWrapper>
        <ModalDetail>{desc}</ModalDetail>
        <ModalClose>
          {isSelector ? (
            <>
              <button className="cancel" onClick={() => activeCancelFunc()}>
                {t("alert.label.cancel")}
              </button>
              <button
                className="confirm"
                onClick={() => {
                  activeConfirmFunc();
                }}
              >
                {t("alert.label.confirm")}
              </button>
            </>
          ) : (
            <button
              className="confirm"
              onClick={() => {
                activeConfirmFunc();
              }}
            >
              {t("alert.label.confirm")}
            </button>
          )}
        </ModalClose>
      </ModalWrapper>
    </Modal>
  );
};

export default AlertModal;

const ModalWrapper = styled.div`
  width: 500px;
  //height: 151px;
  margin: 10px 0 0;
  padding: 30px 0 20px;
  border-radius: 20px;
  box-shadow: 0px 8px 16px 0 rgba(4, 0, 0, 0.4);
  background-color: #2f2d38;
  overflow-y: hidden;
`;

const ModalDetail = styled.div`
  width: 420px;
  margin: 0 40px 20px;
  font-family: SpoqaHanSansNeo;
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.44;
  letter-spacing: normal;
  text-align: center;
  color: #fff;
`;

const ModalClose = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 62px;

  button {
    width: 180px;
    height: 42px;
    margin: 0 0px 0 0;
    padding: 0px 0px;
    border-radius: 16px;
    font-family: SpoqaHanSansNeo;
    font-size: 18px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.56;
    letter-spacing: normal;
    text-align: center;
    color: #fff;
  }
  .confirm {
    background-color: #5942ba;
    margin: 0 5px;
  }
  .cancel {
    background-color: #484655;
    margin: 0 5px;
  }
`;
