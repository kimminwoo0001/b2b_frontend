import React, { useState, useRef, useEffect } from "react";
import styled, { css } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import qs from "qs";
import SetByChampion from "./SetByChampion";
import SetByPlayer from "./SetByPlayer";
import {
  Reset_MapTab,
  ResetChampion,
} from "../../../redux/modules/filtervalue";
import h337 from "heatmap.js";
import { useTranslation } from "react-i18next";
import { API2 } from "../../config";
import { API } from "../../config";

import axiosRequest from "../../../lib/axiosRequest";
import { SetModalInfo } from "../../../redux/modules/modalvalue";

function HitMap() {
  // 시간 설정 상태값
  const [minFrom, setMinFrom] = useState([0, 100]);
  let firstTime = minFrom[0] * 18;
  let secondTime = minFrom[1] * 18;
  const isPageSolo = document.location.pathname === "/solo" ? true : false;

  const filters = useSelector((state) => state.FilterReducer);
  const user = useSelector((state) => state.UserReducer);
  const resetHeatMap1 = useRef(null);
  const resetHeatMap2 = useRef(null);
  const [tab, setTab] = useState("player");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { t } = useTranslation();
  //히트맵 데이터 fetch 함수

  useEffect(() => {
    getThreeMinBlue({});
    getEightMinBlue({});
  }, [filters.team])

  const fetchingHeatMapData = () => {
    const { team, player, champion_eng, oppteam, oppplayer, oppchampion_eng } =
      filters;

    let unselectedItem = [];
    if (tab === "player") {
      if (team.length === 0) unselectedItem.push(t("video.vision.team"));
      if (player.length === 0) unselectedItem.push(t("video.vision.player"));
      if (champion_eng.length === 0)
        unselectedItem.push(t("video.vision.champ"));
    } else if (tab === "champion") {
      if (team.length === 0) unselectedItem.push(t("video.vision.team"));
      if (player.length === 0) unselectedItem.push(t("video.vision.player"));
      if (champion_eng.length === 0)
        unselectedItem.push(t("video.vision.champ"));
      if (oppteam.length === 0) unselectedItem.push(t("video.vision.team2"));
      if (oppplayer.length === 0)
        unselectedItem.push(t("video.vision.player2"));
      if (oppchampion_eng.length === 0)
        unselectedItem.push(t("video.vision.champ2"));
    }

    if (unselectedItem.length > 0) {
      let unselectedSentence = "";
      for (let i = 0; i < unselectedItem.length; i++) {
        unselectedSentence += unselectedItem[i];
        if (i !== unselectedItem.length - 1) {
          unselectedSentence += ", ";
        }
      }
      let alertMessage = t("video.vision.selectAlert").replace(
        "###",
        unselectedSentence
      );
      alert(alertMessage);
      return;
    }

    try {
      setLoading(true);
      const url = `${API}/lolapi/mapping/mapping`;
      const params = {
        league: filters.league,
        year: filters.year,
        season: filters.season,
        patch: filters.patch,
        team: filters.team,
        player: filters.player,
        champion: filters.champion_eng,
        compare: "off",
        oppteam: filters.oppteam,
        oppplayer: filters.oppplayer,
        oppchampion: filters.oppchampion_eng,
        side: "all",
        token: user.token,
        id: user.id,
        firsttime: firstTime,
        secondtime: secondTime,
      };

      axiosRequest(
        undefined,
        url,
        params,
        function (e) {
          const heatData = e.position;
          getThreeMinBlue(heatData);
          getEightMinBlue(heatData);
        },

        function (objStore) {
          dispatch(SetModalInfo(objStore)); // 오류 발생 시, Alert 창을 띄우기 위해 사용
        }
      );
      setLoading(false);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  //히트맵 블루팀 데이터 가공 함수
  const getThreeMinBlue = (heatData) => {
    resetHeatMap1.current.innerHTML = "";
    let heatmap = h337.create({
      container: resetHeatMap1.current,
      maxOpacity: 0.6,
      radius: 30,
      blur: 0.9,
    });

    let max = 0;
    let data = [];

    if (heatData) {
      for (let j = 0; j < heatData.length; j++) {
        let dto = heatData[j];
        if (!(Object.keys(dto).length === 0)) {
          for (let i = 0; i < dto.player.length; i++) {
            if (max < dto.player.length) {
              max = dto.player.length;
            }
            if (dto.player[i].team === "blue") {
              if (
                Number(dto.player[i].x1) === -1 &&
                Number(dto.player[i].y1) === -1 &&
                Number(dto.player[i].x2) === -1 &&
                Number(dto.player[i].y2) === -1
              ) {
                console.log("Dead");
              } else {
                let x =
                  Math.floor(((Number(dto.player[i].x1) + Number(dto.player[i].x2)) / 2) *
                    1.824);
                let y =
                  Math.floor(((Number(dto.player[i].y1) + Number(dto.player[i].y2)) / 2) *
                    1.824);
                data.push({ x: x, y: y, value: 0.5 });
              }
            }
          }
        }
      }

      var data2 = {
        max: 30,
        min: 0,
        data,
      };
      heatmap.setData(data2);
    }
  };
  //히트맵 레드팀 데이터 가공 함수
  const getEightMinBlue = (heatData) => {
    resetHeatMap2.current.innerHTML = "";
    let heatmap = h337.create({
      container: resetHeatMap2.current,
      maxOpacity: 0.6,
      radius: 30,
      blur: 0.9,
    });

    let max = 0;

    let data = [];

    for (let j = 0; j < heatData.length; j++) {
      let dto = heatData[j];
      if (!(Object.keys(dto).length === 0)) {
        for (let i = 0; i < dto.player.length; i++) {
          if (max < dto.player.length) {
            max = dto.player.length;
          }
          if (dto.player[i].team === "red") {
            if (
              Number(dto.player[i].x1) === -1 &&
              Number(dto.player[i].y1) === -1 &&
              Number(dto.player[i].x2) === -1 &&
              Number(dto.player[i].y2) === -1
            ) {
              console.log("Dead");
            } else {
              let x =
                Math.floor(((Number(dto.player[i].x1) + Number(dto.player[i].x2)) / 2) *
                  1.824);
              let y =
                Math.floor(((Number(dto.player[i].y1) + Number(dto.player[i].y2)) / 2) *
                  1.824);
              data.push({ x: x.toFixed(0), y: y.toFixed(0), value: 0.5 });
            }
          }
        }
      }
    }
    var data2 = {
      max: 30,
      min: 0,
      data,
    };
    console.log(data2);

    heatmap.setData(data2);
    document.addEventListener("DOMContentLoaded", function (event) {
      heatmap.initMap();
    });
  };

  const contents = {
    player: <SetByPlayer setMinFrom={setMinFrom} minFrom={minFrom} />,
    champion: <SetByChampion setMinFrom={setMinFrom} minFrom={minFrom} />,
  };

  return (
    <HitMapContainer>
      <TabBox>
        <FilterTab
          className="player"
          onClick={() => {
            if (tab !== "player") {
              setTab("player");
              if (isPageSolo) {
                dispatch(ResetChampion());
              } else {
                dispatch(Reset_MapTab());
              }
              resetHeatMap1.current.innerHTML = "";
              resetHeatMap2.current.innerHTML = "";
            }
          }}
          changeColor={tab === "player"}
        >
          <div>
            <span>{t("video.heatmap.all")}</span>
          </div>
        </FilterTab>

        <FilterTab
          className="opp-champ"
          onClick={() => {
            setTab("champion");
            if (isPageSolo) {
              dispatch(ResetChampion());
            } else {
              dispatch(Reset_MapTab());
            }
            resetHeatMap1.current.innerHTML = "";
            resetHeatMap2.current.innerHTML = "";
          }}
          changeColor={tab === "champion"}
        >
          <div>
            <span>{t("video.heatmap.opp")}</span>
          </div>
        </FilterTab>
        <LastMargin></LastMargin>
      </TabBox>
      <TopSection>
        <FilterContents>{contents[tab]}</FilterContents>
        <ButtonSection>
          <ConfirmButton
            onClick={() => fetchingHeatMapData()}
            isActive={
              tab === "player"
                ? filters.champion_eng.length > 0
                  ? true
                  : false
                : tab === "champion"
                  ? filters.champion_eng && filters.oppchampion_eng
                  : false
            }
          >
            {t("video.heatmap.apply")}
          </ConfirmButton>
        </ButtonSection>
      </TopSection>

      <BottomSection>
        <HitMapSide>
          <SideNav>BLUE {t("video.heatmap.side")}</SideNav>
          <HitMapWrapper>
            {loading && (
              <LoadingImage>
                <img src="Images/loadingSpinner_purple.gif" alt="Loading" />
              </LoadingImage>
            )}
            {!loading && (
              <MapContainer>
                <Map ref={resetHeatMap1}></Map>
              </MapContainer>
            )}
          </HitMapWrapper>
        </HitMapSide>
        <HitMapSide>
          <SideNav2>RED {t("video.heatmap.side")}</SideNav2>
          <HitMapWrapper>
            {loading && (
              <LoadingImage>
                <img src="Images/loadingSpinner_purple.gif" alt="Loading" />
              </LoadingImage>
            )}
            {!loading && (
              <MapContainer>
                <Map ref={resetHeatMap2}></Map>
              </MapContainer>
            )}
          </HitMapWrapper>
        </HitMapSide>
      </BottomSection>
    </HitMapContainer>
  );
}

export default HitMap;

const HitMapContainer = styled.div`
  margin-top: 0px;
  width: 1098px;
  height: calc(100vh);
`;

const TopSection = styled.section`
  min-height: 123px;
  border: solid 1px rgb(67, 63, 78);
  background-color: rgb(47, 45, 56);
  border-radius: 20px;
`;

const BottomSection = styled.section`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const ButtonSection = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  border-top: 1px solid #433f4e;
`;

const ConfirmButton = styled.button`
  width: 97%;
  height: 60px;
  border-radius: 20px;
  background-color: #484655;
  font-family: SpoqaHanSansNeo;
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  margin: 20px 0;
  color: rgb(255, 255, 255);
  :hover {
    opacity: 0.8;
  }
  ${(props) =>
    props.isActive &&
    css`
      background-color: #5942ba;
    `}
`;

const TabBox = styled.div`
  display: flex;
  height: 62px;
  margin-bottom: 20px;
`;

const FilterTab = styled.button`
  display: flex;
  align-items: center;
  width: auto;
  border-bottom: solid 1px #433f4e;
  white-space: nowrap;

  div {
    padding: 10px 15px;
  }

  :hover {
    div {
      padding: 10px 15px;
      border-radius: 10px;
      background-color: #26262c;
    }
  }
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
    padding-bottom: 18px;
    border-bottom: solid 1px ${(props) => (props.changeColor ? `#fff` : `none`)};
    color: ${(props) => (props.changeColor ? `#fff` : `#84818e`)};
  }
`;

const FilterContents = styled.div``;

const HitMapSide = styled.div``;

const SideNav = styled.div`
  display: flex;
  align-items: center;
  padding-left: 22px;
  width: 538px;
  height: 52px;
  border: solid 1px #3a3745;
  background-color: #2f2d38;
  font-family: SpoqaHanSansNeo;
  font-size: 16px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.56;
  letter-spacing: normal;
  text-align: left;
  color: #fff;
  border-radius: 20px 20px 0px 0px;

  background-image: url("Images/right-blue-gradient.png");
  background-repeat: no-repeat;
  background-position: right;
`;
const SideNav2 = styled(SideNav)`
  background-image: url("Images/right-win-gradient.png");
`;

const HitMapWrapper = styled.div`
  display: flex;
  width: 538px;
  justify-content: space-between;
`;

const MapContainer = styled.div``;

const Map = styled.div`
  width: 538px;
  height: 538px;
  background-image: url("Images/obj_map_summer.png");
  background-size: 538px 538px;
`;

const LineMargin = styled.div`
  width: 10px;
  border-bottom: solid 1px #433f4e;
`;

const LastMargin = styled.div`
  width: 73%;
  border-bottom: solid 1px #433f4e;
`;

const LoadingImage = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: #2f2d38;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;

  img {
    width: 30px;
    height: 30px;
  }
`;
