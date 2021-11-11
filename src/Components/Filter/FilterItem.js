import React, { memo, useState } from "react";
import styled, { css } from "styled-components";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { SetLeague, SetSeason, SetYear } from "../../redux/modules/filtervalue";

const FilterItem = memo(({ title, isHaveFilter, multiFilter }) => {
  const { t } = useTranslation();
  const [viewSwitch, setViewSwitch] = useState(true);
  const [checked, setChecked] = useState(false);
  const filters = useSelector((state) => state.FilterReducer);
  const selector = useSelector((state) => state.SelectorReducer);
  const dispatch = useDispatch();

  const changeSwitch = () => {
    setViewSwitch(!viewSwitch);
  };

  const handleCheckboxClick = () => {
    if (
      (title === t("label.league") && filters.league.length === 0) ||
      filters.league.length < selector.leagueFilter.length
    ) {
      setChecked(true);
      dispatch(SetLeague(selector.leagueFilter));
    } else if (
      title === t("label.league") &&
      filters.league.length === selector.leagueFilter.length
    ) {
      setChecked(false);
      dispatch(SetLeague([]));
    }

    if (
      title === t("label.season") &&
      (filters.season.length === 0 ||
        filters.season.length < selector.seasonFilter.length)
    ) {
      setChecked(true);
      dispatch(SetSeason(selector.seasonFilter));
    } else if (
      title === t("label.season") &&
      filters.season.length === selector.seasonFilter.length
    ) {
      setChecked(false);
      dispatch(SetSeason([]));
    }
  };

  return (
    <Item>
      <InnerWrapper>
        <Header>
          {viewSwitch && isHaveFilter ? (
            <img
              src="Images/btn_view_detail.png"
              srcset="Images/btn_view_detail@2x.png 2x,
      Images/btn_view_detail@3x.png 3x"
              onClick={() => changeSwitch()}
              className="up"
              alt="열기"
            />
          ) : (
            <img
              src="Images/btn_view_detail.png"
              srcset="Images/btn_view_detail@2x.png 2x,
      Images/btn_view_detail@3x.png 3x"
              className="down down-opacity"
              onClick={() => changeSwitch()}
              alt="닫기"
            />
          )}
          <span className={(!viewSwitch || !isHaveFilter) && "down-opacity"}>
            {title}
          </span>
        </Header>
        <div className={viewSwitch ? "open-filter-item" : "close-filter-item"}>
          {/* 전체선택 */}
          {(title === t("label.league") ||
            (title === t("label.season") && filters.year.length > 0)) && (
            <div className="select_all">
              <input
                type="checkbox"
                onClick={handleCheckboxClick}
                checked={checked}
              />
              <div>{t("filters.selectAll")}</div>
            </div>
          )}
          {multiFilter}
        </div>
      </InnerWrapper>
    </Item>
  );
});

export default FilterItem;

const Header = styled.div`
  width: 210px;
  margin: 0 0 4px;
  span {
    width: 100%;
    height: 22px;
    margin: 2px 0 0 5px;
    font-family: SpoqaHanSansNeo;
    font-size: 18px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.22;
    letter-spacing: normal;
    text-align: left;
    color: #fff;
  }

  .up {
    width: 24px;
    height: 24px;
    margin: 0 5px 0 0;
    object-fit: contain;
    vertical-align: middle;
    cursor: pointer;
  }

  .down {
    transform: rotate(180deg);
    width: 24px;
    height: 24px;
    margin: 0 5px 0 0;
    object-fit: contain;
    vertical-align: middle;
    cursor: pointer;
  }

  .down-opacity {
    opacity: 0.3;
  }
`;

const Item = styled.div`
  width: 250px;
  /* filter item scoll */

  margin: 0 0 10px;
  padding: 20px;
  border-radius: 35px;
  background-color: #2f2d38;

  .open-filter-item {
    display: block;
  }

  .close-filter-item {
    display: none;
  }

  .select_all {
    border-bottom: 1px solid #433f4e;
    color: #fff;
    font-size: 15px;
    display: flex;
    align-items: center;
    padding: 10px 0;

    input[type="checkbox"] {
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;

      display: inline-block;
      width: 24px;
      height: 24px;

      background-clip: content-box;
      background: url("/Images/btn_check_off.svg") no-repeat;
      margin-right: 8px;

      &:checked {
        background-color: #5942ba;
        border: #5942ba;
        border-radius: 2px;
        background: url("/Images/btn_check_on.svg") no-repeat;
        float: right;
      }

      &:focus {
        outline: none !important;
      }
    }
  }
`;

const InnerWrapper = styled.div`
  padding-right: 10px;
  height: 100%;
  max-height: 360px;
  overflow-y: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #434050;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    margin: 5px 0;
  }
`;
