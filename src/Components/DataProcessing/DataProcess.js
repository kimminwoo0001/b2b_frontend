import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

export default function DataProcess() {
  //데이터 수집중 알림 컴포넌트
  const { t } = useTranslation();
  let today = new Date();
  let time = today.getHours();

  return (
    <>
      {time >= 18 && time < 20 ? (
        <DataProcessContainer>
          {/* <DataProcessWrapper>
            <img src="Images/dataprocess.gif" alt="data" />
            <label>{t("filters.dataProcess")}</label>
          </DataProcessWrapper> */}
        </DataProcessContainer>
      ) : (
        ""
      )}
    </>
  );
}

const DataProcessContainer = styled.div`
  display: flex;
`;

const DataProcessWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
  //width: auto;
  > img {
    width: 20px;
    height: 20px;
    margin-right: 11px;
  }
  > label {
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 12px;
    letter-spacing: -0.6px;
    text-align: left;
    color: #999999;
  }
`;
