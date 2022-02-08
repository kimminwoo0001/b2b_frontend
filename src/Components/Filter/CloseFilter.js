import React, { useState, memo } from "react";
import styled, { css } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import FilterHeader from "./FilterHeader";

const CloseFilter = memo(() => {
  const filters = useSelector((state) => state.FilterReducer);

  const hideFilter = filters.openFilterModal === "/teamCompare" && filters.oppteam.length > 0 && filters.compareModal ||
    filters.openFilterModal === "/playerCompare" && filters.oppplayer !== "" && filters.compareModal;
  return (
    <FilterWrapper hideFilter={hideFilter}>
      {filters.openFilterModal === "/teamCompare" && filters.oppteam.length > 0 && filters.compareModal ||
        filters.openFilterModal === "/playerCompare" && filters.oppplayer !== "" && filters.compareModal
        ? "" :
        <FilterHeader />}
    </FilterWrapper>
  );
});

export default CloseFilter;

const FilterWrapper = styled.div`
  width: 65px;
  height: 100%;
  margin: 0 0 77px 0px;
  padding: ${props => props.hideFilter ? "" : "28px 14px"};
  background-color: #23212A;
  box-shadow: 5px 5px 30px 0 rgba(0, 0, 0, 0.15);
`;

