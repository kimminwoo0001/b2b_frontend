import React, { useState } from "react";
import styled from "styled-components";

const ChampionEventBox = ({ isDeath, isOpp }) => {
  return (
    <EventBox isDeath={isDeath} isOpp={isOpp}>
      {isOpp && <div className="event-img"></div>}
      <div className="desc">
        <div className="time">05:32</div>
        <div className="status">인베이드</div>
      </div>
      {!isOpp && <div className="event-img"></div>}
    </EventBox>
  );
};

export default ChampionEventBox;

const EventBox = styled.div`
  ${(props) => props.isDeath && `opacity: 0.3;`}
  margin: 10px 0 6px 2px;
  width: 100%;
  height: 28px;
  display: flex;
  .desc {
    width: 58px;
    height: 28px;
    .time {
      font-family: SpoqaHanSansNeo;
      font-size: 10px;
      font-weight: 300;
      font-stretch: normal;
      font-style: normal;
      line-height: 1;
      letter-spacing: normal;
      text-align: ${(props) => (props.isOpp ? "right" : "left")};
      color: #fff;
    }
    .status {
      font-family: SpoqaHanSansNeo;
      font-size: 12px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.5;
      letter-spacing: normal;
      text-align: ${(props) => (props.isOpp ? "right" : "left")};
      color: #fff;
    }
  }
  .event-img {
    visibility: hidden;
    margin-left: 2px;
    width: 28px;
    height: 28px;
    object-fit: contain;
    background-color: #fff;
  }
`;
