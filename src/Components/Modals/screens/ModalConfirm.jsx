/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import styled from "@emotion/styled";
import ReactModal from "react-modal";
import {
  borderRadiusStyle,
  modalStyle,
  spacing,
  typoStyle,
} from "../../../Styles/ui";
import * as S from "../styled/styled_modal_layout";
const ModalConfirm = ({ title, text, subtext, onCancel, onSubmit }) => {
  return (
    <ReactModal style={modalStyle.reactModal} isOpen onRequestClose={onCancel}>
      {title && (
        <S.Header>
          <h2>{title}</h2>
        </S.Header>
      )}
      <Main>
        {text && <p className="text__main">{text}</p>}
        {subtext && <p className="text__sub">{subtext}</p>}
        <ButtonContainer>
          <S.CancelButton onClick={onCancel}>취소</S.CancelButton>
          <S.SubmitButton onClick={onSubmit}>확인</S.SubmitButton>
        </ButtonContainer>
      </Main>
    </ReactModal>
  );
};

const Main = styled.div`
  ${modalStyle.size[500]};
  ${borderRadiusStyle[20]};
  ${spacing.paddingX(10)};
  ${spacing.paddingY(7)};

  .text__main {
    text-align: center;
    ${typoStyle.body};
  }
  .text__sub {
    ${spacing.marginT(3)};
    text-align: center;
    ${typoStyle.info};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  ${spacing.marginT(7)}

  button:not(:only-of-type):first-of-type {
    margin-right: 5px;
  }
`;

export default ModalConfirm;
