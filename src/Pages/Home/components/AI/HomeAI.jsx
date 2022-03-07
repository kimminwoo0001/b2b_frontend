/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import { useEffect, useRef } from "react";
import styled from "@emotion/styled/macro";
import {
  borderRadiusStyle,
  colors,
  spacing,
  transitionStyle,
  typoStyle,
  scrollbarStyle,
} from "../../../../Styles/ui";
import { useTab } from "../../../../Hooks/useTab";
import Button from "../../../../Components/Ui/Button";
import Avatar from "../../../../Components/Ui/Avatar";
import DateList from "./DateList";
import dayjs from "dayjs";
import { useAsync } from "../../../../Hooks";
import { delay } from "../../../../lib/delay";
import Progress from "../../../../Components/Ui/Loading/Progress";

const LEAGUE = [
  { title: "LCK" },
  { title: "LEC" },
  { title: "LCS" },
  { title: "LPL" },
];

// mok data
const DATE_DATA = [
  {
    isComplete: true,
    league: "LCK",
    date: 1645994400000,
    scheduleList: [
      {
        time: 1646294400000,
        winner: "away",

        // 홈팀 정보
        homeTeam: {
          name: "t1",
        },
        homeScore: 2,
        homeWinRate: 58.96,

        // 원정팀 정보
        awayTeam: {
          name: "geng",
        },
        awayScore: 0,
        awayWinRate: 42.04,
      },
    ],
  },
  {
    isComplete: true,
    league: "LCK",
    date: 1646094400000,
    scheduleList: [
      {
        time: 1646294400000,
        winner: "home",

        // 홈팀 정보
        homeTeam: {
          name: "t1",
        },
        homeScore: 2,
        homeWinRate: 58.96,

        // 원정팀 정보
        awayTeam: {
          name: "geng",
        },
        awayScore: 0,
        awayWinRate: 42.04,
      },
      {
        time: 1646294400000,
        winner: "home",

        homeTeam: {
          name: "sb_v2",
        },
        homeScore: 2,
        homeWinRate: 58.96,

        awayTeam: {
          name: "bron",
        },
        awayScore: 0,
        awayWinRate: 42.04,
      },
    ],
  },
  {
    isComplete: false,
    league: "LCK",
    date: 1646294400000,
    scheduleList: [
      {
        time: 1646294400000,

        homeTeam: {
          name: "t1",
        },
        homeScore: 0,
        homeWinRate: 58.96,

        awayTeam: {
          name: "geng",
        },
        awayScore: 0,
        awayWinRate: 42.04,
      },
      {
        time: 1646294400000,

        homeTeam: {
          name: "t1",
        },
        homeScore: 0,
        homeWinRate: 58.96,

        awayTeam: {
          name: "geng",
        },
        awayScore: 0,
        awayWinRate: 42.04,
      },
    ],
  },
  {
    isComplete: false,
    league: "LCK",
    date: 1646394400000,
    scheduleList: [
      {
        time: 1646394400000,

        homeTeam: {
          name: "t1",
        },
        homeScore: 0,
        homeWinRate: 58.96,

        awayTeam: {
          name: "geng",
        },
        awayScore: 0,
        awayWinRate: 42.04,
      },
      {
        time: 1646294400000,

        homeTeam: {
          name: "t1",
        },
        homeScore: 0,
        homeWinRate: 58.96,

        awayTeam: {
          name: "geng",
        },
        awayScore: 0,
        awayWinRate: 42.04,
      },
    ],
  },
  {
    isComplete: false,
    league: "LCK",
    date: 1646494400000,
    scheduleList: [
      {
        title: "playoff",
        time: 1646294400000,

        homeTeam: {
          // name: "t1",
        },
        homeScore: 0,
        // homeWinRate: 58.96,

        awayTeam: {
          name: "geng",
        },
        awayScore: 0,
        awayWinRate: 42.04,
      },
      {
        time: 1646294400000,

        homeTeam: {
          name: "t1",
        },
        homeScore: 0,
        homeWinRate: 58.96,

        // awayTeam: {
        // name: "geng",
        // },
        awayScore: 0,
        // awayWinRate: 42.04,
      },
    ],
  },
];

