import { getDatafromApi, burgerApiUrl } from "../../utils/Api";
import { AppDispatch, AppThunk } from "../types";

export const GET_DATA_REQUEST: "GET_DATA_REQUEST" = "GET_DATA_REQUEST";
export const GET_DATA_SUCCESS: "GET_DATA_SUCCESS" = "GET_DATA_SUCCESS";
export const GET_DATA_FAILED: "GET_DATA_FAILED" = "GET_DATA_FAILED";


export const getData: AppThunk = () => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: GET_DATA_REQUEST,
    });
    getDatafromApi(burgerApiUrl)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: GET_DATA_SUCCESS,
            res: res,
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
