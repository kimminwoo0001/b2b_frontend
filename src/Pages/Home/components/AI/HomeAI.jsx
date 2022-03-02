/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import styled from "@emotion/styled/macro";
import {
  borderRadiusStyle,
  colors,
  spacing,
  transitionStyle,
  typoStyle,
  scrollbarStyle,
  buttonStyle,
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
      <h2>리그일정 및 AI승부 예측</h2>
      <ContentsContainer className="전체감싸기">
        <ButtonContainer className="왼쪽">
          {LEAGUE.map((tab, index) => (
            <ButtonLeague
              className={currentIndex === index ? "is-active" : ""}
              onClick={() => handleClick(index)}
            >
              <Avatar
                css={{ marginRight: 10 }}
                size={24}
                src={`images/ico-league-${tab.title.toLocaleLowerCase()}.png`}
                circle={false}
              />
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

  h2 {
    ${typoStyle.body_title};
    ${spacing.marginB(4)};
  }
`;
const ButtonContainer = styled.div`
  button:not(:last-of-type) {
    ${spacing.marginB(2)};
    ${spacing.marginR(5)};
  }
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

  &:hover,
  &.is-active {
    background-color: ${colors.point};
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
