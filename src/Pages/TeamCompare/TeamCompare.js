import React from "react";
import styled from "styled-components";

import SideBar from "../../Components/SideBar/SideBar";
import TeamFilter from "../Team/TeamFilter";
import Nav from "../../Components/Nav/Nav";
import TeamTabs from "../Team/TeamTabs";
import { useSelector } from "react-redux";
import SelectFilter from "../../Components/SelectFilter/SelectFilter";
import ErrorBoundary from "../../Components/ErrorBoundary";
function TeamCompare() {
  const filters = useSelector((state) => state.FilterReducer);

  return (
    <ErrorBoundary>
      <TeamWrapper>
        <SideBar />
        <TeamFilter />
        <ContentWrapper>
          <Nav />
          {filters.team !== "" ? <TeamTabs /> : <SelectFilter />}
        </ContentWrapper>
      </TeamWrapper>
    </ErrorBoundary>
  );
}

export default TeamCompare;

const TeamWrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: flex;
  background-color: #23212a;
`;

const ContentWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;
