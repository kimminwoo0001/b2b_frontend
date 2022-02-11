/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";

import styled from "@emotion/styled";
import { dropdownStyle, transitionStyle, typoStyle } from "../../Styles/ui";
import DropdownList from "../../Components/Ui/DropDown/DropdownList";
import DropdownItem from "../../Components/Ui/DropDown/DropdownItem";
import Accordion from "../../Components/Ui/Accordion/Accordion";
import AccordionSummary from "../../Components/Ui/Accordion/AccordionSummary";
import AccordionDetails from "../../Components/Ui/Accordion/AccordionDetails";
import DropdownLabel from "../../Components/Ui/DropDown/DropdownLabel";
import DropdownContainer from "../../Components/Ui/DropDown/DropdownContainer";

import Checkbox from "../../Components/Ui/Checkbox";
import tableStyle from "../../Styles/ui/table_style";
import { useState } from "react";

const UiTest = () => {
  const [filterState, setFilterState] = useState({
    champion: { all: false, gnar: false },
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
    } else {
      setFilterState((prev) => {
        const newData = {
          ...prev,
        };
        newData[name] = { ...newData[name], [value]: checked };
        return newData;
      });
    }
  };

  return (
    <Container>
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
            <DropdownList label="챔피언 선택" onChange={() => {}}>
              <DropdownItem value={"메뉴1"}>메뉴1</DropdownItem>
              <DropdownItem value={"메뉴2"}>메뉴2</DropdownItem>
              <DropdownItem value={"메뉴3"}>메뉴3</DropdownItem>
            </DropdownList>
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
                    name="champion"
                    value="all"
                    onChange={handleChange}
                    checked={filterState.champion.all}
                  />
                </div>
                <div css={Row2}>챔피언(경기수)</div>
                <div css={[Row3]}>진영별</div>
                <div css={[Row3]}>경기수</div>
              </SHead>
              <SBody>
                <SRow isActive={filterState.champion["gnar"]}>
                  {/* 체크 */}
                  <div css={Row1}>
                    <Checkbox
                      name="champion"
                      value="gnar"
                      onChange={handleChange}
                      checked={filterState.champion.gnar}
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
              </SBody>
            </STable>
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
  justify-content: center;
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
