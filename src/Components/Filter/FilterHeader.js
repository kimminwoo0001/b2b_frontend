import React, { memo } from 'react';
import styled, { css } from 'styled-components';
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { FilterMenuSwitch } from '../../redux/modules/filtervalue';

const FilterHeader = memo(() => {
  const lang = useSelector((state) => state.LocaleReducer);
  const filters = useSelector((state) => state.FilterReducer);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const menus = [
    {
      name: t("sidebar.part1"),
      path: "/",
      image: "/Images/sidebar_newLogo/ico-home.png",
    },
    {
      name: t("sidebar.part2"),
      path: "/league",
      image: "/Images/sidebar_newLogo/ico-league.png",
    },
    {
      name: t("sidebar.part3"),
      path: "/team",
      image: "/Images/sidebar_newLogo/ico-team.png",
    },
    {
      name: t("sidebar.part4"),
      path: "/metaAnalysis",
      image: "/Images/sidebar_newLogo/ico-meta.png",
    },
    {
      name: t("sidebar.part5"),
      path: "/solo",
      image: "/Images/sidebar_newLogo/ico-player.png",
    },
    {
      name: t("sidebar.part6"),
      path: "/video",
      image: "/Images/sidebar_newLogo/ico-movie.png",
    },
    {
      name: t("sidebar.part7"),
      path: "/matchAnalysis",
      image: "/Images/sidebar_newLogo/ico-match.png",
    },
    {
      name: t("sidebar.part8"),
      path: "/teamCompare",
      image: "/Images/sidebar_newLogo/ico-teamcom.png",
    },
    {
      name: t("sidebar.part9"),
      path: "/playerCompare",
      image: "/Images/sidebar_newLogo/ico-playercom.png",
    },
    {
      name: t("sidebar.part10"),
      path: "/simulator",
      image: "/Images/ico-itemsimulator.png",
    },
    {
      name: t("sidebar.part11"),
      path: "/calculator",
      image: "/Images/ico-pick-calculator.png",
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
            {/*<img src="Images/ico-filter.png" alt="filterIcon"></img>*/}
            <img src="Images/btn_view_off.png" alt="filterIcon" onClick={() => filterSwitch()} />
            {lang === 'kr' ? <label>{menus[filters.menu_num].name}</label>
              : <label style={{ fontSize: '33px' }}>{menus[filters.menu_num].name}</label>}
          </div>
        </Header> :
        <NoHeader>
          <img src="Images/btn_view_off.png" alt="filterIcon" onClick={() => filterSwitch()} />
        </NoHeader>
      }
    </>

  )
});

export default FilterHeader;

const Header = styled.div`
  width: 250px;
  font-family: NotoSansKR;
  color: #fff;
  .header {
    height: 70px;
    font-size: 35px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 0.88;
    letter-spacing: normal;
    text-align: left;
    img {
      width: 60px;
      height: 60px;
      object-fit: contain;
      vertical-align: middle;
      cursor: pointer;
    }
    margin: 0 0 20px;
  }
`;

const NoHeader = styled.div`
  width: 60px;
  height: 60px;
  object-fit: contain;
  img {
    width: 60px;
    height: 60px;
    object-fit: contain;
    vertical-align: middle;
    cursor: pointer;
  }
`;