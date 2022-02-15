/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { useState } from "react";
import { cx } from "@emotion/css";
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
import Button from "../../../../Components/Ui/Button";

// css
import {
  dropdownStyle,
  tableStyle,
  transitionStyle,
  typoStyle,
  buttonStyle,
} from "../../../../Styles/ui";
import { isObjEqual } from "../../../../lib/isObjEqual";

const CompareSideFilter = () => {
  const [filterState, setFilterState] = useState({
    step1: [],
    step2: [],
    step3: [],
    step4: { all: false, gnar: false, teemo: false },
    step5: { all: false, gnar: false, teemo: false },
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
    <SWrapper>
      <SFilterContainer>
        {/* step1 : 나의 팀 */}
        <div css={{ marginBottom: 30 }}>
          <Accordion>
            <AccordionSummary css={{ marginBottom: 8 }} onClick={() => {}}>
              <SStepContainer>
                <SLabel>STEP 01</SLabel>
                <SLabelTitle>나의 팀 선택하기</SLabelTitle>
              </SStepContainer>
            </AccordionSummary>
            <AccordionDetails>
              {/* 셀렉트 그룹 */}
              <SSelectGroup>
                {/* 연도 & 리그 */}
                <div className="group-row">
                  {/* 연도 */}
                  <div className="group-col-2">
                    <DropdownContainer
                      label="year"
                      onChange={(e) => {
                        console.log(e);
                      }}
                    >
                      <DropdownLabel css={[dropdownStyle.select_head]}>
                        <SLabelText>연도선택</SLabelText>
                      </DropdownLabel>
                      <DropdownList>
                        <DropdownItem
                          css={[dropdownStyle.select_item]}
                          value={"2021"}
                        >
                          2021
                        </DropdownItem>
                        <DropdownItem
                          css={[dropdownStyle.select_item]}
                          value={"2022"}
                        >
                          2022
                        </DropdownItem>
                      </DropdownList>
                    </DropdownContainer>
                  </div>

                  {/* 리그 */}
                  <div className="group-col-2">
                    <DropdownContainer
                      label="league"
                      onChange={(e) => {
                        console.log(e);
                      }}
                    >
                      <DropdownLabel css={[dropdownStyle.select_head]}>
                        <SLabelText>리그선택</SLabelText>
                      </DropdownLabel>
                      <DropdownList>
                        <DropdownItem
                          css={[dropdownStyle.select_item]}
                          value={"2021"}
                        >
                          2021
                        </DropdownItem>
                        <DropdownItem
                          css={[dropdownStyle.select_item]}
                          value={"2022"}
                        >
                          2022
                        </DropdownItem>
                      </DropdownList>
                    </DropdownContainer>
                  </div>
                </div>
                {/* 팀 & 선수 */}
                <div className="group-row">
                  {/* 팀 */}
                  <div className="group-col-2">
                    <DropdownContainer
                      label="team"
                      onChange={(e) => {
                        console.log(e);
                      }}
                    >
                      <DropdownLabel css={[dropdownStyle.select_head]}>
                        <SLabelText>팀선택</SLabelText>
                      </DropdownLabel>
                      <DropdownList>
                        <DropdownItem
                          css={[dropdownStyle.select_item]}
                          value={"2021"}
                        >
                          2021
                        </DropdownItem>
                        <DropdownItem
                          css={[dropdownStyle.select_item]}
                          value={"2022"}
                        >
                          2022
                        </DropdownItem>
                      </DropdownList>
                    </DropdownContainer>
                  </div>
                  {/* 선수 */}
                  <div className="group-col-2">
                    <DropdownContainer
                      label="player"
                      onChange={(e) => {
                        console.log(e);
                      }}
                    >
                      <DropdownLabel css={[dropdownStyle.select_head]}>
                        <SLabelText>선수선택</SLabelText>
                      </DropdownLabel>
                      <DropdownList>
                        <DropdownItem
                          css={[dropdownStyle.select_item]}
                          value={"2021"}
                        >
                          2021
                        </DropdownItem>
                        <DropdownItem
                          css={[dropdownStyle.select_item]}
                          value={"2022"}
                        >
                          2022
                        </DropdownItem>
                      </DropdownList>
                    </DropdownContainer>
                  </div>
                </div>
                {/* 시즌 */}
                <div className="group-row">
                  {/* 시즌 */}
                  <div className="group-col-1">
                    <DropdownContainer
                      label="year"
                      onChange={(e) => {
                        console.log(e);
                      }}
                    >
                      <DropdownLabel css={[dropdownStyle.select_head]}>
                        <SLabelText>시즌선택</SLabelText>
                      </DropdownLabel>
                      <DropdownList>
                        <DropdownItem
                          css={[dropdownStyle.select_item]}
                          value={"2021"}
                        >
                          2021
                        </DropdownItem>
                        <DropdownItem
                          css={[dropdownStyle.select_item]}
                          value={"2022"}
                        >
                          2022
                        </DropdownItem>
                      </DropdownList>
                    </DropdownContainer>
                  </div>
                </div>
              </SSelectGroup>
            </AccordionDetails>
          </Accordion>
        </div>

        {/* step2 : 상대 팀 */}
        <div css={{ marginBottom: 30 }}>
          <Accordion>
            <AccordionSummary css={{ marginBottom: 13 }} onClick={() => {}}>
              <SStepContainer>
                <SLabel>STEP 02</SLabel>
                <SLabelTitle>비교하고 싶은 팀 선택</SLabelTitle>
              </SStepContainer>
            </AccordionSummary>
            <AccordionDetails>
              {/* 셀렉트 그룹 */}
              <SSelectGroup>
                {/* 연도 & 리그 */}
                <div className="group-row">
                  {/* 연도 */}
                  <div className="group-col-2">
                    <DropdownContainer
                      label="year"
                      onChange={(e) => {
                        console.log(e);
                      }}
                    >
                      <DropdownLabel css={[dropdownStyle.select_head]}>
                        <SLabelText>연도 선택</SLabelText>
                      </DropdownLabel>
                      <DropdownList>
                        <DropdownItem
                          css={[dropdownStyle.select_item]}
                          value={"2021"}
                        >
                          2021
                        </DropdownItem>
                        <DropdownItem
                          css={[dropdownStyle.select_item]}
                          value={"2022"}
                        >
                          2022
                        </DropdownItem>
                      </DropdownList>
                    </DropdownContainer>
                  </div>

                  {/* 리그 */}
                  <div className="group-col-2">
                    <DropdownContainer
                      label="league"
                      onChange={(e) => {
                        console.log(e);
                      }}
                    >
                      <DropdownLabel css={[dropdownStyle.select_head]}>
                        <SLabelText>리그 선택</SLabelText>
                      </DropdownLabel>
                      <DropdownList>
                        <DropdownItem
                          css={[dropdownStyle.select_item]}
                          value={"2021"}
                        >
                          2021
                        </DropdownItem>
                        <DropdownItem
                          css={[dropdownStyle.select_item]}
                          value={"2022"}
                        >
                          2022
                        </DropdownItem>
                      </DropdownList>
                    </DropdownContainer>
                  </div>
                </div>
                {/* 팀 & 선수 */}
                <div className="group-row">
                  {/* 팀 */}
                  <div className="group-col-2">
                    <DropdownContainer
                      label="team"
                      onChange={(e) => {
                        console.log(e);
                      }}
                    >
                      <DropdownLabel css={[dropdownStyle.select_head]}>
                        <SLabelText>팀 선택</SLabelText>
                      </DropdownLabel>
                      <DropdownList>
                        <DropdownItem
                          css={[dropdownStyle.select_item]}
                          value={"2021"}
                        >
                          2021
                        </DropdownItem>
                        <DropdownItem
                          css={[dropdownStyle.select_item]}
                          value={"2022"}
                        >
                          2022
                        </DropdownItem>
                      </DropdownList>
                    </DropdownContainer>
                  </div>
                  {/* 선수 */}
                  <div className="group-col-2">
                    <DropdownContainer
                      label="player"
                      onChange={(e) => {
                        console.log(e);
                      }}
                    >
                      <DropdownLabel css={[dropdownStyle.select_head]}>
                        <SLabelText>선수 선택</SLabelText>
                      </DropdownLabel>
                      <DropdownList>
                        <DropdownItem
                          css={[dropdownStyle.select_item]}
                          value={"2021"}
                        >
                          2021
                        </DropdownItem>
                        <DropdownItem
                          css={[dropdownStyle.select_item]}
                          value={"2022"}
                        >
                          2022
                        </DropdownItem>
                      </DropdownList>
                    </DropdownContainer>
                  </div>
                </div>
                {/* 시즌 */}
                <div className="group-row">
                  {/* 시즌 */}
                  <div className="group-col-1">
                    <DropdownContainer
                      label="year"
                      onChange={(e) => {
                        console.log(e);
                      }}
                    >
                      <DropdownLabel css={[dropdownStyle.select_head]}>
                        <SLabelText>시즌 선택</SLabelText>
                      </DropdownLabel>
                      <DropdownList>
                        <DropdownItem
                          css={[dropdownStyle.select_item]}
                          value={"2021"}
                        >
                          2021
                        </DropdownItem>
                        <DropdownItem
                          css={[dropdownStyle.select_item]}
                          value={"2022"}
                        >
                          2022
                        </DropdownItem>
                      </DropdownList>
                    </DropdownContainer>
                  </div>
                </div>
              </SSelectGroup>
            </AccordionDetails>
          </Accordion>
        </div>

        {/* step3 : 패치 선택 */}
        <div css={{ marginBottom: 30 }}>
          <Accordion>
            <AccordionSummary css={{ marginBottom: 8 }} onClick={() => {}}>
              <SStepContainer>
                <SLabel>STEP 3</SLabel>
                <SLabelTitle>패치 선택</SLabelTitle>
              </SStepContainer>
            </AccordionSummary>
            <AccordionDetails>
              <DropdownContainer
                label="patch"
                onChange={(e) => {
                  console.log(e);
                }}
              >
                <DropdownLabel css={[dropdownStyle.select_head]}>
                  <em css={typoStyle.select_red}>2</em> 패치
                </DropdownLabel>
                <DropdownList>
                  <DropdownItem
                    css={[dropdownStyle.select_item]}
                    value={"2021"}
                  >
                    2021
                  </DropdownItem>
                  <DropdownItem
                    css={[dropdownStyle.select_item]}
                    value={"2022"}
                  >
                    2022
                  </DropdownItem>
                </DropdownList>
              </DropdownContainer>
            </AccordionDetails>
          </Accordion>
        </div>

        {/* step4 : 우리팀 플레이한 챔피언 선택 */}
        <div css={{ marginBottom: 30 }}>
          <Accordion>
            <AccordionSummary css={{ marginBottom: 8 }} onClick={() => {}}>
              <SStepContainer>
                <SLabel>STEP 4</SLabel>
                <SLabelTitle>
                  <Avatar
                    src="images/LCK_CL_LOGO/T1.C.png"
                    alt="t1"
                    size={20}
                    block={false}
                  />
                  {"T1"} 플레이한 챔피언 선택
                </SLabelTitle>
              </SStepContainer>
            </AccordionSummary>
            <AccordionDetails>
              <STable>
                <SHead>
                  <div css={Col1}>
                    <Checkbox
                      name="step4"
                      value="all"
                      onChange={handleChange}
                      checked={filterState.step4.all}
                    />
                  </div>
                  <div css={Col2}>챔피언(경기수)</div>
                  <div css={[Col3]}>진영별</div>
                  <div css={[Col3]}>경기수</div>
                </SHead>

                <SBody>
                  <SRow isActive={filterState.step4["gnar"]}>
                    {/* 체크 */}
                    <div css={Col1}>
                      <Checkbox
                        name="step4"
                        value="gnar"
                        onChange={handleChange}
                        checked={filterState.step4.gnar}
                      />
                    </div>
                    {/* 본문 */}
                    <SChamp css={Col2}>
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

                  <SRow isActive={filterState.step4["teemo"]}>
                    <div css={Col1}>
                      <Checkbox
                        name="step4"
                        value="teemo"
                        onChange={handleChange}
                        checked={filterState.step4.teemo}
                      />
                    </div>

                    <SChamp css={Col2}>
                      <Avatar
                        css={{ marginRight: 5 }}
                        size={20}
                        src="images/champion/teemo.png"
                        alt="티모"
                      />
                      <span>트위스티드 페이트 같이 이름이 길면 (7)</span>
                    </SChamp>

                    <SRed>24</SRed>
                    <SBlue>24</SBlue>
                  </SRow>
                </SBody>
              </STable>
            </AccordionDetails>
          </Accordion>
        </div>

        {/* step5 : 상대팀 플레이한 챔피언 선택 */}
        <div css={{ marginBottom: 30 }}>
          <Accordion>
            <AccordionSummary css={{ marginBottom: 8 }} onClick={() => {}}>
              <SStepContainer>
                <SLabel>STEP 5</SLabel>
                <SLabelTitle>
                  <Avatar
                    src="images/LCK_CL_LOGO/DK.C.png"
                    alt="DK"
                    size={20}
                    block={false}
                  />
                  {`DK`} 플레이한 챔피언 선택
                </SLabelTitle>
              </SStepContainer>
            </AccordionSummary>
            <AccordionDetails>
              <STable>
                <SHead>
                  <div css={Col1}>
                    <Checkbox
                      name="step5"
                      value="all"
                      onChange={handleChange}
                      checked={filterState.step5.all}
                    />
                  </div>
                  <div css={Col2}>챔피언(경기수)</div>
                  <div css={[Col3]}>진영별</div>
                  <div css={[Col3]}>경기수</div>
                </SHead>

                <SBody>
                  <SRow isActive={filterState.step5["gnar"]}>
                    {/* 체크 */}
                    <div css={Col1}>
                      <Checkbox
                        name="step5"
                        value="gnar"
                        onChange={handleChange}
                        checked={filterState.step5.gnar}
                      />
                    </div>
                    {/* 본문 */}
                    <SChamp css={Col2}>
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

                  <SRow isActive={filterState.step5["teemo"]}>
                    <div css={Col1}>
                      <Checkbox
                        name="step5"
                        value="teemo"
                        onChange={handleChange}
                        checked={filterState.step5.teemo}
                      />
                    </div>

                    <SChamp css={Col2}>
                      <Avatar
                        css={{ marginRight: 5 }}
                        size={20}
                        src="images/champion/teemo.png"
                        alt="티모"
                      />
                      <span>트위스티드 페이트 같이 이름이 길면 (7)</span>
                    </SChamp>

                    <SRed>24</SRed>
                    <SBlue>24</SBlue>
                  </SRow>
                </SBody>
              </STable>
            </AccordionDetails>
          </Accordion>
        </div>
      </SFilterContainer>

      <SButtonContainer>
        <Button
          css={[
            buttonStyle.color.main,
            buttonStyle.size.full,
            buttonStyle.size.y_20,
            typoStyle.body,
          ]}
        >
          정글링 비교하기
        </Button>
      </SButtonContainer>
    </SWrapper>
  );
};

// 레이아웃
const SWrapper = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
`;
const SFilterContainer = styled.div`
  padding: 24px 20px 0 20px;
`;
const SButtonContainer = styled.div`
  padding: 20px;
  border-top: 1px solid ${({ theme }) => theme.colors.border_light};
`;

// Accordian
const SStepContainer = styled.div`
  display: flex;
  align-items: center;
`;
const SLabel = styled.p`
  ${typoStyle.label}
  height: 100%;
  margin-right: 8px;
`;
const SLabelTitle = styled.span`
  display: flex;
  align-items: center;
  ${typoStyle.contents}
`;
const SLabelText = styled.div`
  opacity: 0.3;
`;

// 셀렉트 그룹
const SSelectGroup = styled.div`
  .group-row {
    display: flex;
    margin-bottom: 6px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .group-col-1 {
    width: 100%;
    flex: 0 1 100%;
  }
  .group-col-2 {
    width: 50%;
    flex: 0 1 50%;
    &:first-of-type {
      margin-right: 12px;
    }
  }
`;
// 테이블 관련 코드
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

  span {
    ${typoStyle.noWrap}
  }
`;

// 테이블
const Col1 = css`
  margin-right: 16px;
`;

const Col2 = css`
  flex: 1;
  max-width: 180px;
`;

const Col3 = css`
  width: 43px;
  text-align: center;
`;

const SRed = styled.div`
  ${Col3}
  color: ${({ theme }) => theme.colors.red};
`;
const SBlue = styled.div`
  ${Col3}
  color: ${({ theme }) => theme.colors.blue};
`;

export default CompareSideFilter;
