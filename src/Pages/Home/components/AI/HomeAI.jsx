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
import Progress from "../../../../Components/Ui/Loading/Progress";
import axios from "axios";
import { API } from "../../../config";
import { useSelector } from "react-redux";
import NotFound from "../../../../Components/Ui/Error/NotFound";

// dayjs 확장
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");
dayjs.extend(utc);
dayjs.extend(timezone);

const LEAGUE = [
  { title: "LCK" },
  { title: "LEC" },
  { title: "LCS" },
  { title: "LPL" },
];

const getRecentDateIndex = (data) => {
  let index;
  const now = dayjs().tz(dayjs.tz.guess()).format("YYYY-MM-DD");

  data.some((daylist, i) => {
    index = i;
    const gameDate = dayjs(daylist[0].time).format("YYYY-MM-DD");
    return dayjs(gameDate).unix() - dayjs(now).unix() >= 0;
  });

  return index;
};

const HomeAI = ({ ...props }) => {
  const scrollContainerRef = useRef(null);
  const dayListRef = useRef([]);
  const { currentIndex, setIndex, currentTab } = useTab(0, LEAGUE);
  const currentTabName = currentTab.title.toLowerCase();
  const user = useSelector((state) => state.UserReducer);

  const getData = async (tabname) => {
    if (!tabname) return;
    const url = `${API}/lolapi/home/schedule`;
    const params = {
      league: tabname,
      token: user.token,
      id: user.id,
    };

    const result = await axios({
      method: "post",
      url,
      data: params,
      headers: { "content-type": "application/x-www-form-urlencoded" },
    });

    if (result.data.status === "201") {
      return result.data.response;
    } else {
      throw result.data.response;
    }
  };

  const [{ loading, data, error }, fetch] = useAsync(
    () => getData(currentTabName),
    [currentTabName]
  );

  const convertedDate = data?.map((schedule) => {
    schedule.time = dayjs(schedule.time)
      .utc(true)
      .tz(dayjs.tz.guess())
      .format("YYYY-MM-DD hh:mm:ss");

    return schedule;
  });

  const dateObj = convertedDate?.reduce((a, b) => {
    if (a.hasOwnProperty(b.time.slice(0, 10))) {
      a[b.time.slice(0, 10)].push(b);
    } else {
      a[b.time.slice(0, 10)] = [b];
    }
    return a;
  }, {});

  // handler
  const handleClick = (index) => setIndex(index);

  // 오늘 or 다음경기 찾아서 스크롤
  useEffect(() => {
    if (!dateObj || !Array.isArray(Object.values(dateObj))) return;
    const index = getRecentDateIndex(Object.values(dateObj));
    const { top: containerTop } =
      scrollContainerRef.current.getBoundingClientRect();
    const { top: childTop } = dayListRef.current[index].getBoundingClientRect();
    scrollContainerRef.current.scrollTo({ top: childTop - containerTop });
  }, [dateObj]);

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
            ) : error ? (
              <NotFound
                css={{ height: "100%" }}
                text="정보를 받아오지 못 했습니다"
              />
            ) : (
              dateObj &&
              Object.values(dateObj)?.map((scheduleList, index) => (
                <DateList
                  key={currentTabName + index}
                  ref={(el) => {
                    dayListRef.current[index] = el;
                  }}
                  list={scheduleList}
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

  &.is-active {
    background-color: ${colors.point};

    &:nth-of-type(3) {
      ${LeagueLogo} {
        background-image: ${({ league }) =>
          `url(images/league/ico_league_${league}_hover.png)`};
      }
    }
  }

  &:hover {
    background-color: ${colors.bg_box_hover};

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
