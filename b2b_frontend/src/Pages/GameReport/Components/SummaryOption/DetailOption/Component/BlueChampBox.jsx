import React, { useState } from "react";
import styled, { css } from "styled-components";
import transferValuetoWidth from "../../../../../../lib/transferValuetoWidth";
import { useSelector, useDispatch } from "react-redux";
const testChampImg = "Teemo";

const detailBoxWidth = 253;

const BlueChampBox = ({ detailTab }) => {
  const gamevalue = useSelector((state) => state.GameReportReducer);

  function getStandardValue(detailTab, positionIdx) {
    const detail = gamevalue.fixedDataset[0].players[positionIdx].detail;
    switch (detailTab) {
      case 1:
        return detail.gold;
      case 2:
        return detail.wardsplaced;
      case 3:
        return detail.cs;
      default:
        return detail.gold;
    }
  }

  return (
    <>
      {gamevalue.fixedDataset[0].players.map((data, idx) => {
        return (
          <div className="champ-box">
            <img
              src={`Images/champion/${data.info.championEng}.png`}
              alt="champion"
            />
            <div className="bar-box">
              <div className="value blue-text">
                11,402<span className="max">/22,122</span>
              </div>
              <Bar
                curMax={transferValuetoWidth(
                  90,
                  detailBoxWidth,
                  getStandardValue(detailTab, idx)
                )}
                cur={transferValuetoWidth(
                  180,
                  detailBoxWidth,
                  getStandardValue(detailTab, idx)
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

const BlueChampContainer = styled.div``;

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
