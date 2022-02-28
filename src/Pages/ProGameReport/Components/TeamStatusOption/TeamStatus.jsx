import React from "react";
/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled/macro";
import { useSelector, useDispatch } from "react-redux";
import TeamStatusNav from "./Component/TeamStatusNav";
import ChampionLiuneBox from "./Component/ChampionLineBox";

const TeamStatus = () => {
  const gamevalue = useSelector((state) => state.GameReportReducer);
  //console.log("TeamStatus", gamevalue);

  return (
    <ChamStatusContainer>
      <TeamStatusNav />
      <ChampionLiuneBox position={0} />
      <ChampionLiuneBox position={1} />
      <ChampionLiuneBox position={2} />
      <ChampionLiuneBox position={3} />
      <ChampionLiuneBox position={4} />
    </ChamStatusContainer>
  );
};

export default TeamStatus;

const ChamStatusContainer = styled.div`
  width: 240px;
  height: 1080px;
  padding: 13px 14px 0 0;
  box-shadow: 5px 5px 30px 0 rgba(0, 0, 0, 0.15);
`;

const ChampLineContainer = styled.div`
  display: flex;
  width: 226px;
  height: 187px;
  margin: 10px 14px 10px 0;
  position: relative;

  .position {
    position: absolute;
    top: 10%;
    left: 46%;
    width: 17px;
    height: 17px;
    object-fit: contain;
    background-color: #fff;
  }

  .gold {
    position: absolute;
    top: 35%;
    left: 39%;
    width: 48px;
    height: 20px;
    padding: 3px 6px 2px;
    border-radius: 10px;
    background-color: #0075bf;
  }
`;
