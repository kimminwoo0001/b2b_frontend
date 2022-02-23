/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled/macro";
import theme from "../../../../Styles/Theme";
import { colors } from "../../../../Styles/ui";

const MatchBox = ({ text }) => {
  return <SMatchBox>{text}</SMatchBox>;
};

export default MatchBox;

const SMatchBox = styled.div`
  width: 125px;
  height: 25px;
  margin: 3px 10px;
  padding: 3px 12px;
  border-radius: 20px;
  background-color: ${colors.bg_hover};

  font-family: SpoqaHanSansNeo;
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.55;
  letter-spacing: normal;
  text-align: left;
  color: ${colors.text};
`;
