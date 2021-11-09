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