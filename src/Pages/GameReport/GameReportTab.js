import React, { memo, useEffect, useState } from 'react';
import styled, { css } from "styled-components";
import GameReportDetail from './Components/GameReportDetail';
import GameReportIndex from './Components/GameReportIndex';

const GameReportTab = () => {
  const [activeDetail, setActiveDetail] = useState(false);

  return (
    <div>
      {activeDetail ?
        <GameReportDetail
          activeDetail={activeDetail}
          setActiveDetail={setActiveDetail}
        />
        :
        <GameReportIndex
          activeDetail={activeDetail}
          setActiveDetail={setActiveDetail}
        />}
    </div>
  )
}

export default memo(GameReportTab);