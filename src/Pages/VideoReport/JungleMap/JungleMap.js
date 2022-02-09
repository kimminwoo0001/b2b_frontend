/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled/macro";
import { useState } from "react";
import { typoStyle } from "../../../Styles/ui";

const JungleMap = () => {
  return (
    <SContainer>
      <STab>
        <li>경기별 정글동선</li>
        <li>정글링 비교</li>
      </STab>
      <SFilter />

      <SContents>
        <SSelector></SSelector>
        <SMap></SMap>
      </SContents>
    </SContainer>
  );
};

const SContainer = styled.section`
  width: 1110px;
  border: 4px solid red;
  ${typoStyle.contents}
`;

const STab = styled.ul`
  display: flex;
  width: full;
  height: 62px;
  border: 2px solid blue;
  margin-bottom: 20px;
`;

const SFilter = styled.div`
  height: 348px;
  border: 2px solid green;
  margin-bottom: 30px;
`;

const SContents = styled.div`
  display: flex;
  border: 2px solid gold;
`;
const SSelector = styled.div`
  border: 1px solid crimson;
  width: 376px;
  height: 1115px;
`;

const SMap = styled.div`
  flex: 1 0;
  border: 1px solid dodgerblue;
`;

export default JungleMap;
