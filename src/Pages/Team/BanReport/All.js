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
        <TableTitle>
          <span className="header-name">{t("team.draft.order")}</span>
        </TableTitle>
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
        <TableTitle>
          <span className="header-name">{t("team.draft.mostban")}</span>
        </TableTitle>
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
                    {lang === "ko" ? ban.champion : ban.champFileName}
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
                    {lang === "ko" ? ban.champion : ban.champFileName}
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
                    {lang === "ko" ? ban.champion : ban.champFileName}
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
                    {lang === "ko" ? ban.champion : ban.champFileName}
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
                    {lang === "ko" ? ban.champion : ban.champFileName}
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
        <TableTitle>
          <span className="header-name">{t("team.draft.mostbanned")}</span>
        </TableTitle>
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
                    {lang === "ko" ? ban.champion : ban.champFileName}
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
                    {lang === "ko" ? ban.champion : ban.champFileName}
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
                    {lang === "ko" ? ban.champion : ban.champFileName}
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
                    {lang === "ko" ? ban.champion : ban.champFileName}
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
                    {lang === "ko" ? ban.champion : ban.champFileName}
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
          <PhaseTitle>
            <span className="header-name">{t("team.draft.mostban")}</span>
          </PhaseTitle>
          <PhaseHeader>
            <span className="First">Phase 1</span>
          </PhaseHeader>
          <PhaseWrapper>
            <PhaseContents>
              {phase1?.map((phase, idx) => {
                console.log(phase);
                return (
                  <MapPhaseData key={idx}>
                    <img
                      src={`Images/champion/${phase.key}.png`}
                      width="19px"
                      height="19px"
                      style={{ borderRadius: "30px" }}
                      alt="posIcon"
                    />
                    <div className="Champion">
                      {lang === "ko" ? phase.champion : phase.key}
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
          <PhaseTitle>
            <span className="header-name">{t("team.draft.mostban")}</span>
          </PhaseTitle>
          <PhaseHeader>
            <span className="First">Phase 2</span>
          </PhaseHeader>
          <PhaseWrapper>
            <PhaseContents>
              {phase2?.map((phase, idx) => {
                return (
                  <MapPhaseData key={idx}>
                    <img
                      src={`Images/champion/${phase.key}.png`}
                      width="19px"
                      height="19px"
                      style={{ borderRadius: "30px" }}
                      alt="posIcon"
                    />
                    <div className="Champion">
                      {lang === "ko" ? phase.champion : phase.key}
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
          <PhaseTitle>
            <span className="header-name">{t("team.draft.mostbaned")}</span>
          </PhaseTitle>
          <PhaseHeader>
            <span className="First">Phase 1</span>
          </PhaseHeader>
          <PhaseWrapper>
            <PhaseContents>
              {phase2_1?.map((phase, idx) => {
                return (
                  <MapPhaseData key={idx}>
                    <img
                      src={`Images/champion/${phase.key}.png`}
                      width="19px"
                      height="19px"
                      style={{ borderRadius: "30px" }}
                      alt="posIcon"
                    />
                    <div className="Champion">
                      {lang === "ko" ? phase.champion : phase.key}
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
          <PhaseTitle>
            <span className="header-name">{t("team.draft.mostbaned")}</span>
          </PhaseTitle>
          <PhaseHeader>
            <span className="First">Phase 2</span>
          </PhaseHeader>
          <PhaseWrapper>
            <PhaseContents>
              {phase2_2?.map((phase, idx) => {
                return (
                  <MapPhaseData key={idx}>
                    <img
                      src={`Images/champion/${phase.key}.png`}
                      width="19px"
                      height="19px"
                      style={{ borderRadius: "30px" }}
                      alt="posIcon"
                    />
                    <div className="Champion">
                      {lang === "ko" ? phase.champion : phase.key}
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
  margin-top: 30px;
  width: 100%;
  min-height: 155px;
  border: solid 1px #3a3745;
  background-color: #2f2d38;
  border-radius: 20px;
`;

const SelectedWinRate = styled.div`
  margin-top: 23.5px;
  width: 100%;
  min-height: 155px;
  border: solid 1px #3a3745;
  background-color: #2f2d38;
  border-radius: 20px;
`;

const TableTitle = styled.div`
  width: 100%;
  height: 50.5px;
  padding: 19.5px 0 0 21px;
  border-bottom: 1px solid rgb(35, 33, 42);
  font-family: Poppins;
  color: #84818e;
  font-size: 13px;
  font-weight: bold;
  .header-name {
    font-size: 16px;
    color: #fff;
  }
`;

const TableHeader = styled.div`
  display: flex;
  /* justify-content: space-around; */
  align-items: center;
  width: 100%;
  padding: 6px 0px 5px 15px;
  height: 28px;
  background-color: rgb(58, 55, 69);
  font-size: 15px;
  font-family: SpoqaHanSansNeo;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
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
  max-height: 290px;
  flex-direction: column;
`;

const MapPickData = styled.div`
  display: flex;
  align-items: center;
  border-top: 1px solid #3a3745;
  padding: 7.5px 0 7.5px 15px;
  cursor: pointer;
  height: 30px;

  .Position {
    font-family: SpoqaHanSansNeo;
    font-size: 15px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.87;
    letter-spacing: normal;
    text-align: left;
    color: #fff;
    margin-left: 15px;
    width: 105px;
  }
  .Total {
    font-family: SpoqaHanSansNeo;
    font-size: 15px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.87;
    letter-spacing: normal;
    width: 80px;
    color: #f04545;
    /* width: 20px; */
    text-align: center;
    margin-right: 10px;
  }
`;

const MapBanData = styled.div`
  display: flex;
  align-items: center;
  padding: 4.5px 0 4.5px 15px;
  border-top: 1px solid #3a3745;
  height: 30px;
  .Champion {
    font-family: SpoqaHanSansNeo;
    font-size: 15px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.87;
    letter-spacing: normal;
    text-align: left;
    color: #fff;
    width: 105px;
    margin-left: 8px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .Rate {
    font-family: SpoqaHanSansNeo;
    font-size: 15px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.87;
    letter-spacing: normal;
    text-align: right;
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
  width: 176px;
`;
