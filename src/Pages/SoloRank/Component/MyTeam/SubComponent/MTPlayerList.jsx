/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import * as S from "../styled/MTStyledTable";
import IconStar from "../../../../../Components/Ui/Icons/IconStar";
import Avatar from "../../../../../Components/Ui/Avatar";
import Arrow from "../../../../../Components/Ui/Arrow";
import IconDel from "../../../../../Components/Ui/Icons/IconDel";
import { typoStyle } from "../../../../../Styles/ui";
import { useModal } from "../../../../../Hooks";
import { modalList } from "../../../../../Components/Modals/Modals";
import { getTier } from "../../../../../lib/getTier";
import { API } from "../../../../config";
import { useSelector, useDispatch, batch } from "react-redux";
import axiosRequest from "../../../../../lib/axios/axiosRequest";
import { SetModalInfo } from "../../../../../redux/modules/modalvalue";
import { Loading } from "../../../../../redux/modules/filtervalue";

const getMaxTier = (tier, rank, lp) => {};

const MTPlayerHeader = ({
  id,
  bookmark,
  teamLine,
  nickName,
  name,
  playChampion,
  soloRankInfo,
}) => {
  const user = useSelector((state) => state.UserReducer);
  const { t } = useTranslation();
  const { openModal } = useModal();
  const dispatch = useDispatch();

  // 선수id로 솔로랭크 조회
  // ui 열고 닫기 상태
  const [isOpen, setIsOpen] = useState(true);

  // 즐겨찾기 기능 관련
  const [isLike, setIsLike] = useState(bookmark === 0 ? false : true);

  // close 시 데이터 셋
  const [closeData, setCloseData] = useState({
    name: "",
    tier: 0,
    season: {
      total: 0,
      win: 0,
      lose: 0,
      winrate: 0,
    },
    lastDay: {
      total: 0,
      win: 0,
      lose: 0,
      winrate: 0,
    },
  });

  const handleFavorite = (e) => {
    const { name, checked, value } = e.target;
    console.log(name, checked, value);

    const url = `${API}/lolapi/solorank/${
      checked ? "bookmarkadd" : "bookmarkdrop"
    }`;
    const params = {
      player: name,
      token: user.token,
    };

    axiosRequest(
      undefined,
      url,
      params,
      function (e) {
        setIsLike(checked);
      },
      function (objStore) {
        dispatch(SetModalInfo(objStore)); // 오류 발생 시, Alert 창을 띄우기 위해 사용
        dispatch(Loading(false));
      }
    );
  };
  // 선수삭제
  const handleDelete = (e) => {
    console.log("선수아이디를 삭제하는 기능");
  };
  // 선수등록
  const handleClickModalOpen = () => {
    openModal(modalList.addSolorankID, {
      onSubmit: () => {
        console.log("submit시 action을 등록");
      },
    });
  };

  useEffect(() => {
    let allName = "";
    let maxTier = 0;
    let seasonTotal = 0;
    let seasonWin = 0;
    let seasonlose = 0;
    let seasonWinrate = 0;
    let lastDayTotal = 0;
    let lastDayWin = 0;
    let lastDayLose = 0;
    let lastDayWinrate = 0;

    for (let data of soloRankInfo) {
      allName += (data.summonerName ?? "") + ",";
      if (data.lastSeason) {
        seasonTotal += +data.lastSeason.total;
        seasonWin += +data.lastSeason.win;
        seasonlose += +data.lastSeason.lose;
      }
      if (data.lastDay) {
        lastDayTotal += +data.lastDay.total;
        lastDayWin += +data.lastDay.win;
        lastDayLose += +data.lastDay.lose;
      }
    }

    setCloseData({
      name: allName.substring(0, allName.length - 1),
      tier: maxTier,
      season: {
        total: seasonTotal,
        win: seasonWin,
        lose: seasonlose,
        winrate: Math.round(seasonWin / seasonTotal),
      },
      lastDay: {
        total: lastDayTotal,
        win: lastDayWin,
        lose: lastDayLose,
        winrate: Math.round(lastDayWin / lastDayTotal),
      },
    });
  }, []);

  return (
    // 관심선수
    <S.TableItemRow>
      {/* 선수정보 & 등록 */}
      <div className="table-item-col1">
        <S.InfoId>
          <S.Star name={id} checked={isLike} onChange={handleFavorite}>
            <IconStar isActive={isLike} />
          </S.Star>
          <span>{teamLine}</span>
          <h4 css={typoStyle.noWrap}>{nickName}</h4>
          <h5>{name}</h5>
        </S.InfoId>
      </div>

      {/* col-2 솔로랭크 정보 */}
      <ul className="table-item-col2">
        {isOpen ? (
          // 오픈 ui
          <>
            {soloRankInfo.length > 0 &&
              soloRankInfo.map((data, i) => {
                return (
                  <S.OpenList key={"header" + i}>
                    {/* 아이디 */}
                    <div className="table-col2" css={typoStyle.noWrap}>
                      <span>{data.summonerName ?? ""}</span>
                    </div>
                    {/* 티어 */}
                    <div className="table-col3">
                      <p>{`${getTier(data.tier ?? 0)} ${""}LP`}</p>
                      {/* <span>{`S11 challenger / S10 Challenger`}</span> */}
                    </div>
                    {/* 이번시즌 */}
                    <div className="table-col4">
                      <span>{`${data.lastSeason ? data.lastSeason.total : 0}${t(
                        "common.label.game"
                      )}`}</span>
                      <span>{`${data.lastSeason ? data.lastSeason.win : 0}${t(
                        "common.label.win"
                      )} ${data.lastSeason ? data.lastSeason.lose : 0}${t(
                        "common.label.lose"
                      )}`}</span>
                    </div>
                    {/* 시즌 승률 */}
                    <div className="table-col5">
                      {`${Math.round(+data.lastSeason.winrate ?? 0)}%`}
                    </div>
                    {/* 최근 */}
                    <div className="table-col6">
                      <span>{`${data.lastDay ? +data.lastDay.total : 0}${t(
                        "common.label.game"
                      )}`}</span>
                      <span>{`${data.lastDay ? +data.lastDay.win : 0}${t(
                        "common.label.win"
                      )} ${data.lastDay ? +data.lastDay.lose : 0}${t(
                        "common.label.lose"
                      )}`}</span>
                    </div>
                    {/* 최근 승률 */}
                    <div className="table-col7">
                      {`${Math.round(
                        data.lastDay ? +data.lastDay.winrate : 0
                      )}%`}
                    </div>

                    {/* 선수삭제 버튼 */}
                    <button onClick={handleDelete}>
                      <IconDel />
                    </button>
                  </S.OpenList>
                );
              })}

            {/* 버튼 - 선수 추가 modal */}
            <S.AddPlayer onClick={handleClickModalOpen}>
              <button>+</button>
              <div>
                <p>{t("soloRank.myTeam.label.addSoloRankID")}</p>
                <span>{t("soloRank.myTeam.desc.addSoloRankID")}</span>
              </div>
            </S.AddPlayer>
          </>
        ) : (
          // 클로즈 ui
          <S.CloseList>
            <div className="table-col2" css={typoStyle.noWrap}>
              <span>{closeData.name}</span>
            </div>
            {/* 티어 */}
            <div className="table-col3">
              <p>{`${closeData.tier}`}</p>
              {/* <span>{`S11 challenger / S10 Challenger`}</span> */}
            </div>
            {/* 이번시즌 */}
            <div className="table-col4">
              <span>{`${closeData.season.total}${t(
                "common.label.game"
              )}`}</span>
              <span>{`${closeData.season.win}${t("common.label.win")} ${
                closeData.season.lose
              }${t("common.label.lose")}`}</span>
            </div>
            {/* 시즌 승률 */}
            <div className="table-col5">{`${closeData.season.winrate}%`}</div>
            {/* 최근 */}
            <div className="table-col6">
              <span>{`${closeData.lastDay.total}${t(
                "common.label.game"
              )}`}</span>
              <span>{`${closeData.lastDay.win}${t("common.label.win")} ${
                closeData.lastDay.lose
              }${t("common.label.lose")}`}</span>
            </div>
            {/* 최근 승률 */}
            <div className="table-col7">{`${closeData.lastDay.winrate}%`}</div>
          </S.CloseList>
        )}
      </ul>

      {/* col3 - 최근 30일간 플레이한 챔피언 */}
      <S.ChampList className="table-item-col3" isOpen={isOpen}>
        {/* #반복 - 챔피언 리스트 */}
        {playChampion.length > 0 &&
          playChampion.map((data, idx) => {
            return (
              <S.ChampListItem>
                <S.ChampInfo>
                  {isOpen && <S.ChampLabel>Most {idx + 1}</S.ChampLabel>}
                  <S.ChampInfoText>
                    <Avatar
                      size={isOpen ? 34 : 24}
                      src={`images/champion/${data.championEng.replace(
                        " ",
                        ""
                      )}.png`}
                      alt="data.champlion"
                    />
                    <div>
                      {isOpen && <h6>{data.champion}</h6>}
                      {isOpen ? (
                        <p css={typoStyle.noWrap}>
                          {`${data.total}${t("common.label.game")} ${
                            data.win
                          }${t("common.label.win")} ${data.lose}${t(
                            "common.label.lose"
                          )}`}
                          <em>{`${Math.round(data.winrate)}%`}</em>
                        </p>
                      ) : (
                        <p>{`${data.total}${t("common.label.game")}`}</p>
                      )}
                    </div>
                  </S.ChampInfoText>
                </S.ChampInfo>
              </S.ChampListItem>
            );
          })}

        {/* <S.ChampListItem>
          <S.ChampInfo>
            {isOpen && <S.ChampLabel>Most 1</S.ChampLabel>}
            <S.ChampInfoText>
              <Avatar
                size={isOpen ? 34 : 24}
                src="images/champion/nunu.png"
                alt="누누"
              />
              <div>
                {isOpen && <h6>블라디미르</h6>}
                {isOpen ? (
                  <p css={typoStyle.noWrap}>
                    {`${100}경기 ${50}승 ${50}패`}
                    <em>{` ${(5 / 10) * 100}%`}</em>
                  </p>
                ) : (
                  <p>{`${100}경기`}</p>
                )}
              </div>
            </S.ChampInfoText>
          </S.ChampInfo>
        </S.ChampListItem> */}
      </S.ChampList>

      {/* 우측버튼 - close <-> open */}
      <S.ToggleMenuButton onClick={() => setIsOpen(!isOpen)}>
        <Arrow direction={isOpen ? "T" : "B"} size={5}></Arrow>
      </S.ToggleMenuButton>
    </S.TableItemRow>
  );
};

export default MTPlayerHeader;
