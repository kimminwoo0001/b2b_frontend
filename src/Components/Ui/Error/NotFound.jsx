/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled";
import { spacing, typoStyle } from "../../../Styles/ui";

const NotFound = ({ text, ...props }) => {
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

export default NotFound;
