import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import SideBar from "../../Components/SideBar/SideBar";
import Filter from "../../Components/Filter/Filter";
import TeamTabs from "./TeamTabs";
import SelectFilter from "../../Components/SelectFilter/SelectFilter";
import ErrorBoundary from "../../Components/ErrorBoundary";
import Nav from "../../Components/Nav/Nav";
import CloseFilter from "../../Components/Filter/CloseFilter";
import { CopyYear } from "../../redux/modules/copyvalue";

function Team() {
  const filters = useSelector((state) => state.FilterReducer);
  const copy = useSelector((state) => state.CopyReducer);
  const { t } = useTranslation();

  useEffect(() => {
    document.title = `${t("sidebar.part3")} - NUNU.GG`
  }, [])

  return (
    <ErrorBoundary>
      <Nav />
      <TeamWrapper>
        <SideBar />

        (<>
        <div
          className={filters.filterMenuState ? "filter-open" : "filter-close"}
        >
          <Filter />
        </div>
        <div
          className={filters.filterMenuState ? "filter-close" : "filter-open"}
        >
          <CloseFilter />
        </div>
        </>
        )

        <ContentWrapper>
          {filters.team !== "" && filters.team.length > 0 && filters.year.length > 0  && filters.patch.length > 0? (
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
  background-color: #16151a;
  padding: 0px 0;
`;
