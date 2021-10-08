import React from "react";
import styled from "styled-components";

//import Nav from "../../Components/Nav/Nav";
import SideBar from "../../Components/SideBar/SideBar";
import HomeContents from "./HomeContents";
import ErrorBoundary from "../../Components/ErrorBoundary";
function Home() {
  // 홈 화면 컨테이너
  return (
    <ErrorBoundary>
      <HomeWrapper>
        <SideBar />
        <ContentWrapper>
          {/*<Nav />*/}

          <HomeContents />
        </ContentWrapper>
      </HomeWrapper>
    </ErrorBoundary>
  );
}

export default Home;

const HomeWrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  overflow: auto;
  display: flex;
  background-color: #23212A;
};
`;

const ContentWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  /* overflow-y: auto; */
`;
