import React, { useState, useEffect } from "react";
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
  const curTrinket = currentItem.trinket ?? "";

  if (currentItem[0].realCount  !== 0) {
    currentItem.unshift({
      realCount: 0,
      items: [],
      trinket: 3340,
    });
  }

  useEffect(() => {
    if (curTrinket !== "" && curTrinket !== currentItem.trinket) {
      setTrinket(curTrinket);
    }
    console.log(
      "gamevalue.selectedParticipant:",
      gamevalue.selectedParticipant
    );
  }, [gamevalue.selectedParticipant]);

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
