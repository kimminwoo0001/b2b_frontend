/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { useRef, useState } from "react";
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
import Radio from "../../../../Components/Ui/Radio";
import Versus from "../../../../Components/Ui/Versus";
import Button from "../../../../Components/Ui/Button";

// css
import {
  dropdownStyle,
  tableStyle,
  transitionStyle,
  typoStyle,
  scrollbarStyle,
  buttonStyle,
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

  // 라디오버튼 체인지 관련로직
  const handleRadio = (e) => {
    const { value, name } = e.target;
    setRadioState(value);
  };
  // 상위 이벤트
  const handleClickGameItem = (num) => {
    radioRef.current[num].click();
  };
  const [radioState, setRadioState] = useState("1경기");
  const radioRef = useRef([]);

  return (
    <SWrapper>
      <SFilterContainer>
        {/* step1 - select 박스 */}
        <div css={{ marginBottom: 30 }}>
          <Accordion>
            <AccordionSummary css={{ marginBottom: 8 }} onClick={() => {}}>
              <SStepContainer>
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
              </SStepContainer>
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
                  <DropdownItem
                    css={[dropdownStyle.select_item]}
                    value={"메뉴1"}
                  >
                    메뉴1
                  </DropdownItem>
                  <DropdownItem
                    css={[dropdownStyle.select_item]}
                    value={"메뉴2"}
                  >
                    메뉴2
                  </DropdownItem>
                  <DropdownItem
                    css={[dropdownStyle.select_item]}
                    value={"메뉴3"}
                  >
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
              <SStepContainer>
                <SLabel>STEP 02</SLabel>
                <STeam>
                  <span>플레이 한 챔피언 선택</span>
                </STeam>
              </SStepContainer>
            </AccordionSummary>
            <AccordionDetails>
              <STable>
                <SHead>
                  <div css={Col1}>
                    <Checkbox
                      name="step1"
                      value="all"
                      onChange={handleChange}
                      checked={filterState.step1.all}
                    />
                  </div>
                  <div css={Col2}>챔피언(경기수)</div>
                  <div css={[Col3]}>진영별</div>
                  <div css={[Col3]}>경기수</div>
                </SHead>

                <SBody>
                  <SRow isActive={filterState.step1["gnar"]}>
                    {/* 체크 */}
                    <div css={Col1}>
                      <Checkbox
                        name="step1"
                        value="gnar"
                        onChange={handleChange}
                        checked={filterState.step1.gnar}
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

                  <SRow isActive={filterState.step1["teemo"]}>
                    <div css={Col1}>
                      <Checkbox
                        name="step1"
                        value="teemo"
                        onChange={handleChange}
                        checked={filterState.step1.teemo}
                      />
                    </div>

                    <SChamp css={Col2}>
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
              <SStepContainer>
                <SLabel>STEP 02</SLabel>
                <STeam>
                  <span>플레이 한 챔피언 선택</span>
                </STeam>
              </SStepContainer>
            </AccordionSummary>
            <AccordionDetails>
              <STable>
                <SHead>
                  <div css={Col1}>
                    <Checkbox
                      name="step2"
                      value="all"
                      onChange={handleChange}
                      checked={filterState.step2.all}
                    />
                  </div>
                  <div css={Col2}>챔피언(경기수)</div>
                  <div css={[Col3]}>진영별</div>
                  <div css={[Col3]}>경기수</div>
                </SHead>

                <SBody>
                  <SRow isActive={filterState.step2["gnar"]}>
                    {/* 체크 */}
                    <div css={Col1}>
                      <Checkbox
                        name="step2"
                        value="gnar"
                        onChange={handleChange}
                        checked={filterState.step2.gnar}
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

                  <SRow isActive={filterState.step2["teemo"]}>
                    <div css={Col1}>
                      <Checkbox
                        name="step2"
                        value="teemo"
                        onChange={handleChange}
                        checked={filterState.step2.teemo}
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

        {/* step4 - 경기체크 */}
        <div>
          <Accordion css={{ marginBottom: 30 }}>
            <AccordionSummary css={{ marginBottom: 8 }} onClick={() => {}}>
              <SStepContainer>
                <SLabel>STEP 03</SLabel>
                <STeam>
                  <span>동선을 확인할 경기 선택</span>
                </STeam>
              </SStepContainer>
            </AccordionSummary>

            <AccordionDetails>
              <SGameList>
                {/* 경기 정보 item */}
                {Array.from({ length: 5 }, (_, i) => i + 1).map((item) => (
                  <SGameItem
                    isActive={radioState === `${item}경기`}
                    key={`경기정보${item}`}
                    onClick={() => handleClickGameItem(item)}
                  >
                    {/* 라디오버튼 */}
                    <SRadioContainer>
                      <Radio
                        name="game"
                        value={`${item}경기`}
                        ref={(el) => (radioRef.current[item] = el)}
                        onChange={handleRadio}
                        checked={radioState === `${item}경기`}
                      />
                    </SRadioContainer>
                    {/* 경기정보 */}
                    <SInfoContainer>
                      {/* 팀, 경기 날짜 */}
                      <SInfo>
                        <STeam>
                          <Avatar
                            size={24}
                            src={"images/LCK_CL_LOGO/DK.C.png"}
                            color={"blue"}
                            alt={"티원"}
                          />
                          <Versus spacing={6} />
                          <Avatar
                            size={24}
                            src={"images/LCK_CL_LOGO/T1s.C.png"}
                            color={"red"}
                            alt={"티원"}
                          />
                        </STeam>
                        <span>
                          Win
                          <em>2021-03-19</em>
                        </span>
                      </SInfo>

                      {/* 경기 이름 */}
                      <SName>LCK 1R 1SET 같이 이름이 길면 12312313123</SName>

                      <STeamSlideContainer>
                        <STeamSide>
                          <Avatar
                            src="images/champion/nunu.png"
                            alt="누누"
                            color={"blue"}
                            size={20}
                          />
                          <Avatar
                            src="images/champion/nunu.png"
                            alt="누누"
                            color={"blue"}
                            size={20}
                          />
                          <Avatar
                            src="images/champion/nunu.png"
                            alt="누누"
                            color={"blue"}
                            size={20}
                          />
                          <Avatar
                            src="images/champion/nunu.png"
                            alt="누누"
                            color={"blue"}
                            size={20}
                          />
                          <Avatar
                            src="images/champion/nunu.png"
                            alt="누누"
                            color={"blue"}
                            size={20}
                          />
                        </STeamSide>
                        <Versus spacing={8} />
                        <STeamSide>
                          <Avatar
                            color={"red"}
                            src="images/champion/nunu.png"
                            alt="누누"
                            size={20}
                          />
                          <Avatar
                            color={"red"}
                            src="images/champion/nunu.png"
                            alt="누누"
                            size={20}
                          />
                          <Avatar
                            color={"red"}
                            src="images/champion/nunu.png"
                            alt="누누"
                            size={20}
                          />
                          <Avatar
                            color={"red"}
                            src="images/champion/nunu.png"
                            alt="누누"
                            size={20}
                          />
                          <Avatar
                            color={"red"}
                            src="images/champion/nunu.png"
                            alt="누누"
                            size={20}
                          />
                        </STeamSide>
                      </STeamSlideContainer>
                    </SInfoContainer>
                  </SGameItem>
                ))}
              </SGameList>
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
          정글동선 확인하기
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

// step
const SStepContainer = styled.div`
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
  align-items: center;
  margin-bottom: 2px;
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

// 경기선택 관련
const SGameList = styled.div`
  height: 400px;
  padding: 0 10px;
  overflow-y: auto;
  background-color: ${({ theme }) => theme.colors.bg_select};
  border-radius: 20px;
  ${scrollbarStyle.hidden}
`;
const SGameItem = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 8px;
  border-radius: 20px;
  cursor: pointer;
  ${transitionStyle.background}
  background-color: ${({ isActive, theme }) =>
    isActive ? `${theme.colors.bg_gnb}` : ""};

  &:hover {
    background-color: ${({ theme }) => theme.colors.bg_hover};
  }
`;
const SRadioContainer = styled.div`
  margin-right: 8px;
`;
const SInfoContainer = styled.div`
  max-width: 265px;
`;
const SInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${typoStyle.contents}

  em {
    margin-left: 10px;
    ${typoStyle.info_md}
  }
`;

const SName = styled.div`
  width: 100%;
  margin-bottom: 6px;
  ${typoStyle.noWrap}
`;
const STeamSlideContainer = styled.div`
  display: flex;
`;
const STeamSide = styled.div`
  display: flex;
  > div {
    margin-right: 4px;
    &:last-child {
      margin-right: 0;
    }
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

export default JungleSideFilter;
