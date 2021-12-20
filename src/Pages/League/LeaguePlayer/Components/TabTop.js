import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import Tippy from "@tippy.js/react";
import LoadingImg from "../../../../Components/LoadingImg/LoadingImg";
import { useSelector } from "react-redux";
import PRInfoTooltip from "./PRInfoTooltip";

function TabTop({ playerData, loading }) {
  const { t } = useTranslation();
  const lang = useSelector((state) => state.LocaleReducer);
  const filters = useSelector((state) => state.FilterReducer);
  if (loading) return <LoadingImg />;

  return (
    <TabContentsWrapper>
      <TableNav>
        <div className="NavTitle">
          {t("league.playerStat.sbrLabel")}
          <StyledTippy
            duration={0}
            delay={[100, 0]}
            content={<PRInfoTooltip PRInfo={t("league.playerStat.prInfo")} />}
            placement="top"
          >
            <span>?</span>
          </StyledTippy>
        </div>
      </TableNav>
      {/* 받아온 선수 정보 데이터 뿌려주기 */}
      {playerData?.map((playerData, idx) => {
        return (
          <TableContents key={idx}>
            <div className="RankValue">{idx + 1}</div>
            <img
              src={playerData.image}
              alt="PlayerImage"
              className="PlayerImage"
              width="98.7px"
              height=" 74px"
              onError={(e) => {
                e.target.src = "Images/player_error_image.png";
              }}
            />
            <div className="PlayerInfoBox">
              <p className="TeamValue">
                <img
                  src={`Images/TeamLogo/${playerData.team}.png`}
                  width="20px"
                  height="20px"
                  alt="teamIcon"
                ></img>
                <label>{playerData.team}</label>
              </p>
              <p className="PlayerValue">{`${playerData.player} (${
                lang === "ko" ? playerData.NativeName : playerData.name
              })`}</p>
            </div>

            <div className="ParticipateValue">
              <p className="ParticipateTitle">
                {t("league.playerStat.played")}
              </p>
              <p className="ParticipateNumber">{playerData.total}</p>
            </div>
            <div className="WinsValue">
              <p className="WinTitle">{t("league.playerStat.winrate")}</p>
              <p className="WinNumber">{playerData.wins}</p>
            </div>
            <div className="KDAValue">
              <p className="KDATitle">{t("league.playerStat.kda")}</p>
              <KDA>
                <span className="Kills">{playerData.kills.toFixed(1)}</span>
                <p className="Slash">/</p>
                <span className="Deaths">{playerData.deaths.toFixed(1)}</span>
                <p className="Slash">/</p>
                <span className="Support">{playerData.assists.toFixed(1)}</span>
                <span className="Rate">{`${playerData.kda.toFixed(2)}:1`}</span>
              </KDA>
            </div>

            {filters.league.indexOf("lpl") === -1 ? (
              <div className="SBRValue">
                <p className="SBRTitle">{t("league.playerStat.sbr")}</p>
                <p className="SBRNumber">{playerData.sbr}</p>
              </div>
            ) : (
              <div></div>
            )}
          </TableContents>
        );
      })}
    </TabContentsWrapper>
  );
}

export default TabTop;

const TabContentsWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  height: 100%;
  margin-top: 22px;
  font-family: NotoSansKR, Apple SD Gothic Neo;
  font-weight: bold;
  font-size: 12px;
  color: rgb(132, 129, 142);
`;

const TableNav = styled.div`
  display: flex;
  align-items: center;
  height: 43px;
  border-radius: 15px;
  border: solid 1px #23212a;
  background-color: #23212a;
  padding: 12px 0 12px 20px;

  span {
    width: 15px;
    height: 15px;
    margin: 2px 0 2px 10px;
    padding: 0 5px;
    border: solid 1px #84818e;
    border-radius: 20px;
    font-family: NotoSansKR;
    font-size: 10px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 2.5;
    letter-spacing: -0.5px;
    text-align: left;
    color: #84818e;
  }

  .NavTitle {
    font-family: SpoqaHanSansNeo;
    font-size: 15px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.67;
    letter-spacing: normal;
    text-align: left;
    color: #84818e;
    margin-right: 10px;
  }
`;

const TableContents = styled.div`
  display: flex;
  align-items: center;
  height: 79px;
  margin-top: 10px;
  border: solid 1px rgb(58, 55, 69);
  background-color: rgb(47, 45, 56);
  border-radius: 15px;
  .RankValue {
    width: 20px;
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 17px;
    font-weight: bold;
    text-align: center;
    color: rgb(255, 255, 255);
    margin: 0 13px 0 34px;
  }
  .TeamValue {
    display: flex;
    align-items: center;
    margin-left: 15.3px;
    label {
      font-family: NotoSansKR, Apple SD Gothic Neo;
      font-size: 12px;
      color: rgb(129, 126, 139);
      /* margin-right: 317px; */
      width: 250px;
    }
  }
  .PlayerValue {
    width: 330px;
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 15px;
    font-weight: bold;
    color: rgb(255, 255, 255);
    margin-left: 15.3px;
    margin-top: 5px;
  }
  .ParticipateTitle {
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 12px;
    color: rgb(129, 126, 139);
    margin-bottom: 5px;
  }
  .ParticipateNumber {
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 15px;
    font-weight: bold;
    text-align: center;
    color: rgb(255, 255, 255);
  }
  .WinTitle {
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 12px;
    color: rgb(129, 126, 139);
    margin-bottom: 5px;
  }
  .WinNumber {
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 15px;
    font-weight: bold;
    text-align: center;
    color: rgb(255, 255, 255);
  }
  .KDATitle {
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 12px;
    text-align: center;
    color: rgb(129, 126, 139);
    margin-bottom: 5px;
  }

  .SBRTitle {
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 12px;
    text-align: center;
    color: rgb(129, 126, 139);
    margin-bottom: 5px;
  }
  .SBRNumber {
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 17px;
    font-weight: bold;
    text-align: center;
    color: rgb(240, 69, 69);
  }
  .WinsValue {
    margin: 0 20px 0 60px;
  }
  .SBRValue {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 120px;
  }
`;

const KDA = styled.div`
  font-family: NotoSansKR, Apple SD Gothic Neo;
  font-size: 15px;
  font-weight: bold;
  text-align: center;
  color: rgb(255, 255, 255);
  width: 230px;
  display: flex;
  justify-content: center;
  .Slash {
    color: #817e90;
  }
  span {
    margin: 0 4px 0 4px;
  }
  .Rate {
    text-align: center;
    color: rgb(240, 69, 69);
  }
`;

const StyledTippy = styled(Tippy)``;
