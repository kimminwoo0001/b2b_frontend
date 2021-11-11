import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import axios from "axios";
import { API } from "../../config";
import qs from "qs";
import TabTop from "./Components/TabTop";


import { useSelector } from "react-redux";
import axiosRequest from "../../../lib/axiosRequest";
import { useTranslation } from "react-i18next";

function LeaguePlayer() {
  const filters = useSelector((state) => state.FilterReducer);
  const user = useSelector((state) => state.UserReducer);
  const [positionClicked, setPositionClicked] = useState("top");
  const [loading, setIsLoading] = useState(false);
  const [playerData, setPlayerData] = useState();
  const { t } = useTranslation();

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
  const fetchingPlayerData = () => {
    setIsLoading(true);
    const url = `${API}/api/league/playerinfo`;
    const params = {
      league: filters.league,
      year: filters.year,
      season: filters.season,
      patch: filters.patch,
      position: positionClicked,
      token: user.token,
      id: user.id,
    }
    axiosRequest(url, params, function (e) {
      setPlayerData(e.data);
      setIsLoading(false);
    })
  };

  return (
    <LeaguePlayerWrapper>
      <LeaguePlayerTabs>
        <TopTab
          onClick={() => setPositionClicked("top")}
          changeColor={positionClicked === "top"}
        >
          <span>{t("position.top")}</span>
        </TopTab>
        <LineMargin></LineMargin>
        <JngTab
          onClick={() => setPositionClicked("jng")}
          changeColor={positionClicked === "jng"}
        >
          <span>{t("position.jg")}</span>
        </JngTab>
        <LineMargin></LineMargin>
        <MidTab
          onClick={() => setPositionClicked("mid")}
          changeColor={positionClicked === "mid"}
        >
          <span>{t("position.mid")}</span>
        </MidTab>
        <LineMargin></LineMargin>
        <BotTab
          onClick={() => setPositionClicked("bot")}
          changeColor={positionClicked === "bot"}
        >
          <span>{t("position.ad")}</span>
        </BotTab>
        <LineMargin></LineMargin>
        <SupTab
          onClick={() => setPositionClicked("sup")}
          changeColor={positionClicked === "sup"}
        >
          <span>{t("position.sup")}</span>
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
  height: 62px;
  // margin-top: 21.5px;
`;
const LastMargin = styled.div`
  width: 73%;
  border-bottom: solid 1px #433f4e;
`;

const LineMargin = styled.div`
  width: 30px;
  border-bottom: solid 1px #433f4e;
`;
const TopTab = styled.button`
display: flex;
padding: 20px 0 20px 0;
align-items: center;
width: auto;
border-bottom: solid 1px #433f4e;
span {
  height: 22px;
  font-family: SpoqaHanSansNeo;
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: ${(props) => (props.changeColor ? `#fff` : `#84818e`)};
}
${(props) =>
    props.changeColor &&
    css`
  border-bottom: solid 1px #fff;
  `}
`;


const JngTab = styled.button`
display: flex;
padding: 20px 0 20px 0;
align-items: center;
width: auto;
border-bottom: solid 1px #433f4e;
span {
  height: 22px;
  font-family: SpoqaHanSansNeo;
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: ${(props) => (props.changeColor ? `#fff` : `#84818e`)};
}
${(props) =>
    props.changeColor &&
    css`
  border-bottom: solid 1px #fff;
  `}
`;

const MidTab = styled.button`
display: flex;
padding: 20px 0 20px 0;
align-items: center;
width: auto;
border-bottom: solid 1px #433f4e;
span {
  height: 22px;
  font-family: SpoqaHanSansNeo;
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: ${(props) => (props.changeColor ? `#fff` : `#84818e`)};
}
${(props) =>
    props.changeColor &&
    css`
  border-bottom: solid 1px #fff;
`}
`;


const BotTab = styled.button`
display: flex;
padding: 20px 0 20px 0;
align-items: center;
width: auto;
border-bottom: solid 1px #433f4e;
span {
  height: 22px;
  font-family: SpoqaHanSansNeo;
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: ${(props) => (props.changeColor ? `#fff` : `#84818e`)};
}
${(props) =>
    props.changeColor &&
    css`
  border-bottom: solid 1px #fff;
`}
`;

const SupTab = styled.button`
display: flex;
padding: 20px 0 20px 0;
align-items: center;
width: auto;
border-bottom: solid 1px #433f4e;
span {
  height: 22px;
  font-family: SpoqaHanSansNeo;
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: ${(props) => (props.changeColor ? `#fff` : `#84818e`)};
}
${(props) =>
    props.changeColor &&
    css`
  border-bottom: solid 1px #fff;
`}
`;

const TabContents = styled.div``;
