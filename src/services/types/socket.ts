import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_GET_MESSAGE,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
} from "../actions/socket";
import { TOrderData } from "./data";

export interface IWsConnectionStart {
  type: typeof WS_CONNECTION_START;
  url: string
}

export interface IWsConnectionSuccess {
  type: typeof WS_CONNECTION_SUCCESS;
}

export interface IWsConnectionError {
  type: typeof WS_CONNECTION_ERROR;
  payload: string;
}

export interface IWsConnectionClosed {
  type: typeof WS_CONNECTION_CLOSED;
}

export interface IWsConnectionGetMessage {
  type: typeof WS_CONNECTION_GET_MESSAGE;
  payload: {
    orders: TOrderData[];
    total: number;
    totalToday: number;
  };
}

export type TWsConnection =
  | IWsConnectionStart
  | IWsConnectionSuccess
  | IWsConnectionError
  | IWsConnectionClosed
  | IWsConnectionGetMessage;
