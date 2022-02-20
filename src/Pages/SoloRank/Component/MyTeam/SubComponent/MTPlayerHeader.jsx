/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled/macro";
import { useTranslation } from "react-i18next";
import theme from "../../../../../Styles/Theme";

const MTPlayerHeader = ({ isLike, teamLine, nickName, name }) => {
  const { t } = useTranslation();
  return (
    <SPlayerHeaderContainer>
      <div className="header">
        <div className="info">
          {isLike ? (
            <img className="like" src="/Images/ico-star-on.svg" alt="like" />
          ) : (
            <img className="like" src="/Images/ico-star-off.svg" alt="like" />
          )}
          <div className="team-line">{teamLine}</div>
          <div className="player-nick-name">{nickName}</div>
          <div className="player-name">{name}</div>
        </div>
      </div>
      <div className="add-soloRank-container">
        <div className="soloRank-label">
          {t("soloRank.myTeam.label.soloRankID")}
        </div>
        <input
          type="text"
          className="soloRank-input"
          placeholder={t("common.label.ID")}
        >
          {}
        </input>
        <button className="soloRank-btn">{t("common.button.add")}</button>
      </div>
    </SPlayerHeaderContainer>
  );
};

export default MTPlayerHeader;

const SPlayerHeaderContainer = styled.div`
  .info {
    width: 153px;
    position: absolute;
    top: 30px;
    .like {
      width: 20px;
      height: 20px;
      margin: 0px 0px 5px 0px;
      object-fit: contain;
    }
    .team-line {
      height: 17px;
      margin: 0 0px 0 0;
      font-family: SpoqaHanSansNeo;
      font-size: 13px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: normal;
      letter-spacing: normal;
      text-align: left;
      color: ${theme.colors.info};
    }
    .player-nick-name {
      height: 22px;
      margin: 0px 0 0;
      font-family: SpoqaHanSansNeo;
      font-size: 18px;
      font-weight: bold;
      font-stretch: normal;
      font-style: normal;
      line-height: normal;
      letter-spacing: normal;
      text-align: left;
      color: ${theme.colors.text};
    }
    .player-name {
      height: 17px;
      margin: 0px 0px 0 0;
      font-family: SpoqaHanSansNeo;
      font-size: 13px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: normal;
      letter-spacing: normal;
      text-align: left;
      color: ${theme.colors.text};
    }
  }

  .add-soloRank-container {
    position: absolute;
    bottom: 20px;
    width: 125px;
    height: 96px;
    margin: 0 14px 0 0;

    .soloRank-label {
      height: 17px;
      margin: 0 3px 8px 2px;
      font-family: SpoqaHanSansNeo;
      font-size: 13px;
      font-weight: 500;
      font-stretch: normal;
      font-style: normal;
      line-height: normal;
      letter-spacing: normal;
      text-align: left;
      color: ${theme.colors.text};
    }

    .soloRank-input {
      width: 125px;
      height: 34px;
      margin: 0px 0 3px;
      padding-left: 10px;
      border-radius: 10px;
      background-color: ${theme.colors.table_head};

      font-family: SpoqaHanSansNeo;
      font-size: 13px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.92;
      letter-spacing: normal;
      text-align: left;
      color: ${theme.colors.text};
    }
    .soloRank-btn {
      width: 125px;
      height: 34px;
      margin: 0px 0 0;
      border-radius: 10px;
      background-color: ${theme.colors.btn_nor};

      font-family: SpoqaHanSansNeo;
      font-size: 13px;
      font-weight: bold;
      font-stretch: normal;
      font-style: normal;
      line-height: normal;
      letter-spacing: normal;
      text-align: center;
      color: ${theme.colors.text};
    }
  }
`;
