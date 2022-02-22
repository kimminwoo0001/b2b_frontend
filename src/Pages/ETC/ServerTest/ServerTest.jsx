import React from "react";
/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled/macro";

function ServerTest() {
  document.title = `Server Test Page - NUNU.GG`;

  return (
    <LeagueWrapper>
      <div className="On">On</div>
      <div
        className="home"
        onClick={() => {
          window.location.href = "/";
        }}
      >
        Go to Home
      </div>
    </LeagueWrapper>
  );
}

export default ServerTest;

const LeagueWrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;

  .on {
    width: 100%;
  }
`;
