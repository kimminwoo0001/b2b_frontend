import React, { useState, useEffect } from "react";
import { MenuNum, InitailizeState } from "../../redux/modules/filtervalue";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { SelectorInitailizeState } from "../../redux/modules/selectorvalue";
import { InitializeGameState } from "../../redux/modules/gamevalue";
import styled, { css } from "styled-components";
import { CompareModal, CopyFvInit, SetCopyFilters, SetOpenFilterModal } from "../../redux/modules/copyvalue";

const useTitle = (initialTitle) => {
  const [title, setTitle] = useState(initialTitle);
  const updateTitle = () => {
    const htmlTitle = document.querySelector("title");
    htmlTitle.innerText = title;
  }
  useEffect(updateTitle, [title]);
  return setTitle;
}

const SideBarItem = ({ menu, idx }) => {
  const dispatch = useDispatch();
  let history = useHistory();
  const changeTitle = useTitle(null);
  const filters = useSelector((state) => state.FilterReducer);


  return (
    <MenuWrapper
      onClick={() => {
        changeTitle(`${menu.name} - NUNU.GG`)
        dispatch(SelectorInitailizeState());
        dispatch(InitializeGameState());
        // dispatch(InitailizeState());
        if (menu.modal) {
          dispatch(CopyFvInit());
          dispatch(SetOpenFilterModal(menu.path))
          dispatch(CompareModal(true));
        } else {
          dispatch(InitailizeState());
          dispatch(MenuNum(menu.idx));
          history.push(menu.path);
        }
      }}
      changeColor={menu.changeColor}
    >
      <MenuImg src={menu.image} alt="menu" />
      <div className="Name">{menu.name}</div>
      {menu.version && menu.version === "beta" && (
        <Beta src="Images/icon_beta.png" alt="beta" />
      )}
    </MenuWrapper>
  );
};

export default SideBarItem;

const MenuWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 180px;
  height: 42px;
  text-align: center;
  margin: 13px 0 12px;
  padding: 9px 9px 9px 14px;
  cursor: pointer;
  .Name {
    font-family: SpoqaHanSansNeo;
    font-size: 14px;
    font-weight: bold;
    line-height: 24px;
    letter-spacing: normal;
    text-align: left;
    color: #fff;
  }
  :hover {
    background-color: ${(props) =>
    props.changeColor ? "#5942ba" : "rgba(255, 255, 255, 0.1)"};
    margin: 13px 0 12px;
    padding: 9px 9px 9px 14px;
    border-radius: 16px;
  }

  ${(props) =>
    props.changeColor &&
    css`
      width: 180px;
      height: 42px;
      margin: 13px 0 12px 0;
      padding: 9px 9px 9px 14px;
      border-radius: 16px;
      background-color: #5942ba;
    `}
`;

const MenuImg = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 10px;
  object-fit: contain;
  vertical-align: middle;
`;

const Beta = styled.img`
  margin-left: 3px;
  width: 30px;
  height: 13px;
`;