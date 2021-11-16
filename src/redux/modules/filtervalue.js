export const LOADING = "filtervalue/LOADING";
export const CONVERTED_LEAGUE = "filtervalue/CONVERTED_LEAGUE";
export const LEAGUE = "filtervalue/LEAGUE";
export const PATCH = "fitlervalue/PATCH";
export const PATCH_FULL = "fitlervalue/PATCH_FULL";
export const TEAM = "filtervalue/TEAM";
export const OPP_TEAM = "filtervalue/OPPTEAM";
export const PLAYER = "filtervalue/PLAYER";
export const OPP_PLAYER = "filtervalue/OPP_PLAYER";
export const INITIAL_STATE = "filtervalue/INITIAL_STATE";
export const GET_OPPTEAM = "filtervalue/GET_OPPTEAM";
export const GET_OPP_PLAYER = "filtervalue/GET_OPP_PLAYER";
export const HANDLE_TAB = "filtervalue/HANDLE_TAB";
export const HANDLE_CLICK = "filtervalue/HANDLE_CLICK";
export const RESET_FILTER = "filtervalue/RESET_FILTER";
export const RESET_FILTER2 = "filtervalue/RESET_FILTER2";
export const RESET_PLAYER = "filtervalue/RESET_PLAYER";
export const RESET_CHAMPION = "filtervalue/RESET_CHAMPION";
export const RESET_OPP_CHAMPION = "filtervalue/RESET_OPP_CHAMPION";
export const RESET_CHAMPION2 = "filtervalue/RESET_CHAMPION2";
export const POSITION = "filtervalue/POSITION";
export const OPP_POSITION = "filtervalue/OPP_POSITION";
export const CHAMPION = "filtervalue/CHAMPION";
export const OPP_CHAMPION = "filtervalue/OPP_CHAMPION";
export const CHAMPION_ENG = "filtervalue/CHAMPION_ENG";
export const OPP_CHAMPION_ENG = "filtervalue/OPP_CHAMPION_ENG";
export const RESET_MAPPING = "filtervalue/RESET_MAPPING";
export const RESET_MAPPINGTAB = "filtervalue/RESET_MAPPINGTAB";
export const GET_GAME_ID = "filtervalue/GET_GAME_ID";
export const MENU_NUM = "filtervalue/MENU_NUM";
export const YEAR = "filtervalue/YEAR";
export const SEASON = "filtervalue/SEASON";
export const RESET_LEAGUE = "filtervalue/RESET_LEAGUE";
export const RESET_YEAR = "filtervalue/RESET_YEAR";
export const RESET_SEASON = "filtervalue/RESET_SEASON";
export const RESET_TEAM = "filtervalue/RESET_TEAM";
export const FILTER_MENU_SWITCH = "filtervalue/FILTER_MENU_SWITCH";
export const SET_LEAGUE = "filtervalue/SET_LEAGUE";
export const SET_YEAR = "filtervalue/SET_YEAR";
export const SET_SEASON = "filtervalue/SET_SEASON";
export const COMPARE_MODAL = "filtervalue/COMPARE_MODAL";
export const SET_PATCH = "filtervalue/SET_PATCH";
export const SELECT_ALL_BTN = "filtervalue/SELECT_ALL_BTN";

export const Reset_MapTab = (payload) => {
  return {
    type: RESET_MAPPINGTAB,
    payload,
  };
};
export const Reset_Map = (payload) => {
  return {
    type: RESET_MAPPING,
    payload,
  };
};

export const Champion = (champion) => {
  return {
    type: CHAMPION,
    payload: champion,
  };
};
export const Opp_Champion = (champion) => {
  return {
    type: OPP_CHAMPION,
    payload: champion,
  };
};

export const Champion_Eng = (champion) => {
  return {
    type: CHAMPION_ENG,
    payload: champion,
  };
};
export const Opp_Champion_Eng = (champion) => {
  return {
    type: OPP_CHAMPION_ENG,
    payload: champion,
  };
};

export const Loading = (payload) => {
  return {
    type: LOADING,
    payload,
  };
};

export const ConvertedLeague = (league) => {
  return {
    type: CONVERTED_LEAGUE,
    payload: league,
  };
};

export const League = (payload) => {
  return {
    type: LEAGUE,
    payload,
  };
};

export const Patch = (patch) => {
  return {
    type: PATCH,
    payload: patch,
  };
};

export const PatchFull = (patch) => {
  return {
    type: PATCH_FULL,
    payload: patch,
  };
};
export const Team = (team) => {
  return {
    type: TEAM,
    payload: team,
  };
};

export const OppTeam = (team) => {
  return {
    type: OPP_TEAM,
    payload: team,
  };
};

