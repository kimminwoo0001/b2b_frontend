/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled";
import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ReactModal from "react-modal";
import {
  borderRadiusStyle,
  colors,
  inputStyle,
  modalStyle,
  scrollbarStyle,
  spacing,
  typoStyle,
} from "../../../Styles/ui";
import IconDel from "../../Ui/Icons/IconDel";
import PositionCheckList from "../../Ui/PositionCheckList";
import ModalPlayerSearch from "../components/ModalPlayerSearch";

import * as layout from "../styled/styled_modal_layout";

const S = {
  layout,
};

const ModalAddTeamPlayer = ({ onSubmit, onClose }) => {
  // 선수 닉네임 검색
  const [nickName, setNickName] = useState("");
  const [name, setName] = useState("");

  const handleChangeInput = (e) => {
    const { value, name } = e.target;
    switch (name) {
      case "nickname":
        setNickName(value);
        break;
      case "name":
        setName(value);
        break;

      default:
        break;
    }
    console.log(value, name);
    // db 조회
  };
  const onClickReset = () => {
    setNickName("");
    setName("");
  };
  const handleChangePosition = (position) => {
    const { top, mid, jun, bot, sup } = position;
    console.log(top, mid, jun, bot, sup);
  };
  const handleChangePlayer = (data) => {
    const { name, player } = data;
    console.log(name, player);
  };

  return (
    <ReactModal isOpen style={modalStyle}>
      <S.layout.Container>
        {/* 모달창 닫기버튼 */}
        <S.layout.CloseButton onClick={onClose}>
          <IconDel color="black" />
        </S.layout.CloseButton>

        {/* 헤더부분 */}
        <S.layout.Header>
          <h3>선수를 등록해주세요</h3>
        </S.layout.Header>

        {/* 입력창 메인 */}
        <S.layout.Main>
          <Form>
            <fieldset>
              <legend>선수닉네임</legend>
              <InputContainer>
                <input
                  type="text"
                  css={[inputStyle.color.main, inputStyle.size[13]]}
                  name="nickname"
                  value={nickName}
                  onChange={handleChangeInput}
                  placeholder="선수 닉네임을 입력해주세요"
                />
                {nickName && (
                  <button type="reset" onClick={onClickReset}>
                    <IconDel />
                  </button>
                )}
              </InputContainer>
            </fieldset>

            <fieldset>
              <legend>선수명</legend>
              <InputContainer>
                <input
                  type="text"
                  css={[inputStyle.color.main, inputStyle.size[13]]}
                  name="name"
                  value={name}
                  onChange={handleChangeInput}
                />
              </InputContainer>
            </fieldset>

            <fieldset>
              <legend>포지션</legend>
              <PositionCheckList
                all={false}
                onChange={handleChangePosition}
                defaultColor={colors.bg_checkbox}
                hoverColor={colors.bg_select}
              />
            </fieldset>
          </Form>

          <SearchContainer>
            <ModalPlayerSearch name="solo1" onChange={handleChangePlayer} />
            <ModalPlayerSearch name="solo2" onChange={handleChangePlayer} />
            <ModalPlayerSearch name="solo3" onChange={handleChangePlayer} />
            <ModalPlayerSearch name="solo4" onChange={handleChangePlayer} />
          </SearchContainer>
        </S.layout.Main>

        {/* 하단 submit 버튼 */}
        <S.layout.Footer>
          <S.layout.SubmitButton>선수등록</S.layout.SubmitButton>
        </S.layout.Footer>
      </S.layout.Container>
    </ReactModal>
  );
};

const Form = styled.form`
  ${spacing.marginB(7)}
  fieldset:not(:last-of-type) {
    ${spacing.marginB(7)};
  }
  legend {
    ${typoStyle.contents};
    ${spacing.marginB(2)};
  }
`;

const InputContainer = styled.div`
  position: relative;
  display: flex;

  input {
    ${inputStyle.size[13]};
    ${inputStyle.color.main};
    ${spacing.paddingR(7)};
  }

  button {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translate(0, -50%);
    padding: 0;

    width: 18px;
    height: 18px;

    svg {
      width: 100%;
      height: 100%;
    }
  }
`;

const SearchContainer = styled.div`
  > form {
    ${spacing.marginB(1)}
  }
`;

export default ModalAddTeamPlayer;
