import React from "react";
import styled from "styled-components";
import SideBar from "../../Components/SideBar/SideBar";
import Nav from "../../Components/Nav/Nav";
import UtilityTab from "./UtilityTab";
import ErrorBoundary from "../../Components/ErrorBoundary";

function Utility() {
  return (
    <ErrorBoundary>
      <Nav />
      <UtilityWrapper>
        <SideBar />
        <ContentWrapper>
          <UtilityTab />
        </ContentWrapper>
      </UtilityWrapper>
    </ErrorBoundary>

  );
}

export default Utility;

const UtilityWrapper = styled.div`
  width: 100%;
  height: 100vh;
  overflow: auto;
  display: flex;
  background-color: #23212a;
`;

const ContentWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;
