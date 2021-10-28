import React, { useState, useRef } from "react";
import styled, { css } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import qs from "qs";
import SetByChampion from "./SetByChampion";
import SetByPlayer from "./SetByPlayer";
import { Reset_MapTab, ResetChampion } from "../../../redux/modules/filtervalue";
import h337 from "heatmap.js";
import { useTranslation } from "react-i18next";
import { API2 } from "../../config";


function HitMap() {
  // 시간 설정 상태값
  const [minFrom, setMinFrom] = useState([0, 100]);
  let firstTime = minFrom[0] * 18;
  let secondTime = minFrom[1] * 18;
  const isPageSolo = document.location.pathname === '/solo' ? true : false;

  const filters = useSelector((state) => state.FilterReducer);
  const user = useSelector((state) => state.UserReducer);
  const resetHeatMap1 = useRef(null);
  const resetHeatMap2 = useRef(null);
  // const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState("player");
  const dispatch = useDispatch();
  const { t } = useTranslation();
  //히트맵 데이터 fetch 함수
  const fetchingHeatMapData = async () => {
    const { team, player, champion_eng, oppteam, oppplayer, oppchampion_eng } = filters;

    let unselectedItem = [];
    if (tab === 'player') {
      if (team.length === 0) unselectedItem.push(t("video.vision.team"));
      if (player.length === 0) unselectedItem.push(t("video.vision.player"));
      if (champion_eng.length === 0) unselectedItem.push(t("video.vision.champ"));
    } else if (tab === 'champion') {
      if (team.length === 0) unselectedItem.push(t("video.vision.team"));
      if (player.length === 0) unselectedItem.push(t("video.vision.player"));
      if (champion_eng.length === 0) unselectedItem.push(t("video.vision.champ"));
      if (oppteam.length === 0) unselectedItem.push(t("video.vision.team2"));
      if (oppplayer.length === 0) unselectedItem.push(t("video.vision.player2"));
      if (oppchampion_eng.length === 0) unselectedItem.push(t("video.vision.champ2"));
    }

    if (unselectedItem.length > 0) {
      let unselectedSentence = "";
      for (let i = 0; i < unselectedItem.length; i++) {
        unselectedSentence += unselectedItem[i];
        if (i !== unselectedItem.length - 1) {
          unselectedSentence += ", ";
        }
      }
      let alertMessage = t("video.vision.selectAlert").replace('###', unselectedSentence);
      alert(alertMessage);
      return;
    }

    try {
      const result = await axios.request({
        method: "GET",
        url: `${API2}/api/mappingPosition`,
        params: {
          league: filters.league,
          year: filters.year,
          season: filters.season,
          patch: filters.patch,
          team: filters.team,
          player: filters.player,
          champion: filters.champion_eng,
          compare: "off",
          opp_team: filters.oppteam,
          opp_player: filters.oppplayer,
          opp_champion: filters.oppchampion_eng,
          side: "all",
          token: user.token,
          id: user.id,
          firstTime: firstTime,
          secondTime: secondTime
        },
        paramsSerializer: (params) => {
          return qs.stringify(params, { arrayFormat: "repeat" });
        }
      });
      const heatData = result.data.position;
      getThreeMinBlue(heatData);
      getEightMinBlue(heatData);
    } catch (e) {
      console.log(e);
    } finally {
    }

  };

  //히트맵 블루팀 데이터 가공 함수
  const getThreeMinBlue = (heatData) => {
    resetHeatMap1.current.innerHTML = "";
    let heatmap = h337.create({
      container: resetHeatMap1.current,
      maxOpacity: 0.6,
      radius: 30,
      blur: 0.9
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
                  ((Number(dto.player[i].x1) + Number(dto.player[i].x2)) / 2) *
                  1.824;
                let y =
                  ((Number(dto.player[i].y1) + Number(dto.player[i].y2)) / 2) *
                  1.824;
                data.push({ x: x, y: y, value: 0.5 });
              }
            }
          }
        }
      }

      var data2 = {
        max: 30,
        min: 0,
        data
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
      blur: 0.9
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
                ((Number(dto.player[i].x1) + Number(dto.player[i].x2)) / 2) *
                1.824;
              let y =
                ((Number(dto.player[i].y1) + Number(dto.player[i].y2)) / 2) *
                1.824;
              data.push({ x: x.toFixed(0), y: y.toFixed(0), value: 0.5 });
            }
          }
        }
      }
    }
    var data2 = {
      max: 30,
      min: 0,
      data
    };
    console.log(data2);

    heatmap.setData(data2);
    document.addEventListener("DOMContentLoaded", function (event) {
      heatmap.initMap();
    });
  };

  const contents = {
    player: <SetByPlayer setMinFrom={setMinFrom} minFrom={minFrom} />,
    champion: <SetByChampion setMinFrom={setMinFrom} minFrom={minFrom} />
  };

  return (
    <HitMapContainer>
      <TopSection>
        <TabBox>
          <FilterTab
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
            isActive={tab === "player"}
          >
            {t("video.heatmap.all")}
          </FilterTab>
          <FilterTab
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
            isActive={tab === "champion"}
          >
            {t("video.heatmap.opp")}
          </FilterTab>
        </TabBox>
        <FilterContents>{contents[tab]}</FilterContents>
      </TopSection>
      <ButtonSection>
        <ConfirmButton
          onClick={() => fetchingHeatMapData()}
          isActive={
            tab === 'player' ? (filters.champion_eng.length > 0 ? true : false)
              : (tab === 'champion' ? filters.champion_eng && filters.oppchampion_eng : false)
          }
        >
          {t("video.heatmap.apply")}
        </ConfirmButton>
      </ButtonSection>
      <BottomSection>
        <HitMapSide>
          <SideNav>BLUE {t("video.heatmap.side")}</SideNav>
          <HitMapWrapper>
            <MapContainer>
              <Map ref={resetHeatMap1}></Map>
            </MapContainer>
          </HitMapWrapper>
        </HitMapSide>
        <HitMapSide>
          <SideNav2>RED {t("video.heatmap.side")}</SideNav2>
          <HitMapWrapper>
            <MapContainer>
              <Map ref={resetHeatMap2}></Map>
            </MapContainer>
          </HitMapWrapper>
        </HitMapSide>
      </BottomSection>
    </HitMapContainer >
  );
}

