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
import * as S from "./styled/MTStyledTable";

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
    // 테이블 헤더 카테고리
    <S.TableHead>
      <S.TableHeaderRow>
        {/* col1. 관심선수 */}
        <div className="table-col1">
          <span>{t("soloRank.myTeam.label.addInterestedPlayer")}</span>
        </div>
        {/* col2. 솔로랭크 id */}
        <div className="table-col2">
          <span>{t("soloRank.myTeam.label.soloRankID")}</span>
        </div>
        {/* col3. 현재 티어 LP */}
        <div className="table-col3">
          <span>
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
            <Sortingimage
              requestSorts={requestSorts}
              key={"curTier8prevTier"}
            />
          </span>
        </div>
        {/* col4. 이번시즌 */}
        <div className="table-col4">
          <span>
            {t("soloRank.myTeam.label.curSeason")}
            <Sortingimage requestSorts={requestSorts} key={"curSeason"} />
          </span>
        </div>
        {/* col5. 이번시즌 승률 */}
        <div className="table-col5">
          <span>
            {t("common.label.winrate")}
            <Sortingimage
              requestSorts={requestSorts}
              key={"curSeason-winrate"}
            />
          </span>
        </div>
        {/* col6. 최근 30일 */}
        <div className="table-col6">
          <span>
            {t("soloRank.myTeam.label.recentDays").replace("##", selectedDay)}
            <Sortingimage requestSorts={requestSorts} key={"recentDays"} />
          </span>
        </div>
        {/* col7. 최근 30일 승률 */}
        <div className="table-col7">
          <span>
            {t("common.label.winrate")}
            <Sortingimage
              requestSorts={requestSorts}
              key={"recentDays-winrate"}
            />
          </span>
        </div>
        {/* col8. 최근 30일간 플레이한 챔피언 */}
        <div className="table-col8">
          <span>
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
            <DropdownContainer
              onChange={(e) => {
                setSelectedDay(e.currentValue ?? 30);
              }}
            >
              <DropdownLabel css={[dropdownStyle.select_head]}>
                {t("soloRank.myTeam.label.recentDays").replace(
                  "##",
                  selectedDay
                )}
              </DropdownLabel>
              <DropdownList label={"recentDays"}>
                {inquireDayList.map((day) => {
                  return (
                    <DropdownItem
                      key={day + "일"}
                      css={[dropdownStyle.select_item]}
                      value={day}
                      label={`최근 ${day}일`}
                    >
                      {t("soloRank.myTeam.label.recentDays").replace("##", day)}
                    </DropdownItem>
                  );
                })}
              </DropdownList>
            </DropdownContainer>
          </span>
        </div>
      </S.TableHeaderRow>
    </S.TableHead>
  );
};

export default MTCategory;
