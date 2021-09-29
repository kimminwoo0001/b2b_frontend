import React from "react";
import styled from "styled-components";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { signIn } from "./signIn";
import { UserID, UserToken, UserIP, UserDevice } from "../../redux/modules/user";
import { useHistory } from "react-router-dom";
import { Language } from "../../redux/modules/locale";

// import LocaleDropdown from "./LocaleDropdown";

function Login() {
  const { handleSubmit, register } = useForm();
  const dispatch = useDispatch();
  let history = useHistory();

  const onSubmit = async ({ id, password }) => {
    try {
      const token = await signIn({ id, password });
      // submit버튼 눌러서 로그인 성공시 token, locale, id 값을 세션스토리지랑 store에 이중으로 저장함
      if (token !== "fail") {
        sessionStorage.setItem("token", token.token);
        sessionStorage.setItem("i18nextLng", token.language);
        sessionStorage.setItem("id", id);
        dispatch(Language(token.language));
        dispatch(UserID(id));
        dispatch(UserToken(token.token));
        getUserIP();
        dispatch(UserDevice());
        history.push("/");
      }
    } catch (e) {
      alert("Login Fail\nWrong ID(password) or Time limit is exceeded");
    }
  };

  const getUserIP = async () => {
    const res = await axios.get('https://geolocation-db.com/json/')
    dispatch(UserIP(res.data.IPv4));
  }



  return (
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
          {/* <LocaleDropdown /> */}
        </ViewContainer>
      </LoginContainer>
      <CopyRight>Copyright Team Snowball All Rights Reserved.</CopyRight>
    </LoginWrapper>
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
