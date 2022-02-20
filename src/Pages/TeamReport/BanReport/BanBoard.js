import React, { useEffect, useState } from "react";
/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled/macro";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { API } from "../../config";
import qs from "qs";
import axiosRequest from "../../../lib/axios/axiosRequest";
import { SetModalInfo } from "../../../redux/modules/modalvalue";

function BanBoard() {
  const filters = useSelector((state) => state.FilterReducer);
  const user = useSelector((state) => state.UserReducer);
  //밴픽 보고서
  const [all, setAll] = useState();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchingBanReport();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const fetchingBanReport = () => {
    try {
      const url = `${API}/lolapi/report/team/banpick`;
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
      //console.log(e);
    } finally {
    }
  };

  return (
    <BanBoardWrapper>
      <AllBoard>
        <BoardHeader>{t("team.draft.allSide")}</BoardHeader>
        {all?.all ? (
          all?.all?.map((data, idx) => {
            return (
              <BoardContents key={idx}>
                <img src="Images/ico-team-reportcheck-gr.png" alt="" />
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
      </AllBoard>
      <BlueBoard>
        <BoardHeader>{t("team.draft.blue")}</BoardHeader>{" "}
        {all?.blue ? (
          all?.blue?.map((data, idx) => {
            return (
              <BoardContentsB key={idx}>
                <img src="Images/ico-team-reportcheck-bl.png" alt="" />
                <Contents key={idx}>{data}</Contents>;
              </BoardContentsB>
            );
          })
        ) : (
          <NoContents>
            <img src="Images/img-no-contents.png" alt=""></img>
            <label>{t("team.analysis.noReports")}</label>
          </NoContents>
        )}
      </BlueBoard>
      <RedBoard>
        <BoardHeader>{t("team.draft.red")}</BoardHeader>{" "}
        {all?.red ? (
          all?.red?.map((data, idx) => {
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
      </RedBoard>
    </BanBoardWrapper>
  );
}

export default BanBoard;

const BanBoardWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 22px;
`;

const AllBoard = styled.div`
  width: 351px;
  height: 466px;
  border: solid 1px rgb(58, 55, 69);
  background-color: rgb(47, 45, 56);
`;

const BoardHeader = styled.div`
  width: 100%;
  padding: 13px 0 0 15px;
  height: 42.5px;
  font-family: Poppins;
  font-size: 13px;
  color: #6b6979;
  border-bottom: 1px solid rgb(35, 33, 42);
`;

const BoardContents = styled.div`
  display: flex;
  align-items: center;
  height: 56px;
  width: 100%;
  background-color: transparent;
  :nth-child(2n) {
    background-color: rgb(46, 54, 45);
  }

  > img {
    margin: 0 9px 0 14px;
  }
`;

const BoardContentsB = styled.div`
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

const Contents = styled.div`
  font-family: NotoSansKR, Apple SD Gothic Neo;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: -0.6px;
  text-align: left;
  color: rgb(255, 255, 255);
  line-height: 20px;
`;

const BlueBoard = styled.div`
  width: 351px;
  height: 466px;
  border: solid 1px rgb(58, 55, 69);
  background-color: rgb(47, 45, 56);
`;

const RedBoard = styled.div`
  width: 351px;
  height: 466px;
  border: solid 1px rgb(58, 55, 69);
  background-color: rgb(47, 45, 56);
`;

const NoContents = styled.div`
  width: 351px;
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
