import React from "react";
import styled from "@emotion/styled/macro";
import Versus from "../../../Components/Ui/Versus";
import { colors, spacing, typoStyle } from "../../../Styles/ui";
import Arrow from "../../../Components/Ui/Arrow";

const Comp1 = () => {
  return (
    <>
      {/* 텍스트 테이블 */}
      <TextTable>
        {/* 선수명 */}
        <thead>
          <tr>
            <th>Canyon</th>
            <th></th>
            <th>
              <Versus size={18} />
            </th>
            <th></th>
            <th>Owner</th>
          </tr>
        </thead>

        {/* 선수비교 데이터 */}
        <tbody>
          {/* 각 행 */}
          <tr>
            <td>23.64%</td>
            <td>
              <Arrow direction={"L"} />
            </td>
            <td>카운터정글비율</td>
            <td>
              <Arrow direction={"R"} />
            </td>
            <td>26.77%</td>
          </tr>

          <tr>
            <td>23.64%</td>
            <td>
              <Arrow direction={"L"} />
            </td>
            <td>카운터정글비율</td>
            <td>
              <Arrow direction={"R"} />
            </td>
            <td>26.77%</td>
          </tr>

          <tr>
            <td>23.64%</td>
            <td>
              <Arrow direction={"L"} />
            </td>
            <td>카운터정글비율</td>
            <td>
              <Arrow direction={"R"} />
            </td>
            <td>26.77%</td>
          </tr>

          <tr>
            <td>23.64%</td>
            <td>
              <Arrow direction={"L"} />
            </td>
            <td>카운터정글비율</td>
            <td>
              <Arrow direction={"R"} />
            </td>
            <td>26.77%</td>
          </tr>
        </tbody>
      </TextTable>
    </>
  );
};

const TextTable = styled.table`
  /* width: 100%; */
  width: 900px;

  thead {
    ${typoStyle.contents_title}

    th {
      vertical-align: middle;
      text-align: center;
      background-color: ${colors.bg_box};
      ${spacing.paddingY(4)}

      &:nth-of-type(2n) {
        width: 20px;
      }

      &:first-of-type {
        border-radius: 9999px 0 0 9999px;
      }
      &:last-of-type {
        border-radius: 0 9999px 9999px 0;
      }
    }
  }

  tbody {
    font-size: 16px;
    /* 첫번쨰 행 */
    tr:first-of-type {
      td {
        ${spacing.paddingT(5)}
        ${spacing.paddingB(3)}
      }
    }
    /* 나머지행 */
    tr {
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      td {
        vertical-align: middle;
        text-align: center;
        ${spacing.padding(3)}
      }
    }
  }
`;

export default Comp1;
