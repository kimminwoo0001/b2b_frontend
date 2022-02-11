import React from "react";
import styled from "styled-components";

function thousandGold(gold) {
  let result = gold;
  if (gold >= 1000) {
    result = Math.floor(gold / 100) / 10 + "k";
  }
  return result;
}

const GoldGap = ({ gold, win }) => {
  return (
    <GoldContainer win={win}>
      <img src="Images/ic_gold.svg" alt="" />
      <div>{thousandGold(gold)}</div>
    </GoldContainer>
  );
};

export default GoldGap;

const GoldContainer = styled.div`
  position: absolute;
  top: 35%;
  left: 39%;
  width: 48px;
  height: 20px;
  padding: 3px 6px 2px;
  border-radius: 10px;
  background-color: ${(props) =>
    props.win === "blue" ? "#0075bf" : "#f04545"};
  display: flex;
  img {
    width: 15px;
    height: 15px;
  }
  div {
    font-family: SpoqaHanSansNeo;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.25;
    letter-spacing: normal;
    text-align: left;
    color: #fff;
    padding-bottom: 10px;
  }
`;
