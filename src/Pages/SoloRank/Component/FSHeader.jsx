/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled/macro";

import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import TopFilter from "../../../Components/Filter/TopFilter";
import Button from "../../../Components/Ui/Button";
import { getTrueValueList } from "../../../lib/getTureValueList";
import { borderRadiusStyle, buttonStyle, typoStyle } from "../../../Styles/ui";

const FSHeader = ({ getSeachFilterPlayer }) => {
  const { t } = useTranslation();
  const { teams, patch } = useSelector((state) => state.JungleMapReducer);
  const selectedTeams = getTrueValueList(teams);
  const selectedPatches = getTrueValueList(patch);

  const dispatch = useDispatch();

  return (
    <SWrapper>
      <TopFilter needsMultipleTeams={true} />
      <SButtonContainer>
        <Button
          disabled={selectedPatches.length === 0 || selectedTeams.length === 0}
          css={[
            buttonStyle.color.main,
            buttonStyle.size.full,
            buttonStyle.size.y_16,
            typoStyle.search_btn,
            borderRadiusStyle[20],
          ]}
          onClick={() => {
            getSeachFilterPlayer(selectedTeams, selectedPatches);
          }}
        >
          {t("soloRank.searchFilter.label.searchSoloRank")}
        </Button>
      </SButtonContainer>
    </SWrapper>
  );
};

export default FSHeader;

const SWrapper = styled.div`
  width: 1110px;
  height: auto;
  margin: 10px 0 20px;
  //padding: 22px 100px 21px;
  border-radius: 20px;
`;

const SButtonContainer = styled.div`
  margin-top: 40px;
  padding-top: 19px;
  width: 100%;
  border-top: 1px solid ${({ theme }) => theme.colors.border_light};
`;
