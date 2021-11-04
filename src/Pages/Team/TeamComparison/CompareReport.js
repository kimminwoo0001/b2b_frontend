import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { API } from "../../config";
import qs from "qs";
import axiosRequest from "../../../lib/axiosRequest";


function CompareReport() {
  const filters = useSelector((state) => state.FilterReducer);
  const user = useSelector((state) => state.UserReducer);
  const [board, setBoard] = useState();
  const { t } = useTranslation();
  //팀 비교 보고서
  useEffect(() => {
    fetchingBanReport();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchingBanReport = () => {
    try {
      const url = `${API}/api/report/team/comparison`;
      const params = {
        league: filters.league,
        year: filters.year,
        season: filters.season,
        patch: filters.patch,
        team: filters.team,
        oppteam: filters.oppteam,
        token: user.token,
        id: user.id
      };
      axiosRequest(url, params, function (e) {
        setBoard(e.data);
      })
    } catch (e) {
      console.log(e);
    } finally {
    }
  };

  return (
    <CompareReportWrapper>
      <ReportContainer>
        <ReportContents>
          <ReportNav>
            <label>{t("team.comparison.strengthIngame")} </label>
          </ReportNav>
          {board?.team?.strength ? (
            board?.team?.strength?.map((data, idx) => {
              return (
                <BoardContents key={idx}>
                  <img src="Images/ico-team-reportcheck-bl.png" alt="" />
                  <Contents key={idx}>{data}</Contents>;
                </BoardContents>
              );
            })
          ) : (
            <NoContents>
              <img src="Images/img-no-contents.png" alt=""></img>
              <label>{t("team.analysis.noReports")}</label>
            </NoContents>
          )}
        </ReportContents>
        <ReportContents>
          <ReportNav>
            <label>{t("team.comparison.weakIngame")} </label>
          </ReportNav>
          {board?.team?.weakness ? (
            board?.team?.weakness?.map((data, idx) => {
              return (
                <BoardContentsR key={idx}>
                  <img src="Images/ico-team-reportcheck-rd.png" alt="" />
                  <Contents key={idx}>{data}</Contents>;
                </BoardContentsR>
              );
            })
          ) : (
            <NoContents>
              <img src="Images/img-no-contents.png" alt=""></img>
              <label>{t("team.analysis.noReports")}</label>
            </NoContents>
          )}
        </ReportContents>
      </ReportContainer>
      <ReportContainer>
        <ReportContents>
          <ReportNav>
            <label>{t("team.comparison.strengthLane")}</label>
          </ReportNav>
          {board?.oppteam?.strength ? (
            board?.oppteam?.strength?.map((data, idx) => {
              return (
                <BoardContents key={idx}>
                  <img src="Images/ico-team-reportcheck-bl.png" alt="" />
                  <Contents key={idx}>{data}</Contents>;
                </BoardContents>
              );
            })
          ) : (
            <NoContents>
              <img src="Images/img-no-contents.png" alt=""></img>
              <label>{t("team.analysis.noReports")}</label>
            </NoContents>
          )}
        </ReportContents>
        <ReportContents>
          <ReportNav>
            <label>{t("team.comparison.weakLane")}</label>
          </ReportNav>
          {board?.oppteam?.weakness ? (
            board?.oppteam?.weakness?.map((data, idx) => {
              return (
                <BoardContentsR key={idx}>
                  <img src="Images/ico-team-reportcheck-rd.png" alt="" />
                  <Contents key={idx}>{data}</Contents>;
                </BoardContentsR>
              );
            })
          ) : (
            <NoContents>
              <img src="Images/img-no-contents.png" alt=""></img>
              <label>{t("team.analysis.noReports")}</label>
            </NoContents>
          )}
        </ReportContents>
      </ReportContainer>
    </CompareReportWrapper>
  );
}

export default CompareReport;

const CompareReportWrapper = styled.div`
  height: calc(100vh - 190px);
`;

const ReportContainer = styled.div`
  margin-top: 22px;
  display: flex;
  justify-content: space-between;
`;

const ReportContents = styled.div`
  width: 538px;
  height: 296px;
  border: solid 1px rgb(58, 55, 69);
  background-color: rgb(47, 45, 56);
`;

const ReportNav = styled.nav`
  display: flex;
  align-items: center;
  height: 42.5px;
  border-bottom: 1px solid rgb(35, 33, 42);
  padding: 0 0 0 15px;
  > label {
    display: flex;
    align-items: center;
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: -0.6px;
    color: rgb(132, 129, 142);
    > img {
      margin-left: 11px;
    }
  }
`;

const BoardContents = styled.div`
  display: flex;
  align-items: center;
  height: 56px;
  width: 100%;
  background-color: transparent;
  :nth-child(2n) {
    background-color: rgb(40, 57, 67);
  }

  > img {
    margin: 0 9px 0 14px;
  }
`;
const Contents = styled.div`
  font-family: NotoSansKR, Apple SD Gothic Neo;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: -0.6px;
  text-align: left;
  color: rgb(255, 255, 255);
  line-height: 20px;
`;
const BoardContentsR = styled.div`
  display: flex;
  align-items: center;
  height: 56px;
  width: 100%;
  background-color: transparent;
  :nth-child(2n) {
    background-color: rgb(75, 43, 47);
  }

  > img {
    margin: 0 9px 0 14px;
  }
`;

const NoContents = styled.div`
  width: 538px;
  height: 220.5px;
  font-family: NotoSansKR, Apple SD Gothic Neo;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: -0.6px;
  text-align: left;
  color: rgb(130, 127, 140);
  line-height: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  > img {
    margin-bottom: 10px;
  }
`;
