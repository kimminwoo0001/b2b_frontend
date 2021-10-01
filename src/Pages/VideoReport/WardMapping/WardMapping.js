import React, { useState } from "react";
import axios from "axios";
import styled, { css } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import WardPlayerFilter from "./WardPlayerFilter";
import WardTeamFilter from "./WardTeamFilter";
import Tippy from "@tippy.js/react";
import { Reset_MapTab } from "../../../redux/modules/filtervalue";
import { useTranslation } from "react-i18next";
import { API2 } from "../../config";
import qs from "qs";
import WardTooltip from "./WardTooltip";
const sectorName = {
  0: 1,
  1: 2,
  2: 3,
  3: 4,
  4: 5,
  5: 6,
  6: 7,
  7: 8,
  8: 9,
  9: 10,
  10: 11,
  11: 12,
  12: 13,
  13: 14,
  14: "Error",
  15: "None",
};

function WardMapping() {
  const filters = useSelector((state) => state.FilterReducer);
  const user = useSelector((state) => state.UserReducer);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  // 시간 설정 상태값
  const [minFrom, setMinFrom] = useState([0, 100]);
  //

  const [side, setSide] = useState("all");
  const [tab, setTab] = useState("team");
  const [compareOpen, setCompareOpen] = useState(false);
  // fetch data 상태값
  const [ward, setWard] = useState([]);
  const [sector, setSector] = useState([]);
  const [totalWard, setTotalWard] = useState();
  const [mapSector, setMapSector] = useState("");

  let firstTime = minFrom[0] * 5100;
  let secondTime = minFrom[1] * 5100;

  const handleTimeReset = () => {
    // setMinFrom(t("video.vision.selectMin"));
    // setSecFrom(t("video.vision.selectSec"));
    // setMinTo(t("video.vision.selectMin"));
    // setSecTo(t("video.vision.selectSec"));
    dispatch(Reset_MapTab());
    setSector([]);
  };

  const contents = {
    team: <WardTeamFilter minFrom={minFrom} setMinFrom={setMinFrom} />,
    player: (
      <WardPlayerFilter
        compareOpen={compareOpen}
        setCompareOpen={setCompareOpen}
        minFrom={minFrom}
        setMinFrom={setMinFrom}
      />
    ),
  };

  //맵핑 데이터 fetch 함수
  const fetchingWardData = async (wardside) => {
    try {
      const response = await axios.request({
        method: "GET",
        url: `${API2}/api/waddingFilter`,
        params: {
          league: filters.league,
          patch: filters.patch,
          team: filters.team,
          player: filters.player,
          champion: filters.champion_eng,
          compare: compareOpen ? "on" : "off",
          opp_team: filters.oppteam,
          opp_player: filters.oppplayer,
          opp_champion: filters.oppchampion_eng,
          side: wardside,
          firstTime: firstTime,
          secondTime: secondTime,
          token: user.token,
          id: user.id,
        },
        paramsSerializer: (params) => {
          return qs.stringify(params, { arrayFormat: "repeat" });
        },
      });
      const dto = response.data.warding;
      setWard(response.data.warding);
      console.log(response);
      console.log(filters.oppteam, filters.oppplayer, filters.oppchampion_eng);

      // sector 구분해서 섹터값 더하기
      if (dto.length > 0) {
        var total = 0;
        for (let i = 0; i < dto.length; i++) {
          if (dto[i].firstward) {
            total += 1;
          }
          if (dto[i].secondward) {
            total += 1;
          }
        }
        setTotalWard(total);

        var arrNumber = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        var arrNumber2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (var i = 0; i < dto.length; i++) {
          if (dto[i].firstwardPlaced === 200) {
            var placed = 15;
          } else if (dto[i].firstwardPlaced === 100) {
            placed = 14;
          } else {
            placed = Number(dto[i].firstwardPlaced);
          }
          arrNumber[placed] = arrNumber[placed] + 1;
        }
        for (let i = 0; i < dto.length; i++) {
          if (dto[i].secondwardPlaced === 200) {
            placed = 15;
          } else if (dto[i].secondwardPlaced === 100) {
            placed = 14;
          } else {
            placed = Number(dto[i].secondwardPlaced);
          }
          arrNumber2[placed] = arrNumber2[placed] + 1;
        }
        const arrSum = arrNumber.map((first, idx) => {
          return first + arrNumber2[idx];
        });
        setSector(arrSum);
      } else {
        alert(t("video.vision.noData"));
        setTotalWard(0);
        setSector([]);
      }
    } catch (e) {
      console.log(e);
    } finally {
    }
  };

  const handleWardClick = () => {
    if (tab === "team") {
      if (!filters.team) {
        alert("팀을 선택해주세요.");
        return;
      }
      if (secondTime - firstTime <= 0) {
        alert(t("video.vision.noTime"));
        return;
      } else {
        fetchingWardData("all");
      }
    } else {
      if (!filters.team) {
        alert("팀을 선택해주세요.");
        return;
      }
      if (!filters.player) {
        alert("선수를 선택해주세요.");
        return;
      }
      if (!filters.champion_eng) {
        alert("챔피언을 선택해주세요.");
        return;
      }
      if (secondTime - firstTime <= 0) {
        alert(t("video.vision.noTime"));
        return;
      } else {
        fetchingWardData("all");
      }
    }
  };

  return (
    <WardMappingContainer>
      <LeftSection>
        <FilterContainer>
          <TabContainer>
            <BasedOnTeam
              onClick={() => {
                setTab("team");
                handleTimeReset();
                setCompareOpen(false);
              }}
              isActive={tab === "team"}
            >
              {t("video.vision.teamview")}
            </BasedOnTeam>
            <BasedOnPlayer
              onClick={() => {
                setTab("player");
                handleTimeReset();
                setCompareOpen(false);
              }}
              isActive={tab === "player"}
            >
              {t("video.vision.playerview")}
            </BasedOnPlayer>
          </TabContainer>
          <FilterContents>{contents[tab]}</FilterContents>
        </FilterContainer>
        <WardButton onClick={() => handleWardClick()} isActive={filters.team}>
          {t("video.vision.checkWard")}
        </WardButton>
        <ViewContainer>
          <ButtonContainer>
            <SideButton
              onClick={() => {
                setSide("all");
                fetchingWardData("all");
              }}
              changeColor={side === "all"}
            >
              ALL
            </SideButton>
            <SideButton
              onClick={() => {
                setSide("blue");
                fetchingWardData("blue");
              }}
              changeColor={side === "blue"}
            >
              BLUE
            </SideButton>
            <SideButton
              onClick={() => {
                setSide("red");
                fetchingWardData("red");
              }}
              changeColor={side === "red"}
            >
              RED
            </SideButton>
          </ButtonContainer>
          <WardTable>
            <TotalWard>
              <LabelArea>
                <span>{t("video.vision.totalWard")}</span>
                <p>{`${totalWard ? totalWard : 0}`}</p>
              </LabelArea>
              <LabelArea>
                {totalWard ? (
                  <button
                    onClick={() => setMapSector(`Images/minimap_new/15.png`)}
                  >
                    {t("video.vision.allLabel")}
                  </button>
                ) : (
                  ""
                )}
              </LabelArea>
            </TotalWard>
            {sector.length > 0 ? (
              <DisplayTable>
                <thead>
                  <tr>
                    <th>{t("video.vision.area")}</th>
                    <th>{t("video.vision.count")}</th>
                    <th>{t("video.vision.probability")}</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {sector.map((sector, idx) => {
                    if (idx === 14) return "";
                    return (
                      <tr key={idx}>
                        <td className="Sector">{sectorName[idx]}</td>
                        <td className="Num">{sector}</td>
                        <td className="Rate">{`${(
                          (sector / totalWard) *
                          100
                        ).toFixed(1)}%`}</td>
                        <td className="Detail">
                          <button
                            onClick={() =>
                              setMapSector(`Images/minimap_new/${idx}.png`)
                            }
                          >
                            {t("video.vision.details")}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </DisplayTable>
            ) : (
              <NoContentTable className="nocontents" colspan="4">
                <img src="Images/img-no-contents.png" alt="" />
                <label>{t("video.vision.option")}</label>
              </NoContentTable>
            )}
          </WardTable>
        </ViewContainer>
      </LeftSection>
      <RightSection>
        <WardMap
          style={{
            backgroundImage: `url(${mapSector ? mapSector : "Images/ward_map.png"
              })`,
          }}
        >
          {ward?.map((ward, idx) => {
            let firstWard = ward?.firstwardPosition?.split(",");
            let secondWard = ward?.secondwardPosition?.split(",");
            if (idx === 14) return "";
            return (
              <WardInfoWrapper key={idx}>
                {ward?.firstwardPosition ? (
                  <Tippy // optionsx
                    duration={0}
                    delay={[100, 0]}
                    // trigger="click"
                    content={
                      <WardTooltip
                        wardType={ward.firstward}
                        champion={ward.champion}
                        player={ward.player}
                        time={ward.firstwardTime}
                        team={ward.team}
                        side={ward.side}
                        date={ward.date}
                      />
                    }
                    placement="top"
                  >
                    <WardInfo
                      className={`ward ${ward.team} ${ward.side} ${ward.player}`}
                      style={{
                        top: `${firstWard ? firstWard[1] - 8 : null}px`,
                        left: `${firstWard ? firstWard[0] - 9 : null}px`,
                        height: "15px",
                        width: "18px",
                        backgroundImage: `url(Images/${ward.firstward
                          .replace(" ", "")
                          .toLowerCase()}-${ward.side}.png)`,
                      }}
                    ></WardInfo>
                  </Tippy>
                ) : (
                  ""
                )}
                {ward?.secondwardPosition ? (
                  <Tippy // options
                    duration={0}
                    delay={[100, 0]}
                    // trigger="click"
                    content={
                      <WardTooltip
                        wardType={ward.secondward}
                        champion={ward.champion}
                        player={ward.player}
                        time={ward.secondwardTime}
                        team={ward.team}
                        side={ward.side}
                        date={ward.date}
                      />
                    }
                    placement="top"
                  >
                    <WardInfo
                      className={`ward ${ward.team} ${ward.side} ${ward.player}`}
                      style={{
                        top: `${secondWard ? secondWard[1] - 8 : null}px`,
                        left: `${secondWard ? secondWard[0] - 9 : null}px`,
                        height: "20px",
                        width: "20px",
                        backgroundImage: `url(Images/${ward.secondward
                          .replace(" ", "")
                          .toLowerCase()}-${ward.side}.png)`,
                      }}
                    ></WardInfo>
                  </Tippy>
                ) : (
                  ""
                )}
              </WardInfoWrapper>
            );
          })}
        </WardMap>
      </RightSection>
    </WardMappingContainer>
  );
}

export default WardMapping;

const LabelArea = styled.div`
  display: flex;
  align-items: center;
  padding: 13px 15px;
  height: 42.5px;
  > span {
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 12px;
    color: #ffffff;
    margin-right: 5px;
  }
  > p {
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 12px;
    color: #f04545;
  }
  > button {
    width: 75px;
    margin-right: 30px;
    height: 20px;
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 12px;
    letter-spacing: -0.6px;
    text-align: center;
    padding: 3px 5px;
    color: rgb(175, 173, 190);
    border: solid 1px rgb(175, 173, 190);
    border-radius: 3px;
  }
`;

const NoContentTable = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  height: 169px;
  > img {
    width: 31px;
    height: 31px;
  }
  > label {
    margin-top: 10px;
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 12px;
    letter-spacing: -0.6px;
    text-align: center;
    color: rgb(107, 105, 121);
  }
`;

const WardInfoWrapper = styled.div``;

const WardInfo = styled.div`
  position: absolute;
`;

const WardMappingContainer = styled.div`
  display: flex;
  min-height: 100vh;
  height: 100%;
  margin-top: 22.5px;
`;

const LeftSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 22px;
`;

const RightSection = styled.section``;

const FilterContainer = styled.div`
  width: 564px;
  min-height: 264px;
  border: solid 1px rgb(67, 63, 78);
  background-color: rgb(47, 45, 56);
`;

const TabContainer = styled.div`
  display: flex;
`;

const BasedOnTeam = styled.button`
  font-family: NotoSansKR, Apple SD Gothic Neo;
  font-size: 12px;
  letter-spacing: -0.6px;
  text-align: center;
  color: rgb(123, 121, 139);
  width: 282px;
  height: 40px;
  border-bottom: solid 1px rgb(67, 63, 78);
  border-right: solid 1px rgb(67, 63, 78);
  background-color: rgb(35, 33, 42);
  ${(props) =>
    props.isActive &&
    css`
      border-bottom: none;
      background-color: rgb(47, 45, 56);
      color: rgb(255, 255, 255);
    `}
`;

const BasedOnPlayer = styled.button`
  font-family: NotoSansKR, Apple SD Gothic Neo;
  font-size: 12px;
  letter-spacing: -0.6px;
  text-align: center;
  color: rgb(123, 121, 139);
  width: 282px;
  height: 40px;
  border-bottom: solid 1px rgb(67, 63, 78);
  background-color: rgb(35, 33, 42);
  ${(props) =>
    props.isActive &&
    css`
      border-bottom: none;
      background-color: rgb(47, 45, 56);
      color: rgb(255, 255, 255);
    `}
`;

const FilterContents = styled.div``;

const WardButton = styled.button`
  margin: 16px 0 40px 0;
  font-family: NotoSansKR, Apple SD Gothic Neo;
  font-size: 13px;
  font-weight: bold;
  letter-spacing: -0.65px;
  text-align: center;
  color: rgb(255, 255, 255);
  width: 126px;
  height: 36px;
  border-radius: 3px;
  background-color: rgb(105, 103, 119);
  :hover {
    opacity: 0.8;
  }
  ${(props) =>
    props.isActive &&
    css`
      background-color: #f04545;
    `}
`;

const ViewContainer = styled.div``;

const WardMap = styled.div`
  width: 512px;
  height: 512px;
  position: relative;
  background-image: url("Images/ward_map.png");
`;

const ButtonContainer = styled.div``;

const SideButton = styled.button`
  width: 65px;
  height: 27px;
  border-radius: 2px;
  border: solid 1px #3a3745;
  background-color: #3a3745;
  font-family: Poppins;
  font-size: 13px;
  text-align: center;
  color: #817e90;
  margin-right: 10px;
  :hover {
    opacity: 0.8;
  }
  ${(props) =>
    props.changeColor &&
    css`
      border-radius: 2px;
      border: solid 1px #f04545;
      background-color: #23212a;
      color: #f04545;
      font-weight: bold;
    `}
`;

const WardTable = styled.div`
  margin-top: 10px;
  width: 564px;
  min-height: 240px;
  border: solid 1px #3a3745;
  background-color: #2f2d38;
`;

const TotalWard = styled.div`
  display: flex;
  width: 100%;

  justify-content: space-between;
`;

const DisplayTable = styled.table`
  width: 100%;
  > thead > tr {
    width: 100%;
    height: 28px;
    background-color: #3a3745;
    th {
      padding: 10px;
      font-family: NotoSansKR, Apple SD Gothic Neo;
      font-size: 12px;
      font-weight: bold;
      letter-spacing: -0.6px;
      text-align: center;
      color: #817e90;
    }
  }
  > tbody > tr {
    border-bottom: 1px solid #3a3745;
    width: 100%;
    height: 27px;
    color: #ffffff;
    font-size: 12px;
    font-family: Poppins;
    :hover {
      background-color: #817e90;
    }
    > .Sector {
      width: 10%;
      vertical-align: middle;
      text-align: center;
    }
    > .Num {
      width: 50%;
      vertical-align: middle;
      text-align: center;
    }
    > .Rate {
      width: 10%;
      vertical-align: middle;
      text-align: center;
    }
    > .Detail {
      vertical-align: middle;
      text-align: center;
      width: 30%;
      > button {
        width: 75px;
        height: 18px;
        background-color: #3a3745;
        font-family: NotoSansKR, Apple SD Gothic Neo;
        font-size: 12px;
        letter-spacing: -0.6px;
        text-align: center;
        color: #6b6979;
      }
    }
  }
`;
