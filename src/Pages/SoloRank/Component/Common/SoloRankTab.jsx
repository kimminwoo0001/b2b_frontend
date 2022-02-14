/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled/macro";
import { useTab } from "../../../../Hooks";
import { testStyle, transitionStyle, typoStyle } from "../../../../Styles/ui";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import MyTeam from "../../screens/MyTeam";
import SearchFilter from "../../screens/SearchFilter";
import InterestedPlayer from "../../screens/InterestedPlayer";
import { useState } from "react";
import { useEffect } from "react";

const SoloRankTab = () => {
  const { t } = useTranslation();
  const tab = [
    { title: t("soloRank.tab.myTeam"), component: <MyTeam /> },
    { title: t("soloRank.tab.filterSearch"), component: <SearchFilter /> },
    {
      title: t("soloRank.tab.interestedPlayer"),
      component: <InterestedPlayer />,
    },
  ];
  const { currentIndex, currentTab, setIndex } = useTab(0, tab);

  return (
    <SContainer>
      <STab>
        {tab.map((tab, index) => (
          <STabItem
            key={tab.title}
            className={index === currentIndex ? "is-active" : ""}
            onClick={() => setIndex(index)}
          >
            {tab.title}
          </STabItem>
        ))}
      </STab>
      <SContents>{currentTab.component}</SContents>
    </SContainer>
  );
};

export default SoloRankTab;

const SContainer = styled.section`
  width: 1110px;
  ${typoStyle.contents}
  ${testStyle.border1}
`;

const STab = styled.ul`
  display: flex;
  width: 100%;
  height: 62px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border_light};
  margin-bottom: 20px;
`;

const STabItem = styled.li`
  position: relative;
  width: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  opacity: 0.3;

  ${typoStyle.body}
  ${transitionStyle.opacity};

  &::after {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    content: "";
    width: 120px;
    height: 1px;
    background: ${({ theme }) => theme.colors.text};
    opacity: 0;
    ${transitionStyle.opacity};
  }

  &.is-active {
    opacity: 1;

    &::after {
      opacity: 1;
    }
  }
`;

const SContents = styled.div`
  display: flex;
  ${testStyle.border2}
`;
