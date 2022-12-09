import {
  getDatafromApi,
  getOrderDatafromApi,
  burgerApiUrl,
} from "../../utils/Api";

export const GET_DATA_REQUEST = "GET_DATA_REQUEST";
export const GET_DATA_SUCCESS = "GET_DATA_SUCCESS";
export const GET_DATA_FAILED = "GET_DATA_FAILED";

export const SET_ORDER_REQUEST = "SET_ORDER_REQUEST";
export const SET_ORDER_SUCCESS = "SET_ORDER_SUCESS";
export const SET_ORDER_FAILED = "SET_ORDER_FAILED";
export const CLOSE_ORDER_MODAL = "CLOSE__ORDER_MODAL";

export const OPEN_MODAL_INGRIDIENT = "OPEN_MODAL_INGRIDIENT";
export const CLOSE_MODAL_INGRIDIENT = "CLOSE_MODAL_INGRIDIENT";

export const ADD_BUN_TO_CONSTRUCTOR = "ADD_BUN_TO_CONSTRUCTOR";
export const ADD_INGRIDIENT_TO_CONSTRUCTOR = "ADD_INGRIDIENT_TO_CONSTRUCTOR";
export const REMOVE_INGRIDIENT_FROM_CONSTRUCTOR =
  "REMOVE_INGRIDIENT_FROM_CONSTRUCTOR";
export const MOVE_INGRIDIENT = "START_MOVE_INGRIDIENT";

export function getData() {
  return function (dispatch) {
    dispatch({
      type: GET_DATA_REQUEST,
    });
    getDatafromApi(burgerApiUrl)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: GET_DATA_SUCCESS,
            data: res.data,
          });
        } else {
          dispatch({
            type: GET_DATA_FAILED,
          });
        }
      })
      .catch((err) => {
        console.log(`ошибка ${err}`);
      });
  };
}

export function setOrder(idArr) {
  return function (dispatch) {
    dispatch({
      type: SET_ORDER_REQUEST,
    });
    getOrderDatafromApi(burgerApiUrl, idArr)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: SET_ORDER_SUCCESS,
            res: res,
          });
        } else {
          dispatch({
            type: SET_ORDER_FAILED,
          });
        }
      })
      .catch((err) => {
        console.log(`ошибка ${err}`);
      });
  };
}
