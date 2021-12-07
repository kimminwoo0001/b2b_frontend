import React, { useState } from "react";
import styled, { css } from "styled-components";
import { useTranslation } from "react-i18next";

function thousand(value) {
  let result = "";
  if (typeof value === "number") {
    result = value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  }
  return result;
}

const StatusBox3 = () => {
  const { t } = useTranslation();

  return (
    <ChampStatContainer>
      <PerformanceContainer>
        <div className="performance-box">
          <div className="title">{t("game.summary.champion.kda")}</div>
          <div className="content">17 / 16 / 24</div>
          <div className="all-content">22 / 20 / 35</div>
        </div>
        <div className="performance-box">
          <div className="title">{t("game.summary.champion.cs")}</div>
          <div className="content">{`${325}`}</div>
          <div className="all-content">{`${325}`}</div>
        </div>
        <div className="performance-box">
          <div className="title">{t("game.summary.champion.kill-point")}</div>
          <div className="content">{`${24}%`}</div>
          <div className="all-content">{`${78}%`}</div>
        </div>
        <div className="performance-box">
          <div className="title">{t("game.summary.champion.placed-ward")}</div>
          <div className="content">{`${13}`}</div>
          <div className="all-content">{`${29}`}</div>
        </div>
        <div className="performance-box">
          <div className="title">
            {t("game.summary.champion.destroyed-ward")}
          </div>
          <div className="content">{`${2}`}</div>
          <div className="all-content">{`${18}`}</div>
        </div>
      </PerformanceContainer>
      <GoldContainer>
        <div className="gold-box">
          <div className="title">{t("game.summary.champion.cur-gold")}</div>
          <div className="content">{`${thousand(367)}G`}</div>
        </div>
        <div className="gold-box">
          <div className="title">{t("game.summary.champion.total-gold")}</div>
          <div className="content">{`${thousand(13211222)}G`}</div>
        </div>
        <div className="gold-box">
          <div className="title">{t("game.summary.champion.gold-gap")}</div>
          <div className="content">{`${thousand(221)}G`}</div>
        </div>
      </GoldContainer>
    </ChampStatContainer>
  );
};

export default StatusBox3;

const ChampStatContainer = styled.div`
  width: 320px;
  height: 87px;
  margin: 23px 0px 15.5px 0px;
`;

const PerformanceContainer = styled.div`
  width: 320px;
  height: 45px;
  margin: 0 0 10px;
  display: flex;

  .performance-box {
    height: 45px;
    margin: 0 15px 0 0;
    :last-child {
      margin: 0 0px 0 0;
    }

    .title {
      font-family: SpoqaHanSansNeo;
      font-size: 10px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: 1;
      letter-spacing: normal;
      text-align: left;
      color: #fff;
      white-space: nowrap;
    }

    .content {
      font-family: SpoqaHanSansNeo;
      font-size: 15px;
      font-weight: bold;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.4;
      letter-spacing: normal;
      text-align: left;
      color: #fff;
      white-space: nowrap;
    }

    .all-content {
      font-family: SpoqaHanSansNeo;
      font-size: 10px;
      font-weight: bold;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.4;
      letter-spacing: normal;
      text-align: left;
      color: rgba(255, 255, 255, 0.3);
    }
  }
`;

const GoldContainer = styled.div`
  height: 32px;
  margin: 0px 0px 0 0;
  display: flex;

  .gold-box {
    height: 32px;
    margin: 0 30px 0 0;

    .title {
      margin: 0px 0px 0 0;
      font-family: SpoqaHanSansNeo;
      font-size: 10px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.2;
      letter-spacing: normal;
      text-align: left;
      color: #fff;
    }

    .content {
      font-family: SpoqaHanSansNeo;
      font-size: 15px;
      font-weight: bold;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.4;
      letter-spacing: normal;
      text-align: left;
      color: #fff;
    }
  }
`;
