/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import { useState } from "react";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import styled from "@emotion/styled/macro";
import { t } from "i18next";
import { useSelector } from "react-redux";
import Arrow from "../../../../Components/Ui/Arrow";
import Avatar from "../../../../Components/Ui/Avatar";
import {
  borderRadiusStyle,
  colors,
  spacing,
  typoStyle,
} from "../../../../Styles/ui";

import {
  PolarGrid,
  RadarChart,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import CustomTick from "./CustomTick";
import { useTranslation } from "react-i18next";

/**
 *  플레이어 데이터 타입
 * interface PlayerData {
  NativeName: string; // 현지 이름
  assists: number; // 평균 어시스트
  deaths: number; // 평균 데스
  image: string; // 이미지
  kda: number; // 평균 kda
  kills: number; // 평균 킬
  name: string; // 선수닉네임
  player: string; //선수닉네임
  sbr: string; // preformance raate
  team: string; // 팀 이름
  total: number; // 총 경기 수
  wins: number; // 승리한 경기수
}
 */

const LeaguePlayerInfo = ({ playerData, index }) => {
  const data = [
    {
      subject: "데미지",
      A: 10,
      fullMark: 10,
    },
    {
      subject: "킬캐치",
      A: 6.6,
      fullMark: 10,
    },
    {
      subject: "초반교전",
      A: 6.6,
      fullMark: 10,
    },
    {
      subject: "라인전",
      A: 6.6,
      fullMark: 10,
    },
    {
      subject: "생존",
      A: 6.6,
      fullMark: 10,
    },
  ];
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);
  const {
    image,
    team,
    player,
    NativeName,
    total,
    wins,
    kills,
    deaths,
    assists,
    kda,
    sbr,
  } = playerData;
  const { t } = useTranslation();
  const imgUrl =
    image === "no-image"
      ? "Images/player_error_image.png"
      : `https://am-a.akamaihd.net/image?resize=90:&f=${image}`;

  const filters = useSelector((state) => state.FilterReducer);
  return (
    <div>
      <Container>
        {/* 정보 요약 헤더 */}
        <Header>
          {/* 랭킹 */}
          <div className="player__rank">{index + 1}</div>
          {/* 이미지 */}
          <div className="player__img">
            <img
              src={imgUrl}
              alt="PlayerImage"
              className="PlayerImage"
              onError={(e) => {
                e.target.src = "Images/player_error_image.png";
              }}
            />
          </div>

          {/* 팀, 선수이름 */}
          <div className="player__info">
            <div className="player__team">
              <Avatar
                src={
                  team.slice(-2) === ".C"
                    ? `Images/LCK_CL_LOGO/${team}.png`
                    : `Images/TeamLogo/${team}.png`
                }
                size={20}
                circle={false}
                alt={team}
              ></Avatar>
              <span>{team}</span>
            </div>
            <span className="player__name">{`${player} (${NativeName})`}</span>
          </div>

          {/* 경기수 */}
          <div className="player__games">
            <div>{t("league.playerStat.played")}</div>
            <span>{total}</span>
          </div>

          {/* 승리 횟수 */}
          <div className="player__wins">
            <div>{t("league.playerStat.winrate")}</div>
            <span>{wins}</span>
          </div>

          {/* KDA */}
          <div className="player__kda">
            <div>{t("league.playerStat.kda")}</div>
            <div className="kda">
              <span>{kills.toFixed(1)}</span>
              <em>/</em>
              <span>{deaths.toFixed(1)}</span>
              <em>/</em>
              <span>{assists.toFixed(1)}</span>
              <span className="rate">{`${kda.toFixed(2)}:1`}</span>
            </div>
          </div>

          {/* LPL 리그에서 SBR 데이터는 보여주지 않음 */}
          {filters.league.indexOf("lpl") === -1 ? (
            <div className="player__sbr">
              <div>{t("league.playerStat.sbr")}</div>
              <span>{sbr}</span>
            </div>
          ) : (
            <div></div>
          )}
        </Header>
        {/* 정보 상세 페이지 */}
        <AnimatePresence>
          {isOpen && (
            <Contents
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
            >
              {/* 데이터 박스 */}
              <DataBoxContainer>
                <DataBox>
                  <span className="data__title">
                    {t("league.playerStat.record")}
                  </span>
                  <p className="data__main">00.0%</p>
                  <span className="data__info">
                    9999{t("league.playerStat.games")}
                    &nbsp;9999{t("league.playerStat.win")}
                    &nbsp;9999{t("league.playerStat.lose")}
                  </span>
                </DataBox>
                <DataBox>
                  <span className="data__title">
                    {t("league.playerStat.kda")}
                  </span>
                  <p className="data__main">3.42:1</p>
                  <span className="data__info">
                    3.4/2.3/4.4
                    <em>(264 / 242 / 323)</em>
                  </span>
                </DataBox>
                <DataBox>
                  <span className="data__title">
                    {t("league.playerStat.career")}
                  </span>
                  <p className="data__main">00.0%</p>
                  <span className="data__info">
                    9999{t("league.playerStat.games")}
                    &nbsp;9999{t("league.playerStat.win")}
                    &nbsp;9999{t("league.playerStat.lose")}
                  </span>
                </DataBox>
                <DataBox>
                  <span className="data__title">
                    {t("league.playerStat.careerKda")}
                  </span>
                  <p className="data__main">3.42:1</p>
                  <span className="data__info">
                    3.4/2.3/4.4
                    <em>(264 / 242 / 323)</em>
                  </span>
                </DataBox>
              </DataBoxContainer>

              {/* 데이터 테이블 */}
              <DataBoxContainer>
                <DataTable>
                  <thead>
                    <tr>
                      <th colspan={2}>{t("league.playerStat.commonStat")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{t("league.playerStat.championPool")}</td>
                      <td>
                        6 &nbsp;
                        {t("")}({t("label.league")}
                        &nbsp;1
                        {t("league.playerStat.place")})
                      </td>
                    </tr>
                    <tr>
                      <td>{t("league.playerStat.firstPickRate")}</td>
                      <td>
                        6 &nbsp; ({t("label.league")}
                        &nbsp;1
                        {t("league.playerStat.place")})
                      </td>
                    </tr>
                    <tr>
                      <td>{t("league.playerStat.solokill")}</td>
                      <td>
                        6 &nbsp;
                        {t("")}({t("label.league")}
                        &nbsp;1
                        {t("league.playerStat.place")})
                      </td>
                    </tr>
                    <tr>
                      <td>{t("league.playerStat.dpm")}</td>
                      <td>
                        6 &nbsp;
                        {t("")}({t("label.league")}
                        &nbsp;1
                        {t("league.playerStat.place")})
                      </td>
                    </tr>
                    <tr>
                      <td>{t("league.playerStat.dtpm")}</td>
                      <td>
                        6 &nbsp;
                        {t("")}({t("label.league")}
                        &nbsp;1
                        {t("league.playerStat.place")})
                      </td>
                    </tr>
                    <tr>
                      <td>{t("league.playerStat.cs")}</td>
                      <td>
                        6 &nbsp;
                        {t("")}({t("label.league")}
                        &nbsp;1
                        {t("league.playerStat.place")})
                      </td>
                    </tr>
                  </tbody>
                </DataTable>
                <DataTable>
                  <thead>
                    <tr>
                      <th colspan={2}>{t("league.playerStat.PRStat")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{t("league.playerStat.pr")}</td>
                      <td>
                        6 &nbsp; ({t("label.league")}
                        &nbsp;1
                        {t("league.playerStat.place")})
                      </td>
                    </tr>
                    <tr>
                      <td>{t("league.playerStat.damage")}</td>
                      <td>
                        6 &nbsp; ({t("label.league")}
                        &nbsp;1
                        {t("league.playerStat.place")})
                      </td>
                    </tr>
                    <tr>
                      <td>{t("league.playerStat.survival")}</td>
                      <td>
                        6 &nbsp; ({t("label.league")}
                        &nbsp;1
                        {t("league.playerStat.place")})
                      </td>
                    </tr>
                    <tr>
                      <td>{t("league.playerStat.killCatch")}</td>
                      <td>
                        6 &nbsp; ({t("label.league")}
                        &nbsp;1
                        {t("league.playerStat.place")})
                      </td>
                    </tr>
                    <tr>
                      <td>{t("league.playerStat.lanePhase")}</td>
                      <td>
                        6 &nbsp; ({t("label.league")}
                        &nbsp;1
                        {t("league.playerStat.place")})
                      </td>
                    </tr>

                    <tr>
                      <td>{t("league.playerStat.earlyFight")}</td>
                      <td>
                        200.6 &nbsp; ({t("label.league")}
                        &nbsp;1
                        {t("league.playerStat.place")})
                      </td>
                    </tr>
                  </tbody>
                </DataTable>
                <Chart>
                  <RadarChart
                    outerRadius={90}
                    width={300}
                    height={250}
                    cy={"55%"}
                    data={data}
                    margin={{ left: 10 }}
                  >
                    <PolarGrid stroke="#484557" />
                    <PolarAngleAxis
                      tickSize={12}
                      dataKey="subject"
                      tick={(props) => CustomTick({ ...props, data })}
                    ></PolarAngleAxis>
                    <PolarRadiusAxis
                      axisLine={false}
                      tick={false}
                      tickCount={4}
                      ticks={[0, 2, 5, 10]}
                      domain={[0, 10]}
                    />

                    <Radar
                      name="Mike"
                      dataKey="A"
                      stroke="#8069e3"
                      fill="rgba(89,66,186,0.2)"
                      fillOpacity={0.6}
                    />
                  </RadarChart>
                </Chart>
              </DataBoxContainer>
            </Contents>
          )}
        </AnimatePresence>

        <Button onClick={toggleOpen}>
          <Arrow
            css={{
              transform: `translateY(5px) ${isOpen ? "rotate(180deg)" : ""}`,
            }}
            direction={"B"}
            size={5}
            color={colors.info}
          />
        </Button>
      </Container>
    </div>
  );
};
const Container = styled.div`
  position: relative;
  margin-top: 10px;
  background-color: ${colors.bg_select};
  border-radius: 15px;
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  width: calc(100% - 40px);
  height: 80px;

  ${typoStyle.table_head};

  /* 기본스타일 */
  > div {
    > div:first-of-type {
      ${spacing.marginB(1)}
    }
    > span {
      display: block;
      text-align: center;
      ${typoStyle.player_title};
    }
  }

  /* 랭킹 */
  .player__rank {
    width: 70px;
    ${typoStyle.player_id};
    text-align: center;
  }

  /* 이미지 */
  .player__img {
    width: 100px;
    height: 100%;
    ${spacing.marginR(4)};

    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  /* 선수정보  */
  .player__info {
    width: 255px;
    /* 팀 */
    .player__team {
      display: flex;

      align-items: center;
      > div {
        ${spacing.marginR(1)};
      }
    }
    /* 선수정보 - 선수이름 */
    .player__name {
      text-align: left;
      ${typoStyle.player_id};
      font-weight: bold;
    }
  }

  .player__wins,
  .player__games {
    width: 105px;
    text-align: center;
  }

  .player__kda {
    width: 250px;
    text-align: center;

    .kda {
      span {
        ${typoStyle.player_title};
      }
      em {
        ${spacing.paddingX(1)};
        color: #4b4758;
      }
      .rate {
        ${spacing.paddingL(2)}
        ${typoStyle.player_title};
        color: ${colors.badge_red};
        font-weight: bold;
      }
    }
  }

  .player__sbr {
    span {
      ${typoStyle.player_id};
      color: ${colors.badge_red};
    }
  }
`;

const Contents = styled(motion.div)`
  width: calc(100% - 40px);
  ${spacing.paddingX(5)};
  ${spacing.paddingY(5)};
`;
const DataBoxContainer = styled.div`
  display: flex;
  &:not(:last-of-type) {
    ${spacing.marginB(5)}
  }

  > div:not(:last-of-type) {
    ${spacing.marginR(5)}
  }

  > table {
    ${spacing.marginR(5)}
  }
`;

const DataBox = styled.div`
  ${typoStyle.contents_md};
  ${borderRadiusStyle[20]};
  ${spacing.padding(5)};
  background-color: ${colors.bg_box};
  flex: 1;
  flex-shrink: 1;
  min-width: 240px;

  span:first-of-type {
    display: block;
    ${spacing.marginB(1)};
  }
  p {
    ${typoStyle.percent};
  }
  span:last-of-type {
    em {
      ${spacing.paddingL(1)};
      ${typoStyle.info};
    }
  }
`;

const DataTable = styled.table`
  width: 373px;
  height: 230px;
  background-color: ${colors.bg_box};
  ${borderRadiusStyle[20]}
  overflow: hidden;

  thead {
    ${typoStyle.contents_title};
    th {
      padding: 15px;
    }
  }
  tbody {
    ${typoStyle.contents};
    tr {
      &:nth-of-type(2n + 1) {
        background-color: ${colors.bg_checkbox};
      }
      &:last-of-type {
        td {
          ${spacing.paddingB(2)};
        }
      }
      td {
        vertical-align: middle;
        ${spacing.paddingY(1)};
      }
      td:first-of-type {
        ${spacing.paddingL(5)};
        width: 220px;
      }
      td:nth-of-type(2) {
        ${spacing.paddingR(2)};
        text-align: left;
        width: calc(100% - 220px);
      }
    }
  }
`;

const Chart = styled.div`
  width: 230px;
  height: 100%;

  .white {
    color: white;
  }
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 40px;
  background-color: ${colors.bg_box};
  border-radius: 0 15px 15px 0;
`;

export default LeaguePlayerInfo;