export const Player = (player) => {
  return {
    type: PLAYER,
    payload: player,
  };
};

export const Position = (position) => {
  return {
    type: POSITION,
    payload: position,
  };
};

export const OppPosition = (position) => {
  return {
    type: OPP_POSITION,
    payload: position,
  };
};
export const OppPlayer = (player) => {
  return {
    type: OPP_PLAYER,
    payload: player,
  };
};

export const InitailizeState = () => {
  return {
    type: INITIAL_STATE,
  };
};

export const ResetFilter = () => {
  return {
    type: RESET_FILTER,
  };
};
export const ResetFilter2 = () => {
  return {
    type: RESET_FILTER2,
  };
};
export const GetOppTeam = (payload) => {
  return {
    type: GET_OPPTEAM,
    payload,
  };
};

export const GetOppPlayer = (payload) => {
  return {
    type: GET_OPP_PLAYER,
    payload,
  };
};

export const HandleTab = (payload) => {
  return {
    type: HANDLE_TAB,
    payload,
  };
};

export const HandleClick = (payload) => {
  return {
    type: HANDLE_CLICK,
    payload,
  };
};

export const ResetPlayer = () => {
  return {
    type: RESET_PLAYER,
  };
};

export const ResetChampion = (payload) => {
  return {
    type: RESET_CHAMPION,
    payload,
  };
};

export const ResetChampion2 = (payload) => {
  return {
    type: RESET_CHAMPION2,
    payload,
  };
};
export const ResetOppChampion = (payload) => {
  return {
    type: RESET_OPP_CHAMPION,
    payload,
  };
};

export const GetGameId = (payload) => {
  return {
    type: GET_GAME_ID,
    payload,
  };
};

export const MenuNum = (payload) => {
  return {
    type: MENU_NUM,
    payload,
  };
};

export const Year = (payload) => {
  return {
    type: YEAR,
    payload,
  };
};

export const Season = (payload) => {
  return {
    type: SEASON,
    payload,
  };
};

export const ResetLeague = () => {
  return {
    type: RESET_LEAGUE,
  };
};

export const ResetYear = () => {
  return {
    type: RESET_YEAR,
  };
};

export const ResetSeason = () => {
  return {
    type: RESET_SEASON,
  };
};

export const ResetTeam = () => {
  return {
    type: RESET_TEAM,
  };
};

export const FilterMenuSwitch = (payload) => {
  return {
    type: FILTER_MENU_SWITCH,
    payload,
  };
};

export const SetLeague = (payload) => {
  return {
    type: SET_LEAGUE,
    payload,
  };
};

export const SetYear = (payload) => {
  return {
    type: SET_YEAR,
    payload,
  };
};

export const SetSeason = (payload) => {
  return {
    type: SET_SEASON,
    payload,
  };
};

export const SetPatch = (payload) => {
  return {
    type: SET_PATCH,
    payload,
  };
};

export const CompareModal = (payload) => {
  return {
    type: COMPARE_MODAL,
    payload,
  };
};

const initialState = {
  league: [],
  year: [],
  season: [],
  team: [],
  patch: [],
  patchfilter: [],
  player: "",
  oppplayer: "",
  oppteam: "",
  convertleague: "",
  position: "",
  getoppteam: "",
  getoppplayer: "",
  champion: "",
  oppchampion: "",
  champion_eng: "",
  oppchampion_eng: "",
  // tab: "",
  loading: false,
  resetchamp: "",
  click: 0,
  gameid: "",
  menu_num: "",
  filterMenuState: true,
  compareModal: true,
};

