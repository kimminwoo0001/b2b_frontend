export const INITIALIZE_GAME_STATE = "gamevalue/INITIALIZE_GAME_STATE";
export const SET_GAME_ID = "gamevalue/SET_GAME_ID";

export const SET_TIMER = "gamevalue/SET_TIMER";
export const SET_DETAIL_DATASET = "gamevalue/SET_DETAIL_DATASET";
export const SET_PLATFORM_PLAYER = "gamevalue/SET_PLATFORM_PLAYER";

export const SET_UNIQUE_ID = "gamevalue/SET_UNIQUE_ID";
export const SET_OPPSIDE = "gamevalue/SET_OPPSIDE";
export const SET_FIXED_DATASET = "gamevalue/SET_FIXED_DATASET";
export const SET_PLAYERS_DATASET = "gamevalue/SET_PLAYERS_DATASET";
export const SET_LOG_DATASET = "gamevalue/SET_LOG_DATASET";
export const SET_AUTO_DATASET = "gamevalue/SET_AUTO_DATASET";
export const SET_BLUE_TEAM = "gamevalue/SET_BLUE_TEAM";
export const SET_RED_TEAM = "gamevalue/SET_RED_TEAM";

export const SET_SELECTED_PLAYER = "gamevalue/SET_SELECTED_PLAYER";
export const SET_SELECTED_TEAM = "gamevalue/SET_SELECTED_TEAM";
export const SET_SELECTED_POSITION = "gamevalue/SET_SELECTED_POSITION";
export const SET_SELECTED_PARTICIPANT = "gamevalue/SET_SELECTED_PARTICIPANT";
export const SET_START_TIME = "gamevalue/SET_START_TIME";
export const SET_GAME_TIME = "gamevalue/SET_GAME_TIME";
export const SET_CHAMP_TAB = "gamevalue/SET_CHAMP_TAB";

export const SET_EVENT_LOG_ACTIVE_IDX = "gamevalue/SET_EVENT_LOG_ACTIVE_IDX";
export const SET_STATUS_LOG_ACTIVE_IDX = "gamevalue/SET_STATUS_LOG_ACTIVE_IDX";
export const SET_CURRENT_ITEM_IDX_ACTIVE_IDX = "gamevalue/SET_CURRENT_ITEM_IDX_ACTIVE_IDX";

export const InitializeGameState = (payload) => {
  return {
    type: INITIALIZE_GAME_STATE,
    payload,
  };
};

export const SetGameId = (payload) => {
  return {
    type: SET_GAME_ID,
    payload,
  };
};
export const SetTimer = (payload) => {
  return {
    type: SET_TIMER,
    payload,
  };
};
export const SetDetailDataSet = (payload) => {
  return {
    type: SET_DETAIL_DATASET,
    payload,
  };
};
export const SetPlatformPlayer = (payload) => {
  return {
    type: SET_PLATFORM_PLAYER,
    payload,
  };
};
export const SetUniqueId = (payload) => {
  return {
    type: SET_UNIQUE_ID,
    payload
  };
};
export const SetOppside = (payload) => {
  return {
    type: SET_OPPSIDE,
    payload
  };
};
export const SetFixedDataset = (payload) => {
  return {
    type: SET_FIXED_DATASET,
    payload
  };
}
export const SetPlayersDataset = (payload) => {
  return {
    type: SET_PLAYERS_DATASET,
    payload
  };
}
export const SetLogDataset = (payload) => {
  return {
    type: SET_LOG_DATASET,
    payload
  };
}
export const SetAutoDataset = (payload) => {
  return {
    type: SET_AUTO_DATASET,
    payload
  };
}
export const SetBlueTeam = (payload) => {
  return {
    type: SET_BLUE_TEAM,
    payload
  };
}
export const SetRedTeam = (payload) => {
  return {
    type: SET_RED_TEAM,
    payload
  };
}

