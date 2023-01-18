import { Middleware, MiddlewareAPI } from "redux";
import { getCookie } from "../../utils/cookie";

export function socketMiddleware(wsUrl) {
  return (store) => {
    let socket = null;

    return (next) => (action) => {
      const accessToken = getCookie("accessToken");
      const { dispatch } = store;
      const { type } = action;

      if (type === "WS_CONNECTION_START") {
        socket = new WebSocket(`${wsUrl}/all`);
      }

      if (type === "WS_CONNECTION_START_FOR_AUTH" && accessToken) {
        socket = new WebSocket(`${wsUrl}?token=${accessToken}`)
      }


      if (socket) {
        socket.onopen = (event) => {
          dispatch({ type: "WS_CONNECTION_SUCCESS", payload: event });
        };

        socket.onerror = (event) => {
          dispatch({ type: "WS_CONNECTION_ERROR", payload: event });
        };

        socket.onmessage = (event) => {
            const { data } = event
            const parseData = JSON.parse(data)
            const {success, ...resParsedData} = parseData
          dispatch({ type: "WS_CONNECTION_GET_MESSAGE", payload: resParsedData });
        };

        socket.onclose = (event) => {
          dispatch({ type: "WS_CONNECTION_CLOSED", payload: event });
        };
      }

      next(action);
    };
  };
}
