/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "@emotion/styled";
import { API } from '../../../config';
import axiosRequest from "../../../../lib/axios/axiosRequest";
import { SetModalInfo } from "../../../../redux/modules/modalvalue";
import {SetJunglePlayer, SetIsJungleMappingClicked, SetFilterData} from '../../../../redux/modules/junglevalue';
import { useTranslation } from "react-i18next";

const Map = () => {
    const junglevalue = useSelector(state => state.JungleMapReducer);
    const user = useSelector((state) => state.UserReducer);
    const lang = useSelector((state) => state.LocaleReducer);
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const [mappingPosition, setMappingPosition] = useState();
    const [mappingInfo, setMappingInfo] = useState();


    const leagueArr =  Object.keys(junglevalue.league).filter(key => junglevalue.league[key] === true)
    const seasonArr =  Object.keys(junglevalue.season).filter(key => junglevalue.season[key] === true)
    const patchArr =  Object.keys(junglevalue.patch).filter(key => junglevalue.patch[key] === true)
  
  // mapping api
  const GetMappingInfo = () => {
    const selectedChamps = junglevalue.champion && Object.keys(junglevalue.champion).filter(key => junglevalue.champion[key] === true);
    const selectedOppChamps = junglevalue.oppchampion && Object.keys(junglevalue.oppchampion).filter(key => junglevalue.oppchampion[key] === true);
    const url = `${API}/lolapi/jungle/mapping`;
    const params = {
      league: leagueArr,
      year: junglevalue.year,
      season: seasonArr,
      patch: patchArr,
      team: junglevalue.team[0],
      player: junglevalue.player,
      champion: selectedChamps,
      oppchampion: selectedOppChamps,
      side:"all",
      time:"all",
      position:['top','jng','mid','bot','sup'],
      gameid:junglevalue.gameid[0],
      token: user.token,
      id: user.id,
    };
    axiosRequest(undefined, url, params, function(e) {
        setMappingPosition(e.position);
        setMappingInfo(e.info)
        dispatch(SetIsJungleMappingClicked(false));
    }, function (objStore) {
      dispatch(SetModalInfo(objStore)); // 오류 발생 시, Alert 창을 띄우기 위해 사용
    })
  }


  useEffect(() => {
    console.log("1.mappingInfo:", mappingInfo);
    console.log("2.mappingPosition:", mappingPosition);

  }, [mappingInfo,mappingPosition])


  useEffect(() => {
    if(junglevalue.oppchampion && 
        Object.keys(junglevalue.oppchampion).filter(key => junglevalue.oppchampion[key]=== true).length === 0 
        || !junglevalue.isMappingClicked) {
      return;
    }
    GetMappingInfo();
  },[junglevalue.isMappingClicked])


    return (
        <SMapContainer>
            <SWardPathingMap>

            </SWardPathingMap>
        </SMapContainer>
    );
};

export default Map;

const SMapContainer = styled.section`

`;

const SWardPathingMap = styled.div`
  background-image: url("Images/obj_map_summer.png");
  /* position: relative; */
  width: 700px;
  height: 700px;
`;

