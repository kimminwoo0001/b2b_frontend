import React, { useState } from "react";
import styled, { css } from "styled-components";

import AccountInfo from "./AccountInfo/AccountInfo";
import AlertCheck from "./AlertCheck/AlertCheck";
import Inquiry from "./Inquiry/Inquiry";
import ShowInquiry from "./Inquiry/ShowInquiry";

function UtilityTabs() {
  const [activeTab, setActiveTab] = useState(0);
  const SettingTabs = {
    0: <AccountInfo />,
    1: <AlertCheck />,
    2: <Inquiry />,
    3: <ShowInquiry />
  };

  return (
    <>
      <UtilityTabsWrapper>
        <TabContainer>
          <AccountInformation
            onClick={() => setActiveTab(0)}
            changeColor={activeTab === 0}
          >
            <div>계정 정보</div>
            <img
              src={
                activeTab === 0
                  ? "Images/ico-1depth-arrow-on.png"
                  : "Images/ico-1depth-arrow-off.png"
              }
              alt="arrowIcon"
            ></img>
          </AccountInformation>
          <CheckAlert
            onClick={() => setActiveTab(1)}
            changeColor={activeTab === 1}
          >
            <div>알림 확인</div>
            <img
              src={
                activeTab === 1
                  ? "Images/ico-1depth-arrow-on.png"
                  : "Images/ico-1depth-arrow-off.png"
              }
              alt="arrowIcon"
            ></img>
          </CheckAlert>
          <OneOnOneInquiry
            onClick={() => setActiveTab(2)}
            changeColor={activeTab === 2}
          >
            <div>1:1 문의</div>
            <img
              src={
                activeTab === 2
                  ? "Images/ico-1depth-arrow-on.png"
                  : "Images/ico-1depth-arrow-off.png"
              }
              alt="arrowIcon"
            ></img>
          </OneOnOneInquiry>
          <OneOnOneInquiry
            onClick={() => setActiveTab(3)}
            changeColor={activeTab === 3}
          >
            <div>새 문의</div>
            <img
              src={
                activeTab === 3
                  ? "Images/ico-1depth-arrow-on.png"
                  : "Images/ico-1depth-arrow-off.png"
              }
              alt="arrowIcon"
            ></img>
          </OneOnOneInquiry>
        </TabContainer>
        <div>{SettingTabs[activeTab]}</div>
      </UtilityTabsWrapper>
    </>
  );
}

export default UtilityTabs;

const UtilityTabsWrapper = styled.div`
  margin: 21px 0 25px 22px;
  width: 1097px;
  height: 100%;
`;

const TabContainer = styled.ul`
  display: flex;
  border-bottom: 1px solid #433f4e;
  /* padding-bottom: 15px; */
`;

const AccountInformation = styled.li`
  cursor: pointer;
  display: flex;
  align-items: center;
  padding-bottom: 15px;
  color: #84818e;
  margin-right: 30px;
  ${(props) =>
    props.changeColor &&
    css`
      color: #f04545;
      border-bottom: 2px solid #f04545;
    `}
  div {
    width: auto;
    height: 17px;
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 13px;
    line-height: 1.31;
    letter-spacing: -0.65px;
    text-align: left;
    margin-right: 4px;
  }
  img {
  }
`;

const CheckAlert = styled.li`
  cursor: pointer;
  display: flex;
  align-items: center;
  padding-bottom: 15px;
  color: #84818e;
  margin-right: 30px;
  ${(props) =>
    props.changeColor &&
    css`
      color: #f04545;
      border-bottom: 2px solid #f04545;
    `}
  div {
    width: auto;
    height: 17px;
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 13px;
    line-height: 1.31;
    letter-spacing: -0.65px;
    text-align: left;
    margin-right: 4px;
  }
  img {
  }
`;

const OneOnOneInquiry = styled.li`
  cursor: pointer;
  display: flex;
  align-items: center;
  padding-bottom: 15px;
  color: #84818e;
  margin-right: 30px;
  ${(props) =>
    props.changeColor &&
    css`
      color: #f04545;
      border-bottom: 2px solid #f04545;
    `}
  div {
    width: auto;
    height: 17px;
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 13px;
    line-height: 1.31;
    letter-spacing: -0.65px;
    text-align: left;
    margin-right: 4px;
  }
  img {
  }
`;
