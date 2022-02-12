/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled/macro";
import React, { useState } from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import DropdownContainer from "../../../../Components/Ui/DropDown/DropdownContainer";
import DropdownItem from "../../../../Components/Ui/DropDown/DropdownItem";
import DropdownLabel from "../../../../Components/Ui/DropDown/DropdownLabel";
import DropdownList from "../../../../Components/Ui/DropDown/DropdownList";
import Sortingimage from "../../../../Components/Ui/Sortingimage";
import { dropdownStyle } from "../../../../Styles/ui";
import MTCategory from "./MTCategory";
import ItemBox from "./SubComponent/ItemBox";

const inquireDayList = [1, 3, 5, 7, 15, 30];

const MTContent = () => {
  return (
    <SWrapper>
      <MTCategory />
      
    </SWrapper>
  );
};

export default MTContent;

const SWrapper = styled.section`
  width: 1110px;
  height: 1346px;
  margin: 20px 0 0;
`;
