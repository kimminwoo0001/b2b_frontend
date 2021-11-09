import React from "react";
import { MenuNum, InitailizeState } from "../../redux/modules/filtervalue";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { SelectorInitailizeState } from "../../redux/modules/selectorvalue";
import styled, { css } from "styled-components";

const SideBarItem = ({ menu, idx }) => {
  const dispatch = useDispatch();
  let history = useHistory();
  const marginTop = menu.marginTop ? 9 : 0;
  const marginBottom = menu.marginBottom ? 9 : 0;

  return (
    <MenuWrapper
      onClick={() => {
        history.push(menu.path);
        dispatch(InitailizeState());
        dispatch(SelectorInitailizeState());
        dispatch(MenuNum(menu.idx));
      }}
      changeColor={menu.changeColor}
      marginTop={marginTop}
      marginBottom={marginBottom}
    >
      <img src={menu.image} alt="menu"></img>
      <div className="Name">{menu.name}</div>
    </MenuWrapper>
  )
}

export default SideBarItem;

const MenuWrapper = styled.div`
  display: flex;
  width: 147px;
  height: 24px;
  margin: ${props => 31 - props.marginTop}px 9px ${props => 30 - props.marginBottom}px 14px;
  padding: 0 12px 0 0;
  cursor: pointer;
  .Name {
    width: 101px;
    height: 19px;
    font-family: SpoqaHanSansNeo;
    font-size: 15px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 24px;
    letter-spacing: normal;
    text-align: left;
    color: #fff;
  }
  img {
    width: 24px;
    height: 24px;
    margin-right: 12px;
    object-fit: contain;
    vertical-align: middle;
  }
  ${(props) =>
    props.changeColor &&
    css`
      width: 170px;
      height: 42px;
      margin: 13px 0 12px 0;
      padding: 9px 9px 9px 14px;
      border-radius: 16px;
      background-color: #5942ba;
    `
  }
`;