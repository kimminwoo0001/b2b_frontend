/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled/macro";
import React, { useState } from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import DropdownContainer from "../../../../Components/Ui/DropDown/DropdownContainer";
import DropdownItem from "../../../../Components/Ui/DropDown/DropdownItem";
import DropdownLabel from "../../../../Components/Ui/DropDown/DropdownLabel";
import DropdownList from "../../../../Components/Ui/DropDown/DropdownList";
import Sortingimage from "../../../../Components/Ui/Sortingimage";
import { dropdownStyle } from "../../../../Styles/ui";
import ItemBox from "./SubComponent/ItemBox";

const inquireDayList = [1, 3, 5, 7, 15, 30];
// 챔피언 티어 데이터 sorting Hooks
const useSortableData2 = (tiers, config = null) => {
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

  const requestSorts = (key) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return { tiers: sortedItems, requestSorts, sortConfig };
};
const MTCategory = () => {
  // 챔피언 티어 오름차 내림차  정렬 상태값
  const tier = [];
  const { tiers, requestSorts } = useSortableData2(tier ? tier : []);
  const [selectedDay, setSelectedDay] = useState(30);
  const { t } = useTranslation();
  return (
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
        <Sortingimage requestSorts={requestSorts} key={"curTier8prevTier"} />
      </div>
      <div className="label curSeason">
        {t("soloRank.myTeam.label.curSeason")}
        <Sortingimage requestSorts={requestSorts} key={"curSeason"} />
      </div>
      <div className="label winrate">
        {t("common.label.winrate")}
        <Sortingimage requestSorts={requestSorts} key={"curSeason-winrate"} />
      </div>
      <div className="label recentDays">
        {t("soloRank.myTeam.label.recentDays").replace("##", selectedDay)}
        <Sortingimage requestSorts={requestSorts} key={"recentDays"} />
      </div>
      <div className="label winrate">
        {t("common.label.winrate")}
        <Sortingimage requestSorts={requestSorts} key={"recentDays-winrate"} />
      </div>
      <div className="label daysPlayedCham">
        {t("soloRank.myTeam.label.daysPlayedCham")
          .split("\n")
          .map((line) => {
            return (
              <>
                {line.replace("##", selectedDay)}
                <br />
              </>
            );
          })}
      </div>
      <div css={{ width: 107 }}>
        <DropdownContainer
          onChange={(e) => {
            setSelectedDay(e.currentValue ?? 30);
          }}
        >
          <DropdownLabel css={[dropdownStyle.select_head]}>
            {t("soloRank.myTeam.label.recentDays").replace("##", selectedDay)}
          </DropdownLabel>
          <DropdownList label={"recentDays"}>
            {inquireDayList.map((day) => {
              return (
                <DropdownItem css={[dropdownStyle.select_item]} value={day}>
                  {t("soloRank.myTeam.label.recentDays").replace("##", day)}
                </DropdownItem>
              );
            })}
          </DropdownList>
        </DropdownContainer>
      </div>
    </SCategory>
  );
};

export default MTCategory;

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
    width: 168px;
  }
  .soloRankID {
    width: 139px;
  }
  .curTier8prevTier {
    width: 228px;
  }
  .curSeason {
    width: 105px;
  }
  .winrate {
    width: 66px;
  }
  .recentDays {
    width: 97px;
  }
  .daysPlayedCham {
    width: 120px;
  }

  .recentDropdown {
    width: 107px;
  }
`;
