import React from 'react';
import styled, { css } from "styled-components";
import SelectedData  from '../../../../Components/Filter/Selected/SelectedData';

const SelectedJungleFilter = ({filterData}) => {
    console.log(filterData);
    return (
          <SelectedArea>
              {filterData.year.length > 0 && filterData.year?.map((year) => {
                return <SelectedData data={year}  />
              })}
              {Object.keys(filterData.league).length > 0 && Object.keys(filterData.league).filter(key => filterData.league[key] === true)?.map((league) => {
                return <SelectedData data={league}  />
              })} 
              {Object.keys(filterData.season).length > 0 && Object.keys(filterData.season).filter(key => filterData.season[key] === true)?.map((season) => {
                return <SelectedData data={season}  />
              })}
              {filterData.team.length > 0 && filterData.team?.map((team) => {
                return <SelectedData data={team}   />
              })}
              {Object.keys(filterData.patch).length > 0 && Object.keys(filterData.patch).filter(key => filterData.patch[key] === true)?.map((patch) => {
                return <SelectedData data={patch}   />
              })}
          </SelectedArea>
      );
};

export default SelectedJungleFilter;


const SelectedArea = styled.div`

  .not-selected {
    opacity: 0.3;
  }
`;