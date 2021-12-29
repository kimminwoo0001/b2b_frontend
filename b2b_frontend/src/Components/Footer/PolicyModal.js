import React, { Fragment } from "react";
import styled from "styled-components";

function PolicyModal({ openModal, setOpenModal }) {
  return (
    <Fragment>
      {/* 모달창 띄웠을 때 뒤에 검정색 화면 */}
      <BackScreen
        openModal={openModal}
        onClick={() => setOpenModal(false)}
      ></BackScreen>
      <Wrapper openModal={openModal}>
        <ModalNav>
          <label>Privacy Policy</label>
          <img
            src="Images/btn-popup-close.png"
            alt="closeBtn"
            onClick={() => setOpenModal(false)}
          />
        </ModalNav>
        <ModalContents></ModalContents>
      </Wrapper>
    </Fragment>
  );
}

export default PolicyModal;

const BackScreen = styled.div`
  display: ${(props) => (props.openModal ? "block" : "none")};
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  position: fixed;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.8);
  opacity: 1;
`;

const Wrapper = styled.div`
  display: ${(props) => (props.openModal ? "block" : "none")};
  width: 700px;
  height: 600px;
  overflow-y: auto;
  border: solid 1px #3a3745;
  background-color: #2f2d38;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  opacity: 1;
  position: fixed;
  z-index: 3;
  &::-webkit-scrollbar {
    width: 5px;
    height: 10px;

    border-radius: 3px;
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #696777;
    border-radius: 3px;
  }
`;

const ModalNav = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  padding: 0 15px;
  label {
    width: auto;
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 20px;
    font-weight: bold;
    color: white;
  }
  img {
    width: 24px;
    height: 24px;

    cursor: pointer;
  }
`;

const ModalContents = styled.div`
  padding: 0 19px;
  > p {
    font-family: Poppins;
    font-size: 12px;
    line-height: 16px;
    text-align: left;
    color: rgb(107, 105, 121);
  }
  > span {
    font-size: 16px;
    line-height: 16px;
    text-align: left;
    font-family: Poppins;
    color: rgb(107, 105, 121);
  }
  > ul {
    font-size: 13px;
    line-height: 16px;
    text-align: left;
    font-family: Poppins;
    color: rgb(107, 105, 121);
    padding: 0 19px;
    list-style: circle;
  }
`;
