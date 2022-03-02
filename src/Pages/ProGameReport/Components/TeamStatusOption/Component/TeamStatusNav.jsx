import React, { useState } from "react";
/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled/macro";
import { useSelector, useDispatch } from "react-redux";

const TeamStatusNav = () => {
  const gamevalue = useSelector((state) => state.GameReportReducer);
  return (
    <ChampNavConatiner>
      <div className="blue">
        <div className="team-name">{gamevalue.blueteam}</div>
        <img src={`Images/TeamLogo/${gamevalue.blueteam}.png`} alt="" />
      </div>
      <div className="red">
        <img src={`Images/TeamLogo/${gamevalue.redteam}.png`} alt="" />
        <div className="team-name">{gamevalue.redteam}</div>
      </div>
    </ChampNavConatiner>
  );
};

export default TeamStatusNav;

const ChampNavConatiner = styled.div`
  display: flex;
  width: 240px;
  height: 85px;
  margin: 0 0 10px;
  padding: 55px 0 0 0;
  box-shadow: 5px 5px 30px 0 rgba(0, 0, 0, 0.15);
  position: relative;

  img {
    width: 30px;
    height: 30px;
    margin: 0 3px 0 0;
    object-fit: contain;
  }

  .team-name {
    font-family: SpoqaHanSansNeo;
    font-size: 18px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.39;
    letter-spacing: normal;
    color: #fff;
  }

  .blue {
    width: 100%;
    height: 30px;
    padding: 0 17px 0 0;
    display: flex;
    text-align: left;
    justify-content: flex-end;
  }

  .red {
    width: 100%;
    height: 30px;
    padding: 0 0 0 18px;
    display: flex;
    text-align: right;
    justify-content: flex-start;
  }
`;
