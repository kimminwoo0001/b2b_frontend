import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Form, Icon, Label, Menu, Table } from "semantic-ui-react";

const SetPiData = ({ piData }) => {
  const piObj = piData[0];
  const values = Object.values(piObj);
  const newPiData = [];

  const inputRef = useRef([]);
  const rowRef = useRef([]);
  const [totalData, setTotalData] = useState();
  const [input, setInput] = useState("");
  const [inputlocation, setInputLocation] = useState(0);
  const [currentLocation, setCurrentLocation] = useState(inputRef.current);

  //   const [rowlocation, setRowLocation] = useState(0);

  const handleValues = () => {
    for (let i = 0; i < values.length; i += 11) {
      newPiData.push(values.slice(i, i + 11));
    }
  };

  const handleClick = (e, idx) => {
    setInputLocation(idx);
    // console.log(currentLocation);
    // if (inputlocation === idx && POSITIONS2[idx] === "blue_top") {
    //   currentLocation[idx].value = input;
    // }
  };

  const handleInput = (e, idx) => {
    // input과 동시에 data 바꾸기
    const value = e.target.value;
    setInput(value);
  };

  useEffect(() => {
    if (!piData) {
      return;
    }
    handleValues();
    if (newPiData) {
      setTotalData(newPiData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          {totalData?.map((data, idx) => {
            return (
              <Table.Row
                key={idx}
                ref={(ref) => (rowRef.current[idx] = ref)}
                // onClick={(e) => handleClick(e, idx)}
              >
                <Table.Cell>{POSITIONS2[idx]}</Table.Cell>
                {data?.map((data2, idx2) => {
                  return (
                    <Table.Cell>
                      <Form.Input
                        value={input ? input : data2}
                        onClick={(e) => handleClick(e, idx2)}
                        onChange={(e) => handleInput(e, idx2)}
                        ref={(ref) => (inputRef.current[idx2] = ref)}
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
