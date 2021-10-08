import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import SideBar from "../../Components/SideBar/SideBar";
import TeamFilter from "./TeamFilter";
import Nav from "../../Components/Nav/Nav";
import TeamTabs from "./TeamTabs";
import SelectFilter from "../../Components/SelectFilter/SelectFilter";
import ErrorBoundary from "../../Components/ErrorBoundary";
function Team() {
  const filters = useSelector((state) => state.FilterReducer);

  return (
    <ErrorBoundary>
      <TeamWrapper>
        <SideBar />
        <TeamFilter />
        <ContentWrapper>
          {filters.team !== "" && filters.patch.length > 0 ? (
            <TeamTabs />
          ) : (
            <SelectFilter />
          )}
        </ContentWrapper>
      </TeamWrapper>
    </ErrorBoundary>
  );
}

export default Team;

const TeamWrapper = styled.div`
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
