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
  width: 65px;
  height: 100%;
  margin: 0 0 77px;
  padding: 28px 14px;
  background-color: #23212A;
  box-shadow: 5px 5px 30px 0 rgba(0, 0, 0, 0.15);
`;

