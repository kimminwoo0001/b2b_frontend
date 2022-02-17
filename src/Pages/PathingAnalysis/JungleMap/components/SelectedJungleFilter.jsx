import React from 'react';
import styled, { css } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import SelectedData  from '../../../../Components/Filter/Selected/SelectedData';
import { JungleInit, ResetJungleLeague, ResetJungleSeason, ResetJungleTeam, ResetJunglePatch} from '../../../../redux/modules/junglevalue';

const SelectedJungleFilter = ({filterData}) => {
  const junglevalue = useSelector(state => state.JungleMapReducer);
  const dispatch = useDispatch();
    return (
          <SelectedArea>
              {filterData.year.length > 0 && filterData.year?.map((year) => {
                return <SelectedData data={year} deleteBtn ={() => {dispatch(JungleInit())}}  />
              })}
              {Object.keys(filterData.league).length > 0 && Object.keys(filterData.league).filter(key => filterData.league[key] === true)?.map((league) => {
                return <SelectedData data={league} deleteBtn ={() => {dispatch(ResetJungleLeague())}} />
              })} 
              {Object.keys(filterData.season).length > 0 && Object.keys(filterData.season).filter(key => filterData.season[key] === true)?.map((season) => {
                return <SelectedData data={season} deleteBtn ={() => {dispatch(ResetJungleSeason())}} />
              })}
              {filterData.team.length > 0 && filterData.team?.map((team) => {
                return <SelectedData data={team}  deleteBtn ={() => {dispatch(ResetJungleTeam())}} />
              })}
              {Object.keys(filterData.patch).length > 0 && Object.keys(filterData.patch).filter(key => filterData.patch[key] === true)?.map((patch) => {
                return <SelectedData data={patch} deleteBtn ={() => {dispatch(ResetJunglePatch())}}  />
              })}
          </SelectedArea>
      );
};

export default SelectedJungleFilter;

const SelectedArea = styled.div`
margin-left: 15px;
  .not-selected {
    opacity: 0.3;
  }
`;