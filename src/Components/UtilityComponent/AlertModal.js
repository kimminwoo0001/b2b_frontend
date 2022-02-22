import React, { useEffect, useState } from "react";
/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled/macro";
import Modal from "react-modal";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { SetIsOpen, SetSelectedResult, SetSemiDesc } from "../../redux/modules/modalvalue";
import { API } from "../../Pages/config";
import axiosRequest from "../../lib/axios/axiosRequest";
import { Loading } from "../../redux/modules/filtervalue";
import { UserLogout } from "../../redux/modules";
import setCookie from "../../lib/Cookie/setCookie";
import { goHome, goLogin } from "../../lib/pagePath";

const customStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    zIndex: 1
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
  const user = useSelector((state) => state.UserReducer);
  const lang = useSelector((state) => state.LocaleReducer);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const { isOpen, desc, semiDesc, isSelector, confirmFuncId, cancelFuncId } = useSelector(
    (state) => state.ModalReducer
  );
  const pagePath = document.location.pathname;
  // console.log(isOpen, desc, semiDesc);

  useEffect(() => {
    console.log("Open");
    if (isOpen) {
      console.log("Close");
    }
  }, [isOpen]);

  const activeConfirmFunc = () => {
    dispatch(SetIsOpen(false));
    dispatch(SetSemiDesc(""));
    switch (confirmFuncId) {
      case "/login":
        const url = `${API}}/lolapi/logout`;
        const info = `id=${user.id}&charge_time=${user.charge_time}&lang=${lang}`;
        axiosRequest("POST", url, info, function (e) {
        });
        dispatch(Loading(false))
        sessionStorage.clear();
        dispatch(UserLogout());
        history.push(goLogin)
        setCookie("user-token", user.token, -1);
        return;
      case "/home":
        history.push(goHome);
        return;
      default:
        break;
    }

    if (desc === t("alert.logout.sessionExpires")) {
      history.push(goLogin);
    }

    if (confirmFuncId) {
      dispatch(SetSelectedResult(confirmFuncId));
    }
  };

  const activeCancelFunc = () => {
    dispatch(SetIsOpen(false));
    dispatch(SetSemiDesc(""));
    if (cancelFuncId) {
      dispatch(SetSelectedResult(""));
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
        <ModalDetail>{
          desc?.split('\n').map((line) => {
            return <>{line}<br /></>
          })
        }</ModalDetail>
        {semiDesc.length > 0 && <ModalSemiDetail>
          {semiDesc?.split('\n').map((line) => {
            return <>{line}<br /></>
          })}
        </ModalSemiDetail>}

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
    </Modal >
  );
};

export default AlertModal;

const ModalWrapper = styled.div`
  position: relative;
  width: 500px;
  //height: 151px;
  /* margin: 10px 0 0; */
  padding: 30px 0 20px;
  border-radius: 20px;
  box-shadow: 0px 8px 16px 0 rgba(4, 0, 0, 0.4);
  background-color: #2f2d38;
  overflow-y: hidden;
  z-index: 1;
`;

const ModalDetail = styled.div`
  width: 420px;
  margin: 0 40px 13px;
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

const ModalSemiDetail = styled.div`
  width: 100%;
  margin: 0 0 0px 0;
  font-family: SpoqaHanSansNeo;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.54;
  letter-spacing: normal;
  text-align: center;
  color: #84818e;
`;

const ModalClose = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 62px;
  margin-top: 30px;

  button {
    width: 225px;
    height: 60px;
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
