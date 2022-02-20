/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled/macro";

const ItemBox = ({ label, logo, text }) => {
  return (
    <SItemBox chkText={text ? true : false}>
      <div className="header">{label}</div>
      <div className="content">
        {logo && <img className="logo" src={`${logo}`} alt="logo"></img>}
        {text && <label className="text">{text}</label>}
      </div>
    </SItemBox>
  );
};

export default ItemBox;

const SItemBox = styled.div`
  .header {
    height: 21px;
    margin: 0 0 0 0;
    font-family: SpoqaHanSansNeo;
    font-size: 16px;
    font-weight: 300;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
    color: ${({ theme }) => theme.colors.text};
  }

  .content {
    width: 100%;
    text-align: center;
    .logo {
      width: 24px;
      height: 24px;
      margin: 0 ${(props) => (props.chkText ? 6 : 0)}px 0 0;
      object-fit: contain;
      vertical-align: top;
    }

    .text {
      height: 22px;
      margin: 2px 0 0 0px;
      font-family: SpoqaHanSansNeo;
      font-size: 18px;
      font-weight: bold;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.39;
      letter-spacing: normal;
      text-align: center;
      color: ${({ theme }) => theme.colors.text};
    }
  }
`;
