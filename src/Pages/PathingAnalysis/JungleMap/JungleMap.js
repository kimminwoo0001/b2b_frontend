/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled/macro";
import { useTranslation } from "react-i18next";
import { useTab } from "../../../Hooks";
import { testStyle, transitionStyle, typoStyle } from "../../../Styles/ui";

import Compare from "./screens/Compare";
import Sequence from "./screens/Sequence";

// subtab data

const JungleMap = () => {
  const { t } = useTranslation();
  const JungleTab = [
    { title: t("filters.sorry"), component: <Sequence /> },
    { title: "정글링 비교", component: <Compare /> },
  ];
  const { currentIndex, currentTab, setIndex } = useTab(0, JungleTab);
  console.log("--------------", currentTab);
  return (
    <SContainer>
      <STab>
        {JungleTab.map((tab, index) => (
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

export default JungleMap;
