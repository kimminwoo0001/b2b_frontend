import React, { useState } from "react";
/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled/macro";
import transferValuetoWidth from "../../../../lib/transferValuetoWidth";
import { useSelector, useDispatch } from "react-redux";
import thousand from "../../../../../../lib/thousand";
import { ContinuousColorLegend } from "react-vis";

const detailBoxWidth = 253;

const RedChampBox = ({ detailTab }) => {
  const gamevalue = useSelector((state) => state.GameReportReducer);

  function getStandardValue(detailTab, positionIdx) {
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
        break;
    }
    return obj;
  }

  return (
    <>
      {gamevalue.fixedDataset[1].players.map((data, idx) => {
        const detailObj = getStandardValue(detailTab, idx + 5);
        return (
          <div className="champ-box">
            <div className="bar-box">
              <div className="value red-text">
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
                <div className="bar red-player-max"></div>
                <div className="bar red-player-cur"></div>
              </Bar>
            </div>
            <img
              src={`Images/champion/${data.info.championEng}.png`}
              alt="champion"
            />
          </div>
        );
      })}
    </>
  );
};

export default RedChampBox;

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

  .red-player-max {
    right: 0px;
    width: ${(props) => props.curMax}px;
    background-color: #623535;
  }

  .red-player-cur {
    right: 0px;
    width: ${(props) => props.cur}px;
    background-color: #f04545;
  }
`;
