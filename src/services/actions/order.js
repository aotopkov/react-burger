import { getOrderDatafromApi, burgerApiUrl } from "../../utils/Api";

export const SET_ORDER_REQUEST = "SET_ORDER_REQUEST";
export const SET_ORDER_SUCCESS = "SET_ORDER_SUCESS";
export const SET_ORDER_FAILED = "SET_ORDER_FAILED";
export const CLOSE_ORDER_MODAL = "CLOSE_ORDER_MODAL";
export const ADD_BUN_TO_CONSTRUCTOR = "ADD_BUN_TO_CONSTRUCTOR";
export const ADD_INGRIDIENT_TO_CONSTRUCTOR = "ADD_INGRIDIENT_TO_CONSTRUCTOR";
export const REMOVE_INGRIDIENT_FROM_CONSTRUCTOR =
  "REMOVE_INGRIDIENT_FROM_CONSTRUCTOR";
export const MOVE_INGRIDIENT = "START_MOVE_INGRIDIENT";
export const CLEAR_BIN_CONSTRUCTOR = "CLEAR_BIN_CONSTRUCTOR";

export function addBunToConstructor(bun) {
    return {
      type: ADD_BUN_TO_CONSTRUCTOR,
      payload: bun,
    };
  }
  
  export function addIngridientToConstructor(ingridient, uuid) {
    return {
      type: ADD_INGRIDIENT_TO_CONSTRUCTOR,
      payload: ingridient,
      uuid: uuid,
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
          dispatch({ type: CLEAR_BIN_CONSTRUCTOR });
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
