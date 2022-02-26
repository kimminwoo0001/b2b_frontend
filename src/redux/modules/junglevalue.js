export const JUNGLE_INIT = "junglevalue/Jungle_INIT";
export const SET_FILTER_DATA = "junglevalue/SET_FILTER_DATA";
export const SET_JUNGLE_PLAYER = "junglevalue/SET_JUNGLE_PLAYER";
export const SET_OPP_JUNGLE_PLAYER = "junglevalue/SET_OPP_JUNGLE_PLAYER";
export const SET_CHAMP = "junglevalue/SET_CHAMP";
export const SET_OPP_CHAMP = "junglevalue/SET_OPP_CHAMP";

/** 리팩토링 추가 action */
export const SET_JUNGLE_YEAR = "junglevalue/SET_JUNGLE_YEAR";
export const SET_JUNGLE_LEAGUE = "junglevalue/SET_LEAGUE";
export const SET_JUNGLE_SEASON = "junglevalue/SET_SEASON";
export const SET_JUNGLE_TEAM = "junglevalue/SET_TEAM";
export const SET_JUNGLE_PATCH = "junglevalue/SET_PATCH";

export const RESET_JUNGLE_LEAGUE = "junglevalue/RESET_LEAGUE";
export const RESET_JUNGLE_SEASON = "junglevalue/RESET_JUNGLE_SEASON";
export const RESET_JUNGLE_TEAM = "junglevalue/RESET_JUNGLE_TEAM";
export const RESET_JUNGLE_PATCH = "junglevalue/RESET_JUNGLE_PATCH";
export const SET_IS_JUNGLING_CLICKED = "junglevalue/SET_IS_JUNGLING_CLICKED";
export const SET_IS_JUNGLE_MAPPING_CLICKED =
  "junglevalue/SET_IS_JUNGLE_MAPPING_CLICKED";

export const JungleInit = () => {
  return {
    type: JUNGLE_INIT,
  };
};
// set
export const SetJunlgeYear = (payload) => ({
  type: SET_JUNGLE_YEAR,
  payload,
});
export const SetJungleLeague = (payload) => ({
  type: SET_JUNGLE_LEAGUE,
  payload,
});
export const SetJungleSeason = (payload) => ({
  type: SET_JUNGLE_SEASON,
  payload,
});
export const SetJungleTeam = (payload) => ({
  type: SET_JUNGLE_TEAM,
  payload,
});
export const SetJunglePatch = (payload) => ({
  type: SET_JUNGLE_PATCH,
  payload,
});

// reset
export const ResetJungleLeague = (payload) => {
  return {
    type: RESET_JUNGLE_LEAGUE,
    payload,
  };
};

export const ResetJungleSeason = (payload) => {
  return {
    type: RESET_JUNGLE_SEASON,
    payload,
  };
};

export const ResetJungleTeam = () => {
  return {
    type: RESET_JUNGLE_TEAM,
  };
};

export const ResetJunglePatch = (payload) => {
  return {
    type: RESET_JUNGLE_PATCH,
    payload,
  };
};

export const SetFilterData = (payload) => {
  return {
    type: SET_FILTER_DATA,
    payload,
  };
};

export const SetJunglePlayer = (payload) => {
  return {
    type: SET_JUNGLE_PLAYER,
    payload,
  };
};

export const SetChamp = (payload) => {
  return {
    type: SET_CHAMP,
    payload,
  };
};

export const SetOppChamp = (payload) => {
  return {
    type: SET_OPP_CHAMP,
    payload,
  };
};

export const SetIsJunglingClicked = (payload) => {
  return {
    type: SET_IS_JUNGLING_CLICKED,
    payload,
  };
};

export const SetIsJungleMappingClicked = (payload) => {
  return {
    type: SET_IS_JUNGLE_MAPPING_CLICKED,
    payload,
  };
};

const initialState = {
  year: [],
  oppyear: [],
  league: {},
  oppleague: {},
  season: {},
  oppseason: {},
  team: [],
  oppteam: [],
  patch: {},
  player: "",
  oppplayer: "",
  champion: {},
  oppchampion: {},
  isClicked: false,
  isMappingClicked: false,
  gameid: "",
};

export default function JungleMapReducer(state = initialState, action) {
  switch (action.type) {
    case JUNGLE_INIT:
      return initialState;
    case SET_FILTER_DATA:
      return action.payload;
    case SET_JUNGLE_PLAYER:
      return {
        ...state,
        player: action.payload,
      };

    // set - 경기 리스트 받아오는 정보
    case SET_JUNGLE_YEAR:
      return {
        ...state,
        year: [...action.payload],
      };
    case SET_JUNGLE_LEAGUE:
      return {
        ...state,
        league: { ...action.payload },
      };
    case SET_JUNGLE_SEASON:
      return {
        ...state,
        season: { ...action.payload },
      };
    case SET_JUNGLE_TEAM:
      return {
        ...state,
        team: [...action.payload],
      };
    case SET_JUNGLE_PATCH:
      return {
        ...state,
        patch: { ...action.payload },
      };

    // set - 개별 경기정보 선수데이터
    case SET_CHAMP:
      return action.payload;
    case SET_OPP_CHAMP:
      return action.payload;

    // reset - 경기리스트 관련
    case RESET_JUNGLE_LEAGUE:
      return {
        ...state,
        league: { ...state.league, [action.payload]: false },
        season: {},
        team: [],
        patch: {},
      };
    case RESET_JUNGLE_SEASON:
      console.log(action.payload);
      return {
        ...state,
        season: { ...state.season, [action.payload]: false },
        team: [],
        patch: {},
      };
    case RESET_JUNGLE_TEAM:
      return {
        ...state,
        team: [],
      };
    case RESET_JUNGLE_PATCH:
      return {
        ...state,
        patch: { ...state.patch, [action.payload]: false },
      };

    case SET_IS_JUNGLING_CLICKED:
      return {
        ...state,
        isClicked: action.payload,
      };
    case SET_IS_JUNGLE_MAPPING_CLICKED:
      return {
        ...state,
        isMappingClicked: action.payload,
      };

    default:
      return state;
  }
}
