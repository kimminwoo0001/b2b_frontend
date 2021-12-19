import React from "react";
import styled, { css } from "styled-components";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";

const ItemTimeBox = () => {
  const { t } = useTranslation();
  const gamevalue = useSelector((state) => state.GameReportReducer);
  const videovalue = useSelector((state) => state.VideoReducer);

  const currentItem =
    gamevalue.playerDataset[gamevalue.selectedParticipant].currentItem;
  const currentTime = Math.floor(
    videovalue.playedSeconds - +gamevalue.startTime
  );

  const curTime = currentTime < 0 ? 0 : currentTime;

  console.log(currentItem);
  console.log(curTime);

  function func() {
    if (currentTime > currentItem[0].realCount) {
      currentItem.shift();
    }
    console.log(currentItem[0]);
    return currentItem[0].items;
  }
  func();

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
    <ItemTimeContainer>
      <div className="item-status-box current">
        <div className="nav">{t("game.summary.champion.item-current")}</div>
        <div className="img-box">
          <div className="img-col">
            {func().map((item) => {
              return (
                <ItemStatusImg
                  className="item-img"
                  src={`Images/item/${item}.png`}
                  alt="itemImg"
                ></ItemStatusImg>
              );
            })}
            {NoneItem(func().length).map(() => {
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
            {/* {cur_list.map((item) => {
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
            })} */}
          </div>
          <div className="img-col-trick">0</div>
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
