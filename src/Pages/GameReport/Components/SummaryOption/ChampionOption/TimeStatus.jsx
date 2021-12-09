import React, { useState } from "react";
import styled, { css } from "styled-components";
import { useTranslation } from "react-i18next";

const TimeStatus = () => {
  const { t } = useTranslation();
  const [tab, setTab] = useState(0);

  const item_list = [
    {
      1: {
        5: {
          buy: [
            { id: 2010, cnt: 2 },
            { id: 1052, cnt: 1 },
            { id: 1082, cnt: 1 },
            { id: 3222, cnt: 1 },
          ],
          cur: [
            { id: 2010, cnt: 2 },
            { id: 1052, cnt: 1 },
            { id: 1082, cnt: 1 },
            { id: 3222, cnt: 1 },
          ],
        },
      },
    },
    {},
  ];

  const buy_list = item_list[0][1][5]["buy"];
  const cur_list = item_list[0][1][5]["cur"];

  const NoneItem = (len) => {
    const empty = 6 - len;
    let result = [];
    for (let i = 0; i < empty; i++) {
      result.push(i);
    }
    console.log("result", result);

    return result;
  };

  return (
    <DetailChampTimeStatus>
      <TabContainer>
        <TabItem
          changeColor={tab === 0}
          onClick={() => {
            setTab(0);
          }}
        >
          <div>
            <span>{t("game.summary.champion.skill-build")}</span>
          </div>
        </TabItem>
        <TabItem
          changeColor={tab === 1}
          onClick={() => {
            setTab(1);
          }}
        >
          <div>
            <span>{t("game.summary.champion.item-build")}</span>
          </div>
        </TabItem>
      </TabContainer>
      <BuildBox tab={tab}>
        <div className="skill-build"></div>
        <div className="item-build">
          <div className="item-box">
            <div className="item-img-box">
              {buy_list.map((item) => {
                console.log("item:", item);
                return (
                  <ItemBuildImg
                    className="item-img"
                    src={`Images/item/${item.id}.png`}
                    alt="itemImg"
                  ></ItemBuildImg>
                );
              })}
            </div>
          </div>
          <div className="item-status-box current">
            <div className="nav">{t("game.summary.champion.item-current")}</div>
            <div className="img-box">
              <div className="img-col">
                {cur_list.map((item) => {
                  return (
                    <ItemStatusImg
                      className="item-img"
                      src={`Images/item/${item.id}.png`}
                      alt="itemImg"
                    ></ItemStatusImg>
                  );
                })}
                {NoneItem(cur_list.length).map(() => {
                  console.log("maping 중");
                  return <ItemStatusNotImg></ItemStatusNotImg>;
                })}
              </div>
              <div className="img-col-trick"></div>
            </div>
          </div>

          <div className="item-status-box last">
            <div className="nav">{t("game.summary.champion.item-end")}</div>
            <div className="img-box">
              <div className="img-col">
                {cur_list.map((item) => {
                  return (
                    <ItemStatusImg
                      className="item-img"
                      src={`Images/item/${item.id}.png`}
                      alt="itemImg"
                    ></ItemStatusImg>
                  );
                })}
                {NoneItem(cur_list.length).map(() => {
                  console.log("maping 중");
                  return <ItemStatusNotImg></ItemStatusNotImg>;
                })}
              </div>
              <div className="img-col-trick">0</div>
            </div>
          </div>
        </div>
      </BuildBox>
    </DetailChampTimeStatus>
  );
};

export default TimeStatus;

const DetailChampTimeStatus = styled.div`
  width: 702px;
  height: 86px;
  display: flex;
`;

const TabContainer = styled.div`
  width: 42px;
  height: 100%;
  margin: -4px 7px 50px 0px;
`;

const TabItem = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  width: auto;
  //border-bottom: solid 1px #433f4e;
  white-space: nowrap;
  div {
    padding: 4px 8px;
  }

  :hover {
    div {
      padding: 4px 8px;
      border-radius: 10px;
      background-color: #26262c;
    }
  }
  span {
    height: 22px;
    font-family: SpoqaHanSansNeo;
    font-size: 10px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1;
    letter-spacing: normal;
    text-align: left;
    color: ${(props) => (props.changeColor ? `#fff` : `rgba(255,255,255,0.3)`)};
  }
`;

const BuildBox = styled.div`
  width: 640px;
  height: 89px;
  margin: 0.5px 8px 1px 7px;

  .skill-build {
    display: ${(props) => (props.tab === 0 ? `block` : `none`)};
  }

  .item-build {
    width: 640px;
    height: 89px;
    display: ${(props) => (props.tab === 1 ? `flex` : `none`)};

    .item-box {
      width: 339px;
      height: 89px;

      .item-img-box {
        display: block;
        width: 20px;
        margin-bottom: 3px;
      }
    }

    .item-status-box {
      width: 128px;
      height: 79px;

      display: block;
      .nav {
        height: 13px;
        font-family: SpoqaHanSansNeo;
        font-size: 10px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.3;
        letter-spacing: normal;
        text-align: left;
        color: #fff;
      }

      .img-box {
        width: 137px;
        height: 63px;
        margin: 3px 0 0;
        display: flex;

        .img-col {
          width: 102px;
          heigh: 63px;
          margin-right: 3px;
        }

        .img-col-trick {
          width: 30px;
          heigh: 63px;
          padding: 15px 0;
          margin-right: 3px;
        }
      }
    }

    .current {
      margin: 8px 15px 2px 10px;
    }

    .last {
      margin: 8px 0 2px 15px;
    }
  }
`;

const ItemBuildImg = styled.img`
  width: 20px;
  height: 20px;
  object-fit: contain;
  border-radius: 3px;
`;

const ItemStatusImg = styled.img`
  width: 30px;
  height: 30px;
  margin: 0 3px 3px 0;
  object-fit: contain;
  border-radius: 3px;
`;

const ItemStatusNotImg = styled.img`
  width: 31px;
  height: 31px;
  margin: 0 3px 3px 0;
  object-fit: contain;
  border-radius: 3px;
  background-color: #3a3745;
  border: solid 15px #3a3745;
  display: inline-block;
  content: "";
`;
