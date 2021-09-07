import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Tooltips from "./Tooltips";
// import "tippy.js/dist/tippy.css";
// import { Tooltip } from "react-tippy";
// import "react-tippy/dist/tippy.css";
import Tippy from "@tippy.js/react";

function All({ phase1, phase2, phase2_1, phase2_2 }) {
  //팀 보고서 => 밴픽 보고서 => 백핀 지표
  const { t } = useTranslation();
  const lang = useSelector((state) => state.LocaleReducer);
  const teampicks = useSelector((state) => state.BanPickReducer);
  return (
    <div>
      <SelectedPosition>
        <TableTitle>{t("team.draft.order")}</TableTitle>
        <TableHeader>
          <span className="First">1st PICK</span>
          <span className="First">2nd PICK</span>
          <span className="First">3rd PICK</span>
          <span className="First">4th PICK</span>
          <span className="First">5th PICK</span>
        </TableHeader>
        <TableWrapper2>
          <TableContents2>
            {teampicks.pick1?.map((pick, idx) => {
              return (
                <StyledTippy
                  // options
                  duration={0}
                  delay={[100, 0]}
                  content={<Tooltips pick={pick} />}
                  placement="bottom"
                  key={idx}
                >
                  <MapPickData>
                    <img
                      src={`Images/ico-position-${pick.iconFileName}`}
                      width="13px"
                      height="13px"
                      alt="posIcon"
                    />
                    <div className="Position">{pick.position}</div>
                    <div className="Total">{`${pick.totalPercent.toFixed(
                      1
                    )}% (${pick.total})`}</div>
                  </MapPickData>
                </StyledTippy>
              );
            })}
          </TableContents2>
          <TableContents2>
            {teampicks.pick2?.map((pick, idx) => {
              return (
                <StyledTippy
                  // options
                  duration={0}
                  delay={[100, 0]}
                  content={<Tooltips pick={pick} />}
                  placement="bottom"
                  key={idx}
                >
                  <MapPickData>
                    <img
                      src={`Images/ico-position-${pick.iconFileName}`}
                      width="13px"
                      height="13px"
                      alt="posIcon"
                    />
                    <div className="Position">{pick.position}</div>
                    <div className="Total">{`${pick.totalPercent.toFixed(
                      1
                    )}% (${pick.total})`}</div>
                  </MapPickData>
                </StyledTippy>
              );
            })}
          </TableContents2>
          <TableContents2>
            {teampicks.pick3?.map((pick, idx) => {
              return (
                <StyledTippy
                  // options
                  duration={0}
                  delay={[100, 0]}
                  content={<Tooltips pick={pick} />}
                  placement="bottom"
                  key={idx}
                >
                  <MapPickData>
                    <img
                      src={`Images/ico-position-${pick.iconFileName}`}
                      width="13px"
                      height="13px"
                      alt="posIcon"
                    />
                    <div className="Position">{pick.position}</div>
                    <div className="Total">{`${pick.totalPercent.toFixed(
                      1
                    )}% (${pick.total})`}</div>
                  </MapPickData>
                </StyledTippy>
              );
            })}
          </TableContents2>
          <TableContents2>
            {teampicks.pick4?.map((pick, idx) => {
              return (
                <StyledTippy
                  // options
                  duration={0}
                  delay={[100, 0]}
                  content={<Tooltips pick={pick} />}
                  placement="bottom"
                  key={idx}
                >
                  <MapPickData>
                    <img
                      src={`Images/ico-position-${pick.iconFileName}`}
                      width="13px"
                      height="13px"
                      alt="posIcon"
                    />
                    <div className="Position">{pick.position}</div>
                    <div className="Total">{`${pick.totalPercent.toFixed(
                      1
                    )}% (${pick.total})`}</div>
                  </MapPickData>
                </StyledTippy>
              );
            })}
          </TableContents2>
          <TableContents2>
            {teampicks.pick5?.map((pick, idx) => {
              return (
                <StyledTippy
                  // options
                  duration={0}
                  delay={[100, 0]}
                  content={<Tooltips pick={pick} />}
                  placement="bottom"
                  key={idx}
                >
                  <MapPickData>
                    <img
                      src={`Images/ico-position-${pick.iconFileName}`}
                      width="13px"
                      height="13px"
                      alt="posIcon"
                    />
                    <div className="Position">{pick.position}</div>
                    <div className="Total">{`${pick.totalPercent.toFixed(
                      1
                    )}% (${pick.total})`}</div>
                  </MapPickData>
                </StyledTippy>
              );
            })}
          </TableContents2>
        </TableWrapper2>
      </SelectedPosition>
      <SelectedWinRate>
        <TableTitle>{t("team.draft.mostban")}</TableTitle>
        <TableHeader>
          <span className="First">1st BAN</span>
          <span className="First">2nd BAN</span>
          <span className="First">3rd BAN</span>
          <span className="First">4th BAN</span>
          <span className="First">5th BAN</span>
        </TableHeader>
        <TableWrapper>
          <TableContents>
            {teampicks.ban1?.map((ban, idx) => {
              return (
                <MapBanData key={idx}>
                  <img
                    src={`Images/champion/${ban.champFileName}.png`}
                    width="19px"
                    height="19px"
                    style={{ borderRadius: "30px" }}
                    alt="posIcon"
                  />
                  <div className="Champion">
                    {lang === "kr" ? ban.champion : ban.champFileName}
                  </div>
                  <div className="Rate">
                    {ban.rate ? `${ban.rate.toFixed(1)}%` : 0}
                  </div>
                </MapBanData>
              );
            })}
          </TableContents>
          <TableContents>
            {teampicks.ban2?.map((ban, idx) => {
              return (
                <MapBanData key={idx}>
                  <img
                    src={`Images/champion/${ban.champFileName}.png`}
                    width="19px"
                    height="19px"
                    style={{ borderRadius: "30px" }}
                    alt="posIcon"
                  />
                  <div className="Champion">
                    {lang === "kr" ? ban.champion : ban.champFileName}
                  </div>
                  <div className="Rate">
                    {ban.rate ? `${ban.rate.toFixed(1)}%` : 0}
                  </div>
                </MapBanData>
              );
            })}
          </TableContents>
          <TableContents>
            {teampicks.ban3?.map((ban, idx) => {
              return (
                <MapBanData key={idx}>
                  <img
                    src={`Images/champion/${ban.champFileName}.png`}
                    width="19px"
                    height="19px"
                    style={{ borderRadius: "30px" }}
                    alt="posIcon"
                  />
                  <div className="Champion">
                    {lang === "kr" ? ban.champion : ban.champFileName}
                  </div>
                  <div className="Rate">
                    {ban.rate ? `${ban.rate.toFixed(1)}%` : 0}
                  </div>
                </MapBanData>
              );
            })}
          </TableContents>
          <TableContents>
            {teampicks.ban4?.map((ban, idx) => {
              return (
                <MapBanData key={idx}>
                  <img
                    src={`Images/champion/${ban.champFileName}.png`}
                    width="19px"
                    height="19px"
                    style={{ borderRadius: "30px" }}
                    alt="posIcon"
                  />
                  <div className="Champion">
                    {lang === "kr" ? ban.champion : ban.champFileName}
                  </div>
                  <div className="Rate">
                    {ban.rate ? `${ban.rate.toFixed(1)}%` : 0}
                  </div>
                </MapBanData>
              );
            })}
          </TableContents>
          <TableContents>
            {teampicks.ban5?.map((ban, idx) => {
              return (
                <MapBanData key={idx}>
                  <img
                    src={`Images/champion/${ban.champFileName}.png`}
                    width="19px"
                    height="19px"
                    style={{ borderRadius: "30px" }}
                    alt="posIcon"
                  />
                  <div className="Champion">
                    {lang === "kr" ? ban.champion : ban.champFileName}
                  </div>
                  <div className="Rate">
                    {ban.rate ? `${ban.rate.toFixed(1)}%` : 0}
                  </div>
                </MapBanData>
              );
            })}
          </TableContents>
        </TableWrapper>
      </SelectedWinRate>
      <SelectedWinRate>
        <TableTitle>{t("team.draft.mostbanned")}</TableTitle>
        <TableHeader>
          <span className="First">1st BAN</span>
          <span className="First">2nd BAN</span>
          <span className="First">3rd BAN</span>
          <span className="First">4th BAN</span>
          <span className="First">5th BAN</span>
        </TableHeader>
        <TableWrapper>
          <TableContents>
            {teampicks.baned1?.map((ban, idx) => {
              return (
                <MapBanData key={idx}>
                  <img
                    src={`Images/champion/${ban.champFileName}.png`}
                    width="19px"
                    height="19px"
                    style={{ borderRadius: "30px" }}
                    alt="posIcon"
                  />
                  <div className="Champion">
                    {lang === "kr" ? ban.champion : ban.champFileName}
                  </div>
                  <div className="Rate">
                    {ban.rate ? `${ban.rate.toFixed(1)}%` : 0}
                  </div>
                </MapBanData>
              );
            })}
          </TableContents>
          <TableContents>
            {teampicks.baned2?.map((ban, idx) => {
              return (
                <MapBanData key={idx}>
                  <img
                    src={`Images/champion/${ban.champFileName}.png`}
                    width="19px"
                    height="19px"
                    style={{ borderRadius: "30px" }}
                    alt="posIcon"
                  />
                  <div className="Champion">
                    {lang === "kr" ? ban.champion : ban.champFileName}
                  </div>
                  <div className="Rate">
                    {ban.rate ? `${ban.rate.toFixed(1)}%` : 0}
                  </div>
                </MapBanData>
              );
            })}
          </TableContents>
          <TableContents>
            {teampicks.baned3?.map((ban, idx) => {
              return (
                <MapBanData key={idx}>
                  <img
                    src={`Images/champion/${ban.champFileName}.png`}
                    width="19px"
                    height="19px"
                    style={{ borderRadius: "30px" }}
                    alt="posIcon"
                  />
                  <div className="Champion">
                    {lang === "kr" ? ban.champion : ban.champFileName}
                  </div>
                  <div className="Rate">
                    {ban.rate ? `${ban.rate.toFixed(1)}%` : 0}
                  </div>
                </MapBanData>
              );
            })}
          </TableContents>
          <TableContents>
            {teampicks.baned4?.map((ban, idx) => {
              return (
                <MapBanData key={idx}>
                  <img
                    src={`Images/champion/${ban.champFileName}.png`}
                    width="19px"
                    height="19px"
                    style={{ borderRadius: "30px" }}
                    alt="posIcon"
                  />
                  <div className="Champion">
                    {lang === "kr" ? ban.champion : ban.champFileName}
                  </div>
                  <div className="Rate">
                    {ban.rate ? `${ban.rate.toFixed(1)}%` : 0}
                  </div>
                </MapBanData>
              );
            })}
          </TableContents>
          <TableContents>
            {teampicks.baned5?.map((ban, idx) => {
              return (
                <MapBanData key={idx}>
                  <img
                    src={`Images/champion/${ban.champFileName}.png`}
                    width="19px"
                    height="19px"
                    style={{ borderRadius: "30px" }}
                    alt="posIcon"
                  />
                  <div className="Champion">
                    {lang === "kr" ? ban.champion : ban.champFileName}
                  </div>
                  <div className="Rate">
                    {ban.rate ? `${ban.rate.toFixed(1)}%` : 0}
                  </div>
                </MapBanData>
              );
            })}
          </TableContents>
        </TableWrapper>
      </SelectedWinRate>
      <PhaseContainer>
        <PhaseTable>
          <PhaseTitle>{t("team.draft.mostban")}</PhaseTitle>
          <PhaseHeader>
            <span className="First">Phase 1</span>
          </PhaseHeader>
          <PhaseWrapper>
            <PhaseContents>
              {phase1?.map((phase, idx) => {
                return (
                  <MapPhaseData key={idx}>
                    <img
                      src={`Images/champion/${phase.champion}.png`}
                      width="19px"
                      height="19px"
                      style={{ borderRadius: "30px" }}
                      alt="posIcon"
                    />
                    <div className="Champion">
                      {lang === "kr" ? phase.champion : phase.champion}
                    </div>
                    <div className="Rate">
                      {phase.value ? `${phase.value}` : 0}
                    </div>
                  </MapPhaseData>
                );
              })}
            </PhaseContents>
          </PhaseWrapper>
        </PhaseTable>
        <PhaseTable>
          <PhaseTitle>{t("team.draft.mostban")}</PhaseTitle>
          <PhaseHeader>
            <span className="First">Phase 2</span>
          </PhaseHeader>
          <PhaseWrapper>
            <PhaseContents>
              {phase2?.map((phase, idx) => {
                return (
                  <MapPhaseData key={idx}>
                    <img
                      src={`Images/champion/${phase.champion}.png`}
                      width="19px"
                      height="19px"
                      style={{ borderRadius: "30px" }}
                      alt="posIcon"
                    />
                    <div className="Champion">
                      {lang === "kr" ? phase.champion : phase.champion}
                    </div>
                    <div className="Rate">
                      {phase.value ? `${phase.value}` : 0}
                    </div>
                  </MapPhaseData>
                );
              })}
            </PhaseContents>
          </PhaseWrapper>
        </PhaseTable>
      </PhaseContainer>

      <PhaseContainer>
        <PhaseTable>
          <PhaseTitle>{t("team.draft.mostbaned")}</PhaseTitle>
          <PhaseHeader>
            <span className="First">Phase 1</span>
          </PhaseHeader>
          <PhaseWrapper>
            <PhaseContents>
              {phase2_1?.map((phase, idx) => {
                return (
                  <MapPhaseData key={idx}>
                    <img
                      src={`Images/champion/${phase.champion}.png`}
                      width="19px"
                      height="19px"
                      style={{ borderRadius: "30px" }}
                      alt="posIcon"
                    />
                    <div className="Champion">
                      {lang === "kr" ? phase.champion : phase.champion}
                    </div>
                    <div className="Rate">
                      {phase.value ? `${phase.value}` : 0}
                    </div>
                  </MapPhaseData>
                );
              })}
            </PhaseContents>
          </PhaseWrapper>
        </PhaseTable>
        <PhaseTable>
          <PhaseTitle>{t("team.draft.mostbaned")}</PhaseTitle>
          <PhaseHeader>
            <span className="First">Phase 2</span>
          </PhaseHeader>
          <PhaseWrapper>
            <PhaseContents>
              {phase2_2?.map((phase, idx) => {
                return (
                  <MapPhaseData key={idx}>
                    <img
                      src={`Images/champion/${phase.champion}.png`}
                      width="19px"
                      height="19px"
                      style={{ borderRadius: "30px" }}
                      alt="posIcon"
                    />
                    <div className="Champion">
                      {lang === "kr" ? phase.champion : phase.champion}
                    </div>
                    <div className="Rate">
                      {phase.value ? `${phase.value}` : 0}
                    </div>
                  </MapPhaseData>
                );
              })}
            </PhaseContents>
          </PhaseWrapper>
        </PhaseTable>
      </PhaseContainer>
    </div>
  );
}

