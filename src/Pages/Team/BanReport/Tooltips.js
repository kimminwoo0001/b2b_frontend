import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
function ToolTips({ pick }) {
  const { t } = useTranslation();
  const lang = useSelector((state) => state.LocaleReducer);
  const tooltip = pick.PlayInfos;

  return (
    <ArrowWrapper>
      <Arrow />
      <ToolTipWrapper>
        <TooltipTable>
          <thead>
            <TooltipNav>
              <th className="Champion">{t("team.draft.champion")}</th>
              <th className="Player">{t("team.draft.player")}</th>
              <th className="Pick">{t("team.draft.pick")}</th>
            </TooltipNav>
          </thead>
          <tbody>
            {tooltip?.map((tooltip, idx) => {
              return (
                <TooltipContent key={idx}>
                  <td className="Champion">
                    <div className="ChampLabel">
                      <img
                        src={`Images/champion/${tooltip?.champFileName}.png`}
                        alt="ChampImage"
                        className="ChampImage"
                      />
                      <div>
                        {lang === "kr"
                          ? tooltip?.champion
                          : tooltip?.champFileName}
                      </div>
                    </div>
                  </td>
                  <td className="Player">{tooltip?.player}</td>
                  <td className="Pick">{`${tooltip?.gamesPlayed}${t(
                    "team.draft.count"
                  )}`}</td>
                </TooltipContent>
              );
            })}
          </tbody>
        </TooltipTable>
      </ToolTipWrapper>
    </ArrowWrapper>
  );
}

export default ToolTips;

const TooltipTable = styled.table`
  width: 316px;
`;

const ArrowWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Arrow = styled.div`
  border-bottom: 10px solid #7c778b;
  border-right: 10px solid transparent;
  border-left: 10px solid transparent;
  border-bottom-color: #3a3745;
  width: 15px;
`;

const ToolTipWrapper = styled.div`
  border: solid 1px #7c778b;
  background-color: #3a3745;
  padding: 23.5px 14px 16.5px 14px;
`;

const TooltipNav = styled.tr`
  text-align: center;
  vertical-align: middle;
  width: 316px;
  height: 28px;
  border: solid 1px #474453;
  background-color: #2f2d38;
  font-family: NotoSansKR, Apple SD Gothic Neo;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: -0.6px;
  text-align: left;
  padding: 5px 0 6px 13px;
  color: #817e90;
  > .Champion {
    padding-left: 10px;
    text-align: left;
    vertical-align: middle;
  }
  > .Player {
    text-align: center;
    vertical-align: middle;
  }
  > .Pick {
    text-align: center;
    vertical-align: middle;
  }
`;

const TooltipContent = styled.tr`
  text-align: center;
  vertical-align: middle;
  width: 316px;
  height: 28px;
  border-bottom: 1px solid #474453;
  font-family: NotoSansKR, Apple SD Gothic Neo;
  font-size: 12px;
  letter-spacing: -0.6px;
  text-align: left;
  color: #ffffff;

  > td {
    text-align: left;
    vertical-align: middle;
    > .ChampLabel {
      display: flex;
      align-items: center;

      > .ChampImage {
        width: 19px;
        height: 19px;
        border-radius: 25px;
        margin: 0 10px 0 10px;
      }
    }
  }
  > .Player {
    text-align: center;
    vertical-align: middle;
    width: 80px;
  }
  > .Pick {
    text-align: center;
    vertical-align: middle;
    font-size: 12px;
    color: #f04545;
    font-family: Poppins;
    width: 70px;
  }
`;
