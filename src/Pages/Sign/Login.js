/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import axios from "axios";
import { useDispatch, useSelector, batch } from "react-redux";
import { useForm } from "react-hook-form";
import {
  UserID,
  UserToken,
  UserIP,
  UserDevice,
  UserChargeTime,
  SET_IS_NEED_CHK_LOGIN,
  SetIsNeedChkLogin,
  UserName,
  UserTeamName,
} from "../../redux/modules/user";
import { useHistory } from "react-router-dom";
import { Language } from "../../redux/modules/locale";
import AlertModal from "../../Components/UtilityComponent/AlertModal";
import { useTranslation } from "react-i18next";
import axiosRequest from "../../lib/axiosRequest";
import { API } from "../config";
import checkEmail from "../../lib/checkEmail";
import {
  SetModalInfo,
  SetDesc,
  SetIsOpen,
  SetIsSelector,
  SetConfirmFuncId,
} from "../../redux/modules/modalvalue";
import signAxiosReq from "../../lib/signAxiosReq";
import LoadingImg from "../../Components/LoadingImg/LoadingImg";
import { Loading } from "../../redux/modules/filtervalue";
import getCookie from "../../lib/getCookie";
import buttonStyle from "../../Styles/ui/button_style";
import Button from "../../Components/Ui/Button";

function Login() {
  const filters = useSelector((state) => state.FilterReducer);
  const user = useSelector((state) => state.UserReducer);
  const { selectedResult } = useSelector((state) => state.ModalReducer);
  const [isOpen, setIsOpen] = useState(false);
  //const [alertDesc, setAlertDesc] = useState("");
  const { handleSubmit, register } = useForm();
  const dispatch = useDispatch();
  const [info, setInfo] = useState({ id: "", password: "" });
  let history = useHistory();
  const { t } = useTranslation();

  console.log(user)

  useEffect(() => {
    if (navigator.language.includes("ko")) {
      sessionStorage.setItem("i18nextLng", "ko");
    } else {
      sessionStorage.setItem("i18nextLng", "en");
    }
    document.title = `NUNU.GG`;

    if (filters.loading) {
      dispatch(Loading(false));
    }



    const cookieToken = getCookie("user-token");



    if (cookieToken && cookieToken !== "undefined") {
      batch(() => {
        dispatch(Language(sessionStorage.getItem("i18nextLng")));
        dispatch(UserID(getCookie("user-id")));
        dispatch(UserTeamName(getCookie("user-teamName")));
        dispatch(UserToken(getCookie("user-token")));
        dispatch(UserChargeTime(getCookie("user-charge_time")));
        dispatch(UserName(getCookie("user-name")));
        history.push("/");
      })
    }


  }, []);

  useEffect(() => {
    if (user.token && user.token.length > 0) {
      history.push("/");
    }
  }, [user.token])

  useEffect(() => {
    if (selectedResult === "tryLoginAgain" && info.id !== "") {
      onSubmit(info);
    }
  }, [selectedResult]);

  const onSubmit = async ({ id, password }) => {
    try {
      dispatch(Loading(true));
      if (checkEmail(id)) {
        const user = `ids=${id}&password=${password}&type=N`;
        const url = `${API}/lolapi/logins`;
        setInfo({ id: "", password: "" });

        axiosRequest(
          "POST",
          url,
          user,
          function (data) {
            const token = data;
            if (token !== "fail") {
              //sessionStorage.setItem("token", token.token);
              sessionStorage.setItem("i18nextLng", token.lang);
              //sessionStorage.setItem("id", id);
              console.log("token:", token);
              batch(() => {
                dispatch(Language(token.lang));
                dispatch(UserID(id));
                dispatch(UserTeamName(token.teamName));
                dispatch(UserToken(token.token));
                dispatch(UserChargeTime(token.charge_time));
                dispatch(UserName(token.name));
                history.push("/");
              });
            }
            dispatch(Loading(false));
          },
          function (objStore) {
            console.log("objStore:", objStore);
            const msg = objStore.message?.toUpperCase(); // IC: 로그인 환경 변경, TA: 재로그인 요청, TO: 사용기간 지남

            if (msg === "IC") {
              dispatch(SetIsNeedChkLogin(true));
              const url = `${API}/lolapi/authemailcord`;
              const param = `email=${id}&type=${objStore.message}&key=${""}`;
              signAxiosReq(
                url,
                param,
                function (success) {
                  dispatch(UserID(id));
                  history.push("/checkLogin");
                  dispatch(Loading(false));
                },
                function (data) {
                  dispatch(SetIsSelector(false));
                  dispatch(SetIsOpen(true));
                  dispatch(SetDesc(t("sign.login.fail")));
                  dispatch(Loading(false));
                }
              );
            } else if (msg === "TA") {
              dispatch(SetDesc(t("alert.desc.tryLoginAgain")));
              dispatch(SetIsOpen(true));
              dispatch(Loading(false));
              setInfo({ id, password });
              dispatch(SetConfirmFuncId("tryLoginAgain"));
            } else if (msg === "MK") {
              dispatch(SetDesc(t("alert.desc.MasterKey")));
              dispatch(SetIsOpen(true));
              dispatch(Loading(false));
            } else if (msg === "TO") {
              dispatch(SetDesc(t("alert.desc.loginTimeOver")));
              dispatch(SetIsOpen(true));
              dispatch(Loading(false));
            } else {
              dispatch(SetModalInfo(objStore)); // 오류 발생 시, Alert 창을 띄우기 위해 사용
              dispatch(Loading(false));
            }
          },
          5000
        ); // 서버 응답 없을 경우 timeout 설정 (5s)
      } else {
        // setAlertDesc(t("alert.desc.email_check"));
        dispatch(SetDesc(t("alert.desc.email_check")));
        dispatch(SetIsOpen(true));
        dispatch(Loading(false));
      }
    } catch (e) {
      // setAlertDesc(t("alert.desc.login_fail"));
      dispatch(SetDesc(t("alert.desc.login_fail")));
      dispatch(SetIsOpen(true));
      dispatch(Loading(false));
    }
  };

  // const getUserIP = async () => {
  //   const res = await axios.get("https://geolocation-db.com/json/");
  //   dispatch(UserIP(res.data.IPv4));
  // };

  // const getUserDevice = () => {
  //   dispatch(UserDevice(navigator.userAgent));
  // };

  return (
    <>
      {/* <AlertModal desc={alertDesc} isOpen={isOpen} setIsOpen={setIsOpen} /> */}
      <LoginWrapper>
        <LoginContainer>
          <SLoginImg />
          <ViewContainer onSubmit={handleSubmit(onSubmit)}>
            <div className="LoginTitle">
              <img className="logo" src="Images/logo2.png" alt="" />
            </div>
            <input
              type="text"
              className="id"
              id="id"
              placeholder="ID"
              name="id"
              autoComplete="off"
              {...register("id", {
                required: "Required",
              })}
            />
            <input
              type="password"
              className="password"
              id="password"
              name="password"
              autoComplete="off"
              placeholder="PASSWORD"
              {...register("password", {
                required: "Required",
              })}
            />
            <Button
              type="submit"
              className="LoginBtn"
              css={buttonStyle.color.main}
            >
              LOGIN
            </Button>
            <AlertLogin isOpen={isOpen}>
              {t("alert.login.wrongSignIn")}
            </AlertLogin>
            <SettingFlexBox>
              <div className="left">
                <span
                  onClick={() => {
                    history.push("/signUp");
                  }}
                >
                  {t("sign.signUp")}
                </span>
              </div>
              <div className="center">
                <span>|</span>
              </div>
              <div className="right">
                <span
                  onClick={() => {
                    history.push("/changePw");
                  }}
                >
                  {t("sign.changePW")}
                </span>
              </div>
            </SettingFlexBox>
          </ViewContainer>
        </LoginContainer>
        <CopyRight>Copyright Team Snowball All Rights Reserved.</CopyRight>
      </LoginWrapper>
    </>
  );
}

