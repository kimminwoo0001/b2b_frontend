import React, { useEffect, useRef, useState } from "react";
/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled/macro";
import secToMS from "../../lib/secToMS";

const Timer = ({ time, timeOutFunc }) => {
  const [sec, setSec] = useState(180);
  //const value = secToMS(time);

  useEffect(() => {
    const countdown = setInterval(() => {
      if (parseInt(sec) > 0) {
        setSec(time - new Date().getTime() / 1000);
      } else {
        setSec(0);
        clearInterval(countdown);
        timeOutFunc(true);
      }
    }, 500);
    return () => clearInterval(countdown);
  }, [sec]);

  return <TimerContainer>{secToMS(sec)}</TimerContainer>;
};

export default Timer;

const TimerContainer = styled.div`
  margin-right: 20px;
  font-family: SpoqaHanSansNeo;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  color: #f04545;
  line-height: 1;
`;
