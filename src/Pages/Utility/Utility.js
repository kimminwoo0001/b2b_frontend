import React from "react";
import styled from "styled-components";
import SideBar from "../../Components/SideBar/SideBar";
import Nav from "../../Components/Nav/Nav";
import UtilityTab from "./UtilityTab";

function Utility() {
  return (
    <UtilityWrapper>
      <SideBar />
      <ContentWrapper>
        {/* <Nav /> */}
        <UtilityTab />
      </ContentWrapper>
    </UtilityWrapper>
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
