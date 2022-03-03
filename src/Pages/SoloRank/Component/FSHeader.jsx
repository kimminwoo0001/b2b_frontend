/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled/macro";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import Button from "../../../Components/Ui/Button";

const FSHeader = ({ headerInfo }) => {
  const { t } = useTranslation();

  return (
    <SWrapper>
      <Button></Button>
    </SWrapper>
  );
};

export default FSHeader;

const SWrapper = styled.div`
  width: 1110px;
  height: 110px;
  margin: 10px 0 20px;
  padding: 22px 100px 21px;
  border-radius: 20px;
  background-color: ${(props) => props.theme.colors.bg_box};
  display: flex;
  justify-content: space-between;
`;
