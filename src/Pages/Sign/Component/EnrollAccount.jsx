import React, { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SetInputBox from "./SetInputBox";
import CheckBox from "../../../Components/UtilityComponent/CheckBox";
import { useDispatch, useSelector } from "react-redux";
import contentTOU from "../../../lib/content/contentTOU";
import contentPICACU from "../../../lib/content/contentPICAUA";
import checkEmail from "../../../lib/checkEmail";
import { number } from "prop-types";

const EnrollAccount = ({ id }) => {
  const [emailText, setEmailText] = useState("");
  const [pwText, setPwText] = useState("");
  const [pwValidateText, setPwValidateText] = useState("");

  const [authAlterOpen, setAuthAlterOpen] = useState(false);
  const [emailAlterOpen, setEmailAlterOpen] = useState(false);
  const [pwAlterOpen, setPwAlterOpen] = useState(false);
  const [validatePwAlterOpen, setValidatePwAlterOpen] = useState(false);
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
          console.log(pwValidateText.length > 0 && pwValidateText.length > 0);
          setPwAlterOpen(!(value === pwValidateText));
        }
        if (value.length < 8 || value.length > 16) {
          setValidatePwAlterOpen(true);
        } else {
          setValidatePwAlterOpen(false);
        }
        break;
      case "pw-validate-input":
        setPwValidateText(value);
        if (pwText.length > 0 && pwValidateText.length > 0) {
          setPwAlterOpen(!(value === pwText));
        }
        break;
      case "email-input":
        console.log("checkEmail(value)", checkEmail(value));
        setEmailText(value);
        setEmailAlterOpen(!checkEmail(value));
        break;
      default:
        break;
    }

    console.log(value);
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
          <ButtonTemp width="25">
            {t("sign.signUpContent.sendAuthMail")}
          </ButtonTemp>
        </div>
        <AlterBox isOpen={emailAlterOpen}>
          {t("sign.signUpContent.emailAlter")}
        </AlterBox>
      </section>
      <section className="auth-num">
        <header>{t("sign.signUpContent.emailAuthNum")}</header>
        <div className="flex-box">
          <SetInputBox
            width="55"
            type="text"
            id={"email-input"}
            placeholder={t("sign.signUpContent.authPlaceholder")}
          />
          <ButtonTemp width="20">
            {t("sign.signUpContent.reRequest")}
          </ButtonTemp>
          <ButtonTemp
            width="25"
            onClick={() => {
              setAuthAlterOpen(true);
            }}
          >
            {t("sign.signUpContent.sendAuthConfirm")}
          </ButtonTemp>
        </div>
        <AlterBox isOpen={authAlterOpen}>
          {t("sign.signUpContent.authAlert")}
        </AlterBox>
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
        <AlterBox isOpen={validatePwAlterOpen}>
          {t("sign.signUpContent.alterPw")}
        </AlterBox>
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
        <AlterBox isOpen={pwAlterOpen}>
          {t("sign.signUpContent.alertPWCheck")}
        </AlterBox>
      </section>

      <ContentBox isShow={id === "signUpContent"}>
        <section className="all-agree">
          <CheckBox
            key={"all-agree"}
            checked={true}
            text={t("sign.signUpContent.allAgree")}
          />
        </section>

        <div className="line"></div>

        <section className="agree-TOU">
          <CheckBox
            key={"agree-TOU"}
            checked={true}
            text={t("sign.signUpContent.agreeOfTermsOfUse")}
          />
          <ArticleBox readOnly>{`${contentTOU(lang)}`}</ArticleBox>
        </section>

        <section className="agree-PICAUA">
          <CheckBox
            key={"agree-PICAUA"}
            checked={true}
            text={t("sign.signUpContent.personalInfoCalUsageAgree")}
          />
          <ArticleBox readOnly>{`${contentPICACU(lang)}`}</ArticleBox>
        </section>
      </ContentBox>
      <ButtonBox>
        <button
          className="cancel"
          onClick={() => {
            history.push("/login");
          }}
        >
          {t("alert.label.cancel")}
        </button>
        <button
          className="confirm"
          onClick={() => {
            history.push("/login");
          }}
        >
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

const AlterBox = styled.div`
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
