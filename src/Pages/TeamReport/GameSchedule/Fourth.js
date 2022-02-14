import React, { useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import CustomWinRate from "./CustomWinRate";

function Fourth({ weekData4 }) {
  const [customOpen, setCustomOpen] = useState(false);
  const { t } = useTranslation();

  const toggleCustom = (index) => {
    index === customOpen ? setCustomOpen(0) : setCustomOpen(index);
  };
  return (
    <WeekTabWrapper>
      {weekData4.length > 0 ? (
        weekData4.map((el, index) => {
          return (
            <CustomWinRate
              index={index + 1}
              key={index}
              el={el}
              toggleCustom={toggleCustom}
              setCustomOpen={setCustomOpen}
              customOpen={customOpen}
            />
          );
        })
      ) : (
        <NoSchedule>
          <img src="Images/img-no-contents.png" alt="no-game" />
          <NoGameLabel>{t("league.schedule.nogame")}</NoGameLabel>
          <NoGameSmall>
            {t("league.schedule.nogame2")} <br />
            {t("league.schedule.nogame3")}
          </NoGameSmall>
        </NoSchedule>
      )}
    </WeekTabWrapper>
  );
}

export default Fourth;

const WeekTabWrapper = styled.div``;
const NoSchedule = styled.div`
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const NoGameLabel = styled.div`
  font-family: NotoSansKR, Apple SD Gothic Neo;
  font-size: 15px;
  font-weight: bold;
  letter-spacing: -0.75px;
  text-align: center;
  color: #ffffff;
  margin: 20px 0 20px 0;
`;

const NoGameSmall = styled.div`
  height: 34px;
  font-family: NotoSansKR, Apple SD Gothic Neo;
  font-size: 12px;
  line-height: 1.25;
  letter-spacing: -0.6px;
  text-align: center;
  color: #827f8c;
`;
