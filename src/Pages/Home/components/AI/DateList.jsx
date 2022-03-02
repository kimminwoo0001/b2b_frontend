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
import { useState } from "react";
import Versus from "../../../../Components/Ui/Versus";
const DateList = ({ ...props }) => {
  const [isPast, setPast] = useState(true);
  return (
    <Container {...props}>
      {/* 날짜 */}
      <Date>
        <span>3.2</span>
        <span>수요일</span>
      </Date>

      {/* AI 예측결과 */}
      <GameInfo>
        {Array(4)
          .fill(1)
          .map((item, _) => (
            <Game key={"gameInfo" + _}>
              <Team className="right">
                <span>NS</span>
                <span>50.0%</span>
              </Team>
              <TeamLogo>
                <Avatar
                  src={"images/TeamLogo/AF.png"}
                  size={50}
                  circle={false}
                ></Avatar>
              </TeamLogo>
              {isPast ? (
                <>
                  <Side>
                    <Arrow direction={"L"} size={6} />
                  </Side>
                  <Score>2 : 0</Score>
                  <Side>
                    <Arrow direction={"R"} size={6} />
                  </Side>
                </>
              ) : (
                <VSContainer>
                  <Versus size={18} />
                </VSContainer>
              )}
              <TeamLogo>
                <Avatar
                  src={"images/TeamLogo/AF.png"}
                  size={50}
                  circle={false}
                ></Avatar>
              </TeamLogo>
              <Team className="left">
                <span>DK</span>
                <span>50.0%</span>
              </Team>
            </Game>
          ))}
      </GameInfo>
    </Container>
  );
};

const Container = styled.li`
  display: flex;
`;
const Date = styled.div`
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
`;
const Game = styled.li`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 76px;
  align-items: center;
  ${borderRadiusStyle[20]};
  ${spacing.marginB(2)};
  background-color: ${colors.bg_checkbox};
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
    text-align: right;
  }
  &.left {
    text-align: left;
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