export const SetSelectedPlayer = (payload) => {
  return {
    type: SET_SELECTED_PLAYER,
    payload
  };
}
export const SetSelectedTeam = (payload) => {
  return {
    type: SET_SELECTED_TEAM,
    payload
  };
}
export const SetSelectedPosition = (payload) => {
  return {
    type: SET_SELECTED_POSITION,
    payload
  };
}
export const SetSelectedParticipant = (payload) => {
  return {
    type: SET_SELECTED_PARTICIPANT,
    payload
  };
}
export const SetStartTime = (payload) => {
  return {
    type: SET_START_TIME,
    payload,
  };
};
export const SetGameTime = (payload) => {
  return {
    type: SET_GAME_TIME,
    payload,
  };
};
export const SetChampTab = (payload) => {
  return {
    type: SET_CHAMP_TAB,
    payload,
  };
};
export const SetEventLogActiveIdx = (payload) => {
  return {
    type: SET_EVENT_LOG_ACTIVE_IDX,
    payload,
  };
};
export const SetStatusLogActiveIdx = (payload) => {
  return {
    type: SET_STATUS_LOG_ACTIVE_IDX,
    payload,
  };
};
export const SetCurrentItemIdxActiveIdx = (payload) => {
  return {
    type: SET_CURRENT_ITEM_IDX_ACTIVE_IDX,
    payload,
  };
};

const initialState = {
  gameId: "",
  timer: 0,
  detail: null,
  player: null,
  uniqueId: "",
  fixedDataset: [],
  playerDataset: {},
  logDataset: {},
  autoDataset: {},
  blueteam: "",
  redteam: "",
  selectedTeam: 0, // 0: 블루팀, 1: 레드팀
  selectedPosition: 0, // 0: top, 1: jng, 2:mid, 3:ad, 4:sup
  selectedParticipant: 0, // 0~4 blue(t,j,m,a,s), 5~9 ted(t,j,m,a,s)
  startTime: "", //"0h34m06s",
  gameTime: "", //"2200",
  champTab: 0,
  eventLogActiveIdx: 0,
  statusLogActiveIdx: 0,
  itemActiveIdx: 0,
};

export default function GameReportReducer(state = initialState, action) {
  switch (action.type) {
    case "initialState":
      return {
        initialState,
      };
    case SET_GAME_ID:
      return {
        ...state,
        gameId: action.payload,
      };

    case SET_UNIQUE_ID:
      return {
        ...state,
        uniqueId: action.payload,
      };

    case SET_TIMER:
      return {
        ...state,
        timer: action.payload,
      };
    case SET_DETAIL_DATASET:
      return {
        ...state,
        detail: action.payload,
      }
    case SET_PLATFORM_PLAYER:
      return {
        ...state,
        player: action.payload,
      }

    case SET_OPPSIDE:
      return {
        ...state,
        oppside: action.payload
      }
    case SET_FIXED_DATASET:
      return {
        ...state,
        fixedDataset: action.payload
      }
    case SET_PLAYERS_DATASET:
      return {
        ...state,
        playerDataset: action.payload
      }
    case SET_LOG_DATASET:
      return {
        ...state,
        logDataset: action.payload
      }
    case SET_AUTO_DATASET:
      return {
        ...state,
        fixedDataset: action.payload
      }
    case SET_BLUE_TEAM:
      return {
        ...state,
        blueteam: action.payload
      }
    case SET_RED_TEAM:
      return {
        ...state,
        redteam: action.payload
      }
    case SET_SELECTED_PLAYER:
      return {
        ...state,
        selectedTeam: action.payload.team,
        selectedPosition: action.payload.position,
        selectedParticipant: action.payload.participant
      }
    case SET_SELECTED_TEAM:
      return {
        ...state,
        selectedTeam: action.payload
      }
    case SET_SELECTED_POSITION:
      return {
        ...state,
        selectedPosition: action.payload
      }
    case SET_SELECTED_PARTICIPANT:
      return {
        ...state,
        selectedParticipant: action.payload
      }
    case SET_START_TIME:
      return {
        ...state,
        startTime: action.payload,
      };
    case SET_GAME_TIME:
      return {
        ...state,
        gameTime: action.payload,
      };
    case SET_CHAMP_TAB:
      return {
        ...state,
        champTab: action.payload,
      };
    case SET_EVENT_LOG_ACTIVE_IDX:
      return {
        ...state,
        eventLogActiveIdx: action.payload,
      };
    case SET_STATUS_LOG_ACTIVE_IDX:
      return {
        ...state,
        statusLogActiveIdx: action.payload,
      };
    case SET_CURRENT_ITEM_IDX_ACTIVE_IDX:
      return {
        ...state,
        itemActiveIdx: action.payload,
      };
    case INITIALIZE_GAME_STATE:
      return initialState;
    default:
      return state;
  }
}
