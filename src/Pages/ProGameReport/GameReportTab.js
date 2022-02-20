import React, { memo, useEffect, useState } from 'react';
/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled/macro";
import GameReportDetail from './Components/GameReportDetail';
import GameReportIndex from './Components/GameReportIndex';

const GameReportTab = () => {
  const [activeDetail, setActiveDetail] = useState(false);

  return (
    <div>
      <GameReportIndex
        activeDetail={activeDetail}
        setActiveDetail={setActiveDetail}
      />
    </div>
  )
}

export default memo(GameReportTab);