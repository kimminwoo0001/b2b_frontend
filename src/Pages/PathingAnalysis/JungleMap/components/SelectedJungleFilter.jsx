import React, { memo } from "react";
import styled, { css } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import SelectedData from "../../../../Components/Filter/Selected/SelectedData";
import {
  JungleInit,
  ResetJungleLeague,
  ResetJungleSeason,
  ResetJungleTeam,
  ResetJunglePatch,
} from "../../../../redux/modules/junglevalue";
import { getTrueValueList } from "../../../../lib/getTureValueList";

const SelectedJungleFilter = ({ setToggle }) => {
  const year = useSelector((state) => state.JungleMapReducer.year);
  const league = useSelector((state) => state.JungleMapReducer.league);
  const season = useSelector((state) => state.JungleMapReducer.season);
  const team = useSelector((state) => state.JungleMapReducer.team);
  const patch = useSelector((state) => state.JungleMapReducer.patch);
  const dispatch = useDispatch();

  return (
    <SelectedArea>
      {year.map((year, _) => {
        return (
          <SelectedData
            key={"chip" + year + _}
            data={year}
            deleteBtn={() => {
              dispatch(JungleInit());
              setToggle(false);
            }}
          />
        );
      })}
      {getTrueValueList(league).map((league, _) => {
        return (
          <SelectedData
            key={"chip" + league + _}
            data={league}
            deleteBtn={() => {
              dispatch(ResetJungleLeague(league));
              setToggle(false);
            }}
          />
        );
      })}
      {getTrueValueList(season).map((season, _) => {
        return (
          <SelectedData
            key={"chip" + season + _}
            data={season}
            deleteBtn={() => {
              dispatch(ResetJungleSeason(season));
              setToggle(false);
            }}
          />
        );
      })}
      {team.length > 0 &&
        team.map((team, _) => {
          return (
            <SelectedData
              key={"chip" + team + _}
              data={team}
              deleteBtn={() => {
                dispatch(ResetJungleTeam());
                setToggle(false);
              }}
            />
          );
        })}
      {team.length > 0 &&
        getTrueValueList(patch).map((patch, _) => {
          return (
            <SelectedData
              key={"chip" + patch + _}
              data={patch}
              deleteBtn={() => {
                dispatch(ResetJunglePatch(patch));
                setToggle(false);
              }}
            />
          );
        })}
    </SelectedArea>
  );
};

export default SelectedJungleFilter;

const SelectedArea = styled.div`
  margin-left: 15px;
  .not-selected {
    opacity: 0.3;
  }
`;
