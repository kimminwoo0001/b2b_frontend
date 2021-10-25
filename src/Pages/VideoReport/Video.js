import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import SideBar from "../../Components/SideBar/SideBar";
import Filter from "../../Components/Filter/Filter";
import SelectFilter from "../../Components/SelectFilter/SelectFilter";
import VideoTabs from "./VideoTabs";
import ErrorBoundary from "../../Components/ErrorBoundary";
// import TeamFilter from "../Team/TeamFilter";
import Nav from "../../Components/Nav/Nav";

function Video() {
  const filters = useSelector((state) => state.FilterReducer);

  return (
    <ErrorBoundary>
      <Nav />
      <VideoWrapper>
        <SideBar />
        <Filter />
        <ContentWrapper>
          {filters.team !== "" && filters.season.length > 0 ? (
            <VideoTabs />
          ) : (
            <SelectFilter />
          )}
        </ContentWrapper>
      </VideoWrapper>
    </ErrorBoundary>
  );
}

export default Video;

const VideoWrapper = styled.div`
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
