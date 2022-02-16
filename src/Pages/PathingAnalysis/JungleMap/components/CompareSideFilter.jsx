/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { useState } from "react";
import { cx } from "@emotion/css";

// util
import { isObjEqual } from "../../../../lib/isObjEqual";

// UI Components
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

// css style
import {
  dropdownStyle,
  typoStyle,
  buttonStyle,
  borderRadiusStyle,
} from "../../../../Styles/ui";
import * as S from "../components/styled/StyledSideFilter";

const CompareSideFilter = () => {
  // 필터 데이터 데모
  const [filterState, setFilterState] = useState({
    step1: [],
    step2: [],
    step3: [],
    step4: { all: false, gnar: false, teemo: false },
    step5: { all: false, gnar: false, teemo: false },
  });

  // button disabled demo
  const [data, setData] = useState([]);

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
    <S.Wrapper>
      <S.FilterContainer>
        {/* step1 : 나의 팀 */}
        <S.FilterSection>
          <Accordion>
            <AccordionSummary css={{ marginBottom: 8 }} onClick={() => {}}>
              <S.Title>
                <S.TitleLabel>STEP 01</S.TitleLabel>
                <S.Text>나의 팀 선택하기</S.Text>
              </S.Title>
            </AccordionSummary>
            <AccordionDetails>
              {/* 셀렉트 그룹 */}
              <S.SelectContainer>
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
                        <S.SelectLabel>연도선택</S.SelectLabel>
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
                        <S.SelectLabel>리그선택</S.SelectLabel>
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
                        <S.SelectLabel>팀선택</S.SelectLabel>
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
                        <S.SelectLabel>선수선택</S.SelectLabel>
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
                        <S.SelectLabel>시즌선택</S.SelectLabel>
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
              </S.SelectContainer>
            </AccordionDetails>
          </Accordion>
        </S.FilterSection>

        {/* step2 : 상대 팀 */}
        <div css={{ marginBottom: 30 }}>
          <Accordion>
            <AccordionSummary css={{ marginBottom: 13 }} onClick={() => {}}>
              <S.Title>
                <S.TitleLabel>STEP 02</S.TitleLabel>
                <S.Text>비교하고 싶은 팀 선택</S.Text>
              </S.Title>
            </AccordionSummary>
            <AccordionDetails>
              {/* 셀렉트 그룹 */}
              <S.SelectContainer>
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
                        <S.SelectLabel>연도 선택</S.SelectLabel>
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
                        <S.SelectLabel>리그 선택</S.SelectLabel>
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
                        <S.SelectLabel>팀 선택</S.SelectLabel>
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
                        <S.SelectLabel>선수 선택</S.SelectLabel>
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
                        <S.SelectLabel>시즌 선택</S.SelectLabel>
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
              </S.SelectContainer>
            </AccordionDetails>
          </Accordion>
        </div>

        {/* step3 : 패치 선택 */}
        <div css={{ marginBottom: 30 }}>
          <Accordion>
            <AccordionSummary css={{ marginBottom: 8 }} onClick={() => {}}>
              <S.Title>
                <S.TitleLabel>STEP 3</S.TitleLabel>
                <S.Text>패치 선택</S.Text>
              </S.Title>
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
              <S.Title>
                <S.TitleLabel>STEP 4</S.TitleLabel>
                <S.Text>
                  <Avatar
                    src="images/LCK_CL_LOGO/T1.C.png"
                    alt="t1"
                    size={20}
                    block={false}
                  />
                  {"T1"} 플레이한 챔피언 선택
                </S.Text>
              </S.Title>
            </AccordionSummary>
            <AccordionDetails>
              <S.Table>
                <S.Head>
                  <S.Col1>
                    <Checkbox
                      name="step4"
                      value="all"
                      onChange={handleChange}
                      checked={filterState.step4.all}
                    />
                  </S.Col1>
                  <S.Col2>챔피언(경기수)</S.Col2>
                  <S.Col3>진영별</S.Col3>
                  <S.Col3>경기수</S.Col3>
                </S.Head>

                <S.Body>
                  <S.Row isActive={filterState.step4["gnar"]}>
                    {/* 체크 */}
                    <S.Col1>
                      <Checkbox
                        name="step4"
                        value="gnar"
                        onChange={handleChange}
                        checked={filterState.step4.gnar}
                      />
                    </S.Col1>
                    {/* 본문 */}
                    <S.Col2>
                      <S.Champ>
                        <Avatar
                          css={{ marginRight: 5 }}
                          size={20}
                          src="images/champion/teemo.png"
                          alt="티모"
                        />
                        <span>나르 (48)</span>
                      </S.Champ>
                    </S.Col2>

                    {/* 경기수 */}
                    <S.Red>24</S.Red>
                    <S.Blue>24</S.Blue>
                  </S.Row>

                  <S.Row isActive={filterState.step4["teemo"]}>
                    <S.Col1>
                      <Checkbox
                        name="step4"
                        value="teemo"
                        onChange={handleChange}
                        checked={filterState.step4.teemo}
                      />
                    </S.Col1>

                    <S.Col2>
                      <S.Champ>
                        <Avatar
                          css={{ marginRight: 5 }}
                          size={20}
                          src="images/champion/teemo.png"
                          alt="티모"
                        />
                        <span>나르 (48)</span>
                      </S.Champ>
                    </S.Col2>

                    <S.Red>24</S.Red>
                    <S.Blue>24</S.Blue>
                  </S.Row>
                </S.Body>
              </S.Table>
            </AccordionDetails>
          </Accordion>
        </div>

        {/* step5 : 상대팀 플레이한 챔피언 선택 */}
        <div css={{ marginBottom: 30 }}>
          <Accordion>
            <AccordionSummary css={{ marginBottom: 8 }} onClick={() => {}}>
              <S.Title>
                <S.TitleLabel>STEP 5</S.TitleLabel>
                <S.Text>
                  <Avatar
                    src="images/LCK_CL_LOGO/DK.C.png"
                    alt="DK"
                    size={20}
                    block={false}
                  />
                  {`DK`} 플레이한 챔피언 선택
                </S.Text>
              </S.Title>
            </AccordionSummary>
            <AccordionDetails>
              <S.Table>
                <S.Head>
                  <S.Col1>
                    <Checkbox
                      name="step5"
                      value="all"
                      onChange={handleChange}
                      checked={filterState.step5.all}
                    />
                  </S.Col1>
                  <S.Col2>챔피언(경기수)</S.Col2>
                  <S.Col3>진영별</S.Col3>
                  <S.Col3>경기수</S.Col3>
                </S.Head>

                <S.Body>
                  <S.Row isActive={filterState.step5["gnar"]}>
                    {/* 체크 */}
                    <S.Col1>
                      <Checkbox
                        name="step5"
                        value="gnar"
                        onChange={handleChange}
                        checked={filterState.step5.gnar}
                      />
                    </S.Col1>
                    {/* 본문 */}
                    <S.Col2>
                      <S.Champ>
                        <Avatar
                          css={{ marginRight: 5 }}
                          size={20}
                          src="images/champion/teemo.png"
                          alt="티모"
                        />
                        <span>나르 (48)</span>
                      </S.Champ>
                    </S.Col2>

                    {/* 경기수 */}
                    <S.Red>24</S.Red>
                    <S.Blue>24</S.Blue>
                  </S.Row>

                  <S.Row isActive={filterState.step5["teemo"]}>
                    <S.Col1>
                      <Checkbox
                        name="step5"
                        value="teemo"
                        onChange={handleChange}
                        checked={filterState.step5.teemo}
                      />
                    </S.Col1>

                    <S.Col2>
                      <S.Champ>
                        <Avatar
                          css={{ marginRight: 5 }}
                          size={20}
                          src="images/champion/teemo.png"
                          alt="티모"
                        />
                        <span>나르 (48)</span>
                      </S.Champ>
                    </S.Col2>

                    <S.Red>24</S.Red>
                    <S.Blue>24</S.Blue>
                  </S.Row>
                </S.Body>
              </S.Table>
            </AccordionDetails>
          </Accordion>
        </div>
      </S.FilterContainer>

      <S.ButtonContainer>
        <Button
          disabled={data.length <= 0}
          css={[
            buttonStyle.color.main,
            buttonStyle.size.full,
            buttonStyle.size.y_20,
            borderRadiusStyle.full,
            typoStyle.body,
          ]}
        >
          정글링 비교하기
        </Button>
      </S.ButtonContainer>
    </S.Wrapper>
  );
};
export default CompareSideFilter;
