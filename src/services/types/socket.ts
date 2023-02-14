import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_GET_MESSAGE,
  WS_CONNECTION_START,
  WS_CONNECTION_START_FOR_AUTH,
  WS_CONNECTION_SUCCESS,
} from "../actions/socket";
import { TOrderData } from "./data";

export interface IWsConnectionStart {
  readonly type: typeof WS_CONNECTION_START;
}

export interface IWsConnectionStartForAuth {
  readonly type: typeof WS_CONNECTION_START_FOR_AUTH;
}

export interface IWsConnectionSuccess {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}

export interface IWsConnectionError {
  readonly type: typeof WS_CONNECTION_ERROR;
  readonly payload: string;
}

export interface IWsConnectionClosed {
  readonly type: typeof WS_CONNECTION_CLOSED;
}

export interface IWsConnectionGetMessage {
  readonly type: typeof WS_CONNECTION_GET_MESSAGE;
  readonly payload: {
    orders: Array<TOrderData>;
    total: number;
    totalToday: number;
  };
}

export type TWsConnection =
  | IWsConnectionStart
  | IWsConnectionStartForAuth
  | IWsConnectionSuccess
  | IWsConnectionError
  | IWsConnectionClosed
  | IWsConnectionGetMessage;