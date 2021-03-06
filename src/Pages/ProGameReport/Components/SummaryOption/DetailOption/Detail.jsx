import React, { useState } from "react";
import styled, { css } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import thousand from "../../../../../lib/thousand";

import BlueChampBox from "./Component/BlueChampBox";
import RedChampBox from "./Component/RedChampBox";

const testChampImg = "Teemo";

const Detail = () => {
  const [detailTab, setDetailTab] = useState(1);
  const { t } = useTranslation();
  const gamevalue = useSelector((state) => state.GameReportReducer);
  const detailSet = getTotalTeamGold(detailTab);

  function getTotalTeamGold(detailTab) {
    const obj = {};
    const reducer = (accumulator, curr) => accumulator + curr;

    switch (detailTab) {
      case 1:
        const goldSet = gamevalue.teamGoldDataset[gamevalue.goldActiveIdx];
        console.log("goldSet", goldSet);
        obj.blue = goldSet.blueGold;
        obj.red = goldSet.redGold;
        break;
      case 2:
        const wardSet = gamevalue.liveDataset[
          gamevalue.liveActiveIdx - 1 < 0 ? 0 : gamevalue.liveActiveIdx
        ].players.map((data) => data.wardsPlaced);
        obj.blue = wardSet.slice(0, 5).reduce(reducer);
        obj.red = wardSet.slice(5, 10).reduce(reducer);
        console.log("obj", obj);
        break;
      default:
        const csSet = gamevalue.liveDataset[
          gamevalue.liveActiveIdx - 1 < 0 ? 0 : gamevalue.liveActiveIdx
        ].players.map((data) => data.cs);
        obj.blue = csSet.slice(0, 5).reduce(reducer);
        obj.red = csSet.slice(5, 10).reduce(reducer);
        console.log("csSet", obj);
        break;
    }

    return obj;
  }

  return (
    <DetailContainer>
      <DetailTabContainer>
        <TabItem onClick={() => setDetailTab(1)} changeColor={detailTab === 1}>
          <div>
            <span>{t("game.summary.detail.get-gold")}</span>
          </div>
        </TabItem>
        <TabItem onClick={() => setDetailTab(2)} changeColor={detailTab === 2}>
          <div>
            <span>{t("game.summary.detail.placed-ward")}</span>
          </div>
        </TabItem>
        <TabItem onClick={() => setDetailTab(3)} changeColor={detailTab === 3}>
          <div>
            <span>{t("game.summary.detail.cs")}</span>
          </div>
        </TabItem>
      </DetailTabContainer>
      <DetailChampTimeStatus>
        <div className="team-box blue">
          <BlueChampBox detailTab={detailTab} />
        </div>

        <div className="total">
          <div className="flex-box">
            <ArrowBox isShow={detailSet.blue > detailSet.red}>
              <img className="arrow" src="Images/ic_win-blue.svg" alt="" />
            </ArrowBox>
            <div className="value-box blue-value">{`${thousand(
              detailSet.blue
            )}`}</div>
            <ArrowBox></ArrowBox>
          </div>
          <div className="flex-box">
            <ArrowBox></ArrowBox>
            <div className="value-box red-value">{`${thousand(
              detailSet.red
            )}`}</div>
            <ArrowBox isShow={detailSet.blue < detailSet.red}>
              <img
                className="arrow red-arrow"
                src="Images/ic_win-red.svg"
                alt=""
              />
            </ArrowBox>
          </div>
        </div>

        <div className="team-box red">
          <RedChampBox detailTab={detailTab} />
        </div>
      </DetailChampTimeStatus>
    </DetailContainer>
  );
};

export default Detail;

const DetailContainer = styled.div`
  width: 702px;
  height: 225px;
  display: block;
`;

const DetailTabContainer = styled.div`
  width: 100%;
  height: 30px;
  margin: 8px 5px;
  display: flex;
  cursor: pointer;
`;

const TabItem = styled.li`
  cursor: pointer;
  display: flex;
  align-items: center;
  width: auto;
  white-space: nowrap;

  div {
    padding: 7px 10px 6px;
  }

  :hover {
    div {
      padding: 7px 10px 6px;
      border-radius: 15px;
      background-color: #26262c;
    }
  }

  span {
    height: 22px;
    font-family: SpoqaHanSansNeo;
    font-size: 18px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    padding-bottom: 19px;
    color: ${(props) => (props.changeColor ? `#fff` : `#84818e`)};
  }
`;

const DetailChampTimeStatus = styled.div`
  width: 694px;
  height: 168px;
  margin: 5px 0px 0 8px;
  display: flex;

  .flex-box {
    display: flex;
  }

  .team-box {
    width: 282px;
    height: 168px;
  }

  .blue {
    margin: 0px 0px 0 0;
  }

  .red {
    margin: 0px 0px 0 0px;
  }

  .total {
    width: 106px;
    height: 168px;
    margin: 66px 12px 48px;

    .value-box {
      width: 58px;
      height: 100%;
      text-align: center;
      white-space: nowrap;
    }

    .blue-value {
      font-family: SpoqaHanSansNeo;
      font-size: 18px;
      font-weight: bold;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.22;
      letter-spacing: normal;
      text-align: center;
      color: #0075bf;
    }

    .red-value {
      font-family: SpoqaHanSansNeo;
      font-size: 18px;
      font-weight: bold;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.22;
      letter-spacing: normal;
      text-align: center;
      color: #f04545;
    }
  }

  .champ-box {
    display: flex;
    width: 282px;
    height: 25px;
    margin: 0 0 11px;

    img {
      margin-top: 2px;
      width: 24px;
      height: 24px;
      border-radius: 25px;
    }
  }

  .float-right {
    float: right;
  }

  .bar-box {
    width: 253px;
    height: 22px;
    margin: 2px 0 1px 5px;
    .value {
      font-family: SpoqaHanSansNeo;
      font-size: 10px;
      font-weight: 500;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.2;
      letter-spacing: normal;
      color: #fff;
      .max {
        opacity: 0.3;
      }
    }
    .blue-text {
      text-align: left;
    }
    .red-text {
      text-align: right;
    }
  }
`;

const Bar = styled.div`
  position: relative;

  .bar {
    position: absolute;
    height: 6px;
    margin: 3px 0 0;
    padding: 0 0px 0 0;
    border-radius: 10px;
  }

  .common-max {
    width: 253px;
    background-color: #3a3745;
  }

  .blue-cur-max {
    width: ${(props) => props.curMax}px;
    background-color: #234e69;
  }

  .blue-cur {
    width: ${(props) => props.cur}px;
    background-color: #0075bf;
  }

  .red-cur-max {
    right: 0px;
    width: ${(props) => props.curMax}px;
    background-color: #623535;
  }

  .red-cur {
    right: 0px;
    width: ${(props) => props.cur}px;
    background-color: #f04545;
  }
`;

const ArrowBox = styled.div`
  width: 24px;
  height: 24px;

  .blue-arrow {
    margin: 1px 3px 11px 0px;
  }

  .red-arrow {
    margin: 2px 0 1px 3px;
  }

  .arrow {
    display: ${(props) => (props.isShow ? `block` : `none`)};
    object-fit: contain;
  }
`;
