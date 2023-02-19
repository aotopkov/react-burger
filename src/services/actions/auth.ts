import {
  burgerApiUrl,
  changeUserDataApi,
  getUserApi,
  logoutUserApi,
  refreshTokenApi,
  sendRegistrationUsertoApi,
  setloginUserApi,
} from "../../utils/Api";
import { deleteCookie, receiveCookie } from "../../utils/cookie";
import { AppDispatch, AppThunk } from "../types";

export const SET_USER_DATA_REQUEST: "SET_USER_DATA_REQUEST" =
  "SET_USER_DATA_REQUEST";
export const SET_USER_DATA_SUCCESS: "SET_USER_DATA_SUCCESS" =
  "SET_USER_DATA_SUCCESS";
export const SET_USER_DATA_FAILED: "SET_USER_DATA_FAILED" =
  "SET_USER_DATA_FAILED";
export const SET_USER_DATA_LOGOUT: "SET_USER_DATA_LOGOUT" =
  "SET_USER_DATA_LOGOUT";
export const SET_USER_DATA_EMAIL_TOKEN: "SET_USER_DATA_EMAIL_TOKEN" =
  "SET_USER_DATA_EMAIL_TOKEN";

//Регистрация пользователя

export const setRegUser: AppThunk = (data) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: SET_USER_DATA_REQUEST,
    });
    sendRegistrationUsertoApi(burgerApiUrl, data)
      .then((res) => {
        if (res && res.success) {
          receiveCookie(res);
          dispatch({
            type: SET_USER_DATA_SUCCESS,
            res: res,
          });
        } else {
          dispatch({
            type: SET_USER_DATA_FAILED,
          });
        }
      })
      .catch((err) => {
        console.log(`ошибка ${err}`);
      });
  };
};

//Авторизация пользователя

export const loginUser: AppThunk = (data) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: SET_USER_DATA_REQUEST,
    });
    setloginUserApi(burgerApiUrl, data)
      .then((res) => {
        if (res && res.success) {
          receiveCookie(res);
          dispatch({
            type: SET_USER_DATA_SUCCESS,
            res: res,
          });
        } else {
          dispatch({
            type: SET_USER_DATA_FAILED,
          });
        }
      })
      .catch((err) => {
        console.log(`ошибка ${err}`);
        dispatch({
          type: SET_USER_DATA_FAILED,
        });
      });
  };
};

//Получение данных пользователя по токену

export const getUser: AppThunk = () => {
  return function (dispatch: AppDispatch) {
    getUserApi(burgerApiUrl)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: SET_USER_DATA_SUCCESS,
            res: res,
          });
        } else {
          dispatch({
            type: SET_USER_DATA_FAILED,
          });
        }
      })
      .catch((err) => {
        console.log(`ошибка ${err}`);
        refreshToken();
      });
  };
};

//обновление Токена

export const refreshToken: AppThunk = () => {
  return function (dispatch: AppDispatch) {
    refreshTokenApi(burgerApiUrl)
      .then((res) => {
        if (res && res.success) {
          receiveCookie(res);
          getUser();
        } else {
          dispatch({
            type: SET_USER_DATA_FAILED,
          });
        }
      })
      .catch((err) => {
        console.log(`ошибка ${err}`);
        deleteCookie("accessToken");
        deleteCookie("refreshToken");
      });
  };
};

//Смена данных в профиле

export const changeUserData: AppThunk = (data) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: SET_USER_DATA_REQUEST,
    });
    changeUserDataApi(burgerApiUrl, data)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: SET_USER_DATA_SUCCESS,
            res: res,
          });
        } else {
          dispatch({
            type: SET_USER_DATA_FAILED,
          });
        }
      })
      .catch((err) => {
        console.log(`ошибка ${err}. Обновляем Токен`);
        refreshToken();
        changeUserData(data);
      })

      .finally(() => {
        getUser();
      });
  };
};

//Выход

export const logoutUser: AppThunk = () => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: SET_USER_DATA_REQUEST,
    });
    logoutUserApi(burgerApiUrl)
      .then((res) => {
        if (res && res.success) {
          deleteCookie("accessToken");
          deleteCookie("refreshToken");
          dispatch({
            type: SET_USER_DATA_LOGOUT,
            res: res,
          });
          console.log(res);
        }
      })
      .catch((err) => {
        console.log(`ошибка ${err}`);
      });
  };
};
