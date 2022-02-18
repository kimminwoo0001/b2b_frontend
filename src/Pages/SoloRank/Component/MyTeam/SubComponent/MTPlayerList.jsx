/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

import * as S from "../styled/MTStyledTable";
import Button from "../../../../../Components/Ui/Button";
import IconStar from "../../../../../Components/Ui/Icons/IconStar";
import Avatar from "../../../../../Components/Ui/Avatar";
import Arrow from "../../../../../Components/Ui/Arrow";
import IconDel from "../../../../../Components/Ui/Icons/IconDel";
import { typoStyle } from "../../../../../Styles/ui";

import { AnimatePresence } from "framer-motion";

const MTPlayerHeader = ({ id }) => {
  const { t } = useTranslation();

  // 선수id로 솔로랭크 조회
  // ui 열고 닫기 상태
  const [isOpen, setIsOpen] = useState(true);

  // 즐겨찾기 기능 관련
  const [isLike, setIsLike] = useState(false);
  const handleFavorite = (e) => {
    const { name, checked, value } = e.target;
    console.log(name, checked, value);
    setIsLike(checked);
  };

  // 선수삭제
  const handleDelete = (e) => {
    console.log("선수아이디를 삭제하는 기능");
  };

  // 선수등록
  const handleAddPlayer = () => {
    console.log("선수등록 ㄱㄱ");
  };

  return (
    // 관심선수
    <S.TableItemRow>
      {/* 선수정보 & 등록 */}
      <div className="table-item-col1">
        <S.InfoId>
          <S.Star name={"쇼메이커"} checked={isLike} onChange={handleFavorite}>
            <IconStar isActive={isLike} />
          </S.Star>
          <span>dk미드</span>
          <h4 css={typoStyle.noWrap}>AAAAAAAAAAAAA</h4>
          <h5>김허수</h5>
        </S.InfoId>
      </div>

      {/* 솔로랭크 정보 */}
      <ul className="table-item-col2">
        {isOpen ? (
          // 오픈 ui
          <>
            {Array(8)
              .fill(1)
              .map(() => (
                <S.OpenList>
                  {/* 아이디 */}
                  <div className="table-col2">
                    <span css={typoStyle.noWrap}>{`DK SHOWMAKER`}</span>
                  </div>
                  {/* 티어 */}
                  <div className="table-col3">
                    <p>{`Challenger 1588LP`}</p>
                    <span>{`S11 challenger / S10 Challenger`}</span>
                  </div>
                  {/* 이번시즌 */}
                  <div className="table-col4">
                    <span>{`${1042}경기`}</span>
                    <span>{`${580}승 ${449}패`}</span>
                  </div>
                  {/* 시즌 승률 */}
                  <div className="table-col5">
                    {`${parseInt((580 / 1042) * 100)}%`}
                  </div>
                  {/* 최근 */}
                  <div className="table-col6">
                    <span>{`${30}경기`}</span>
                    <span>{`${15}승 ${15}패`}</span>
                  </div>
                  {/* 최근 승률 */}
                  <div className="table-col7">
                    {`${parseInt((580 / 1042) * 100)}%`}
                  </div>

                  {/* 선수삭제 버튼 */}
                  <button onClick={handleDelete}>
                    <IconDel />
                  </button>
                </S.OpenList>
              ))}

            {/* 선수 추가 ui */}
            <S.AddPlayer onClick={handleAddPlayer}>
              <button>+</button>
              <div>
                <p>솔로랭크 ID 추가</p>
                <span>ID는 최대 6개 까지 등록 가능합니다</span>
              </div>
            </S.AddPlayer>
          </>
        ) : (
          // 클로즈 ui
          <S.CloseList>
            <div className="table-col2">
              <span css={typoStyle.noWrap}>{`DK SHOWMAKER`}</span>
            </div>
            {/* 티어 */}
            <div className="table-col3">
              <p>{`Challenger 1588LP`}</p>
              <span>{`S11 challenger / S10 Challenger`}</span>
            </div>
            {/* 이번시즌 */}
            <div className="table-col4">
              <span>{`${1042}경기`}</span>
              <span>{`${580}승 ${449}패`}</span>
            </div>
            {/* 시즌 승률 */}
            <div className="table-col5">
              {`${parseInt((580 / 1042) * 100)}%`}
            </div>
            {/* 최근 */}
            <div className="table-col6">
              <span>{`${30}경기`}</span>
              <span>{`${15}승 ${15}패`}</span>
            </div>
            {/* 최근 승률 */}
            <div className="table-col7">
              {`${parseInt((580 / 1042) * 100)}%`}
            </div>
          </S.CloseList>
        )}
      </ul>

      {/* 최근 30일간 플레이한 챔피언 */}
      <S.ChampList className="table-item-col3" isOpen={isOpen}>
        {/* #반복 - 챔피언 리스트 */}
        <S.ChampListItem>
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
        </S.ChampListItem>

        <S.ChampListItem>
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
        </S.ChampListItem>

        <S.ChampListItem>
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
        </S.ChampListItem>
      </S.ChampList>

      <S.ToggleMenuButton onClick={() => setIsOpen(!isOpen)}>
        <Arrow direction={isOpen ? "T" : "B"} size={5}></Arrow>
      </S.ToggleMenuButton>
    </S.TableItemRow>
  );
};

export default MTPlayerHeader;
