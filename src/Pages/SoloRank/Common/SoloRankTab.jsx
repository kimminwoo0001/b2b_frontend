import React, { useState } from "react";
import styled, { css } from "styled-components";
import { useTranslation } from "react-i18next";
import LeagueSchedule from "./LeagueSchedule/LeagueSchedule";
import LeaguePick from "./LeaguePick/LeaguePick";
import LeagueStatistics from "./LeagueStatistics/LeagueStatistics";
import LeaguePlayer from "./LeaguePlayer/LeaguePlayer";
import { useSelector } from "react-redux";
import SR_MyTeam from "../MyTeam/SR_MyTeam";
import SR_SearchFilter from "../SearchFilter.jsx/SR_SearchFilter";
import SR_InterestedPlayer from "../InterestedPlayer/SR_InterestedPlayer";

const SoloRankTab = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(1);
  const filters = useSelector((state) => state.FilterReducer);

  const BoardTab = {
    0: <SR_MyTeam />,
    1: <SR_SearchFilter />,
    2: <SR_InterestedPlayer />,
  };

  return <SoloRankTabWrapper></ㄴSoloRankTabWrapper>;
};

const S_SoloRankTabWrapper = styled.div`
  width: 1170px;
  height: 1080px;
  margin: 21px 0 25px 22px;
  /* padding: 0 30px; */
`;
