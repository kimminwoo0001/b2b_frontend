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




// 스타일 컴포넌트 임포트
const S = { table, layout };

const Compare = () => {
  const staticvalue = useSelector((state) => state.StaticValueReducer);
  const selector = useSelector((state) => state.SelectorReducer);
  const junglevalue = useSelector((state) => state.JungleMapReducer);
  const user = useSelector((state) => state.UserReducer);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [team,setTeam] = useState();
  const [oppTeam, setOppTeam] = useState();


  const secToMin = (sec) => {
    let mm = Math.floor(sec / 60);
    let ss = Math.floor(sec % 60);

    return `${mm}${t("solo.playerboard.min")} ${ss}${t("solo.playerboard.sec")}`;
  }


  // 정글링비교 데이터 호출
  const fetchCampSelectionRate = () => {
    const leagueArr =  Object.keys(junglevalue.league).filter(key => junglevalue.league[key] === true)
    const seasonArr =  Object.keys(junglevalue.season).filter(key => junglevalue.season[key] === true)
    const patchArr =  Object.keys(junglevalue.patch).filter(key => junglevalue.patch[key] === true)

    const url = `${API}/lolapi/jungle/jungle-passing`;
    const params = {
      league: leagueArr,
      year: junglevalue.year,
      season: seasonArr,
      patch: patchArr,
      team: junglevalue.team[0],
      player: junglevalue.player,
      champion: ["Nidalee"],
      oppteam: "DK",
      oppplayer: "Canyon",
      oppchampion: ["XinZhao"],
      side:"all",
      token: user.token,
      id: user.id,
    };
    axiosRequest(undefined, url, params, function(e) {

      setTeam(e["team1"]);
      setOppTeam(e["team2"]);

      
      console.log(e["team1"]);
      console.log(e["team2"]);

    }, function (objStore) {
      dispatch(SetModalInfo(objStore)); // 오류 발생 시, Alert 창을 띄우기 위해 사용
    })
  }

  useEffect(() => {
    fetchCampSelectionRate();
  }, [])


  const [active, setActive] = useState(true);
  return (
    <S.layout.CompareContainer>
      <S.layout.FlexContainer>
        {/* 정글 비교 사이드 필터 */}
        <S.layout.Sidebar>
          <CompareSideFilter />
        </S.layout.Sidebar>

        <S.layout.Contents>
          {/* 비교테이블 */}
          <S.layout.FlexContainer css={spacing.marginB(5)}>
            {/* 첫번째 테이블 */}
            <S.table.TableContainer css={spacing.marginR(5)}>
              <S.table.TableHeader>
                {/* 제목 */}
                <S.table.TableTitle>
                  <Avatar
                    src="images/LCK_CL_LOGO/T1.C.png"
                    alt="T1"
                    size={20}
                    block={false}
                  />
                  {"T1"}
                  정글 순서별 캠프 선택비율
                </S.table.TableTitle>
                <S.table.TableButtonGroup>
                  <Button
                    onClick={() => setActive(false)}
                    className={cx([{ "is-disabled": true }])}
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
                    onClick={() => setActive(true)}
                    className={cx([{ "is-active": active }])}
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
                    <th>순위</th>
                    <th colSpan={3}>순서별캠프선택 비율</th>
                  </tr>
                </thead>
                <tbody>
                  {team?.campRate?.map((teamCamp,idx) => (
                  <tr>
                  <td>{teamCamp.order}</td>
                  <td>
                    <S.table.TableData>
                      <Avatar
                        src={"images/champion/teemo.png"}
                        alt={"칼날부리"}
                        size={36}
                        color={"blue"}
                      />
                      <div>
                        <p>{teamCamp.jg_rates}</p>
                        <p>칼날부리</p>
                      </div>
                    </S.table.TableData>
                  </td>
                  <td>
                    <S.table.TableData>
                      <Avatar
                        src={"images/champion/teemo.png"}
                        alt={"칼날부리"}
                        size={36}
                        color={"blue"}
                      />
                      <div>
                        <p>46%</p>
                        <p>칼날부리</p>
                      </div>
                    </S.table.TableData>
                  </td>
                  <td>
                    <S.table.TableData>
                      <Avatar
                        src={"images/champion/teemo.png"}
                        alt={"칼날부리"}
                        size={36}
                        color={"blue"}
                      />
                      <div>
                        <p>46%</p>
                        <p>칼날부리</p>
                      </div>
                    </S.table.TableData>
                  </td>
                </tr>
                  ))}
                </tbody>
              </S.table.Table>
            </S.table.TableContainer>

            {/* 두번째 테이블 */}
            <S.table.TableContainer>
              <S.table.TableHeader>
                {/* 제목 */}
                <S.table.TableTitle>
                  <Avatar
                    src="images/LCK_CL_LOGO/T1.C.png"
                    alt="T1"
                    size={20}
                    block={false}
                  />
                  {"T1"}
                  정글 순서별 캠프 선택비율
                </S.table.TableTitle>
                <S.table.TableButtonGroup>
                  <Button
                    onClick={() => setActive(false)}
                    className={cx([{ "is-active": !active }])}
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
                    onClick={() => setActive(true)}
                    className={cx([{ "is-active": active }])}
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
                    <th>순위</th>
                    <th colSpan={3}>순서별캠프선택 비율</th>
                  </tr>
                </thead>
                <tbody>
                  {oppTeam?.campRate?.map((oppTeamCamp,idx) =>  (
                  <tr>
                  <td>1</td>
                  <td>
                    <S.table.TableData>
                      <Avatar
                        src={"images/champion/teemo.png"}
                        alt={"칼날부리"}
                        size={36}
                        color={"blue"}
                      />
                      <div>
                        <p>46%</p>
                        <p>칼날부리</p>
                      </div>
                    </S.table.TableData>
                  </td>
                  <td>
                    <S.table.TableData>
                      <Avatar
                        src={"images/champion/teemo.png"}
                        alt={"칼날부리"}
                        size={36}
                        color={"blue"}
                      />
                      <div>
                        <p>46%</p>
                        <p>칼날부리</p>
                      </div>
                    </S.table.TableData>
                  </td>
                  <td>
                    <S.table.TableData>
                      <Avatar
                        src={"images/champion/teemo.png"}
                        alt={"칼날부리"}
                        size={36}
                        color={"blue"}
                      />
                      <div>
                        <p>46%</p>
                        <p>칼날부리</p>
                      </div>
                    </S.table.TableData>
                  </td>
                </tr>
                  ))}
                </tbody>
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
                  <td>{`${team?.countRate[0]?.counter_jg*100}%`}</td>
                  <td>
                    <Arrow direction={"L"} />
                  </td>
                  <td>카운터정글비율</td>
                  <td>
                    <Arrow direction={"R"} />
                  </td>
                  <td>{`${oppTeam?.countRate[0]?.counter_jg*100}%`}</td>
                </tr>

                <tr>
                  <td>{secToMin(team?.sixTime[0]?.realcount)}</td>
                  <td>
                    <Arrow direction={"L"} />
                  </td>
                  <td>6캠프 평균 정글링 시간</td>
                  <td>
                    <Arrow direction={"R"} />
                  </td>
                  <td>{secToMin(oppTeam?.sixTime[0]?.realcount)}</td>
                </tr>
              </tbody>
            </S.table.TextTable>
          </S.layout.Container>
        </S.layout.Contents>
      </S.layout.FlexContainer>
    </S.layout.CompareContainer>
  );
};

export default Compare;
