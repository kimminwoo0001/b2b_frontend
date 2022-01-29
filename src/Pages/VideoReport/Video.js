import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useSelector } from "react-redux";
import SideBar from "../../Components/SideBar/SideBar";
import Filter from "../../Components/Filter/Filter";
import SelectFilter from "../../Components/SelectFilter/SelectFilter";
import VideoTabs from "./VideoTabs";
import ErrorBoundary from "../../Components/ErrorBoundary";
import Nav from "../../Components/Nav/Nav";
import CloseFilter from "../../Components/Filter/CloseFilter";

function Video() {
  const filters = useSelector((state) => state.FilterReducer);
  const { t } = useTranslation();

  useEffect(() => {
    document.title = `${t("sidebar.part6")} - NUNU.GG`
  }, [])

  return (
    <ErrorBoundary>
      <Nav />
      <VideoWrapper>
        <SideBar />
        <div
          // className={filters.filterMenuState ? "filter-open" : "filter-close"}
        >
          <Filter />
        </div>
       {/* <div
          className={filters.filterMenuState ? "filter-close" : "filter-open"}
        >
          <CloseFilter />
        </div> */}
        <ContentWrapper>
          {filters.team !== "" && filters.team.length > 0 ? (
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
  background-color: #16151c;

  .filter-close {
    display: none;
  }

  .filter-open {
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 0px 0;
`;
