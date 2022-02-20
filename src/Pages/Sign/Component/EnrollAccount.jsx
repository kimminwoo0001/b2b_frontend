import React, { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SetInputBox from "./SetInputBox";
import CheckBox from "../../../Components/UtilityComponent/CheckBox";
import { useDispatch, useSelector } from "react-redux";
import contentTOU from "../../../lib/content/contentTOU";
import contentPICACU from "../../../lib/content/contentPICAUA";
import checkEmail from "../lib/checkEmail";
import { number } from "prop-types";
import {
  SetConfirmFuncId,
  SetDesc,
  SetIsOpen,
  SetIsSelector,
  SetSemiDesc,
} from "../../../redux/modules/modalvalue";
import signAxiosReq from "../../../lib/axios/signAxiosReq";
import { API } from "../../config";
import LoadingImg from "../../../Components/LoadingImg/LoadingImg";
import { Loading } from "../../../redux/modules/filtervalue";
import { goLogin } from "../../../lib/pagePath";

const EnrollAccount = ({ id, authCode, signType }) => {
  const filters = useSelector((state) => state.FilterReducer);

  // 텍스트
  const [emailText, setEmailText] = useState(""); // 이메일 텍스트
  const [emailAuthText, setEmailAuthText] = useState(""); // 이메일 보안 텍스트
  const [pwText, setPwText] = useState(""); // 패스워드 텍스트
  const [pwValidateText, setPwValidateText] = useState(""); // 패스워드 확인 텍스트

  // 인증 완료
  const [doneCheckEmailAuth, setDoneCheckEmailAuth] = useState(false); // 이메일 보안 완료 여부
  const [pwValidation, setPwValidation] = useState(false); // 패스워드 확인 여부

  // 경고
  const [authAlertOpen, setAuthAlertOpen] = useState(false); // 이메일 인증 경고 여부
  const [emailAlertOpen, setEmailAlertOpen] = useState(false); // 이메일 경고 여부
  const [pwAlertOpen, setPwAlertOpen] = useState(false); // 패스워드 경고 여부
  const [validatePwAlertOpen, setValidatePwAlertOpen] = useState(false); // 패스워드 확인 경고 여부

  // 체크박스
  const [allCheck, setAllCheck] = useState(false);
  const [checkTOU, setCheckTOU] = useState(false);
  const [checkPICACU, setCheckPICACU] = useState(false);

  // 타이머
  const [emailAuthSendTime, setEmailAuthSendTime] = useState();
  const [emailAuthTimeOut, setEmailAuthTimeOut] = useState(false);

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const pwRef = useRef();
  const pwValidateRef = useRef();
  const lang = sessionStorage.getItem("i18nextLng");

  let history = useHistory();

  const onChange = (e) => {
    const { value, id } = e.target;
    console.log("id", id);

    switch (id) {
      case "pw-input":
        setPwText(value);
        if (pwValidateText.length > 0 && pwValidateText.length > 0) {
          // console.log(pwValidateText.length > 0 && pwValidateText.length > 0);
          setPwAlertOpen(!(value === pwValidateText));
        }
        if (value.length < 8 || value.length > 16) {
          setValidatePwAlertOpen(true);
          setPwValidation(false);
        } else {
          setValidatePwAlertOpen(false);
          setPwValidation(true);
        }
        break;
      case "pw-validate-input":
        setPwValidateText(value);
        if (pwText.length > 0 && pwValidateText.length > 0) {
          const check = value === pwText;
          setPwAlertOpen(!check);
          setPwValidation(check);
        } else {
          setPwValidation(false);
        }
        break;
      case "email-input":
        // console.log("checkEmail(value)", checkEmail(value));
        setEmailText(value);
        setEmailAlertOpen(!checkEmail(value));
        break;
      case "email-auth-input":
        setEmailAuthText(value);
        //setEmailAlertOpen(!checkEmail(value));
        break;
      default:
        break;
    }
  };

  const btnChange = () => {
    if (checkPICACU && checkTOU) {
      setCheckPICACU(false);
      setCheckTOU(false);
    } else {
      setCheckPICACU(true);
      setCheckTOU(true);
    }
  };

  const checkMail = () => {
    dispatch(Loading(true));
    const url = `${API}/lolapi/authemailcord`;
    const param = `email=${emailText}&type=EC&key=${authCode}`;
    signAxiosReq(
      url,
      param,
      function (success) {
        if (success) {
          dispatch(SetIsSelector(false));
          dispatch(SetIsOpen(true));
          dispatch(SetDesc(t("sign.signUpContent.sendAuthDesc")));
          //dispatch(SetConfirmFuncId("checkLogin"));
          //setDoneCheckEmail(true);
          setEmailAlertOpen(false);
          const time = new Date().getTime() / 1000 + 180;
          setEmailAuthSendTime(time);
          setEmailAuthTimeOut(false);
        }
        dispatch(Loading(false));
      },
      function (data) {
        dispatch(SetIsSelector(false));
        dispatch(SetIsOpen(true));
        dispatch(SetDesc(t("sign.checkLogin.fail")));
        //dispatch(SetConfirmFuncId("checkLogin"));
        //setDoneCheckEmail(false);
        setEmailAlertOpen(false);
        dispatch(Loading(false));
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
    dispatch(Loading(true));
    const url = `${API}/lolapi/authcord`;
    const param = `authcord=${emailAuthText}&key=${authCode}&email=${emailText}&type=${signType}`;
    // console.log("param", param);
    signAxiosReq(
      url,
      param,
      function (success) {
        if (success) {
          dispatch(SetIsSelector(false));
          dispatch(SetIsOpen(true));
          dispatch(SetDesc(t("sign.checkLogin.success")));
          //dispatch(SetConfirmFuncId("checkLogin"));
          setDoneCheckEmailAuth(true);
          setAuthAlertOpen(false);
        }
        dispatch(Loading(false));
      },
      function (data) {
        dispatch(SetIsSelector(false));
        dispatch(SetIsOpen(true));
        dispatch(SetDesc(t("sign.checkLogin.fail")));
        //dispatch(SetConfirmFuncId("checkLogin"));
        setDoneCheckEmailAuth(false);
        setAuthAlertOpen(false);
        dispatch(Loading(false));
      }
    );
  };

  const onConfirm = () => {
    let desc = "";

    // 이메일 / 패스워드 일치 확인
    if (!doneCheckEmailAuth) {
      desc = t("sign.signUpContent.needEmailAuth");
    } else if (!pwValidation) {
      desc = t("sign.signUpContent.alertPWCheck");
    } else if (id === "signUpContent") {
      if (!checkTOU) {
        desc = t("sign.signUpContent.needTOU");
      } else if (!checkPICACU) {
        desc = t("sign.signUpContent.needPICACU");
      }
    }
    // 신규 가입 시, 이용 약관 확인

    if (desc.length > 0) {
      dispatch(SetIsSelector(false));
      dispatch(SetIsOpen(true));
      dispatch(SetDesc(desc));
      setDoneCheckEmailAuth(true);
      setAuthAlertOpen(false);
    } else {
      dispatch(Loading(true));
      const url = `${API}/lolapi/userinfo`;
      const param = `email=${emailText}&password=${pwText}&key=${authCode}&type=${signType}`;
      signAxiosReq(
        url,
        param,
        function (success) {
          if (success) {
            dispatch(SetIsSelector(false));
            dispatch(SetIsOpen(true));
            dispatch(SetDesc(t(`sign.${id}.confirmSuccess`)));
            dispatch(SetSemiDesc(""));
            //dispatch(SetConfirmFuncId("login"));
            history.push(goLogin);
          }
          dispatch(Loading(false));
        },
        function (data) {
          dispatch(Loading(false));
        }
      );
    }
  };

  const onCancel = () => {
    dispatch(SetIsSelector(true));
    dispatch(SetIsOpen(true));
    dispatch(SetDesc(t("alert.desc.questionCancel")));
    dispatch(SetSemiDesc(""));
    dispatch(SetConfirmFuncId("/login"));
  };

  return (
    <MainBox>
      <header className="logo">
        <img className="logo" src="Images/logo.png" alt="" />
      </header>
      <section className="hello">{t(`sign.${id}.hello`)}</section>
      <section className="email">
        <header>{t("sign.signUpContent.email")}</header>
        <div className="flex-box">
          <SetInputBox
            width="75"
            type="text"
            id={"email-input"}
            placeholder={t("sign.signUpContent.emailPlaceholder")}
            onChange={onChange}
          />
          <ButtonTemp width="25" onClick={checkMail}>
            {t("sign.signUpContent.sendAuthMail")}
          </ButtonTemp>
        </div>
        <AlertBox isOpen={emailAlertOpen}>
          {t("sign.signUpContent.emailAlert")}
        </AlertBox>
      </section>
      <section className="auth-num">
        <header>{t("sign.signUpContent.emailAuthNum")}</header>
        <div className="flex-box">
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
        <AlertBox isOpen={authAlertOpen}>
          {t("sign.signUpContent.authAlert")}
        </AlertBox>
      </section>
      <section className="pw">
        <header>{t("sign.signUpContent.pw")}</header>
        <div className="flex-box">
          <SetInputBox
            type="password"
            width="100"
            id={"pw-input"}
            placeholder={t("sign.signUpContent.pwPlaceholder")}
            onChange={onChange}
            ref={pwRef}
          />
        </div>
        <AlertBox isOpen={validatePwAlertOpen}>
          {t("sign.signUpContent.alterPw")}
        </AlertBox>
      </section>
      <section className="validate-pw">
        <header>{t("sign.signUpContent.validate-pw")}</header>
        <div className="flex-box">
          <SetInputBox
            type="password"
            width="100"
            id={"pw-validate-input"}
            placeholder={t("sign.signUpContent.pwPlaceholder")}
            onChange={onChange}
            ref={pwValidateRef}
          />
        </div>
        <AlertBox isOpen={pwAlertOpen}>
          {t("sign.signUpContent.alertPWCheck")}
        </AlertBox>
      </section>

      <ContentBox isShow={id === "signUpContent"}>
        <section className="all-agree">
          <CheckBox
            key={"all-agree"}
            checked={checkTOU && checkPICACU}
            text={t("sign.signUpContent.allAgree")}
            clickEvent={() => {
              btnChange();
            }}
          />
        </section>

        <div className="line"></div>

        <section className="agree-TOU">
          <CheckBox
            key={"agree-TOU"}
            checked={checkTOU}
            text={t("sign.signUpContent.agreeOfTermsOfUse")}
            clickEvent={() => {
              setCheckTOU(!checkTOU);
            }}
          />
          <ArticleBox readOnly>{`${contentTOU(lang)}`}</ArticleBox>
        </section>

        <section className="agree-PICAUA">
          <CheckBox
            key={"agree-PICAUA"}
            checked={checkPICACU}
            text={t("sign.signUpContent.personalInfoCalUsageAgree")}
            clickEvent={() => {
              setCheckPICACU(!checkPICACU);
            }}
          />
          <ArticleBox readOnly>{`${contentPICACU(lang)}`}</ArticleBox>
        </section>
      </ContentBox>
      <ButtonBox>
        <button className="cancel" onClick={onCancel}>
          {t("alert.label.cancel")}
        </button>
        <button className="confirm" onClick={onConfirm}>
          {t("alert.label.confirm")}
        </button>
      </ButtonBox>
    </MainBox>
  );
};

export default EnrollAccount;

const MainBox = styled.div`
  width: 100%;
  height: 100%;
  font-family: SpoqaHanSansNeo;
  text-align: left;
  color: #fff;
  padding: 80px 164px 110px 180px;

  overflow-y: scroll;
  /* Hide scrollbar for Chrome, Safari and Opera */
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  .hello {
    font-family: SpoqaHanSansNeo;
    font-size: 18px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.11;
    letter-spacing: normal;
    text-align: left;
    color: #fff;
  }

  .logo {
    margin: 0 0 23px 0;
    object-fit: contain;
  }

  .email {
    margin-top: 36px;
  }

  .flex-box {
    margin-top: 7px;
    display: flex;
  }

  .pw,
  .all-agree,
  .auth-num,
  .validate-pw {
    margin-top: 20px;
  }

  .line {
    margin: 10px 0 1px 0;
    width: 100%;
    height: 1px;
    margin: 10px 0 0;
    background-color: #433f4e;
  }
`;

const ArticleBox = styled.textarea`
  width: 100%;
  height: 180px;
  margin: 10px 0 0;
  padding: 20px;
  border-radius: 30px;
  background-color: #2f2d38;

  font-family: SpoqaHanSansNeo;
  font-size: 11px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.27;
  letter-spacing: normal;
  text-align: left;
  color: #84818e;
  border: solid 0px #fff;

  overflow-y: scroll;
  /* Hide scrollbar for Chrome, Safari and Opera */
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

const AlertBox = styled.div`
  visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};
  margin: 5px 0px 0 20px;
  font-family: SpoqaHanSansNeo;
  font-size: 11px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 2.27;
  letter-spacing: normal;
  text-align: left;
  outline: none;
  color: #f04545;
`;

const ButtonTemp = styled.button`
  width: ${(props) => props.width}%;
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
  margin-left: 5px;
  :hover {
    opacity: 0.8;
  }
  ${(props) =>
    props.isActive &&
    css`
      background-color: #5942ba;
    `}
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 42px;
  margin-top: 50px;

  button {
    width: 49%;
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
    margin-left: 5px;
  }
  .cancel {
    background-color: #484655;
    margin-right: 5px;
  }
`;

const ContentBox = styled.div`
  display: ${(props) => (props.isShow ? "block" : "none")};
`;
