import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_GET_MESSAGE,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
} from "../actions/socket";
import { TOrderData } from "../types/data";
import { TWsConnection } from "../types/socket";

export type TWsOrderInfo = {
  readonly start: Boolean;
  readonly connected: Boolean;
  readonly orders: TOrderData[];
  readonly error: undefined | string;
  readonly get: Boolean;
  readonly total: number | null;
  readonly totalToday: number | null;
};

const wsInitOrderInfo: TWsOrderInfo = {
  start: false,
  connected: false,
  orders: [],
  error: undefined,
  get: false,
  total: null,
  totalToday: null,
};

export function wsOrderReducer(
  state: TWsOrderInfo = wsInitOrderInfo,
  action: TWsConnection
) {
  switch (action.type) {
    case WS_CONNECTION_START: {
      return {
        ...state,
        start: true,
      };
    }
    case WS_CONNECTION_SUCCESS: {
      return {
        ...state,
        start: false,
        connected: true,
      };
    }
    case WS_CONNECTION_ERROR: {
      return {
        ...state,
        start: false,
        connected: false,
        error: action.payload,
      };
    }
    case WS_CONNECTION_CLOSED: {
      return wsInitOrderInfo;
    }
    case WS_CONNECTION_GET_MESSAGE: {
      return {
        ...state,
        get: true,
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
      };
    }

    default:
      return state;
  }
}
