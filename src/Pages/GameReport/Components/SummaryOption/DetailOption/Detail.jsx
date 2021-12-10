import React, { useState } from "react";
import styled, { css } from "styled-components";
import { useTranslation } from "react-i18next";

const testChampImg = "Teemo";

const Detail = () => {
  const [detailTab, setDetailTab] = useState(1);
  const { t } = useTranslation();
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
          <div className="champ-box">
            <img src={`Images/champion/${testChampImg}.png`} alt="champion" />
            <div className="bar-box">
              <div className="value">
                11,402<span className="max">/22,122</span>
              </div>
              <Bar curMax={152} cur={51}>
                <div className="bar common-max"></div>
                <div className="bar blue-cur-max"></div>
                <div className="bar blue-cur"></div>
              </Bar>
            </div>
          </div>
          <div className="champ-box">
            <img src={`Images/champion/${testChampImg}.png`} alt="champion" />
            <div className="bar-box">
              <div className="value">
                11,402<span className="max">/22,122</span>
              </div>
              <Bar curMax={152} cur={51}>
                <div className="bar common-max"></div>
                <div className="bar blue-cur-max"></div>
                <div className="bar blue-cur"></div>
              </Bar>
            </div>
          </div>
          <div className="champ-box">
            <img src={`Images/champion/${testChampImg}.png`} alt="champion" />
            <div className="bar-box">
              <div className="value">
                11,402<span className="max">/22,122</span>
              </div>
              <Bar curMax={152} cur={51}>
                <div className="bar common-max"></div>
                <div className="bar blue-cur-max"></div>
                <div className="bar blue-cur"></div>
              </Bar>
            </div>
          </div>
          <div className="champ-box">
            <img src={`Images/champion/${testChampImg}.png`} alt="champion" />
            <div className="bar-box">
              <div className="value">
                11,402<span className="max">/22,122</span>
              </div>
              <Bar curMax={152} cur={51}>
                <div className="bar common-max"></div>
                <div className="bar blue-cur-max"></div>
                <div className="bar blue-cur"></div>
              </Bar>
            </div>
          </div>
          <div className="champ-box">
            <img src={`Images/champion/${testChampImg}.png`} alt="champion" />
            <div className="bar-box">
              <div className="value">
                11,402<span className="max">/22,122</span>
              </div>
              <Bar curMax={152} cur={51}>
                <div className="bar common-max"></div>
                <div className="bar blue-cur-max"></div>
                <div className="bar blue-cur"></div>
              </Bar>
            </div>
          </div>
        </div>

        <div className="total">
          <div className="flex-box">
            <ArrowBox isShow={true}>
              <img className="arrow" src="Images/ic_win-blue.svg" alt="" />
            </ArrowBox>
            <div className="value-box blue-value">74,384</div>
            <ArrowBox></ArrowBox>
          </div>
          <div className="flex-box">
            <ArrowBox></ArrowBox>
            <div className="value-box red-value">55,819</div>
            <ArrowBox isShow={true}>
              <img
                className="arrow red-arrow"
                src="Images/ic_win-red.svg"
                alt=""
              />
            </ArrowBox>
          </div>
        </div>

        <div className="team-box red">
          <div className="champ-box">
            <div className="bar-box">
              <div className="value">
                11,402<span className="max">/22,122</span>
              </div>
              <Bar curMax={213} cur={166}>
                <div className="bar common-max"></div>
                <div className="bar red-cur-max"></div>
                <div className="bar red-cur"></div>
              </Bar>
            </div>
            <img src={`Images/champion/${testChampImg}.png`} alt="champion" />
          </div>
          <div className="champ-box">
            <div className="bar-box">
              <div className="value">
                11,402<span className="max">/22,122</span>
              </div>
              <Bar curMax={213} cur={166}>
                <div className="bar common-max"></div>
                <div className="bar red-cur-max"></div>
                <div className="bar red-cur"></div>
              </Bar>
            </div>
            <img src={`Images/champion/${testChampImg}.png`} alt="champion" />
          </div>
          <div className="champ-box">
            <div className="bar-box">
              <div className="value">
                11,402<span className="max">/22,122</span>
              </div>
              <Bar curMax={213} cur={166}>
                <div className="bar common-max"></div>
                <div className="bar red-cur-max"></div>
                <div className="bar red-cur"></div>
              </Bar>
            </div>
            <img src={`Images/champion/${testChampImg}.png`} alt="champion" />
          </div>
          <div className="champ-box">
            <div className="bar-box">
              <div className="value">
                11,402<span className="max">/22,122</span>
              </div>
              <Bar curMax={213} cur={166}>
                <div className="bar common-max"></div>
                <div className="bar red-cur-max"></div>
                <div className="bar red-cur"></div>
              </Bar>
            </div>
            <img src={`Images/champion/${testChampImg}.png`} alt="champion" />
          </div>
          <div className="champ-box">
            <div className="bar-box">
              <div className="value">
                11,402<span className="max">/22,122</span>
              </div>
              <Bar curMax={213} cur={166}>
                <div className="bar common-max"></div>
                <div className="bar red-cur-max"></div>
                <div className="bar red-cur"></div>
              </Bar>
            </div>
            <img src={`Images/champion/${testChampImg}.png`} alt="champion" />
          </div>
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
      width: 21px;
      height: 20px;
      border-radius: 3px;
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
      text-align: left;
      color: #fff;
      .max {
        opacity: 0.3;
      }
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
