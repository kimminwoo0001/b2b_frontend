/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import styled from "@emotion/styled/macro";
import Avatar from "../../../../Components/Ui/Avatar";
import {
  spacing,
  typoStyle,
  colors,
  borderRadiusStyle,
} from "../../../../Styles/ui";
import Arrow from "../../../../Components/Ui/Arrow";

import Versus from "../../../../Components/Ui/Versus";
import dayjs, { Dayjs } from "dayjs";
import ko from "dayjs/locale/ko";
import { useSelector } from "react-redux";
import { forwardRef } from "react";

const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");
dayjs.extend(utc);
dayjs.extend(timezone);

const DateList = forwardRef(({ list, ...props }, ref) => {
  const { isComplete, date, scheduleList } = list;

  // 경기 날짜 관련
  const locale = useSelector((state) => state.LocaleReducer);
  const gameDate =
    locale === "ko"
      ? dayjs(date).tz(dayjs.tz.guess()).locale(ko)
      : dayjs(date).tz(dayjs.tz.guess());
  const isToday = dayjs(date).format("YYYYMMDD") === dayjs().format("YYYYMMDD");
  return (
    <Container ref={ref} {...props}>
      {/* 날짜 */}
      <DateContainer>
        <span>{gameDate.format(`M.D`)}</span>
        <span>
          {gameDate.format("dddd")} {isToday ? "(오늘)" : ""}
        </span>
      </DateContainer>

      {/* AI 예측결과 */}
      <GameInfo className={isComplete ? "is-complete" : ""}>
        {scheduleList.map((games, _) => {
          const {
            winner,
            homeTeam,
            homeScore,
            homeWinRate,
            awayTeam,
            awayScore,
            awayWinRate,
            title,
          } = games;

          return (
            <GameList key={"gameInfo" + _}>
              {title && <Label>{title}</Label>}
              <Team className="right">
                <span>
                  {homeTeam?.name ? `${homeTeam.name.toUpperCase()}` : "TBD"}
                </span>
                <span>{homeWinRate ? `${homeWinRate.toFixed(1)} %` : ""}</span>
              </Team>
              <TeamLogo>
                <Avatar
                  src={`images/team/ico_team_${homeTeam?.name}.png`}
                  alt={homeTeam?.name ?? "TBD"}
                  onError={(e) =>
                    (e.target.src = `images/team/ico_team_tbd.png`)
                  }
                  size={50}
                  circle={false}
                ></Avatar>
              </TeamLogo>
              {isComplete ? (
                // 경기 종료시 보여주는 UI
                <>
                  <Side>
                    {winner === "home" && <Arrow direction={"L"} size={6} />}
                  </Side>
                  <Score>
                    {homeScore} : {awayScore}
                  </Score>
                  <Side>
                    {winner === "away" && <Arrow direction={"R"} size={6} />}
                  </Side>
                </>
              ) : (
                // 경기 시작전 보여주는 UI
                <VSContainer>
                  <Versus size={18} />
                </VSContainer>
              )}
              <TeamLogo>
                <Avatar
                  src={`images/team/ico_team_${awayTeam?.name}.png`}
                  size={50}
                  onError={(e) =>
                    (e.target.src = `images/team/ico_team_tbd.png`)
                  }
                  alt={awayTeam?.name ?? "TBD"}
                  circle={false}
                ></Avatar>
              </TeamLogo>
              <Team className="left">
                <span>
                  {awayTeam?.name ? `${awayTeam.name.toUpperCase()}` : "TBD"}
                </span>
                <span>{awayWinRate ? `${awayWinRate.toFixed(1)} %` : ""}</span>
              </Team>
            </GameList>
          );
        })}
      </GameInfo>
    </Container>
  );
});

const Container = styled.li`
  display: flex;
  ${spacing.paddingY(4)};
  border-bottom: 1px solid ${colors.bg_checkbox};
`;
const DateContainer = styled.div`
  flex: 0 0 90px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  width: 90px;
  ${spacing.paddingY(5)};

  span:first-of-type {
    display: block;
    ${typoStyle.player_id};
  }

  span:last-of-type {
    display: block;
    font-size: 12px;
  }
`;
const GameInfo = styled.ul`
  flex: 1 0;

  &.is-complete {
    > li {
      background-color: ${colors.bg_box};
    }
  }
`;
const GameList = styled.li`
  position: relative;
  &:not(:last-of-type) {
    ${spacing.marginB(2)};
  }
  display: flex;
  justify-content: center;
  width: 100%;
  height: 76px;
  align-items: center;
  ${borderRadiusStyle[20]};
  background-color: ${colors.bg_checkbox};
`;

const Label = styled.div`
  position: absolute;
  left: 30px;
  background-color: ${colors.point};
  ${spacing.paddingY(0.5)}
  ${spacing.paddingX(3)}
  ${borderRadiusStyle.full}
  ${typoStyle.badge}
`;

const VSContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 130px;
`;
const Team = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 110px;
  height: 100%;

  &.right {
    align-items: flex-end;
  }
  &.left {
    align-items: flex-start;
  }

  span {
    &:first-of-type {
      ${typoStyle.body_title};
    }
    &:last-of-type {
      font-size: 15px;
    }
  }
`;
const TeamLogo = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  text-align: center;
`;
const Score = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90px;
  height: 100%;
  text-align: center;
  font-size: 18px;
  font-weight: 700;
`;
const Side = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 100%;
  text-align: center;
`;

export default DateList;