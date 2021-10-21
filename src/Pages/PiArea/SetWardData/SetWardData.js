import React, { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";

const SetWardData = ({ data }) => {
  const wardData = data[0];
  const labelRef = useRef("TOP1");
  const canvasRef = useRef(null);
  const canvas = canvasRef.current;

  const [dotColor, setDotColor] = useState("#0000ff");
  const [cord, setCord] = useState("");
  const [position, setPosition] = useState(0);

  const inputRefs1 = useRef([]);
  const inputRefs2 = useRef([]);
  inputRefs1.current = [];
  inputRefs2.current = [];

  // gameid 검색 후 클릭 시 모든 좌표를 canvas에 그려줌
  const initCanvas = (data) => {
    if (!data) {
      return;
    }

    const canvas = canvasRef.current;
    canvas.width = 512;
    canvas.height = 512;
    canvas.getContext("2d").fillStyle = "#0000ff";
    for (let i = 0; i < 5; i++) {
      if (data[i].firstwardPosition === null) {
        return;
      }
      canvas
        .getContext("2d")
        .fillRect(
          data[i].firstwardPosition.split(",")[0],
          data[i].firstwardPosition.split(",")[1],
          5,
          5
        );
    }
    canvas.getContext("2d").fillStyle = "#00eeff";
    for (let i = 0; i < 5; i++) {
      if (data[i].secondwardPosition === null) {
        return;
      }
      canvas
        .getContext("2d")
        .fillRect(
          data[i].secondwardPosition.split(",")[0],
          data[i].secondwardPosition.split(",")[1],
          5,
          5
        );
    }

    canvas.getContext("2d").fillStyle = "#ff0000";
    for (let i = 5; i < 10; i++) {
      if (data[i].firstwardPosition === null) {
        return;
      }
      canvas
        .getContext("2d")
        .fillRect(
          data[i].firstwardPosition.split(",")[0],
          data[i].firstwardPosition.split(",")[1],
          5,
          5
        );
    }

    canvas.getContext("2d").fillStyle = "#ff99f9";
    for (let i = 5; i < 10; i++) {
      if (data[i].secondwardPosition === null) {
        return;
      }
      canvas
        .getContext("2d")
        .fillRect(
          data[i].secondwardPosition.split(",")[0],
          data[i].secondwardPosition.split(",")[1],
          5,
          5
        );
    }
  };

  // map 클릭 시 기존 좌표 clear 후 클릭 좌표 SET
  const handleClickCanvas = (e) => {
    const ctx = canvas.getContext("2d");
    const cordX = e.pageX - ctx.canvas.offsetLeft;
    const cordY = e.pageY - ctx.canvas.offsetTop;

    ctx.clearRect(0, 0, 512, 512);
    ctx.fillStyle = dotColor;
    ctx.fillRect(cordX, cordY, 5, 5);
    setCord(`${cordX},${cordY}`);
  };

  // setCord 되면 input창 밸류값을 해당 cord로 바꿔줌
  useEffect(() => {
    if (!cord) {
      return;
    }
    inputRefs1.current[position].value = cord;
  }, [cord]);

  // input창 클릭 시 해당 좌표 표기 + 새로운 좌표값 표기

  const handleFirstInputClick = (e, id) => {
    console.log(inputRefs1.current);
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.clearRect(0, 0, 512, 512);
      ctx.fillStyle = dotColor;
      ctx.fillRect(
        inputRefs1.current[id].value.split(",")[0],
        inputRefs1.current[id].value.split(",")[1],
        5,
        5
      );
    }
    // position 값을 클릭한 input창에 해당하는 값으로 setting
    setPosition(id);

    // eslint-disable-next-line default-case
    switch (id) {
      case 0:
        labelRef.current = "TOP 1";
        break;
      case 1:
        labelRef.current = "JNG 1";
        break;
      case 2:
        labelRef.current = "MID 1";
        break;
      case 3:
        labelRef.current = "BOT 1";
        break;
      case 4:
        labelRef.current = "SUP 1";
        break;
      default:
        labelRef.current = "TOP 1";
    }
  };

  const handleSecondInputClick = (id) => {
    inputRefs2.current[id].value = cord;
  };

  useEffect(() => {
    if (!wardData) {
      return;
    }
    initCanvas(wardData);
  }, [wardData]);

  return (
    <>
      <WardDataWrapper wardData={wardData}>
        {wardData && (
          <MiniMap>
            <PositonLabel>{labelRef.current}</PositonLabel>
            <MapCanvas
              ref={canvasRef}
              onMouseDown={(e) => handleClickCanvas(e)}
            ></MapCanvas>
          </MiniMap>
        )}
        <DataByPosition>
          {/* component화 */}
          {wardData?.map((data, idx) => {
            return (
              <DataWrapper key={idx}>
                <Title changeColor={POSITIONS[idx].includes("BLUE")}>
                  {POSITIONS[idx]}
                </Title>
                <FirstWard>{`${data.firstward} = ${data.firstwardTime}`}</FirstWard>
                <SecondWard>{`${data.secondward} = ${data.secondwardTime}`}</SecondWard>
                <div>
                  <FirstData
                    readOnly
                    value={
                      data.firstwardPosition === null
                        ? "null"
                        : inputRefs1.current.value
                        ? inputRefs1.current.value
                        : data.firstwardPosition
                    }
                    ref={(ref) => (inputRefs1.current[idx] = ref)}
                    onClick={(e) => handleFirstInputClick(e, idx)}
                  />
                </div>
                <div>
                  <SecondData
                    readOnly
                    value={
                      data.secondwardPosition === null
                        ? "null"
                        : data.secondwardPosition
                    }
                    ref={(ref) => (inputRefs2.current[idx] = ref)}
                    // onClick={() => handleSecondInputClick(idx)}
                  />
                </div>
              </DataWrapper>
            );
          })}
          {!wardData && <Message>보고싶은 경기를 검색해주세요.</Message>}
        </DataByPosition>
      </WardDataWrapper>
      {wardData && <SubmitBtn>저장하기</SubmitBtn>}
    </>
  );
};
const POSITIONS = [
  "BLUE TOP",
  "BLUE JNG",
  "BLUE MID",
  "BLUE BOT",
  "BLUE SUP",
  "RED TOP",
  "RED JNG",
  "RED MID",
  "RED BOT",
  "RED SUP",
];

