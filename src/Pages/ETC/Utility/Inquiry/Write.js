import React from "react";
/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled/macro";

function Write() {
  return (
    <WriteWrapper>
      <TitleBox>
        <div className="TitleNav">
          <p>제목</p>
        </div>
        <div className="TitleInput">
          <input type="text" className="InputTitle" />
        </div>
      </TitleBox>
      <ContentBox>
        <div className="ContentsNav">
          <p>내용</p>
        </div>
        <div className="ContentsInput">
          <textarea type="text" className="InputContents" />
        </div>
      </ContentBox>
      <UploadFiles>
        <div className="UploadNav">
          <p>내용</p>
        </div>
        <div className="UploadButton">
          <button>파일찾기</button>
        </div>
      </UploadFiles>
      <ButtonBox>
        <button className="Write">작성하기</button>
        <button className="Cancel">취소하기</button>
      </ButtonBox>
    </WriteWrapper>
  );
}

export default Write;

const WriteWrapper = styled.div`
  width: 100%;
`;

const TitleBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 78px;
  .TitleNav {
    display: flex;
    padding-left: 16px;
    align-items: center;
    border: solid 1px rgb(58, 55, 69);
    background-color: rgb(47, 45, 56);
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 13px;
    text-align: left;
    color: rgb(130, 127, 140);
    width: 10%;
    height: 100%;
  }
  .TitleInput {
    width: 90%;
    padding: 22px;
    border: solid 1px rgb(58, 55, 69);
    background-color: rgb(35, 33, 42);
  }
  .InputTitle {
    width: 100%;
    height: 34px;
    border: solid 1px rgb(67, 63, 78);
    background-color: rgb(47, 45, 56);
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 13px;
    text-align: left;
    color: rgb(130, 127, 140);
  }
`;

const ContentBox = styled.div`
  display: flex;
  height: 433px;
  .ContentsNav {
    display: flex;
    padding-left: 16px;
    align-items: center;
    border: solid 1px rgb(58, 55, 69);
    background-color: rgb(47, 45, 56);
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 13px;
    text-align: left;
    color: rgb(130, 127, 140);
    width: 10%;
    height: 100%;
  }
  .ContentsInput {
    width: 90%;
    padding: 22px;
    border: solid 1px rgb(58, 55, 69);
    background-color: rgb(35, 33, 42);
  }
  .InputContents {
    width: 100%;
    height: 100%;
    border: solid 1px rgb(67, 63, 78);
    background-color: rgb(47, 45, 56);
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 13px;
    text-align: left;
    color: rgb(130, 127, 140);
  }
`;

const UploadFiles = styled.div`
  display: flex;
  height: 78px;
  .UploadNav {
    display: flex;
    padding-left: 16px;
    align-items: center;
    border: solid 1px rgb(58, 55, 69);
    background-color: rgb(47, 45, 56);
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 13px;
    text-align: left;
    color: rgb(130, 127, 140);
    width: 10%;
    height: 100%;
  }
  .UploadButton {
    width: 90%;
    padding: 22px;
    border: solid 1px rgb(58, 55, 69);
    background-color: rgb(35, 33, 42);
    button {
      width: 92px;
      height: 34px;
      border-radius: 3px;
      border: solid 1px rgb(107, 105, 121);
      background-color: rgb(35, 33, 42);
      font-family: NotoSansKR, Apple SD Gothic Neo;
      font-size: 13px;
      letter-spacing: -0.65px;
      text-align: center;
      color: rgb(255, 255, 255);
    }
  }
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 24px;
  .Write {
    width: 101px;
    height: 36px;
    border-radius: 3px;
    background-color: rgb(240, 69, 69);
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: -0.65px;
    text-align: center;
    color: rgb(255, 255, 255);
    margin-right: 12px;
  }
  .Cancel {
    width: 101px;
    height: 36px;
    border-radius: 3px;
    background-color: rgb(107, 105, 121);
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: -0.65px;
    text-align: center;
    color: rgb(255, 255, 255);
  }
`;
