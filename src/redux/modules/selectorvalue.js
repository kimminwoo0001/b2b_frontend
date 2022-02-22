export const SELECTOR_INITIAL_STATE = "filterSelector/SELECTOR_INITIAL_STATE";
export const SET_LEAGUE_FILTER = "filterSelector/SET_LEAGUE_FILTER";
export const SET_YEAR_FILTER = "filterSelector/SET_YEAR_FILTER";
export const SET_SEASON_FILTER = "filterSelector/SET_SEASON_FILTER";
export const SET_TEAM_FILTER = "filterSelector/SET_TEAM_FILTER";
export const SET_PLAYER_FILTER = "filterSelector/SET_PLAYER_FILTER";
export const SET_PATCH_FILTER = "filterSelector/SET_PATCH_FILTER";

export const SET_OPP_SEASON_FILTER = "filterSelector/SET_OPP_SEASON_FILTER";


export const setLeagueFilter = (payload) => {
  return {
    type: SET_LEAGUE_FILTER,
    payload
  };
};

export const setYearFilter = (payload) => {
  return {
    type: SET_YEAR_FILTER,
    payload
  };
};

export const setSeasonFilter = (payload) => {
  return {
    type: SET_SEASON_FILTER,
    payload
  };
};

export const setOppSeasonFilter = (payload) => {
  return {
    type: SET_OPP_SEASON_FILTER,
    payload
  };
};

export const setTeamFilter = (payload) => {
  return {
    type: SET_TEAM_FILTER,
    payload
  };
};

export const setPlayerFilter = (payload) => {
  return {
    type: SET_PLAYER_FILTER,
    payload
  };
};

export const setPatchFilter = (payload) => {
  return {
    type: SET_PATCH_FILTER,
    payload
  };
};

export const SelectorInitailizeState = () => {
  return {
    type: SELECTOR_INITIAL_STATE
  };
};

const initialState = {
  leagueFilter: [],
  yearFilter: [],
  seasonFilter: [],
  teamFilter: [],
  playerFilter: [],
  patchFilter: [],
  oppseasonFilter:[],
}

export default function SelectorReducer(state = initialState, action) {
  switch (action.type) {
    case SELECTOR_INITIAL_STATE:
      return initialState
    case SET_LEAGUE_FILTER:
      return {
        ...state,
        leagueFilter: action.payload
      }
    case SET_YEAR_FILTER:
      return {
        ...state,
        yearFilter: action.payload
      }
    case SET_SEASON_FILTER:
      return {
        ...state,
        seasonFilter: action.payload
      }
    case SET_TEAM_FILTER:
      return {
        ...state,
        teamFilter: action.payload
      }
    case SET_PLAYER_FILTER:
      return {
        ...state,
        playerFilter: action.payload
      }
    case SET_PATCH_FILTER:
      return {
        ...state,
        patchFilter: action.payload
      }

    case SET_OPP_SEASON_FILTER:
      return {
        ...state,
        oppseasonFilter: action.payload
      }
    default:
      return state;
  }
}
