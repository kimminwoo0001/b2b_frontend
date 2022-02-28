import React, { useEffect, useRef, useState, useCallback } from "react";
/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled/macro";
import { Form, Icon, Label, Menu, Table } from "semantic-ui-react";
const _piColumnsCount = 11; // pi 컬럼 갯수
const _piRowsCount = 10; // pi 로우 갯수


const SetPiData = ({ piData, setPi }) => {
  const piObj = piData[0];
  const values = Object.values(piObj);
  const [newPiData, setNewPiData] = useState([]);
  const inputRef = useRef([]);
  const rowRef = useRef([]);
  //const [totalData, setTotalData] = useState();
  //const [input, setInput] = useState([]);
  const [inputlocation, setInputLocation] = useState(0);
  const [currentLocation, setCurrentLocation] = useState(inputRef.current);

  useEffect(() => {
    handleValues();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!piData) {
      return;
    }
    if (newPiData.length > 0) {
      console.log("newPiData", newPiData);
      //setTotalData(newPiData);

    }
  }, [newPiData, inputlocation])

  const handleValues = () => {
    if (values.length === 0) {
      let totalAry = []
      for (let i = 0; i < _piRowsCount; i++) {
        let rowAry = [];
        for (let j = 0; j < _piColumnsCount; j++) {
          rowAry.push(0);
        }
        totalAry.push(rowAry);
      }
      setNewPiData(totalAry);
    } else {
      let totalAry = []
      for (let i = 0; i < values.length; i += _piColumnsCount) {
        if ([null, ""].includes(values.slice(i, i + _piColumnsCount))) {
          let rowAry = [];
          for (let j = 0; j < _piColumnsCount; j++) {
            rowAry.push(0);
          }
          totalAry.push(rowAry);
        } else {
          totalAry.push(values.slice(i, i + _piColumnsCount));
        }
      }
      setNewPiData(totalAry);
    }
  };

  const handleClick = (e, idx, cell) => {
    console.log(cell)
    setInputLocation(idx);
    // console.log(currentLocation);
    // if (inputlocation === idx && POSITIONS2[idx] === "blue_top") {
    //   currentLocation[idx].value = input;
    // }
  };

  const handleInput = (e, row, col) => {
    // input과 동시에 data 바꾸기
    let value = Number(e.target.value);
    if (isNaN(value)) {
      return;
    }

    console.log("value", value);

    let totalAry = newPiData;
    totalAry[row][col] = value;
    setNewPiData([
      ...totalAry]);
    setInputLocation(row);
    setPi([newPiData.flat(Infinity)]);
    //setTotalData(newPiData);
    //setInput(value);
  };


  return (
    <TableWrapper>
      <Table celled style={{ border: "2px solid #fff", color: "black" }}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>position</Table.HeaderCell>
            {POSITIONS1.map((position) => {
              return <Table.HeaderCell>{position}</Table.HeaderCell>;
            })}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {newPiData?.map((data, row) => {
            { console.log(newPiData) }
            return (
              <Table.Row
                key={row}
                ref={(ref) => (rowRef.current[row] = ref)}>
                <Table.Cell>{POSITIONS2[row]}</Table.Cell>
                {data?.map((data2, col) => {
                  return (
                    <Table.Cell>
                      <Form.Input
                        value={newPiData[row][col]}
                        onClick={(e) => handleClick(e, row, col)}
                        onChange={(e) => handleInput(e, row, col)}
                        ref={(ref) => (inputRef.current[col] = ref)}
                      />
                    </Table.Cell>
                  );
                })}
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </TableWrapper>
  );
};

export default SetPiData;

const POSITIONS1 = [
  "supporting_count",
  "match_parti",
  "match_total",
  "match_ic_sum",
  "playmaking",
  "gank_avoid_count",
  "first_gank_time",
  "first_gank_line",
  "gank_suc",
  "gank_waste",
  "gank_count",
];

const POSITIONS2 = [
  "blue_top",
  "blue_jng",
  "blue_mid",
  "blue_bot",
  "blue_sup",
  "red_top",
  "red_jng",
  "red_mid",
  "red_bot",
  "red_sup",
];
const TableWrapper = styled.div`
  overflow: scroll;
  width: 1000px;
  background-color: #fff;
`;
