/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled/macro";
import React from "react";

import { useTranslation } from "react-i18next";
import DropdownItem from "../../../../Components/Ui/DropDown/DropdownItem";
import DropdownList from "../../../../Components/Ui/DropDown/DropdownList";
import Sortingimage from "../../../../Components/Ui/Sortingimage";
import ItemBox from "./SubComponent/ItemBox";

const inquireDayList = [1, 3, 5, 7, 15, 30];

const useSortableData = (tiers, config = null) => {
  const [sortConfig, setSortConfig] = React.useState(config);

  const sortedItems = React.useMemo(() => {
    let sortableItems = [...tiers];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [tiers, sortConfig]);
};

const MTContent = () => {
  // 챔피언 티어 오름차 내림차  정렬 상태값
  const tier = [];
  const { tiers, requestSorts } = useSortableData(tier ? tier : []);
  const { t } = useTranslation();

  return (
    <SWrapper>
      <SCategory>
        <div className="label addInterestedPlayer">
          {t("soloRank.myTeam.label.addInterestedPlayer")}
        </div>
        <div className="label soloRankID">
          {t("soloRank.myTeam.label.soloRankID")}
        </div>
        <div className="label curTier8prevTier">
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
          <Sortingimage />
        </div>
        <div className="label curSeason">
          {t("soloRank.myTeam.label.curSeason")}
        </div>
        <div className="label winrate">{t("common.label.winrate")}</div>
        <div className="label recentDays">
          {t("soloRank.myTeam.label.recentDays").replace("##", "30")}
        </div>
        <div className="label winrate">{t("common.label.winrate")}</div>
        <div className="label daysPlayedCham">
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
        <DropdownList
          label={t("soloRank.myTeam.label.recentDays").replace("##", "30")}
          onChange={() => {}}
        >
          {inquireDayList.map((day) => {
            return (
              <DropdownItem
                value={t("soloRank.myTeam.label.recentDays").replace("##", day)}
              >
                {t("soloRank.myTeam.label.recentDays").replace("##", day)}
              </DropdownItem>
            );
          })}
        </DropdownList>
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
  //justify-content: space-between;

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
    display: flex;
    align-items: center;
  }

  .addInterestedPlayer {
    width: 153px;
  }
  .soloRankID {
    width: 167px;
  }
  .curTier8prevTier {
    width: 230px;
  }
  .curSeason {
    width: 105px;
  }
  .winrate {
    width: 66px;
  }
  .recentDays {
    width: 93px;
  }
  .daysPlayedCham {
    width: 121px;
  }
`;