export default function FilterReducer(state = initialState, action) {
  switch (action.type) {
    case INITIAL_STATE:
      return initialState;
    case LEAGUE:
      console.log(state);
      if (state.league.length === 0) {
        return { ...state, league: [action.payload] };
      }
      if (state.league.find((e) => e === action.payload)) {
        return {
          ...state,
          league: state.league.filter((e) => e !== action.payload),
        };
      }
      return {
        ...state,
        league: [...state.league.filter((e) => e !== ""), action.payload],
      };
    case PATCH:
      if (state.patch.length === 0) {
        return { ...state, patch: [action.payload] };
      }
      if (state.patch.find((e) => e === action.payload)) {
        return {
          ...state,
          patch: state.patch.filter((e) => e !== action.payload),
        };
      }
      return {
        ...state,
        patch: [...state.patch.filter((e) => e !== ""), action.payload],
      };
    case PATCH_FULL:
      return {
        ...state,
        patchfilter: action.payload,
        patch: action.payload,
      };
    case TEAM:
      if (state.team.length === 0) {
        return { ...state, team: action.payload };
      } else {
        if (action.payload === state.team) {
          return { ...state, team: "" };
        } else {
          return { ...state, team: action.payload };
        }
      }
    case OPP_TEAM:
      return { ...state, oppteam: action.payload };
    case PLAYER:
      if (state.player === action.payload) {
        return { ...state, player: "" };
      } else {
        return { ...state, player: action.payload };
      }
    case OPP_PLAYER:
      return { ...state, oppplayer: action.payload };
    case CHAMPION:
      return { ...state, champion: action.payload };
    case OPP_CHAMPION:
      return { ...state, oppchampion: action.payload };
    case CHAMPION_ENG:
      return {
        ...state,
        champion_eng: action.payload,
      };
    case OPP_CHAMPION_ENG:
      return {
        ...state,
        oppchampion_eng: action.payload,
      };
    case CONVERTED_LEAGUE:
      return { ...state, convertleague: action.payload };
    case GET_OPPTEAM:
      return { ...state, getoppteam: action.payload };
    case GET_OPP_PLAYER:
      return { ...state, getoppplayer: action.payload };
    case HANDLE_TAB:
      return { ...state, tab: action.payload };
    case HANDLE_CLICK:
      return { ...state, click: action.payload };
    case LOADING:
      return { ...state, loading: action.payload };
    case POSITION:
      return { ...state, position: action.payload };
    case OPP_POSITION:
      return { ...state, oppposition: action.payload };
    case GET_GAME_ID:
      return { ...state, gameid: action.payload };
    case RESET_FILTER:
      return {
        ...state,
        patch: "",
        team: "",
        player: "",
        oppplayer: "",
        oppteam: "",
        getoppteam: "",
        getoppplayer: "",
      };
    case RESET_FILTER2:
      return {
        ...state,
        oppplayer: "",
        oppteam: "",
        getoppteam: "",
        getoppplayer: "",
      };
    case RESET_PLAYER:
      return {
        ...state,
        player: "",
        oppplayer: "",
      };
    case RESET_CHAMPION:
      return {
        ...state,
        champion: "",
        oppchampion: "",
        champion_eng: "",
        oppchampion_eng: "",
        resetchamp: action.payload,
      };
    case RESET_CHAMPION2:
      return {
        ...state,
        resetchamp: action.payload,
      };
    case RESET_OPP_CHAMPION:
      return {
        ...state,
        oppchampion: "",
        oppchampion_eng: "",
      };
    case RESET_MAPPING:
      return action.payload;
    case RESET_MAPPINGTAB:
      return {
        ...state,
        player: "",
        oppplayer: "",
        oppteam: "",
        champion: "",
        oppchampion: "",
        champion_eng: "",
        oppchampion_eng: "",
      };
    case MENU_NUM:
      return {
        ...state,
        menu_num: action.payload,
      };
    case YEAR:
      if (state.year.length === 0) {
        return { ...state, year: [action.payload] };
      }
      if (state.year.find((e) => e === action.payload)) {
        return {
          ...state,
          year: state.year.filter((e) => e !== action.payload),
        };
      }
      return {
        ...state,
        year: [...state.year.filter((e) => e !== ""), action.payload],
      };
    case SEASON:
      if (state.season.length === 0) {
        return { ...state, season: [action.payload] };
      }
      if (state.season.find((e) => e === action.payload)) {
        return {
          ...state,
          season: state.season.filter((e) => e !== action.payload),
        };
      }
      return {
        ...state,
        season: [...state.season.filter((e) => e !== ""), action.payload],
      };
    case RESET_LEAGUE:
      return {
        ...state,
        league: [],
        year: [],
        season: [],
        team: [],
        patch: [],
        player: "",
        patchfilter: [],
      };
    case RESET_YEAR:
      return {
        ...state,
        year: [],
        season: [],
        team: [],
        patch: [],
        player: "",
        patchfilter: [],
      };
    case RESET_SEASON:
      return {
        ...state,
        season: [],
        team: [],
        patch: [],
        player: "",
        patchfilter: [],
      };
    case RESET_TEAM:
      return {
        ...state,
        team: [],
        player: "",
      };
    case FILTER_MENU_SWITCH:
      return {
        ...state,
        filterMenuState: action.payload,
      };
    case SET_LEAGUE:
      return {
        ...state,
        league: action.payload,
      };
    case SET_YEAR:
      return {
        ...state,
        year: action.payload,
      };
    case SET_SEASON:
      return {
        ...state,
        season: action.payload,
      };
    case SET_PATCH:
      return {
        ...state,
        patch: action.payload,
      };
    case COMPARE_MODAL:
      return {
        ...state,
        compareModal: action.payload,
      };
    default:
      return state;
  }
}
