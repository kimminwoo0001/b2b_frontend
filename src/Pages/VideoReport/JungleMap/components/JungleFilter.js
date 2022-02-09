/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled/macro";
import { useState } from "react";
import Radio from "../../../Components/Ui/Radio";
import Checkbox from "../../../Components/Ui/Checkbox";
import { typoStyle } from "../../../Styles/ui";

const JungleFilter = () => {
  const [filterData, setFilterData] = useState({
    year: 2021,
    league: { all: false, LCK: true, LCKCL: false, LCS: false },
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "radio") {
      setFilterData({ ...filterData, [name]: value });
    }

    if (type === "checkbox") {
      if (value === "all") {
        setFilterData((prev) => {
          const newData = { ...prev };
          for (let key in newData[name]) {
            newData[name][key] = checked;
          }
          return newData;
        });
      } else {
        setFilterData({
          ...filterData,
          [name]: { ...filterData[name], [value]: checked },
        });
      }
    }
  };

  return (
    <SFilterContainer>
      {/* 연도 */}
      <SRow>
        <STitle>연도</STitle>
        <SFilterGroup>
          <Radio
            name="year"
            value={2021}
            onChange={handleChange}
            checked={filterData.year === "2021"}
          >
            2021
          </Radio>
          <Radio
            name="year"
            value={2022}
            onChange={handleChange}
            checked={filterData.year === "2022"}
          >
            2022
          </Radio>
        </SFilterGroup>
      </SRow>

      {/* 리그 */}
      <SRow>
        <STitle>리그</STitle>
        <SFilterGroup>
          <SCheckboxAll
            onChange={handleChange}
            name="league"
            value="all"
            checked={filterData.league.all}
          >
            전체선택
          </SCheckboxAll>
          <Checkbox
            onChange={handleChange}
            name="league"
            value="LCK"
            checked={filterData.league.LCK}
          >
            LCK
          </Checkbox>
          <Checkbox
            onChange={handleChange}
            name="league"
            value="LCKCL"
            checked={filterData.league.LCKCL}
          >
            LCK CL
          </Checkbox>
          <Checkbox
            onChange={handleChange}
            name="league"
            value="LCS"
            checked={filterData.league.LCS}
          >
            LCS
          </Checkbox>
          <Checkbox
            onChange={handleChange}
            name="league"
            value="LEC"
            disabled
            checked={filterData.league.LEC}
          >
            LEC
          </Checkbox>
        </SFilterGroup>
      </SRow>
    </SFilterContainer>
  );
};

const SFilterContainer = styled.section`
  width: 1096px;
  ${typoStyle.contents}
`;
const SRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;
const STitle = styled.div`
  flex: 1;
`;

const SCheckboxAll = styled(Checkbox)``;

const SFilterGroup = styled.div`
  display: flex;
  align-items: center;
  width: 1004px;
  height: 44px;
  ${typoStyle.contents}

  border-radius: 10px;
  background-color: ${(props) => props.theme.colors.bg_box};
  padding-left: 15px;

  label {
    margin-right: 22px;
  }

  ${SCheckboxAll} {
    margin-right: 36px;
  }
`;

export default JungleFilter;
