import React, { useState } from "react";
import styled, { css } from "styled-components";
import { useTranslation } from "react-i18next";

const TimeStatus = () => {
  const { t } = useTranslation();
  const [tab, setTab] = useState(0);

  return (
    <DetailChampTimeStatus>
      <TabContainer>
        <TabItem
          changeColor={tab === 0}
          onClick={() => {
            setTab(0);
          }}
        >
          <div>
            <span>{t("game.summary.champion.skill-build")}</span>
          </div>
        </TabItem>
        <TabItem
          changeColor={tab === 1}
          onClick={() => {
            setTab(1);
          }}
        >
          <div>
            <span>{t("game.summary.champion.item-build")}</span>
          </div>
        </TabItem>
      </TabContainer>
      <BuildBox></BuildBox>
    </DetailChampTimeStatus>
  );
};

export default TimeStatus;

const DetailChampTimeStatus = styled.div`
  width: 702px;
  height: 86px;
  display: flex;
`;

const TabContainer = styled.div`
  width: 39px;
  height: 100%;
  margin: 2.5px 7px 50px 0px;
`;

const TabItem = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  width: auto;
  //border-bottom: solid 1px #433f4e;
  white-space: nowrap;
  div {
    padding: 4px 8px;
  }

  :hover {
    div {
      padding: 4px 8px;
      border-radius: 10px;
      background-color: #26262c;
    }
  }
  span {
    height: 22px;
    font-family: SpoqaHanSansNeo;
    font-size: 10px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: normal;
    text-align: left;
    color: ${(props) => (props.changeColor ? `#fff` : `rgba(255,255,255,0.3)`)};
  }
`;

const BuildBox = styled.div`
  width: 640px;
  height: 89px;
  margin: 0.5px 8px 1px 7px;
  background-color: #fff;
`;