const HomeAI = ({ ...props }) => {
  const scrollContainerRef = useRef(null);
  const dayListRef = useRef([]);
  const { currentIndex, setIndex, currentTab } = useTab(0, LEAGUE);
  const currentTabName = currentTab.title.toLowerCase();
  const getData = async (tabname) => {
    const result = await delay(2000, DATE_DATA);
    return result;
  };
  const [{ loading, data, error }, fetch] = useAsync(getData, [currentTabName]);
  const handleClick = (index) => setIndex(index);

  useEffect(() => {
    if (!data && !Array.isArray(data)) return;

    let index;
    data.some((item, i) => {
      index = i;
      return item.date - dayjs() >= 0;
    });

    const { top: containerTop } =
      scrollContainerRef.current.getBoundingClientRect();
    const { top: childTop } = dayListRef.current[index].getBoundingClientRect();

    scrollContainerRef.current.scrollTo({ top: childTop - containerTop });
  }, [data]);

  return (
    <Container {...props}>
      <Header>
        <h2>리그일정 및 AI승부 예측</h2>
        <Toolbox>
          <Avatar
            css={{ marginRight: 5 }}
            src={"/images/ico-notice-gy.png"}
            size={14}
          />
          <span>
            선택한 패치버전과 관계 없이 최근 2주간 플레이 정보만 보여줍니다.
          </span>
        </Toolbox>
      </Header>
      <ContentsContainer>
        {/* tab 메뉴  */}
        <TabContainer>
          {LEAGUE.map((tab, index) => (
            <ButtonLeague
              key={"tab" + tab.title}
              className={currentIndex === index ? "is-active" : ""}
              league={tab.title.toLocaleLowerCase()}
              onClick={() => handleClick(index)}
            >
              <LeagueLogo />
              {tab.title}
            </ButtonLeague>
          ))}
        </TabContainer>

        {/* 경기일정 컨텐츠 */}
        <Contents>
          <ScrollContainer ref={scrollContainerRef}>
            {loading ? (
              <ProgressContainer>
                <Progress text={"데이터를 받아오는 중입니다"} />
              </ProgressContainer>
            ) : (
              data?.map((gameList, index) => (
                <DateList
                  key={currentTabName + gameList.date}
                  ref={(el) => {
                    dayListRef.current[index] = el;
                  }}
                  list={gameList}
                />
              ))
            )}
          </ScrollContainer>
        </Contents>
      </ContentsContainer>
    </Container>
  );
};

const Container = styled.div`
  ${typoStyle.contents};
  width: 1210px;
  ${spacing.marginB(10)};
`;
const Header = styled.div`
  display: flex;
  h2 {
    ${typoStyle.body_title};
    ${spacing.marginR(2)};
  }
  ${spacing.marginB(4)};
`;
const Toolbox = styled.div`
  display: flex;
  align-items: center;
  span {
    ${typoStyle.info};
  }
`;
const TabContainer = styled.div`
  button:not(:last-of-type) {
    ${spacing.marginB(2)};
    ${spacing.marginR(5)};
  }
`;

const LeagueLogo = styled.div`
  width: 24px;
  height: 24px;
  margin-right: 5px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;

  ${transitionStyle.background}
`;
const ButtonLeague = styled(Button)`
  ${spacing.padding(5)};
  ${borderRadiusStyle[20]};
  ${typoStyle.contents_md};
  ${transitionStyle.background};
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 160px;
  background-color: ${colors.bg_box};
  cursor: pointer;

  ${LeagueLogo} {
    background-image: ${({ league }) =>
      `url(images/league/ico_league_${league}.png)`};
  }

  /* LCK 로고 관련 */
  &:nth-of-type(1) {
    ${LeagueLogo} {
      background-image: ${({ league }) =>
        `url(images/league/ico_league_${league}_hover.png)`};
    }
  }

  /* hover시 버튼색 변화 & LCS 로고 색변화 */
  &:hover,
  &.is-active {
    background-color: ${colors.point};

    &:nth-of-type(3) {
      ${LeagueLogo} {
        background-image: ${({ league }) =>
          `url(images/league/ico_league_${league}_hover.png)`};
      }
    }
  }
`;

const ContentsContainer = styled.article`
  display: flex;
`;

const Contents = styled.div`
  width: 100%;

  h3 {
    ${typoStyle.contents_title};
    ${spacing.paddingB(3)};
    border-bottom: 1px solid ${colors.border_light};
  }
`;
const ScrollContainer = styled.ul`
  height: 355px;
  ${scrollbarStyle.scroll_4}
`;

const ProgressContainer = styled.div`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
`;

export default HomeAI;
