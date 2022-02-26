/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import { cx } from "@emotion/css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { API } from "../../../config";
import axiosRequest from "../../../../lib/axios/axiosRequest";
import { SetModalInfo } from "../../../../redux/modules/modalvalue";
import secToMS from "../../../../lib/secToMS";

// Compeontns
import CompareSideFilter from "../components/CompareSideFilter";
// ui components
import Avatar from "../../../../Components/Ui/Avatar";
import Button from "../../../../Components/Ui/Button";
import Arrow from "../../../../Components/Ui/Arrow";
import Versus from "../../../../Components/Ui/Versus";
// ui Style
import {
  borderRadiusStyle,
  buttonStyle,
  typoStyle,
  spacing,
} from "../../../../Styles/ui";
// ui Style components
import * as table from "../components/styled/StyledTable";
import * as layout from "../components/styled/StyledJungleLayout";
import { SetIsJunglingClicked } from '../../../../redux/modules/junglevalue';

// 스타일 컴포넌트 임포트
const S = { table, layout };

const Compare = () => {
  const junglevalue = useSelector((state) => state.JungleMapReducer);
  const user = useSelector((state) => state.UserReducer);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [active, setActive] = useState(true);
  const [team,setTeam] = useState();
  const [oppTeam, setOppTeam] = useState();
  const [teamBlue, setTeamBlue] = useState();
  const [teamRed, setTeamRed] = useState();
  const [oppTeamBlue, setOppTeamBlue] = useState();
  const [oppTeamRed, setOppTeamRed] = useState();

  const [teamSide, setTeamSide] = useState("blue");
  const [oppTeamSide, setOppTeamSide] = useState("blue");

  const MATCHED_IMAGES = {
    0 : "Blue Sentinel",
    1 : "Gromp",
    2 : "Murk Wolves",
    3 : "Raptors",
    4 : "Red Brambleback",
    5 : "Krugs",
    6 : "Scuttler",
    7 : "Blue Sentinel",
    8 : "Gromp",
    9 : "Murk Wolves",
    10 : "Raptors",
    11 : "Red Brambleback",
    12 : "Krugs",
    13 : "Scuttler"
  }

  const MATCHED_CAMPS = {
    0 : t("video.jungle.monsters.blueSentinel"),
    1 : t("video.jungle.monsters.gromp"),
    2 : t("video.jungle.monsters.murkWolves"),
    3 : t("video.jungle.monsters.raptors"),
    4 : t("video.jungle.monsters.redBrambleback"),
    5 : t("video.jungle.monsters.krugs"),
    6 : t("video.jungle.monsters.scuttler"),
    7 : t("video.jungle.monsters.blueSentinel"),
    8 : t("video.jungle.monsters.gromp"),
    9 : t("video.jungle.monsters.murkWolves"),
    10 : t("video.jungle.monsters.raptors"),
    11 : t("video.jungle.monsters.redBrambleback"),
    12 : t("video.jungle.monsters.krugs"),
    13 : t("video.jungle.monsters.scuttler"),
  }

  const secToMin = (sec) => {
    let mm = Math.floor(sec / 60);
    let ss = Math.floor(sec % 60);

    return `${mm}${t("solo.playerboard.min")} ${ss}${t("solo.playerboard.sec")}`;
  }

  const convertingCampRate = (campRate) => {
    const side = campRate.side.split(',');
    const monsterids = campRate.monsterids.split(',');
    const sides = campRate.sides.split(',');
    const jg_rates = campRate.jg_rates.split(',');
    const orderNo = campRate.order;

    const result = [];
    for (let i = 0; i < side.length; i++) {
        result[i] = {
            side: side[i],
            monsterids: monsterids[i],
            sides: sides[i],
            jg_rates: jg_rates[i],
            order: orderNo,
        };
    }
    return result;
}

  const convert = (campRate) => {
    for (let i = 0; i < campRate.length; i++) {
        campRate[i] = convertingCampRate(campRate[i]);
    }

    return campRate;
  }

   const fetchCampSelectionRate = () => {
    const {year,oppyear,league,oppleague,team,oppteam,player,oppplayer} = junglevalue;
    const selectedPatches = Object.keys(junglevalue.patch).filter(key => junglevalue.patch[key] === true);    
    const selectedSeasons = Object.keys(junglevalue.season).filter(key => junglevalue.season[key] === true);    
    const selectedOppSeasons = Object.keys(junglevalue.oppseason).filter(key => junglevalue.oppseason[key] === true);    
    const champArr = Object.keys(junglevalue.champion).filter(key => junglevalue.champion[key] === true)
    const oppChampArr = Object.keys(junglevalue.oppchampion).filter(key => junglevalue.oppchampion[key] === true)

    const url = `${API}/lolapi/jungle/jungle-passing`;
    const params = {
      league: league,
      year: year,
      season: selectedSeasons,
      patch: selectedPatches,
      team: team[0],
      player: player[0],
      champion:champArr ,
      oppleague: oppleague,
      oppyear: oppyear,
      oppseason:selectedOppSeasons,
      oppteam: oppteam[0],
      oppplayer: oppplayer[0],
      oppchampion: oppChampArr,
      token: user.token,
      id: user.id,
    };
    axiosRequest(undefined, url, params, function(e) {
        setTeam(e["team1"]);
        setOppTeam(e["team2"]);
        dispatch(SetIsJunglingClicked(false));

        const returnedTeamData = convert(e["team1"].campRate)
        const returnedOppTeamData = convert(e["team2"].campRate)
    
        const blueTeam = returnedTeamData.map((data) => data.filter(item => item.side === "blue"));
        const redTeam = returnedTeamData.map((data) => data.filter(item => item.side === "red"));
        const blueOppTeam = returnedOppTeamData.map((data) => data.filter(data => data.side === "blue"));
        const redOppTeam = returnedOppTeamData.map((data) => data.filter(data => data.side === "red"));

        setTeamBlue(blueTeam);
        setTeamRed(redTeam);
        setOppTeamBlue(blueOppTeam);
        setOppTeamRed(redOppTeam)

    }, function (objStore) {
      dispatch(SetModalInfo(objStore)); // 오류 발생 시, Alert 창을 띄우기 위해 사용
    })
  }

  useEffect(() => {
    if((Object.keys(junglevalue.oppchampion).filter(key => junglevalue.oppchampion[key] === true).length === 0) || 
    !junglevalue.isClicked) {
      return;
    }
    fetchCampSelectionRate();
  }, [junglevalue.isClicked])

  return (
    <S.layout.CompareContainer>
      <S.layout.FlexContainer>
        {/* 정글 비교 사이드 필터 */}
        <S.layout.Sidebar>
          <CompareSideFilter />
        </S.layout.Sidebar>
        { Object.keys(junglevalue.oppchampion).filter(key => junglevalue.oppchampion[key] === true).length > 0  &&
           
              <S.layout.Contents>
              {/* 비교테이블 */}
              <S.layout.FlexContainer css={spacing.marginB(5)}>
                {/* 첫번째 테이블 */}
                <S.table.TableContainer css={spacing.marginR(5)}>
                  <S.table.TableHeader>
                    {/* 제목 */}
                    <S.table.TableTitle>
                      <Avatar
                     src={`Images/TeamLogo/${junglevalue.team}.png`}
                      alt="teamLogo"
                        size={20}
                        block={false}
                      />
                      {junglevalue.team}
                      {t("video.jungle.campSelectionRate")}
                    </S.table.TableTitle>
                    <S.table.TableButtonGroup>
                      <Button
                        onClick={() => 
                          // setActive(false)
                          setTeamSide("blue")
                        }
                        className={cx([{ "is-active": teamSide === "blue" }])}
                        css={[
                          typoStyle.select,
                          buttonStyle.size.full,
                          buttonStyle.size.x_20,
                          buttonStyle.size.y_8,
                          buttonStyle.color.normal,
                          borderRadiusStyle[10],
                        ]}
                      >
                        BLUE
                      </Button>
                      <Button
                        onClick={() => 
                          // setActive(true)
                          setTeamSide("red")
                        }
                        className={cx([{ "is-active": teamSide === "red" }])}
                        css={[
                          typoStyle.select,
                          buttonStyle.size.full,
                          buttonStyle.size.x_20,
                          buttonStyle.size.y_8,
                          buttonStyle.color.normal,
                          borderRadiusStyle[10],
                        ]}
                      >
                        RED
                      </Button>
                    </S.table.TableButtonGroup>
                  </S.table.TableHeader>
    
                  {/* 테이블 */}
                  <S.table.Table>
                    <thead>
                      <tr>
                        <th>{t("video.jungle.rank")}</th>
                        <th colSpan={3}>{t("video.jungle.selectionRate")}</th>
                      </tr>
                    </thead>
                    {teamSide === "blue" ?
                        <tbody>
                        {teamBlue?.map((teamCamp,idx) => {
                          return   (
                            <tr>
                            <td>{idx+1}</td>
                            <td>
                              {teamCamp.map((el) => {
                                return (
                                  <S.table.TableData>
                                  <Avatar
                                    src={`Images/jungleMonster/${MATCHED_IMAGES[el.monsterids]}.png`}
                                    alt={MATCHED_CAMPS[el.monsterids]}
                                    size={36}
                                    color={el.sides === "n" ? el.side : el.sides }
                                  />
                                  <div>
                                    <p>{`${(el.jg_rates *100).toFixed(2)}%`}</p>
                                    <p>{`${MATCHED_CAMPS[el.monsterids]}`}</p>
                                  </div>
                                </S.table.TableData>
                                )
                              })}
                            
                            </td>
                          </tr>
                            )
                        }
                        )}
                      </tbody> :
                        <tbody>
                        {teamRed?.map((teamCamp,idx) => (
                        <tr>
                        <td>{idx+1}</td>
                        <td>
                        {teamCamp.map((el) => {
                          return (
                            <S.table.TableData>
                            <Avatar
                              src={`Images/jungleMonster/${MATCHED_IMAGES[el.monsterids]}.png`}
                              alt={MATCHED_CAMPS[el.monsterids]}
                              size={36}
                              color={el.sides === "n" ? el.side : el.sides }
                            />
                            <div>
                            <p>{`${(el.jg_rates *100).toFixed(2)}%`}</p>
                            <p>{`${MATCHED_CAMPS[el.monsterids]}`}</p>
                            </div>
                          </S.table.TableData>
                          )
                        })
                            }
                        </td>
                      </tr>
                        ))}
                      </tbody> 
                  }
            
                  </S.table.Table>
                </S.table.TableContainer>
                  
                {/* 두번째 테이블 */}
                <S.table.TableContainer>
                  <S.table.TableHeader>
                    {/* 제목 */}
                    <S.table.TableTitle>
                      <Avatar
                       src={`Images/TeamLogo/${junglevalue.oppteam}.png`}
                       alt="oppteamLogo"
                        size={20}
                        block={false}
                      />
                      {junglevalue.oppteam}
                      {t("video.jungle.campSelectionRate")}
                    </S.table.TableTitle>
                    <S.table.TableButtonGroup>
                      <Button
                        onClick={() => {
                          setOppTeamSide("blue")                          
                        }
                        }
                        className={cx([{ "is-active": oppTeamSide === "blue" }])}
                        css={[
                          typoStyle.select,
                          buttonStyle.size.full,
                          buttonStyle.size.x_20,
                          buttonStyle.size.y_8,
                          buttonStyle.color.normal,
                          borderRadiusStyle[10],
                        ]}
                      >
                        BLUE
                      </Button>
                      <Button
                        onClick={() => {
                          setOppTeamSide("red")
                        }
                        }
                        className={cx([{ "is-active": oppTeamSide === "red"}])}
                        css={[
                          typoStyle.select,
                          buttonStyle.size.full,
                          buttonStyle.size.x_20,
                          buttonStyle.size.y_8,
                          buttonStyle.color.normal,
                          borderRadiusStyle[10],
                        ]}
                      >
                        RED
                      </Button>
                    </S.table.TableButtonGroup>
                  </S.table.TableHeader>
    
                  {/* 테이블 */}
                  <S.table.Table>
                    <thead>
                      <tr>
                        <th>{t("video.jungle.rank")}</th>
                        <th colSpan={3}>{t("video.jungle.selectionRate")}</th>
                      </tr>
                    </thead>
                    {oppTeamSide === "blue" ?
                    <tbody>
                      {oppTeamBlue?.map((oppTeamCamp,idx) =>  (
                      <tr>
                      <td>{idx+1}</td>
                      <td>
                      {oppTeamCamp.map((el) => {
                        return (
                          <S.table.TableData>
                          <Avatar
                            src={`Images/jungleMonster/${MATCHED_IMAGES[el.monsterids]}.png`}
                            alt={MATCHED_CAMPS[el.monsterids]}
                            size={36}
                            color={el.sides === "n" ? el.side : el.sides }
                          />
                          <div>
                            <p>{`${(el.jg_rates *100).toFixed(2)}%`}</p>
                            <p>{`${MATCHED_CAMPS[el.monsterids]}`}</p>
                          </div>
                        </S.table.TableData>
                        )
                      })}
                      </td>
                    </tr>
                      ))}
                    </tbody>:
                        <tbody>
                        {oppTeamRed?.map((oppTeamCamp,idx) =>  (
                        <tr>
                        <td>{idx+1}</td>
                        <td>
                        {oppTeamCamp.map((el) => {
                        return (
                          <S.table.TableData>
                          <Avatar
                            src={`Images/jungleMonster/${MATCHED_IMAGES[el.monsterids]}.png`}
                            alt={MATCHED_CAMPS[el.monsterids]}
                            size={36}
                            color={el.sides === "n" ? el.side : el.sides }
                          />
                          <div>
                            <p>{`${(el.jg_rates *100).toFixed(2)}%`}</p>
                            <p>{`${MATCHED_CAMPS[el.monsterids]}`}</p>
                          </div>
                        </S.table.TableData>
                        )
                      })}
                        </td>
                      </tr>
                        ))}
                      </tbody>
}
                  </S.table.Table>
                </S.table.TableContainer>
              </S.layout.FlexContainer>
    
              {/* 텍스트테이블 */}
              <S.layout.Container>
                <S.table.TextTable>
                  {/* 선수명 */}
                  <thead>
                    <tr>
                      <th>{team?.countRate[0]?.player}</th>
                      <th></th>
                      <th>
                        <Versus size={18} />
                      </th>
                      <th></th>
                      <th>{oppTeam?.countRate[0]?.player}</th>
                    </tr>
                  </thead>
    
                  {/* 선수비교 데이터 */}
                  <tbody>
                    {/* 각 행 */}
                    <tr>
                      <td>{`${(team?.countRate[0]?.counter_jg*100).toFixed(2)}%`}</td>
                      <td>
                        {team?.countRate[0]?.counter_jg*100 > oppTeam?.countRate[0]?.counter_jg*100 && 
                        <Arrow direction={"L"} />
                        }
                      </td>
                      <td>{t("video.jungle.counterjungleRate")}</td>
                      <td>
                      {team?.countRate[0]?.counter_jg*100 < oppTeam?.countRate[0]?.counter_jg*100 && 
                        <Arrow direction={"R"} />
                      }
                      </td>
                      <td>{`${(oppTeam?.countRate[0]?.counter_jg*100).toFixed(2)}%`}</td>
                    </tr>
    
                    <tr>
                      <td>{secToMin(team?.sixTime[0]?.realcount)}</td>
                      <td>
                        {team?.sixTime[0]?.realcount > oppTeam?.sixTime[0]?.realcount &&
                        <Arrow direction={"L"} />
                        }
                      </td>
                      <td>{t("video.jungle.avgJunglingTimeForSixthCamp")}</td>
                      <td>
                        {team?.sixTime[0]?.realcount < oppTeam?.sixTime[0]?.realcount &&
                        <Arrow direction={"R"} />
                        }
                      </td>
                      <td>{secToMin(oppTeam?.sixTime[0]?.realcount)}</td>
                    </tr>
                  </tbody>
                </S.table.TextTable>
              </S.layout.Container>
            </S.layout.Contents>   
        }
      </S.layout.FlexContainer>
    </S.layout.CompareContainer>
  );
};

export default Compare;

