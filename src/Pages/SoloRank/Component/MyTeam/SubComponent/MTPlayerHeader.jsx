/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

import * as S from "../styled/MTStyledTable";
import Button from "../../../../../Components/Ui/Button";
import IconStar from "../../../../../Components/Ui/Icons/IconStar";
import {
  borderRadiusStyle,
  buttonStyle,
  transitionStyle,
} from "../../../../../Styles/ui";
import { useForm } from "react-hook-form";
import Avatar from "../../../../../Components/Ui/Avatar";
import Arrow from "../../../../../Components/Ui/Arrow";

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

  // 입력폼 관련 (useID, listOpen) - open : 쿼리검색, close: 1. 바깥쪽클릭 2. useID가 선택
  const { register, handleSubmit } = useForm();
  const [userID, setUserID] = useState("");
  const [isListOpen, setIsListOpen] = useState(false);
  const onValid = (data) => {
    console.log(data);
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
          <h4>Showmaker</h4>
          <h5>김허수</h5>
        </S.InfoId>

        {/* 아이디 추가 */}
        <S.Form onSubmit={handleSubmit(onValid)} autoComplete="off">
          <p>
            솔로랭크 ID 추가
            <em>
              <img src="images/ico-notice-gy.png" alt="tootip" />
            </em>
          </p>
          <input {...register("playerID")} type="text" placeholder="ID" />
          <Button
            type="submit"
            css={[
              buttonStyle.color.default,
              buttonStyle.size.y_8,
              buttonStyle.size.full,
              borderRadiusStyle[10],
              transitionStyle.background,
            ]}
          >
            추가
          </Button>
        </S.Form>
      </div>

      {/* 솔로랭크 정보 */}
      <ul className="table-item-col2">
        {isOpen ? (
          // 오픈 ui
          Array(8)
            .fill(1)
            .map(() => (
              <S.OpenList>
                {/* 아이디 */}
                <div className="table-col2">
                  <span>{`DK ShowMaker`}</span>
                  <button>
                    <img src="images/ic_close_bk_30.svg" alt="삭제" />
                  </button>
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
                <div className="table-col5">{`${parseInt(
                  (580 / 1042) * 100
                )}%`}</div>
                {/* 최근 */}
                <div className="table-col6">
                  <span>{`${30}경기`}</span>
                  <span>{`${15}승 ${15}패`}</span>
                </div>
                {/* 최근 승률 */}
                <div className="table-col7">{`${parseInt(
                  (580 / 1042) * 100
                )}%`}</div>
              </S.OpenList>
            ))
        ) : (
          // 클로즈 ui
          <S.CloseList></S.CloseList>
        )}
      </ul>

      {/* 최근 30일간 플레이한 챔피언 */}
      <ul className="table-item-col3">
        {/* 반복 */}
        <S.ChampList>
          {isOpen ? (
            <S.ChampInfo>
              <span>Most1</span>
              <Avatar size={34} src="images/champion/nunu.png" alt="누누" />
              <h6>블라디미르</h6>
              <p>
                {`${10}경기 ${5}승 ${5}패`}
                <em>{` ${(5 / 10) * 100}%`}</em>
              </p>
            </S.ChampInfo>
          ) : (
            <S.ChampInfo>
              <Avatar size={34} src="images/champion/nunu.png" alt="누누" />
              <p>{`${10}경기`}</p>
            </S.ChampInfo>
          )}
        </S.ChampList>
      </ul>

      <S.ToggleMenuButton>
        <Arrow direction={isOpen ? "T" : "B"}></Arrow>
      </S.ToggleMenuButton>
    </S.TableItemRow>
  );
};

export default MTPlayerHeader;
