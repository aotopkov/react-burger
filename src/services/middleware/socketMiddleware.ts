import { Middleware, MiddlewareAPI } from "redux";

import { getCookie } from "../../utils/cookie";
import { TWsConnection } from "../types/socket";

export function socketMiddleware(wsUrl: any) {
  return (store: any) => {
    let socket: WebSocket | null = null;

    return (next: (arg0: TWsConnection) => void) => (action: TWsConnection) => {
      const accessToken = getCookie("accessToken");
      const { dispatch } = store;
      const { type } = action;

      if (type === "WS_CONNECTION_START") {
        socket = new WebSocket(`${wsUrl}/all`);
      }

      if (type === "WS_CONNECTION_START_FOR_AUTH" && accessToken) {
        socket = new WebSocket(`${wsUrl}?token=${accessToken}`);
      }

      if (socket) {
        socket.onopen = (event: Event) => {
          dispatch({ type: "WS_CONNECTION_SUCCESS", payload: event });
        };

        socket.onerror = (event: Event) => {
          dispatch({ type: "WS_CONNECTION_ERROR", payload: event });
        };

        socket.onmessage = (event: MessageEvent) => {
          const { data } = event;
          const parseData = JSON.parse(data);
          const { success, ...resParsedData } = parseData;
          dispatch({
            type: "WS_CONNECTION_GET_MESSAGE",
            payload: resParsedData,
          });
        };

        socket.onclose = (event: Event) => {
          dispatch({ type: "WS_CONNECTION_CLOSED", payload: event });
        };
      }

      next(action);
    };
  };
}
