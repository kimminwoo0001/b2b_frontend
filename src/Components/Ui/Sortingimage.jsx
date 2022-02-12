/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled";
import { typoStyle } from "../../Styles/ui";

const Sortingimage = ({ requestSorts, key }) => {
  return (
    <SSortingimage
      onClick={() => {
        requestSorts(key);
      }}
    >
      <img src="Images/btn-sort-up.svg" alt="up" />
      <img src="Images/btn-sort-down.svg" alt="down" />
    </SSortingimage>
  );
};

const SSortingimage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 4px;
  cursor: pointer;
`;

export default Sortingimage;
