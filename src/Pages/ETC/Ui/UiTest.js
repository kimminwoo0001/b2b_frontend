/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled";
import { dropdownStyle, transitionStyle, typoStyle } from "../../../Styles/ui";
import DropdownList from "../../../Components/Ui/DropDown/DropdownList";
import DropdownItem from "../../../Components/Ui/DropDown/DropdownItem";
import Accordion from "../../../Components/Ui/Accordion/Accordion";
import AccordionSummary from "../../../Components/Ui/Accordion/AccordionSummary";
import AccordionDetails from "../../../Components/Ui/Accordion/AccordionDetails";
import DropdownLabel from "../../../Components/Ui/DropDown/DropdownLabel";
import DropdownContainer from "../../../Components/Ui/DropDown/DropdownContainer";
import Versus from "../../../Components/Ui/Versus";
import Checkbox from "../../../Components/Ui/Checkbox";
import tableStyle from "../../../Styles/ui/table_style";
import { useRef, useState } from "react";
import { isObjEqual } from "../../../lib/isObjEqual";
import Avatar from "../../../Components/Ui/Avatar";

import Radio from "../../../Components/Ui/Radio";
import scrollbarStyle from "../../../Styles/ui/scrollbar_style";

const UiTest = () => {
  const [filterState, setFilterState] = useState({
    step1: { all: false, gnar: false, teemo: false },
  });

  const [radioState, setRadioState] = useState("1경기");

  const radioRef = useRef([]);

  // 체크박스의 체인지 관련로직
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

  return (
    <Container>
      {/* 아바타 */}
      <section>
        <h1>아바타</h1>

        <div css={{ display: "flex" }}>
          <Avatar src="images/champion/teemo.png" alt={"티모^오^"} size={30} />

          <Avatar
            src="images/champion/nunu.png"
            alt={"누누"}
            size={100}
            circle={false}
          />

          <Avatar src="images/champion/teemo.png" alt={"티모^오^"} size={100} />
        </div>
      </section>

      {/* 드롭다운 */}
      <section>
        <h1>드롭다운 메뉴</h1>
        {/* select style */}
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

        {/* common dropdown */}
        <div css={{ width: 36 }}>
          <DropdownContainer
            label="lang"
            onChange={(e) => {
              console.log(e);
            }}
          >
            <DropdownLabel change={false}>
              <span css={{ width: 36, height: 36, borderRadius: "50%" }}>
                <img
                  css={{ width: "100%", height: "100%" }}
                  src="images/ico_global.png"
                  alt="지구본"
                />
              </span>
            </DropdownLabel>
            <DropdownList>
              <DropdownItem
                css={[dropdownStyle.select_item, { width: 500 }]}
                value={"ko"}
              >
                ko
              </DropdownItem>
              <DropdownItem
                css={[dropdownStyle.select_item, { width: 500 }]}
                value={"en"}
              >
                en
              </DropdownItem>
            </DropdownList>
          </DropdownContainer>
        </div>
      </section>

      <section>
        <h1>아코디언 메뉴</h1>
        {/* type select 박스 */}
        <Accordion css={{ marginBottom: 30 }}>
          <AccordionSummary css={{ marginBottom: 8 }} onClick={() => {}}>
            <SContainer>
              <SLabel>STEP 01</SLabel>
              <STeam>
                <div>
                  <img src="images/LCK_CL_LOGO/DK.C.png" alt="담원기아" />
                </div>
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

        {/* type 2 체크 박스 */}
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
                    <img src="images/champion/gnar.png" alt="나르!" />
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
                    <img src="images/champion/teemo.png" alt="나르!" />
                    <span>나르 (48)</span>
                  </SChamp>

                  <SRed>24</SRed>
                  <SBlue>24</SBlue>
                </SRow>
              </SBody>
            </STable>
          </AccordionDetails>
        </Accordion>
      </section>

      {/* step4 - 라디오 경기 선택 */}
      <section>
        <Accordion css={{ marginBottom: 30 }}>
          <AccordionSummary css={{ marginBottom: 8 }} onClick={() => {}}>
            <SContainer>
              <SLabel>STEP 03</SLabel>
              <STeam>
                <span>동선을 확인할 경기 선택</span>
              </STeam>
            </SContainer>
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
                  <div>
                    {/* 팀정보 */}
                    <STeam>
                      <Avatar
                        size={24}
                        src={"images/champion/nunu.png"}
                        alt={"티원"}
                      />
                      <Versus spacing={6} />
                      <Avatar
                        size={24}
                        src={"images/champion/nunu.png"}
                        alt={"티원"}
                      />
                    </STeam>

                    {/* 경기정보 */}
                    <div>
                      {/* 경기정보 택스트 */}
                      <SInfo>
                        <span>LCK 1R 1SET</span>
                        <span>
                          Win
                          <em>2021-03-19</em>
                        </span>
                      </SInfo>

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
                    </div>
                  </div>
                </SGameItem>
              ))}
            </SGameList>
          </AccordionDetails>
        </Accordion>
      </section>
    </Container>
  );
};

const Container = styled.article`
  height: 100vh;
  padding: 30px;
  background-color: ${({ theme }) => theme.colors.bg_light};
  ${typoStyle.body}

  section {
    margin-bottom: 40px;
  }

  h1 {
    margin-bottom: 10px;
  }
`;

// side filter 시작
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
  align-items: center;

  img {
    width: 20px;
    height: 20px;
    object-fit: contain;
  }

  > span {
    ${typoStyle.contents}
  }
`;
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

  > img {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    object-fit: cover;
    object-position: center;
    margin-right: 6px;
  }

  span {
  }
`;

// 게임리스트 css
const SGameList = styled.div`
  height: 400px;
  overflow-y: auto;
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
const SInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  ${typoStyle.contents}

  em {
    margin-left: 10px;
    ${typoStyle.info_md}
  }
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

export default UiTest;
