import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import secToMS from "../../../../lib/secToMS";

const TimeBarTitle = ({ textAligh = "right" }) => {
  const gamevalue = useSelector((state) => state.GameReportReducer);
  const videovalue = useSelector((state) => state.VideoReducer);

  return (
    <Title textAligh={textAligh}>
      {secToMS(Math.floor(+videovalue.playedSeconds) - +gamevalue.startTime)}
    </Title>
  );
};

export default TimeBarTitle;

const Title = styled.div`
  width: 58px;
  font-family: SpoqaHanSansNeo;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.3;
  letter-spacing: normal;
  text-align: ${(props) => props.textAligh};
  color: #fff;
`;
