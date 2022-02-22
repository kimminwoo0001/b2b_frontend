/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled";
import { useState } from "react";
import ReactModal from "react-modal";
import ModalLocalPlayerSearch from "../components/ModalLocalPlayerSearch";
import { getPositon } from "../../../lib/getPosition";
import {
  colors,
  inputStyle,
  modalStyle,
  spacing,
  typoStyle,
} from "../../../Styles/ui";
import IconDel from "../../Ui/Icons/IconDel";
import PositionCheckList from "../../Ui/PositionCheckList";
import ModalPlayerSearch from "../components/ModalPlayerSearch";

import * as layout from "../styled/styled_modal_layout";
import { useCallback } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { debounce } from "../../../lib/debounce";
import { useDetectOutsideClick } from "../../../Hooks";

// 샘플데이터
const playerList = [
  {
    logo: "images/champion/nunu.png",
    team: "t1",
    pos: 1,
    id: "Faker",
    name: "이상혁",
  },
  {
    team: "t2",
    logo: "images/champion/teemo.png",
    id: "Faker2",
    pos: 2,
    name: "이상혁2",
  },
  {
    team: "t3",
    logo: "images/champion/teemo.png",
    pos: 3,
    id: "Faker3",
    name: "이상혁3",
  },
  {
    team: "t4",
    logo: "images/champion/teemo.png",
    pos: 4,
    id: "Faker4",
    name: "이상혁4",
  },
];

//  styled component
const S = {
  layout,
};

const ModalAddTeamPlayer = ({ onSubmit, onClose }) => {
  // useDetect ouside click
  const searchInputRef = useRef(null);

  // state
  const [nickname, setNickname] = useState("");
  const [name, setName] = useState("");
  const [position, setPosition] = useState({
    all: false,
    top: false,
    jug: false,
    mid: false,
    bot: false,
    sup: false,
  });
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [isLocalSearchList, setIsLocalSearchList] = useDetectOutsideClick(
    searchInputRef,
    false
  );

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "nickname":
        setNickname(value);
        break;

      default:
        break;
    }
  };
  const handleSelectPlayer = useCallback((playerObj) => {
    setSelectedPlayer(playerObj);
  }, []);
  const handleClear = useCallback(() => {
    setSelectedPlayer("");
    setNickname("");
    setName("");
    setPosition((prev) => {
      const newPosition = { ...prev };
      for (let key in newPosition) {
        newPosition[key] = false;
      }
      return newPosition;
    });
  }, []);
  const searchQuery = useCallback(
    debounce((query) => {
      if (!query) setIsLocalSearchList(false);
      else {
        setIsLocalSearchList(true);
      }
      // 쿼리 검색
    }, 500),
    []
  );

  // 닉네임이 변경 될때 마다 선수 데이터베이스에서 검색
  useEffect(() => {
    !selectedPlayer && searchQuery(nickname);
  }, [nickname]);

  //  선수 결정시, [닉네임, 선수명, 포지션] 결정
  useEffect(() => {
    if (!selectedPlayer) return;
    setIsLocalSearchList(false);
    setNickname(selectedPlayer.id);
    setName(selectedPlayer.name);
    setPosition((prev) => ({
      ...prev,
      [getPositon(selectedPlayer.pos)]: true,
    }));
  }, [selectedPlayer]);

  const handleChangePlayer = useCallback((data) => {
    const { name, player } = data;
  }, []);

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
              <ModalLocalPlayerSearch
                ref={searchInputRef}
                value={nickname}
                isOpen={isLocalSearchList}
                onClear={handleClear}
                options={playerList}
                name="nickname"
                onSelect={handleSelectPlayer}
                onChange={handleInputChange}
                readOnly={selectedPlayer}
              />
            </fieldset>

            <fieldset>
              <legend>선수명</legend>
              <InputContainer>
                <input
                  type="text"
                  css={[inputStyle.color.main, inputStyle.size[13]]}
                  name="name"
                  value={name}
                  readOnly={selectedPlayer}
                  onChange={handleInputChange}
                  autoComplete="off"
                />
              </InputContainer>
            </fieldset>

            <fieldset>
              <legend>포지션</legend>
              <PositionCheckList
                all={false}
                position={position}
                setPosition={setPosition}
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
