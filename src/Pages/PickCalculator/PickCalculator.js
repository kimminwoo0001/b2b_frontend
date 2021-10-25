import React from "react";
import styled from "styled-components";
import ErrorBoundary from "../../Components/ErrorBoundary";
import Nav from "../../Components/Nav/Nav";
import SideBar from "../../Components/SideBar/SideBar";
import Filter from "../League/Components/Filter";
import PickCombine from "./PickCombine";

function PickCalculator() {
  return (
    <ErrorBoundary>
      <Nav />
      <PickCalculatorWrapper>
        <SideBar />
        <Filter />
        <ContentWrapper>
          <PickCombine />
        </ContentWrapper>
      </PickCalculatorWrapper>
    </ErrorBoundary>

  );
}

export default PickCalculator;

const PickCalculatorWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  overflow: auto;
  background-color: #23212a;
`;

const ContentWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;
