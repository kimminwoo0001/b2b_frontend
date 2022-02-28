import React, { useEffect, useState } from "react";
/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled/macro";
import SetCode from "./Component/SetCode";
import { useDispatch, useSelector } from "react-redux";
import { SetSelectedResult } from "../../redux/modules/modalvalue";
import EnrollAccount from "./Component/EnrollAccount";

const SignUp = () => {
  const dispatch = useDispatch();
  const { selectedResult } = useSelector((state) => state.ModalReducer);
  const [authCode, setAuthCode] = useState("");
  const signType = "EC";
  console.log("selectedResult", selectedResult);

  useEffect(() => {
    dispatch(SetSelectedResult(""));
  }, []);

  return (
    <>
      <SignUpWrapper>
        <img className="indexImg2" src="Images/index-login-img2.png" alt="" />
        <SignUpBox>
          {selectedResult === "signUp" ? (
            <EnrollAccount
              id={"signUpContent"}
              authCode={authCode}
              signType={signType}
            />
          ) : (
            <SetCode
              id={"setCode"}
              authCode={authCode}
              setAuthCode={setAuthCode}
              signType={signType}
            />
          )}
        </SignUpBox>
      </SignUpWrapper>
    </>
  );
};

export default SignUp;

const SignUpWrapper = styled.div`
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

const SignUpBox = styled.div`
  width: 50%;
  height: 100%;
`;
