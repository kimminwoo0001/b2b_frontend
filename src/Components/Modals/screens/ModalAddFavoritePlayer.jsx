/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { useState, useEffect, useCallback, useRef } from "react";
import ReactModal from "react-modal";
// lib
import { getPositon } from "../../../lib/getPosition";
import { debounce } from "../../../lib/debounce";
// hook
import { useDetectOutsideClick } from "../../../Hooks";
// component
import IconDel from "../../Ui/Icons/IconDel";
import ModalLocalPlayerSearch from "../components/ModalLocalPlayerSearch";
import ModalPlayerSearch from "../components/ModalPlayerSearch";
import PositionCheckList from "../../Ui/PositionCheckList";
// style
import styled from "@emotion/styled";
import {
  colors,
  dropdownStyle,
  inputStyle,
  modalStyle,
  spacing,
  typoStyle,
} from "../../../Styles/ui";
import * as layout from "../styled/styled_modal_layout";

import DropdownContainer from "../../../Components/Ui/DropDown/DropdownContainer";
import DropdownLabel from "../../../Components/Ui/DropDown/DropdownLabel";
import DropdownList from "../../../Components/Ui/DropDown/DropdownList";
import DropdownItem from "../../../Components/Ui/DropDown/DropdownItem";

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

const ModalAddFavoritePlayer = ({ onSubmit, onClose }) => {
  // hook
  const searchInputRef = useRef(null);
  // state - input
  const [nickname, setNickname] = useState("");
  const [name, setName] = useState("");
  const [position, setPosition] = useState({
    all: false,
    top: false,
    jng: false,
    mid: false,
    bot: false,
    sup: false,
  });

  // state - common
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [isLocalSearchList, setIsLocalSearchList] = useDetectOutsideClick(
    searchInputRef,
    false
  );

  // event callback
  const handleChangeInputs = (e) => {
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
  const handleClickClear = useCallback(() => {
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
  const handleSelectSoloRankId = useCallback((data) => {
    console.log(data);
  }, []);
  // general function
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

  /* effect hook */
  // nickname -> search db by nickname
  useEffect(() => {
    !selectedPlayer && searchQuery(nickname);
  }, [nickname]);

  //  selected -> nickname, name, position
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

  return (
    <ReactModal isOpen style={modalStyle.reactModal} onRequestClose={onClose}>
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
                onClear={handleClickClear}
                options={playerList}
                name="nickname"
                onSelect={handleSelectPlayer}
                onChange={handleChangeInputs}
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
                  onChange={handleChangeInputs}
                  autoComplete="off"
                />
              </InputContainer>
            </fieldset>

            <FlexContainer>
              <fieldset>
                <legend>리그</legend>
                <DropdownContainer label="champion" onChange={(e) => {}}>
                  {/* 드롭다운 라벨*/}
                  <DropdownLabel
                    css={[
                      dropdownStyle.select_head,
                      typoStyle.select,
                      { color: colors.info },
                    ]}
                  >
                    리그를 선택해주세요
                  </DropdownLabel>
                  {/* 드롭다운 리스트 */}
                  <CustomDropDownList>
                    <DropdownItem
                      css={[dropdownStyle.select_item]}
                      value={"메뉴1"}
                      label={"menu1"}
                    >
                      메뉴1
                    </DropdownItem>
                    <DropdownItem
                      css={[dropdownStyle.select_item]}
                      value={"메뉴2"}
                    >
                      메뉴2
                    </DropdownItem>
                    <DropdownItem
                      css={[dropdownStyle.select_item]}
                      value={"메뉴3"}
                    >
                      메뉴3
                    </DropdownItem>
                  </CustomDropDownList>
                </DropdownContainer>
              </fieldset>

              <fieldset>
                <legend>팀</legend>
                <DropdownContainer label="champion" onChange={(e) => {}}>
                  {/* 드롭다운 라벨*/}
                  <DropdownLabel
                    css={[
                      dropdownStyle.select_head,
                      typoStyle.select,
                      { color: colors.info },
                    ]}
                  >
                    팀을 선택해주세요
                  </DropdownLabel>
                  {/* 드롭다운 리스트 */}
                  <CustomDropDownList>
                    <DropdownItem
                      css={[dropdownStyle.select_item]}
                      value={"메뉴1"}
                      label={"menu1"}
                    >
                      메뉴1
                    </DropdownItem>
                    <DropdownItem
                      css={[dropdownStyle.select_item]}
                      value={"메뉴2"}
                    >
                      메뉴2
                    </DropdownItem>
                    <DropdownItem
                      css={[dropdownStyle.select_item]}
                      value={"메뉴3"}
                    >
                      메뉴3
                    </DropdownItem>
                  </CustomDropDownList>
                </DropdownContainer>
              </fieldset>
            </FlexContainer>

            <fieldset>
              <legend>포지션</legend>
              <PositionCheckList
                multi={false}
                position={position}
                setPosition={setPosition}
                defaultColor={colors.bg_checkbox}
                hoverColor={colors.bg_select}
              />
            </fieldset>
          </Form>

          {/* 솔로랭크 아이디 */}
          <SearchContainer>
            <ModalPlayerSearch name="solo1" onSelect={handleSelectSoloRankId} />
            <ModalPlayerSearch name="solo2" onSelect={handleSelectSoloRankId} />
            <ModalPlayerSearch name="solo3" onSelect={handleSelectSoloRankId} />
            <ModalPlayerSearch name="solo4" onSelect={handleSelectSoloRankId} />
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

/* style */
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
  > div {
    ${spacing.marginB(1)}
  }
`;

const FlexContainer = styled.div`
  display: flex;
  margin: 0 -4px;

  fieldset {
    flex: 1;
    padding: 0 5px;
  }
`;

// 드롭다운 커스텀
const CustomDropDownList = styled(DropdownList)`
  ul {
    padding: 10px;
  }

  li {
    border-radius: 999px;
  }
`;

export default ModalAddFavoritePlayer;
