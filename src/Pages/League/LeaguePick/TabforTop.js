import React from "react";
import { useTranslation } from "react-i18next";
import styled, { css } from "styled-components";
import { useSelector } from "react-redux";
import ExcelExport from "../../../Components/UtilityComponent/ExcelExport";

// 주요픽 데이터 sorting Hooks
const useSortableData = (items, config = null) => {
  const [sortConfig, setSortConfig] = React.useState(config);

  const sortedItems = React.useMemo(() => {
    let sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return { items: sortedItems, requestSort, sortConfig };
};

// 챔피언 티어 데이터 sorting Hooks
const useSortableData2 = (tiers, config = null) => {
  const [sortConfig, setSortConfig] = React.useState(config);

  const sortedItems = React.useMemo(() => {
    let sortableItems = [...tiers];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [tiers, sortConfig]);

  const requestSorts = (key) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return { tiers: sortedItems, requestSorts, sortConfig };
};

function TabforBot({ importantPicks, pickDifference, tier, uniquePick }) {
  //주요픽 정렬 오름차 내림차 상태 값

  const { items, requestSort } = useSortableData(
    importantPicks ? importantPicks : []
  );
  // 챔피언 티어 오름차 내림차  정렬 상태값
  const { tiers, requestSorts } = useSortableData2(tier ? tier : []);
  const lang = useSelector((state) => state.LocaleReducer);
  const { t } = useTranslation();
  const filters = useSelector((state) => state.FilterReducer);

  return (
    <PickTabWrapper>
      <TopRow>
        <MainPicks>
          <Header>
            <span id="header-name">{t("league.draft.mostPick")}</span>
            <ExcelExport
              filename={t("league.draft.mostPick")}
              tableid="mostPick-table"
            />
          </Header>
          <PickTable id="mostPick-table">
            <thead>
              <tr>
                <th className="Champion">{t("league.draft.champion")}</th>
                {/* <th className="PickCount" onClick={() => requestSort("pick")}> */}
                <th className="PickCount">

                  <div className="sorting">{t("league.draft.picks")}</div>
                </th>
                {/* <th className="PickCount" onClick={() => requestSort("ban")}> */}
                <th className="PickCount" >
                  <div className="sorting">
                    {t("league.draft.ban")}
                    {/* <Sortingimage>
                      <img src="Images/ico-sorting-up.png" alt="up" />
                      <img src="Images/ico-sorting-down.png" alt="down" />
                    </Sortingimage> */}
                  </div>
                </th>
                {/* <th className="BanRate" onClick={() => requestSort("pickRate")}> */}
                <th className="BanRate">
                  <div className="sorting">{t("league.draft.banRate")}</div>
                </th>
                {/* <th className="WinRate" onClick={() => requestSort("winrate")}> */}
                <th className="WinRate">
                  <div className="sorting">{t("league.draft.winRate")}</div>
                </th>
                {/* <th
                  className="ProbRate"
                  onClick={() => requestSort("probRate")}
                > */}
                <th
                  className="ProbRate">
                  <div className="sorting">{t("league.draft.probRate")}</div>
                </th>
                <th className="none"></th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 && (
                <LoadingImage>
                  <img src="Images/loadingSpinner_purple.gif" alt="Loading" />
                </LoadingImage>
              )}
              {items?.map((data, idx) => {
                return (
                  <tr key={idx}>
                    <td className="ChampName">
                      <div className="ChampWrapper">
                        <img src={`https://am-a.akamaihd.net/image?resize=90:&f=${data.championImage}`} alt="champIcon"></img>
                        <div>
                          {lang === "ko" ? data.championKor : data.champion}
                        </div>
                      </div>
                    </td>
                    <td className="Picks">{data.pick}</td>
                    <td className="Picks">{data.ban}</td>
                    <td className="PickBan">{data.pickRate.toFixed(0)}%</td>
                    <td className="Win">{data.winrate.toFixed(0)}%</td>
                    <td className="Prob">{data.probRate.toFixed(0)}%</td>
                  </tr>
                );
              })}
            </tbody>
          </PickTable>
        </MainPicks>
        <ChampionTier>
          <Header>
            <span id="header-name">{t("league.draft.champtier")}</span>
            <ExcelExport
              filename={t("league.draft.champtier")}
              tableid="champtier-table"
            />
          </Header>
          <TierTable id="champtier-table">
            <thead>
              <tr>
                <th className="Champion">{t("league.draft.champion")}</th>
                <th className="PickCount" onClick={() => requestSorts("pick")}>
                  <div className="sorting">{t("league.draft.pick")}
                    <Sortingimage>
                      <img src="Images/ico-sorting-up.png" alt="up" />
                      <img src="Images/ico-sorting-down.png" alt="down" />
                    </Sortingimage>
                  </div>
                </th>
                <th className="BanRate" onClick={() => requestSorts("ban")}>
                  <div className="sorting">{t("league.draft.ban")}
                    <Sortingimage>
                      <img src="Images/ico-sorting-up.png" alt="up" />
                      <img src="Images/ico-sorting-down.png" alt="down" />
                    </Sortingimage>
                  </div>
                </th>
                <th className="WinRate" onClick={() => requestSorts("win")}>
                  <div className="sorting">{t("league.draft.win")}</div>
                </th>
                <th
                  className="BanRate"
                  onClick={() => requestSorts("pickRate")}
                >
                  <div className="sorting">{t("league.draft.banRate")}</div>
                </th>
                <th className="WinRate" onClick={() => requestSorts("winRate")}>
                  <div className="sorting">{t("league.draft.winRate")}</div>
                </th>
                <th className="WinRate" onClick={() => requestSorts("score")}>
                  <div className="sorting">{t("league.draft.score")}</div>
                </th>
                <th className="Score" onClick={() => requestSorts("score")}>
                  <div className="sorting">{t("league.draft.tier")}</div>
                </th>
                <th className="none"></th>
              </tr>
            </thead>
            <tbody>
              {tiers.length === 0 && (
                <LoadingImage>
                  <img src="Images/loadingSpinner_purple.gif" alt="Loading" />
                </LoadingImage>
              )}
              {tiers?.map((data, idx) => {
                let tierData = 0;
                if (data.score >= 29.5) {
                  tierData = 0;
                } else if (data.score >= 19.5) {
                  tierData = 1;
                } else if (data.score >= 9.5) {
                  tierData = 2;
                } else {
                  tierData = 3;
                }
                return (
                  <tr key={idx}>
                    <td className="ChampName">
                      <div className="NameWrapper">
                        <img
                          src={`Images/champion/${data.name}.png`}
                          alt="champIcon"
                        ></img>
                        <div>
                          {lang === "ko" ? data.championKor : data.name}
                        </div>
                      </div>
                    </td>
                    <td className="Picks">{data.pick}</td>
                    <td className="PickBan">{data.ban}</td>
                    <td className="Win">{data.win}</td>
                    <td className="PickBan">{data.pickRate.toFixed(0)}%</td>
                    <td className="Win">{data.winRate.toFixed(0)}%</td>
                    <td className="Win">{data.score.toFixed(0)}</td>
                    <td className="Score">{tierData}</td>
                  </tr>
                );
              })}
            </tbody>
          </TierTable>
        </ChampionTier>
      </TopRow>
      <BottomRow>
        <MatchHistory>
          <Header>
            <span id="header-name">{t("league.draft.against")}</span>
          </Header>
          <MatchWrapper id="against-table">
            {pickDifference && pickDifference.length === 0 && (
              <LoadingImage>
                <img src="Images/loadingSpinner_purple.gif" alt="Loading" />
              </LoadingImage>
            )}
            {pickDifference?.map((pick, idx) => {
              return (
                <MatchContents key={idx}>
                  <BlueSide>
                    <ChampInfo>
                      <img
                        src={`https://am-a.akamaihd.net/image?resize=90:&f=${pick?.champion.championImage}`}
                        alt="champIcon"
                      ></img>
                      <div>
                        <div className="MatchChamp">
                          {lang === "ko"
                            ? pick?.champion.championKor
                            : pick?.champion.champion}
                        </div>
                        <div className="WinLose">{`${pick?.champion.win}${t(
                          "league.draft.w"
                        )} ${pick?.champion.lose}${t("league.draft.l")}`}</div>
                      </div>
                    </ChampInfo>
                    <KDA>
                      <div className="Kda">KDA</div>
                      <span className="Kills">
                        {pick?.champion.kills.toFixed(0)}
                      </span>
                      <p className="Slash">/</p>
                      <span className="Deaths">
                        {pick?.champion.deaths.toFixed(0)}
                      </span>
                      <p className="Slash">/</p>
                      <span className="Support">
                        {pick?.champion.assists.toFixed(0)}
                      </span>
                      <span className="Rate">{`${pick?.champion.kda.toFixed(
                        1
                      )} : 1`}</span>
                    </KDA>
                    <Kills>
                      <div className="KillRate">{t("league.draft.kp")}</div>
                      <div className="RateNumber">
                        {pick?.champion.kp.toFixed(0)}%
                      </div>
                    </Kills>
                    <DPM>
                      {filters.league.indexOf("lpl") === -1 ? (
                        <div className="DPM">PR</div>
                      ) : (
                        <div></div>
                      )}
                      {filters.league.indexOf("lpl") === -1 ? (
                        <div className="DPMNumber">{
                          pick?.champion.pr === null ? t("league.pick.prNull") : pick?.champion.pr.toFixed(1)
                        }

                        </div>
                      ) : (
                        <div></div>
                      )}
                    </DPM>
                  </BlueSide>
                  <div className="Vs">VS</div>
                  <RedSide>
                    <ChampInfo>
                      <div>
                        <div className="MatchChampTwo">
                          {lang === "ko"
                            ? pick?.opp_champion.championKor
                            : pick?.opp_champion.champion}
                        </div>
                        <div className="WinLose2">{`${pick?.opp_champion.win
                          }${t("league.draft.w")} ${pick?.opp_champion.lose}${t(
                            "league.draft.l"
                          )}`}</div>
                      </div>
                      <img
                        src={`https://am-a.akamaihd.net/image?resize=90:&f=${pick?.opp_champion.championImage}`}
                        alt="champIcon"
                      ></img>
                    </ChampInfo>
                    <KDA>
                      <span className="Kills">
                        {pick?.opp_champion.kills.toFixed(0)}
                      </span>
                      <p className="Slash">/</p>
                      <span className="Deaths">
                        {pick?.opp_champion.deaths.toFixed(0)}
                      </span>
                      <p className="Slash">/</p>
                      <span className="Support">
                        {pick?.opp_champion.assists.toFixed(0)}
                      </span>
                      <span className="Rate">{`${pick?.opp_champion.kda.toFixed(
                        1
                      )} : 1`}</span>
                      <div className="KdaTwo">KDA</div>
                    </KDA>
                    <Kills>
                      <div className="RateNumber">
                        {pick?.opp_champion.kp.toFixed(0)}%
                      </div>
                      <div className="KillRateTwo">{t("league.draft.kp")}</div>
                    </Kills>
                    <DPM>
                      {filters.league.indexOf("lpl") === -1 ? (
                        <div className="DPMNumber">
                          {
                            pick?.opp_champion.pr === null ? t("league.pick.prNull") : pick?.opp_champion.pr.toFixed(1)
                          }
                        </div>
                      ) : (
                        <div></div>
                      )}
                      {filters.league.indexOf("lpl") === -1 ? (
                        <div className="DPMTwo">PR</div>
                      ) : (
                        <div></div>
                      )}
                    </DPM>
                  </RedSide>
                </MatchContents>
              );
            })}
          </MatchWrapper>
        </MatchHistory>
        <UniquePicks>
          <Header>
            <span id="header-name">{t("league.draft.unique")}</span>
            <ExcelExport
              filename={t("league.draft.unique")}
              tableid="unique-table"
            />
          </Header>
          <UniqueTable id="unique-table">
            <thead>
              <UniqueNavBar>
                <th className="Champion">{t("league.draft.champion")}</th>
                <th className="WinRate">{t("league.draft.player")}</th>
                <th className="PickCount">{t("league.draft.result")}</th>
                <th className="BanRate">{t("league.draft.opponent")}</th>
                <th className="WinRate">{t("league.draft.oppplayer")}</th>
              </UniqueNavBar>
            </thead>
            <tbody>
              {uniquePick && uniquePick.length === 0 ? (
                <NoData>{t("league.draft.noUniquePickData")}</NoData>
              ) : (
                ""
              )}
              {uniquePick?.map((data, idx) => {
                return (
                  <UniqueMappingPicks key={idx}>
                    <td className="ChampName">
                      <div className="champ">
                        <img
                          src={`Images/champion/${data.champion}.png`}
                          alt="champIcon"
                          onError={(e) => {
                            e.target.src = "Images/ico-player.png";
                          }}
                        ></img>
                        <span>
                          {lang === "ko" ? data.championKor : data.champion}
                        </span>
                      </div>
                    </td>
                    <td className="PlayerUsed">{`${data.player} `}</td>
                    <td className="Win">
                      <Result color={data.result === "Win"}>
                        {data.result}
                      </Result>
                    </td>
                    <td className="ChampName">
                      <div className="champ">
                        <img
                          src={`Images/champion/${data.oppChampion}.png`}
                          onError={(e) => {
                            e.target.src = "Images/ico-player.png";
                          }}
                          alt="champIcon"
                        ></img>
                        <span>
                          {lang === "ko"
                            ? data.oppChampionKor
                            : data.oppChampion}
                        </span>
                      </div>
                    </td>
                    <td className="PlayerUsed">{`${data.oppPlayer} `}</td>
                  </UniqueMappingPicks>
                );
              })}
            </tbody>
          </UniqueTable>
        </UniquePicks>
      </BottomRow>
    </PickTabWrapper>
  );
}

export default TabforBot;

const Sortingimage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 4px;
  cursor: pointer;
`;

const Result = styled.div`
  color: white;
  ${(props) =>
    props.color &&
    css`
      color: #f04545;
    `}
`;

const PickTabWrapper = styled.div`
  display: flex;
  margin-top: 30px;
`;

const TopRow = styled.div`
  display: flex;
  flex-direction: column;
`;

const BottomRow = styled.div`
  display: flex;
  flex-direction: column;
`;

const MainPicks = styled.div`
  width: 538px;
  height: 551px;
  border: solid 1px rgb(58, 55, 69);
  background-color: rgb(47, 45, 56);
  margin-right: 22px;
  margin-bottom: 22px;
  border-radius: 20px;
`;

const Header = styled.div`
  width: 100%;
  height: 51px;
  padding: 19.5px 0 0 21px;
  border-bottom: 1px solid rgb(35, 33, 42);
  font-family: Poppins;
  color: #84818e;
  font-size: 13px;
  font-weight: bold;
  #header-name {
    font-size: 16px;
    color: #fff;
  }
`;

const NoData = styled.div`
  position: absolute;
  top: 40%;
  right: 33%;
  color: #fff;
`;

const UniqueTable = styled.table`
  width: 100%;

  > thead > tr {
    display: table;
    table-layout: fixed;
    width: 100%;
    height: 28px;
    background-color: #3a3745;
    > .Champion {
      padding: 0 0 0 10px;
      vertical-align: middle;
      text-align: left;
      /* width: 155px; */
    }
    > .BanRate {
      padding: 0 0 0 10px;
      vertical-align: middle;
      text-align: left;
    }
    > .PickCount {
      /* width: 60px; */
  
    
    }
    > th {
      vertical-align: middle;
      text-align: center;
    }
  }
  > tbody {
    position: relative;
    display: block;
    height: 185px;
    overflow: auto;
    border-radius: 20px;
    &::-webkit-scrollbar {
      width: 5px;
      height: 10px;

      border-radius: 3px;
      background: transparent;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #696777;
      border-radius: 3px;
    }
    > tr {
      :last-child {
        border: none;
      }
      font-size: 15px;
      display: table;
      table-layout: fixed;
      width: 100%;
      height: 31px;
      border: 1px solid rgb(58, 55, 69);
      img {
        width: 19px;
        height: 19px;
        border-radius: 20px;
        margin: 0 13px 0 10px;
      }
      > .ChampName {
        /* width: 140px; */
        vertical-align: middle;
        text-align: left;
        > .champ {
          display: flex;
          align-items: center;
        }
      }
      > .PlayerUsed {
        /* width: 110px; */
        vertical-align: middle;
        text-align: center;
        color: rgb(132, 129, 142);
      }
      > .Win {
        /* width: 60px; */
        vertical-align: middle;
        text-align: center;
      }
    }
  }
`;
const PickTable = styled.table`
  width: 100%;

  > thead > tr {
    display: table;
    table-layout: fixed;
    width: 100%;
    height: 28px;
    background-color: #3a3745;
    .Champion {
      text-align: left;
      padding-left: 10px;
      width: 160px;
    }
    > .none {
      width: 3px;
    }
    > th {
      vertical-align: middle;
      font-family: NotoSansKR, Apple SD Gothic Neo;
      font-size: 15px;
      font-weight: bold;
      color: #817e90;
      text-align: center;
      width: 75px;
      > .sorting {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
  > tbody {
    display: block;
    border-radius: 20px;
    height: 470px;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 5px;
      height: 10px;
      border-radius: 3px;
      background: transparent;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #696777;
      border-radius: 3px;
    }
    > tr {
      :last-child {
        border: none;
      }
      display: table;
      table-layout: fixed;
      width: 100%;
      height: 31px;
      border: 1px solid rgb(58, 55, 69);
      .ChampWrapper {
        display: flex;
        align-items: center;
        img {
          width: 26px;
          height: 26px;
          border-radius: 20px;
          margin: 0 13px 0 10px;
        }
      }
      > .ChampName {
        width: 153px;
      }
      > .Win {
        color: #f04545;
      }
      td {
        font-family: NotoSansKR, Apple SD Gothic Neo;
        font-size: 15px;
        text-align: left;
        color: #ffffff;
        vertical-align: middle;
        text-align: center;
        width: 70px;
      }
    }
  }
`;

const MatchWrapper = styled.div`
  overflow: auto;
  height: 495.5px;
  border-radius: 20px;
  &::-webkit-scrollbar {
    width: 5px;
    height: 10px;

    border-radius: 3px;
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #696777;
    border-radius: 3px;
  }
`;

const MatchHistory = styled.div`
  width: 538px;
  height: 551px;
  margin-right: 22px;
  margin-bottom: 22px;
  border: solid 1px rgb(58, 55, 69);
  background-color: rgb(47, 45, 56);
  border-radius: 20px;
`;

const MatchContents = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(72, 70, 85);
  .Vs {
    width: 20px;
    height: 24px;
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    color: #6b6979;
  }
`;

const BlueSide = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  font-family: NotoSansKR, Apple SD Gothic Neo;
  color: white;
  font-size: 13px;
  font-weight: bold;
  width: 258px;
  height: 147px;
  padding: 16.5px 0 26px 13.5px;
  margin-top: 19.5px;
  /* background-image: url("Images/img-op-score-leftred.png"); */
`;

const RedSide = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  font-family: NotoSansKR, Apple SD Gothic Neo;
  color: white;
  font-size: 13px;
  font-weight: bold;
  width: 258px;
  height: 147px;
  padding: 16.5px 13.5px 26px 0px;
  margin-top: 19.5px;
  /* background-image: url("Images/img-op-score-rightred.png"); */
`;

const ChampInfo = styled.div`
  display: flex;
  margin-bottom: 13px;
  font-family: NotoSansKR, Apple SD Gothic Neo;
  font-size: 12px;
  color: #ffffff;
  .MatchChamp {
    text-align: left;
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 15px;
    font-weight: bold;
    text-align: left;
    color: #ffffff;
    margin-bottom: 5px;
  }
  .WinLose {
    font-family: SpoqaHanSansNeo;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    text-align: left;
    color: #ffffff;
  }
  .WinLose2 {
    font-family: SpoqaHanSansNeo;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    text-align: right;
    color: #ffffff;
  }
  .MatchChampTwo {
    text-align: right;
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 15px;
    font-weight: bold;
    color: #ffffff;
    margin-bottom: 5px;
  }
  img {
    width: 34px;
    height: 34px;
    border-radius: 40px;
    margin-right: 6px;
    :nth-child(2) {
      margin-left: 6px;
      margin-right: 0px;
    }
  }
`;

const KDA = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  span {
    font-family: SpoqaHanSansNeo;
    font-size: 15px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.87;
    letter-spacing: normal;
    text-align: left;
    color: #fff;
  }
  .Slash {
    color: #817e90;
    margin: 0 4px 0 4px;
  }
  .Kda {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 45px;
    height: 17px;
    border-radius: 3px;
    background-color: #23212a;
    font-family: SpoqaHanSansNeo;
    font-size: 13px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 2.15;
    letter-spacing: normal;
    text-align: left;
    color: #fff;
    padding: 0 5px;
    margin: 6px 8px 6px 0;
  }
  .KdaTwo {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 45px;
    height: 17px;
    border-radius: 3px;
    background-color: #23212a;
    font-family: SpoqaHanSansNeo;
    font-size: 13px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 2.15;
    letter-spacing: normal;
    text-align: right;
    color: #fff;
    padding: 0 5px;
    margin: 6px 0px 6px 8px;
  }
  .Rate {
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 15px;
    text-align: center;
    color: rgb(240, 69, 69);
    margin: 0 0px 0 8px;
  }
`;

const Kills = styled.div`
  display: flex;
  margin-bottom: 5px;
  .RateNumber {
    font-family: SpoqaHanSansNeo;
    font-size: 15px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
  }
  .KillRate {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 45px;
    height: 17px;
    border-radius: 3px;
    background-color: #23212a;
    font-family: SpoqaHanSansNeo;
    font-size: 13px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 2.15;
    letter-spacing: normal;
    text-align: left;
    color: #fff;
    margin: 0px 8px 6px 0;
  }
  .KillRateTwo {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 45px;
    height: 17px;
    border-radius: 3px;
    background-color: #23212a;
    font-family: SpoqaHanSansNeo;
    font-size: 13px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 2.15;
    letter-spacing: normal;
    text-align: right;
    color: #fff;
    margin: 0px 0px 6px 8px;
  }
`;

const DPM = styled.div`
  display: flex;
  .DPMNumber {
    font-family: SpoqaHanSansNeo;
    font-size: 15px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
  }
  .DPM {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 45px;
    height: 17px;
    border-radius: 3px;
    background-color: #23212a;
    font-family: SpoqaHanSansNeo;
    font-size: 13px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 2.15;
    letter-spacing: normal;
    text-align: left;
    color: #fff;
    margin: 0px 8px 6px 0;
  }
  .DPMTwo {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 45px;
    height: 17px;
    border-radius: 3px;
    background-color: #23212a;
    font-family: SpoqaHanSansNeo;
    font-size: 13px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 2.15;
    letter-spacing: normal;
    text-align: right;
    color: #fff;
    margin: 0px 0px 6px 8px;
  }
`;

const UniquePicks = styled.div`
  width: 538px;
  height: 264px;
  border: solid 1px rgb(58, 55, 69);
  background-color: rgb(47, 45, 56);
  border-radius: 20px;
`;

const ChampionTier = styled.div`
  width: 538px;
  height: 264px;
  border: solid 1px rgb(58, 55, 69);
  background-color: rgb(47, 45, 56);
  border-radius: 20px;
`;

const UniqueNavBar = styled.tr`
  font-family: NotoSansKR, Apple SD Gothic Neo;
  font-size: 15px;
  font-weight: bold;
  color: #817e90;
  width: 100%;
  height: 28px;
  background-color: #3a3745;
`;

const UniqueMappingPicks = styled.tr`
  font-family: NotoSansKR, Apple SD Gothic Neo;

  font-size: 12px;
  color: #ffffff;
  width: 100%;
  height: 28px;
  border: 1px solid rgb(58, 55, 69);
`;

const TierTable = styled.table`
  width: 100%;

  thead > tr {
    display: table;
    table-layout: fixed;
    width: 100%;
    height: 28px;
    background-color: #3a3745;
    > .Champion {
      text-align: left;
      padding-left: 10px;
      width: 100px;
    }
    > .none {
      width: 3px;
    }
    > th {
      vertical-align: middle;
      font-family: NotoSansKR, Apple SD Gothic Neo;
      font-size: 15px;
      font-weight: bold;
      color: #817e90;
      text-align: center;
      width: 50px;
      > .sorting {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }

  > tbody {
    display: block;
    height: 185px;
    overflow: auto;
    border-radius: 20px;
    &::-webkit-scrollbar {
      width: 5px;
      height: 10px;

      border-radius: 3px;
      background: transparent;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #696777;
      border-radius: 3px;
    }

    > tr {
      :last-child {
        border: none;
      }
      display: table;
      table-layout: fixed;
      width: 100%;
      height: 31px;
      border: 1px solid rgb(58, 55, 69);
      .NameWrapper {
        display: flex;
        align-items: center;
        img {
          width: 26px;
          height: 26px;
          border-radius: 20px;
          margin: 0 13px 0 10px;
        }
      }
      > .Score {
        color: #f04545;
      }
      > .ChampName {
        width: 100px;
        div {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      td {
        vertical-align: middle;
        text-align: center;
        font-family: NotoSansKR, Apple SD Gothic Neo;
        font-size: 15px;
        color: #ffffff;
        width: 50px;
      }
    }
  }
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
