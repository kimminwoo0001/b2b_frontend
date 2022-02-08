/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled";
import { typoStyle } from "../../Styles/ui";

const Button = ({ children, ...props }) => {
  return (
    <SButton css={typoStyle.button} {...props}>
      {children}
    </SButton>
  );
};

const SButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Poppins;
  font-size: 14px;
  font-weight: bold;
  border-radius: ${(props) => props.theme.borderRadius};
  width: 100%;
`;

export default Button;
