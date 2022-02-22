import React, { useEffect, useState } from "react";
/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled/macro";
import { useTranslation } from "react-i18next";
import SetCode from "./Component/SetCode";
import { useDispatch, useSelector } from "react-redux";
import { SetSelectedResult } from "../../redux/modules/modalvalue";
import EnrollAccount from "./Component/EnrollAccount";

const ChangePW = () => {
  const dispatch = useDispatch();
  const { selectedResult } = useSelector((state) => state.ModalReducer);
  const { t } = useTranslation();
  const [authCode, setAuthCode] = useState("");
  const signType = "PC";

  useEffect(() => {
    dispatch(SetSelectedResult(""));
  }, []);

  return (
    <>
      <Wrapper>
        <img className="indexImg2" src="Images/index-login-img2.png" alt="" />
        <ContentBox>
          {selectedResult === "changePw" ? (
            <EnrollAccount
              id={"changePwContent"}
              authCode={authCode}
              signType={signType}
            />
          ) : (
            <SetCode
              id={"changePw"}
              authCode={authCode}
              setAuthCode={setAuthCode}
              signType={signType}
            />
          )}
        </ContentBox>
      </Wrapper>
    </>
  );
};

export default ChangePW;

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
