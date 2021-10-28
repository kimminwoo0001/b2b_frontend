import React from 'react'
import styled from "styled-components";
import SideBar from "../../Components/SideBar/SideBar";
// import Filter from "../../Components/Filter/Filter";
// import CloseFilter from "../../Components/Filter/CloseFilter";
// import SelectFilter from "../../Components/SelectFilter/SelectFilter";

import ErrorBoundary from "../../Components/ErrorBoundary";
import Nav from "../../Components/Nav/Nav";
import { useSelector } from "react-redux";


 function GameReport() {
    const filters = useSelector((state) => state.FilterReducer);

    return (
     <ErrorBoundary>
      <Nav />
      <GameWrapper>
        <SideBar />
      </GameWrapper>
    </ErrorBoundary>
  
    )
}

export default GameReport;


const GameWrapper  = styled.div`
width: 100%;
height: 100%;
min-height: 100vh;
overflow: auto;
display: flex;
background-color: #16151c;

.filter-close {
  display: none;
}

.filter-open{

}
`
