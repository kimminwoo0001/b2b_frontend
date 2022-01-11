import React, { useEffect } from "react";
import styled from "styled-components";
import SetCode from "./Component/SetCode";
import { useDispatch, useSelector } from "react-redux";
import { SetSelectedResult } from "../../redux/modules/modalvalue";
import EnrollAccount from "./Component/EnrollAccount";

const SignUp = () => {
  const dispatch = useDispatch();
  const { selectedResult } = useSelector((state) => state.ModalReducer);

  useEffect(() => {
    dispatch(SetSelectedResult(false));
  }, []);

  return (
    <>
      <SignUpWrapper>
        <img className="indexImg2" src="Images/index-login-img2.png" alt="" />
        <SignUpBox>
          {selectedResult ? (
            <EnrollAccount id={"signUpContent"} />
          ) : (
            <SetCode id={"setCode"} />
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
