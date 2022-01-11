import React, { useState } from "react";
import styled, { css } from "styled-components";
import { useTranslation } from "react-i18next";
import SetInputBox from "./SetInputBox";
import { useDispatch, useSelector } from "react-redux";
import {
  SetConfirmFuncId,
  SetDesc,
  SetIsOpen,
  SetIsSelector,
  SetSelectedResult,
  SetSemiDesc,
} from "../../../redux/modules/modalvalue";
import axiosRequest from "../../../lib/axiosRequest";
import { API } from "../../config";
import signAxiosReq from "../../../lib/signAxiosReq";
import LoadingImg from "../../../Components/LoadingImg/LoadingImg";
import { Loading } from "../../../redux/modules/filtervalue";

const SetCode = ({ id, authCode, setAuthCode, setSignType, signType }) => {
  const filters = useSelector((state) => state.FilterReducer);
  const [alterOpen, setAlertOpen] = useState(false);

  const [doneCheckAuthCode, setDoneCheckAuthCode] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const onChange = (e) => {
    const { value, id } = e.target;
    console.log("id", id);

    setAuthCode(value);
  };

  const doneConfirm = () => {
    dispatch(SetIsSelector(true));
    dispatch(SetIsOpen(true));
    dispatch(SetDesc(t(`sign.${id}.authAlert`)));
    dispatch(SetSemiDesc(t(`sign.${id}.authSemiAlert`)));

    switch (signType) {
      case "EC":
        dispatch(SetConfirmFuncId("signUp"));
        break;
      case "PC":
        dispatch(SetConfirmFuncId("changePw"));
        break;
      default:
        break;
    }
  };

  const codeAuth = () => {
    const url = `${API}/lolapi/authkey`;
    const param = `key=${authCode}`;
    dispatch(Loading(true));
    signAxiosReq(
      url,
      param,
      function (success) {
        if (success) {
          dispatch(SetIsSelector(false));
          dispatch(SetIsOpen(true));
          dispatch(SetDesc(t("sign.checkLogin.success")));
          dispatch(SetSemiDesc(""));
          dispatch(SetConfirmFuncId("checkLogin"));
          setDoneCheckAuthCode(true);
          setAlertOpen(false);
        }
        dispatch(Loading(false));
      },
      function (data) {
        setAlertOpen(true);
        dispatch(Loading(false));
      }
    );
  };

  const Confirm = () => {
    if (doneCheckAuthCode) {
      doneConfirm();
    } else {
      dispatch(SetIsSelector(false));
      dispatch(SetIsOpen(true));
      dispatch(SetDesc(t("sign.setCode.authNotDone")));
      dispatch(SetSemiDesc(""));
    }
  };
  return (
    <MainBox>
      <div className="logo">
        <img className="logo" src="Images/logo.png" alt="" />
      </div>
      <div className="subject">
        <span>{t(`sign.${id}.subject`)}</span>
      </div>
      <div className="desc">
        <span>{t(`sign.${id}.desc`)}</span>
      </div>
      <div className="set-code-alert">
        <span>{id === "setCode" && t("sign.setCode.alert")}</span>
      </div>
      <div className="input-box">
        <SetInputBox
          width="80"
          placeholder={t("sign.setCode.limitChar")}
          id={"certification-input"}
          onChange={onChange}
          maxlength={16}
        />
        <CertificationButton
          onClick={() => {
            codeAuth();
          }}
          isActive={authCode.length === 16}
        >
          {t("sign.setCode.certification")}
        </CertificationButton>
      </div>
      <AlertSetCode isOpen={alterOpen}>
        {t("sign.setCode.alertCode")}
      </AlertSetCode>
      <div className="confirm2">
        <ConfirmButton onClick={Confirm} isActive={doneCheckAuthCode}>
          {t(`sign.${id}.authentication`)}
        </ConfirmButton>
      </div>
    </MainBox>
  );
};

export default SetCode;

const SignUpBox = styled.div`
  width: 50%;
  height: 988px;
  padding: 292px 100px;
`;

const MainBox = styled.div`
  width: 540px;
  height: 356px;
  font-family: SpoqaHanSansNeo;
  text-align: left;
  color: #fff;
  margin: 292px 100px;

  .logo {
    margin: 0 0 23px 0;
    object-fit: contain;
  }

  .subject {
    font-size: 18px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.11;
    letter-spacing: normal;
  }

  .desc {
    margin-top: 30px;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.64;
    letter-spacing: normal;
  }

  .set-code-alert {
    margin-top: 10px;
    display: flex;
    font-size: 13px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.54;
    letter-spacing: normal;
    text-align: left;
    color: #84818e;

    .certification {
      background-color: #484655;
    }
  }

  .input-box {
    margin-top: 40px;
    display: flex;
  }
`;

const CertificationButton = styled.button`
  width: 20%;
  height: 36px;
  border-radius: 20px;
  background-color: #484655;
  font-family: SpoqaHanSansNeo;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.92;
  letter-spacing: normal;
  text-align: center;
  color: #fff;
  :hover {
    opacity: 0.8;
  }
  ${(props) =>
    props.isActive &&
    css`
      background-color: #5942ba;
    `}
`;

const ConfirmButton = styled.button`
  width: 100%;
  height: 42px;
  border-radius: 20px;
  background-color: #484655;
  font-family: SpoqaHanSansNeo;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.92;
  letter-spacing: normal;
  text-align: center;
  color: #fff;
  margin-top: 31px;
  :hover {
    opacity: 0.8;
  }
  ${(props) =>
    props.isActive &&
    css`
      background-color: #5942ba;
    `}
`;

const AlertSetCode = styled.div`
  visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};
  margin-top: 5px;
  margin-left: 20px;
  width: 100%;
  height: 14px;
  font-family: SpoqaHanSansNeo;
  font-size: 11px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.27;
  letter-spacing: normal;
  text-align: left;
  color: #f04545;
`;
