import React, { useState, useEffect, memo } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import axios from "axios";
import LoadingImg from "../../Components/LoadingImg/LoadingImg";
import { API, recentVersion } from "../config";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "../../redux/modules/filtervalue";
import { SetFilterAllItems, SetRunesJson } from "../../redux/modules/staticvalue";

import axiosRequest from "../../lib/axiosRequest";
import LeagueRank from "./LeagueRank";
import { SetStatus, SetModalInfo } from "../../redux/modules/modalvalue";

const HomeContents = memo(() => {
  const filters = useSelector((state) => state.FilterReducer);
  const staticvalue = useSelector((state) => state.StaticValueReducer);
  const user = useSelector((state) => state.UserReducer);
  const modal = useSelector((state) => state.ModalReducer)

  const { t } = useTranslation();
  let history = useHistory();
  const dispatch = useDispatch();

  //리그마다 데이터 저장하는 상태값
  const [leagueDataset, setLeagueDataset] = useState([]);
  // const [lckData, setLckData] = useState([]);
  // const [lecData, setLecData] = useState([]);
  // const [lcsData, setLcsData] = useState([]);
  // const [lplData, setLplData] = useState([]);
  // const [vcsData, setVcsData] = useState([]);

  useEffect(() => {
    fetchHomeData();
    fetchFilterData();
    fetchRunesObject();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 홈 데이터 fetch 해오는 함수

  const fetchHomeData = () => {
    dispatch(Loading(true));
    console.log(user);
    try {
      const url = `${API}/lolapi/home/home`;
      const params = {
        token: user.token
      }
      axiosRequest(undefined, url, params, function (data) {
        console.log("modal", modal);
        setLeagueDataset(data);
        dispatch(Loading(false));
      }, function (objStore) {
        dispatch(SetModalInfo(objStore)) // 오류 발생 시, Alert 창을 띄우기 위해 사용
      })
      //
    } catch (e) {
      console.log(e);
      dispatch(Loading(false));
    }
  };

  const fetchFilterData = () => {
    if (staticvalue.filterObjects === null) {
      dispatch(Loading(true));
      try {
        const url = `${API}/lolapi/filter/filterCall`;
        const params = {
          token: user.token,
          id: user.id
        }
        axiosRequest(undefined, url, params, function (data) {
          console.log(data);
          dispatch(SetFilterAllItems(data));
          dispatch(Loading(false));
        }, function (objStore) {
          dispatch(SetModalInfo(objStore)) // 오류 발생 시, Alert 창을 띄우기 위해 사용
          dispatch(Loading(false));
        })
      } catch (e) {
        console.log(e);
        dispatch(Loading(false));
      }
    }
  };

  const fetchRunesObject = () => {
    if (staticvalue.runesObjects === null) {
      dispatch(Loading(true));
      try {
        fetch(`https://ddragon.leagueoflegends.com/cdn/${recentVersion}/data/ko_KR/runesReforged.json`)
          .then(res => res.json())
          .then(out => dispatch(SetRunesJson(out)))
          .catch(err => console.log("Not load Rune Dataset."));
        dispatch(Loading(false));
      } catch (e) {
        console.log(e);
        dispatch(Loading(false));
      }
    }
  }

  console.log("전역 변수 테스트", staticvalue);
  return (
    <LeagueListWrapper>
      <BoxWrapper>
        <TopBox>
          <LeagueRank
            imgSrc="Images/ico-league-lck.png"
            imgAlt="lckIcon"
            leagueName="LCK"
            leagueDataset={leagueDataset["LCK"]}
          />
          <LeagueRank
            imgSrc="Images/ico-league-lec.png"
            imgAlt="lecIcon"
            leagueName="LEC"
            leagueDataset={leagueDataset["LEC"]}
          />
        </TopBox>
        <BottomBox>
          <LeagueListSmall>
            <LeagueNav>
              <img src="Images/ico-league-lcs.png" alt="lckIcon"></img>
              <div className="LeagueName">LCS</div>
            </LeagueNav>
            <HomeTable>
              <colgroup>
                <col width="11%" />
                <col width="45%" />
                <col width="8.5%" />
                <col width="8.5%" />
                <col width="13.5%" />
                <col width="13.5%" />
              </colgroup>
              <thead>
                <tr>
                  <th className="Rank">{t("home.rank")}</th>
                  <th className="TeamName">{t("home.teamName")}</th>
                  {/* <th className="playoff"></th> */}
                  <th className="Win">{t("home.win")}</th>
                  <th className="Lose">{t("home.lose")}</th>
                  <th className="WinRate">{t("home.winrate")}</th>
                  <th className="Points">{t("home.points")}</th>
                </tr>
              </thead>
              <tbody>
                {leagueDataset["LCS"]?.map((leagueData, index) => {
                  return (
                    <tr key={index}>
                      <td className="Rank">{leagueData.Place}</td>
                      <td className="TeamName">
                        <div className="TeamWrapper">
                          <img
                            src={`Images/HomeLogo/${leagueData.Team}.png`}
                            alt="teamlogo"
                          ></img>
                          <div>{leagueData.Team}</div>
                        </div>
                      </td>
                      {/* <td>
                        {leagueData.PO === true ? <PlayOff>P.O</PlayOff> : ""}
                        {leagueData.PL === true ? <PL>P.L</PL> : ""}
                      </td> */}
                      <td className="Win"> {leagueData.WinSeries}</td>
                      <td className="Lose">{leagueData.LossSeries}</td>
                      <td className="WinRate">{`${leagueData.WinRate.toFixed(
                        1
                      )}%`}</td>
                      <td className="Points">{leagueData.PointsTiebreaker}</td>
                    </tr>
                  );
                })}
              </tbody>
            </HomeTable>
          </LeagueListSmall>
          <LeagueRank
            imgSrc="Images/ico-league-lpl.png"
            imgAlt="lplIcon"
            leagueName="LPL"
            leagueDataset={leagueDataset["LPL"]}
          />

          {/* <LeagueList>
            <LeagueNav>
              <img src="Images/ico-league-vcs.png" alt="lckIcon"></img>
              <div className="LeagueName">VCS</div>
            </LeagueNav>
            <HomeTable>
              <thead>
                <tr>
                  <th className="Rank">{t("home.rank")}</th>
                  <th className="TeamName">{t("home.teamName")}</th>
                  <th className="playoff"></th>
                  <th className="Win">{t("home.win")}</th>
                  <th className="Lose">{t("home.lose")}</th>
                  <th className="WinRate">{t("home.winrate")}</th>
                  <th className="Points">{t("home.points")}</th>
                </tr>
              </thead>
              <tbody>
                {vcsData?.map((leagueData, index) => {
                  return (
                    <tr key={index}>
                      <td className="Rank">{leagueData.Place}</td>
                      <td className="TeamName">
                        <div className="TeamWrapper">
                          <img
                            src={`Images/HomeLogo/${leagueData.Team}.png`}
                            alt="teamlogo"
                          ></img>
                          <div>{leagueData.Team}</div>
                        </div>
                      </td>
                      <td>
                        {leagueData.PO === true ? <PlayOff>P.O</PlayOff> : ""}
                        {leagueData.PL === true ? <PL>P.L</PL> : ""}
                      </td>
                      <td className="Win">{leagueData.WinSeries}</td>
                      <td className="Lose">{leagueData.LossSeries}</td>
                      <td className="WinRate">{`${leagueData.WinRate.toFixed(
                        1
                      )}%`}</td>
                      <td className="Points">{leagueData.PointsTiebreaker}</td>
                    </tr>
                  );
                })}
              </tbody>
            </HomeTable>
          </LeagueList> */}
        </BottomBox>
      </BoxWrapper>
    </LeagueListWrapper>
  );
});

export default HomeContents;

const LeagueListWrapper = styled.div`
  display: flex;
  width: 1210px;
  flex-wrap: wrap;
  margin: 30px 0 26.3px 40px;
`;

const BoxWrapper = styled.div``;

const TopBox = styled.div`
  display: flex;
`;

const BottomBox = styled.div`
  display: flex;
`;

const LeagueList = styled.div`
  margin: 0 20px 24.5px 0;
  width: 594px;
  // height: 432px;
  border: solid 1px #3a3745;
  background-color: #2f2d38;
  border-radius: 20px;
`;

const LeagueListSmall = styled.div`
  margin: 0 20px 24.5px 0;
  width: 594px;
  height: 457px;
  border: solid 1px #3a3745;
  background-color: #2f2d38;
  border-radius: 20px;
`;

const LeagueNav = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #23212a;
  height: 54px;
  img {
    width: 24px;
    height: 24px;
    margin: 0 10px 0 15px;
  }
  div {
    width: 29px;
    height: 19px;
    font-family: SpoqaHanSansNeo;
    font-size: 16px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.1;
    letter-spacing: normal;
    text-align: left;
    color: #fff;
  }
`;

const PlayOff = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 15px;
  border-radius: 2px;
  background-color: rgb(240, 69, 69);
`;

const PL = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 15px;
  border-radius: 2px;
  background-color: rgb(0, 117, 191);
`;

const HomeTable = styled.table`
  width: 100%;
  > thead > tr {
    width: 100%;
    height: 28px;
    background-color: #3a3745;
    th {
      font-family: NotoSansKR, Apple SD Gothic Neo;
      font-size: 12px;
      font-weight: bold;
      text-align: center;
      color: #817e90;
      vertical-align: middle;
    }
  }
  > tbody > tr {
    :nth-child(1) {
      background-color: #3e2222;
    }

    height: 36px;
    width: 100%;
    border-top: 1px solid #3a3745;
    > .WinRate {
      color: #f04545;
    }
    > .TeamName {
      text-align: left;
    }
    .TeamWrapper {
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    img {
      width: 20px;
      height: 20px;
      margin-right: 13.2px;
    }
    td {
      font-family: SpoqaHanSansNeo;
      font-size: 15px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: 2.4;
      letter-spacing: normal;
      color: #fff;
      text-align: center;
      color: #ffffff;
      vertical-align: middle;
      width: 50px;
    }
  }
`;
