import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

function BoardToolTip({ title }) {
  //선수 상황판 툴팁
  const lang = useSelector((state) => state.LocaleReducer);
  const { t } = useTranslation();
  const tooltipContents = {
    CSD15: t("solo.comparison.CSD15"),
    XPD15: t("solo.comparison.XPD15"),
    GD15: t("solo.comparison.GD15"),
    상대진영와드확률:
      "15분까지 설치한 와드 중 상대 진영 내에 설치한 와드의 개수입니다",
    "Enemy Area Ward %":
      "Percentage of wards placed in the enemy area until 15 minutes",
    "타워 허깅시간 (초)":
      " 15분까지 라이너가 1차 타워 근처에 머무른 시간(초)입니다.",
    "Tower Hugging Time (sec)":
      "Time (in seconds) spent near the first tower until 15 minutes",
    솔로킬: "15분까지의 솔로킬 횟수입니다",
    "Solo Kill": "Solo kills until 15 minutes",
    "갱 회피 횟수": "15분까지 갱을 회피한 횟수입니다.",
    "Gank Evasion Count": "Percentage of ganks evaded until 15 minutes",
    "갱 횟수": "15분까지 갱을 시도한 횟수입니다",
    "Gank Counts": "Number of ganks until 15 minutes",
    "갱 성공률 (%)": "15분까지 갱을 성공시킨 비율입니다",
    "Gank Success %": "Percentage of successful ganks until 15 minutes",
    "플레이메이킹 횟수":
      "15분까지 이니시에이팅,  갱 성공,  갱 회피,  다이브,  솔로킬,  오브젝트 스틸 등을성공시킨 횟수입니다",
    "Playmaking Counts":
      "Number of successful initiations, ganks, gank evasions, dives, solo kills,and object skills until 15 minutes",
    "교전 합류 시간 (초)":
      "15분까지 교전이 발생한 경우 교전 합류까지 평균적으로 걸린 시간입니다. 교전에합류하지 않거나 본인이 교전을 연 경우는 카운트하지 않습니다.",
    "Time Till Joining Engagement":
      " Average time (sec) taken for a player to join an engagement until 15 minutes. It is not affected if the player does not join one or starts the engagement himself.",
    "분당 데미지": "분당 챔피언에게 가한 데미지를 뜻합니다.",
    DPM: "Damage Per Minute",
    DTPM: "Damage Taken Per Minute",
    "분당 받은 데미지": "분당 받은 데미지입니다",
    "KP %": "Kill Participation Ratio",
    "킬 관여율 (%)": "킬에 대한 관여율입니다",
    "듀오 인접률 (%)":
      "15분 중 원딜과 서포터가 일정 거리 내에 인접해 있는 시간의 비율입니다",
    "Duo Adjacency %":
      "Percentage of time (out of 15 minutes) where ADC and SUP stay close to each other",
    "비듀오 인접 시간 (초)":
      "15분 중 두 명 이상의 플레이어가 일정 거리 내에 인접해 있는 시간입니다. 원딜과 서포터가 인접한 경우는 포함되지 않습니다.",
    "Adjacency Time (sec)":
      "Time (in sec, out of 15 minutes) where two or more players stay close to each other. It is not affected when ADC and Support stay close.",
    "라인 서포트 횟수":
      "15분까지 특정 라인에 다른 아군 플레이어가 도움을 제공한 횟수입니다. 갱, 갱 압박,시야 컨트롤, 라인 같이 밀기 등이 포함됩니다.",
    "Lane Help Count":
      "Number of lane visits by a friendly player until 15 minutes. It may include ganks, gank pressure, vision control, lane push, etc.",
    "Lane Help Received (sec)":
      "Time (out of 15 minutes, in seconds) other players spent in this player's lane providing help. It may include gank, gank pressure, vision control, lane push, etc.",
    "서포트 받은 시간 (초)":
      "15분까지 해당 플레이어 라인에 다른 아군 플레이어가 도움을 제공한 시간(초)입니다. 갱, 갱 압박, 시야 컨트롤, 라인 같이 밀기 등이 포함됩니다.",
    "서포트 받은 시간+":
      "서포트 받은 시간을 해당 라인의 리그 평균치로 나눠준 값입니다. 리그 평균보다 50% 더 타 라이너의 서포트를 받았다면 150, 리그 평균보다 50% 서포트를 덜 받았다면 50으로 표시됩니다.",
    "Lane Help Received+":
      "Formula: Player's Lane Help Received divided by League & Position Average Lane Help Received. If a player received 50% more help from other laners, he would get 150. If he received 50% less help, he would get 50.",
    "교전 참여 횟수": "15분까지 발생한 교전에 참여한 횟수입니다",
    "Engagement Count":
      "Number of engagements the player joined until 15 minutes",
    "상대 정글 침입 시간 (초)": "15분 중 상대 정글에 머무른 시간(초)입니다.",
    "Enemy Area Entry Time (sec)":
      "Time (out of 15 minutes, in seconds) where a player stays within the enemy jungle",
    "위험 감수 성향 (%)":
      "15분 중 아군이 도와줄 수 있는 거리 내에 없을 경우에도 공격적으로 라인전에 임하는 시간의 비율 (%) 입니다. 수치가 높을 수록 라인전에서 주도권을 잡아 과감한 포지션을 잡을 확률이 높지만, 동시에 갱킹또는 로밍에 취약할 수 있습니다. ",
    "라인 시팅 지수":
      "15분까지 정글러의 동선이 해당 라인과 얼마나 가까웠는지를 나타냅니다. 해당 라인의리그 평균값을 100으로 두고, 평균보다 30% 가까운 동선을 택한 경우 130, 평균보다 20%먼 동선을 택한 경우 80점을 부여하는 방식입니다. ",
    "Lane Proximity Score":
      "A jungler’s proximity to a specific lane until 15 minutes. League average for each line is 100; a jungler whose pathing was 30% closer to the lane will get the score of 130; a jungler that were 20% farther will get 80.",
    "Risk Taking Tendency (%)":
      "Percentage of time (out of 15 minutes) where a laner stays within a vulnerable range from the enemy laner while there is no friendly player nearby. The higher the value, the more likely the player has lane priority while being more vulnerable to ganks and roams.",
    "탑 시팅 지수+":
      "정글러의 15분까지의 동선이 얼마나 해당 라인과 인접했는지를 보여주는 값입니다. 리그 평균보다 5% 더 해당 라인과 가까운 동선을 취했다면 105, 리그 평균보다 5% 더 해당 라인과 먼 동선을 취했다면 95로 표시됩니다.",
    "바텀 시팅 지수+":
      "정글러의 15분까지의 동선이 얼마나 해당 라인과 인접했는지를 보여주는 값입니다. 리그 평균보다 5% 더 해당 라인과 가까운 동선을 취했다면 105, 리그 평균보다 5% 더 해당 라인과 먼 동선을 취했다면 95로 표시됩니다.",
    "미드 시팅 지수+":
      "정글러의 15분까지의 동선이 얼마나 해당 라인과 인접했는지를 보여주는 값입니다. 리그 평균보다 5% 더 해당 라인과 가까운 동선을 취했다면 105, 리그 평균보다 5% 더 해당 라인과 먼 동선을 취했다면 95로 표시됩니다.",
    "Top Proximity Score+":
      "Formula: Jungler's average proximity to a specific lane until 15 minutes, divided by league average. If his overall pathing has been 5% closer to a specific lane than league average, he would get 105.",
    "Mid Proximity Score+":
      "Formula: Jungler's average proximity to a specific lane until 15 minutes, divided by league average. If his overall pathing has been 5% closer to a specific lane than league average, he would get 105.",
    "Bot Proximity Score+":
      "Formula: Jungler's average proximity to a specific lane until 15 minutes, divided by league average. If his overall pathing has been 5% closer to a specific lane than league average, he would get 105.",
  };
  const [content, setContent] = useState();

  useEffect(() => {
    handleContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  const handleContent = () => {
    if (tooltipContents[title]) {
      setContent(tooltipContents[title]);
    }
  };
  return (
    <ArrowWrapper>
      <BoardToolTipWrapper>
        <Title>{title}</Title>
        <Content>{content}</Content>
      </BoardToolTipWrapper>
      <Arrow />
    </ArrowWrapper>
  );
}

export default BoardToolTip;

const ArrowWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const BoardToolTipWrapper = styled.div`
  max-width: 232px;
  //min-height: 106px;
  background-color: #23212a;
  border-radius: 10px;
  padding: 12px 16px;
`;

const Title = styled.div`
  font-family: NotoSansKR, Apple SD Gothic Neo;
  font-size: 13px;
  font-weight: bold;
  text-align: left;
  color: #fff;
  margin-bottom: 5px;
`;

const Content = styled.div`
  font-family: NotoSansKR, Apple SD Gothic Neo;
  font-size: 13px;
  letter-spacing: -0.6px;
  text-align: left;
  color: #ffffff;
  line-height: 1.3;
`;

const Arrow = styled.div`
  border-top: 10px solid #1d1d1d;
  border-right: 10px solid transparent;
  border-left: 10px solid transparent;
  border-top-color: #1d1d1d;
  width: 15px;
`;
