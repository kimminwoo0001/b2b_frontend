/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import * as S from "../styled/MTStyledTable";
import IconStar from "../../../../Components/Ui/Icons/IconStar";
import Avatar from "../../../../Components/Ui/Avatar";
import Arrow from "../../../../Components/Ui/Arrow";
import IconDel from "../../../../Components/Ui/Icons/IconDel";
import { typoStyle } from "../../../../Styles/ui";
import { useModal } from "../../../../Hooks";
import { modalList } from "../../../../Components/Modals/Modals";
import { getRank, getTier } from "../../../../lib/getRank";
import { API } from "../../../config";
import { useSelector, useDispatch, batch } from "react-redux";
import axiosRequest from "../../../../lib/axios/axiosRequest";
import { SetModalInfo } from "../../../../redux/modules/modalvalue";
import { Loading } from "../../../../redux/modules/filtervalue";

const getMaxTier = (tier, rank, lp) => {};

const MTPlayerList = ({ teamLine, isMyTeamTab, getInfoFunc, info }) => {
  const {
    player,
    bookmark,
    position: role,
    player: nickName,
    playChampion,
    soloRankInfo,
    cdCount,
    cdName,
    cdTier,
    cdRank,
    cdLeaguePoints,
    cdCalRankPoint,
    cdSeasonTotal,
    cdSeasonWin,
    cdSeasonLose,
    cdSeasonWinrate,
    cdLastDayTotal,
    cdLastDayWin,
    cdLastDayLose,
    cdLastDayWinrate,
  } = info;
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
  const handleDelete = (summonerId) => {
    const title = t("soloRank.myTeam.label.deletSoloRankId");
    const text = t("soloRank.myTeam.desc.deletSoloRankId");
    const subtext = "";
    const onCancel = () => {};
    const onSubmit = () => {
      const url = `${API}/lolapi/solorank/summonerdrop`;
      const params = {
        summonerId: summonerId,
        token: user.token,
      };
      dispatch(Loading(true));
      axiosRequest(
        undefined,
        url,
        params,
        function (e) {
          console.log(e);
          dispatch(Loading(false));
          getInfoFunc();
        },
        function (objStore) {
          dispatch(SetModalInfo(objStore)); // 오류 발생 시, Alert 창을 띄우기 위해 사용
          dispatch(Loading(false));
        }
      );
    };
    openModal(modalList.confirm, { title, text, subtext, onCancel, onSubmit });
  };
  // 선수등록
  const handleClickModalOpen = (e) => {
    openModal(modalList.addSolorankID, {
      onSubmit: (e) => {
        console.log("submit시 action을 등록");
        const url = `${API}/lolapi/solorank/summoneradd`;
        const params = {
          player: player,
          role: role,
          summonerId: e.summonerId,
          puuId: e.puuId,
          token: user.token,
        };
        dispatch(Loading(true));
        axiosRequest(
          undefined,
          url,
          params,
          function (e) {
            console.log(e);
            getInfoFunc();
            dispatch(Loading(false));
          },
          function (objStore) {
            dispatch(SetModalInfo(objStore)); // 오류 발생 시, Alert 창을 띄우기 위해 사용
            dispatch(Loading(false));
          }
        );
      },
    });
  };

  useEffect(() => {}, []);

  return (
    // 관심선수
    <S.TableItemRow>
      {/* 선수정보 & 등록 */}
      <div className="table-item-col1">
        <S.InfoId>
          <S.Star name={player} checked={isLike} onChange={handleFavorite}>
            <IconStar isActive={isLike} />
          </S.Star>
          <span>{teamLine}</span>
          <h4 css={typoStyle.noWrap}>{nickName}</h4>
          {/* <h5>{name}</h5> */}
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
                    <div className="table-col2">
                      <span css={typoStyle.noWrap}>
                        {data.summonerName ?? ""}
                      </span>
                    </div>
                    {/* 티어 */}
                    <div className="table-col3">
                      <p>
                        {`${getRank(data.rank, data.tier)}  ${
                          data.tier > 0 ? `${data.leaguePoints}LP` : ""
                        }`}
                      </p>
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
                    {isMyTeamTab && (
                      <button
                        onClick={() => {
                          handleDelete(data.summonerId);
                        }}
                      >
                        <IconDel />
                      </button>
                    )}
                  </S.OpenList>
                );
              })}

            {/* 버튼 - 선수 추가 modal */}
            {isMyTeamTab && (
              <S.AddPlayer onClick={handleClickModalOpen}>
                <button>+</button>
                <div>
                  <p>{t("soloRank.myTeam.label.addSoloRankID")}</p>
                  <span>{t("soloRank.myTeam.desc.addSoloRankID")}</span>
                </div>
              </S.AddPlayer>
            )}
          </>
        ) : (
          // 클로즈 ui
          <S.CloseList>
            <div className="table-col2">
              <span css={[typoStyle.ellipsis_two, { width: 100 }]}>
                {cdName}
              </span>
              <span>{`(${cdCount})`}</span>
            </div>
            {/* 티어 */}
            <div className="table-col3">
              <p>
                {`${getRank(cdRank, cdTier)}  ${
                  cdTier > 0 ? `${cdLeaguePoints}LP` : ""
                }`}
              </p>
              {/* <span>{`S11 challenger / S10 Challenger`}</span> */}
            </div>
            {/* 이번시즌 */}
            <div className="table-col4">
              <span>{`${cdSeasonTotal}${t("common.label.game")}`}</span>
              <span>{`${cdSeasonWin}${t("common.label.win")} ${cdSeasonLose}${t(
                "common.label.lose"
              )}`}</span>
            </div>
            {/* 시즌 승률 */}
            <div className="table-col5">{`${cdSeasonWinrate}%`}</div>
            {/* 최근 */}
            <div className="table-col6">
              <span>{`${cdLastDayTotal}${t("common.label.game")}`}</span>
              <span>{`${cdLastDayWin}${t(
                "common.label.win"
              )} ${cdLastDayLose}${t("common.label.lose")}`}</span>
            </div>
            {/* 최근 승률 */}
            <div className="table-col7">{`${cdLastDayWinrate}%`}</div>
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
                      src={`Images/champion/${data.championEng.replace(
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

export default MTPlayerList;
