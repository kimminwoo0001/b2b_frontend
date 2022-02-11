/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { useState } from "react";
import styled from "@emotion/styled";

// UI tool kit
import Accordion from "../../../../Components/Ui/Accordion/Accordion";
import AccordionDetails from "../../../../Components/Ui/Accordion/AccordionDetails";
import AccordionSummary from "../../../../Components/Ui/Accordion/AccordionSummary";
import DropdownContainer from "../../../../Components/Ui/DropDown/DropdownContainer";
import DropdownLabel from "../../../../Components/Ui/DropDown/DropdownLabel";
import DropdownList from "../../../../Components/Ui/DropDown/DropdownList";
import DropdownItem from "../../../../Components/Ui/DropDown/DropdownItem";
import Checkbox from "../../../../Components/Ui/Checkbox";
import Avatar from "../../../../Components/Ui/Avatar";

// css
import {
  dropdownStyle,
  tableStyle,
  transitionStyle,
  typoStyle,
} from "../../../../Styles/ui";
import { isObjEqual } from "../../../../lib/isObjEqual";

const JungleSideFilter = () => {
  const [filterState, setFilterState] = useState({
    step1: { all: false, gnar: false, teemo: false },
    step2: { all: false, gnar: false, teemo: false },
  });

  const handleChange = (e) => {
    const { name, value, checked } = e.target;

    // 전체선택
    if (value === "all") {
      setFilterState((prev) => {
        const newData = {
          ...prev,
        };

        for (let key in newData[name]) {
          newData[name][key] = checked;
        }
        return newData;
      });
    }
    // 개별선택
    else {
      setFilterState((prev) => {
        const newData = { ...prev };
        newData[name] = { ...newData[name], [value]: checked };

        if (isObjEqual(newData[name])) {
          newData[name].all = checked;
        } else {
          newData[name].all = false;
        }
        return newData;
      });
    }
  };

  return (
    <div>
      {/* step1 - select 박스 */}
      <div css={{ marginBottom: 30 }}>
        <Accordion>
          <AccordionSummary css={{ marginBottom: 8 }} onClick={() => {}}>
            <SContainer>
              <SLabel>STEP 01</SLabel>
              <STeam>
                <Avatar
                  css={{ marginRight: 3 }}
                  size={20}
                  src="images/LCK_CL_LOGO/DK.C.png"
                  alt="담원기아"
                />
                <span>DK 선수선택</span>
              </STeam>
            </SContainer>
          </AccordionSummary>
          <AccordionDetails>
            <DropdownContainer
              label="champion"
              onChange={(e) => {
                console.log(e);
              }}
            >
              <DropdownLabel css={[dropdownStyle.select_head]}>
                챔피언선택
              </DropdownLabel>
              <DropdownList>
                <DropdownItem css={[dropdownStyle.select_item]} value={"메뉴1"}>
                  메뉴1
                </DropdownItem>
                <DropdownItem css={[dropdownStyle.select_item]} value={"메뉴2"}>
                  메뉴2
                </DropdownItem>
                <DropdownItem css={[dropdownStyle.select_item]} value={"메뉴3"}>
                  메뉴3
                </DropdownItem>
              </DropdownList>
            </DropdownContainer>
          </AccordionDetails>
        </Accordion>
      </div>

      {/* step2 - 챔피언 체크박스 */}
      <div css={{ marginBottom: 30 }}>
        <Accordion>
          <AccordionSummary css={{ marginBottom: 13 }} onClick={() => {}}>
            <SContainer>
              <SLabel>STEP 02</SLabel>
              <STeam>
                <span>플레이 한 챔피언 선택</span>
              </STeam>
            </SContainer>
          </AccordionSummary>
          <AccordionDetails>
            <STable>
              <SHead>
                <div css={Row1}>
                  <Checkbox
                    name="step1"
                    value="all"
                    onChange={handleChange}
                    checked={filterState.step1.all}
                  />
                </div>
                <div css={Row2}>챔피언(경기수)</div>
                <div css={[Row3]}>진영별</div>
                <div css={[Row3]}>경기수</div>
              </SHead>

              <SBody>
                <SRow isActive={filterState.step1["gnar"]}>
                  {/* 체크 */}
                  <div css={Row1}>
                    <Checkbox
                      name="step1"
                      value="gnar"
                      onChange={handleChange}
                      checked={filterState.step1.gnar}
                    />
                  </div>

                  {/* 본문 */}
                  <SChamp css={Row2}>
                    <Avatar
                      css={{ marginRight: 5 }}
                      size={20}
                      src="images/champion/teemo.png"
                      alt="티모"
                    />
                    <span>나르 (48)</span>
                  </SChamp>

                  {/* 경기수 */}
                  <SRed>24</SRed>
                  <SBlue>24</SBlue>
                </SRow>

                <SRow isActive={filterState.step1["teemo"]}>
                  <div css={Row1}>
                    <Checkbox
                      name="step1"
                      value="teemo"
                      onChange={handleChange}
                      checked={filterState.step1.teemo}
                    />
                  </div>

                  <SChamp css={Row2}>
                    <Avatar
                      css={{ marginRight: 5 }}
                      size={20}
                      src="images/champion/teemo.png"
                      alt="티모"
                    />
                    <span>나르 (48)</span>
                  </SChamp>

                  <SRed>24</SRed>
                  <SBlue>24</SBlue>
                </SRow>
              </SBody>
            </STable>
          </AccordionDetails>
        </Accordion>
      </div>

      {/* stpe3 - 상대팀 챔피언 체크박스 */}
      <div css={{ marginBottom: 30 }}>
        <Accordion>
          <AccordionSummary css={{ marginBottom: 8 }} onClick={() => {}}>
            <SContainer>
              <SLabel>STEP 02</SLabel>
              <STeam>
                <span>플레이 한 챔피언 선택</span>
              </STeam>
            </SContainer>
          </AccordionSummary>
          <AccordionDetails>
            <STable>
              <SHead>
                <div css={Row1}>
                  <Checkbox
                    name="step2"
                    value="all"
                    onChange={handleChange}
                    checked={filterState.step2.all}
                  />
                </div>
                <div css={Row2}>챔피언(경기수)</div>
                <div css={[Row3]}>진영별</div>
                <div css={[Row3]}>경기수</div>
              </SHead>

              <SBody>
                <SRow isActive={filterState.step2["gnar"]}>
                  {/* 체크 */}
                  <div css={Row1}>
                    <Checkbox
                      name="step2"
                      value="gnar"
                      onChange={handleChange}
                      checked={filterState.step2.gnar}
                    />
                  </div>
                  {/* 본문 */}
                  <SChamp css={Row2}>
                    <Avatar
                      css={{ marginRight: 5 }}
                      size={20}
                      src="images/champion/teemo.png"
                      alt="티모"
                    />
                    <span>나르 (48)</span>
                  </SChamp>

                  {/* 경기수 */}
                  <SRed>24</SRed>
                  <SBlue>24</SBlue>
                </SRow>

                <SRow isActive={filterState.step2["teemo"]}>
                  <div css={Row1}>
                    <Checkbox
                      name="step2"
                      value="teemo"
                      onChange={handleChange}
                      checked={filterState.step2.teemo}
                    />
                  </div>

                  <SChamp css={Row2}>
                    <Avatar
                      css={{ marginRight: 5 }}
                      size={20}
                      src="images/champion/teemo.png"
                      alt="티모"
                    />
                    <span>나르 (48)</span>
                  </SChamp>

                  <SRed>24</SRed>
                  <SBlue>24</SBlue>
                </SRow>
              </SBody>
            </STable>
          </AccordionDetails>
        </Accordion>
      </div>

      {/* step4 - 경기체크 */}
      <div></div>
    </div>
  );
};
const SContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const SLabel = styled.p`
  ${typoStyle.label}
  height: 100%;
  margin-right: 8px;
`;

const STeam = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

// 테이블 관련코드
const STable = styled.div``;

const SHead = styled.div`
  ${tableStyle.table_head}
`;
const SBody = styled.div``;
const SRow = styled.div`
  border-radius: 999px;
  ${tableStyle.table_row}
  ${transitionStyle.background}
  
  background-color: ${({ isActive, theme }) =>
    isActive ? theme.colors.bg_gnb : ""};
  &:hover {
    background-color: ${({ theme }) => theme.colors.bg_gnb};
  }
`;

const SChamp = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0;
`;

// row
const Row1 = css`
  margin-right: 16px;
`;

const Row2 = css`
  flex: 1 0;
`;

const Row3 = css`
  width: 43px;
  text-align: center;
`;

const SRed = styled.div`
  ${Row3}
  color: ${({ theme }) => theme.colors.red};
`;
const SBlue = styled.div`
  ${Row3}
  color: ${({ theme }) => theme.colors.blue};
`;
export default JungleSideFilter;
