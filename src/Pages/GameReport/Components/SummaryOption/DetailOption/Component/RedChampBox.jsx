import React, { useState } from "react";
import styled, { css } from "styled-components";
import transferValuetoWidth from "../../../../../../lib/transferValuetoWidth";
import { useSelector, useDispatch } from "react-redux";
const testChampImg = "Teemo";
const detailBoxWidth = 253;

const RedChampBox = ({ detailTab }) => {
  const gamevalue = useSelector((state) => state.GameReportReducer);

  function getStandardValue(detailTab, positionIdx) {
    const detail = gamevalue.fixedDataset[1].players[positionIdx].detail;
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
      {gamevalue.fixedDataset[1].players.map((data, idx) => {
        return (
          <div className="champ-box">
            <div className="bar-box">
              <div className="value red-text">
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
