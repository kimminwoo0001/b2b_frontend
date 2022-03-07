import React from "react";
import styled from "@emotion/styled/macro";
import {
  colors,
  scrollbarStyle,
  spacing,
  transitionStyle,
} from "../../../Styles/ui";

// 4. 간격
const 간격 = `${2}px`;

const TestScorll = () => {
  return (
    <div>
      <Box>
        <Contents>저는 내용물 입니다.</Contents>
      </Box>
    </div>
  );
};

const Box = styled.div`
  width: 500px;
  height: 500px;
  padding: 20px;
  background-color: ${colors.bg_checkbox};
  ${transitionStyle.background}

  &:hover {
    background-color: ${colors.point};
  }

  /**  scroll code **/
  /* ${scrollbarStyle.scroll_8} */
  ${scrollbarStyle.hidden}
`;

const Contents = styled.div`
  height: 1000px;
  width: 1200px;
  background: tomato;
  border-radius: 20px;
`;

export default TestScorll;
