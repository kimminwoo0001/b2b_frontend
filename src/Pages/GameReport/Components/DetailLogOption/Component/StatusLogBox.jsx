import React from "react";
import Tippy from "@tippy.js/react";
import styled, { css } from "styled-components";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import GameReportToolTip from "../../Common/GameReportToolTip";

const StatusLogBox = () => {
  const gamevalue = useSelector((state) => state.GameReportReducer);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  return (
    <LogDetailContainer>
      <LogTitle>
        <span>{t("game.log.status.subject")}</span>
        <StyledTippy
          duration={0}
          delay={[100, 0]}
          content={
            <GameReportToolTip tooltipInfo={t("game.log.status.tooltipInfo")} />
          }
          placement="top"
        >
          <img src={"Images/ico-question-mark.svg"} alt="question" />
        </StyledTippy>
      </LogTitle>
      <LogContentBox>
        <LogContent isActive={false} team={"blue"}></LogContent>
        <LogContent isActive={true} team={"blue"}></LogContent>
        <LogContent isActive={false} team={"blue"}></LogContent>
      </LogContentBox>
    </LogDetailContainer>
  );
};

export default StatusLogBox;

const LogDetailContainer = styled.div`
  width: 200px;
  height: 502px;
  margin: 0px 14px 13px 26px;
  padding: 10px 10px 0;
  border-radius: 20px;
  background-color: #23212a;
  overflow: hidden;
`;

const LogTitle = styled.div`
  width: auto;
  height: 21px;
  span {
    font-family: SpoqaHanSansNeo;
    font-size: 16px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 2.63;
    letter-spacing: normal;
    text-align: left;
    color: #fff;
  }

  img {
    width: 15px;
    height: 15px;
    margin: -5px 0 0px 5px;
    object-fit: contain;
    vertical-align: middle;
  }
`;

const StyledTippy = styled(Tippy)``;

const LogContentBox = styled.div`
  width: 180px;
  height: 289px; // auto
  overflow-y: hidden;
  margin: 10px 0 0;
`;

const LogContent = styled.div`
  width: 180px;
  height: 76px;
  margin: 5px 0;
  padding: 8px 0px 8px 0px;
  border-radius: 10px;
  background-color: #000;
  opacity: ${(props) => (props.isActive ? `1` : `0.3`)};
  border: solid 2px
    ${(props) =>
      props.isActive && (props.team === "red" ? `#f04545` : `#0075bf`)};

  .title {
    display: flex;
    height: 19px;
    margin: 0 5px 4px;
    //background-color: #f00;
    span {
      font-family: SpoqaHanSansNeo;
      font-size: 15px;
      font-weight: 500;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.15;
      letter-spacing: normal;
      text-align: left;
      color: #fff;
    }
  }

  .dot {
    width: 6px;
    height: 6px;
    margin: 7px 5px 10px 2px;
    background-color: ${(props) =>
      props.team === "red" ? `#f04545` : `#0075bf`};
    border-radius: 10px;
  }
`;
