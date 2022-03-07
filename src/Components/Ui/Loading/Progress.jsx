/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled";

import { colors, spacing, typoStyle } from "../../../Styles/ui";

const Progress = ({ text, ...props }) => {
  return (
    <Container {...props}>
      <Logo>
        <img src="./images/tsb/icon_tsb.svg" alt="" />
      </Logo>
      <div>
        <ProgressContainer>
          <ProgressBar />
        </ProgressContainer>
        <TextContainer>{text}</TextContainer>
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
`;
const Logo = styled.div`
  width: 30px;
  height: 30px img {
    width: 100%;
    height: 100%;
  }
`;

const ProgressContainer = styled.div`
  width: 266px;
  height: 4px;
  ${spacing.marginB(1)}
  background-color: ${colors.btn_nor};
  border-radius: 999px;
  overflow: hidden;
`;

const ProgressBar = styled.div`
  position: relative;
  width: 65px;
  height: 100%;
  border-radius: 999px;
  background-color: ${colors.point};
  animation: loading 2s linear infinite;

  @keyframes loading {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(500%);
    }
  }
`;

const TextContainer = styled.div`
  ${typoStyle.select}
  text-align: center;
`;

export default Progress;
