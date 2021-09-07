import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import Nav from "../../Components/Nav/Nav";
import SideBar from "../../Components/SideBar/SideBar";
import SoloFilter from "../Solo/Components/SoloFilter";
import Player from "./Player";
import SelectFilter from "../../Components/SelectFilter/SelectFilter";
import ErrorBoundary from "../../Components/ErrorBoundary";

function Solo() {
  const filters = useSelector((state) => state.FilterReducer);
  return (
    <ErrorBoundary>
      <SoloWrapper>
        <SideBar />
        <SoloFilter />
        <ContentWrapper>
          <Nav />
          {filters.player !== "" && filters.patch.length > 0 ? (
            <Player />
          ) : (
            <SelectFilter />
          )}
        </ContentWrapper>
      </SoloWrapper>
    </ErrorBoundary>
  );
}

export default Solo;

const SoloWrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  overflow: auto;
  display: flex;
  background-color: #23212a;
`;

const ContentWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;
