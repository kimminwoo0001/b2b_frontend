export const INITIAL_COMPAREMODAL = "copyvalue/INITIAL_COMPAREMODAL";
export const SET_COPY_FILTERS = "copyvalue/SET_COPY_FILTERS";
export const SET_OPEN_FILTER_MODAL = "copyvalue/SET_OPEN_FILTER_MODAL";
export const COMPARE_MODAL = "copyvalue/COMPARE_MODAL";

// flitervalue copy
export const COPY_PATCH = "copyvalue/COPY_PATCH";
export const COPY_OPP_TEAM = "copyvalue/COPY_OPP_TEAM";
export const COPY_GET_OPPTEAM = "copyvalue/COPY_GET_OPPTEAM";
export const COPY_HANDLE_TAB = "copyvalue/COPY_HANDLE_TAB";
export const COPY_SET_LEAGUE = "copyvalue/COPY_SET_LEAGUE";
export const COPY_SEASON = "copyvalue/COPY_SEASON";
export const COPY_SET_TEAM = "copyvalue/COPY_SET_TEAM";
export const COPY_SET_MODAL_OPPTEAM = "copyvalue/COPY_SET_MODAL_OPPTEAM";
export const COPY_SET_SEASON = "copyvalue/COPY_SET_SEASON";
export const COPY_RESET_SEASON = "copyvalue/COPY_RESET_SEASON";
export const COPY_SET_YEAR = "copyvalue/COPY_SET_YEAR";
export const COPY_RESET_TEAM = "copyvalue/COPY_RESET_TEAM";
export const COPY_SET_PATCH = "copyvalue/COPY_SET_PATCH";
export const COPY_GET_OPP_PLAYER = "copyvalue/COPY_GET_OPP_PLAYER";
export const COPY_OPP_PLAYER = "copyvalue/COPY_OPP_PLAYER";
export const COPY_SET_PLAYER = "copyvalue/COPY_SET_PLAYER";
export const COPY_POSITION = "copyvalue/COPY_POSITION";

export const COPY_FV_INIT = "copyvalue/COPY_FV_INIT";




export const SetCopyFilters = (payload) => {
  return {
    type: SET_COPY_FILTERS,
    payload,
  };
};
export const SetOpenFilterModal = (payload) => {
  return {
    type: SET_OPEN_FILTER_MODAL,
    payload,
  };
};

export const CompareModal = (payload) => {
  return {
    type: COMPARE_MODAL,
    payload,
  };
};

export const CopyPatch = (payload) => {
  return {
    type: COPY_PATCH,
    payload,
  };
};
export const CopyOppTeam = (payload) => {
  return {
    type: COPY_OPP_TEAM,
    payload,
  };
};
export const CopyGetOppTeam = (payload) => {
  return {
    type: COPY_GET_OPPTEAM,
    payload,
  };
};
export const CopyHandleTab = (payload) => {
  return {
    type: COPY_HANDLE_TAB,
    payload,
  };
};
export const CopySetLeague = (payload) => {
  return {
    type: COPY_SET_LEAGUE,
    payload,
  };
};
export const CopySeason = (payload) => {
  return {
    type: COPY_SEASON,
    payload,
  };
};
export const CopySetTeam = (payload) => {
  return {
    type: COPY_SET_TEAM,
    payload,
  };
};
export const CopySetModalOppTeam = (payload) => {
  return {
    type: COPY_SET_MODAL_OPPTEAM,
    payload,
  };
};
export const CopySetSeason = (payload) => {
  return {
    type: COPY_SET_SEASON,
    payload,
  };
};

export const CopyResetSeason = () => {
  return {
    type: COPY_RESET_SEASON,
  };
};

export const CopySetYear = (payload) => {
  return {
    type: COPY_SET_YEAR,
    payload,
  };
};

export const CopyResetTeam = () => {
  return {
    type: COPY_RESET_TEAM,
  };
};

export const CopySetPatch = (payload) => {
  return {
    type: COPY_SET_PATCH,
    payload,
  };
};

export const CopyGetOppPlayer = (payload) => {
  return {
    type: COPY_GET_OPP_PLAYER,
    payload,
  };
};

export const CopyOppPlayer = (player) => {
  return {
    type: COPY_OPP_PLAYER,
    payload: player,
  };
};

export const CopySetPlayer = (payload) => {
  return {
    type: COPY_SET_PLAYER,
    payload,
  };
};

export const CopyPosition = (position) => {
  return {
    type: COPY_POSITION,
    payload: position,
  };
};


export const InitalCopy = () => {
  return {
    type: INITIAL_COMPAREMODAL
  }
}

export const CopyFvInit = () => {
  return {
    type: COPY_FV_INIT
  }
}

const initialState = {
  openFilterModal: ""
}

const fv_init = {
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
  tab: "",
  loading: false,
  resetchamp: "",
  click: 0,
  gameid: "",
  menu_num: "",
  filterMenuState: true,
};


export default function CopyReducer(state = initialState, action) {
  switch (action.type) {
    case INITIAL_COMPAREMODAL:
      return initialState;
    case COPY_FV_INIT:
      return fv_init;
    case SET_COPY_FILTERS:
      return action.payload;
    case SET_OPEN_FILTER_MODAL:
      return {
        ...state,
        openFilterModal: action.payload,
      };
    case COMPARE_MODAL:
      return {
        ...state,
        compareModal: action.payload,
      };
    case COPY_PATCH:
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
    case COPY_OPP_TEAM:
      return { ...state, oppteam: action.payload };
    case COPY_GET_OPPTEAM:
      return { ...state, getoppteam: action.payload };
    case COPY_HANDLE_TAB:
      return { ...state, tab: action.payload };
    case COPY_SET_LEAGUE:
      return {
        ...state,
        league: action.payload,
      };
    case COPY_SEASON:
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
    case COPY_SET_TEAM:
      return {
        ...state,
        team: action.payload,
      };
    case COPY_SET_MODAL_OPPTEAM:
      return {
        ...state,
        modalOppteam: action.payload,
      };
    case COPY_SET_SEASON:
      return {
        ...state,
        season: action.payload,
      };
    case COPY_RESET_SEASON:
      return {
        ...state,
        season: [],
        team: [],
        patch: [],
        player: "",
        patchfilter: [],
      };
    case COPY_SET_YEAR:
      return {
        ...state,
        year: action.payload,
      };
    case COPY_RESET_TEAM:
      return {
        ...state,
        team: [],
        player: "",
      };
    case COPY_SET_PATCH:
      return {
        ...state,
        patch: action.payload,
      };
    case COPY_GET_OPP_PLAYER:
      return { ...state, getoppplayer: action.payload };
    case COPY_OPP_PLAYER:
      return { ...state, oppplayer: action.payload };
    case COPY_SET_PLAYER:
      return {
        ...state,
        player: action.payload,
      };
    case COPY_POSITION:
      return { ...state, position: action.payload };
    default:
      return state;
  }

}