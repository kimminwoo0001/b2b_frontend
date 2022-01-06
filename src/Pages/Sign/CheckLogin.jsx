import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { useTranslation } from "react-i18next";
import SetInputBox from "./Component/SetInputBox";
import { useDispatch, useSelector } from "react-redux";
import {
  ModalInit,
  SetConfirmFuncId,
  SetDesc,
  SetIsOpen,
  SetIsSelector,
  SetSelectedResult,
  SetSemiDesc,
} from "../../redux/modules/modalvalue";
import { useHistory } from "react-router-dom";

const CheckLogin = ({ id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [authAlterOpen, setAuthAlterOpen] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  let history = useHistory();

  const { selectedResult } = useSelector((state) => state.ModalReducer);

  useEffect(() => {
    dispatch(SetSelectedResult(false));
  }, []);

  useEffect(() => {
    if (selectedResult) {
      history.push("/");
      dispatch(ModalInit());
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
                  //----------------------
                  dispatch(SetIsSelector(true));
                  dispatch(SetIsOpen(true));
                  dispatch(SetDesc(t("sign.checkLogin.success")));
                  dispatch(SetConfirmFuncId("checkLogin"));
                }}
              >
                {t("sign.signUpContent.sendAuthConfirm")}
              </ButtonTemp>
            </div>
            <AlertSetCode isOpen={authAlterOpen}>
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
