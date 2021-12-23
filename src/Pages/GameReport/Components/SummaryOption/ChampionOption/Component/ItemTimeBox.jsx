import React, { useState } from "react";
import styled, { css } from "styled-components";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import NoneItem from "../../../../../../lib/NoneItem";

const ItemTimeBox = () => {
  const { t } = useTranslation();
  const gamevalue = useSelector((state) => state.GameReportReducer);

  const currentItem =
    gamevalue.playerDataset[gamevalue.selectedParticipant].currentItem;
  const [itemIdx, setItemIdx] = useState(0);
  const [trinket, setTrinket] = useState(3340);

  // console.log(currentItem);
  // console.log(curTime);gG

  // const getItemIdx = () => {
  //   let minusItemIdx = itemIdx === 0 ? itemIdx : itemIdx - 1;
  //   let idx = itemIdx;
  //   let trink = trinket;

  //   if (
  //     currentItem.length !== idx + 1 &&
  //     currentItem[itemIdx].realCount / 2 <= curTime
  //   ) {
  //     idx = itemIdx + 1;
  //     trink = currentItem[itemIdx + 1].trinket ?? trinket;
  //   } else if (
  //     itemIdx !== 0 &&
  //     currentItem[minusItemIdx].realCount / 2 > curTime
  //   ) {
  //     trink = currentItem[minusItemIdx].trinket ?? trinket;
  //     idx = minusItemIdx;
  //   }

  //   if (idx !== itemIdx) {
  //     setItemIdx(idx);
  //   }
  //   if (trink !== trinket) {
  //     setTrinket(currentItem[minusItemIdx].trinket ?? trinket);
  //   }

  //   // console.log("idx", idx);
  //   // console.log("currentItem[itemIdx]", currentItem[itemIdx]);
  //   return minusItemIdx;
  // };

  return (
    <ItemTimeContainer>
      <div className="item-status-box current">
        <div className="nav">{t("game.summary.champion.item-current")}</div>
        <div className="img-box">
          <div className="img-col">
            {currentItem[gamevalue.itemActiveIdx].items.map((item) => {
              return (
                <ItemStatusImg
                  className="item-img"
                  src={`Images/item/${item}.png`}
                  alt="itemImg"
                ></ItemStatusImg>
              );
            })}
            {NoneItem(currentItem[gamevalue.itemActiveIdx].items.length).map(
              () => {
                // console.log("maping 중");
                return <ItemStatusNotImg></ItemStatusNotImg>;
              }
            )}
          </div>
          <div className="img-col-trick">
            <ItemStatusImg
              className="item-img"
              src={`Images/item/${trinket}.png`}
              alt="itemImg"
            ></ItemStatusImg>
          </div>
        </div>
      </div>
    </ItemTimeContainer>
  );
};

export default ItemTimeBox;

const ItemTimeContainer = styled.div`
  display: flex;
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
