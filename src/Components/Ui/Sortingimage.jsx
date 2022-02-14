/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled";
import { typoStyle } from "../../Styles/ui";

const Sortingimage = ({ sortConfig, setSortConfig, key }) => {
  const requestSorts = (key) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return (
    <SSortingimage
      onClick={() => {
        requestSorts(key);
      }}
    >
      <img src="Images/ico-sorting-up.png" alt="up" />
      <img src="Images/ico-sorting-down.png" alt="down" />
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
