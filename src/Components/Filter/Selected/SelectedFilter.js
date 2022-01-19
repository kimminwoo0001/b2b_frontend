import React, { memo } from 'react';
import styled, { css } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import SelectedData from './SelectedData';
import { League, Year, Season, Team, Player, Patch } from '../../../redux/modules/filtervalue';

const SelectedFilter = memo(({ pagePath, nameSolo, nameTeam, nameVideo, namePlayerCompare }) => {
  const filters = useSelector((state) => state.FilterReducer);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <SelectedFilters>
      <SelectedArea>
        <header><label className={filters.league.length === 0 && "not-selected"}>{t("label.league")}</label></header>
        <section>
          {filters.league.length > 0 && filters.league?.map((data) => {
            return <SelectedData data={data} deleteBtn={() => { dispatch(League(data)); }} />
          })}
        </section>
      </SelectedArea>
      <SelectedArea>
        <header><label className={filters.year.length === 0 && "not-selected"}>{t("label.year")}</label></header>
        <section>
          {filters.year.length > 0 && filters.year?.map((data) => {
            return <SelectedData data={data} deleteBtn={() => { dispatch(Year(data)); }} />
          })}
        </section>
      </SelectedArea>
      <SelectedArea>
        <header><label className={filters.season.length === 0 && "not-selected"}>{t("label.season")}</label></header>
        <section>
          {filters.season.length > 0 && filters.season?.map((data) => {
            return <SelectedData data={data} deleteBtn={() => { dispatch(Season(data)); }} />
          })}
        </section>
      </SelectedArea>
      {[nameSolo, nameTeam, nameVideo].includes(pagePath) && <SelectedArea>
        <header><label className={filters.team.length === 0 && "not-selected"}>{t("label.team")}</label></header>
        <section>
          {filters.team.length > 0 && <SelectedData data={filters.team} deleteBtn={() => { dispatch(Team(filters.team)); }} />}
        </section>
      </SelectedArea>}
      {[nameSolo, namePlayerCompare].includes(pagePath) && <SelectedArea>
        <header><label className={filters.player.length === 0 && "not-selected"}>{t("label.player")}</label></header>
        <section>
          {filters.player.length > 0 && <SelectedData data={filters.player} deleteBtn={() => { dispatch(Player(filters.player)); }} />}
        </section>
      </SelectedArea>}
      <SelectedArea>
        <header><label className={filters.patch.length === 0 && "not-selected"}>{t("label.patchVersion")}</label></header>
        <section>
          {console.log(filters.patch)}
          {filters.patch.length > 0 && filters.patch?.map((data) => {
            return <SelectedData data={data} deleteBtn={() => { dispatch(Patch(data)); }} />
          })}
        </section>
      </SelectedArea>
    </SelectedFilters>
  );
})

export default SelectedFilter;

const SelectedFilters = styled.div`
  width: 253px;
  margin: 11px 6px 40px 24px;
`;

const SelectedArea = styled.div`
  width: 250px;
  margin: 20px 0;
  header {
    width: 250px;
    height: 31px;
    margin: 0 0 5px;
    padding: 7px 0 2px 0;
    label {
      font-size: 18px;
      font-weight: bold;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.22;
      letter-spacing: normal;
      text-align: left;
      color: #fff;
    }
  } 
  .not-selected {
    opacity: 0.3;
  }
`;