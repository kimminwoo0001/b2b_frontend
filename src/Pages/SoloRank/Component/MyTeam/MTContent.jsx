/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled/macro";

import { useTranslation } from "react-i18next";
import ItemBox from "./SubComponent/ItemBox";

const MTContent = () => {
  const { t } = useTranslation();
  return (
    <SWrapper>
      <SCategory>
        <div className="label">
          {t("soloRank.myTeam.label.addInterestedPlayer")}
        </div>
        <div className="label">{t("soloRank.myTeam.label.soloRankID")}</div>
        <div className="label">
          {t("soloRank.myTeam.label.curTier8prevTier")
            .split("\n")
            .map((line) => {
              return (
                <>
                  {line}
                  <br />
                </>
              );
            })}
        </div>
        <div className="label">{t("soloRank.myTeam.label.curSeason")}</div>
        <div className="label">{t("common.label.winrate")}</div>
        <div className="label">
          {t("soloRank.myTeam.label.recentDays").replace("##", "30")}
        </div>
        <div className="label">{t("common.label.winrate")}</div>
        <div className="label">
          {t("soloRank.myTeam.label.daysPlayedCham")
            .split("\n")
            .map((line) => {
              return (
                <>
                  {line.replace("##", "30")}
                  <br />
                </>
              );
            })}
        </div>
        <button className="label">
          {t("soloRank.myTeam.label.addInterestedPlayer")}
        </button>
      </SCategory>
    </SWrapper>
  );
};

export default MTContent;

const SWrapper = styled.section`
  width: 1110px;
  height: 1346px;
  margin: 20px 0 0;
`;

const SCategory = styled.div`
  width: 1110px;
  height: 38px;
  margin: 0 0 5px;
  padding: 0 0 0 14px;
  display: flex;
  justify-content: space-between;

  .label {
    height: 19px;
    margin: 10px 0 9px 0;
    font-family: SpoqaHanSansNeo;
    font-size: 15px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    color: #817e8b;
  }

  // .addInterestedPlayer {
  //   width: 153px;
  // }
  // .soloRankID {
  //   width: 167px;
  // }
  // .curTier8prevTier {
  //   width: 230px;
  // }
  // .curSeason {
  //   width: 153px;
  // }
  // .winrate {
  //   width: 153px;
  // }
  // .recent {
  //   width: 153px;
  // }
  // .addInterestedPlayer {
  //   width: 153px;
  // }
  // .addInterestedPlayer {
  //   width: 153px;
  // }
`;
