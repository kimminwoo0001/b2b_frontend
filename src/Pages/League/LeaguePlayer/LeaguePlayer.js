import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import axios from "axios";
import { API } from "../../config";
import qs from "qs";
import TabTop from "./Components/TabTop";


import { useSelector } from "react-redux";

function LeaguePlayer() {
  const filters = useSelector((state) => state.FilterReducer);
  const user = useSelector((state) => state.UserReducer);
  const [positionClicked, setPositionClicked] = useState("top");
  const [loading, setIsLoading] = useState(false);
  const [playerData, setPlayerData] = useState();

  // 선수정보 탭 변환
  const currentPosition = {
    top: <TabTop playerData={playerData} loading={loading} />,
    jng: <TabTop playerData={playerData} loading={loading} />,
    mid: <TabTop playerData={playerData} loading={loading} />,
    bot: <TabTop playerData={playerData} loading={loading} />,
    sup: <TabTop playerData={playerData} loading={loading} />
  };

  useEffect(() => {
    fetchingPlayerData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, positionClicked]);

  // player 데이터 featch 함수
  const fetchingPlayerData = async () => {
    setIsLoading(true);
    const result = await axios.request({
      method: "GET",
      url: ` ${API}/api/league/playerinfo`,
      params: {
        league: filters.league,
        year: filters.year,
        season: filters.season,
        patch: filters.patch,
        position: positionClicked,
        token: user.token,
        id: user.id,
      },
      paramsSerializer: (params) => {
        return qs.stringify(params, { arrayFormat: "repeat" });
      }
    });
    setPlayerData(result.data);
    setIsLoading(false);
  };

  return (
    <LeaguePlayerWrapper>
      <LeaguePlayerTabs>
        <TopTab
          onClick={() => setPositionClicked("top")}
          changeColor={positionClicked === "top"}
        >
          <img src="Images/ico-position-top.png" alt="positionIcon"></img>
          <div>TOP</div>
        </TopTab>
        <LineMargin></LineMargin>
        <JngTab
          onClick={() => setPositionClicked("jng")}
          changeColor={positionClicked === "jng"}
        >
          <img src="Images/ico-position-jng.png" alt="positionIcon"></img>
          <div>JG</div>
        </JngTab>
        <LineMargin></LineMargin>
        <MidTab
          onClick={() => setPositionClicked("mid")}
          changeColor={positionClicked === "mid"}
        >
          <img src="Images/ico-position-mid.png" alt="positionIcon"></img>
          <div>MID</div>
        </MidTab>
        <LineMargin></LineMargin>
        <BotTab
          onClick={() => setPositionClicked("bot")}
          changeColor={positionClicked === "bot"}
        >
          <img src="Images/ico-position-bot.png" alt="positionIcon"></img>
          <div>ADC</div>
        </BotTab>
        <LineMargin></LineMargin>
        <SupTab
          onClick={() => setPositionClicked("sup")}
          changeColor={positionClicked === "sup"}
        >
          <img src="Images/ico-position-sup.png" alt="positionIcon"></img>
          <div>SUP</div>
        </SupTab>
        <LastMargin></LastMargin>
      </LeaguePlayerTabs>
      <TabContents>{currentPosition[positionClicked]}</TabContents>
    </LeaguePlayerWrapper>
  );
}

export default LeaguePlayer;

const LeaguePlayerWrapper = styled.div`
  height: 100%;
`;

const LeaguePlayerTabs = styled.div`
  display: flex;
  margin-top: 21.5px;
`;
const LastMargin = styled.div`
  width: 445px;
  border-bottom: solid 1px rgb(124, 119, 139);
`;

const LineMargin = styled.div`
  width: 6px;
  border-bottom: solid 1px rgb(124, 119, 139);
`;
const TopTab = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 125px;
  height: 36px;
  border: solid 1px rgb(67, 63, 78);
  color: rgb(132, 129, 142);
  border-bottom: 1px solid rgb(124, 119, 139);
  ${(props) =>
    props.changeColor &&
    css`
      color: rgb(255, 255, 255);
      border-top: solid 1px rgb(124, 119, 139);
      border-right: solid 1px rgb(124, 119, 139);
      border-left: solid 1px rgb(124, 119, 139);
      border-bottom: none;
    `}

  img {
    width: 14px;
    height: 14px;
  }
  div {
    margin-left: 8px;
    width: 26px;
    font-family: Poppins;
    font-size: 13px;
    text-align: left;
  }
`;

const JngTab = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 125px;

  height: 36px;
  border: solid 1px rgb(67, 63, 78);
  color: rgb(132, 129, 142);
  border-bottom: 1px solid rgb(124, 119, 139);
  ${(props) =>
    props.changeColor &&
    css`
      color: rgb(255, 255, 255);
      border-top: solid 1px rgb(124, 119, 139);
      border-right: solid 1px rgb(124, 119, 139);
      border-left: solid 1px rgb(124, 119, 139);
      border-bottom: none;
    `}

  img {
    width: 14px;
    height: 14px;
  }
  div {
    margin-left: 8px;
    width: 26px;
    font-family: Poppins;
    font-size: 13px;
    text-align: left;
  }
`;

const MidTab = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 125px;
  height: 36px;
  border: solid 1px rgb(67, 63, 78);
  color: rgb(132, 129, 142);
  border-bottom: 1px solid rgb(124, 119, 139);
  ${(props) =>
    props.changeColor &&
    css`
      color: rgb(255, 255, 255);
      border-top: solid 1px rgb(124, 119, 139);
      border-right: solid 1px rgb(124, 119, 139);
      border-left: solid 1px rgb(124, 119, 139);
      border-bottom: none;
    `}

  img {
    width: 14px;
    height: 14px;
  }
  div {
    margin-left: 8px;
    width: 26px;
    font-family: Poppins;
    font-size: 13px;
    text-align: left;
  }
`;

const BotTab = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 125px;

  height: 36px;
  border: solid 1px rgb(67, 63, 78);
  color: rgb(132, 129, 142);
  border-bottom: 1px solid rgb(124, 119, 139);
  ${(props) =>
    props.changeColor &&
    css`
      color: rgb(255, 255, 255);
      border-top: solid 1px rgb(124, 119, 139);
      border-right: solid 1px rgb(124, 119, 139);
      border-left: solid 1px rgb(124, 119, 139);
      border-bottom: none;
    `}

  img {
    width: 14px;
    height: 14px;
  }
  div {
    margin-left: 8px;
    width: 26px;
    font-family: Poppins;
    font-size: 13px;
    text-align: left;
  }
`;

const SupTab = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 125px;
  height: 36px;
  border: solid 1px rgb(67, 63, 78);
  color: rgb(132, 129, 142);
  border-bottom: 1px solid rgb(124, 119, 139);
  ${(props) =>
    props.changeColor &&
    css`
      color: rgb(255, 255, 255);
      border-top: solid 1px rgb(124, 119, 139);
      border-right: solid 1px rgb(124, 119, 139);
      border-left: solid 1px rgb(124, 119, 139);
      border-bottom: none;
    `}

  img {
    width: 14px;
    height: 14px;
  }
  div {
    margin-left: 8px;
    width: 26px;
    font-family: Poppins;
    font-size: 13px;
    text-align: left;
  }
`;

const TabContents = styled.div``;
