import React, { useCallback } from "react";
import styled from "@emotion/styled";
import IconDel from "../../Ui/Icons/IconDel";
import { motion, AnimatePresence } from "framer-motion/dist/framer-motion";
import {
  borderRadiusStyle,
  buttonStyle,
  colors,
  inputStyle,
  scrollbarStyle,
  spacing,
  typoStyle,
} from "../../../Styles/ui";
import { useState } from "react";
import ModalPlayerListItem from "./ModalPlalyerListItem";
import { useDetectOutsideClick, useUpdateEffect } from "../../../Hooks";
import { useRef } from "react";
import { useEffect } from "react";

// transition variants
const dropdownVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

/** 추후 렌더링 상의 해야함 -> query change 될때마다 리렌더 되고 있음. */
const ModalPlayerSearch = ({ name, onChange }) => {
  const queryList = useRef(null);
  const [isListOpen, setIsListOpen] = useDetectOutsideClick(queryList, false);
  const [query, setQuery] = useState("");
  const [selectedObj, setSelectedObj] = useState(null);
  const [queryResult, setQueryResult] = useState(null);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setIsListOpen(true);
    // 쿼리로 api 검색
    // const result = await fetch('url', query)
    setQueryResult([
      {
        id: "Hide on bush",
        tier: "Master - 351LP",
      },
    ]);
  }, []);
  const handleChangeQuery = useCallback((e) => {
    const { value, name } = e.target;
    setQuery(value);
  }, []);
  const onClickReset = useCallback(() => {
    setQuery("");
    setSelectedObj(null);
  }, []);
  const handleSelect = useCallback((player) => {
    setSelectedObj(player);
    setIsListOpen(false);
  }, []);

  useUpdateEffect(() => {
    if (selectedObj && selectedObj.id) {
      setQuery(selectedObj.id);
    }
    if (onChange) {
      onChange({ name, player: selectedObj });
    }
  }, [selectedObj, onChange, name]);

  return (
    <Container onSubmit={handleSubmit} ref={queryList}>
      <SearchContainer>
        <InputContainer>
          <input
            type="text"
            name={name}
            value={query}
            onChange={handleChangeQuery}
            autoComplete="off"
            placeholder="솔로랭크 id를 입력해주세요"
            readOnly={selectedObj}
          />
          {/* 리셋버튼 */}
          {query && (
            <button onClick={onClickReset} type="reset">
              <IconDel />
            </button>
          )}
        </InputContainer>
        <SearchButton disabled={!query}>검색</SearchButton>
      </SearchContainer>

      {/* 결과창 */}
      <AnimatePresence>
        {isListOpen && (
          <QueryListContainer
            variants={dropdownVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {queryResult && queryResult.length > 0 ? (
              queryResult.map((player, index) => (
                <ModalPlayerListItem
                  onClick={() => handleSelect(player)}
                  key={"player" + index}
                  src={"images/champion/nunu.png"}
                  alt={player.id}
                  id={player.id}
                  tier={player.tier}
                />
              ))
            ) : (
              <QueryResult>검색결과가 없습니다.</QueryResult>
            )}
          </QueryListContainer>
        )}
      </AnimatePresence>
    </Container>
  );
};

const Container = styled.form`
  position: relative;
`;

const SearchContainer = styled.div`
  display: flex;
`;

const InputContainer = styled.div`
  ${spacing.marginR(1)};
  position: relative;
  display: flex;
  width: 277px;

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

const SearchButton = styled.button`
  flex: 1;
  ${buttonStyle.color.main};
  ${typoStyle.button_13};
  ${borderRadiusStyle[10]};
`;

const QueryListContainer = styled(motion.div)`
  position: absolute;
  z-index: 1;
  top: 36px;
  width: 100%;
  height: 310px;
  ${spacing.marginT(1)};
  ${spacing.paddingX(4)};
  ${spacing.paddingY(5)};
  ${borderRadiusStyle[10]};
  overflow: auto;
  ${scrollbarStyle.hidden};
  background-color: ${colors.bg_select};
`;

const QueryResult = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  ${typoStyle.label};
`;

export default ModalPlayerSearch;
