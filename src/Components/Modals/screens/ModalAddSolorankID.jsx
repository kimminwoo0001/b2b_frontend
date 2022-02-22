import React, { useState } from "react";
import styled from "@emotion/styled";
import ReactModal from "react-modal";
import { useForm } from "react-hook-form";

// ui 컴포넌트 & 스타일
import Avarta from "../../Ui/Avatar";
import IconDel from "../../Ui/Icons/IconDel";
import {
  borderRadiusStyle,
  buttonStyle,
  colors,
  inputStyle,
  modalStyle,
  scrollbarStyle,
  spacing,
  typoStyle,
} from "../../../Styles/ui";

// 가상비동기 테스트 코드
import { delay } from "../../../lib/delay";
import * as layout from "../styled/styled_modal_layout";
import ModalPlayerSearch from "../components/ModalPlayerSearch";
import ModalPlayerList from "../components/ModalPlalyerListItem";

const S = {
  layout,
};

const ModalAddSolorankID = ({ onSubmit, onClose }) => {
  // 검색 관련
  const { handleSubmit, register } = useForm();
  const [isOpenList, setIsOpenList] = useState(false);
  const [queryResult, setQueryResult] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const onValid = async (data, e) => {
    const { query } = data;
    console.log(data);
    if (!query) return;
    setIsOpenList(true);

    // query 검색
    try {
      const result = await delay(500).then(() => "abc");
      setQueryResult([...queryResult, result]);
    } catch (error) {
      console.log(error);
    }
  };
  const onClickReset = () => {};
  const onClickListItem = () => {};
  const onClickSubmit = () => {};

  return (
    <ReactModal style={modalStyle} isOpen onRequestClose={onClose}>
      <S.layout.Container>
        {/* 모달창 닫기버튼 */}
        <S.layout.CloseButton onClick={onClose}>
          <IconDel color="black" />
        </S.layout.CloseButton>

        {/* 헤더부분 */}
        <S.layout.Header>
          <h3>솔로랭크 ID를 추가해주세요</h3>
        </S.layout.Header>

        {/* 입력창 메인 */}
        <S.layout.Main>
          <div>
            <Form onSubmit={handleSubmit(onValid)}>
              <fieldset>
                <legend>솔로랭크 ID</legend>
                <ModalPlayerSearch register={register} name={"query"} />
              </fieldset>
            </Form>

            {/* 리스트 */}
            {isOpenList && (
              <PlayerList>
                {/* 쿼리 결과에 따라서 오픈 */}
                {queryResult && queryResult.length > 0 ? (
                  queryResult.map((player, index) => (
                    <ModalPlayerList
                      key={"player" + index}
                      src={"images/champion/nunu.png"}
                      alt={"Hide on bush"}
                      id={"Hide on bush"}
                      tier={"마스터 - 519LP"}
                    />
                  ))
                ) : (
                  <PlayerResult>검색결과가 없습니다.</PlayerResult>
                )}
              </PlayerList>
            )}
          </div>
        </S.layout.Main>

        {/* 하단 submit 버튼 */}
        <S.layout.Footer>
          <S.layout.SubmitButton disabled={!selectedPlayer}>
            솔로랭크 ID 추가
          </S.layout.SubmitButton>
        </S.layout.Footer>
      </S.layout.Container>
    </ReactModal>
  );
};

// 검색부
const Form = styled.form`
  legend {
    ${spacing.marginB(2)};
    ${typoStyle.contents};
  }
`;

// 검색결과 리스트
const PlayerList = styled.ul`
  height: 310px;
  ${spacing.marginT(1)};
  ${spacing.paddingX(4)};
  ${spacing.paddingY(5)};
  ${borderRadiusStyle[10]};
  overflow: auto;
  ${scrollbarStyle.hidden};
  background-color: ${colors.bg_select};
`;

const PlayerResult = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  ${typoStyle.label};
`;

export default ModalAddSolorankID;