export default All;

const SelectedPosition = styled.div`
  width: 100%;
  min-height: 155px;
  border: solid 1px #3a3745;
  background-color: #2f2d38;
`;

const SelectedWinRate = styled.div`
  margin-top: 23.5px;
  width: 100%;
  min-height: 155px;
  border: solid 1px #3a3745;
  background-color: #2f2d38;
`;

const TableTitle = styled.div`
  padding: 13px 15px;
  color: #6b6979;
  font-family: Poppins;
  font-size: 13px;
  font-weight: bold;
`;

const TableHeader = styled.div`
  display: flex;
  /* justify-content: space-around; */
  align-items: center;
  width: 100%;
  padding: 6px 0px 5px 15px;
  height: 28px;
  background-color: rgb(58, 55, 69);
  font-family: Poppins;
  font-size: 12px;
  font-weight: bold;
  text-align: left;
  color: #817e90;
  .First {
    width: 216px;
  }
`;
const TableWrapper = styled.div`
  display: flex;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 5px;
    height: 10px;

    border-radius: 3px;
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #696777;
    border-radius: 3px;
  }
  /* padding-left: 15px; */
`;

const TableWrapper2 = styled.div`
  display: flex;
`;
const StyledTippy = styled(Tippy)``;

const TableContents2 = styled.div`
  display: flex;
  width: 219px;
  min-height: 84px;
  flex-direction: column;
`;

