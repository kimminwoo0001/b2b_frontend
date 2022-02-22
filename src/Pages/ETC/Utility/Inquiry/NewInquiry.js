import React from "react";
/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled/macro";

function NewInquiry({ setCurrentIndex }) {
  return (
    <NewInquiryWrapper>
      <div className="NoInquiries">작성 된 글이 없습니다.</div>
      <div className="HowtoUse">
        사용법이 궁금하거나, 문의가 있으시다면 글을 작성해주세요.
      </div>
      <button className="FirstInquiry" onClick={() => setCurrentIndex(1)}>
        1:1문의하기
      </button>
    </NewInquiryWrapper>
  );
}

export default NewInquiry;

const NewInquiryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  height: 100vh;
  width: 100%;

  .NoInquiries {
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 16px;
    font-weight: bold;
    letter-spacing: -0.8px;
    color: rgb(255, 255, 255);
    margin-top: 208.5px;
  }
  .HowtoUse {
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 13px;
    letter-spacing: -0.65px;
    color: rgb(126, 123, 136);
    margin: 5px 0 27px 0;
  }
  .FirstInquiry {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 122px;
    height: 36px;
    border-radius: 3px;
    background-color: rgb(240, 69, 69);
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: -0.65px;
    text-align: left;
    color: rgb(255, 255, 255);
  }
`;
