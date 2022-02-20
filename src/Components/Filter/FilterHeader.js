import React, { memo } from 'react';
/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled/macro";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { FilterMenuSwitch } from '../../redux/modules/filtervalue';
import { goHome, goLeagueReport, goPathAnalysis, goPlayerCompare, goPlayerReport, goProGameReport, goSoloRank, goTeamCompare, goTeamReport } from '../../lib/pagePath';

const FilterHeader = memo(() => {
  const lang = useSelector((state) => state.LocaleReducer);
  const filters = useSelector((state) => state.FilterReducer);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const menus = [
    {
      // menus[0] Home
      idx: 0,
      name: t("sidebar.part1"),
      path: goHome,
      image: "/Images/sidebar_newLogo/ico-home.png",

    },
    {
      // menus[1] 리그 보고서
      idx: 1,
      name: t("sidebar.part2"),
      path: goLeagueReport,
      image: "/Images/sidebar_newLogo/ico-league.png",

    },
    {
      // menus[2] 팀 보고서
      idx: 2,
      name: t("sidebar.part3"),
      path: goTeamReport,
      image: "/Images/sidebar_newLogo/ico-team.png",

    },
    {
      // menus[3] 메타 분석
      idx: 3,
      name: t("sidebar.part4"),
      path: "/metaAnalysis",
      image: "/Images/sidebar_newLogo/ico-meta.png",

    },
    {
      // menus[4] 선수 보고서
      idx: 4,
      name: t("sidebar.part5"),
      path: goPlayerReport,
      image: "/Images/sidebar_newLogo/ico-player.png",

    },
    {
      // menus[5] 영상 보고서
      idx: 5,
      name: t("sidebar.part6"),
      path: goPathAnalysis,
      image: "/Images/sidebar_newLogo/ico-movie.png",

    },
    {
      // menus[6] 매치 분석
      idx: 6,
      name: t("sidebar.part7"),
      path: "/matchAnalysis",
      image: "/Images/sidebar_newLogo/ico-match.png",

    },
    {
      // menus[7] 팀 비교
      idx: 7,
      name: t("sidebar.part8"),
      path: goTeamCompare,
      image: "/Images/sidebar_newLogo/ico-teamcom.png",

    },
    {
      // menus[8] 선수 비교
      idx: 8,
      name: t("sidebar.part9"),
      path: goPlayerCompare,
      image: "/Images/sidebar_newLogo/ico-playercom.png",

    },
    {
      // menus[9] 아이템 시뮬레이터
      idx: 9,
      name: t("sidebar.part10"),
      path: "/simulator",
      image: "/Images/ico-itemsimulator.png",

    },
    {
      // menus[10] 픽 계산기
      idx: 10,
      name: t("sidebar.part11"),
      path: "/calculator",
      image: "/Images/ico-pick-calculator.png",
    },
    {
      // menus[11] 게임 보고서
      idx: 11,
      name: t("sidebar.part12"),
      path: goProGameReport,
      image: "/Images/sidebar_newLogo/ico_game.png",

    },
    {
      // menus[12] 솔로 랭크
      idx: 12,
      name: t("sidebar.part13"),
      path: goSoloRank,
      image: "/Images/sidebar_newLogo/ico_solorank.svg",
    },
    {
      // menus[13] 아이템 계산기
      idx: 13,
      name: t("sidebar.part14"),
      path: "/itemCalculator",
      image: "/Images/sidebar_newLogo/ico_calculate.svg",

    },
  ];


  const filterSwitch = () => {
    dispatch(FilterMenuSwitch(!filters.filterMenuState));
  }

  return (
    <>
      {filters.filterMenuState ?
        <Header>
          <div className="header">
            <div className="header-label">
              {lang === 'kr' ? <label>{menus[filters.menu_num].name}</label>
                : <label style={{ fontSize: '25px' }}>{menus[filters.menu_num].name}</label>}
            </div>
            <div className="header-img">
              <img src="Images/btn_unfold.png" alt="filterIcon" onClick={() => filterSwitch()} />
            </div>
          </div>
        </Header> :
        <NoHeader>
          <img src="Images/btn_fold.png" alt="filterIcon" onClick={() => filterSwitch()} />
        </NoHeader>
      }
    </>

  )
});

export default FilterHeader;

const Header = styled.div`
  display: table;
  width: 294px;
  height: 37px;
  margin: 0 0 20px;
  padding: 0 15px 0 24px;

  .header-label {
    display: table-cell;
    float: left;
    label {
      height: 37px;
      font-family: SpoqaHanSansNeo;
      font-size: 30px;
      font-weight: bold;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.4;
      letter-spacing: normal;
      text-align: left;
      color: #fff; 
    }
  }
  .header-img {
    display: table-cell;
    float: right;
    img {
      width: 37px;
      height: 37px;
      object-fit: contain;
      vertical-align: -50%;
      cursor: pointer;
    }
  }
`;

const NoHeader = styled.div`
  img {
    width: 37px;
    height: 37px;
    object-fit: contain;
    cursor: pointer;
  }
`;