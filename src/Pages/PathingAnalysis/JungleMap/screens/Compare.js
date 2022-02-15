/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import { cx } from "@emotion/css";
import { useState } from "react";

// Compeontns
import CompareSideFilter from "../components/CompareSideFilter";
// ui components
import Avatar from "../../../../Components/Ui/Avatar";
import Button from "../../../../Components/Ui/Button";
import Arrow from "../../../../Components/Ui/Arrow";
import Versus from "../../../../Components/Ui/Versus";
// ui Style
import {
  borderRadiusStyle,
  buttonStyle,
  typoStyle,
  spacing,
} from "../../../../Styles/ui";
// ui Style components
import * as table from "../components/styled/StyledTable";
import * as layout from "../components/styled/StyledJungleLayout";

// 스타일 컴포넌트 임포트
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
          <S.layout.FlexContainer css={spacing.marginB(5)}>
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
                    onClick={() => setActive(false)}
                    className={cx([{ "is-disabled": true }])}
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
                    onClick={() => setActive(true)}
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
                    onClick={() => setActive(false)}
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
                    onClick={() => setActive(true)}
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

          {/* 텍스트테이블 */}
          <S.layout.Container>
            <S.table.TextTable>
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
            </S.table.TextTable>
          </S.layout.Container>
        </S.layout.Contents>
      </S.layout.FlexContainer>
    </S.layout.CompareContainer>
  );
};

export default Compare;
