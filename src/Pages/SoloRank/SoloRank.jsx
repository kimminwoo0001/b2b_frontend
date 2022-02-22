/** @jsxImportSource @emotion/react */
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled/macro";
import SideBar from "../../Components/SideBar/SideBar";
import Filter from "../../Components/Filter/Filter";
import CloseFilter from "../../Components/Filter/CloseFilter";
import ErrorBoundary from "../../Components/ErrorBoundary";
import Nav from "../../Components/Nav/Nav";
import { useSelector, useDispatch, batch } from "react-redux";
import SoloRankTab from "./Component/Common/SoloRankTab";

const SoloRank = () => {
  //const filters = useSelector((state) => state.FilterReducer);
  const { t } = useTranslation();
  //const dispatch = useDispatch();

  useEffect(() => {}, []);

  if (document.title !== `${t("sidebar.part13")} - NUNU.GG`) {
    document.title = `${t("sidebar.part13")} - NUNU.GG`;
  }

  return (
    <ErrorBoundary>
      <Nav />
      <Wrapper>
        <SideBar />
        <ContentWrapper>
          <SoloRankTab />
        </ContentWrapper>
      </Wrapper>
    </ErrorBoundary>
  );
};

export default SoloRank;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  overflow: auto;
  display: flex;
  background-color: #000000;
  overflow: hidden;

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
