/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import styled from "@emotion/styled";

import { typoStyle } from "../../Styles/ui";
import DropdownList from "../../Components/Ui/DropDown/DropdownList";
import DropdownItem from "../../Components/Ui/DropDown/DropdownItem";

const UiTest = () => {
  return (
    <Container>
      <h1>드롭다운 메뉴</h1>
      <DropdownList label="챔피언 선택" onChange={() => {}}>
        <DropdownItem value={"메뉴1"}>메뉴1</DropdownItem>
        <DropdownItem value={"메뉴2"}>메뉴2</DropdownItem>
        <DropdownItem value={"메뉴3"}>메뉴3</DropdownItem>
      </DropdownList>
    </Container>
  );
};

const Container = styled.article`
  height: 100vh;
  padding: 30px;
  background-color: ${({ theme }) => theme.colors.bg_light};
  ${typoStyle.body}
`;

export default UiTest;
