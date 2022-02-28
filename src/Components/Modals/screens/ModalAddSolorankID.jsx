import React, { useState } from "react";
import styled from "@emotion/styled";
import ReactModal from "react-modal";

// ui 컴포넌트 & 스타일
import { modalStyle, spacing, typoStyle } from "../../../Styles/ui";
import ModalPlayerSearch from "../components/ModalPlayerSearch";
import IconDel from "../../Ui/Icons/IconDel";

import * as layout from "../styled/styled_modal_layout";

const S = {
  layout,
};

const ModalAddSolorankID = ({ onSubmit, onClose }) => {
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const handleSelectSoloRankId = (data) => {
    setSelectedPlayer(data);
  };

  return (
    <ReactModal style={modalStyle.reactModal} isOpen onRequestClose={onClose}>
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
          <Form>
            <fieldset>
              <legend>솔로랭크 ID</legend>
              <ModalPlayerSearch
                name="solo"
                onSelect={handleSelectSoloRankId}
              />
            </fieldset>
          </Form>
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

export default ModalAddSolorankID;
