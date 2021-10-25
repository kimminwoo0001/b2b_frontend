import React, { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";

const SetWardData = ({ wardData }) => {
  console.log(wardData);
  const labelRef = useRef("TOP1");
  const canvasRef = useRef(null);
  const canvas = canvasRef.current;
  const inputRefs1 = useRef([]);
  const inputRefs2 = useRef([]);

  const [cord, setCord] = useState("");
  const [position, setPosition] = useState(0);
  const [currentLocation, setCurrentLocation] = useState(inputRefs1.current);

  // gameid 클릭 시 모든 data의 좌표를 canvas에 그려줌
  const initCanvas = () => {
    if (wardData.length === 0) {
      return;
    }
    const canvas = canvasRef.current;
    canvas.width = 512;
    canvas.height = 512;
    canvas.getContext("2d").fillStyle = "#0000ff";
    for (let i = 0; i < 5; i++) {
      if (wardData[i].firstwardPosition === null) {
        return;
      }
      canvas
        .getContext("2d")
        .fillRect(
          wardData[i].firstwardPosition.split(",")[0],
          wardData[i].firstwardPosition.split(",")[1],
          5,
          5
        );
    }
    canvas.getContext("2d").fillStyle = "#00eeff";
    for (let i = 0; i < 5; i++) {
      if (wardData[i].secondwardPosition === null) {
        return;
      }
      canvas
        .getContext("2d")
        .fillRect(
          wardData[i].secondwardPosition.split(",")[0],
          wardData[i].secondwardPosition.split(",")[1],
          5,
          5
        );
    }

    canvas.getContext("2d").fillStyle = "#ff0000";
    for (let i = 5; i < 10; i++) {
      if (wardData[i].firstwardPosition === null) {
        return;
      }
      canvas
        .getContext("2d")
        .fillRect(
          wardData[i].firstwardPosition.split(",")[0],
          wardData[i].firstwardPosition.split(",")[1],
          5,
          5
        );
    }

    canvas.getContext("2d").fillStyle = "#ff99f9";
    for (let i = 5; i < 10; i++) {
      if (wardData[i].secondwardPosition === null) {
        return;
      }
      canvas
        .getContext("2d")
        .fillRect(
          wardData[i].secondwardPosition.split(",")[0],
          wardData[i].secondwardPosition.split(",")[1],
          5,
          5
        );
    }
  };

  // map 클릭 시 기존 좌표 clear 후 클릭한 좌표 setting
  const handleClickCanvas = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const cordX = e.pageX - ctx.canvas.offsetLeft;
    const cordY = e.pageY - ctx.canvas.offsetTop;

    ctx.clearRect(0, 0, 512, 512);
    const color = () => {
      if (
        currentLocation[position].className.includes("first") &&
        position < 5
      ) {
        return "#0000ff";
      }
      if (
        currentLocation[position].className.includes("first") &&
        position >= 5
      ) {
        return "#ff0000";
      }
      if (
        currentLocation[position].className.includes("second") &&
        position < 5
      ) {
        return "#00eeff";
      }
      if (
        currentLocation[position].className.includes("second") &&
        position >= 5
      ) {
        return "#ff99f9";
      }
    };

    ctx.fillStyle = color();
    ctx.fillRect(cordX, cordY, 5, 5);
    setCord(`${cordX},${cordY}`);
  };

  // setCord 되면 현재 position의 input창의 value값을 cord로 바꿔줌 + war data도 변경
  useEffect(() => {
    if (!cord) {
      return;
    }
    handleUpdate();
    currentLocation[position].value = cord;
  }, [cord]);

  // ward data 배열 업데이트 함수
  const handleUpdate = () => {
    return wardData.map((data) => {
      if (data.firstwardPosition === currentLocation[position].value) {
        data.firstwardPosition = cord;
      }
      if (data.secondwardPosition === currentLocation[position].value) {
        data.secondwardPosition = cord;
      }
      // wardata의 firstwardPosition/secondwardPosition의 값이 null이거나 ""인경우는 어떻게 ????
      return data;
    });
  };

  // input창 클릭 시 해당 value값 표기
  const handleInputClick = (e, id) => {
    setPosition(id);
    const ctx = canvas.getContext("2d");
    const color = () => {
      if (e.target.className.includes("first") && id < 5) {
        return "#0000ff";
      } else if (e.target.className.includes("first") && id >= 5) {
        return "#ff0000";
      } else if (e.target.className.includes("second") && id < 5) {
        return "#00eeff";
      } else if (e.target.className.includes("second") && id >= 5) {
        return "#ff99f9";
      }
    };
    if (ctx) {
      ctx.clearRect(0, 0, 512, 512);
      ctx.fillStyle = color();
      ctx.fillRect(
        e.target.value.split(",")[0],
        e.target.value.split(",")[1],
        5,
        5
      );
    }

    if (e.target.className.includes("second")) {
      setCurrentLocation(inputRefs2.current);
    } else if (e.target.className.includes("first")) {
      setCurrentLocation(inputRefs1.current);
    }
  };

  useEffect(() => {
    if (!wardData) {
      return;
    }
    initCanvas();
    setPosition(0);
    setCurrentLocation(inputRefs1.current);
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
                    className="first"
                    readOnly
                    value={data.firstwardPosition}
                    ref={(ref) => (inputRefs1.current[idx] = ref)}
                    onClick={(e) => handleInputClick(e, idx)}
                  />
                </div>
                <div>
                  <SecondData
                    className="second"
                    readOnly
                    value={data.secondwardPosition}
                    ref={(ref) => (inputRefs2.current[idx] = ref)}
                    onClick={(e) => handleInputClick(e, idx)}
                  />
                </div>
              </DataWrapper>
            );
          })}
          {!wardData && <Message>보고싶은 경기를 검색해주세요.</Message>}
        </DataByPosition>
      </WardDataWrapper>
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
