import React, { useState } from "react";
import styled from "styled-components";
import Modal from "react-modal";

const customStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.75)"
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    background: "rgba(0, 0, 0, 0.75)",
    border: "1px solid rgba(0, 0, 0, 0.75)",
    overflow: "auto",
    WebkitOverflowScrolling: "touch",
    borderRadius: "4px",
    outline: "none",
    padding: "0px"
  }
};

function AlertCheck() {
  const [isOpen, setIsOpen] = useState(false);

  const mockAlert = [
    "2021.02.12",
    "2021.02.13",
    "2021.02.15",
    "2021.02.16",
    "2021.02.19"
  ];
  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <ModalWrapper>
          <ModalNav>
            <div className="ModalTitle">
              2월 15일 오전 9시부터 오전 10시까지 점검이 있을 예정입니다.
            </div>
            <div className="ModalDate">2021.02.19</div>
          </ModalNav>
          <ModalDetail>
            안녕하세요, 팀스노우볼입니다. 2월 15일 오전 9시부터 오전 10시까지
            긴급 점검이 있을 예정입니다. 점검 시간에는 부득이하게 사이트 사용이
            불가한 점 양해 부탁드립니다. 버그 수정 - 개인 보고서의 선수 이름
            매칭이 안되는 부분 업데이트 - 선수단 콜업, 샌드다운 업데이트 - 팀
            보고서 기능 추가
          </ModalDetail>
          <ModalClose>
            <button onClick={() => setIsOpen(false)}>창닫기</button>
          </ModalClose>
        </ModalWrapper>
      </Modal>
      <AlertCheckWrapper>
        {mockAlert.map((Alert, idx) => {
          return (
            <AlertComponent key={idx} onClick={() => setIsOpen(true)}>
              <DisplayBox>
                <img src="Images/ico-read.png" alt="AlertIcon" />
                <div className="AlertContent">
                  2월 15일 오전 9시부터 오전 10시까지 점검이 있을 예정입니다.
                </div>
                <div className="AlertDate">{Alert}</div>
              </DisplayBox>
              <ShowDetails>자세히보기</ShowDetails>
            </AlertComponent>
          );
        })}
      </AlertCheckWrapper>
    </>
  );
}

export default AlertCheck;

const AlertCheckWrapper = styled.div`
  margin-top: 26.5px;
`;

const AlertComponent = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 57px;
  border: solid 1px rgb(58, 55, 69);
  background-color: rgb(47, 45, 56);
  margin-bottom: 10px;
  cursor: pointer;
  img {
    margin: 0 4px 0 9px;
  }
  .AlertContent {
    width: auto;
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 13px;
    letter-spacing: -0.65px;
    text-align: left;
    color: rgb(255, 255, 255);
  }
  .AlertDate {
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 12px;
    text-align: left;
    color: rgb(130, 127, 140);
    margin-left: 16px;
  }
`;

const DisplayBox = styled.div`
  display: flex;
  align-items: center;
  width: 90%;
`;

const ShowDetails = styled.div`
  display: flex;
  width: 10%;
  align-items: center;
  justify-content: center;
  height: 57px;
  font-family: NotoSansKR, Apple SD Gothic Neo;
  font-size: 12px;
  color: rgb(130, 127, 140);
  border-left: 1px solid rgb(67, 63, 78); ;
`;

const ModalWrapper = styled.div`
  width: 408px;
  height: 384px;
  border: solid 1px rgb(58, 55, 69);
  background-color: rgb(47, 45, 56);
`;

const ModalNav = styled.div`
  border-bottom: 1px solid rgb(67, 63, 78);
  padding: 15px 16px;
  height: 70px;
  .ModalTitle {
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 13px;
    letter-spacing: -0.65px;
    text-align: left;
    color: rgb(255, 255, 255);
    margin-bottom: 6px;
  }
  .ModalDate {
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 12px;
    text-align: left;
    color: rgb(130, 127, 140);
  }
`;

const ModalDetail = styled.div`
  height: 233px;
  padding: 15px;
  border-bottom: 1px solid rgb(67, 63, 78);
  font-family: NotoSansKR, Apple SD Gothic Neo;
  font-size: 13px;
  letter-spacing: -0.65px;
  text-align: left;
  color: rgb(107, 105, 121);
`;

const ModalClose = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 79px;
  button {
    width: 122px;
    height: 36px;
    border-radius: 3px;
    background-color: rgb(240, 69, 69);
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: -0.65px;
    color: rgb(255, 255, 255);
  }
`;
