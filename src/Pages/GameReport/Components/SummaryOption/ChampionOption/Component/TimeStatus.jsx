import React, { useState } from "react";
import styled, { css } from "styled-components";
import { useTranslation } from "react-i18next";
import transferValuetoWidth from "../../../../../../lib/transferValuetoWidth";
import { useSelector, useDispatch } from "react-redux";
import { SetChampTab } from "../../../../../../redux/modules/gamevalue";
import ItemTimeBox from "./ItemTimeBox";
import NoneItem from "../../../../../../lib/NoneItem";

const skillBoxWidth = 610;
const purchasedItemBoxWidth = 339;

function getSkillSet(skills, fullTime) {
  let q = [];
  let w = [];
  let e = [];
  let r = [];

  for (let skill of skills) {
    let id = skill.skillId;
    if (id === 1) {
      q.push(skill.realCount / 2);
    } else if (id === 2) {
      w.push(skill.realCount / 2);
    } else if (id === 3) {
      e.push(skill.realCount / 2);
    } else if (id === 4) {
      r.push(skill.realCount / 2);
    }
  }

  q.push(fullTime);
  w.push(fullTime);
  e.push(fullTime);
  r.push(fullTime);

  return { q: q, w: w, e: e, r: r };
}

const TimeStatus = () => {
  const gamevalue = useSelector((state) => state.GameReportReducer);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const skillData =
    gamevalue.fixedDataset[gamevalue.selectedTeam].players[
      gamevalue.selectedPosition
    ].info.skills;
  const skillBuildData = getSkillSet(
    gamevalue.playerDataset[gamevalue.selectedParticipant].skill,
    gamevalue.gameTime
  );
  const lastItemSet =
    gamevalue.playerDataset[gamevalue.selectedParticipant].currentItem[
      gamevalue.playerDataset[gamevalue.selectedParticipant].currentItem
        .length - 1
    ];

  const purchasedItemBuildData =
    gamevalue.playerDataset[gamevalue.selectedParticipant].purchasedItem;

  return (
    <DetailChampTimeStatus>
      <TabContainer>
        <TabItem
          changeColor={gamevalue.champTab === 0}
          onClick={() => {
            dispatch(SetChampTab(0));
          }}
        >
          <div>
            <span>{t("game.summary.champion.skill-build")}</span>
          </div>
        </TabItem>
        <TabItem
          changeColor={gamevalue.champTab === 1}
          onClick={() => {
            dispatch(SetChampTab(1));
          }}
        >
          <div>
            <span>{t("game.summary.champion.item-build")}</span>
          </div>
        </TabItem>
      </TabContainer>
      <BuildBox tab={gamevalue.champTab}>
        <div className="skill-build">
          <div className="skill-box">
            <div className="header-color q"></div>
            <div className="header-img">
              <img src={`Images/spell/${skillData[0]}.png`} alt="" />
            </div>
            <SkillValueBox
              marginLeft={transferValuetoWidth(
                gamevalue.gameTime,
                skillBoxWidth,
                skillBuildData["q"][0]
              )}
            >
              {skillBuildData["q"].map((data, idx) => {
                return (
                  idx !== skillBuildData["q"].length - 1 && (
                    <SkillValue
                      className="q"
                      width={transferValuetoWidth(
                        gamevalue.gameTime,
                        skillBoxWidth,
                        skillBuildData["q"][idx + 1] - skillBuildData["q"][idx]
                      )}
                    >
                      <span>q{idx + 1}</span>
                    </SkillValue>
                  )
                );
              })}
            </SkillValueBox>
          </div>
          <div className="skill-box">
            <div className="header-color w"></div>
            <div className="header-img">
              <img src={`Images/spell/${skillData[1]}.png`} alt="" />
            </div>
            <SkillValueBox
              marginLeft={transferValuetoWidth(
                gamevalue.gameTime,
                skillBoxWidth,
                skillBuildData["w"][0]
              )}
            >
              {skillBuildData["w"].map((data, idx) => {
                return (
                  idx !== skillBuildData["w"].length - 1 && (
                    <SkillValue
                      className="w"
                      width={transferValuetoWidth(
                        gamevalue.gameTime,
                        skillBoxWidth,
                        skillBuildData["w"][idx + 1] - skillBuildData["w"][idx]
                      )}
                    >
                      <span>w{idx + 1}</span>
                    </SkillValue>
                  )
                );
              })}
            </SkillValueBox>
          </div>
          <div className="skill-box">
            <div className="header-color e"></div>
            <div className="header-img">
              <img src={`Images/spell/${skillData[2]}.png`} alt="" />
            </div>
            <SkillValueBox
              marginLeft={transferValuetoWidth(
                gamevalue.gameTime,
                skillBoxWidth,
                skillBuildData["e"][0]
              )}
            >
              {skillBuildData["e"].map((data, idx) => {
                return (
                  idx !== skillBuildData["e"].length - 1 && (
                    <SkillValue
                      className="e"
                      width={transferValuetoWidth(
                        gamevalue.gameTime,
                        skillBoxWidth,
                        skillBuildData["e"][idx + 1] - skillBuildData["e"][idx]
                      )}
                    >
                      <span>e{idx + 1}</span>
                    </SkillValue>
                  )
                );
              })}
            </SkillValueBox>
          </div>
          <div className="skill-box">
            <div className="header-color r"></div>
            <div className="header-img">
              <img src={`Images/spell/${skillData[3]}.png`} alt="" />
            </div>
            <SkillValueBox
              marginLeft={transferValuetoWidth(
                gamevalue.gameTime,
                skillBoxWidth,
                skillBuildData["r"][0]
              )}
            >
              {skillBuildData["r"].map((data, idx) => {
                return (
                  idx !== skillBuildData["r"].length - 1 && (
                    <SkillValue
                      className="r"
                      width={transferValuetoWidth(
                        gamevalue.gameTime,
                        skillBoxWidth,
                        skillBuildData["r"][idx + 1] - skillBuildData["r"][idx]
                      )}
                    >
                      <span>r{idx + 1}</span>
                    </SkillValue>
                  )
                );
              })}
            </SkillValueBox>
          </div>
        </div>
        <div className="item-build">
          {purchasedItemBuildData.map((purchaseditemList) => {
            //console.log("purchaseditemList:", purchaseditemList);
            return (
              <PurchasedItemBox
                marginLeft={transferValuetoWidth(
                  gamevalue.gameTime,
                  purchasedItemBoxWidth,
                  purchaseditemList.realCount / 2
                )}
              >
                <div className="item-img-box">
                  {purchaseditemList.items.map((item) => {
                    return (
                      <ItemBuildImg
                        className="item-img"
                        src={`Images/item/${item.itemId}.png`}
                        alt="itemImg"
                      ></ItemBuildImg>
                    );
                  })}
                </div>
              </PurchasedItemBox>
            );
          })}
          <ItemTimeBox />
          <div className="item-status-box last">
            <div className="nav">{t("game.summary.champion.item-end")}</div>
            <div className="img-box">
              <div className="img-col">
                {lastItemSet.items.map((item) => {
                  return (
                    <ItemStatusImg
                      className="item-img"
                      src={`Images/item/${item}.png`}
                      alt="itemImg"
                    ></ItemStatusImg>
                  );
                })}
                {NoneItem(lastItemSet.items.length).map(() => {
                  //console.log("maping 중");
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
  margin: -4px 7px 0px 0px;
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
    width: 640px;
    height: 89px;

    .skill-box {
      width: 640px;
      height: 20px;
      margin-bottom: 2px;
      display: flex;

      .header-color {
        width: 2px;
        height: 20px;
      }
      .q {
        background-color: #9ea1eb;
      }
      .w {
        background-color: #3bd8d2;
      }
      .e {
        background-color: #e4f276;
      }
      .r {
        background-color: #7cd9fc;
      }

      .header-img {
        width: 20px;
        height: 20px;
        margin: 0 0 2px 1px;
        object-fit: contain;
        border-radius: 3px;
        background-color: #fff;

        img {
          width: 20px;
          height: 20px;
        }
      }
    }
  }

  .item-build {
    width: 640px;
    height: 89px;
    display: ${(props) => (props.tab === 1 ? `flex` : `none`)};
    position: relative;

    .item-status-box {
      width: 130px;
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
          width: 108px;
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
      margin: 4px 15px 2px ${40 + 339}px;
    }

    .last {
      margin: 8px 0 2px 15px;
    }
  }
`;

const PurchasedItemBox = styled.div`
  width: 339px;
  height: 89px;
  margin-left: ${(props) => props.marginLeft + 5}px;
  position: absolute;
  overflow: hidden;

  .item-img-box {
    display: block;
    width: 20px;
    margin-bottom: 3px;
  }
`;

const SkillValueBox = styled.div`
  width: ${(props) => skillBoxWidth - props.marginLeft}px;
  height: 20px;
  margin-left: ${(props) => props.marginLeft + 5}px;
  display: flex;
  flex-shrink: 0;
`;

const SkillValue = styled.div`
  width: ${(props) => props.width}px;
  height: 20px;
  border-radius: 3px;
  margin-left: 2px;
  border-radius: 3px;

  span {
    font-family: SpoqaHanSansNeo;
    font-size: 6px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.33;
    letter-spacing: normal;
    text-align: left;
    color: #000;
    margin-left: 2px;
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
