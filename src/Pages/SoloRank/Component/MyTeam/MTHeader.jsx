/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled/macro";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import ItemBox from "./SubComponent/ItemBox";

const sample = [
  { logo: "Images/ico-league-lck.png", text: "LCK" },
  { logo: "Images/TeamLogo/DK.png" },
  { text: "DK" },
  { text: "DWG KIA" },
  { text: "5명" },
];
const MTHeader = () => {
  const { t } = useTranslation();
  const lang = useSelector((state) => state.LocaleReducer);

  console.log("야옹", lang);

  const lebels = [
    t("soloRank.myTeam.label.leagueInfo"),
    t("soloRank.myTeam.label.teamLogo"),
    t("soloRank.myTeam.label.teamAbbr"),
    t("soloRank.myTeam.label.teamName"),
    t("common.label.player"),
  ];

  return (
    <SWrapper>
      {lebels.map((data, idx) => {
        if (sample[idx].logo) {
          return (
            <ItemBox
              label={data}
              logo={sample[idx].logo}
              text={sample[idx].text}
            />
          );
        } else {
          return <ItemBox label={data} text={sample[idx].text} />;
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
