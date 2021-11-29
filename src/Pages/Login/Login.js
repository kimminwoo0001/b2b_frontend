import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { signIn } from "./signIn";
import { UserID, UserToken, UserIP, UserDevice, UserChargeTime } from "../../redux/modules/user";
import { useHistory } from "react-router-dom";
import { Language } from "../../redux/modules/locale";
import AlertModal from "../../Components/UtilityComponent/AlertModal";
import { useTranslation } from "react-i18next";
import axiosRequest from "../../lib/axiosRequest";
import { API } from "../config";

function CheckEmail(str) {
  let reg_email = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
  if (!reg_email.test(str)) {
    return false;
  }
  else {
    return true;
  }
}

function Login() {
  const [isOpen, setIsOpen] = useState(false);
  const [alertDesc, setAlertDesc] = useState("");
  const { handleSubmit, register } = useForm();
  const dispatch = useDispatch();
  let history = useHistory();
  const { t } = useTranslation();

  useEffect(() => {
    if (navigator.language.includes("ko")) {
      sessionStorage.setItem("i18nextLng", "ko");
    } else {
      sessionStorage.setItem("i18nextLng", "en");
    }
  }, [])

  const onSubmit = async ({ id, password }) => {
    try {
      if (CheckEmail(id)) {
        const user = `ids=${id}&password=${password}`;
        const url = `${API}/lolapi/logins`;

        axiosRequest(url, user, function (data) {
          const token = data;
          if (token !== "fail") {
            //sessionStorage.setItem("token", token.token);
            sessionStorage.setItem("i18nextLng", token.lang);
            //sessionStorage.setItem("id", id);
            dispatch(Language(token.lang));
            dispatch(UserID(id));
            dispatch(UserToken(token.token));
            dispatch(UserChargeTime(token.charge_time))
            getUserIP();
            getUserDevice();
            history.push("/");
          }
        }, "POST");
      } else {
        setAlertDesc(t("alert.desc.email_check"));
        setIsOpen(true);
      }
    } catch (e) {
      setAlertDesc(t("alert.desc.login_fail"));
      setIsOpen(true);
    }
  };

  const getUserIP = async () => {
    const res = await axios.get('https://geolocation-db.com/json/')
    dispatch(UserIP(res.data.IPv4));
  }

  const getUserDevice = () => {
    dispatch(UserDevice(navigator.userAgent));
  }


  return (
    <>
      <AlertModal
        desc={alertDesc}
        isOpen={isOpen} setIsOpen={setIsOpen}
      />
      <LoginWrapper>
        <LoginContainer>
          <div className="IndexImage"></div>
          <ViewContainer onSubmit={handleSubmit(onSubmit)}>
            <div className="LoginTitle">TSB ANALYTICS</div>
            <input
              type="text"
              className="id"
              id="id"
              placeholder="ID"
              name="id"
              autoComplete="off"
              {...register("id", {
                required: "Required"
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
                required: "Required"
              })}
            />
            <button type="submit" className="LoginBtn">
              LOGIN
            </button>
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
  border-radius: 3px;
  border: solid 1px rgb(58, 55, 69);
  background-color: rgb(47, 45, 56);
  .IndexImage {
    background-image: url("Images/index-login-img.png");
    background-repeat: no-repeat;
    width: 436px;
    height: 380px;
    mix-blend-mode: luminosity;
  }
`;

const CopyRight = styled.div`
  font-family: Poppins;
  font-size: 12px;
  font-weight: 300;
  text-align: center;
  color: rgb(255, 255, 255);
  opacity: 0.2;
  margin-top: 25px;
`;

const ViewContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 374px;
  .LoginTitle {
    font-family: Poppins;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    color: rgb(255, 255, 255);
    margin-bottom: 9.7px;
  }
  .id {
    width: 224px;
    height: 36px;
    border-radius: 3px;
    background-color: rgb(58, 55, 69);
    font-family: Poppins;
    font-size: 13px;
    text-align: left;
    color: rgb(132, 129, 142);
    padding: 10px;
  }
  .password {
    width: 224px;
    height: 36px;
    border-radius: 3px;
    background-color: rgb(58, 55, 69);
    margin: 15px 0 15px 0;
    font-family: Poppins;
    font-size: 13px;
    text-align: left;
    color: rgb(132, 129, 142);
    padding: 10px;
  }
  .LoginBtn {
    width: 224px;
    height: 36px;
    border-radius: 3px;
    background-color: rgb(240, 69, 69);
    font-family: Poppins;
    font-size: 13px;
    font-weight: bold;
    text-align: center;
    color: rgb(255, 255, 255);
    margin-bottom: 28px;
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
