import React from "react";
import styled from "styled-components";

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
