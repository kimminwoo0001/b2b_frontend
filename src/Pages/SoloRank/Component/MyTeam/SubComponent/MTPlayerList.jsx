/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

import * as S from "../styled/MTStyledTable";
import Button from "../../../../../Components/Ui/Button";
import IconStar from "../../../../../Components/Ui/Icons/IconStar";
import { useForm } from "react-hook-form";
import Avatar from "../../../../../Components/Ui/Avatar";
import Arrow from "../../../../../Components/Ui/Arrow";
import IconDel from "../../../../../Components/Ui/Icons/IconDel";

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
          <h4>라이엇아이디글자수가 몇글자일까요</h4>
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
                  <div className="table-col2">{`라이엇아이디글자수가 몇글자일까요`}</div>
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
            <S.AddPlayer>
              <button>+</button>
              <div>
                <p>솔로랭크 ID 추가</p>
                <span>ID는 최대 6개 까지 등록 가능합니다</span>
              </div>
            </S.AddPlayer>
          </>
        ) : (
          // 클로즈 ui
          <S.CloseList></S.CloseList>
        )}
      </ul>

      {/* 최근 30일간 플레이한 챔피언 */}
      <ul className="table-item-col3">
        {/* 반복 */}
        <S.ChampList>
          <S.ChampInfo>
            <S.ChampLabel>Most 1</S.ChampLabel>
            <S.ChampInfoText>
              <Avatar size={34} src="images/champion/nunu.png" alt="누누" />
              <div>
                <h6>블라디미르</h6>
                <p>
                  {`${100000}경기 ${5000}승 ${5000}패`}
                  <em>{` ${(5 / 10) * 100}%`}</em>
                </p>
              </div>
            </S.ChampInfoText>
          </S.ChampInfo>
        </S.ChampList>
      </ul>

      <S.ToggleMenuButton onClick={() => setIsOpen(!isOpen)}>
        <Arrow direction={isOpen ? "T" : "B"} size={5}></Arrow>
      </S.ToggleMenuButton>
    </S.TableItemRow>
  );
};

export default MTPlayerHeader;
