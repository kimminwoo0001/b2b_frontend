import React, { useState } from "react";
import styled, { css } from "styled-components";
import transferValuetoWidth from "../../../../lib/transferValuetoWidth";
import { useSelector, useDispatch } from "react-redux";
import thousand from "../../../../../../lib/thousand";

const detailBoxWidth = 253;

const BlueChampBox = ({ detailTab }) => {
  const gamevalue = useSelector((state) => state.GameReportReducer);

  function getStandardValue(detailTab, positionIdx) {
    const detail = gamevalue.fixedDataset[0].players[positionIdx].detail;
    const obj = {};

    switch (detailTab) {
      case 1:
        const golds = gamevalue.teamGoldDataset[gamevalue.goldActiveIdx].golds;
        const maxGolds =
          gamevalue.teamGoldDataset[gamevalue.teamGoldDataset.length - 1].golds;
        const gold = golds[positionIdx];
        obj.max = Math.max.apply(null, maxGolds);
        obj.curMax = maxGolds[positionIdx];
        obj.cur = gold;
        break;
      case 2:
        const wards =
          gamevalue.liveDataset[
            gamevalue.liveActiveIdx - 1 < 0 ? 0 : gamevalue.liveActiveIdx
          ].players;
        const ward = wards.map((data) => data.wardsPlaced);
        const maxWard = gamevalue.fixedDataset[0].players
          .map((data) => data.detail.wardsplaced)
          .concat(
            gamevalue.fixedDataset[1].players.map(
              (data) => data.detail.wardsplaced
            )
          );
        obj.max = Math.max.apply(null, maxWard);
        obj.curMax = maxWard[positionIdx];
        obj.cur = ward[positionIdx];
        break;
      case 3:
        const csSet =
          gamevalue.liveDataset[
            gamevalue.liveActiveIdx - 1 < 0 ? 0 : gamevalue.liveActiveIdx
          ].players;
        const cs = csSet.map((data) => data.cs);
        const maxCs = gamevalue.fixedDataset[0].players
          .map((data) => data.detail.cs)
          .concat(
            gamevalue.fixedDataset[1].players.map((data) => data.detail.cs)
          );
        obj.max = Math.max.apply(null, maxCs);
        obj.curMax = maxCs[positionIdx];
        obj.cur = cs[positionIdx];
        console.log("obj", obj);
        break;
      default:
        return detail.gold;
    }
    return obj;
  }

  return (
    <>
      {gamevalue.fixedDataset[0].players.map((data, idx) => {
        const detailObj = getStandardValue(detailTab, idx);
        return (
          <div className="champ-box">
            <img
              src={`Images/champion/${data.info.championEng}.png`}
              alt="champion"
            />
            <div className="bar-box">
              <div className="value blue-text">
                {`${thousand(detailObj.cur)}`}
                <span className="max">/{`${thousand(detailObj.max)}`}</span>
              </div>
              <Bar
                curMax={transferValuetoWidth(
                  detailObj.max,
                  detailBoxWidth,
                  detailObj.curMax
                )}
                cur={transferValuetoWidth(
                  detailObj.max,
                  detailBoxWidth,
                  detailObj.cur
                )}
              >
                <div className="bar common-max"></div>
                <div className="bar blue-player-max"></div>
                <div className="bar blue-player-cur"></div>
              </Bar>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default BlueChampBox;

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

  .blue-player-max {
    width: ${(props) => props.curMax}px;
    background-color: #234e69;
  }

  .blue-player-cur {
    width: ${(props) => props.cur}px;
    background-color: #0075bf;
  }
`;
