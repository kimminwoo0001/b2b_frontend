/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled/macro";
import MTHeader from "../Component/MyTeam/MTHeader";
import MTContent from "../Component/MyTeam/MTContent";

const MyTeam = () => {
  return (
    <>
      {/* 팀 정보 헤더 */}
      <MTHeader />

      {/* 팀 선수 테이블 */}
      <MTContent />
    </>
  );
};

export default MyTeam;
