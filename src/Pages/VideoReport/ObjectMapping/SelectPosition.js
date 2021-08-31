import React from "react";
import styled, { css } from "styled-components";
import { useTranslation } from "react-i18next";
function SelectPosition({ position, setPosition }) {
  //오브젝트별 동선 => 포지션 설정
  const { t } = useTranslation();
  const pushPosition = (e) => {
    const { value } = e.target;

    if (position.length === 5 && value !== "all") {
      setPosition(position.filter((e) => e === value));
    }
    if (!position.find((e) => e === value) && value !== "all") {
      setPosition([...position.filter((e) => e !== ""), value]);
    }
    if (position.find((e) => e === value) && position.length !== 5) {
      setPosition(position.filter((e) => e !== value));
    }
    if (value === "all") {
      setPosition(["top", "jng", "mid", "bot", "sup"]);
    }
    console.log(position);
  };

  return (
    <SelectPositionContainer>
      <InfoNav>
        <img src="Images/ico-notice-gy.png" alt="alert" />
        <span>{t("video.object.position")}</span>
      </InfoNav>
      <PositionButtons>
        <PositionButton
          type="button"
          value="all"
          onClick={pushPosition}
          isActive={position.length === 5}
        >
          All
        </PositionButton>
        <PositionButton
          type="button"
          value="top"
          onClick={pushPosition}
          style={{
            backgroundImage: `url(${"Images/ico-position-top.png"})`,
            backgroundSize: "18px 18px",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
          isActive={position.find((e) => e === "top") && position.length !== 5}
        ></PositionButton>
        <PositionButton
          type="button"
          value="jng"
          onClick={pushPosition}
          style={{
            backgroundImage: `url(${"Images/ico-position-jng.png"})`,
            backgroundSize: "18px 18px",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
          isActive={position.find((e) => e === "jng") && position.length !== 5}
        ></PositionButton>
        <PositionButton
          type="button"
          value="mid"
          onClick={pushPosition}
          style={{
            backgroundImage: `url(${"Images/ico-position-mid.png"})`,
            backgroundSize: "18px 18px",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
          isActive={position.find((e) => e === "mid") && position.length !== 5}
        ></PositionButton>
        <PositionButton
          type="button"
          value="bot"
          onClick={pushPosition}
          style={{
            backgroundImage: `url(${"Images/ico-position-bot.png"})`,
            backgroundSize: "18px 18px",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
          isActive={position.find((e) => e === "bot") && position.length !== 5}
        ></PositionButton>
        <PositionButton
          type="button"
          value="sup"
          onClick={pushPosition}
          style={{
            backgroundImage: `url(${"Images/ico-position-sup.png"})`,
            backgroundSize: "18px 18px",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
          isActive={position.find((e) => e === "sup") && position.length !== 5}
        ></PositionButton>
      </PositionButtons>
    </SelectPositionContainer>
  );
}

export default SelectPosition;

const SelectPositionContainer = styled.div`
  margin: 14px 0 25px;
`;

const InfoNav = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 14px;
  > span {
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 12px;
    text-align: left;
    color: rgb(129, 126, 144);
    margin-left: 5px;
  }
`;

const PositionButtons = styled.div`
  display: flex;
`;

const PositionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 2px;
  border: solid 1px rgb(67, 63, 78);
  background-color: rgb(47, 45, 56);
  margin-right: 5px;
  cursor: pointer;
  font-family: Poppins;
  font-size: 12px;
  font-weight: bold;
  line-height: 40px;
  text-align: center;
  color: #817e90;
  :hover {
    opacity: 0.9;
  }
  > img {
    width: 18px;
    height: 18px;
  }
  ${(props) =>
    props.isActive &&
    css`
      border: solid 1px rgb(124, 119, 139);
      background-color: rgb(35, 33, 42);
    `}
`;
