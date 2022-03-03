/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import { useRef } from "react";
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

const LEAGUE = [
  { title: "LCK" },
  { title: "LEC" },
  { title: "LCS" },
  { title: "LPL" },
];

const HomeAI = ({ ...props }) => {
  const { currentIndex, setIndex } = useTab(0, LEAGUE);

  const handleClick = (index) => setIndex(index);

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
      <ContentsContainer className="전체감싸기">
        <ButtonContainer className="왼쪽">
          {LEAGUE.map((tab, index) => (
            <ButtonLeague
              className={currentIndex === index ? "is-active" : ""}
              league={tab.title.toLocaleLowerCase()}
              onClick={() => handleClick(index)}
            >
              <LeagueLogo />
              {tab.title}
            </ButtonLeague>
          ))}
        </ButtonContainer>

        <Contents className="오른쪽">
          <h3>이번주일정</h3>
          <ScrollContainer className="스크롤컨테이너">
            {Array(2)
              .fill(1)
              .map((item, _) => (
                <DateList key={"dataetat" + _} />
              ))}
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
const ButtonContainer = styled.div`
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

export default HomeAI;