export default Login;

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(35, 33, 42);
`;

const LoginContainer = styled.div`
  display: flex;
  width: 810px;
  height: 380px;
  border-radius: 20px;
  border: solid 1px rgb(58, 55, 69);
  background-color: rgb(47, 45, 56);
`;

const SLoginImg = styled.div`
  background-image: url("Images/index-login-img.png");
  background-repeat: no-repeat;
  width: 436px;
  height: 100%;
  border-radius: 20px 0 0 20px;
  mix-blend-mode: luminosity;
`;

const CopyRight = styled.p`
  font-family: Poppins;
  font-size: 13px;
  font-weight: 300;
  text-align: center;

  opacity: 0.2;
  margin-top: 25px;
`;

const ViewContainer = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 90px;
  align-items: center;
  width: 374px;

  .LoginTitle {
    font-family: Poppins;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    color: rgb(255, 255, 255);
    margin-bottom: 12px;

    .logo {
      width: 122px;
      height: 20px;
    }
  }
  .id {
    width: 224px;
    height: 36px;
    border-radius: 20px;
    background-color: #3a3745;
    font-family: Poppins;
    font-size: 13px;
    text-align: left;
    color: rgb(132, 129, 142);
    padding: 10px;
  }
  .password {
    width: 224px;
    height: 36px;
    border-radius: 20px;
    background-color: #3a3745;
    margin: 14px 0 14px 0;
    font-family: Poppins;
    font-size: 13px;
    text-align: left;
    color: rgb(132, 129, 142);
    padding: 10px;
  }
  .LoginBtn {
    width: 224px;
    height: 36px;
    margin-bottom: 5px;
  }
  .Region {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 224px;
    height: 33px;
    border-radius: 3px;
    border: solid 1px rgb(58, 55, 69);
    font-family: Poppins;
    font-size: 13px;
    text-align: left;
    color: rgb(132, 129, 142);
    cursor: pointer;
    div {
      width: 150px;
      margin-left: 7px;
    }
  }
`;

const AlertLogin = styled.div`
  visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};
  width: 100%;
  height: 14px;
  font-family: SpoqaHanSansNeo;
  font-size: 11px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.27;
  letter-spacing: normal;
  text-align: center;
  color: #f04545;
`;

const SettingFlexBox = styled.div`
  width: 100%;
  height: 17px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: SpoqaHanSansNeo;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.08;
  letter-spacing: normal;
  text-align: center;
  color: #fff;
  margin-top: 32px;

  .left {
    text-align: right;
    width: 33%;
    span {
      cursor: pointer;
    }
  }

  .center {
    text-align: center;
    width: 15%;
  }

  .right {
    text-align: left;
    width: 33%;
    span {
      cursor: pointer;
    }
  }
`;
