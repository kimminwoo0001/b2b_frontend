import React, { useState, memo } from "react";
import styled, { css } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import FilterHeader from "./FilterHeader";

const CloseFilter = memo(() => {
  const filters = useSelector((state) => state.FilterReducer);
  return (
    <FilterWrapper>
      <FilterHeader />
    </FilterWrapper>
  );
});

export default CloseFilter;

const FilterWrapper = styled.div`
  width: 70px;
  height: 100%;
  margin: 0 0 85px;
  padding: 32px 5px 0;
  background-color: #23212A;
  box-shadow: 5px 5px 30px 0 rgba(0, 0, 0, 0.15);
`;

