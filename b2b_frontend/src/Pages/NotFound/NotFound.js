import React from "react";
import styled from "styled-components";

// import SideBar from "../../Components/SideBar/SideBar";

function NotFound() {
  //404 페이지
  return (
    <NotFoundWrapper>
      {/* <SideBar /> */}
      <BackGroundImage>
        <div className="ErrorNumber">404</div>
        <div className="PageNotFound">페이지를 찾을 수 없습니다.</div>
        <div className="PageAlert">
          요청하신 페이지가 사라졌거나, 잘못된 경로로 이용된 페이지입니다.
          <br />
          궁금한 점이 있으시면 1:1문의 페이지를 통해 문의해 주시기 바랍니다.
        </div>
        <ButtonContainer>
          <button className="Back">뒤로가기</button>
          <button className="ToMain">메인으로</button>
        </ButtonContainer>
      </BackGroundImage>
    </NotFoundWrapper>
  );
}

export default NotFound;

const NotFoundWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
  display: flex;
  background-color: rgb(35, 33, 42);
`;

const BackGroundImage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  object-fit: contain;
  background-image: url("Images/img-error.png");
  background-repeat: no-repeat;
  .ErrorNumber {
    font-family: Poppins;
    font-size: 100px;
    font-weight: bold;

    text-align: center;
    color: rgb(240, 69, 69);
  }
  .PageNotFound {
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 16px;
    font-weight: 500;

    letter-spacing: -0.8px;
    text-align: center;
    color: rgb(255, 255, 255);
  }
  .PageAlert {
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 13px;
    line-height: 1.54;
    letter-spacing: -0.65px;
    text-align: center;
    color: rgb(132, 129, 142);
    margin: 21px 0 34px 0;
  }
`;

const ButtonContainer = styled.div`
  .Back {
    width: 109px;
    height: 34px;
    border-radius: 4px;
    background-color: rgb(58, 55, 69);
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: -0.65px;
    text-align: center;
    color: rgb(255, 255, 255);
    margin-right: 14px;
  }
  .ToMain {
    width: 109px;
    height: 34px;
    border-radius: 4px;
    background-color: rgb(240, 69, 69);
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: -0.65px;
    text-align: center;
    color: rgb(255, 255, 255);
  }
`;
