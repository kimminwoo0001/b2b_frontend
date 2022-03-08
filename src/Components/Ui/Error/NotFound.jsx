import React from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { spacing, typoStyle } from "../../../Styles/ui";

/**
 * ### 기본적인 컴포넌트 단의 error state를 렌더하기 위한 컴포넌트 입니다.
 */

const NotFound = ({ text, props }) => {
  return (
    <Container {...props}>
      <ImgContainer>
        <img src="images/icon/icon_error_page.svg" alt="NotFound" />
      </ImgContainer>
      <TextContainer>{text}</TextContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const ImgContainer = styled.div`
  ${spacing.marginB(4)}
`;
const TextContainer = styled.div`
  ${typoStyle.contents_title}
`;

NotFound.propTypes = {
  /**
   * NotFound 아이콘 아래 삽입할 메시지입니다
   */
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
};

NotFound.default = {
  text: "낫파운드",
};

export default NotFound;