export default SetWardData;

const WardDataWrapper = styled.section`
  ${(props) =>
    props.wardData &&
    css`
      display: flex;
      align-items: baseline;
      justify-content: space-around;
    `}
  height: 700px;
`;

const MiniMap = styled.div`
  width: 512px;
  height: 512px;
`;

const PositonLabel = styled.div`
  color: #fff;
  margin-bottom: 10px;
  text-align: center;
  font-size: 20px;
`;

const MapCanvas = styled.canvas`
  background: no-repeat url("/Images/newmap.png") center/cover;
`;

const DataByPosition = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  flex-flow: column wrap;
`;

const DataWrapper = styled.div`
  text-align: center;
  margin: 10px 0;
`;

const Title = styled.h2`
  font-weight: bold;
  margin: 5px 0;
  color: ${(props) => (props.changeColor ? `blue` : `red`)};
`;

const FirstWard = styled.h3`
  color: #fff;
`;

const SecondWard = styled.h3`
  color: #fff;
`;

const FirstData = styled.input`
  width: 70%;
  padding: 0 5px;
  margin: 5px 0;
  border-radius: 5px;
  background-color: #fff;
`;

const SecondData = styled.input`
  width: 70%;
  padding: 0 5px;
  background-color: #fff;
  border-radius: 5px;
`;

const Message = styled.div`
  color: #fff;
  font-size: 24px;
  font-weight: bold;
`;

const SubmitBtn = styled.button`
  background-color: #fff;
  width: 100%;
  border-radius: 5px;
  padding: 10px;
  font-weight: bold;
  &:hover {
    color: #fff;
    background-color: #5942ba;
  }
`;
