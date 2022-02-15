/** @jsxImportSource @emotion/react */
import React from "react";
import { jsx } from "@emotion/react";
import { cx } from "@emotion/css";
import styled from "@emotion/styled";
import { useState } from "react";
// ui components
import {
  borderRadiusStyle,
  testStyle,
  buttonStyle,
  typoStyle,
  spacing,
} from "../../../../Styles/ui";
import CompareSideFilter from "../components/CompareSideFilter";
import Avatar from "../../../../Components/Ui/Avatar";
import Button from "../../../../Components/Ui/Button";

// ui style
import * as table from "../components/styled/StyledTable";
import * as layout from "../components/styled/StyledJungleLayout";
const S = { table, layout };

const Compare = () => {
  const [active, setActive] = useState(true);
  return (
    <S.layout.CompareContainer>
      <S.layout.FlexContainer>
        {/* 정글 비교 사이드 필터 */}
        <S.layout.Sidebar>
          <CompareSideFilter />
        </S.layout.Sidebar>

        <S.layout.Contents>
          {/* 비교테이블 */}
          <S.layout.FlexContainer>
            {/* 첫번째 테이블 */}
            <S.table.TableContainer css={spacing.marginR(5)}>
              <S.table.TableHeader>
                {/* 제목 */}
                <S.table.TableTitle>
                  <Avatar
                    src="images/LCK_CL_LOGO/T1.C.png"
                    alt="T1"
                    size={20}
                    block={false}
                  />
                  {"T1"}
                  정글 순서별 캠프 선택비율
                </S.table.TableTitle>
                <S.table.TableButtonGroup>
                  <Button
                    className={cx([{ "is-active": !active }])}
                    css={[
                      typoStyle.select,
                      buttonStyle.size.full,
                      buttonStyle.size.x_20,
                      buttonStyle.size.y_8,
                      buttonStyle.color.normal,
                      borderRadiusStyle[10],
                    ]}
                  >
                    BLUE
                  </Button>
                  <Button
                    className={cx([{ "is-active": active }])}
                    css={[
                      typoStyle.select,
                      buttonStyle.size.full,
                      buttonStyle.size.x_20,
                      buttonStyle.size.y_8,
                      buttonStyle.color.normal,
                      borderRadiusStyle[10],
                    ]}
                  >
                    RED
                  </Button>
                </S.table.TableButtonGroup>
              </S.table.TableHeader>

              {/* 테이블 */}
              <S.table.Table>
                <thead>
                  <tr>
                    <th>순위</th>
                    <th colSpan={3}>순서별캠프선택 비율</th>
                  </tr>
                </thead>
                <tbody>
                  {/* 칼날부리 한줄 코드 */}
                  <tr>
                    <td>1</td>
                    <td>
                      <S.table.TableData>
                        <Avatar
                          src={"images/champion/teemo.png"}
                          alt={"칼날부리"}
                          size={36}
                          color={"blue"}
                        />
                        <div>
                          <p>46%</p>
                          <p>칼날부리</p>
                        </div>
                      </S.table.TableData>
                    </td>
                    <td>
                      <S.table.TableData>
                        <Avatar
                          src={"images/champion/teemo.png"}
                          alt={"칼날부리"}
                          size={36}
                          color={"blue"}
                        />
                        <div>
                          <p>46%</p>
                          <p>칼날부리</p>
                        </div>
                      </S.table.TableData>
                    </td>
                    <td>
                      <S.table.TableData>
                        <Avatar
                          src={"images/champion/teemo.png"}
                          alt={"칼날부리"}
                          size={36}
                          color={"blue"}
                        />
                        <div>
                          <p>46%</p>
                          <p>칼날부리</p>
                        </div>
                      </S.table.TableData>
                    </td>
                  </tr>

                  {/* 칼날부리 한줄 코드 */}
                  <tr>
                    <td>1</td>
                    <td>
                      <S.table.TableData>
                        <Avatar
                          src={"images/champion/teemo.png"}
                          alt={"칼날부리"}
                          size={36}
                          color={"blue"}
                        />
                        <div>
                          <p>46%</p>
                          <p>칼날부리</p>
                        </div>
                      </S.table.TableData>
                    </td>
                    <td>
                      <S.table.TableData>
                        <Avatar
                          src={"images/champion/teemo.png"}
                          alt={"칼날부리"}
                          size={36}
                          color={"blue"}
                        />
                        <div>
                          <p>46%</p>
                          <p>칼날부리</p>
                        </div>
                      </S.table.TableData>
                    </td>
                    <td>
                      <S.table.TableData>
                        <Avatar
                          src={"images/champion/teemo.png"}
                          alt={"칼날부리"}
                          size={36}
                          color={"blue"}
                        />
                        <div>
                          <p>46%</p>
                          <p>칼날부리</p>
                        </div>
                      </S.table.TableData>
                    </td>
                  </tr>

                  {/* 칼날부리 한줄 코드 */}
                  <tr>
                    <td>1</td>
                    <td>
                      <S.table.TableData>
                        <Avatar
                          src={"images/champion/teemo.png"}
                          alt={"칼날부리"}
                          size={36}
                          color={"blue"}
                        />
                        <div>
                          <p>46%</p>
                          <p>칼날부리</p>
                        </div>
                      </S.table.TableData>
                    </td>
                    <td>
                      <S.table.TableData>
                        <Avatar
                          src={"images/champion/teemo.png"}
                          alt={"칼날부리"}
                          size={36}
                          color={"blue"}
                        />
                        <div>
                          <p>46%</p>
                          <p>칼날부리</p>
                        </div>
                      </S.table.TableData>
                    </td>
                    <td>
                      <S.table.TableData>
                        <Avatar
                          src={"images/champion/teemo.png"}
                          alt={"칼날부리"}
                          size={36}
                          color={"blue"}
                        />
                        <div>
                          <p>46%</p>
                          <p>칼날부리</p>
                        </div>
                      </S.table.TableData>
                    </td>
                  </tr>
                </tbody>
              </S.table.Table>
            </S.table.TableContainer>

            {/* 두번째 테이블 */}
            <S.table.TableContainer>
              <S.table.TableHeader>
                {/* 제목 */}
                <S.table.TableTitle>
                  <Avatar
                    src="images/LCK_CL_LOGO/T1.C.png"
                    alt="T1"
                    size={20}
                    block={false}
                  />
                  {"T1"}
                  정글 순서별 캠프 선택비율
                </S.table.TableTitle>
                <S.table.TableButtonGroup>
                  <Button
                    className={cx([{ "is-active": !active }])}
                    css={[
                      typoStyle.select,
                      buttonStyle.size.full,
                      buttonStyle.size.x_20,
                      buttonStyle.size.y_8,
                      buttonStyle.color.normal,
                      borderRadiusStyle[10],
                    ]}
                  >
                    BLUE
                  </Button>
                  <Button
                    className={cx([{ "is-active": active }])}
                    css={[
                      typoStyle.select,
                      buttonStyle.size.full,
                      buttonStyle.size.x_20,
                      buttonStyle.size.y_8,
                      buttonStyle.color.normal,
                      borderRadiusStyle[10],
                    ]}
                  >
                    RED
                  </Button>
                </S.table.TableButtonGroup>
              </S.table.TableHeader>

              {/* 테이블 */}
              <S.table.Table>
                <thead>
                  <tr>
                    <th>순위</th>
                    <th colSpan={3}>순서별캠프선택 비율</th>
                  </tr>
                </thead>
                <tbody>
                  {/* 칼날부리 한줄 코드 */}
                  <tr>
                    <td>1</td>
                    <td>
                      <S.table.TableData>
                        <Avatar
                          src={"images/champion/teemo.png"}
                          alt={"칼날부리"}
                          size={36}
                          color={"blue"}
                        />
                        <div>
                          <p>46%</p>
                          <p>칼날부리</p>
                        </div>
                      </S.table.TableData>
                    </td>
                    <td>
                      <S.table.TableData>
                        <Avatar
                          src={"images/champion/teemo.png"}
                          alt={"칼날부리"}
                          size={36}
                          color={"blue"}
                        />
                        <div>
                          <p>46%</p>
                          <p>칼날부리</p>
                        </div>
                      </S.table.TableData>
                    </td>
                    <td>
                      <S.table.TableData>
                        <Avatar
                          src={"images/champion/teemo.png"}
                          alt={"칼날부리"}
                          size={36}
                          color={"blue"}
                        />
                        <div>
                          <p>46%</p>
                          <p>칼날부리</p>
                        </div>
                      </S.table.TableData>
                    </td>
                  </tr>

                  {/* 칼날부리 한줄 코드 */}
                  <tr>
                    <td>1</td>
                    <td>
                      <S.table.TableData>
                        <Avatar
                          src={"images/champion/teemo.png"}
                          alt={"칼날부리"}
                          size={36}
                          color={"blue"}
                        />
                        <div>
                          <p>46%</p>
                          <p>칼날부리</p>
                        </div>
                      </S.table.TableData>
                    </td>
                    <td>
                      <S.table.TableData>
                        <Avatar
                          src={"images/champion/teemo.png"}
                          alt={"칼날부리"}
                          size={36}
                          color={"blue"}
                        />
                        <div>
                          <p>46%</p>
                          <p>칼날부리</p>
                        </div>
                      </S.table.TableData>
                    </td>
                    <td>
                      <S.table.TableData>
                        <Avatar
                          src={"images/champion/teemo.png"}
                          alt={"칼날부리"}
                          size={36}
                          color={"blue"}
                        />
                        <div>
                          <p>46%</p>
                          <p>칼날부리</p>
                        </div>
                      </S.table.TableData>
                    </td>
                  </tr>

                  {/* 칼날부리 한줄 코드 */}
                  <tr>
                    <td>1</td>
                    <td>
                      <S.table.TableData>
                        <Avatar
                          src={"images/champion/teemo.png"}
                          alt={"칼날부리"}
                          size={36}
                          color={"blue"}
                        />
                        <div>
                          <p>46%</p>
                          <p>칼날부리</p>
                        </div>
                      </S.table.TableData>
                    </td>
                    <td>
                      <S.table.TableData>
                        <Avatar
                          src={"images/champion/teemo.png"}
                          alt={"칼날부리"}
                          size={36}
                          color={"blue"}
                        />
                        <div>
                          <p>46%</p>
                          <p>칼날부리</p>
                        </div>
                      </S.table.TableData>
                    </td>
                    <td>
                      <S.table.TableData>
                        <Avatar
                          src={"images/champion/teemo.png"}
                          alt={"칼날부리"}
                          size={36}
                          color={"blue"}
                        />
                        <div>
                          <p>46%</p>
                          <p>칼날부리</p>
                        </div>
                      </S.table.TableData>
                    </td>
                  </tr>
                </tbody>
              </S.table.Table>
            </S.table.TableContainer>
          </S.layout.FlexContainer>

          <S.layout.Container>
            <div>{/* 하나의 메인테이블 */}</div>
          </S.layout.Container>
        </S.layout.Contents>
      </S.layout.FlexContainer>
    </S.layout.CompareContainer>
  );
};

export default Compare;
