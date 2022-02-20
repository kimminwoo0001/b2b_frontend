import React, { useEffect, useState } from "react";
/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled/macro";
import { useTranslation } from "react-i18next";
import SetInputBox from "./Component/SetInputBox";
import { useDispatch, useSelector, batch } from "react-redux";
import {
  ModalInit,
  SetConfirmFuncId,
  SetDesc,
  SetIsOpen,
  SetIsSelector,
  SetModalInfo,
  SetSelectedResult,
  SetSemiDesc,
} from "../../redux/modules/modalvalue";
import { useHistory } from "react-router-dom";
import { API } from "../config";
import signAxiosReq from "../../lib/axios/signAxiosReq";
import axiosRequest from "../../lib/axios/axiosRequest";
import { Language } from "../../redux/modules/locale";
import {
  SetIsNeedChkLogin,
  UserChargeTime,
  UserID,
  UserName,
  UserTeamName,
  UserToken,
} from "../../redux/modules/user";
import { goCheckLogin, goHome } from "../../lib/pagePath";

const CheckLogin = ({}) => {
  const user = useSelector((state) => state.UserReducer);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  let history = useHistory();
  const signType = "IC";

  const { selectedResult } = useSelector((state) => state.ModalReducer);

  const [emailAuthText, setEmailAuthText] = useState(""); // 이메일 보안 텍스트
  const [authAlertOpen, setAuthAlertOpen] = useState(false);

  // 타이머
  const [emailAuthSendTime, setEmailAuthSendTime] = useState();
  const [emailAuthTimeOut, setEmailAuthTimeOut] = useState(false);

  const onChange = (e) => {
    const { value, id } = e.target;
    console.log("id", id);

    switch (id) {
      case "email-auth-input":
        setEmailAuthText(value);
        break;
      default:
        break;
    }

    console.log(value);
  };

  const checkMail = () => {
    const url = `${API}/lolapi/authemailcord`;
    const param = `email=${user.id}&type=${signType}&key=${""}`;
    signAxiosReq(
      url,
      param,
      function (success) {
        console.log();
        if (success) {
          dispatch(SetIsSelector(false));
          dispatch(SetIsOpen(true));
          dispatch(SetDesc(t("sign.signUpContent.sendAuthDesc")));
          const time = new Date().getTime() / 1000 + 180;
          setEmailAuthSendTime(time);
          setEmailAuthTimeOut(false);
        }
      },
      function (data) {
        dispatch(SetIsSelector(false));
        dispatch(SetIsOpen(true));
        dispatch(SetDesc(t("sign.checkLogin.fail")));
      }
    );
  };

  const checkEmailAuth = () => {
    if (emailAuthTimeOut) {
      dispatch(SetIsSelector(false));
      dispatch(SetIsOpen(true));
      dispatch(SetDesc(t("sign.signUpContent.emailAuthTimeOut")));
      return;
    }
    const url = `${API}/lolapi/authcord`;
    const param = `authcord=${emailAuthText}&key=${""}&email=${
      user.id
    }&type=${signType}`;
    console.log("param", param);
    signAxiosReq(
      url,
      param,
      function (success) {
        console.log();
        if (success) {
          dispatch(SetIsSelector(false));
          dispatch(SetIsOpen(true));
          dispatch(SetDesc(t("sign.checkLogin.success")));
          dispatch(SetConfirmFuncId("checkLoingSuccess"));
          setAuthAlertOpen(false);
        }
      },
      function (data) {
        dispatch(SetIsSelector(false));
        dispatch(SetIsOpen(true));
        dispatch(SetDesc(t("sign.checkLogin.fail")));
        setAuthAlertOpen(false);
      }
    );
  };

  useEffect(() => {
    dispatch(SetSelectedResult(false));
    const time = new Date().getTime() / 1000 + 180;
    setEmailAuthSendTime(time);
  }, []);

  useEffect(() => {
    if (selectedResult === "checkLoingSuccess") {
      dispatch(ModalInit());
      const param = `ids=${user.id}&password=${user.password}&type=Y`;
      const url = `${API}/lolapi/logins`;
      axiosRequest(
        "POST",
        url,
        param,
        function (data) {
          const token = data;
          if (token !== "fail") {
            //sessionStorage.setItem("token", token.token);
            sessionStorage.setItem("i18nextLng", token.lang);
            //sessionStorage.setItem("id", id);
            console.log("token:", token);
            batch(() => {
              dispatch(Language(token.lang));
              dispatch(UserToken(token.token));
              dispatch(UserChargeTime(token.charge_time));
              dispatch(UserName(token.name));
              dispatch(UserTeamName(token.teamName));
              history.push(goHome);
            });
          }
        },
        function (objStore) {
          console.log("objStore:", objStore);
          if (objStore.message.toUpperCase() === "IC") {
            dispatch(SetIsNeedChkLogin(true));
            const url = `${API}/lolapi/authemailcord`;
            const param = `email=${user.id}&type=${objStore.message}&key=${""}`;
            signAxiosReq(
              url,
              param,
              function (success) {
                dispatch(UserID(user.id));
                history.push(goCheckLogin);
              },
              function (data) {
                dispatch(SetIsSelector(false));
                dispatch(SetIsOpen(true));
                dispatch(SetDesc(t("sign.login.fail")));
              }
            );
          } else {
            dispatch(SetModalInfo(objStore)); // 오류 발생 시, Alert 창을 띄우기 위해 사용
          }
        },
        5000
      ); // 서버 응답 없을 경우 timeout 설정 (5s)
    }
  }, [selectedResult]);

  return (
    <Wrapper>
      <img className="indexImg2" src="Images/index-login-img2.png" alt="" />
      <ContentBox>
        <MainBox>
          <div className="logo">
            <img className="logo" src="Images/logo.png" alt="" />
          </div>
          <div className="subject">
            <span>{t(`sign.checkLogin.subject`)}</span>
          </div>
          <div className="desc">
            <span>{t(`sign.checkLogin.desc`)}</span>
          </div>
          <section className="email">
            <header>{t("sign.checkLogin.emailAuth")}</header>
            <div className="input-box">
              <SetInputBox
                width="55"
                type="text"
                id={"email-auth-input"}
                placeholder={t("sign.signUpContent.authPlaceholder")}
                onChange={onChange}
                timer={emailAuthSendTime}
                timeOutFunc={setEmailAuthTimeOut}
              />
              <ButtonTemp width="20" onClick={checkMail}>
                {t("sign.signUpContent.reRequest")}
              </ButtonTemp>
              <ButtonTemp width="25" onClick={checkEmailAuth}>
                {t("sign.signUpContent.sendAuthConfirm")}
              </ButtonTemp>
            </div>
            <AlertSetCode isOpen={authAlertOpen}>
              {t("sign.signUpContent.authAlert")}
            </AlertSetCode>
          </section>
        </MainBox>
      </ContentBox>
    </Wrapper>
  );
};

export default CheckLogin;
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(35, 33, 42);
  overflow-y: hidden;

  .indexImg2 {
    width: 50%;
    height: 988px;
    object-fit: contain;
    opacity: 0.41;
    mix-blend-mode: luminosity;
  }
`;

const ContentBox = styled.div`
  width: 50%;
  height: 100%;
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

  .email {
    margin-top: 40px;
    .input-box {
      margin-top: 7px;
      display: flex;
    }
  }
`;

const ButtonTemp = styled.button`
  width: ${(props) => props.width}%;
  height: 36px;
  border-radius: 20px;
  margin-right: 5px;
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
