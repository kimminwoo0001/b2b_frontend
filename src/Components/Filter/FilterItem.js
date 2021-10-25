import React, { memo, useState } from 'react';
import styled, { css } from 'styled-components';
import { useTranslation } from "react-i18next";


const FilterItem = memo(({ title, isHaveFilter, multiFilter }) => {
  const { t } = useTranslation();
  const [viewSwitch, setViewSwitch] = useState(true);

  const changeSwitch = () => {
    setViewSwitch(!viewSwitch);
  }

  return (
    <>
      <Item>
        <Header>
          {console.log(title, viewSwitch, isHaveFilter)}
          {viewSwitch && isHaveFilter ?
            <img src="Images/btn_view_detail.png"
              srcset="Images/btn_view_detail@2x.png 2x,
      Images/btn_view_detail@3x.png 3x"
              onClick={() => changeSwitch()}
              className="up"
              alt="열기" /> :
            <img src="Images/btn_view_detail.png"
              srcset="Images/btn_view_detail@2x.png 2x,
      Images/btn_view_detail@3x.png 3x"
              className="down down-opacity"
              onClick={() => changeSwitch()}
              alt="닫기" />
          }
          <span className={(!viewSwitch || !isHaveFilter) && "down-opacity"}>{title}</span>
        </Header>
        <div className={viewSwitch ? "open-filter-item" : "close-filter-item"}>
          {multiFilter}
        </div>
      </Item>
    </>
  );
});

export default FilterItem;

const Header = styled.div`
    width: 210px;
    margin: 0 0 4px;
    span {
      width: 100%;
      height: 22px;
      margin: 2px 0 0 5px;
      font-family: SpoqaHanSansNeo;
      font-size: 18px;
      font-weight: bold;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.22;
      letter-spacing: normal;
      text-align: left;
      color: #fff;
    }

    .up {
      width: 24px;
      height: 24px;
      margin: 0 5px 0 0;
      object-fit: contain;
      vertical-align: middle;
      cursor: pointer;
    }

    .down {
      transform:rotate(180deg);
      width: 24px;
      height: 24px;
      margin: 0 5px 0 0;
      object-fit: contain;
      vertical-align: middle;
      cursor: pointer;
    }

    .down-opacity {
      opacity: 0.3;
    }
`;

const Item = styled.div`
  width: 250px;
  margin: 0 0 10px;
  padding: 20px;
  border-radius: 35px;
  background-color: #2f2d38;

  .open-filter-item {
    display:block;
  }
  
  .close-filter-item {
    display:none;
  }
`;