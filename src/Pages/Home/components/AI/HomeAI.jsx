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
import axios from "axios";
import { API } from "../../../config";
import { useSelector } from "react-redux";
import NotFound from "../../../../Components/Ui/Error/NotFound";

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

const HomeAI = ({ ...props }) => {
  const scrollContainerRef = useRef(null);
  const dayListRef = useRef([]);
  const { currentIndex, setIndex, currentTab } = useTab(0, LEAGUE);
  const currentTabName = currentTab.title.toLowerCase();
  const user = useSelector((state) => state.UserReducer);
  const now = dayjs().tz(dayjs.tz.guess()).format("YYYY-MM-DD");

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
    console.log(result.data.response);
    return result.data.response;
  };

  const [{ loading, data, error }, fetch] = useAsync(
    () => getData(currentTabName),
    [currentTabName]
  );

  const handleClick = (index) => setIndex(index);

  useEffect(() => {
    if (!data && !Array.isArray(data)) return;

    let index;
    data.some((daylist, i) => {
      index = i;
      console.log(daylist.unix_date - dayjs(now).unix(), i);
      return daylist.unix_date - dayjs(now).unix() >= 0;
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
            ) : error ? (
              <NotFound text="정보를 받아오지 못 했습니다" />
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
