import React, { memo } from 'react'
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const LeagueRank = memo(({ imgSrc, imgAlt, leagueName, leagueDataset }) => {
  const { t } = useTranslation();

  return (
    <LeagueList>
      {/* LEC 테이블 */}
      <LeagueNav>
        <img src={imgSrc} alt={imgAlt}></img>
        <div className="LeagueName">{leagueName}</div>
      </LeagueNav>
      <HomeTable>
        <colgroup>
          <col width="11%" />
          <col width="45%" />
          <col width="8.5%" />
          <col width="8.5%" />
          <col width="13.5%" />
          <col width="13.5%" />
        </colgroup>
        <thead>
          <tr>
            <th className="Rank">{t("home.rank")}</th>
            <th className="TeamName">{t("home.teamName")}</th>
            {/* <th className="playoff"></th> */}
            <th className="Win">{t("home.win")}</th>
            <th className="Lose">{t("home.lose")}</th>
            <th className="WinRate">{t("home.winrate")}</th>
            <th className="Points">{t("home.points")}</th>
          </tr>
        </thead>
        <tbody>
          {leagueDataset?.map((leagueData, index) => {
            return (
              <tr key={index}>
                <td className="Rank">{leagueData.Place}</td>
                <td className="TeamName">
                  <div className="TeamWrapper">
                    <img
                      src={`Images/HomeLogo/${leagueData.Team}.png`}
                      alt="teamlogo"
                    ></img>
                    <div>{leagueData.Team}</div>
                  </div>
                </td>
                {/* <td>
                        {leagueData.PO === true ? <PlayOff>P.O</PlayOff> : ""}
                        {leagueData.PL === true ? <PL>P.L</PL> : ""}
                      </td> */}
                <td className="Win">{leagueData.WinSeries}</td>
                <td className="Lose">{leagueData.LossSeries}</td>
                <td className="WinRate">{`${leagueData.WinRate.toFixed(
                  1
                )}%`}</td>
                <td className="Points">{leagueData.PointsTiebreaker}</td>
              </tr>
            );
          })}
        </tbody>
      </HomeTable>
    </LeagueList>
  )
})

export default LeagueRank;

const LeagueList = styled.div`
  margin: 0 20px 24.5px 0;
  width: 594px;
  // height: 432px; 
  border: solid 1px #3a3745;
  background-color: #2f2d38;
  border-radius: 20px;
`;

const HomeTable = styled.table`
  width: 100%;
  > thead > tr {
    width: 100%;
    height: 28px;
    background-color: #3a3745;
    th {
      font-family: NotoSansKR, Apple SD Gothic Neo;
      font-size: 12px;
      font-weight: bold;
      text-align: center;
      color: #817e90;
      vertical-align: middle;
    }
  }
  > tbody > tr {
    :nth-child(1) {
      background-color: #3e2222;
    }

    height: 36px;
    width: 100%;
    border-top: 1px solid #3a3745;
    > .WinRate {
      color: #f04545;
    }
    > .TeamName {
      text-align: left;
    }
    .TeamWrapper {
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    img {
      width: 20px;
      height: 20px;
      margin-right: 13.2px;
    }
    td {
      font-family: SpoqaHanSansNeo;
      font-size: 15px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: 2.4;
      letter-spacing: normal;
      color: #fff;
      text-align: center;
      color: #ffffff;
      vertical-align: middle;
      width: 50px;
    }
  }
`;

const LeagueNav = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #23212a;
  height: 54px;
  img {
    width: 24px;
    height: 24px;
    margin: 0 10px 0 15px;
  }
  div {
    width: 29px;
    height: 19px;
    font-family: SpoqaHanSansNeo;
    font-size: 16px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.1;
    letter-spacing: normal;
    text-align: left;
    color: #fff;
  }
`;