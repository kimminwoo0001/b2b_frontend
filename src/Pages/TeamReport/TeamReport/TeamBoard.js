import React, { useEffect, useState } from "react";
/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled/macro";
import axios from "axios";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { API } from "../../config";
import qs from "qs";
import axiosRequest from "../../../lib/axios/axiosRequest";
import { useDispatch } from "react-redux";
import { SetModalInfo } from "../../../redux/modules/modalvalue";


function TeamBoard() {
  const filters = useSelector((state) => state.FilterReducer);
  const user = useSelector((state) => state.UserReducer);
  const [all, setAll] = useState();
  const { t } = useTranslation();
  const dispatch = useDispatch();


  useEffect(() => {
    fetchingBanReport();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.team, filters.patch]);

  const fetchingBanReport = () => {
    try {
      const url = `${API}/lolapi/report/team/analysis?`;
      const params = {
        league: filters.league,
        year: filters.year,
        season: filters.season,
        patch: filters.patch,
        team: filters.team,
        token: user.token,
        id: user.id,
      };

      axiosRequest(undefined, url, params, function (e) {
        setAll(e);
      }, function (objStore) {
        dispatch(SetModalInfo(objStore)) // 오류 발생 시, Alert 창을 띄우기 위해 사용
      })
    } catch (e) {
      console.log(e);
    } finally {
    }
  };

  return (
    <TeamBoardWrapper>
      <PositionSBR>
        <BoardHeader>
          <label>{t("team.analysis.positionSBR")}</label>
        </BoardHeader>
        {all?.positionsbr ? (
          all?.positionsbr?.map((data, idx) => {
            return (
              <BoardContents key={idx}>
                <img src="Images/ico-team-reportcheck-gy.png" alt="" />
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
      </PositionSBR>
      <Ingame>
        <BoardHeader>
          <label>{t("team.analysis.ingame")}</label>
        </BoardHeader>
        {all?.ingame ? (
          all?.ingame?.map((data, idx) => {
            return (
              <BoardContents key={idx}>
                <img src="Images/ico-team-reportcheck-gy.png" alt="" />
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
      </Ingame>
    </TeamBoardWrapper>
  );
}

export default TeamBoard;

const TeamBoardWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 22px;
  height: calc(100vh - 210px);
`;

const PositionSBR = styled.div`
  width: 538px;
  height: 466px;
  border: solid 1px rgb(58, 55, 69);
  background-color: rgb(47, 45, 56);
`;

const BoardHeader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 42.5px;
  font-family: NotoSansKR, Apple SD Gothic Neo;
  font-size: 12px;
  font-weight: 500;
  color: rgb(132, 129, 142);
  border-bottom: 1px solid rgb(35, 33, 42);
  label {
    margin-right: 10px;
    margin-left: 15px;
  }
`;

const BoardContents = styled.div`
  display: flex;
  align-items: center;
  height: 56px;
  width: 100%;
  background-color: transparent;
  :nth-child(2n) {
    background-color: rgb(58, 55, 69);
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
const Ingame = styled.div`
  width: 538px;
  height: 466px;
  border: solid 1px rgb(58, 55, 69);
  background-color: rgb(47, 45, 56);
`;

const NoContents = styled.div`
  width: 538px;
  height: 390.5px;
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
