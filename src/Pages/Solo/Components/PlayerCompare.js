import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import axios from "axios";
import { API } from "../../config";
import { useTranslation } from "react-i18next";
import qs from "qs";
import { useSelector } from "react-redux";
import checkSeason from "../../../lib/checkSeason";

function PlayerCompare() {
  const filters = useSelector((state) => state.FilterReducer);
  const lang = useSelector((state) => state.LocaleReducer);
  const user = useSelector((state) => state.UserReducer);
  const [data, setData] = useState();
  const [oppData, setOppData] = useState();
  const { t } = useTranslation();

  useEffect(() => {
    GetPerformance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  //팀 필터 fetch 함수
  const GetPerformance = async () => {
    //
    const result = await axios.request({
      method: "GET",
      url: `${API}/api/player/comparisonRecord`,
      params: {
        league: filters.league,
        year: filters.year,
        season: filters.season,
        patch: filters.patch,
        team: filters.team,
        player: filters.player,
        oppteam: filters.oppteam,
        oppplayer: filters.oppplayer,
        token: user.token,
        id: user.id,
      },
      paramsSerializer: (params) => {
        return qs.stringify(params, { arrayFormat: "repeat" });
      }
    });

    setData(result.data[filters.player]);
    setOppData(result.data[filters.oppplayer]);
    // dispatch(Loading(false));
  };

  return (
    <PlayerCompareWrapper>
      <div className="RedSidePlayer">
        <img
          src={data?.playerInfo.Image}
          width="94px"
          height="74px"
          alt="PlayerIcon"
          onError={(e) => {
            e.target.src = "Images/player_error_image.png";
          }}
        />
      </div>
      <img
        className="PositionIcon"
        src={`Images/ico-position-${filters.position}.png`}
        width="28.6px"
        height="28.6px"
        alt="PositionIcon"
      />
      <div className="NameContainer">
        <span className="NickName">
          {lang === "kr" ? data?.playerInfo.NativeName : data?.playerInfo.Name}
        </span>
        <span className="RealName">{data?.playerInfo.ID}</span>
      </div>
      <div className="AverageBox">
        <div className="PerformanceTitle">{t("solo.comparison.avgScore")}</div>
        <PerformanceValue
          color={data?.sbrAvg < oppData?.sbrAvg}
          className="PerformanceValue"
        >
          {data?.sbrAvg.toFixed(1)}
        </PerformanceValue>
      </div>
      <div className="AverageBoxTwo">
        <div className="PerformanceTitle">{t("solo.comparison.bestScore")}</div>
        <PerformanceValue
          color={data?.sbrMax < oppData?.sbrMax}
          className="PerformanceValue"
        >
          {data?.sbrMax.toFixed(1)}
        </PerformanceValue>
      </div>
      <div className="Vs">VS</div>
      <div className="AverageBox">
        <div className="PerformanceTitle">{t("solo.comparison.avgScore")}</div>
        <PerformanceValue2
          color={data?.sbrAvg > oppData?.sbrAvg}
          className="PerformanceValueBlue"
        >
          {oppData?.sbrAvg.toFixed(1)}
        </PerformanceValue2>
      </div>
      <div className="AverageBoxTwo">
        <div className="PerformanceTitle">{t("solo.comparison.bestScore")}</div>
        <PerformanceValue2
          color={data?.sbrMax > oppData?.sbrMax}
          className="PerformanceValueBlue"
        >
          {oppData?.sbrMax.toFixed(1)}
        </PerformanceValue2>
      </div>
      <div className="NameContainerBlue">
        <span className="NickName">
          {lang === "kr"
            ? oppData?.playerInfo.NativeName
            : oppData?.playerInfo.Name}
        </span>
        <span className="RealName">{oppData?.playerInfo.ID}</span>
      </div>
      <img
        className="PositionIcon"
        src={`Images/ico-position-${filters.position}.png`}
        alt="PositionIcon"
        width="28.6px"
        height="28.6px"
      />
      <div className="BlueSidePlayer">
        <img
          src={oppData?.playerInfo.Image}
          width="94px"
          height="74px"
          alt="PlayerIcon"
          onError={(e) => {
            e.target.src = "Images/player_error_image.png";
          }}
        />
      </div>
    </PlayerCompareWrapper>
  );
}

export default PlayerCompare;

const PlayerCompareWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 28px;
  width: 100%;
  border: solid 1px rgb(58, 55, 69);
  background-color: rgb(47, 45, 56);
  background-image: url("Images/full-gradient.png");
  background-repeat: no-repeat;
  .RedSidePlayer {
    width: 105px;
    height: 77px;
  }
  .BlueSidePlayer {
    display: flex;
    justify-content: flex-end;
    width: 105px;
    height: 77px;
  }

  .NameContainer {
    display: flex;
    width: 140px;
    flex-direction: column;
    margin-left: 9.4px;
  }
  .NameContainerBlue {
    display: flex;
    width: 140px;
    flex-direction: column;
    margin-right: 9.4px;
    text-align: right;
  }
  .NickName {
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 11px;
    color: rgb(132, 129, 142);
    margin-bottom: 3px;
  }
  .RealName {
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 15px;
    font-weight: bold;
    letter-spacing: -0.75px;
    color: rgb(255, 255, 255);
  }
  .PerformanceTitle {
    /* width: 80px; */
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 12px;
    font-weight: bold;
    letter-spacing: -0.6px;
    text-align: left;
    color: rgb(132, 129, 142);
    margin-bottom: 4.7px;
    text-align: center;
  }

  .AverageBox {
    width: 80px;
    :nth-child(7) {
      margin-right: 35px;
    }
  }
  .AverageBoxTwo {
    width: 80px;

    :nth-of-type(4) {
      margin-left: 35px;
    }
  }
  .Vs {
    font-family: Poppins;
    font-size: 30px;
    font-weight: bold;
    text-align: left;
    color: rgb(107, 105, 121);
    margin: 0 55px;
  }
`;

const PerformanceValue = styled.div`
  font-family: NotoSansKR, Apple SD Gothic Neo;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  color: rgb(240, 69, 69);

  .PerformanceValueBlue {
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    color: #0075bf;
  }
  ${(props) =>
    props.color &&
    css`
      color: #6b6979;
    `}
`;

const PerformanceValue2 = styled.div`
  font-family: NotoSansKR, Apple SD Gothic Neo;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  color: #0075bf;
  ${(props) =>
    props.color &&
    css`
      color: #6b6979;
    `}
`;
