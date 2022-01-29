import React, { useState } from "react";
import styled, { css } from "styled-components";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import thousand from "../../../../../../lib/thousand";

const StatusBox3 = () => {
  const { t } = useTranslation();
  const gamevalue = useSelector((state) => state.GameReportReducer);
  const totalDetail =
    gamevalue.fixedDataset[gamevalue.selectedTeam].players[
      gamevalue.selectedPosition
    ].detail;
  const liveDataset = gamevalue.liveDataset;
  const liveData =
    liveDataset[gamevalue.liveActiveIdx - 1 < 0 ? 0 : gamevalue.liveActiveIdx]
      .players;
  const selectedNo = gamevalue.selectedParticipant;
  const oppSelectedNo = selectedNo > 4 ? selectedNo - 5 : selectedNo + 5;
  const blueKills = liveData
    .slice(0, 5)
    .map((e) => e.kills)
    .reduce((pre, cur) => pre + cur);

  const redKills = liveData
    .slice(5, 10)
    .map((e) => e.kills)
    .reduce((pre, cur) => pre + cur);
  const killAsist = liveData[selectedNo].kills + liveData[selectedNo].assists;
  const teamKill = selectedNo > 4 ? redKills : blueKills;
  const kp = killAsist === 0 ? 0 : (killAsist / teamKill) * 100;

  const totalKillAsist = totalDetail.kills + totalDetail.assists;
  const totalTeamKill = gamevalue.fixedDataset[gamevalue.selectedTeam].players
    .map((e) => e.detail.kills)
    .reduce((pre, cur) => pre + cur);

  console.log("killAsist", killAsist);
  console.log("teamKill", teamKill);

  return (
    <ChampStatContainer>
      <PerformanceContainer>
        <div className="performance-box">
          <div className="title">{t("game.summary.champion.kda")}</div>
          <div className="content">
            {`${liveData[selectedNo].kills} / ${liveData[selectedNo].deaths} / ${liveData[selectedNo].assists}`}
          </div>
          <div className="all-content">{`${totalDetail.kills} / ${totalDetail.deaths} / ${totalDetail.assists}`}</div>
        </div>
        <div className="performance-box">
          <div className="title">{t("game.summary.champion.cs")}</div>
          <div className="content">{`${liveData[selectedNo].cs}`}</div>
          <div className="all-content">{`${totalDetail.cs}`}</div>
        </div>
        <div className="performance-box">
          <div className="title">{t("game.summary.champion.kill-point")}</div>
          <div className="content">{`${Math.floor(kp)}%`}</div>
          <div className="all-content">{`${Math.floor(
            (totalKillAsist / totalTeamKill) * 100
          )}%`}</div>
        </div>
        <div className="performance-box">
          <div className="title">{t("game.summary.champion.placed-ward")}</div>
          <div className="content">{`${liveData[selectedNo].wardsPlaced}`}</div>
          <div className="all-content">{`${totalDetail.wardsplaced}`}</div>
        </div>
        <div className="performance-box">
          <div className="title">
            {t("game.summary.champion.destroyed-ward")}
          </div>
          <div className="content">{`${liveData[selectedNo].wardsDestroyed}`}</div>
          <div className="all-content">{`${totalDetail.wardskilled}`}</div>
        </div>
      </PerformanceContainer>
      <GoldContainer>
        <div className="gold-box">
          <div className="title">{t("game.summary.champion.cur-gold")}</div>
          {/* <div className="content">{`${thousand(367)}G`}</div> */}
          <div className="content">{`${thousand(
            liveData[selectedNo].CurrentGold
          )}G`}</div>
        </div>
        <div className="gold-box">
          <div className="title">{t("game.summary.champion.total-gold")}</div>
          <div className="content">{`${thousand(
            liveData[selectedNo].totalGold
          )}G`}</div>
        </div>
        <div className="gold-box">
          <div className="title">{t("game.summary.champion.gold-gap")}</div>
          <div className="content">{`${thousand(
            liveData[selectedNo].totalGold - liveData[oppSelectedNo].totalGold
          )}G`}</div>
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
