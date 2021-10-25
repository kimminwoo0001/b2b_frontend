import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import SideBar from "../../Components/SideBar/SideBar";
import Filter from "../../Components/Filter/Filter";
import Player from "./Player";
import SelectFilter from "../../Components/SelectFilter/SelectFilter";
import ErrorBoundary from "../../Components/ErrorBoundary";
import Nav from "../../Components/Nav/Nav";
// import SoloFilter from "../Solo/Components/SoloFilter";

function Solo() {
  const filters = useSelector((state) => state.FilterReducer);
  return (
    <ErrorBoundary>
      <Nav />
      <SoloWrapper>
        <SideBar />
        <Filter />
        <ContentWrapper>
          {filters.player !== "" && filters.season.length > 0 ? (
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
