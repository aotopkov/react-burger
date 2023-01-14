import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_GET_MESSAGE,
  WS_CONNECTION_SUCCESS,
} from "../actions/socket";

const wsInitOrderInfo = {
  connected: false,
  data: null,
  error: undefined,
  get: false
};

export function wsOrderReducer(state = wsInitOrderInfo, action) {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS: {
      return {
        ...state,
        connected: true,
      };
    }
    case WS_CONNECTION_ERROR: {
      return {
        ...state,
        connected: false,
        error: action.payload,
      };
    }
    case WS_CONNECTION_CLOSED: {
      return {
        ...state,
        connected: false,
        get: false
      };
    }
    case WS_CONNECTION_GET_MESSAGE: {
      return {
        ...state,
        get: true,
        data: action.payload,
      };
    }

    default:
      return state;
  }
}
