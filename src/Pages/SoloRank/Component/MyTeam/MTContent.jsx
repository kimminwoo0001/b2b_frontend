/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled/macro";
import React, { useState } from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import MTCategory from "./MTCategory";
import theme from "../../../../Styles/Theme";
import MTPlayerHeader from "./SubComponent/MTPlayerHeader";

const inquireDayList = [1, 3, 5, 7, 15, 30];

const isLike = true;
const exTeamLine = "DK 정글";
const exPlayerNickName = "Canyon";
const exPlayerName = "김건부";

const MTContent = () => {
  return (
    <SWrapper>
      <MTCategory />
      <SPlayerContainer>
        <MTPlayerHeader
          isLike={isLike}
          teamLine={exTeamLine}
          nickName={exPlayerNickName}
          name={exPlayerName}
        />
      </SPlayerContainer>
    </SWrapper>
  );
};

export default MTContent;

const SWrapper = styled.section`
  width: 1110px;
  height: 1346px;
  margin: 20px 0 0;
`;

const SPlayerContainer = styled.div`
  width: 1110px;
  height: 370px;
  margin: 10px 0 10px;
  padding: 0 0 0 14px;
  border-radius: 20px;
  background-color: ${theme.colors.bg_select};
  position: relative;
`;
