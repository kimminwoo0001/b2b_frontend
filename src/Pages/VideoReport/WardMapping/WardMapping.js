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
import { API } from "../../config";
import qs from "qs";
import WardTooltip from "./WardTooltip";
import axiosRequest from "../../../lib/axiosRequest";
import { duration } from "@material-ui/core";
import { SetModalInfo } from "../../../redux/modules/modalvalue";

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
  const fetchingWardData = (wardside) => {
    try {
      // const url = `${API}/lolapi/waddingFilter`;
      const url = `${API}/lolapi/mapping/ward`;
      const params = {
        league: filters.league,
        year: filters.year,
        season: filters.season,
        patch: filters.patch,
        team: filters.team,
        player: filters.player,
        champion: filters.champion_eng,
        compare: compareOpen ? "on" : "off",
        oppteam: filters.oppteam,
        oppplayer: filters.oppplayer,
        oppchampion: filters.oppchampion_eng,
        side: wardside,
        firstTime: firstTime,
        secondTime: secondTime,
        token: user.token,
        id: user.id,
      };
      axiosRequest(
        undefined,
        url,
        params,
        function (e) {
          const dto = e.warding;
          setWard(e.warding);
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
        },
        function (objStore) {
          dispatch(SetModalInfo(objStore)); // 오류 발생 시, Alert 창을 띄우기 위해 사용
        }
      );
    } catch (e) {
      console.log(e);
    } finally {
    }
  };

  const handleWardClick = () => {
    if (tab === "team") {
      if (!filters.team) {
        alert(t("video.vision.selectTeam"));
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
        alert(t("video.vision.selectTeam"));
        return;
      }
      if (!filters.player) {
        alert(t("video.vision.selectPlayer"));
        return;
      }
      if (!filters.champion_eng) {
        alert(t("video.vision.selectChamp"));
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
        <WardMappingTabs>
          <TopTabItem
            onClick={() => {
              setTab("team");
              handleTimeReset();
              setCompareOpen(false);
              setWard([]);
              setTotalWard(0);
            }}
            changeColor={tab === "team"}
          >
            <div>
              <span>{t("video.vision.teamview")}</span>
            </div>
          </TopTabItem>

          <TopTabItem
            onClick={() => {
              setTab("player");
              handleTimeReset();
              setCompareOpen(false);
              setWard([]);
              setTotalWard(0);
            }}
            changeColor={tab === "player"}
          >
            <div>
              <span>{t("video.vision.playerview")}</span>
            </div>
          </TopTabItem>
          <LastMargin></LastMargin>
        </WardMappingTabs>
        <FilterContainer>
          <FilterContents>{contents[tab]}</FilterContents>
          <div className="ward-btn-area">
            <WardButton
              onClick={() => {
                setSide("all");
                handleWardClick();
              }}
              isActive={tab === "player" ? filters.champion_eng : filters.team}
            >
              {t("video.vision.checkWard")}
            </WardButton>
          </div>
        </FilterContainer>

        <ViewContainer>
          <ButtonContainer>
            <TabItem
              onClick={() => {
                setSide("all");
                fetchingWardData("all");
              }}
              changeColor={side === "all"}
            >
              <div>ALL</div>
            </TabItem>

            <TabItem
              onClick={() => {
                setSide("blue");
                fetchingWardData("blue");
              }}
              changeColor={side === "blue"}
            >
              <div>BLUE</div>
            </TabItem>

            <TabItem
              onClick={() => {
                setSide("red");
                fetchingWardData("red");
              }}
              changeColor={side === "red"}
            >
              <div>RED</div>
            </TabItem>
            {/* <LastMargin></LastMargin> */}
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
            backgroundImage: `url(${
              mapSector ? mapSector : "Images/ward_map.png"
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
                    trigger="mouseenter"
                    content={
                      <WardTooltip
                        wardType={ward.firstward}
                        champion={ward.champion}
                        player={ward.player}
                        time={ward.firstwardTime}
                        team={ward.team}
                        side={ward.side}
                        date={ward.date}
                        position={ward.position}
                        oppteam={ward.oppteam}
                        uniqueId={ward.uniqueid}
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
                    trigger="mouseenter"
                    content={
                      <WardTooltip
                        wardType={ward.secondward}
                        champion={ward.champion}
                        player={ward.player}
                        time={ward.secondwardTime}
                        team={ward.team}
                        side={ward.side}
                        date={ward.date}
                        position={ward.position}
                        oppteam={ward.oppteam}
                        uniqueId={ward.uniqueid}
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
  justify-content: space-between;
  align-items: center;
  padding-left: 15px;
  height: 50.5px;
  > span {
    font-family: SpoqaHanSansNeo;
    font-size: 16px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.75;
    letter-spacing: normal;
    text-align: left;
    color: #fff;
    margin-right: 5px;
  }
  > p {
    font-family: SpoqaHanSansNeo;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.75;
    letter-spacing: normal;
    text-align: left;
    color: #f04545;
  }
  > button {
    width: 140px;
    height: 34px;
    padding: 9px 18px 8px;
    border-radius: 10px;
    margin-right: 10px;
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 13px;
    letter-spacing: -0.6px;
    text-align: center;
    padding: 3px 5px;
    color: #fff;
    background-color: #484655;
  }
`;

const NoContentTable = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

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
  margin-top: 0px;
`;

const LeftSection = styled.section`
  display: flex;
  flex-direction: column;
  margin-right: 22px;
`;

const RightSection = styled.section``;

const FilterContainer = styled.div`
  width: 564px;
  min-height: 264px;
  /* border: solid 1px rgb(67, 63, 78); */
  background-color: #2f2d38;
  border-radius: 20px;
  padding-top: 30px;

  .ward-btn-area {
    border-top: solid 1px #433f4e;
  }
`;

const TabContainer = styled.div`
  display: flex;
  width: 504px;
  height: 60px;
  margin: 0 30px 30px;
`;

const TopTabItem = styled.button`
  display: flex;
  align-items: center;
  width: auto;
  border-bottom: solid 1px #433f4e;
  white-space: nowrap;
  div {
    border-radius: 10px;
    padding: 10px 15px;
  }

  :hover {
    div {
      padding: 10px 15px;
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

const TabItem = styled.button`
  width: 72px;
  border-radius: 10px;
  background-color: ${(props) => (props.changeColor ? "#23212a" : " #3a3745")};
  padding: 9px 15px;
  margin-right: 5px;
  height: 34px;
  font-family: "Spoqa Han Sans";
  font-size: 13px;
  color: ${(props) => (props.changeColor ? `#fff` : `#84818e`)};
`;

const FilterContents = styled.div``;

const WardButton = styled.button`
  width: 524px;
  height: 60px;
  margin: 20px 20px;
  padding: 21px 20px 20px;
  border-radius: 20px;
  background-color: rgb(105, 103, 119);
  color: #fff;
  :hover {
    opacity: 0.8;
  }
  ${(props) =>
    props.isActive &&
    css`
      background-color: #5942ba;
    `}
`;

const ViewContainer = styled.div``;

const WardMap = styled.div`
  width: 512px;
  height: 512px;
  position: relative;
  background-image: url("Images/ward_map.png");
`;

const ButtonContainer = styled.div`
  margin: 30px 0 10px 0;
`;

const WardTable = styled.div`
  width: 564px;
  min-height: 330px;
  /* border: solid 1px #3a3745; */
  background-color: #23212a;
  border-radius: 20px;
  position: relative;
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
      font-size: 15px;
      font-weight: bold;
      letter-spacing: -0.6px;
      text-align: center;
      color: #817e90;
    }
  }
  > tbody > tr {
    border-top: 1px solid #3a3745;
    width: 100%;
    height: 39.5px;
    color: #ffffff;
    font-size: 15px;
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
      text-align: right;
      padding-right: 30px;
      width: 30%;
      > button {
        width: 102px;
        height: 34px;
        border-radius: 10px;
        border: solid 1px #474554;
        //background-color: #3a3745;
        font-family: NotoSansKR, Apple SD Gothic Neo;
        font-size: 13px;
        letter-spacing: -0.6px;
        text-align: center;
        color: #6b6979;
      }
    }
  }
`;

const LineMargin = styled.div`
  width: 30px;
  border-bottom: solid 1px #433f4e;
`;

const LastMargin = styled.div`
  width: 73%;
  border-bottom: solid 1px #433f4e;
`;

const WardMappingTabs = styled.div`
  display: flex;
  height: 62px;
  margin-bottom: 20px;
`;
