import React from "react";
/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled/macro";

function FAQ({ faq, index, toggleFAQ }) {
  return (
    <FAQWrapper
      className={"faq" + (faq.open ? "open" : "")}
      key={index}
      onClick={() => toggleFAQ(index)}
    >
      <InquiryQuestion className="faq-question">
        <DisplayContents>
          <div className="Order">{index + 1}</div>
          <div className="Status">답변예정</div>
          <div className="Contents">
            2월 15일 오전 9시부터 오전 10시까지 점검이 있을 예정입니다.
          </div>
          <div className="UpdateDate">2021.02.19</div>
        </DisplayContents>
        <ShowMore>
          <img src="Images/ico-board-read-arrow.png" alt="arrowIcon" />
        </ShowMore>
      </InquiryQuestion>
      <InquiryAnswer className="faq-answer" isActive={faq.open === true}>
        <QuestionBox>{faq.question}</QuestionBox>
        <AnswerBox>{faq.answer}</AnswerBox>
      </InquiryAnswer>
    </FAQWrapper>
  );
}

export default FAQ;

const FAQWrapper = styled.div``;

const InquiryQuestion = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 57px;
  border: solid 1px rgb(58, 55, 69);
  background-color: rgb(47, 45, 56);
  cursor: pointer;
`;
const DisplayContents = styled.div`
  display: flex;
  width: 95%;
  padding: 19px 22px;
  .Order {
    width: 12px;
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 13px;
    text-align: center;
    color: rgb(130, 127, 140);
  }
  .Status {
    margin: 0 15px 0 22px;
    width: 55px;
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 13px;
    text-align: center;
    color: rgb(240, 69, 69);
  }
  .Contents {
    width: 850px;
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 13px;
    letter-spacing: -0.65px;
    text-align: left;
    color: rgb(255, 255, 255);
  }
  .UpdateDate {
    width: 60px;
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 12px;
    text-align: center;
    color: rgb(130, 127, 140);
  }
`;

const ShowMore = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5%;
  height: 57px;
  border-left: 1px solid rgb(67, 63, 78);

  /* background-image: url("Images/ico-board-read-arrow.png");
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;

  transition: all 0.4s ease; */
`;

const InquiryAnswer = styled.div`
  opacity: 0;
  max-height: 0px;
  overflow-y: hidden;
  width: 100%;
  transition: all 0.4s ease;
  margin-top: 10px;

  border: solid 1px rgb(58, 55, 69);
  background-color: rgb(47, 45, 56);
  ${(props) =>
    props.isActive &&
    css`
      opacity: 1;
      max-height: 1000px;
      padding: 22px 22px;
      margin: 0 0 10px 0;
    `}
`;

const QuestionBox = styled.div`
  font-family: NotoSansKR, Apple SD Gothic Neo;
  font-size: 13px;
  letter-spacing: -0.65px;
  text-align: left;
  color: rgb(150, 146, 163);
  min-height: 103px;
`;

const AnswerBox = styled.div`
  margin-top: 22px;
  width: 100%;
  border-radius: 4px;
  background-color: rgb(37, 35, 45);
  font-family: NotoSansKR, Apple SD Gothic Neo;
  font-size: 13px;
  letter-spacing: -0.65px;
  text-align: left;
  color: rgb(150, 146, 163);
  min-height: 145px;
  padding: 19px 22px;
`;