const TableContents = styled.div`
  display: flex;
  width: 219px;
  min-height: 84px;
  max-height: 290px;
  flex-direction: column;
`;

const MapPickData = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #3a3745;
  padding: 7.5px 0 7.5px 15px;
  cursor: pointer;

  .Position {
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 12px;
    margin-left: 15px;
    letter-spacing: -0.6px;
    text-align: left;
    color: #ffffff;
    width: 105px;
  }
  .Total {
    font-family: Poppins;
    font-size: 12px;
    width: 80px;
    color: #f04545;
    /* width: 20px; */
    text-align: center;
  }
`;

const MapBanData = styled.div`
  display: flex;
  align-items: center;
  padding: 4.5px 0 4.5px 15px;
  border-bottom: 1px solid #3a3745;
  .Champion {
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 12px;
    letter-spacing: -0.6px;
    text-align: left;
    color: #ffffff;
    width: 105px;
    margin-left: 8px;
  }
  .Rate {
    font-family: Poppins;
    font-size: 12px;
    text-align: center;
    color: #f04545;
    width: 50px;
  }
`;

const PhaseContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const PhaseTable = styled(SelectedWinRate)`
  width: 49%;
`;

const PhaseTitle = styled(TableTitle)`
  width: 50%;
`;

const PhaseHeader = styled(TableHeader)`
  width: 100%;
  > .First {
    width: 100%;
  }
`;

const PhaseWrapper = styled(TableWrapper)``;

const PhaseContents = styled(TableContents)`
  display: flex;
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
`;

const MapPhaseData = styled(MapBanData)`
  width: 178.5px;
`;
