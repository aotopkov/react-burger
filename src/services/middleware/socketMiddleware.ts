import { MiddlewareAPI } from "@reduxjs/toolkit";
import { Middleware } from "redux";
import { TWsActions } from "../actions/socket";
import { TWsConnection } from "../types/socket";

export const socketMiddleware = (WS_ACTIONS: TWsActions): Middleware => {
  return (store: MiddlewareAPI) => {
    let socket: WebSocket | null = null;

    return (next: (arg0: TWsConnection) => void) => (action) => {
      const { dispatch } = store;
      const { type } = action;
      const {
        WS_CONNECTION_CLOSED,
        WS_CONNECTION_ERROR,
        WS_CONNECTION_GET_MESSAGE,
        WS_CONNECTION_START,
        WS_CONNECTION_SUCCESS,
      } = WS_ACTIONS;

      if (type === WS_CONNECTION_START) {
        socket = new WebSocket(action.url);
      }

      if (socket) {
        socket.onopen = (event: Event) => {
          dispatch({ type: WS_CONNECTION_SUCCESS, payload: event });
        };

        socket.onerror = (event: Event) => {
          dispatch({ type: WS_CONNECTION_ERROR, payload: event });
        };

        socket.onmessage = (event: MessageEvent) => {
          const { data } = event;
          const parseData = JSON.parse(data);
          const { success, ...resParsedData } = parseData;
          dispatch({
            type: WS_CONNECTION_GET_MESSAGE,
            payload: resParsedData,
          });
        };

        socket.onclose = (event: Event) => {
          dispatch({ type: WS_CONNECTION_CLOSED, payload: event });
        };
      }

      next(action);
    };
  };
};
