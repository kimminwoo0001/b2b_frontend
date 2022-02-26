/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled/macro";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import ItemBox from "./SubComponent/ItemBox";

const MTHeader = ({ headerInfo }) => {
  const { t } = useTranslation();

  const lebels = [
    t("soloRank.myTeam.label.leagueInfo"),
    t("soloRank.myTeam.label.teamLogo"),
    t("soloRank.myTeam.label.teamAbbr"),
    t("common.label.player"),
  ];

  return (
    <SWrapper>
      {headerInfo.length > 0 &&
        lebels.map((data, idx) => {
          if (headerInfo[idx].logo) {
            return (
              <ItemBox
                label={data}
                logo={headerInfo[idx].logo}
                text={headerInfo[idx].text}
              />
            );
          } else {
            return <ItemBox label={data} text={headerInfo[idx].text} />;
          }
        })}
    </SWrapper>
  );
};

export default MTHeader;

const SWrapper = styled.div`
  width: 1110px;
  height: 96px;
  margin: 10px 0 20px;
  padding: 22px 100px 21px;
  border-radius: 20px;
  background-color: ${(props) => props.theme.colors.bg_box};
  display: flex;
  justify-content: space-between;
`;
