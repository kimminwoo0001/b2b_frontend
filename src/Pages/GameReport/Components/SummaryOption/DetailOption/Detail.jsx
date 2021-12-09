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
        <TabItem onClick={() => setDetailTab(1)} changeColor={detailTab === 1}>
          <div>
            <span>{t("game.summary.detail.placed-ward")}</span>
          </div>
        </TabItem>
        <TabItem onClick={() => setDetailTab(1)} changeColor={detailTab === 1}>
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
              <div className="bar"></div>
            </div>
          </div>
          <div className="champ-box">
            <img src={`Images/champion/${testChampImg}.png`} alt="champion" />
            <div className="bar-box">
              <div className="value">
                11,402<span className="max">/22,122</span>
              </div>
              <div className="bar"></div>
            </div>
          </div>
          <div className="champ-box">
            <img src={`Images/champion/${testChampImg}.png`} alt="champion" />
            <div className="bar-box">
              <div className="value">
                11,402<span className="max">/22,122</span>
              </div>
              <div className="bar"></div>
            </div>
          </div>
          <div className="champ-box">
            <img src={`Images/champion/${testChampImg}.png`} alt="champion" />
            <div className="bar-box">
              <div className="value">
                11,402<span className="max">/22,122</span>
              </div>
              <div className="bar"></div>
            </div>
          </div>
          <div className="champ-box">
            <img src={`Images/champion/${testChampImg}.png`} alt="champion" />
            <div className="bar-box">
              <div className="value">
                11,402<span className="max">/22,122</span>
              </div>
              <div className="bar"></div>
            </div>
          </div>
        </div>
        <div className="total">
          <div className="flex-box">
            <div className="arrow-box"></div>
            <div className="value-box blue-value">74,384</div>
            <div className="arrow-box"></div>
          </div>
          <div className="flex-box">
            <div className="arrow-box"></div>
            <div className="value-box red-value">55,819</div>
            <div className="arrow-box"></div>
          </div>
        </div>

        <div className="team-box red">
          <div className="champ-box">
            <div className="bar-box">
              <div className="value">
                11,402<span className="max">/22,122</span>
              </div>
              <div className="bar"></div>
            </div>
            <img src={`Images/champion/${testChampImg}.png`} alt="champion" />
          </div>
          <div className="champ-box">
            <div className="bar-box">
              <div className="value">
                11,402<span className="max">/22,122</span>
              </div>
              <div className="bar"></div>
            </div>
            <img src={`Images/champion/${testChampImg}.png`} alt="champion" />
          </div>
          <div className="champ-box">
            <div className="bar-box">
              <div className="value">
                11,402<span className="max">/22,122</span>
              </div>
              <div className="bar"></div>
            </div>
            <img src={`Images/champion/${testChampImg}.png`} alt="champion" />
          </div>
          <div className="champ-box">
            <div className="bar-box">
              <div className="value">
                11,402<span className="max">/22,122</span>
              </div>
              <div className="bar"></div>
            </div>
            <img src={`Images/champion/${testChampImg}.png`} alt="champion" />
          </div>
          <div className="champ-box">
            <div className="bar-box">
              <div className="value">
                11,402<span className="max">/22,122</span>
              </div>
              <div className="bar"></div>
            </div>
            <img src={`Images/champion/${testChampImg}.png`} alt="champion" />
          </div>
        </div>
      </DetailChampTimeStatus>
      <DetailChampTimeLine></DetailChampTimeLine>
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
  background-color: #912345;

  .flex-box {
    display: flex;
  }

  .team-box {
    width: 282px;
    height: 168px;
  }

  .blue {
    margin: 0px 12px 0 0;
  }

  .red {
    margin: 0px 0px 0 12px;
  }

  .total {
    width: 106px;
    height: 168px;
    padding-top: 66px;
    padding-bottom: 48px;
    background-color: #0f0;

    .arrow-box {
      width: 24px;
      height: 24px;
      background-color: #090;
    }

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
      width: 24px;
      height: 25px;
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
    .bar {
    }
  }
`;

const DetailChampTimeLine = styled.div`
  width: 702px;
  height: 19px;
  display: flex;
  background-color: #515353;
`;
