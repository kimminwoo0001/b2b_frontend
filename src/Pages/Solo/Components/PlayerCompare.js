import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { API } from "../../config";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import axiosRequest from "../../../lib/axiosRequest";

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
  const GetPerformance = () => {
    const url = `${API}/api/player/comparisonRecord`;
    const params = {
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
    };
    axiosRequest(url, params, function (e) {
      setData(e.data[filters.player]);
      setOppData(e.data[filters.oppplayer]);
    });
    // dispatch(Loading(false));
  };

  return (
    // 디자인 변경으로 아래 코드로 대체
    // <PlayerCompareWrapper>
    //   <Red>
    //     <img
    //       src={`Images/TeamLogo/${filters.team}.png`}
    //       alt="team logo"
    //       width="54px"
    //       height="54px"
    //     />

    //     <div className="NameContainer">
    //       <span className="RealName">{data?.playerInfo.ID}</span>
    //       <span className="NickName">
    //         {lang === "kr"
    //           ? data?.playerInfo.NativeName
    //           : data?.playerInfo.Name}
    //       </span>
    //     </div>
    //     <img
    //       className="PositionIcon"
    //       src={`Images/ico-position-${filters.position}.png`}
    //       width="28.6px"
    //       height="28.6px"
    //       alt="PositionIcon"
    //     />
    //     <div className="RedSidePlayer">
    //       <img
    //         src={data?.playerInfo.Image}
    //         width="212px"
    //         height="168px"
    //         alt="PlayerIcon"
    //         onError={(e) => {
    //           e.target.src = "Images/player_error_image.png";
    //         }}
    //       />
    //     </div>
    //     <div className="AverageBox">
    //       <div className="PerformanceTitle">
    //         {t("solo.comparison.avgScore")}
    //       </div>
    //       <PerformanceValue
    //         color={data?.sbrAvg < oppData?.sbrAvg}
    //         className="PerformanceValue"
    //       >
    //         {data?.sbrAvg.toFixed(1)}
    //       </PerformanceValue>
    //     </div>
    //     <div className="AverageBoxTwo">
    //       <div className="PerformanceTitle">
    //         {t("solo.comparison.bestScore")}
    //       </div>
    //       <PerformanceValue
    //         color={data?.sbrMax < oppData?.sbrMax}
    //         className="PerformanceValue"
    //       >
    //         {data?.sbrMax.toFixed(1)}
    //       </PerformanceValue>
    //     </div>
    //   </Red>
    //   <div className="Vs">VS</div>
    //   <Blue>
    //     <img
    //       src={`Images/TeamLogo/${filters.oppteam}.png`}
    //       alt="oppteam logo"
    //       width="54px"
    //       height="54px"
    //     />
    //     <div className="NameContainer">
    //       <span className="RealName">{oppData?.playerInfo.ID}</span>
    //       <span className="NickName">
    //         {lang === "kr"
    //           ? oppData?.playerInfo.NativeName
    //           : oppData?.playerInfo.Name}
    //       </span>
    //     </div>
    //     <img
    //       className="PositionIcon"
    //       src={`Images/ico-position-${filters.position}.png`}
    //       alt="PositionIcon"
    //       width="28.6px"
    //       height="28.6px"
    //     />
    //     <div className="BlueSidePlayer">
    //       <img
    //         src={oppData?.playerInfo.Image}
    //         width="212px"
    //         height="168px"
    //         alt="PlayerIcon"
    //         onError={(e) => {
    //           e.target.src = "Images/player_error_image.png";
    //         }}
    //       />
    //     </div>
    //     <div className="AverageBox">
    //       <div className="PerformanceTitle">
    //         {t("solo.comparison.avgScore")}
    //       </div>
    //       <PerformanceValue2
    //         color={data?.sbrAvg > oppData?.sbrAvg}
    //         className="PerformanceValueBlue"
    //       >
    //         {oppData?.sbrAvg.toFixed(1)}
    //       </PerformanceValue2>
    //     </div>
    //     <div className="AverageBoxTwo">
    //       <div className="PerformanceTitle">
    //         {t("solo.comparison.bestScore")}
    //       </div>
    //       <PerformanceValue2
    //         color={data?.sbrMax > oppData?.sbrMax}
    //         className="PerformanceValueBlue"
    //       >
    //         {oppData?.sbrMax.toFixed(1)}
    //       </PerformanceValue2>
    //     </div>
    //   </Blue>
    // </PlayerCompareWrapper>
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
        <PerformanceValueAvg color={data?.sbrAvg < oppData?.sbrAvg}>
          {data?.sbrAvg.toFixed(1)}
        </PerformanceValueAvg>
      </div>
      <div className="AverageBoxTwo">
        <div className="PerformanceTitle">{t("solo.comparison.bestScore")}</div>
        <PerformanceValueMax>{data?.sbrMax.toFixed(1)}</PerformanceValueMax>
      </div>
      <div className="Vs">VS</div>
      <div className="AverageBox">
        <div className="PerformanceTitle">{t("solo.comparison.avgScore")}</div>
        <PerformanceValueAvg color={data?.sbrAvg > oppData?.sbrAvg}>
          {oppData?.sbrAvg.toFixed(1)}
        </PerformanceValueAvg>
      </div>
      <div className="AverageBoxTwo">
        <div className="PerformanceTitle">{t("solo.comparison.bestScore")}</div>
        <PerformanceValueMax>{oppData?.sbrMax.toFixed(1)}</PerformanceValueMax>
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

// const PlayerCompareWrapper = styled.div`
//   display: flex;
//   justify-content: space-around;
//   align-items: center;
//   margin-top: 28px;
//   width: 100%;
//   /* width: 760px; */
//   background-color: #16151a;

//   .NameContainer {
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//   }

//   .NickName {
//     font-family: NotoSansKR, Apple SD Gothic Neo;
//     font-size: 20px;
//     color: rgb(132, 129, 142);
//     margin-bottom: 10px;
//     margin-top: 20px;
//   }
//   .RealName {
//     font-family: NotoSansKR, Apple SD Gothic Neo;
//     font-size: 30px;
//     font-weight: bold;
//     letter-spacing: -0.75px;
//     color: rgb(255, 255, 255);
//   }

//   .PositionIcon {
//     margin-top: 10px;
//   }
//   .PerformanceTitle {
//     font-family: NotoSansKR, Apple SD Gothic Neo;
//     font-size: 20px;
//     font-weight: bold;
//     color: rgb(132, 129, 142);
//     margin-right: 10px;
//     margin-top: 10px;
//     text-align: center;
//   }

//   .AverageBox {
//     display: flex;
//     :nth-child(7) {
//       margin-right: 35px;
//     }
//     margin-top: 10px;
//   }

//   .AverageBoxTwo {
//     display: flex;
//   }

//   .Vs {
//     font-family: Poppins;
//     font-size: 30px;
//     font-weight: bold;
//     text-align: left;
//     color: rgb(107, 105, 121);
//     margin: 0 55px;
//   }
// `;

// const Red = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   width: 100%;
//   /* justify-content: space-around; */
// `;
// const Blue = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   width: 100%;
// `;

const PerformanceValueAvg = styled.div`
  font-family: "Spoqa Han Sans";
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  margin-top: 10px;
  color: ${(props) => (props.color ? "#fff" : "#f04545")};
`;

const PerformanceValueMax = styled.div`
  font-family: "Spoqa Han Sans";
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  color: #fff;
  margin-top: 10px;
`;

const PlayerCompareWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 28px;
  width: 100%;
  border-radius: 20px;
  background-color: #23212a;
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
    font-family: "Spoqa Han Sans";
    font-size: 13px;
    color: rgb(132, 129, 142);
    margin-bottom: 3px;
  }
  .RealName {
    font-family: "Spoqa Han Sans";
    font-size: 15px;
    font-weight: bold;
    letter-spacing: -0.75px;
    color: rgb(255, 255, 255);
  }
  .PerformanceTitle {
    width: 150px;
    font-family: "Spoqa Han Sans";
    font-size: 16px;
    font-weight: bold;
    letter-spacing: -0.6px;
    text-align: left;
    color: rgb(132, 129, 142);
    margin-bottom: 4.7px;
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
    font-family: "Spoqa Han Sans";
    font-size: 30px;
    font-weight: bold;
    text-align: left;
    color: rgb(107, 105, 121);
    margin: 0 55px;
  }
`;
