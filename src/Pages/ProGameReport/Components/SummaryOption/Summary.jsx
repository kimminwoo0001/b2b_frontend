import React, { useState } from "react";
/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled/macro";
import { useTranslation } from "react-i18next";
import ChampDetail from "./ChampionOption/ChampDetail";
import Detail from "./DetailOption/Detail";
import BanPick from "./BanPickOption/BanPick";

const Summary = () => {
  const [tab, setTab] = useState(0);
  const { t } = useTranslation();

  const SummaryTab = {
    0: <ChampDetail />,
    1: <Detail />,
    2: <BanPick />,
  };

  return (
    <SummaryContainer>
      <DetailNav>
        <TabItem
          onClick={() => {
            setTab(0);
          }}
          changeColor={tab === 0}
        >
          <div>
            <span>{t("game.summary.tab.champion")}</span>
          </div>
        </TabItem>
        <TabItem
          onClick={() => {
            setTab(1);
          }}
          changeColor={tab === 1}
        >
          <div>
            <span>{t("game.summary.tab.detail")}</span>
          </div>
        </TabItem>
        <TabItem
          onClick={() => {
            setTab(2);
          }}
          changeColor={tab === 2}
        >
          <div>
            <span>{t("game.summary.tab.banpick")}</span>
          </div>
        </TabItem>
        <LastMargin></LastMargin>
      </DetailNav>
      <div>{SummaryTab[tab]}</div>
    </SummaryContainer>
  );
};

export default Summary;

const SummaryContainer = styled.div`
  width: 702px;
  height: 260px;
  margin: 10px 0px 10px 10px;
`;

const DetailNav = styled.div`
  width: 702px;
  height: 40px;
  margin: 0 0 0px;
  display: flex;
`;

const TabItem = styled.button`
  display: flex;
  align-items: center;
  width: auto;
  border-bottom: solid 1px #433f4e;
  white-space: nowrap;
  div {
    padding: 10px 15px;
  }

  :hover {
    div {
      padding: 4px 15px;
      border-radius: 10px;
      background-color: #26262c;
    }
  }
  span {
    height: 22px;
    font-family: SpoqaHanSansNeo;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    padding-bottom: 9px;
    border-bottom: solid 1px
      ${(props) => (props.changeColor ? `#fff` : `#433f4e;`)};
    color: ${(props) => (props.changeColor ? `#fff` : `#84818e`)};
  }
`;

const LastMargin = styled.div`
  width: 73%;
  border-bottom: solid 1px #433f4e;
`;