export default HitMap;

const HitMapContainer = styled.div`
  margin-top: 23px;
  width: 1098px;
  height: calc(100vh);
`;

const TopSection = styled.section`
  min-height: 123px;
  border: solid 1px rgb(67, 63, 78);
  background-color: rgb(47, 45, 56);
`;

const BottomSection = styled.section`
  display: flex;
  justify-content: space-between;
`;

const ButtonSection = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 14px 0 41px 0;
`;

const ConfirmButton = styled.button`
  width: 126px;
  height: 36px;
  border-radius: 3px;
  background-color: rgb(105, 103, 119);
  font-family: NotoSansKR, Apple SD Gothic Neo;
  font-size: 13px;
  font-weight: bold;
  letter-spacing: -0.65px;
  text-align: center;
  color: rgb(255, 255, 255);
  :hover {
    opacity: 0.8;
  }
  ${(props) =>
    props.isActive &&
    css`
      background-color: rgb(240, 69, 69);
    `}
`;

const TabBox = styled.div`
  display: flex;
`;

const FilterTab = styled.button`
  width: 549px;
  height: 40px;
  border-bottom: solid 1px rgb(67, 63, 78);
  border-right: solid 1px rgb(67, 63, 78);
  background-color: rgb(35, 33, 42);
  font-family: NotoSansKR, Apple SD Gothic Neo;
  font-size: 12px;
  letter-spacing: -0.6px;
  color: rgb(123, 121, 139);
  :nth-child(2) {
    border-right: none;
  }
  ${(props) =>
    props.isActive &&
    css`
      border-bottom: none;
      background-color: rgb(47, 45, 56);
      color: rgb(255, 255, 255);
    `}
`;

const FilterContents = styled.div``;

const HitMapSide = styled.div``;

const SideNav = styled.div`
  display: flex;
  align-items: center;
  padding-left: 22px;
  width: 538px;
  height: 42px;
  border: solid 1px #3a3745;
  background-color: #2f2d38;
  font-family: NotoSansKR, Apple SD Gothic Neo;
  font-size: 12px;
  font-weight: bold;
  letter-spacing: -0.6px;
  color: #84818e;

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
