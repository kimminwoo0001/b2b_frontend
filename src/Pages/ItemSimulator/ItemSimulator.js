import React from "react";
import styled from "styled-components";
import SideBar from "../../Components/SideBar/SideBar";

function ItemSimulator() {
  return (
    //아이템 시뮬레이터 탭
    <ItemSimulatorWrapper>
      <SideBar />
      유틸
    </ItemSimulatorWrapper>
  );
}

export default ItemSimulator;

const ItemSimulatorWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  background-color: #23212a;
`;
