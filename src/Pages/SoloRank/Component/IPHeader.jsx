/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled/macro";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import * as table from "./styled/MTStyledTable";
import * as layout from "./styled/MTStyledLayout";

const S = { table, layout };

const IPHeader = ({ getSeachFilterPlayer }) => {
  const { t } = useTranslation();
  const { team, patch } = useSelector((state) => state.JungleMapReducer);

  const dispatch = useDispatch();

  const selectedPatches = Object.keys(patch).filter(
    (key) => patch[key] === true
  );

  console.log("selectedPatches", selectedPatches);

  return (
    <SWrapper>
      <S.table.AddPlayerPopupButton onClick={""}>
        <span>+</span>
        <div>
          <h5>{t("soloRank.InterestedPlayer.label.addPlayer")}</h5>
          <span>{t("soloRank.InterestedPlayer.desc.addPlayer")}</span>
        </div>
      </S.table.AddPlayerPopupButton>
    </SWrapper>
  );
};

export default IPHeader;

const SWrapper = styled.div`
  width: 1110px;
  height: auto;
  margin: 10px 0 30px;
  //padding: 22px 100px 21px;
  border-radius: 20px;
`;

const SButtonContainer = styled.div`
  margin-top: 40px;
  padding-top: 19px;
  width: 100%;
  border-top: 1px solid ${({ theme }) => theme.colors.border_light};
`;
