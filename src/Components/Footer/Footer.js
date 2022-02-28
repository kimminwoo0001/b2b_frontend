import React, { Fragment, useState } from "react";
/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled/macro";
import PolicyModal from "./PolicyModal";
import TermsModal from "./TermsModal";

function Footer() {
  // 약관 모달창 상태 값
  const [openModal, setOpenModal] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  return (
    <Fragment>
      <PolicyModal setOpenModal={setOpenModal} openModal={openModal} />
      <TermsModal setOpenModal={setOpenModal2} openModal={openModal2} />
      <FooterContainer>
        <PolicyAndTerms>
          {/* 버튼 누를 떄 상태를 true로 변경해주면서 모달창을 띄움 */}
          <button onClick={() => setOpenModal(true)} type="button">
            Privacy Policy
          </button>
          <p>|</p>
          {/* 버튼 누를 떄 상태를 true로 변경해주면서 모달창을 띄움 */}
          <button onClick={() => setOpenModal2(true)} type="button">
            Terms of Use
          </button>
        </PolicyAndTerms>
        <FooterLabel>
          2021 Team Snowball CORP. teamsnowball@teamsnowball.com <br />
          TSB Analytics is hosted by Team Snowball. TSB Analytics isn’t endorsed
          by Riot Games and doesn’t reflect the views or opinions of Riot Games
          or anyone officially involved in producing or managing League of
          Legends
          <br />
          League of Legends and Riot Games are trademarks or registered
          trademarks of Riot Games, Inc. League of Legends © Riot Games, Inc.
        </FooterLabel>
      </FooterContainer>
    </Fragment>
  );
}

export default Footer;

const PolicyAndTerms = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  color: #433f4e;
  > p {
    margin: 0 10px;
  }
  > button {
    padding: 0;
    font-family: Poppins;
    font-size: 12px;
    letter-spacing: -0.6px;
    text-align: left;
    color: rgb(130, 127, 140);
  }
`;

const FooterContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: auto;
  width: 100%;
  background-color: rgb(35, 33, 42);
  border-top: 1px solid rgb(72, 70, 85);
  padding: 26px 24px;
`;

const FooterLabel = styled.div`
  font-family: Poppins;
  font-size: 12px;
  letter-spacing: -0.6px;
  line-height: 1.3;
  text-align: left;
  color: rgb(130, 127, 140);
`;
