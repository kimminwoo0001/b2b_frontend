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
    else if (!position.find((e) => e === value) && value !== "all") {
      setPosition([...position.filter((e) => e !== ""), value]);
    }
    else if (position.find((e) => e === value) && position.length !== 5) {
      setPosition(position.filter((e) => e !== value));
    }
    else if (value === "all") {
      setPosition(["top", "jng", "mid", "bot", "sup"]);
    }
  };


  return (
    <SelectPositionContainer>
      <InfoNav>
        <img src="Images/ico-notice-gy.png" alt="alert" />
        <span>{t("video.object.position")}</span>
      </InfoNav>
      <PositionButtons>
        {POSITION.map((pos, idx) => {
          return (
            <PositionButton 
              isActive={position.length === 5}
              value={pos} isClicked={pos === "all" ? position.legnth === 5 :
                position.find((e) => e === pos) && position.length !== 5} position={pos} onClick={pushPosition}>
              {`${pos === "all" ? `All` : ""}`}</PositionButton>
          )
        })}
      </PositionButtons>
    </SelectPositionContainer>
  );
}

export default SelectPosition;

const POSITION = ["all", "top", "jng", "mid", "bot", "sup"]

const SelectPositionContainer = styled.div`
  margin-bottom: 30px;
`;

const InfoNav = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 14px;
  > span {
    font-family: SpoqaHanSansNeo;
    font-size: 13px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    color: #84818e;
  }
`;

const PositionButtons = styled.div`
  display: flex;
`;


const PositionButton = styled.button`
  background-image: url(${ props => props.isClicked ? `Images/${props.position}-sel.png` : `Images/${props.position}.png` });
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 10px;
  background-color:#3a3745;
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

  ${(props) =>
  props.isActive &&
    css`
      background-color: #23212a;
      color: #ffffff;
    `}

`;
